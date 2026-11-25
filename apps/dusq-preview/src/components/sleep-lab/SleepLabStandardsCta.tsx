import React from 'react';
import { IconFileCertificate } from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';
import { PillButton } from '../PillButton';

interface SleepLabStandardsCtaProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function SleepLabStandardsCta({ onNavigate: _onNavigate }: SleepLabStandardsCtaProps) {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="standards-publications" className="sleep-lab-section sleep-lab-standards" ref={sectionRef}>
      <div className="sleep-lab-container">
        {/* Editorial Section Header */}
        <div className="section-header-editorial text-center rv">
          <div className="section-eyebrow-chip center-chip">
            <IconFileCertificate size={14} stroke={1.75} aria-hidden="true" />
            <span>CLINICAL BENCHMARKS</span>
          </div>
          <h2 className="section-title-editorial large-title">
            The standard this lab holds itself to.
          </h2>
        </div>

        {/* The Master Credo (Dramatic dark surface with clean typography) */}
        <div className="sleep-lab-credo-card rv rv-d1">
          <p className="credo-line credo-preamble">
            A sleep lab can be built for several purposes:
          </p>
          <p className="credo-line credo-contrast">
            to generate data that supports a predetermined conclusion, to satisfy a regulatory requirement,
            or to find out what is actually true and build only from that.
          </p>
          <div className="credo-divider" aria-hidden="true" />
          <h3 className="credo-line credo-climax">
            The DUSQ Sleep Lab was built for the third.
          </h3>
          <p className="credo-line credo-punchline">
            The product that leaves this lab is the product that this lab could not break.
          </p>
        </div>

        {/* Official Publications Grid (3 verified peer-reviewed / clinical documents) */}
        <div className="publications-section rv rv-d2">
          <div className="publications-head">
            <span className="publications-tag">OFFICIAL RESEARCH PUBLICATIONS &middot; PEER-REVIEWED CLINICAL REPORTS</span>
            <h3 className="publications-title">Download primary research data directly from our lab.</h3>
          </div>

          <div className="publications-grid">
            {/* Doc 01: White Paper */}
            <div className="pub-card">
              <div className="pub-card-top">
                <span className="pub-badge">TECHNICAL WHITE PAPER</span>
                <span className="pub-format">PDF &middot; 2.4 MB</span>
              </div>
              <h4 className="pub-title">Nocturnal Microarousal Attenuation via Closed-Loop Auricular Neuromodulation</h4>
              <p className="pub-abstract">
                Mechanisms of postauricular electrodermal detection and vagal nerve intervention during
                spontaneous nocturnal sympathetic micro-surges.
              </p>
              <div className="pub-action">
                <PillButton
                  light
                  external
                  href="https://cdn.shopify.com/s/files/1/0725/0945/6454/files/DUSQ_Microarousal_White_Paper.pdf?v=1777621292"
                >
                  White Paper
                </PillButton>
              </div>
            </div>

            {/* Doc 02: Sleep Initiation */}
            <div className="pub-card">
              <div className="pub-card-top">
                <span className="pub-badge">CLINICAL TRIAL REPORT</span>
                <span className="pub-format">PDF &middot; 4.1 MB</span>
              </div>
              <h4 className="pub-title">DUSQ Sleep Initiation Clinical Evaluation v2.0.2</h4>
              <p className="pub-abstract">
                Randomized, sham-controlled evaluation of pre-sleep stochastic vestibular stimulation (nVEnS)
                on sleep onset latency and parasympathetic tone.
              </p>
              <div className="pub-action">
                <PillButton
                  light
                  external
                  href="https://cdn.shopify.com/s/files/1/0725/0945/6454/files/DUSQ_Clinical_Evaluation_v2.0.2_7_1.pdf?v=1777611949"
                >
                  Initiation Study
                </PillButton>
              </div>
            </div>

            {/* Doc 03: Sleep Maintenance */}
            <div className="pub-card">
              <div className="pub-card-top">
                <span className="pub-badge">POLYSOMNOGRAPHY TRIAL</span>
                <span className="pub-format">CLINICAL PROTOCOL</span>
              </div>
              <h4 className="pub-title">Sleep Maintenance &amp; Sustenance Overnight Clinical Study</h4>
              <p className="pub-abstract">
                Polysomnography concordance data evaluating autonomic surge dampening, delta-wave
                integrity, and 3 AM awakenings across 42 consecutive nights.
              </p>
              <div className="pub-action">
                <PillButton
                  light
                  external
                  href="https://drive.google.com/file/d/1-dWnSQK9OKAkPfnbZe2r_SxNrXDLELU_/view"
                >
                  Maintenance Study
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
