import React, { useState } from 'react';
import {
  IconActivity,
  IconHeartRateMonitor,
  IconCompass,
} from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

interface SensorModality {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  spec: string;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
}

interface HardwareMarker {
  id: string;
  badge: string;
  name: string;
  detail: string;
  dotX: number; // percentage X of image viewport
  dotY: number; // percentage Y of image viewport
  lineLen: number; // px length of leader line to reach alignment margin
  side: 'left' | 'right';
  modalityIdx: number;
}

const SENSOR_MODALITIES: SensorModality[] = [
  {
    id: 'eda',
    num: '01',
    title: 'High-Density Electrodermal Activity (EDA)',
    category: 'Sympathetic Baseline',
    description:
      'Measures postauricular skin conductance to detect sympathetic fight-or-flight surges within seconds — zero pulse transit delay.',
    spec: 'Dual Ag/AgCl Dry Contacts · 64 Hz Real-Time Sampling',
    icon: IconActivity,
  },
  {
    id: 'ppg',
    num: '02',
    title: 'Auricular Optical PPG',
    category: 'Vascular Telemetry',
    description:
      'Direct cranial arterial pulse-wave telemetry positioned over the posterior auricular artery — delivering continuous HRV free from wrist motion artifacts.',
    spec: 'Dual-Wavelength Optical Aperture · 24-Bit Optical ADC',
    icon: IconHeartRateMonitor,
  },
  {
    id: 'imu',
    num: '03',
    title: '3-Axis Kinematic IMU',
    category: 'Motion Classification',
    description:
      'On-device motion classification distinguishes normal sleep movements from autonomic surges to prevent false stimulation triggers.',
    spec: 'Low-Noise 3-Axis MEMS · On-Device DSP Filtering',
    icon: IconCompass,
  },
];

const HARDWARE_MARKERS: HardwareMarker[] = [
  {
    id: 'eda-contacts',
    badge: '01 · SENSOR',
    name: 'Ag/AgCl Dry Contacts',
    detail: 'Dual galvanic skin conductance',
    dotX: 30,
    dotY: 17,
    lineLen: 52,
    side: 'left',
    modalityIdx: 0,
  },
  {
    id: 'ppg-aperture',
    badge: '02 · OPTICAL',
    name: 'Optical PPG Aperture',
    detail: 'Dual-wavelength pulse transit (HRV)',
    dotX: 58,
    dotY: 21,
    lineLen: 64,
    side: 'right',
    modalityIdx: 1,
  },
  {
    id: 'dsp-imu',
    badge: '03 · PROCESSOR',
    name: 'Bioelectronic DSP & IMU',
    detail: 'On-device 64 Hz kinematic filter',
    dotX: 66,
    dotY: 35,
    lineLen: 58,
    side: 'right',
    modalityIdx: 2,
  },
  {
    id: 'lithium-cell',
    badge: 'POWER',
    name: 'Rechargeable Micro-Cell',
    detail: '14+h continuous autonomy',
    dotX: 47,
    dotY: 53,
    lineLen: 78,
    side: 'left',
    modalityIdx: 2,
  },
  {
    id: 'titanium-chassis',
    badge: 'FRAME',
    name: 'Grade-5 Titanium Chassis',
    detail: '12.0g mastoid anchor unibody',
    dotX: 36,
    dotY: 66,
    lineLen: 62,
    side: 'left',
    modalityIdx: 0,
  },
];

