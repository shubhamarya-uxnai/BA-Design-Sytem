import React, { useEffect, useId, useRef, useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, Selection, IconButton } from '@dusq-design-system/react';
import { useVagalVoice, type VoiceOptions } from './audio/vagalAudioEngine';

interface NightActiveScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
  /** Open directly in Bedside Glance (route: 'bedside-glance'). */
  initialGlance?: boolean;
}

const SOUNDSCAPE: VoiceOptions = {
  frequency: 432,
  toneLevel: 0.35,
  harmonicLevel: 0.1,
  noiseLevel: 0.6,
  noiseLowpassHz: 1400,
  attack: 3,
  release: 4,
};

const GLANCE_BURST: VoiceOptions = {
  frequency: 432,
  toneLevel: 0.45,
  harmonicLevel: 0.08,
  noiseLevel: 0.5,
  noiseLowpassHz: 1200,
  attack: 2,
  release: 4,
  duration: 12,
};

export function NightActiveScreen({ onNavigate, onBack, initialGlance = false }: NightActiveScreenProps) {
  const [glance, setGlance] = useState(initialGlance);
  const [amberCurfew, setAmberCurfew] = useState(true);
  const soundscape = useVagalVoice('winddown-soundscape', 2);
  const previewWrapRef = useRef<HTMLDivElement>(null);

  const exitGlance = () => {
    if (initialGlance) {
      onBack();
      return;
    }
    setGlance(false);
    requestAnimationFrame(() => previewWrapRef.current?.querySelector<HTMLButtonElement>('button')?.focus());
  };

  if (glance) return <BedsideGlance onExit={exitGlance} />;

  return (
    <div className="dusq-screen-scroll dusq-winddown-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton Type="Ghost" Size="Small" icon="arrow_back" onClick={onBack} aria-label="Back to Home" />
        <h3 className="dusq-screen-top-bar__title">06:30 PM WIND-DOWN</h3>
        <Chip Type="Primary" Style="Ghost" Icon={false} chip="Circadian Pacing" />
      </div>

      <div style={{ marginTop: '4px', marginBottom: '4px' }}>
        <div className="dusq-hud-eyebrow">PRE-SLEEP HABIT SCAFFOLDING</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '6px 0 6px', color: 'var(--dusq-text-primary)' }}>Evening Wind-Down</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--dusq-text-secondary)', lineHeight: 1.48, margin: 0 }}>
          By the time you get into bed, your neurological sleep readiness is already 80% determined. Intervene hours
          before bedtime to prime slow-wave recovery.
        </p>
      </div>

      <ol className="dusq-winddown-steps dusq-list-reset">
        <li className="dusq-step-card is-active">
          <div className="step-num" aria-hidden="true">01</div>
          <div className="step-content">
            <div className="step-title">Amber Spectrum Screen Curfew</div>
            <div className="step-desc">
              {amberCurfew ? 'Enabled · Suppressing short-wavelength blue light' : 'Off'}
            </div>
          </div>
          <Selection
            Type="Toggle"
            Checked={amberCurfew}
            showLabel={false}
            onCheckedChange={() => setAmberCurfew((v) => !v)}
            aria-label="Amber spectrum screen curfew"
          />
        </li>

        <li className="dusq-step-card">
          <div className="step-num" aria-hidden="true">02</div>
          <div className="step-content">
            <div className="step-title">Evening Wind-Down Soundscape</div>
            <div className="step-desc">
              {soundscape.playing ? 'Playing on phone · Pink noise & 432 Hz cue' : 'Optional phone audio · Tap play to begin'}
            </div>
          </div>
          <Button
            Type={soundscape.playing ? 'Primary' : 'Ghost'}
            Size="Small"
            Button={soundscape.playing ? 'Pause' : 'Play'}
            aria-pressed={soundscape.playing}
            aria-label="Evening wind-down soundscape"
            {...{ 'Leading Icon': false, 'Tailing Icon': false }}
            onClick={() => (soundscape.playing ? soundscape.stop(2.5) : void soundscape.play(SOUNDSCAPE))}
          />
        </li>

        <li className="dusq-step-card">
          <div className="step-num" aria-hidden="true">03</div>
          <div className="step-content">
            <div className="step-title">Autonomous Overnight Shield</div>
            <div className="step-desc">DUSQ One armed · Silent 0 dB nVNS/nVEnS runs offline</div>
          </div>
          <Chip Type="Success" Style="Ghost" Icon={false} chip="ARMED" />
        </li>
      </ol>

      <div className="dusq-bedside-glance-card">
        <div className="dusq-hud-top-row">
          <div>
            <div className="dusq-hud-eyebrow">NIGHTTIME DISPLAY</div>
            <h4 style={{ margin: '4px 0 0', fontSize: '15.5px', color: 'var(--dusq-text-primary)' }}>Context-Aware Bedside Glance</h4>
          </div>
          <Chip Type="Primary" Style="Ghost" Icon={false} chip="OLED Dim" />
        </div>
        <p style={{ fontSize: '13px', color: 'var(--dusq-text-secondary)', lineHeight: 1.45, margin: '8px 0 14px' }}>
          Test the ultra-dim red-shift bedside mode for middle-of-the-night awakenings.
        </p>
        <div ref={previewWrapRef}>
          <Button
            Type="Ghost"
            Size="Small"
            className="dusq-btn-full"
            Button="Preview Glance"
            {...{ 'Leading Icon': false, 'Tailing Icon': false }}
            onClick={() => setGlance(true)}
          />
        </div>
      </div>

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
    </div>
  );
}

