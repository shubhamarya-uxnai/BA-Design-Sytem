import React from 'react';
import { IconAlertTriangle, IconHome, IconBuildingHospital, IconRipple, IconWaveSine, IconCheck, IconMinus } from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

export function SleepLabFirstNight() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="first-night-effect" className="sleep-lab-section sleep-lab-first-night" ref={sectionRef}>
      <div className="sleep-lab-container">
        {/* Editorial Section Header */}
        <div className="section-header-editorial rv">
          <div className="section-eyebrow-chip">
            <IconAlertTriangle size={14} stroke={1.75} aria-hidden="true" />
            <span>THE PHYSIOLOGICAL PARADOX</span>
          </div>
          <h2 className="section-title-editorial">
            The problem we had to solve first.
          </h2>
          <p className="section-sub-editorial">
            The lab was built. Then came the first studies. And the data came back telling us
            something clinical medicine had known for decades, but never fully solved.
          </p>
        </div>

        {/* Narrative Columns */}
        <div className="editorial-essay-grid rv rv-d1">
          <div className="essay-col">
            <p className="essay-para lead-para">
              Clinical sleep environments, the standard for sleep research, carry a specific limitation.
              The first night in an unfamiliar sleep environment, even under carefully controlled conditions,
              produces consistent changes in sleep architecture.
            </p>
            <p className="essay-para">
              REM is reduced. Sleep onset takes longer. Wakefulness increases. The autonomic nervous
              system responds to environmental novelty, and that response shows up directly in the
              data. Researchers call this the <strong>First-Night Effect (FNE)</strong>, and it is
              universally documented in polysomnography literature.
            </p>
          </div>

          <div className="essay-col">
            <p className="essay-para">
              For a device designed to function in real environments, this created a critical constraint.
              Data collected in a cold hospital room tells you how a device performs in a hospital room.
              DUSQ needed to know how it performs in the actual conditions where people live, rest, and sleep.
            </p>
            <p className="essay-para highlight-para">
              The environment itself was shaping what we were measuring. Every design decision that followed,
              from acoustic dampening to domestic linen and lighting calibration, was engineered to
              eliminate this distortion.
            </p>
          </div>
        </div>

        {/* Master Framed Visual: The First-Night Effect Chamber */}
        <div className="sleep-lab-visual-frame-block rv rv-d2">
          <div className="sleep-lab-image-container">
            <img
              src="/sleep-lab/first-night-effect.png"
              alt="DUSQ sleep research environment engineered with domestic warmth to counteract the first-night effect"
              className="sleep-lab-framed-img"
              width="1079"
              height="636"
              loading="eager"
              decoding="async"
            />
            <div className="image-caption-tag">
              <span className="caption-dot" aria-hidden="true" />
              <span className="caption-label">Domestic Sleep Chamber 03</span>
              <span className="caption-divider" aria-hidden="true">&middot;</span>
              <span className="caption-val">&lt; 18.2 dB Acoustic Floor &middot; Concealed 32-Channel PSG Conduits</span>
            </div>
          </div>
        </div>

        {/* Core Architectural Mandate Quote */}
        <div className="sleep-lab-quote-unboxed rv rv-d3">
          <blockquote className="quote-text-editorial">
            &ldquo;The lab had to hold two things simultaneously: the measurement precision
            that clinical validation requires, and the ecological conditions that make the data
            reflect actual sleep.&rdquo;
          </blockquote>
        </div>

        {/* Head-to-Head Architectural Comparison (Hospital Lab vs DUSQ Ecological Chamber) */}
        <div className="fne-comparison-grid rv rv-d4">
          {/* Column A: Traditional Hospital Sleep Lab */}
          <div className="fne-col traditional-col">
            <div className="fne-col-header">
              <IconBuildingHospital size={18} stroke={1.75} className="fne-header-icon" />
              <div>
                <span className="fne-col-tag">TRADITIONAL SLEEP LAB</span>
                <h3 className="fne-col-title">Hospital Polysomnography</h3>
              </div>
            </div>

            <ul className="fne-points-list">
              <li>
                <span className="fne-point-badge danger">
                  <IconMinus size={12} stroke={2.5} aria-hidden="true" />
                </span>
                <div>
                  <strong>First-Night Disruption:</strong> Novelty stress suppresses REM by up to 28% and prolongs onset latency by 18&ndash;35 minutes.
                </div>
              </li>
              <li>
                <span className="fne-point-badge danger">
                  <IconMinus size={12} stroke={2.5} aria-hidden="true" />
                </span>
                <div>
                  <strong>Autonomic Overdrive:</strong> Hospital unfamiliarity triggers acute sympathetic vigilance, elevating skin conductance artifacts.
                </div>
              </li>
              <li>
                <span className="fne-point-badge danger">
                  <IconMinus size={12} stroke={2.5} aria-hidden="true" />
                </span>
                <div>
                  <strong>Sterile Environment:</strong> Fluorescent corridors, monitoring hum, medicalized beds, and technicians entering to adjust leads.
                </div>
              </li>
            </ul>
          </div>

          {/* Column B: DUSQ Ecological Chamber */}
          <div className="fne-col dusq-col">
            <div className="fne-col-header">
              <IconHome size={18} stroke={1.75} className="fne-header-icon orange-icon" />
              <div>
                <span className="fne-col-tag orange-tag">DUSQ ARCHITECTURE</span>
                <h3 className="fne-col-title">Ecological Bedroom Lab</h3>
              </div>
            </div>

            <ul className="fne-points-list">
              <li>
                <span className="fne-point-badge success">
                  <IconCheck size={12} stroke={2.5} aria-hidden="true" />
                </span>
                <div>
                  <strong>Authentic Sleep Architecture:</strong> Familiar domestic beddings, acoustic dampening, and configurable ambient conditions normalize Night 01.
                </div>
              </li>
              <li>
                <span className="fne-point-badge success">
                  <IconCheck size={12} stroke={2.5} aria-hidden="true" />
                </span>
                <div>
                  <strong>Pristine Autonomic Baseline:</strong> True nocturnal electrodermal baseline undisturbed by clinical intimidation or novelty bias.
                </div>
              </li>
              <li>
                <span className="fne-point-badge success">
                  <IconCheck size={12} stroke={2.5} aria-hidden="true" />
                </span>
                <div>
                  <strong>Hidden Precision:</strong> Full 32-channel PSG telemetry routed silently through soundproof partitions with zero technician interruption.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
