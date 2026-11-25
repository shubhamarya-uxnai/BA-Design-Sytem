import React, { useEffect, useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, ProgressDonut, IconButton, Selection } from '@dusq-design-system/react';
import { VagalPacer, useBreathSession, phaseAt, BREATH_PHASES, SESSION_SEC } from './VagalPacer';
import { useVagalVoice, type VoiceOptions } from './audio/vagalAudioEngine';

interface BedtimeReadinessScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
}

const BASELINE = 12;
const TARGET = 85;
const DRONE: VoiceOptions = {
  frequency: 432,
  toneLevel: 0.4,
  harmonicLevel: 0.08,
  noiseLevel: 0.3,
  noiseLowpassHz: 1200,
  attack: 2,
  release: 3,
  initialLevel: 0.3,
};

const breathLevel = (id: string) => (id === 'exhale' ? 0.3 : 1);

export function BedtimeReadinessScreen({ onNavigate, onBack }: BedtimeReadinessScreenProps) {
  const session = useBreathSession(SESSION_SEC);
  const drone = useVagalVoice('pacer-drone');
  const [audioCue, setAudioCue] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const { status, elapsed } = session;

  // Simulated: readiness tracks session completion. In production, derive from pod HRV (e.g. RMSSD delta).
  const readiness = Math.round(BASELINE + (TARGET - BASELINE) * Math.min(1, elapsed / SESSION_SEC));
  const pos = phaseAt(elapsed);
  const phaseKey = `${pos.cycle}:${pos.index}`;

  // Phase transitions: announce, haptic tick, breath-synced audio swell.
  useEffect(() => {
    if (status !== 'running') return;
    const def = BREATH_PHASES[pos.index];
    setAnnouncement(`${def.label}, ${def.sec} seconds. ${def.cue}.`);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(def.id === 'hold' ? 12 : [16, 60, 16]);
    }
    if (audioCue) drone.ramp(breathLevel(def.id), def.id === 'hold' ? 0.3 : Math.max(0.3, pos.remaining));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseKey, status]);

  useEffect(() => {
    if (status === 'complete') {
      drone.stop(3);
      setAnnouncement(`Session complete. Readiness ${TARGET} percent.`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const startDrone = async () => {
    const ok = await drone.play(DRONE);
    if (ok) {
      const p = phaseAt(session.getElapsed());
      drone.ramp(breathLevel(BREATH_PHASES[p.index].id), Math.max(0.3, p.remaining));
    }
  };

  const onPrimary = () => {
    if (status === 'running') {
      session.pause();
      drone.stop(1.5);
      setAnnouncement('Paused.');
      return;
    }
    session.start();
    if (audioCue) void startDrone();
  };

  const toggleAudio = () => {
    const next = !audioCue;
    setAudioCue(next);
    if (!next) drone.stop(1);
    else if (status === 'running') void startDrone();
  };

  const chipText =
    status === 'idle'
      ? `${BASELINE}% Baseline · Ready`
      : status === 'running'
        ? `${readiness}% · Session active`
        : status === 'paused'
          ? `${readiness}% · Paused`
          : `${TARGET}% Primed · Complete`;

  const primaryLabel =
    status === 'running'
      ? 'Pause Breathing'
      : status === 'paused'
        ? 'Resume Breathing'
        : status === 'complete'
          ? 'Restart Session'
          : 'Start Breathing';

  return (
    <div className="dusq-screen-scroll dusq-readiness-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton Type="Ghost" Size="Small" icon="arrow_back" onClick={onBack} aria-label="Back to Home" />
        <h3 className="dusq-screen-top-bar__title">07:00 PM READINESS</h3>
        <Chip Type="Primary" Style="Ghost" Icon={false} chip="Pre-Sleep Pacing" />
      </div>

      <div className="dusq-readiness-donut-container">
        <div
          className="dusq-donut-wrap"
          role="progressbar"
          aria-label="Sleep readiness"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={readiness}
        >
          <ProgressDonut Type={readiness >= 70 ? 'Success' : 'In Progress'} value={readiness} Legend={false} />
          <div className="dusq-donut-center" aria-hidden="true">
            <span className="donut-num">{readiness}%</span>
            <span className="donut-label">READINESS</span>
          </div>
        </div>

        <div className="dusq-readiness-pacing-meta">
          <Chip Type={readiness >= 70 ? 'Success' : 'Primary'} Style="Ghost" Icon={false} chip={chipText} />
        </div>

        <div className="dusq-readiness-trio">
          <div className="trio-item">
            <span className="trio-val">52 bpm</span>
            <span className="trio-lbl">Resting HR</span>
          </div>
          <div className="trio-item">
            <span className="trio-val" style={{ color: 'var(--ba-semantic-color-tokens-status-success-text)' }}>0.8 kΩ</span>
            <span className="trio-lbl">Ag/AgCl Contact</span>
          </div>
          <div className="trio-item">
            <span className="trio-val">+{readiness - BASELINE}%</span>
            <span className="trio-lbl">Vagal Shift</span>
          </div>
        </div>
      </div>

      <div className="dusq-vagal-pacer-card">
        <div className="dusq-hud-top-row">
          <div>
            <div className="dusq-hud-eyebrow">BIOFEEDBACK PACER</div>
            <h4 style={{ margin: '4px 0 0', fontSize: '15.5px', color: 'var(--dusq-text-primary)' }}>4-7-8 Parasympathetic Pacing</h4>
          </div>
          <Chip Type="Primary" Style="Ghost" Icon={false} chip="4 cycles · 76s" />
        </div>

        <p style={{ fontSize: '13px', color: 'var(--dusq-text-secondary)', lineHeight: 1.48, margin: '8px 0 14px' }}>
          Inhale 4 s, hold 7 s, exhale 8 s. A long, slow exhale shifts autonomic balance toward parasympathetic tone
          before bed.
        </p>

        <VagalPacer status={status} elapsed={elapsed} getElapsed={session.getElapsed} />

        <div className="dusq-pacer-options">
          <Selection
            Type="Toggle"
            Checked={audioCue}
            showLabel={false}
            onCheckedChange={() => toggleAudio()}
            aria-label="Breath-synced audio cue"
          />
          <span aria-hidden="true">Breath-synced audio cue</span>
        </div>

        <div style={{ marginTop: '14px' }}>
          <Button
            Type={status === 'running' ? 'Ghost' : 'Primary'}
            Size="Large"
            className="dusq-btn-full"
            Button={primaryLabel}
            {...{ 'Leading Icon': false, 'Tailing Icon': false }}
            onClick={onPrimary}
          />
        </div>
      </div>

      <button type="button" className="dusq-hardware-check-tile" onClick={() => onNavigate('placement-guide')}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="dusq-pod-glyph is-small" aria-hidden="true">
            <span className="pod-dot pod-dot-1" />
            <span className="pod-dot pod-dot-2" />
          </span>
          <span>
            <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--dusq-text-primary)' }}>
              DUSQ One · Sleep Link Fit
            </span>
            <span style={{ display: 'block', fontSize: '12px', color: 'var(--ba-semantic-color-tokens-status-success-text)' }}>
              ✓ 0.8 kΩ skin coupling · Tap to verify mastoid placement
            </span>
          </span>
        </span>
        <span aria-hidden="true" style={{ fontSize: '18px', color: 'var(--dusq-text-muted)' }}>→</span>
      </button>

      <div style={{ marginTop: '4px' }}>
        <Button
          Type="Primary"
          Size="Large"
          className="dusq-btn-full"
          Button="Return Home"
          {...{ 'Leading Icon': false, 'Tailing Icon': false }}
          onClick={onBack}
        />
      </div>

      <p className="dusq-sr-only" aria-live="polite">{announcement}</p>
    </div>
  );
}
