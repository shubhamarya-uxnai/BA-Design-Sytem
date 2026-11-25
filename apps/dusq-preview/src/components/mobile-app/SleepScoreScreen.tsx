import React, { useId, useRef, useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, IconButton, ProgressBar, SegmentedChild, SegmentedProgress } from '@dusq-design-system/react';
import { SurgeWaveformCanvas, type SurgeTrace } from './SurgeWaveformCanvas';

interface SleepScoreScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
}

interface SurgeEvent {
  time: string;
  stage: string;
  type: string;
  vagalAudioFrequency: string;
  deltaPreserved: string;
  detectSummary: string;
  interveneSummary: string;
  stabiliseSummary: string;
  /** Illustrative trace parameters for the simulator — replace with synced pod telemetry. */
  trace: SurgeTrace;
}

const SURGE_EVENTS: SurgeEvent[] = [
  {
    time: '12:44 AM',
    stage: 'Core Sleep',
    type: 'Sympathetic Micro-Arousal',
    vagalAudioFrequency: 'Silent 0 dB nVNS + nVEnS',
    deltaPreserved: '+8m Delta Preserved',
    detectSummary: 'EDA tonic spike + sudden 11 bpm heart rate acceleration detected in 42ms.',
    interveneSummary: 'DUSQ One delivered 12s silent 0 dB nVNS + nVEnS electrical neuromodulation.',
    stabiliseSummary: 'Vagal deceleration restored baseline core sleep. Awake threshold was avoided.',
    trace: { preBpm: 53, peakBpm: 64, stableBpm: 52, detectMs: 42, burstSec: 12 },
  },
  {
    time: '02:14 AM',
    stage: 'Deep Delta',
    type: 'High Micro-Arousal Spike',
    vagalAudioFrequency: 'Targeted nVNS Micro-Pulse (12s)',
    deltaPreserved: '+14m Slow-Wave Preserved',
    detectSummary: 'Micro-arousal sympathetic flare detected in <50ms while in deep delta.',
    interveneSummary: 'Targeted sub-sensory nVNS pulse via Sleep Links suppressed the autonomic spike.',
    stabiliseSummary: 'Heart rate dropped from 68 to 51 bpm. Slow-wave delta rhythm preserved intact.',
    trace: { preBpm: 55, peakBpm: 68, stableBpm: 51, detectMs: 47, burstSec: 12 },
  },
  {
    time: '04:02 AM',
    stage: 'REM Sleep',
    type: 'Vascular Autonomic Shift',
    vagalAudioFrequency: 'Sub-Sensory nVEnS Modulation',
    deltaPreserved: '+9m REM Continuity',
    detectSummary: 'Peripheral vasoconstriction detected via Auricular PPG vascular sensors.',
    interveneSummary: 'Gentle nVEnS stabilization preserved parasympathetic tone without sound or vibration.',
    stabiliseSummary: 'Vasomotor stability recovered. Dreaming phase continued uninterrupted.',
    trace: { preBpm: 60, peakBpm: 71, stableBpm: 58, detectMs: 45, burstSec: 12 },
  },
  {
    time: '05:38 AM',
    stage: 'Deep Delta',
    type: 'Sub-Threshold Cortisol Flare',
    vagalAudioFrequency: 'Closed-Loop nVNS Stabilizer',
    deltaPreserved: '+7m Delta Preserved',
    detectSummary: 'Pre-dawn sympathetic cortisol surge detected 45 mins before scheduled wake.',
    interveneSummary: 'Closed-loop vagal modulation prevented premature pre-dawn awakening.',
    stabiliseSummary: 'Christopher remained in slow-wave sleep until natural circadian dawn.',
    trace: { preBpm: 52, peakBpm: 63, stableBpm: 50, detectMs: 44, burstSec: 12 },
  },
];

const describe = (e: SurgeEvent) =>
  `Heart-rate reconstruction at ${e.time}: rose from ${e.trace.preBpm} to ${e.trace.peakBpm} bpm, ` +
  `detected in ${e.trace.detectMs} milliseconds; a ${e.trace.burstSec}-second silent nVNS intervention followed; ` +
  `heart rate settled at ${e.trace.stableBpm} bpm.`;