/**
 * Monochrome red only (R channel, G = B = 0). Native buttons are used here on purpose:
 * design-system Buttons render amber/white, which would emit green/blue photons.
 * The burst plays in place — a half-awake user is never sent to a bright screen.
 */
function BedsideGlance({ onExit }: { onExit: () => void }) {
  const burst = useVagalVoice('glance-burst', 2);
  const rootRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    exitRef.current?.focus();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onExit();
      return;
    }
    if (e.key !== 'Tab') return;
    const focusables = rootRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])');
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className="dusq-screen-scroll dusq-bedside-glance-mode"
      data-theme="dark"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onKeyDown={onKeyDown}
    >
      <div className="dusq-glance-header">
        <span className="dusq-glance-dot" aria-hidden="true" />
        <span id={titleId}>BEDSIDE GLANCE</span>
        <button ref={exitRef} type="button" className="dusq-glance-exit-btn" onClick={onExit}>
          Exit Glance
        </button>
      </div>

      <div className="dusq-glance-clock">
        <span className="dusq-glance-time">
          <span className="dusq-sr-only">Time: </span>02:14
        </span>
        <span className="dusq-glance-sub">AUTONOMOUS SLEEP SHIELD ACTIVE</span>
      </div>

      <dl className="dusq-glance-status-card" style={{ margin: 0 }}>
        <div className="dusq-glance-metric">
          <dt className="glance-label">DUSQ One Battery</dt>
          <dd className="glance-value" style={{ margin: 0 }}>87% · 42h Left</dd>
        </div>
        <div className="dusq-glance-divider" aria-hidden="true" />
        <div className="dusq-glance-metric">
          <dt className="glance-label">Sleep Link Contact</dt>
          <dd className="glance-value" style={{ margin: 0 }}>0.8 kΩ · Optimal</dd>
        </div>
      </dl>

      <div className="dusq-glance-action">
        <button
          type="button"
          className="dusq-glance-burst-btn"
          aria-pressed={burst.playing}
          onClick={() => (burst.playing ? burst.stop(2) : void burst.play(GLANCE_BURST))}
        >
          {burst.playing ? 'Stop Cue' : 'Calming Cue'}
        </button>
        <span className="dusq-glance-note">
          Plays a 12-second low-volume breath cadence while DUSQ One maintains silent 0 dB nVNS stabilization.
        </span>
      </div>

      <p className="dusq-sr-only" aria-live="polite">
        {burst.playing ? 'Twelve-second calming cue playing.' : ''}
      </p>
    </div>
  );
}