export function SensorStackSection() {
  const sectionRef = useReveal<HTMLElement>();
  const [selectedSensorIdx, setSelectedSensorIdx] = useState<number>(0);

  return (
    <section id="sensor-stack" className="science-section sensor-stack-section" ref={sectionRef}>
      {/* Section Header */}
      <div className="science-section-header rv">
        <div className="science-section-tag">
          <IconActivity size={14} stroke={1.75} aria-hidden="true" />
          <span>Sensing · Hinter-Ear Biometrics</span>
        </div>
        <h2 className="science-section-title">
          Our Unique Sensor Stack: Unparalleled Physiological Signal
        </h2>
        <p className="science-section-lead">
          Positioned on the mastoid process behind the ear — millimeters from the cranial vascular
          network and vagal nerve branches, completely free from wrist motion artifacts.
        </p>
      </div>

      {/* Unboxed Editorial Stage: Clean 2-Column Layout */}
      <div className="sensor-showcase-stage rv rv-d1">
        <div className="sensor-showcase-grid">
          {/* Left: Exploded Hardware Engineering Render with Precision Markers */}
          <div className="sensor-visual-column">
            <div className="sensor-exploded-frame">
              <div className="sensor-exploded-viewport">
                <img
                  src="/science/sensor-stack-exploded.png"
                  alt="DUSQ One hardware exploded engineering view showing dry contacts, optical aperture, DSP board, battery, and titanium chassis"
                  className="sensor-clean-exploded-img"
                  loading="eager"
                />

                {/* Precision Interactive Hardware Markers in Right Place & Order */}
                <div className="sensor-markers-layer" aria-label="Hardware Component Markers">
                  {HARDWARE_MARKERS.map((marker) => {
                    const isLinkedActive = selectedSensorIdx === marker.modalityIdx;

                    return (
                      <button
                        key={marker.id}
                        type="button"
                        className={`hardware-marker side-${marker.side} ${isLinkedActive ? 'is-active' : ''}`}
                        style={
                          {
                            '--dot-x': `${marker.dotX}%`,
                            '--dot-y': `${marker.dotY}%`,
                            '--line-len': `${marker.lineLen}px`,
                          } as React.CSSProperties
                        }
                        onClick={() => setSelectedSensorIdx(marker.modalityIdx)}
                        aria-label={`Highlight ${marker.name}`}
                      >
                        {/* Target Component Dot */}
                        <span className="marker-dot-wrap">
                          <span className="marker-dot-ring" />
                          <span className="marker-dot-core" />
                        </span>

                        {/* Leader Line */}
                        <span className="marker-lead-line" aria-hidden="true" />

                        {/* Callout Card */}
                        <div className="marker-pill-card">
                          <span className="marker-pill-tag">{marker.badge}</span>
                          <strong className="marker-pill-name">{marker.name}</strong>
                          <span className="marker-pill-sub">{marker.detail}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="sensor-visual-caption">
              DUSQ One Hardware Architecture · 12.0g mastoid anchor · Zero ear-canal intrusion
            </p>
          </div>

          {/* Right: Minimal, Scannable Sensor Modalities */}
          <div className="sensor-content-column">
            <div className="sensor-modalities-list" role="tablist" aria-label="Biometric Sensors">
              {SENSOR_MODALITIES.map((sensor, idx) => {
                const isActive = selectedSensorIdx === idx;
                const Icon = sensor.icon;

                return (
                  <div
                    key={sensor.id}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={0}
                    className={`sensor-item-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => setSelectedSensorIdx(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedSensorIdx(idx);
                      }
                    }}
                  >
                    <div className="sensor-item-indicator" aria-hidden="true">
                      <span className="sensor-num-badge">{sensor.num}</span>
                    </div>

                    <div className="sensor-item-copy">
                      <div className="sensor-item-meta">
                        <span className="sensor-item-category">{sensor.category}</span>
                      </div>

                      <h3 className="sensor-item-title">{sensor.title}</h3>

                      <p className="sensor-item-desc">{sensor.description}</p>

                      <div className="sensor-item-spec">
                        <Icon size={14} stroke={1.75} className="sensor-spec-icon" />
                        <span>{sensor.spec}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Unboxed Metric Strip: Clean, Breathable, No Boxy Cells */}
        <div className="sensor-metrics-strip">
          <div className="sensor-stat-item">
            <div className="sensor-stat-num">
              <span className="sensor-stat-val">12</span>
              <span className="sensor-stat-unit">g</span>
            </div>
            <span className="sensor-stat-label">Total Mass · Postauricular anchor</span>
          </div>
          <div className="sensor-stat-item">
            <div className="sensor-stat-num">
              <span className="sensor-stat-val">64</span>
              <span className="sensor-stat-unit">Hz</span>
            </div>
            <span className="sensor-stat-label">Continuous on-device DSP</span>
          </div>
          <div className="sensor-stat-item">
            <div className="sensor-stat-num">
              <span className="sensor-stat-val">0</span>
              <span className="sensor-stat-unit">mm</span>
            </div>
            <span className="sensor-stat-label">Zero ear-canal intrusion</span>
          </div>
          <div className="sensor-stat-item">
            <div className="sensor-stat-num">
              <span className="sensor-stat-val">16</span>
              <span className="sensor-stat-unit">hrs</span>
            </div>
            <span className="sensor-stat-label">All-night battery runtime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
