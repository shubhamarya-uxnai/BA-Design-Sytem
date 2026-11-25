import React, { useState } from 'react';
import {
  IconActivity,
  IconWaveSine,
  IconMoonStars,
  IconDeviceMobileOff,
  IconFeather,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useReveal } from '../hooks/useReveal';

interface ReadoutMetric {
  value: string;
  label: string;
}

interface WorkStage {
  number: string;
  stepTag: string;
  telemetryBadge: string;
  headline: string;
  primaryNarrative: string;
  clinicalDetail: string;
  readouts: ReadoutMetric[];
  image: string;
}

const STAGES: WorkStage[] = [
  {
    number: '01',
    stepTag: 'DETECT',
    telemetryBadge: 'STAGE 01 · POSTAURICULAR EDA',
    headline: 'Detects when sleep breaks — before you wake up.',
    primaryNarrative:
      'Your nervous system experiences 20 to 30 sympathetic micro-surges each night. These surges pull your brain from restorative delta sleep into shallow stages.',
    clinicalDetail:
      'Patented electrodermal activity (EDA) sensors sit behind the ear on the mastoid process, sampling sympathetic tone in real time.',
    readouts: [
      { value: '50M+', label: 'Calibration pts' },
      { value: '<15s', label: 'Surge detection' },
      { value: '20–30', label: 'Surges / night' },
    ],
    image: '/how-it-works/step-1-detect.jpg',
  },
  {
    number: '02',
    stepTag: 'INTERVENE',
    telemetryBadge: 'STAGE 02 · nVNS + nVEnS PULSE',
    headline: 'Intervenes automatically and adaptively in real time.',
    primaryNarrative:
      'The moment a sympathetic surge is detected, DUSQ delivers gentle non-invasive neurostimulation to restore parasympathetic tone before sleep is fractured.',
    clinicalDetail:
      'Dual pathways work in concert: non-invasive vagus nerve stimulation (nVNS) and stochastic vestibular stimulation (nVEnS) reinforce delta synchronization.',
    readouts: [
      { value: 'Dual', label: 'nVNS + nVEnS' },
      { value: '0 dB', label: 'Sub-sensory pulse' },
      { value: 'Adaptive', label: 'Real-time dosing' },
    ],
    image: '/how-it-works/step-2-intervene.jpg',
  },
  {
    number: '03',
    stepTag: 'STABILISE',
    telemetryBadge: 'STAGE 03 · DEEP SLEEP CONTINUITY',
    headline: 'Stabilises restorative deep sleep across all 5 cycles.',
    primaryNarrative:
      'By neutralizing nocturnal surges before they break sleep architecture, DUSQ preserves Stage 3 deep sleep and REM continuity so you wake restored.',
    clinicalDetail:
      'Runs all night autonomously on-device with zero phone or Bluetooth dependency. Validated against clinical polysomnography with 94.2% concordance.',
    readouts: [
      { value: '+34%', label: 'Deep sleep gain' },
      { value: '0', label: 'Phone dependency' },
      { value: '14+ hrs', label: 'Overnight loop' },
    ],
    image: '/how-it-works/step-3-stabilise.webp',
  },
];

interface CapabilityItem {
  title: string;
  desc: string;
  tag: string;
  caption: string;
  image: string;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
}

const CAPABILITY_ITEMS: CapabilityItem[] = [
  {
    title: 'Patented EDA sensing',
    desc: 'Tracks sympathetic micro-arousals across 50M+ datapoints.',
    tag: 'Electrodermal Baseline',
    caption: 'Dual micro-machined Ag/AgCl galvanic contact rings on contoured bio-compatible titanium.',
    image: '/science/eda-sensor-detail.png',
    icon: IconActivity,
  },
  {
    title: 'Vagus-vestibular response',
    desc: 'Adapts gentle stimulation to your baseline in real time.',
    tag: 'Dual Neuromodulation',
    caption: 'Dual acoustic micro-transducers delivering synchronized sub-perceptual vagal and vestibular modulation.',
    image: '/science/dusq-sensor-hardware-hero.png',
    icon: IconWaveSine,
  },
  {
    title: 'Works through 3 AM surges',
    desc: 'Stabilises sleep architecture before conscious waking.',
    tag: 'Nocturnal Continuity',
    caption: 'Closed-loop DSP detects and quiets sympathetic volatility before sleep architecture breaks.',
    image: '/science/clean-surges-wave.jpg',
    icon: IconMoonStars,
  },
  {
    title: 'Zero phone dependency',
    desc: 'Senses, intervenes, and stores data on-device all night.',
    tag: 'On-Device Edge MCU',
    caption: 'Autonomous on-device edge computing. Zero nocturnal Bluetooth or EMF in the bedroom.',
    image: '/science/clean-dusq-product-dock.webp',
    icon: IconDeviceMobileOff,
  },
  {
    title: '12g behind-the-ear fit',
    desc: 'Engineered for side, back, CPAP, and earbud sleepers.',
    tag: 'Zero In-Ear Occlusion',
    caption: 'Weightless mastoid contour flange engineered for side sleepers with zero pillow interference.',
    image: '/science/clean-dusq-product-3.webp',
    icon: IconFeather,
  },
  {
    title: '30-night risk-free trial',
    desc: 'Includes 1-year app access and 3 months of sleep links.',
    tag: 'Clinical Protocol',
    caption: 'Complete DUSQ kit with bedside dock, sleep links, and 30-night clinical home guarantee.',
    image: '/science/clean-dusq-product-links.webp',
    icon: IconShieldCheck,
  },
];

