import { useCallback, useEffect, useSyncExternalStore } from 'react';

/**
 * DUSQ Vagal Audio Engine — Web Audio synthesis for in-app previews.
 *
 * - Frequency is exact relative to the device sample clock (432 Hz is 432 Hz).
 * - Loudness is NOT SPL-calibrated: a browser cannot know the transducer.
 *   Master level is deliberately conservative (~-14 dBFS) behind a limiter.
 * - Must be started from a user gesture (autoplay policy). On iOS, Web Audio
 *   follows the hardware silent switch.
 * - The AudioContext suspends itself after 15 s of silence to save battery.
 */

export interface VoiceOptions {
  /** Carrier frequency in Hz. */
  frequency?: number;
  /** 0 = identical tone in both ears; >0 offsets the right ear (binaural beat). */
  binauralBeatHz?: number;
  /** 0..1 sine level. */
  toneLevel?: number;
  /** 0..1 level of the 2nd partial (2f) relative to the carrier. */
  harmonicLevel?: number;
  /** 0..1 pink-noise bed level. */
  noiseLevel?: number;
  /** Low-pass corner for the noise bed. */
  noiseLowpassHz?: number;
  /** Exponential attack, seconds. */
  attack?: number;
  /** Exponential release, seconds. */
  release?: number;
  /** Total seconds including attack/release. 0 = continuous until stop(). */
  duration?: number;
  /** Starting level of the breath-modulation stage (see ramp()). */
  initialLevel?: number;
}

type Resolved = Required<VoiceOptions>;

const DEFAULTS: Resolved = {
  frequency: 432,
  binauralBeatHz: 0,
  toneLevel: 1,
  harmonicLevel: 0.12,
  noiseLevel: 0.35,
  noiseLowpassHz: 1800,
  attack: 1.2,
  release: 2.5,
  duration: 0,
  initialLevel: 1,
};

const FLOOR = 0.0001; // exponential ramps cannot touch 0
const MASTER_GAIN = 0.2;
const IDLE_SUSPEND_MS = 15_000;

interface Voice {
  env: GainNode;
  breath: GainNode;
  sources: AudioScheduledSourceNode[];
  nodes: AudioNode[];
  release: number;
}

type HoldableParam = AudioParam & { cancelAndHoldAtTime?: (t: number) => AudioParam };

function holdAt(param: AudioParam, t: number) {
  const p = param as HoldableParam;
  if (typeof p.cancelAndHoldAtTime === 'function') {
    p.cancelAndHoldAtTime(t);
  } else {
    const v = Math.max(param.value, FLOOR);
    param.cancelScheduledValues(t);
    param.setValueAtTime(v, t);
  }
}

class VagalAudioEngine {
  private ctx: AudioContext | null = null;
  private input: GainNode | null = null;
  private pink: AudioBuffer | null = null;
  private voices = new Map<string, Voice>();
  private pending = new Map<string, number>();
  private seq = 0;
  private listeners = new Set<() => void>();
  private idleTimer: number | undefined;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  isPlaying = (id: string) => this.voices.has(id);

  private emit() {
    this.listeners.forEach((l) => l());
    window.clearTimeout(this.idleTimer);
    if (this.voices.size === 0 && this.ctx?.state === 'running') {
      this.idleTimer = window.setTimeout(() => {
        if (this.voices.size === 0) this.ctx?.suspend().catch(() => {});
      }, IDLE_SUSPEND_MS);
    }
  }

  private ensureContext(): AudioContext | null {
    if (this.ctx) return this.ctx;
    if (typeof window === 'undefined') return null;
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;

    const ctx = new Ctor();
    const input = ctx.createGain();
    input.gain.value = MASTER_GAIN;

    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -16;
    limiter.knee.value = 10;
    limiter.ratio.value = 8;
    limiter.attack.value = 0.005;
    limiter.release.value = 0.3;

    input.connect(limiter);
    limiter.connect(ctx.destination);
    this.ctx = ctx;
    this.input = input;
    return ctx;
  }

