import React from 'react';
import { IconBuildingHospital, IconShieldCheck } from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';
import { PillButton } from '../PillButton';

interface SleepLabSectionProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function SleepLabSection({ onNavigate }: SleepLabSectionProps) {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="sleep-lab" className="science-section science-sleeplab-section" ref={sectionRef}>
      {/* Compact 2-Column Editorial Header + Action Bridge */}
      <div className="sleeplab-compact-header rv">
        <div className="sleeplab-header-copy">
          <div className="science-section-tag">
            <IconBuildingHospital size={14} stroke={1.75} aria-hidden="true" />
            <span>Sleep Lab · Physical Proof</span>
          </div>
          <h2 className="science-section-title">
            Our Sleep Lab: Where It All Comes Together
          </h2>
          <p className="science-section-lead">
            Built inside a seven-bed physical sleep laboratory with controlled acoustic and thermal
            chambers—where every metric, algorithm, and neuromodulation waveform is calibrated.
          </p>
        </div>

        <div className="sleeplab-cta-bridge">
          <PillButton
            href="/pages/the-sleep-lab"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/pages/the-sleep-lab');
              }
            }}
          >
            Tour The Sleep Lab Facility
          </PillButton>
          <PillButton
            light
            href="#evidence"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/', '#evidence');
              }
            }}
          >
            Explore Clinical Trial Data
          </PillButton>
        </div>
      </div>

      {/* Unified Single-Fold 2-Column Showcase Stage */}
      <div className="sleeplab-single-fold-stage rv rv-d1">
        {/* Left: Architectural Photography Frame + Anchored Proof Metrics Plinth */}
        <div className="sleeplab-showcase-frame">
          <img
            src="/science/sleep-lab-bg.png"
            alt="DUSQ seven-bed clinical sleep research laboratory with physiological monitoring suites"
            className="sleeplab-showcase-img"
            loading="eager"
            decoding="async"
          />
          <div className="sleeplab-image-tag">
            <span className="sleeplab-live-dot" aria-hidden="true" />
            <span>7 Acoustically Isolated PSG Suites &middot; Continuous Bedside Telemetry</span>
          </div>

          <div className="sleeplab-photo-metrics-plinth" role="list" aria-label="Sleep Lab Proof Metrics">
            <div className="sleeplab-plinth-item" role="listitem">
              <strong className="plinth-metric-number">7 Suites</strong>
              <span className="plinth-metric-desc">
                Acoustically &amp; thermally isolated sleep chambers
              </span>
            </div>
            <div className="sleeplab-plinth-item" role="listitem">
              <strong className="plinth-metric-number">1,200+</strong>
              <span className="plinth-metric-desc">
                Overnight PSG sessions analyzed across chronotypes
              </span>
            </div>
            <div className="sleeplab-plinth-item" role="listitem">
              <strong className="plinth-metric-number">CTRI/2026</strong>
              <span className="plinth-metric-desc">
                Registered clinical protocol vs. hospital PSG
              </span>
            </div>
          </div>
        </div>

        {/* Right: The Validation Protocol Architectural Column */}
        <div className="sleeplab-protocol-bar">
          <div className="sleeplab-protocol-header">
            <div className="protocol-eyebrow-pill">
              <IconShieldCheck size={14} stroke={2} aria-hidden="true" />
              <span>THE VALIDATION PROTOCOL</span>
            </div>
            <span className="protocol-header-desc">
              Multi-sensor clinical verification from raw physiological signal to published benchmark.
            </span>
          </div>

          <div className="sleeplab-protocol-steps" role="list" aria-label="Validation Protocol Steps">
            <div className="protocol-step-item" role="listitem">
              <span className="step-num">01</span>
              <div className="step-info">
                <strong className="step-name">32-Channel Montage</strong>
                <span className="step-sub">Full clinical PSG ground truth acquisition</span>
              </div>
            </div>
            <div className="protocol-step-item" role="listitem">
              <span className="step-num">02</span>
              <div className="step-info">
                <strong className="step-name">Real-Time DSP</strong>
                <span className="step-sub">Millisecond autonomic surge detection</span>
              </div>
            </div>
            <div className="protocol-step-item" role="listitem">
              <span className="step-num">03</span>
              <div className="step-info">
                <strong className="step-name">Epoch Concordance</strong>
                <span className="step-sub">94.2% gold-standard sleep stage scoring</span>
              </div>
            </div>
            <div className="protocol-step-item" role="listitem">
              <span className="step-num">04</span>
              <div className="step-info">
                <strong className="step-name">Peer-Reviewed Trial</strong>
                <span className="step-sub">Published clinical efficacy &amp; safety evidence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
