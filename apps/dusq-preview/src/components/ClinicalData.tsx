import React, { useEffect, useRef, useState } from 'react';
import { IconClover, IconHeart } from '@tabler/icons-react';
import { useCountUp, useReveal } from '../hooks/useReveal';

interface ClinicalDataProps {
  onNavigate?: (path: string) => void;
}

export function ClinicalData({ onNavigate }: ClinicalDataProps) {
  const sectionRef = useReveal<HTMLElement>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 3D Orbital Rotation State (Auto-triggers on scroll into view)
  const [isOpen, setIsOpen] = useState(false);

  const { ref: hrvRef, value: hrvVal } = useCountUp<HTMLDivElement>(40, 1100);
  const { ref: chartRef, value: chartVal } = useCountUp<HTMLDivElement>(34, 1200);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsOpen(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    let timer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(timer);
          // Start slightly tucked, then smoothly rotate open into 3D spread
          setIsOpen(false);
          timer = setTimeout(() => {
            setIsOpen(true);
          }, 80);
        } else {
          clearTimeout(timer);
          setIsOpen(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="clinical-section" id="evidence" ref={sectionRef}>
      <div className="clinical-wrap">
        <div className="section-intro rv">
          <div className="clinical-head-row">
            <div>
              <span className="eyebrow">Research and evidence</span>
              <h2 className="va-text-heading-large">We let the data speak for itself.</h2>
            </div>
            <a
              href="/pages/the-sleep-lab"
              className="vantara-orbit-status-pill"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/pages/the-sleep-lab');
                }
              }}
            >
              <span>Sleep Lab →</span>
            </a>
          </div>
        </div>

        {/* 3D Rotating 5-Card Spread (Clean Gaps, No Negative Margin Intersections) */}
        <div
          ref={containerRef}
          className={`clinical-3d-stage ${isOpen ? 'is-open' : 'is-closed'}`}
          aria-live="polite"
        >
        {/* Column 1: Left Wing (Rotates along 3D Y-Axis) */}
        <div className="clinical-col clinical-col-left">
          {/* Card 1: Warm Cream Card */}
          <div className="vantara-card vantara-card-cream" ref={hrvRef}>
            <div className="vantara-card-top">
              <span className="vantara-microlabel">CTRI-REGISTERED TRIAL · JAN 2026</span>
            </div>

            <div className="vantara-pill-calibration-wrap">
              <div className="vantara-speech-pill">
                <span className="vantara-speech-value">+{hrvVal}% HRV</span>
                <span className="vantara-speech-notch" aria-hidden="true" />
              </div>

              <div className="vantara-ruler" aria-hidden="true">
                {Array.from({ length: 27 }).map((_, i) => (
                  <span
                    key={i}
                    className={`vantara-tick ${i === 13 ? 'is-prominent' : ''} ${
                      Math.abs(i - 13) <= 3 && i !== 13 ? 'is-near' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="vantara-ruler-caption">
                Sympathetic-vagal balance across 212 participants
              </span>
            </div>

            <div className="vantara-card-bottom">
              <h3 className="vantara-card-headline dark-text">
                A 14-day sham-controlled clinical trial measuring autonomic recovery
              </h3>
            </div>
          </div>

          {/* Card 2: Deep Espresso Card (Clean, non-intersecting spacing) */}
          <div className="vantara-card vantara-card-espresso">
            <div className="vantara-emblem-center" aria-hidden="true">
              <div className="vantara-stepped-cross">
                <div className="vantara-cross-outer" />
                <div className="vantara-cross-mid" />
                <div className="vantara-cross-inner">
                  <IconClover size={28} stroke={1.75} color="#F3C6A8" />
                </div>
              </div>
            </div>

            <div className="vantara-card-bottom">
              <span className="vantara-microlabel light">MICRO-AROUSAL SUPPRESSION</span>
              <h3 className="vantara-card-headline light-text">
                36% fewer nighttime arousals before sleep breaks
              </h3>
            </div>
          </div>
        </div>

        {/* Column 2: Center Anchor (High-Resolution PSG Telemetry, NOT a GIF) */}
        <div className="clinical-col clinical-col-center">
          <div className="vantara-card vantara-card-media">
            <div className="vantara-psg-frame" id="psg-telemetry-visual">
              <img
                src="/science/sleep-lab-bg.png"
                alt="Clinical Polysomnography Sleep Lab Multi-channel Monitoring"
                className="vantara-psg-image"
                loading="eager"
              />
              <div className="vantara-media-wash" />

              {/* Dynamic Telemetry Waveform Overlay */}
              <div className="vantara-telemetry-overlay" aria-hidden="true">
                <div className="vantara-telemetry-header">
                  <span className="vantara-telemetry-live-dot" />
                  <span>PSG EPOCH CONCORDANCE · 94.2%</span>
                </div>
                <div className="vantara-wave-channels">
                  <div className="vantara-channel-row">
                    <span className="vantara-ch-label">EEG DELTA</span>
                    <div className="vantara-wave-line wave-delta" />
                  </div>
                  <div className="vantara-channel-row">
                    <span className="vantara-ch-label">MASTOID EDA</span>
                    <div className="vantara-wave-line wave-eda" />
                  </div>
                </div>
              </div>
            </div>

            <div className="vantara-media-content">
              <div className="vantara-media-header">
                <span className="vantara-microlabel light">POLYSOMNOGRAPHY PILOT · MAY 2026</span>
                <h3 className="vantara-media-title">
                  Closed-Loop Overnight Sleep Architecture
                </h3>
              </div>

              <div className="vantara-media-centerpiece" aria-hidden="true">
                <div className="vantara-lotus-ring" />
              </div>

              <div className="vantara-media-footer">
                <p className="vantara-media-narrative">
                  In an overnight sham-controlled pilot over 42 nights with 46 participants, sleep
                  was measured using gold-standard clinical polysomnography.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Right Wing (Rotates along 3D Y-Axis with Rising Chart) */}
        <div className="clinical-col clinical-col-right">
          {/* Card 4: Dark Chart with Animated 34% Gain */}
          <div className="vantara-card vantara-card-chart" ref={chartRef}>
            <div className="vantara-card-top">
              <strong className="vantara-chart-big-number">Up {chartVal}%</strong>
              <span className="vantara-microlabel light">SLEEP QUALITY GAIN OVER 42 NIGHTS</span>
            </div>

            {/* 12-Bar Animated Rising Chart */}
            <div className="vantara-chart-container" aria-label="12-bar rising sleep quality chart">
              <div className="vantara-chart-bars">
                {[
                  { height: 22 },
                  { height: 28 },
                  { height: 34 },
                  { height: 40 },
                  { height: 46 },
                  { height: 52 },
                  { height: 60 },
                  { height: 68 },
                  { height: 76 },
                  { height: 84 },
                  { height: 92 },
                  { height: 100, isFinal: true },
                ].map((bar, idx) => (
                  <div key={idx} className="vantara-bar-slot">
                    {bar.isFinal && (
                      <span className="vantara-bar-badge" aria-hidden="true">
                        +{chartVal}%
                      </span>
                    )}
                    <div
                      className={`vantara-bar-pill ${bar.isFinal ? 'is-active' : ''}`}
                      style={{
                        height: isOpen ? `${bar.height}%` : '6%',
                        transition: `height 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + idx * 0.04}s`,
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="vantara-chart-axis" aria-hidden="true">
                <span>Night 01</span>
                <span>Night 21</span>
                <span>Night 42</span>
              </div>
            </div>
          </div>

          {/* Card 5: Deep Forest Green Card (Perfect, Non-Skewed Concentric Circles) */}
          <div className="vantara-card vantara-card-forest">
            <div className="vantara-emblem-center" aria-hidden="true">
              {/* Perfectly symmetrical, non-skewed concentric heart pulse rings */}
              <div className="vantara-heart-concentric-circle">
                <div className="vantara-circle-outer" />
                <div className="vantara-circle-mid" />
                <div className="vantara-circle-inner">
                  <IconHeart size={34} stroke={1.75} color="#F3C6A8" fill="#F3C6A8" />
                </div>
              </div>
            </div>

            <div className="vantara-card-bottom">
              <span className="vantara-microlabel light">OVERNIGHT CONTINUITY</span>
              <h3 className="vantara-card-headline light-text">
                26% reduction in night awakenings across 42 nights
              </h3>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