  /** Paul Kellet's refined pink-noise filter, 4 s decorrelated stereo loop. */
  private pinkNoise(ctx: AudioContext): AudioBuffer {
    if (this.pink && this.pink.sampleRate === ctx.sampleRate) return this.pink;
    const length = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    }
    this.pink = buffer;
    return buffer;
  }

  /** Call from a user gesture. Resolves true when audio actually started. */
  async play(id: string, options: VoiceOptions = {}): Promise<boolean> {
    const ctx = this.ensureContext();
    if (!ctx || !this.input) return false;

    const token = ++this.seq;
    this.pending.set(id, token);
    if (ctx.state !== 'running') {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }
    // stop() was called (e.g. unmount) while we were resuming
    if (this.pending.get(id) !== token) return false;
    this.pending.delete(id);

    this.stop(id, 0.08); // retrigger: quick fade of any existing voice

    const o: Resolved = { ...DEFAULTS, ...options };
    const t0 = ctx.currentTime + 0.03;

    const env = ctx.createGain();
    env.gain.setValueAtTime(FLOOR, t0);
    env.gain.exponentialRampToValueAtTime(1, t0 + Math.max(0.02, o.attack));

    const breath = ctx.createGain();
    breath.gain.setValueAtTime(o.initialLevel, t0);

    env.connect(breath);
    breath.connect(this.input);

    const sources: AudioScheduledSourceNode[] = [];
    const nodes: AudioNode[] = [env, breath];

    if (o.toneLevel > 0) {
      const merger = ctx.createChannelMerger(2);
      merger.connect(env);
      nodes.push(merger);

      const ear = (freq: number, channel: number) => {
        const partials: Array<[number, number]> = [
          [freq, 1],
          [freq * 2, o.harmonicLevel],
        ];
        for (const [f, rel] of partials) {
          if (rel <= 0) continue;
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = f;
          const g = ctx.createGain();
          g.gain.value = 0.5 * o.toneLevel * rel;
          osc.connect(g);
          g.connect(merger, 0, channel);
          sources.push(osc);
          nodes.push(g);
        }
      };
      ear(o.frequency, 0);
      ear(o.frequency + o.binauralBeatHz, 1);
    }

    if (o.noiseLevel > 0) {
      const src = ctx.createBufferSource();
      src.buffer = this.pinkNoise(ctx);
      src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = o.noiseLowpassHz;
      lp.Q.value = 0.5;
      const g = ctx.createGain();
      g.gain.value = 0.6 * o.noiseLevel;
      src.connect(lp);
      lp.connect(g);
      g.connect(env);
      sources.push(src);
      nodes.push(lp, g);
    }

    if (sources.length === 0) return false;
    sources.forEach((s) => s.start(t0));

    const voice: Voice = { env, breath, sources, nodes, release: o.release };
    this.voices.set(id, voice);

    if (o.duration > 0) {
      const end = t0 + Math.max(o.duration, o.attack + o.release);
      env.gain.setValueAtTime(1, end - o.release);
      env.gain.exponentialRampToValueAtTime(FLOOR, end);
      sources.forEach((s) => s.stop(end + 0.05));
      sources[0].onended = () => this.retire(id, voice);
    }

    this.emit();
    return true;
  }

  /** Fade a voice out with an exponential release. */
  stop(id: string, release?: number) {
    this.pending.delete(id);
    const v = this.voices.get(id);
    if (!v || !this.ctx) return;
    this.voices.delete(id);

    const now = this.ctx.currentTime;
    const r = Math.max(0.02, release ?? v.release);
    holdAt(v.env.gain, now);
    v.env.gain.exponentialRampToValueAtTime(FLOOR, now + r);
    v.sources.forEach((s) => {
      s.onended = null;
      try {
        s.stop(now + r + 0.05);
      } catch {
        /* already stopped */
      }
    });
    window.setTimeout(() => {
      v.nodes.forEach((n) => {
        try {
          n.disconnect();
        } catch {
          /* noop */
        }
      });
    }, (r + 0.25) * 1000);
    this.emit();
  }

  /** Linear ramp of the breath stage (0..1.5) — used to sync audio to respiration. */
  ramp(id: string, level: number, seconds: number) {
    const v = this.voices.get(id);
    if (!v || !this.ctx) return;
    const now = this.ctx.currentTime;
    holdAt(v.breath.gain, now);
    v.breath.gain.linearRampToValueAtTime(
      Math.max(0, Math.min(1.5, level)),
      now + Math.max(0.05, seconds),
    );
  }

  stopAll(release = 0.4) {
    [...this.voices.keys()].forEach((id) => this.stop(id, release));
    this.pending.clear();
  }

  private retire(id: string, voice: Voice) {
    voice.nodes.forEach((n) => {
      try {
        n.disconnect();
      } catch {
        /* noop */
      }
    });
    if (this.voices.get(id) === voice) {
      this.voices.delete(id);
      this.emit();
    }
  }
}

export const vagalAudio = new VagalAudioEngine();

export function useVagalVoice(id: string, unmountRelease = 0.6) {
  const playing = useSyncExternalStore(
    vagalAudio.subscribe,
    () => vagalAudio.isPlaying(id),
    () => false,
  );

  useEffect(() => () => vagalAudio.stop(id, unmountRelease), [id, unmountRelease]);

  const play = useCallback((o?: VoiceOptions) => vagalAudio.play(id, o), [id]);
  const stop = useCallback((r?: number) => vagalAudio.stop(id, r), [id]);
  const ramp = useCallback((level: number, s: number) => vagalAudio.ramp(id, level, s), [id]);

  return { playing, play, stop, ramp };
}
