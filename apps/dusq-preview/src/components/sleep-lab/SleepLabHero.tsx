import React, { useState, useEffect } from 'react';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import { useCountUp } from '../../hooks/useReveal';
import { PillButton } from '../PillButton';

interface SleepLabHeroProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function SleepLabHero({ onNavigate }: SleepLabHeroProps) {
  const [scrollGrow, setScrollGrow] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const { ref: suitesRef, value: suitesCount } = useCountUp<HTMLDivElement>(7, 900);
  const { ref: nightsRef, value: nightsCount } = useCountUp<HTMLDivElement>(1200, 1200);
  const { ref: dataPointsRef, value: dataPointsCount } = useCountUp<HTMLDivElement>(50, 1400);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Smoothly scale from 0 to 1 over first 320px of scroll (exact same as home and science)
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

  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/pages/the-sleep-lab', hash);
    } else {
      e.preventDefault();
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="anthropic-hero-section sleep-lab-hero-section" id="top">
      {/* 1. Restored Two-Column Editorial Masthead Layout (Exact Match with Home & Science Pages) */}
      <div className="masthead">
        <div className="masthead-main">
          <div className="eyebrow" data-reveal style={{ '--i': 1 } as React.CSSProperties}>SLEEP LAB · CLINICAL RESEARCH FACILITY</div>
          <h1 className="hero-title va-text-title-large" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            Before DUSQ reaches you, it has to survive this lab.
          </h1>
          <p className="hero-copy va-text-body-medium" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
            The place where every claim is made, tested, and either proven or rebuilt from scratch. Designed to resolve the fundamental paradox of sleep research: combining the rigor of 32-channel clinical polysomnography with the authentic acoustics and thermal conditions of real bedrooms.
          </p>
        </div>

        <aside className="hero-side" data-reveal style={{ '--i': 4 } as React.CSSProperties}>
          <div className="hero-buttons">
            <PillButton
              href="#why-built"
              onClick={(e) => handleNavClick(e, '#why-built')}
            >
              Why We Built The Lab
            </PillButton>
            <PillButton
              href="#ground-truth"
              light
              onClick={(e) => handleNavClick(e, '#ground-truth')}
            >
              Ground Truth (PSG)
            </PillButton>
          </div>
          <div className="metric" ref={suitesRef}>
            <strong>{suitesCount} Suites</strong>
            <span>Acoustically isolated domestic sleep research suites</span>
          </div>
        </aside>
      </div>

      {/* 2. Anthropic MediaExpanding Hero Card (Exact Same Interaction as Home & Science) */}
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
              src="/sleep-lab/hero-sleep-lab.png"
              alt="DUSQ seven-bed clinical sleep laboratory showing quiet ecological sleep suites with physiological telemetry"
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
              <span>7 SUITES ACTIVE · POLYSOMNOGRAPHY GROUND TRUTH</span>
            </div>

            <h2 className="anthropic-hero-title">
              The DUSQ Sleep Lab Facility
            </h2>

            <p className="anthropic-hero-subtitle">
              Continuous all-night polysomnography telemetry records scored epoch-by-epoch in acoustically isolated domestic suites engineered to eliminate environmental noise variance.
            </p>

            <div className="anthropic-hero-actions">
              <a
                href="#why-built"
                className="anthropic-hero-btn anthropic-btn-light"
                onClick={(e) => handleNavClick(e, '#why-built')}
              >
                Why We Built The Lab
              </a>
              <a
                href="#ground-truth"
                className="anthropic-hero-btn anthropic-btn-dark"
                onClick={(e) => handleNavClick(e, '#ground-truth')}
              >
                Ground Truth (PSG)
              </a>
            </div>
          </div>

          {/* Bottom Ambient Indicators (Anthropic Style Telemetry & Ambient Toggle) */}
          <div className="anthropic-hero-footer">
            <div className="anthropic-hero-telemetry">
              <span className="anthropic-telemetry-dot" />
              <strong className="anthropic-telemetry-number">&lt; 18.2 dB</strong>
              <span className="anthropic-telemetry-label">FACILITY TELEMETRY: NIGHT SHIFT ACTIVE · 19.4°C</span>
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

      {/* 3. Unboxed Editorial Proof Metrics Bridge (Transitions smoothly to Why We Built The Lab) */}
      <div className="science-hero-bridge-metrics sleep-lab-hero-bridge-metrics">
        <div className="bridge-metric-item" ref={nightsRef}>
          <strong className="bridge-metric-val">
            {nightsCount.toLocaleString()}<span className="bridge-metric-unit">+</span>
          </strong>
          <span className="bridge-metric-label">
            Overnight polysomnography sessions recorded epoch-by-epoch
          </span>
        </div>
        <div className="bridge-metric-item" ref={dataPointsRef}>
          <strong className="bridge-metric-val">
            {dataPointsCount}M<span className="bridge-metric-unit">+</span>
          </strong>
          <span className="bridge-metric-label">
            Autonomic calibration datapoints validating postauricular sensors
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
