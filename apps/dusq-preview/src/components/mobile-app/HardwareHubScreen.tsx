import React, { useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, IconButton } from '@dusq-design-system/react';
import { useVagalVoice, type VoiceOptions } from './audio/vagalAudioEngine';

interface HardwareHubScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
  batteryPercent?: number;
}

/** Pure carrier, no noise bed: a diagnostic should be spectrally clean. */
const DIAGNOSTIC_TONE: VoiceOptions = {
  frequency: 432,
  toneLevel: 0.8,
  harmonicLevel: 0,
  noiseLevel: 0,
  attack: 0.25,
  release: 0.9,
  duration: 3,
};

export function HardwareHubScreen({ onNavigate, onBack, batteryPercent = 87 }: HardwareHubScreenProps) {
  const tone = useVagalVoice('diagnostic-tone', 0.3);
  const [unavailable, setUnavailable] = useState(false);

  const handleTestTone = async () => {
    if (tone.playing) {
      tone.stop(0.3);
      return;
    }
    const ok = await tone.play(DIAGNOSTIC_TONE);
    setUnavailable(!ok);
  };

  return (
    <div className="dusq-screen-scroll dusq-hardware-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton Type="Ghost" Size="Small" icon="arrow_back" onClick={onBack} aria-label="Back" />
        <h3 className="dusq-screen-top-bar__title">DUSQ ONE HUB</h3>
        <Chip Type="Success" Style="Ghost" Icon={false} chip="BLE 5.3 Connected" />
      </div>

      <div className="dusq-hardware-pod-hero">
        <div className="dusq-pod-hero-glow" aria-hidden="true">
          <div className="dusq-pod-glyph is-large">
            <span className="pod-dot pod-dot-1" />
            <span className="pod-dot pod-dot-2" />
          </div>
        </div>
        <h3 className="dusq-pod-hero-name">DUSQ One</h3>
        <span className="dusq-pod-hero-sub">Behind-the-Ear Neurostimulator · Firmware v2.1.4</span>

        <dl className="dusq-pod-stats-strip" style={{ margin: 0 }}>
          <div className="strip-item">
            <dd className="strip-val" style={{ margin: 0 }}>{batteryPercent}%</dd>
            <dt className="strip-lbl">Battery</dt>
            <span className="strip-sub">~42h Standby</span>
          </div>
          <div className="strip-divider" aria-hidden="true" />
          <div className="strip-item">
            <dd className="strip-val" style={{ margin: 0, color: 'var(--ba-semantic-color-tokens-status-success-text)' }}>0.8 kΩ</dd>
            <dt className="strip-lbl">Sleep Link</dt>
            <span className="strip-sub">Ag/AgCl Fit</span>
          </div>
          <div className="strip-divider" aria-hidden="true" />
          <div className="strip-item">
            <dd className="strip-val" style={{ margin: 0 }}>42</dd>
            <dt className="strip-lbl">Nights</dt>
            <span className="strip-sub">Offline Flash</span>
          </div>
        </dl>
      </div>

      <div className="dusq-hardware-feature-card">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div className="dusq-feature-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18.36 5.64a9 9 0 0 1 0 12.73M5.64 5.64a9 9 0 0 0 0 12.73M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" strokeLinecap="round" />
              <line x1="1" y1="1" x2="23" y2="23" stroke="var(--ba-semantic-color-tokens-status-error-fill)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: 'var(--dusq-text-primary)' }}>Zero Phone Radiation at Night</h4>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--dusq-text-secondary)', lineHeight: 1.48 }}>
              DUSQ One executes EDA/PPG surge detection and silent 0 dB nVNS + nVEnS neuromodulation locally on-device.
              Your phone can remain in Airplane mode.
            </p>
          </div>
        </div>
      </div>

      <div className="dusq-hardware-feature-card">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div className="dusq-feature-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 16h5v5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: 'var(--dusq-text-primary)' }}>Overnight Telemetry Buffer</h4>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--dusq-text-secondary)', lineHeight: 1.48 }}>
              All 4 overnight surge events synced to companion app at 07:15 AM via 10-second low-energy burst.
            </p>
          </div>
        </div>
      </div>

      <div className="dusq-bedside-glance-card">
        <div className="dusq-hud-top-row">
          <div>
            <div className="dusq-hud-eyebrow">SLEEP LINK FIT</div>
            <h4 style={{ margin: '4px 0 0', fontSize: '15.5px', color: 'var(--dusq-text-primary)' }}>Mastoid Placement & Fit Check</h4>
          </div>
          <Chip Type="Success" Style="Ghost" Icon={false} chip="96% Coupled" />
        </div>
        <p style={{ fontSize: '13px', color: 'var(--dusq-text-secondary)', lineHeight: 1.45, margin: '8px 0 14px' }}>
          Verify behind-the-ear postauricular placement and Ag/AgCl Sleep Link conductance (0.8 kΩ) before sleep.
        </p>
        <Button
          Type="Ghost"
          Size="Small"
          className="dusq-btn-full"
          Button="Verify Fit →"
          {...{ 'Leading Icon': false, 'Tailing Icon': false }}
          onClick={() => onNavigate('placement-guide')}
        />
      </div>

      <div className="dusq-bedside-glance-card">
        <div className="dusq-hud-top-row">
          <div>
            <div className="dusq-hud-eyebrow">SLEEP LINK CALIBRATION</div>
            <h4 style={{ margin: '4px 0 0', fontSize: '15.5px', color: 'var(--dusq-text-primary)' }}>Impedance & Confirmation Cue</h4>
          </div>
          <Chip Type="Primary" Style="Ghost" Icon={false} chip="0 dB Pod · Cue" />
        </div>
        <p style={{ fontSize: '13px', color: 'var(--dusq-text-secondary)', lineHeight: 1.45, margin: '8px 0 14px' }}>
          Verifies Ag/AgCl Sleep Link contact and plays a gentle 3-second confirmation chime on your phone.
        </p>
        <Button
          Type={tone.playing ? 'Ghost' : 'Primary'}
          Size="Small"
          className="dusq-btn-full"
          Button={tone.playing ? 'Stop Chime' : 'Run Check'}
          {...{ 'Leading Icon': false, 'Tailing Icon': false }}
          onClick={handleTestTone}
        />
        {unavailable && (
          <p className="dusq-inline-warning" role="alert">
            Audio couldn't start. Check that your device isn't muted and try again.
          </p>
        )}
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

      <p className="dusq-sr-only" aria-live="polite">
        {tone.playing ? 'Playing 3-second Sleep Link confirmation chime.' : ''}
      </p>
    </div>
  );
}
