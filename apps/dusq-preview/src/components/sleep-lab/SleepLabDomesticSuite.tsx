import React, { useState } from 'react';
import {
  IconBed,
  IconVolumeOff,
  IconMoon,
  IconThermometer,
  IconUsers,
  IconGauge,
  IconAdjustmentsHorizontal
} from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

export function SleepLabDomesticSuite() {
  const sectionRef = useReveal<HTMLElement>();

  // Interactive Bedside Telemetry Simulation State
  const [ambientTemp, setAmbientTemp] = useState<number>(19.4);
  const [ambientLux, setAmbientLux] = useState<number>(0.02);
  const [noiseFloor, setNoiseFloor] = useState<number>(17.8);

  return (
    <section id="domestic-suites" className="sleep-lab-section sleep-lab-domestic" ref={sectionRef}>
      <div className="sleep-lab-container">
        {/* Editorial Section Header */}
        <div className="section-header-editorial rv">
          <div className="section-eyebrow-chip">
            <IconBed size={14} stroke={1.75} aria-hidden="true" />
            <span>ECOLOGICAL CALIBRATION</span>
          </div>
          <h2 className="section-title-editorial">
            Designed around the bedroom, not the lab.
          </h2>
          <p className="section-sub-editorial">
            The lab runs two parallel environments: hospital-grade instrumentation for ground truth,
            and sleep suites furnished to replicate genuine domestic conditions.
          </p>
        </div>

        {/* Narrative Columns */}
        <div className="editorial-essay-grid rv rv-d1">
          <div className="essay-col">
            <p className="essay-para lead-para">
              In traditional sleep clinics, subjects wake up to fluorescent light switches,
              audible cooling compressors, and walls of diagnostic racks. In the DUSQ Sleep Lab,
              there is no visible clinical instrumentation in the bedroom suites.
            </p>
            <p className="essay-para">
              Mattresses, pillows, ambient temperature, circadian lighting, and acoustic background
              are all configurable to match each subject&rsquo;s familiar sleep environment at home.
              Cabling is routed invisibly through acoustic partitions into our adjacent control room.
            </p>
          </div>

          <div className="essay-col">
            <p className="essay-para">
              The <strong>DUSQ charging case</strong> sits on the bedside nightstand in these rooms,
              continuously logging ambient sound, light, and temperature throughout every night.
              The same environmental signals the product logs in your bedroom are logged here.
            </p>
            <p className="essay-para highlight-para">
              This allows micro-arousal spikes in the postauricular EDA signal to be correlated
              directly with the room conditions that may be driving them&mdash;distinguishing a
              physiological stress surge from an external noise spike.
            </p>
          </div>
        </div>

        {/* Master Visual Frame: Domestic Bedroom Suite */}
        <div className="sleep-lab-visual-frame-block rv rv-d2">
          <div className="sleep-lab-image-container domestic-image-frame">
            <img
              src="/sleep-lab/domestic-bedroom-suite.png"
              alt="DUSQ domestic bedroom simulation suite showing bed, nightstand, and discreet telemetry sensors"
              className="sleep-lab-framed-img"
              width="716"
              height="440"
              loading="eager"
              decoding="async"
            />
            <div className="image-caption-tag">
              <span className="caption-dot" aria-hidden="true" />
              <span className="caption-label">Ecological Suite Architecture</span>
              <span className="caption-divider" aria-hidden="true">&middot;</span>
              <span className="caption-val">STC-65 Acoustic Dampening &middot; 19.4&deg;C Climate Regulated &middot; 4 Parallel Testing Rooms</span>
            </div>
          </div>
        </div>

        {/* The 4-Subject Simultaneous Room Scientific Breakdown */}
        <div className="simultaneous-room-card rv rv-d3">
          <div className="simultaneous-head">
            <div className="simultaneous-icon-box">
              <IconUsers size={22} stroke={1.75} />
            </div>
            <div>
              <span className="simultaneous-tag">SCIENTIFIC DESIGN CHOICE</span>
              <h3 className="simultaneous-title">
                The 4-Subject Simultaneous Synchronized Suite
              </h3>
            </div>
          </div>

          <p className="simultaneous-desc">
            One of our specialized suites accommodates four subjects sleeping concurrently on the
            exact same night. When four people sleep under identical acoustic, thermal, and atmospheric
            conditions, the environment stops being a variable. Any differences in how their autonomic
            nervous systems behave can only come from individual physiology.
          </p>

          <div className="simultaneous-subjects-grid">
            <div className="subject-box">
              <div className="subject-head">
                <span className="subject-badge">SUBJECT 01</span>
                <span className="subject-status">SYNCHRONIZED</span>
              </div>
              <div className="subject-data">
                <span className="subject-metric-label">BASELINE HRV:</span>
                <strong className="subject-metric-val">42 ms RMSSD</strong>
                <span className="subject-metric-label">SURGES DETECTED:</span>
                <strong className="subject-metric-val">19 / night</strong>
              </div>
            </div>

            <div className="subject-box">
              <div className="subject-head">
                <span className="subject-badge">SUBJECT 02</span>
                <span className="subject-status">SYNCHRONIZED</span>
              </div>
              <div className="subject-data">
                <span className="subject-metric-label">BASELINE HRV:</span>
                <strong className="subject-metric-val">68 ms RMSSD</strong>
                <span className="subject-metric-label">SURGES DETECTED:</span>
                <strong className="subject-metric-val">26 / night</strong>
              </div>
            </div>

            <div className="subject-box">
              <div className="subject-head">
                <span className="subject-badge">SUBJECT 03</span>
                <span className="subject-status">SYNCHRONIZED</span>
              </div>
              <div className="subject-data">
                <span className="subject-metric-label">BASELINE HRV:</span>
                <strong className="subject-metric-val">34 ms RMSSD</strong>
                <span className="subject-metric-label">SURGES DETECTED:</span>
                <strong className="subject-metric-val">31 / night</strong>
              </div>
            </div>

            <div className="subject-box">
              <div className="subject-head">
                <span className="subject-badge">SUBJECT 04</span>
                <span className="subject-status">SYNCHRONIZED</span>
              </div>
              <div className="subject-data">
                <span className="subject-metric-label">BASELINE HRV:</span>
                <strong className="subject-metric-val">55 ms RMSSD</strong>
                <span className="subject-metric-label">SURGES DETECTED:</span>
                <strong className="subject-metric-val">22 / night</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Bedside Charging Case Environmental Telemetry Bar */}
        <div className="bedside-telemetry-console rv rv-d4">
          <div className="bedside-console-head">
            <div className="bedside-title-row">
              <IconGauge size={18} stroke={1.75} />
              <strong className="bedside-title">BEDSIDE CASE &middot; CONTINUOUS AMBIENT SENSING</strong>
            </div>
            <span className="bedside-status-pill">
              <span className="status-dot-pulse" aria-hidden="true" />
              <span>LOGGING REAL TIME</span>
            </span>
          </div>

          <div className="bedside-gauges-row">
            <div className="bedside-gauge-item">
              <div className="gauge-icon-box">
                <IconVolumeOff size={20} stroke={1.75} />
              </div>
              <div className="gauge-info">
                <span className="gauge-label">ACOUSTIC ISOLATION</span>
                <div className="gauge-value-row">
                  <strong className="gauge-value">{noiseFloor}</strong>
                  <span className="gauge-unit">dB SPL</span>
                </div>
                <p className="gauge-caption">Acoustic attenuation chamber floor</p>
              </div>
            </div>

            <div className="bedside-gauge-item">
              <div className="gauge-icon-box">
                <IconMoon size={20} stroke={1.75} />
              </div>
              <div className="gauge-info">
                <span className="gauge-label">CIRCADIAN ILLUMINANCE</span>
                <div className="gauge-value-row">
                  <strong className="gauge-value">{ambientLux}</strong>
                  <span className="gauge-unit">Lux</span>
                </div>
                <p className="gauge-caption">Blackout shutter baseline</p>
              </div>
            </div>

            <div className="bedside-gauge-item">
              <div className="gauge-icon-box">
                <IconThermometer size={20} stroke={1.75} />
              </div>
              <div className="gauge-info">
                <span className="gauge-label">THERMAL GRADIENT</span>
                <div className="gauge-value-row">
                  <strong className="gauge-value">{ambientTemp}</strong>
                  <span className="gauge-unit">&deg;C</span>
                </div>
                <p className="gauge-caption">Calibrated for deep slow-wave onset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