interface HowItWorksProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function HowItWorks({ onNavigate }: HowItWorksProps) {
  const sectionRef = useReveal<HTMLElement>();
  const capRef = useReveal<HTMLElement>();
  const [activeStep, setActiveStep] = useState(0);
  const [activeCap, setActiveCap] = useState(0);

  const currentStage = STAGES[activeStep];
  const currentCap = CAPABILITY_ITEMS[activeCap];

  return (
    <>
      {/* 1. Closed-Loop Nocturnal Cycle: Deep Midnight Editorial */}
      <section className="how-clean-section" id="how-it-works" ref={sectionRef}>
        <div className="how-architecture-wrap rv">
          {/* Section Header */}
          <header className="how-clean-header">
            <div className="how-clean-pill">
              <span className="how-clean-dot" />
              <span>The System at Work · Closed-Loop Architecture</span>
            </div>
            <h2 className="how-clean-headline">
              How it works — Built to turn restless nights into unbroken deep sleep.
            </h2>
            <p className="how-clean-subhead">
              A continuous closed-loop cycle designed to sense sympathetic disruption, intervene adaptively, and safeguard restorative deep sleep.
            </p>

            {/* 3 Stage Selector Tabs */}
            <div className="how-clean-tabs" role="tablist" aria-label="Closed loop stages">
              {STAGES.map((stg, idx) => (
                <button
                  key={stg.number}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === idx}
                  className={`how-clean-tab-btn ${activeStep === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <span>0{idx + 1}</span>
                  <span>{stg.stepTag}</span>
                </button>
              ))}
            </div>
          </header>

          {/* 2-Column Split: Narrative & Metrics on Left, Image Visual on Right */}
          <div className="how-clean-stage-grid" key={currentStage.number}>
            <div className="how-clean-stage-copy">
              <span className="how-clean-stage-badge">{currentStage.telemetryBadge}</span>
              <h3 className="how-clean-stage-title">{currentStage.headline}</h3>
              <p className="how-clean-stage-desc">{currentStage.primaryNarrative}</p>
              <p className="how-clean-stage-detail">{currentStage.clinicalDetail}</p>

              {/* Readouts Strip */}
              <div className="how-clean-readouts">
                {currentStage.readouts.map((r, rIdx) => (
                  <div key={rIdx} className="how-clean-readout-item">
                    <strong className="how-clean-readout-val">{r.value}</strong>
                    <span className="how-clean-readout-lbl">{r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="how-clean-stage-media">
              <img
                src={currentStage.image}
                alt={currentStage.headline}
                className="how-clean-stage-img"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Capabilities: Distinct Hardware Showcase with Studio Titanium Aesthetics */}
      <section className="capabilities-clean-section" id="capabilities" ref={capRef}>
        <div className="capabilities-open-wrap rv rv-d1">
          <header className="capabilities-open-header">
            <div className="capabilities-clean-pill">
              <span className="capabilities-clean-dot" />
              <span>Hardware & System Specifications</span>
            </div>
            <h2 className="capabilities-open-headline">
              Everything your sleep needs and <em>nothing</em> it doesn’t.
            </h2>
            <p className="capabilities-open-subhead">
              Engineered exclusively around nocturnal physiological needs. Zero bulky headbands, zero intrusive wires, zero conscious effort.
            </p>
          </header>

          <div className="capabilities-open-grid">
            {/* Left Visual Preview Frame with dedicated hardware photography */}
            <div className="capabilities-visual-frame">
              <img
                key={currentCap.image}
                src={currentCap.image}
                alt={currentCap.title}
                className="capabilities-visual-img"
                loading="eager"
              />
              <div className="capabilities-visual-caption">
                <strong>{currentCap.title}</strong>
                <p>{currentCap.caption}</p>
              </div>
            </div>

            {/* Right Open Capability List: Distinct active borders & zero image duplication */}
            <div className="capabilities-open-list" role="tablist" aria-label="Capabilities list">
              {CAPABILITY_ITEMS.map((item, idx) => {
                const isActive = activeCap === idx;
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={0}
                    className={`capabilities-open-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveCap(idx)}
                    onMouseEnter={() => setActiveCap(idx)}
                    onFocus={() => setActiveCap(idx)}
                  >
                    <div className="capabilities-open-icon">
                      <Icon size={20} stroke={1.75} />
                    </div>
                    <div className="capabilities-open-text">
                      <div className="capabilities-open-title-row">
                        <h4 className="capabilities-open-title">{item.title}</h4>
                        <span className="capabilities-open-tag">{item.tag}</span>
                      </div>
                      <p className="capabilities-open-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