export function SleepScoreScreen({ onNavigate, onBack }: SleepScoreScreenProps) {
  const [active, setActive] = useState(1);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();
  const surge = SURGE_EVENTS[active];

  const onTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const len = SURGE_EVENTS.length;
    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % len;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + len) % len;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = len - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="dusq-screen-scroll dusq-surges-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton Type="Ghost" Size="Small" icon="arrow_back" onClick={onBack} aria-label="Back to Home" />
        <h3 className="dusq-screen-top-bar__title">INTRODUCING SURGES</h3>
        <Chip Type="Success" Style="Ghost" Icon={false} chip="4/4 Stabilized" />
      </div>

      <div style={{ marginTop: '4px', marginBottom: '4px' }}>
        <div className="dusq-hud-eyebrow">AUTONOMOUS SLEEP PRESERVATION</div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '6px 0 6px', color: 'var(--dusq-text-primary)', letterSpacing: '-0.01em' }}>
          Your Brain Was Protected 4 Times Last Night
        </h2>
        <p style={{ fontSize: '13.5px', color: 'var(--dusq-text-secondary)', lineHeight: 1.48, margin: 0 }}>
          When sleep breaks, it's not because you woke up—it's because an autonomic micro-arousal triggered minutes
          earlier. DUSQ One intercepts surges silently with 0 dB nVNS + nVEnS stimulation before you wake.
        </p>
      </div>

      <div className="dusq-surge-stats-grid">
        <div className="dusq-surge-stat-card">
          <span className="dusq-stat-big">4</span>
          <span className="dusq-stat-sub">Surges Intercepted</span>
          <span className="dusq-stat-tag" style={{ color: 'var(--ba-semantic-color-tokens-status-success-text)' }}>100% Efficacy</span>
        </div>
        <div className="dusq-surge-stat-card">
          <span className="dusq-stat-big" style={{ color: 'var(--ba-color-themes-primary-300)' }}>+38m</span>
          <span className="dusq-stat-sub">Delta Sleep Saved</span>
          <span className="dusq-stat-tag" style={{ color: 'var(--ba-semantic-color-tokens-status-success-text)' }}>Slow-Wave</span>
        </div>
        <div className="dusq-surge-stat-card">
          <span className="dusq-stat-big">0</span>
          <span className="dusq-stat-sub">Full Awakenings</span>
          <span className="dusq-stat-tag" style={{ color: 'var(--ba-semantic-color-tokens-status-success-text)' }}>Zero Inertia</span>
        </div>
      </div>

      <div className="dusq-surge-hud-card">
        <div className="dusq-hud-top-row">
          <div>
            <div className="dusq-hud-eyebrow">CLOSED-LOOP SURGE RECONSTRUCTION</div>
            <h4 id={`${uid}-tabs-label`} style={{ margin: '4px 0 0', fontSize: '15px', color: 'var(--dusq-text-primary)' }}>
              Select an overnight surge event:
            </h4>
          </div>
          <Chip Type="Success" Style="Ghost" Icon={false} chip="OFFLINE SYNCED" />
        </div>

        <div className="dusq-surge-selector-row" role="tablist" aria-labelledby={`${uid}-tabs-label`}>
          {SURGE_EVENTS.map((evt, idx) => (
            <button
              key={evt.time}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${idx}`}
              aria-selected={idx === active}
              aria-controls={`${uid}-panel`}
              tabIndex={idx === active ? 0 : -1}
              className={`dusq-surge-tab ${idx === active ? 'is-active' : ''}`}
              onClick={() => setActive(idx)}
              onKeyDown={(e) => onTabKeyDown(e, idx)}
            >
              <span className="surge-tab-dot" aria-hidden="true" />
              <span>{evt.time}</span>
            </button>
          ))}
        </div>

        <div
          className="dusq-surge-wave-panel"
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${active}`}
        >
          <div className="dusq-wave-stage-badge">
            Stage: <strong>{surge.stage}</strong> · {surge.type}
          </div>

          <SurgeWaveformCanvas trace={surge.trace} description={describe(surge)} />

          <div style={{ marginTop: '12px' }}>
            <SegmentedProgress>
              <SegmentedChild
                Type="Warning"
                Icon={false}
                title="Detect"
                body={`${surge.trace.detectMs} ms flare`}
              />
              <SegmentedChild
                Type="In Progress"
                Icon={false}
                title="Intervene"
                body={`${surge.trace.burstSec}s nVNS`}
              />
              <SegmentedChild
                Type="Completed"
                Icon={false}
                title="Stabilise"
                body={`${surge.trace.peakBpm} → ${surge.trace.stableBpm} bpm`}
              />
            </SegmentedProgress>
          </div>

          <ul className="dusq-surge-narrative dusq-list-reset">
            <li>{surge.detectSummary}</li>
            <li>{surge.interveneSummary}</li>
            <li>{surge.stabiliseSummary}</li>
          </ul>
        </div>
      </div>

      <div className="dusq-hypnogram-card">
        <div className="dusq-hud-eyebrow">OVERNIGHT SLEEP ARCHITECTURE</div>
        <h4 style={{ margin: '4px 0 12px', fontSize: '15px', color: 'var(--dusq-text-primary)' }}>Preserved Hypnogram Stages</h4>
        {[
          { name: 'Deep Delta (Slow-Wave)', val: '1h 48m · +38m preserved', pct: 42, type: 'Warning' as const },
          { name: 'REM Sleep (Cognitive Restoration)', val: '1h 42m', pct: 38, type: 'In Progress' as const },
          { name: 'Core Sleep (Light N2)', val: '3h 48m', pct: 65, type: 'Success' as const },
          { name: 'Awake Time', val: '24m · 0 Full Awakenings', pct: 8, type: 'Not Started' as const },
        ].map((s) => (
          <div key={s.name} className="dusq-stage-row">
            <div className="dusq-stage-meta">
              <span className="stage-name">{s.name}</span>
              <span className="stage-val">{s.val}</span>
            </div>
            <ProgressBar Type={s.type} value={s.pct} Legend={false} />
          </div>
        ))}
      </div>

      <figure className="dusq-quote-card" style={{ margin: 0 }}>
        <blockquote className="dusq-quote-text" style={{ margin: 0 }}>
          "A score in the morning is a verdict on a night that's already over. You can't change it. You can only carry
          it into your day. DUSQ protects the night as it happens."
        </blockquote>
        <figcaption className="dusq-quote-author">— Dr. Siddhant Bhargava, Founder & CEO</figcaption>
      </figure>

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
