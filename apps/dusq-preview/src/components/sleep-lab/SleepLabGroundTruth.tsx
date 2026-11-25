import React, { useState } from 'react';
import {
  IconReportAnalytics,
} from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

interface GroundTruthChannel {
  id: string;
  tabLabel: string;
  name: string;
  spec: string;
  clinicalPurpose: string;
  dusqCorrelation: string;
  processPills: string[];
}

const GROUND_TRUTH_CHANNELS: GroundTruthChannel[] = [
  {
    id: 'eda',
    tabLabel: 'Autonomic EDA (Sympathetic)',
    name: 'Clinical Research Electrodermal Activity',
    spec: 'Palmar/Thenar Electrodes · 100 Hz',
    clinicalPurpose: 'Research-grade palmar and thenar electrodes capturing galvanic micro-conductance spikes driven by postganglionic sympathetic sudomotor bursts.',
    dusqCorrelation: 'Direct ground-truth benchmark verifying that DUSQ behind-the-ear mastoid EDA detects 94.2% of genuine nocturnal sympathetic surges in real time.',
    processPills: ['Palmar Electrodes', 'Behind-the-Ear Sensor', '94.2% Concordance']
  },
  {
    id: 'eeg',
    tabLabel: 'Brainwaves (EEG Staging)',
    name: 'Clinical Polysomnography EEG',
    spec: 'C3/C4/O1/O2 Potentials · 500 Hz',
    clinicalPurpose: 'Gold-standard electrical potentials scored epoch-by-epoch to classify N1, N2 sleep spindles, N3 deep slow-wave, and REM cycles.',
    dusqCorrelation: 'Confirms that targeted non-invasive vagal pulses protect Stage 3 slow-wave delta continuity without micro-arousals or fragmentation.',
    processPills: ['32-Channel EEG', 'Epoch Scoring', 'Delta Power Preserved']
  },
  {
    id: 'ecg',
    tabLabel: 'Heart Rhythm & HRV',
    name: 'Dual-Lead Electrocardiography & HRV',
    spec: 'Millisecond R-R Intervals · 1,000 Hz',
    clinicalPurpose: 'Dual-lead ECG tracking millisecond R-R intervals to compute High-Frequency (HF) vagal power and nocturnal RMSSD recovery dynamics.',
    dusqCorrelation: 'Proves a +40% increase in parasympathetic nocturnal tone following closed-loop intra-sleep neurostimulation.',
    processPills: ['Millisecond R-R', 'Vagal Tone', '+40% Parasympathetic']
  },
  {
    id: 'wearables',
    tabLabel: 'Consumer Wearables (Oura / WHOOP / Apple)',
    name: 'Continuous Multi-Wearable Parallel Matrix',
    spec: 'Same Subjects · Same Night · Continuous',
    clinicalPurpose: 'Every leading consumer ring, watch, and strap runs concurrently on the same subject alongside 32-channel clinical polysomnography in the sleep lab.',
    dusqCorrelation: 'Proves that deep sleep improvements recorded on clinical PSG directly translate into higher recovery scores in the devices users already own.',
    processPills: ['Hospital PSG Truth', 'DUSQ Stabilization', 'Visible In Your Device']
  }
];

