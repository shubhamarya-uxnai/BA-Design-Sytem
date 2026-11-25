import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './hooks/useReducedMotion';

const REST = 0.62;
const FULL = 1;
const R = 92;
const CIRC = 2 * Math.PI * R;

export const BREATH_PHASES = [
  { id: 'inhale', label: 'Inhale', cue: 'Breathe in quietly through your nose', sec: 4, from: REST, to: FULL },
  { id: 'hold', label: 'Hold', cue: 'Hold the breath gently', sec: 7, from: FULL, to: FULL },
  { id: 'exhale', label: 'Exhale', cue: 'Exhale fully through your mouth', sec: 8, from: FULL, to: REST },
] as const;

export type BreathPhaseId = (typeof BREATH_PHASES)[number]['id'];
export const CYCLE_SEC = 19;
export const SESSION_CYCLES = 4; // standard beginner guidance for 4-7-8
export const SESSION_SEC = CYCLE_SEC * SESSION_CYCLES; // 76 s

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export interface PhasePosition {
  cycle: number;
  index: number;
  progress: number;
  remaining: number;
}

/** Deterministic phase lookup from elapsed seconds — no timer drift. */
export function phaseAt(elapsed: number): PhasePosition {
  if (elapsed >= SESSION_SEC) return { cycle: SESSION_CYCLES - 1, index: 2, progress: 1, remaining: 0 };
  const cycle = Math.floor(elapsed / CYCLE_SEC);
  let within = elapsed % CYCLE_SEC;
  for (let i = 0; i < BREATH_PHASES.length; i++) {
    const sec = BREATH_PHASES[i].sec;
    if (within < sec) return { cycle, index: i, progress: within / sec, remaining: sec - within };
    within -= sec;
  }
  return { cycle, index: 2, progress: 1, remaining: 0 };
}

export type SessionStatus = 'idle' | 'running' | 'paused' | 'complete';

export function useBreathSession(totalSec = SESSION_SEC) {
  const [status, setStatus] = useState<SessionStatus>('idle');
  const [elapsed, setElapsed] = useState(0);
  const acc = useRef(0);
  const since = useRef<number | null>(null);

  const getElapsed = useCallback(() => {
    const live = since.current == null ? 0 : (performance.now() - since.current) / 1000;
    return Math.min(totalSec, acc.current + live);
  }, [totalSec]);

  useEffect(() => {
    if (status !== 'running') return;
    const id = window.setInterval(() => {
      const e = getElapsed();
      setElapsed(e);
      if (e >= totalSec) {
        acc.current = totalSec;
        since.current = null;
        setStatus('complete');
      }
    }, 200);
    return () => window.clearInterval(id);
  }, [status, getElapsed, totalSec]);

  const start = useCallback(() => {
    if (status === 'complete') acc.current = 0;
    since.current = performance.now();
    setElapsed(acc.current);
    setStatus('running');
  }, [status]);

  const pause = useCallback(() => {
    acc.current = getElapsed();
    since.current = null;
    setElapsed(acc.current);
    setStatus('paused');
  }, [getElapsed]);

  return { status, elapsed, getElapsed, start, pause };
}

interface VagalPacerProps {
  status: SessionStatus;
  elapsed: number;
  getElapsed: () => number;
}

export function VagalPacer({ status, elapsed, getElapsed }: VagalPacerProps) {
  const reduced = useReducedMotion();
  const orbRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const inSession = status === 'running' || status === 'paused';
  const pos = phaseAt(elapsed);
  const phase = BREATH_PHASES[pos.index];

  // 60 fps scale/ring driven from the clock, not from React state.
  useEffect(() => {
    const paint = (e: number) => {
      const p = phaseAt(e);
      const def = BREATH_PHASES[p.index];
      const scale = !inSession ? REST : def.from + (def.to - def.from) * easeInOutSine(p.progress);
      if (orbRef.current) orbRef.current.style.transform = `scale(${reduced ? 0.82 : scale})`;
      if (ringRef.current) {
        const prog = status === 'complete' ? 1 : inSession ? p.progress : 0;
        ringRef.current.style.strokeDashoffset = String(CIRC * (1 - prog));
      }
    };
    if (status !== 'running') {
      paint(getElapsed());
      return;
    }
    let frame = 0;
    const loop = () => {
      paint(getElapsed());
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [status, inSession, reduced, getElapsed]);

  const centre = status === 'idle' ? 'Ready' : status === 'complete' ? 'Complete' : phase.label;
  const dataPhase = inSession ? phase.id : status;

  return (
    <div className="dusq-pacer-block" data-phase={dataPhase} aria-hidden="true">
      <div className="dusq-pacer">
        <svg className="dusq-pacer__ring" viewBox="0 0 200 200">
          <circle className="dusq-pacer__track" cx="100" cy="100" r={R} fill="none" strokeWidth="4" />
          <circle
            ref={ringRef}
            className="dusq-pacer__progress"
            cx="100"
            cy="100"
            r={R}
            fill="none"
            strokeWidth="4"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC}
          />
        </svg>
        <div ref={orbRef} className="dusq-pacer__orb" />
        <div className="dusq-pacer__readout">
          <span className="dusq-pacer__phase">{centre}</span>
          {inSession && <span className="dusq-pacer__count">{Math.max(1, Math.ceil(pos.remaining))}</span>}
          {inSession && (
            <span className="dusq-pacer__cycle">
              Cycle {pos.cycle + 1} of {SESSION_CYCLES}
            </span>
          )}
        </div>
      </div>

      <div className="dusq-pacer__segments">
        {BREATH_PHASES.map((b, i) => {
          const fill =
            status === 'complete' ? 1 : !inSession ? 0 : i < pos.index ? 1 : i === pos.index ? pos.progress : 0;
          return (
            <div key={b.id} className={`dusq-pacer__seg is-${b.id} ${inSession && i === pos.index ? 'is-current' : ''}`}>
              <div className="dusq-pacer__seg-track">
                <div className="dusq-pacer__seg-fill" style={{ transform: `scaleX(${fill})` }} />
              </div>
              <span className="dusq-pacer__seg-label">
                {b.label} {b.sec}s
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
