import React, { useState, useEffect } from 'react';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import { useCountUp } from '../../hooks/useReveal';
import { PillButton } from '../PillButton';

interface ScienceHeroProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function ScienceHero({ onNavigate }: ScienceHeroProps) {
  const [scrollGrow, setScrollGrow] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const { ref: surgesRef, value: surgesCount } = useCountUp<HTMLDivElement>(25, 1200);
  const { ref: dataPointsRef, value: dataPointsCount } = useCountUp<HTMLDivElement>(50, 1400);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Smoothly scale from 0 to 1 over first 320px of scroll (exact same as home page)
          const progress = Math.min(1, Math.max(0, scrollY / 320));
          setScrollGrow(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="anthropic-hero-section science-hero-section" id="top">
      {/* 1. Restored Two-Column Editorial Masthead Layout (Exact Match with Home Page Design) */}
      <div className="masthead">
        <div className="masthead-main">
          <div className="eyebrow" data-reveal style={{ '--i': 1 } as React.CSSProperties}>AUTONOMIC SLEEP RESTORATION · CLINICAL SCIENCE</div>
          <h1 className="hero-title va-text-title-large" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            Sleep happens according to your nervous system’s capacity for it.
          </h1>
          <p className="hero-copy va-text-body-medium" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
            Sleep disruption is an autonomic nervous system issue rather than a routine failure. DUSQ is an autonomous closed-loop neurotechnology dedicated to sensing nocturnal volatility, intervening adaptively, and safeguarding restorative deep sleep.
          </p>
        </div>

        <aside className="hero-side" data-reveal style={{ '--i': 4 } as React.CSSProperties}>
          <div className="hero-buttons">
            <PillButton
              href="#see-saw"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/pages/science', '#see-saw');
                }
              }}
            >
              Explore the approach
            </PillButton>
            <PillButton
              href="#sensor-stack"
              light
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/pages/science', '#sensor-stack');
                }
              }}
            >
              Sensor Architecture
            </PillButton>
          </div>
          <div className="metric">
            <strong>20–30</strong>
            <span>Nocturnal sympathetic surges detected & intervened</span>
          </div>
        </aside>
      </div>

      {/* 2. Anthropic MediaExpanding Hero Card (Exact Same Interaction as Home Page) */}
      <div className="anthropic-hero-frame" data-reveal style={{ '--i': 5 } as React.CSSProperties}>
        <div
          className="anthropic-hero-card"
          style={{
            '--scroll-grow': scrollGrow,
          } as React.CSSProperties}
        >
          {/* Background Media with Parallax Subtle Scaling */}
          <div className="anthropic-hero-media">
            <img
              src="/science/hero-desktop.png"
              alt="DUSQ One sleep neurotechnology pod and charging dock on bedside table"
              className="anthropic-hero-img"
              fetchPriority="high"
              decoding="async"
            />
            <div className="anthropic-hero-scrim" aria-hidden="true" />
          </div>

          {/* Centered Editorial Lockup (Anthropic Claude Fable / Mythos Style) */}
          <div className="anthropic-hero-content">
            <div className="anthropic-hero-badge">
              <span className="anthropic-badge-dot" />
              <span>AUTONOMIC SLEEP RESTORATION · CLOSED-LOOP NEUROTECH</span>
            </div>

            <h2 className="anthropic-hero-title">
              Autonomous Closed-Loop Neurotech
            </h2>

            <p className="anthropic-hero-subtitle">
              Continuous postauricular sensing and dual non-invasive neuromodulation engineered to detect nocturnal sympathetic surges and preserve Stage 3 slow-wave sleep.
            </p>

            <div className="anthropic-hero-actions">
              <a
                href="#see-saw"
                className="anthropic-hero-btn anthropic-btn-light"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/pages/science', '#see-saw');
                  }
                }}
              >
                Explore the Biological Mechanism
              </a>
              <a
                href="#sensor-stack"
                className="anthropic-hero-btn anthropic-btn-dark"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/pages/science', '#sensor-stack');
                  }
                }}
              >
                Sensor Stack Architecture
              </a>
            </div>
          </div>

          {/* Bottom Ambient Indicators (Anthropic Style Telemetry & Ambient Toggle) */}
          <div className="anthropic-hero-footer">
            <div className="anthropic-hero-telemetry">
              <span className="anthropic-telemetry-dot" />
              <strong className="anthropic-telemetry-number">12.0g</strong>
              <span className="anthropic-telemetry-label">MASTOID ANCHOR · ZERO EAR-CANAL INTRUSION</span>
            </div>

            <button
              type="button"
              className="anthropic-ambient-toggle"
              aria-label={isPlaying ? 'Pause ambient view' : 'Play ambient view'}
              title={isPlaying ? 'Pause ambient view' : 'Play ambient view'}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <IconPlayerPause size={14} stroke={2} /> : <IconPlayerPlay size={14} stroke={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Unboxed Editorial Proof Metrics Bridge (Transitions smoothly to Autonomic Mechanism) */}
      <div className="science-hero-bridge-metrics">
        <div className="bridge-metric-item" ref={surgesRef}>
          <strong className="bridge-metric-val">
            {surgesCount}<span className="bridge-metric-unit">/night</span>
          </strong>
          <span className="bridge-metric-label">
            Average nocturnal sympathetic surges breaking restorative slow-wave sleep
          </span>
        </div>
        <div className="bridge-metric-item" ref={dataPointsRef}>
          <strong className="bridge-metric-val">
            {dataPointsCount}M<span className="bridge-metric-unit">+</span>
          </strong>
          <span className="bridge-metric-label">
            Autonomic calibration datapoints powering real-time classification
          </span>
        </div>
        <div className="bridge-metric-item">
          <strong className="bridge-metric-val">
            CTRI<span className="bridge-metric-unit">/2026</span>
          </strong>
          <span className="bridge-metric-label">
            Clinical trial registry validated against hospital polysomnography
          </span>
        </div>
      </div>
    </section>
  );
}