export function SleepLabGroundTruth() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeChannelId, setActiveChannelId] = useState<string>('eda');

  const activeChannel = GROUND_TRUTH_CHANNELS.find((c) => c.id === activeChannelId) || GROUND_TRUTH_CHANNELS[0];

  return (
    <section id="ground-truth" className="sleep-lab-section sleep-lab-ground-truth" ref={sectionRef}>
      <div className="sleep-lab-container">
        {/* Editorial Section Header */}
        <div className="section-header-editorial rv">
          <div className="section-eyebrow-chip">
            <IconReportAnalytics size={14} stroke={1.75} aria-hidden="true" />
            <span>MEASUREMENT INTEGRITY</span>
          </div>
          <h2 className="section-title-editorial">
            What does ground truth mean here?
          </h2>
          <p className="section-sub-editorial">
            Before anything else could be measured, the lab had to decide what measurement meant.
            For a device making specific claims about the nervous system during sleep, ground truth has to be absolute.
          </p>
        </div>

        {/* Narrative Columns */}
        <div className="editorial-essay-grid rv rv-d1">
          <div className="essay-col">
            <p className="essay-para lead-para">
              <strong>Polysomnography (PSG)</strong> is the most complete picture of human sleep
              that science has. It records the electrical activity of the brain through the night,
              allowing certified clinical sleep technologists to score every 30-second epoch of sleep as it happens.
            </p>
            <p className="essay-para">
              Alongside EEG, it captures eye movement to confirm REM; muscle activity to track
              transitions; heart rhythm and variability; breathing effort; and blood oxygenation.
              Every channel runs simultaneously, through every single hour of the night.
            </p>
          </div>

          <div className="essay-col">
            <p className="essay-para">
              Alongside PSG, the lab runs clinical-grade electrodermal activity (EDA) research equipment&mdash;the
              same sensing modality DUSQ uses, but captured via multi-thousand-dollar laboratory instruments.
              This establishes what the autonomic signal looks like at the exact millisecond of a genuine surge.
            </p>
            <p className="essay-para highlight-para">
              Every other sleep measurement tool, consumer or clinical, is ultimately calibrated against
              what PSG records. It is the instrument that tells you what actually happened during sleep,
              not a mathematical proxy for it.
            </p>
          </div>
        </div>

        {/* Master Visual Frame: Ground Truth PSG Electrode Montage */}
        <div className="sleep-lab-visual-frame-block rv rv-d2">
          <div className="sleep-lab-image-container psg-image-frame">
            <img
              src="/sleep-lab/ground-truth-psg.png"
              alt="Subject equipped with clinical polysomnography electrode montage undergoing sleep study validation"
              className="sleep-lab-framed-img"
              width="716"
              height="440"
              loading="eager"
              decoding="async"
            />
            <div className="image-caption-tag">
              <span className="caption-dot" aria-hidden="true" />
              <span className="caption-label">Clinical PSG Benchmark</span>
              <span className="caption-divider" aria-hidden="true">&middot;</span>
              <span className="caption-val">32-Channel Montage Synchronized with DUSQ Postauricular Sensor</span>
            </div>
          </div>
        </div>

        {/* Unboxed Ground Truth Credo Quote */}
        <div className="sleep-lab-quote-unboxed rv rv-d3">
          <blockquote className="quote-text-editorial text-center">
            &ldquo;Every claim DUSQ makes was true in this room first.&rdquo;
          </blockquote>
        </div>

        {/* Simplified, Open Ground Truth Validation Matrix (Pre-built DUSQ Pattern) */}
        <div className="ground-truth-matrix-section rv rv-d4">
          <div className="matrix-heading">
            <span className="eyebrow">AASM CLINICAL BENCHMARK &middot; SIGNAL CORRELATION ARCHITECTURE</span>
            <h3 className="section-title-editorial" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', margin: '10px 0 24px 0' }}>
              How each physiological signal is proven.
            </h3>
          </div>

          {/* Minimalist Tab Selector (Pre-built DUSQ Pill Tab Pattern) */}
          <div className="fix-tabs" role="tablist" aria-label="Clinical validation channels">
            {GROUND_TRUTH_CHANNELS.map((ch) => (
              <button
                key={ch.id}
                type="button"
                role="tab"
                aria-selected={activeChannelId === ch.id}
                className={activeChannelId === ch.id ? 'is-active' : ''}
                onClick={() => setActiveChannelId(ch.id)}
              >
                {ch.tabLabel}
              </button>
            ))}
          </div>

          {/* Open, Borderless Editorial Layout (Pre-built DUSQ Pattern) */}
          <div className="fix-open-layout" role="tabpanel" aria-label={activeChannel.name}>
            <div className="fix-open-grid" key={activeChannel.id}>
              {/* Left Column: Clinical Reference Standard */}
              <div className="fix-open-col">
                <span className="eyebrow">Clinical Reference Standard</span>
                <p className="fix-open-text">{activeChannel.clinicalPurpose}</p>
                <div className="fix-open-process">
                  <span>{activeChannel.spec}</span>
                </div>
              </div>

              {/* Right Column: DUSQ Wearable Correlation */}
              <div className="fix-open-col">
                <span className="eyebrow">DUSQ Correlation &amp; Verification</span>
                <p className="fix-open-text">{activeChannel.dusqCorrelation}</p>
                <div className="fix-open-process">
                  {activeChannel.processPills.map((step, sIdx) => (
                    <React.Fragment key={step}>
                      {sIdx > 0 && <span className="process-sep">&rarr;</span>}
                      <span>{step}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
