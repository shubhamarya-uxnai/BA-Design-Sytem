import React from 'react';
import {
  IconActivity,
  IconBrain,
  IconHeartRateMonitor,
  IconWaveSine,
  IconCheck,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useReveal, useCountUp } from '../../hooks/useReveal';

interface MontageChannel {
  id: string;
  ch: string;
  band: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
  svgPath: string;
}

const CHANNELS: MontageChannel[] = [
  {
    id: 'eeg',
    ch: 'CH 01',
    band: '0.5 – 4.0 Hz · Delta',
    title: 'Electroencephalography (EEG)',
    description: 'Continuous recording of delta slow-waves and thalamocortical sleep spindles, confirming true Stage 3 restorative slow-wave sleep continuity.',
    icon: IconBrain,
    svgPath: 'M0,16 C18,3 32,29 50,16 C68,3 82,29 100,16 C118,3 132,29 150,16 C168,3 182,29 200,16',
  },
  {
    id: 'eog',
    ch: 'CH 02',
    band: 'Bilateral Saccades',
    title: 'Electrooculography (EOG)',
    description: 'Bilateral ocular tracking distinguishing rapid eye movement (REM) dreaming cycles from quiet, restorative non-REM sleep stages.',
    icon: IconActivity,
    svgPath: 'M0,16 L30,16 L40,5 L50,27 L60,16 L110,16 L120,6 L130,26 L140,16 L200,16',
  },
  {
    id: 'emg',
    ch: 'CH 03',
    band: 'Sub-µV Motor Atonia',
    title: 'Submental Electromyography (EMG)',
    description: 'Sub-microvolt chin muscle tone measurement validating motor atonia and micro-arousal restlessness spikes without disturbing sleep.',
    icon: IconWaveSine,
    svgPath: 'M0,16 L15,15 L30,17 L45,15 L60,16 L75,13 L85,20 L95,12 L105,18 L120,16 L150,15 L180,17 L200,16',
  },
  {
    id: 'ecg_eda',
    ch: 'CH 04',
    band: 'Autonomic R-R & EDA',
    title: 'Electrocardiography (ECG) & EDA',
    description: 'Millisecond-precise R-R interval tracking and high-density skin conductance telemetry verifying sympathetic surge neutralization.',
    icon: IconHeartRateMonitor,
    svgPath: 'M0,16 L22,16 L27,14 L32,16 L37,4 L42,28 L47,16 L56,18 L65,16 L105,16 C125,9 150,9 175,14 L200,16',
  },
];

export function PsgConcordanceSection() {
  const sectionRef = useReveal<HTMLElement>();
  const { ref: psgRef, value: psgPercent } = useCountUp<HTMLDivElement>(94, 1200);

  return (
    <section id="polysomnography" className="science-section psg-section" ref={sectionRef}>
      {/* Section Header */}
      <div className="science-section-header rv">
        <div className="science-section-tag">
          <IconActivity size={14} stroke={1.75} aria-hidden="true" />
          <span>Clinical Benchmark · Polysomnography</span>
        </div>
        <h2 className="science-section-title">
          Polysomnography: The Gold Standard Diagnostic Benchmark
        </h2>
        <p className="science-section-lead">
          The gold standard. Polysomnography (PSG) is a comprehensive diagnostic test that records
          brain waves, oxygen levels, heart rate, and breathing while you sleep. Every metric and
          intervention in DUSQ is validated directly against clinical PSG.
        </p>
      </div>

      {/* Sleek Unboxed Polysomnography Showcase (Zero nested boxes or card stacks) */}
      <div className="psg-unboxed-stage rv rv-d1">
        <div className="psg-editorial-grid">
          {/* Left Column: Monumental Concordance Metric (Unboxed, Airy) */}
          <div className="psg-metric-column" ref={psgRef}>
            <div className="psg-live-status-pill">
              <span className="psg-pulse-dot" aria-hidden="true" />
              <span>CLINICAL PSG CONCORDANCE</span>
            </div>

            <div className="psg-hero-metric-wrap">
              <span className="psg-big-numeral">{psgPercent}.2</span>
              <span className="psg-big-percent">%</span>
            </div>

            <p className="psg-concordance-statement">
              Epoch-by-epoch sleep staging and micro-arousal detection concordance benchmarked
              against double-blinded board-certified sleep specialist scoring across 1,200+ recording hours.
            </p>

            {/* Live 30-Second Epoch Synchronization Progress Track */}
            <div className="psg-epoch-sync-container">
              <div className="psg-epoch-sync-header">
                <span className="psg-epoch-label">30-Second Epoch Sampling Window</span>
                <span className="psg-epoch-badge">Active Lock</span>
              </div>
              <div className="psg-epoch-track-bar" aria-hidden="true">
                <div className="psg-epoch-fill-animation" />
              </div>
              <div className="psg-epoch-meta-row">
                <span>94.2% Agreement vs Hospital Montage</span>
                <span>Epoch 412 / 480</span>
              </div>
            </div>

            {/* Clinical Rigor Chips */}
            <div className="psg-rigor-pills-row">
              <span className="psg-rigor-chip">
                <IconCheck size={13} stroke={2} aria-hidden="true" />
                <span>30-Second Epoch Resolution</span>
              </span>
              <span className="psg-rigor-chip">
                <IconCheck size={13} stroke={2} aria-hidden="true" />
                <span>Sham-Controlled Protocol</span>
              </span>
              <span className="psg-rigor-chip">
                <IconCheck size={13} stroke={2} aria-hidden="true" />
                <span>AASM Clinical Montage Standards</span>
              </span>
            </div>
          </div>

          {/* Right Column: Sleek 4-Channel Montage Breakdown (Open rows, no boxes) */}
          <div className="psg-montage-column">
            <div className="psg-montage-header">
              <span className="montage-header-title">4-Channel Physiological Montage</span>
              <span className="montage-header-rate">Continuous 64 Hz Telemetry</span>
            </div>

            <div className="psg-montage-rows-list">
              {CHANNELS.map((ch) => {
                const IconComponent = ch.icon;

                return (
                  <div key={ch.id} className="psg-channel-row">
                    <div className="channel-row-main">
                      <div className="channel-meta-badge-row">
                        <span className="channel-ch-code">{ch.ch}</span>
                        <span className="channel-band-tag">{ch.band}</span>
                      </div>

                      <div className="channel-title-group">
                        <div className="channel-icon-pill" aria-hidden="true">
                          <IconComponent size={15} stroke={1.75} />
                        </div>
                        <h3 className="channel-editorial-title">{ch.title}</h3>
                      </div>

                      <p className="channel-editorial-desc">{ch.description}</p>
                    </div>

                    {/* Biometric Waveform Trace Visualization */}
                    <div className="channel-waveform-col" aria-hidden="true">
                      <svg
                        className="channel-wave-svg"
                        viewBox="0 0 200 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d={ch.svgPath}
                          className="channel-wave-path"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="channel-wave-live-dot" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
