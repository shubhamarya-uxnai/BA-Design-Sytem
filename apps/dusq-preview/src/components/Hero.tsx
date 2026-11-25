import React, { useState, useEffect, useRef } from 'react';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import { useCountUp } from '../hooks/useReveal';
import { PillButton } from './PillButton';

export function Hero() {
  const [scrollGrow, setScrollGrow] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { ref: metricRef, value: metricVal } = useCountUp<HTMLDivElement>(31, 1100);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Smoothly scale from 0 to 1 over first 320px of scroll
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
    <section className="anthropic-hero-section" id="hero">
      {/* 1. Original Two-Column Editorial Masthead Layout */}
      <div className="masthead">
        <div className="masthead-main">
          <div className="eyebrow" data-reveal style={{ '--i': 1 } as React.CSSProperties}>A calmer relationship with sleep</div>
          <h1 className="hero-title va-text-title-large" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            Better nights begin with a quieter system.
          </h1>
          <p className="hero-copy va-text-body-medium" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
            Sleep disruption is an autonomic nervous system issue rather than a routine failure. DUSQ is an autonomous closed-loop neurotechnology dedicated to sensing nocturnal volatility, intervening adaptively, and safeguarding restorative deep sleep.
          </p>
        </div>

        <aside className="hero-side" data-reveal style={{ '--i': 4 } as React.CSSProperties}>
          <div className="hero-buttons">
            <PillButton href="#how-it-works">Explore the approach</PillButton>
            <PillButton href="#find-your-fix" light>
              Find your fix
            </PillButton>
          </div>
          <div className="metric" ref={metricRef}>
            <strong>+{metricVal}%</strong>
            <span>More deep sleep in CTRI-registered clinical study</span>
          </div>
        </aside>
      </div>

      {/* 2. Anthropic MediaExpanding Hero Card (Scroll-Driven Expansion Retained Exactly) */}
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
              src="/hero-desktop.webp"
              alt="DUSQ One Wearable Device Behind-the-Ear"
              className="anthropic-hero-img"
              fetchPriority="high"
              decoding="async"
            />
            <div className="anthropic-hero-scrim" aria-hidden="true" />
          </div>

          {/* Centered Editorial Lockup */}
          <div className="anthropic-hero-content">
            <div className="anthropic-hero-badge">
              <span className="anthropic-badge-dot" />
              <span>CLOSED-LOOP NEUROTECH · STAGE 03 ACTIVE</span>
            </div>

            <h2 className="anthropic-hero-title">
              DUSQ One Wearable
            </h2>

            <p className="anthropic-hero-subtitle">
              Our most capable postauricular neuromodulation system, setting a new clinical standard for unbroken delta-wave sleep.
            </p>

            <div className="anthropic-hero-actions">
              <a href="#how-it-works" className="anthropic-hero-btn anthropic-btn-light">
                Explore the approach
              </a>
              <a href="#find-your-fix" className="anthropic-hero-btn anthropic-btn-dark">
                Find your fix
              </a>
            </div>
          </div>

          {/* Bottom Ambient Indicators (Telemetry & Ambient Toggle) */}
          <div className="anthropic-hero-footer">
            <div className="anthropic-hero-telemetry">
              <span className="anthropic-telemetry-dot" />
              <strong className="anthropic-telemetry-number">+{metricVal}%</strong>
              <span className="anthropic-telemetry-label">MORE DEEP SLEEP · CTRI REGISTERED</span>
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
    </section>
  );
}
