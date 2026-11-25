import React from 'react';
import { IconCheck, IconMinus, IconScale, IconShieldCheck } from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';
import { PillButton } from '../PillButton';

interface ScienceComparisonSectionProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function ScienceComparisonSection({ onNavigate }: ScienceComparisonSectionProps) {
  const sectionRef = useReveal<HTMLElement>();

  const rows = [
    {
      feature: 'Action Model',
      dusq: 'Active Closed-Loop Intervention — detects autonomic micro-arousals and restores delta sleep intra-night in real time',
      wearables: 'Passive Morning Logging — retroactively logs poor sleep after you wake up, with zero intervention',
      highlight: true
    },
    {
      feature: 'Sensing Location',
      dusq: 'Hinter-Ear Mastoid Process — direct cranial vascular and auricular vagus nerve branch access',
      wearables: 'Wrist or Finger — subject to thick dermal tissue, peripheral vasoconstriction, and heavy motion artifacts',
      highlight: false
    },
    {
      feature: 'Primary Biometrics',
      dusq: 'High-Density Electrodermal Activity (EDA) + Auricular Optical PPG + 3-Axis Kinematic IMU',
      wearables: 'Delayed Optical Pulse Wave (PPG) only — misses sympathetic sweat gland conductance spikes',
      highlight: false
    },
    {
      feature: 'Surge Detection Latency',
      dusq: '< 15 seconds — sub-awakening autonomic classification before cortical awakening occurs',
      wearables: '5-Minute epoch rolling averages — entirely blind to transient 15-second sympathetic micro-surges',
      highlight: true
    },
    {
      feature: 'Intra-Sleep Intervention',
      dusq: 'Dual Auricular Vagus (nVNS) & Vestibular (nVEnS) sub-sensory micro-pulses',
      wearables: 'None — completely passive sensor hardware with zero neurostimulation capability',
      highlight: true
    },
    {
      feature: 'Ear Canal Occlusion',
      dusq: 'Zero canal intrusion — ear canal remains 100% open, breathable, and unobstructed',
      wearables: 'N/A — worn on wrist or finger, but lacks cranial proximity',
      highlight: false
    }
  ];

  return (
    <section id="wearable-comparison" className="science-section science-comparison-section" ref={sectionRef}>
      {/* Section Header */}
      <div className="science-section-header rv">
        <div className="science-section-tag">
          <IconScale size={14} stroke={1.75} aria-hidden="true" />
          <span>Evaluation · Wearable Benchmark Matrix</span>
        </div>
        <h2 className="science-section-title">
          Active Closed-Loop Intervention vs. Passive Wearables
        </h2>
        <p className="science-section-lead">
          Traditional sleep rings and smartwatches only tell you that you slept poorly the morning after.
          DUSQ is engineered to detect nocturnal autonomic surges and intervene in real time while you sleep.
        </p>
      </div>

      {/* Comparison Table Stage (Unboxed, Highly Legible Column Headers) */}
      <div className="science-compare-card rv rv-d1">
        <div className="science-compare-table-wrapper">
          <table className="science-compare-table">
            <thead>
              <tr>
                <th scope="col" className="compare-th-feature">
                  <span>Evaluation Metric</span>
                </th>
                <th scope="col" className="compare-th-dusq">
                  <div className="compare-header-cell dusq-header">
                    <span className="dusq-badge-pill">DUSQ ONE</span>
                    <strong className="compare-header-headline">Active Closed-Loop Intervention</strong>
                    <span className="compare-header-sub">Continuous Real-Time Sleep Restoration</span>
                  </div>
                </th>
                <th scope="col" className="compare-th-passive">
                  <div className="compare-header-cell passive-header">
                    <span className="passive-badge-pill">SMART RINGS &amp; WRISTWATCHES</span>
                    <strong className="compare-header-headline">Passive Morning Logging</strong>
                    <span className="compare-header-sub">Retroactive Data Tracking Only (No Intervention)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className={row.highlight ? 'is-highlight-row' : ''}>
                  <th scope="row" className="compare-td-feature">
                    {row.feature}
                  </th>
                  <td className="compare-td-dusq">
                    <div className="compare-cell-content">
                      <span className="compare-check-icon" aria-hidden="true">
                        <IconCheck size={16} stroke={2} />
                      </span>
                      <span className="compare-text-val">{row.dusq}</span>
                    </div>
                  </td>
                  <td className="compare-td-passive">
                    <div className="compare-cell-content">
                      <span className="compare-minus-icon" aria-hidden="true">
                        <IconMinus size={16} stroke={2} />
                      </span>
                      <span className="compare-text-val">{row.wearables}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Editorial Science CTA Block (Unboxed, Radiant Luxury Aesthetic) */}
      <div className="science-final-cta-card rv rv-d2">
        <div className="final-cta-content">
          <div className="final-cta-tag">
            <IconShieldCheck size={14} stroke={1.75} aria-hidden="true" />
            <span>Clinical Rigor · DUSQ One</span>
          </div>
          <h2 className="final-cta-title">Experience the Science of Restored Sleep</h2>
          <p className="final-cta-lead">
            The only wearable system clinically engineered to detect nocturnal sympathetic surges
            and restore deep sleep architecture before awakenings fragment your night.
          </p>
          <div className="final-cta-actions">
            <PillButton
              href="#product"
              light
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/', '#product');
                }
              }}
            >
              Explore DUSQ One Device
            </PillButton>
            <PillButton
              href="#evidence"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/', '#evidence');
                }
              }}
            >
              View Clinical Trials &amp; PSG Registry
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
