import React from 'react';
import { IconCheck, IconMinus, IconArrowDown } from '@tabler/icons-react';
import { useReveal } from '../hooks/useReveal';

interface ComparisonRow {
  feature: string;
  category?: string;
  dusq: string;
  trackers: string;
  pulsetto: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Core Mechanism',
    dusq: 'Active Closed-Loop Neuromodulation',
    trackers: 'Passive Sleep Logging',
    pulsetto: 'Manual Daytime VNS',
  },
  {
    feature: 'Anatomical Placement',
    dusq: 'Behind the ear (mastoid process)',
    trackers: 'Wrist band or finger ring',
    pulsetto: 'Heavy neck collar',
  },
  {
    feature: 'Nocturnal Biosensing',
    dusq: 'Postauricular EDA + Vascular PPG',
    trackers: 'Optical PPG only',
    pulsetto: 'None (no sensors)',
  },
  {
    feature: 'Active During 3 AM Surges',
    dusq: 'Yes',
    trackers: 'No',
    pulsetto: 'No',
  },
  {
    feature: 'Deep Slow-Wave Delta Gain',
    dusq: '+34% (Verified by clinical PSG)',
    trackers: '0% (Passive observation only)',
    pulsetto: 'Unverified during sleep',
  },
  {
    feature: 'Autonomous On-Device Loop',
    dusq: 'Yes',
    trackers: 'No',
    pulsetto: 'No',
  },
  {
    feature: 'Nocturnal Bedroom Phone EMF',
    dusq: '0 mW (Operates phone-free all night)',
    trackers: 'Continuous Bluetooth BLE broadcast',
    pulsetto: 'Requires connected phone app',
  },
  {
    feature: 'Sleep Ergonomics & Weight',
    dusq: '~12g (Side, back & earbud friendly)',
    trackers: '4–27g (Ring / wrist strap)',
    pulsetto: '~120g (Bulky collar)',
  },
  {
    feature: 'Subscription Lock-In',
    dusq: 'Zero mandatory subscription',
    trackers: '$19–$30 / month required fee',
    pulsetto: 'Zero subscription',
  },
];

function renderCell(value: string, isDusq: boolean) {
  if (value === 'Yes') {
    return (
      <span className="comp-badge comp-yes">
        <span className="comp-icon-bubble" aria-hidden="true">
          <IconCheck size={14} stroke={2.5} />
        </span>
        <span>Yes</span>
      </span>
    );
  }
  if (value === 'No') {
    return (
      <span className="comp-badge comp-no">
        <span className="comp-icon-bubble" aria-hidden="true">
          <IconMinus size={13} stroke={2} />
        </span>
        <span>No</span>
      </span>
    );
  }
  return <span className={isDusq ? 'comp-val-dusq' : 'comp-val-other'}>{value}</span>;
}

export function Comparison() {
  const sectionRef = useReveal<HTMLElement>();

  const scrollToProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="comparison-section" id="comparison" ref={sectionRef}>
      <div className="comparison-wrap">
        <div className="section-intro rv">
          <div className="comparison-eyebrow-pill">
            <span className="comparison-dot" />
            <span>Competitive Differentiation · Technical Matrix</span>
          </div>
          <h2 className="va-text-heading-large">Not all devices were meant to solve your sleep.</h2>
          <p className="comparison-lead-text">
            Most sleep trackers are passive mirrors — they notify you in the morning that you slept poorly. DUSQ is closed-loop neurotechnology: it detects autonomic micro-surges in real time and restores deep delta sleep before conscious waking.
          </p>
        </div>

        {/* Full-Width Technical Comparison Matrix */}
        <div className="comparison-matrix-card rv rv-d1">
          <div className="comparison-matrix-header-bar">
            <div className="comparison-matrix-col-meta">
              <span className="comparison-matrix-title">Technical Specification</span>
              <span className="comparison-matrix-subtitle">Clinical benchmark comparison</span>
            </div>
            <div className="comparison-matrix-col-brand is-dusq">
              <div className="comparison-dusq-badge">FLAGSHIP NEUROTECH</div>
              <strong className="comparison-brand-name">DUSQ One</strong>
              <span className="comparison-brand-sub">Closed-Loop Dual VNS</span>
            </div>
            <div className="comparison-matrix-col-brand">
              <div className="comparison-other-badge">PASSIVE TRACKER</div>
              <strong className="comparison-brand-name">WHOOP / Oura</strong>
              <span className="comparison-brand-sub">Optical Ring &amp; Band</span>
            </div>
            <div className="comparison-matrix-col-brand">
              <div className="comparison-other-badge">DAYTIME DEVICE</div>
              <strong className="comparison-brand-name">Pulsetto</strong>
              <span className="comparison-brand-sub">Manual Neck Collar</span>
            </div>
          </div>

          <div className="comparison-matrix-body">
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={row.feature}
                className={`comparison-matrix-row ${idx % 2 === 1 ? 'is-zebra' : ''}`}
              >
                <div className="comparison-matrix-cell comparison-cell-feature">
                  <span className="comparison-feature-name">{row.feature}</span>
                </div>
                <div className="comparison-matrix-cell comparison-cell-dusq">
                  {renderCell(row.dusq, true)}
                </div>
                <div className="comparison-matrix-cell comparison-cell-other">
                  {renderCell(row.trackers, false)}
                </div>
                <div className="comparison-matrix-cell comparison-cell-other">
                  {renderCell(row.pulsetto, false)}
                </div>
              </div>
            ))}
          </div>

          {/* Matrix Footer Callout & Smooth Scroll to Hardware Suite */}
          <div className="comparison-matrix-footer">
            <div className="comparison-footer-summary">
              <strong>The Bottom Line:</strong> Passive trackers tell you that you slept poorly. DUSQ actively keeps you asleep.
            </div>
            <a
              href="#product"
              onClick={scrollToProduct}
              className="comparison-matrix-cta"
            >
              <span>View Hardware</span>
              <IconArrowDown size={15} stroke={2.2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
