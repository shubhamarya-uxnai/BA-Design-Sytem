import React, { useState, useEffect } from 'react';
import {
  IconCheck,
  IconShieldCheck,
  IconSparkles,
  IconBox,
  IconArrowRight,
  IconTruck,
  IconPlayerPause,
  IconPlayerPlay,
} from '@tabler/icons-react';
import { useReveal } from '../hooks/useReveal';

interface HardwareTier {
  id: string;
  category: string;
  title: string;
  tagline: string;
  badge: string;
  price: string;
  priceNote: string;
  image: string;
  alt: string;
  specs: { label: string; value: string; detail: string }[];
  features: string[];
  inTheBox: string[];
  ctaLabel: string;
  hotspots?: { id: number; x: number; y: number; title: string; desc: string }[];
}

const HARDWARE_TIERS: HardwareTier[] = [
  {
    id: 'dusq-one',
    category: 'FLAGSHIP NEUROTECH SYSTEM',
    title: 'DUSQ One Wearable',
    tagline: '12g postauricular closed-loop system for unbroken delta-wave sleep.',
    badge: 'STAGE 03 ACTIVE · CTRI REGISTERED',
    price: '$299',
    priceNote: 'one-time investment · includes 30-night in-home trial',
    image: '/science/clean-dusq-product-one-hero.webp',
    alt: 'DUSQ One Wearable Neurotech Device and Magnetic Charging Case',
    specs: [
      { label: 'Weight', value: '12g', detail: 'Featherweight medical silicone' },
      { label: 'Acoustics', value: '0 dB', detail: 'Sub-sensory micro-pulses' },
      { label: 'Autonomy', value: '14+ hrs', detail: 'On-device edge MCU loop' },
      { label: 'EMF Emission', value: '0 mW', detail: 'Zero phone or Bluetooth EMF' },
    ],
    features: [
      'Dual postauricular electrodermal activity (EDA) mastoid sensors',
      'Dual vagus (nVNS) & vestibular (nVEnS) adaptive neuromodulation',
      'Zero in-ear occlusion — engineered for side, back & earbud sleepers',
      '100% on-device local inference — operates without a phone nearby',
      'CNC-machined aerospace billet-aluminum magnetic travel dock',
      'Includes 1-year companion app access & CTRI clinical sleep protocol',
    ],
    inTheBox: [
      'DUSQ One Neurotech Wearable (12g)',
      'CNC Billet-Aluminum Magnetic Charging Dock (5-night reserve)',
      '3-Month Starter Supply: Hydrogel Conductive Sleep Links (45 pairs)',
      'Braided Fast-Charging USB-C Cable (1.2m)',
      '1-Year Companion App Digital Access Pass',
      'Clinical Quick-Start Guide & Sleep Hygiene Calibration Protocol',
    ],
    ctaLabel: 'Pre-order Now',
    hotspots: [
      {
        id: 1,
        x: 44,
        y: 29,
        title: 'Postauricular EDA Sensor',
        desc: 'Samples sympathetic nervous micro-surges at 50Hz directly from the mastoid process.',
      },
      {
        id: 2,
        x: 40,
        y: 38,
        title: '12g Silicone Contour',
        desc: 'Featherweight ergonomic arch sits flat behind ear with zero cartilage pressure for side sleepers.',
      },
      {
        id: 3,
        x: 53,
        y: 60,
        title: 'Dual Vagus + Vestibular Pulse',
        desc: 'Sub-sensory micro-current emitters downregulate nighttime volatility before waking.',
      },
    ],
  },
  {
    id: 'travel-dock',
    category: 'HARDWARE ACCESSORY',
    title: 'Magnetic Travel & Fast-Charging Dock',
    tagline: 'Pocketable billet-aluminum clamshell with 5-night battery reserve.',
    badge: '5-NIGHT AUTONOMY · USB-C FAST CHARGE',
    price: '$49',
    priceNote: 'included free with DUSQ One suite · replacement / spare dock',
    image: '/science/clean-dusq-product-dock.webp',
    alt: 'DUSQ Billet-Aluminum Magnetic Fast-Charging Travel Dock',
    specs: [
      { label: 'Reserve', value: '5 Nights', detail: 'Off-grid travel battery reserve' },
      { label: 'Charge Speed', value: '40 mins', detail: 'Rapid magnetic pogo-pin dock' },
      { label: 'Chassis', value: '6063 Aluminum', detail: 'CNC-machined anodized shell' },
      { label: 'Connector', value: 'USB-C', detail: 'Universal travel standard' },
    ],
    features: [
      'Precision magnetic alignment snaps DUSQ One firmly into pogo-pin dock',
      'Anodized 6063 aerospace aluminum case protects against drops and travel impacts',
      '5-night built-in lithium cell allows full off-grid sleep tracking on trips',
      'Dual-color LED telemetry indicator shows battery and calibration readiness',
    ],
    inTheBox: [
      'CNC Billet-Aluminum Magnetic Travel Dock',
      'Braided USB-C Travel Cable (1.2m)',
      'Travel Protective Pouch',
    ],
    ctaLabel: 'Order Dock',
  },
  {
    id: 'hydrogel-links',
    category: 'ESSENTIAL CONSUMABLE',
    title: 'Hydrogel Conductive Sleep Links',
    tagline: 'Medical-grade dual-electrode hydrogel pads for continuous low impedance.',
    badge: '30-NIGHT SUPPLY · AUTO-REPLENISHMENT',
    price: '$29',
    priceNote: '/ month · free shipping · cancel or pause anytime',
    image: '/science/clean-dusq-product-links.webp',
    alt: 'DUSQ Hydrogel Conductive Sleep Links Refill Pack',
    specs: [
      { label: 'Supply', value: '30 Nights', detail: '15 pairs of dual-electrode links' },
      { label: 'Impedance', value: '<200 Ω', detail: 'Clinical conductance film' },
      { label: 'Adhesive', value: 'Medical-Grade', detail: 'Hypoallergenic, residue-free' },
      { label: 'Delivery', value: 'Monthly', detail: 'Automated doorstep refill' },
    ],
    features: [
      'Proprietary hydrogel formulation maintains stable conductivity across 8 hours of sleep',
      'Dermatologically tested biocompatible adhesive removes painlessly without residue',
      'Precision snap-in alignment onto DUSQ One golden mastoid contact pins',
      'Flexible subscription: change delivery interval, pause during travel, or cancel anytime',
    ],
    inTheBox: [
      '30-Night Supply: 15 Sealed Dual-Electrode Hydrogel Sleeves',
      'Skin Prep Alcohol Cleansing Wipes (30 count)',
      'Travel Storage Case for Active Link Pair',
    ],
    ctaLabel: 'Order Refills',
  },
];

export function ProductOne() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [showInTheBox, setShowInTheBox] = useState(false);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useReveal<HTMLElement>();

  const activeTier = HARDWARE_TIERS[selectedIdx];
  const isFlowPaused = isPausedByUser || isHovered || showInTheBox;

  // Smooth continuous auto-flow across all 3 hardware products
  useEffect(() => {
    if (
      isFlowPaused ||
      (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      return;
    }

    const STEP_MS = 50;
    const DURATION_MS = 5500;
    const increment = (STEP_MS / DURATION_MS) * 100;

    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          setSelectedIdx((idx) => (idx + 1) % HARDWARE_TIERS.length);
          setActiveHotspot(null);
          return 0;
        }
        return prev + increment;
      });
    }, STEP_MS);

    return () => window.clearInterval(timer);
  }, [isFlowPaused]);

  const handleSelectTier = (idx: number) => {
    setSelectedIdx(idx);
    setActiveHotspot(null);
    setProgress(0);
    setIsPausedByUser(true);
  };

  const toggleUserPause = () => {
    setIsPausedByUser((prev) => !prev);
  };

  return (
    <section className="product-showcase-section" id="product" ref={sectionRef}>
      {/* Compact Single-Fold Masthead & Auto-Flow Controller */}
      <div className="product-showcase-container rv">
        <header className="product-showcase-masthead">
          <div className="product-masthead-top-row">
            <div className="product-masthead-copy">
              <div className="product-masthead-eyebrow">
                <span className="product-eyebrow-pill">
                  <span className="product-eyebrow-dot" />
                  <span>THE DUSQ HARDWARE SUITE</span>
                </span>
                <span className="product-eyebrow-meta">BENCHMARK CLINICAL NEUROTECHNOLOGY</span>
              </div>

              <h2 className="product-masthead-title">
                Everything engineered for unbroken rest.
              </h2>
              <p className="product-masthead-subhead">
                A cohesive three-part sleep architecture—cycling smoothly through the 12g neuromodulator, magnetic travel dock, and conductive hydrogel links.
              </p>
            </div>
          </div>

          {/* 3-Tier Auto-Flow Segmented Bar + Pause/Resume Control */}
          <div className="product-flow-controls-row">
            <div className="product-suite-segmented-bar" role="tablist" aria-label="Hardware Suite Lineup">
              {HARDWARE_TIERS.map((tier, idx) => {
                const isActive = selectedIdx === idx;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`product-segment-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleSelectTier(idx)}
                  >
                    {isActive && (
                      <span
                        className="product-segment-progress"
                        style={{ width: `${isPausedByUser ? 100 : progress}%` }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="product-segment-num">0{idx + 1}</span>
                    <span className="product-segment-title">{tier.title.split(':')[0]}</span>
                    {idx === 0 && <span className="product-segment-flag">FLAGSHIP</span>}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className={`product-flow-pause-btn ${isPausedByUser ? 'is-paused' : ''}`}
              onClick={toggleUserPause}
              aria-pressed={isPausedByUser}
              aria-label={isPausedByUser ? 'Resume product auto-flow' : 'Pause on current product'}
            >
              {isPausedByUser ? (
                <>
                  <IconPlayerPlay size={13} stroke={2.2} />
                  <span>Resume flow</span>
                </>
              ) : (
                <>
                  <IconPlayerPause size={13} stroke={2.2} />
                  <span>{isHovered ? 'Paused on hover' : 'Pause product'}</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Main Spatial Hardware Stage (Fits in 1 Fold with Smooth Cross-Fade) */}
        <div
          className="product-spatial-grid"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: Pre-mounted Multi-Layer Visual Stage + 4-Metric Spec Ledger */}
          <div className="product-spatial-visual-stage">
            <div className="product-stage-canvas">
              {HARDWARE_TIERS.map((tier, tIdx) => {
                const isTierActive = selectedIdx === tIdx;
                return (
                  <div
                    key={tier.id}
                    className={`product-image-halo ${isTierActive ? 'is-active' : ''}`}
                    aria-hidden={!isTierActive}
                  >
                    <img
                      src={tier.image}
                      alt={tier.alt}
                      className="product-spatial-image"
                      loading="eager"
                    />
                    <div className="product-canvas-scrim" aria-hidden="true" />

                    {/* Interactive Hotspots locked to active image bounds */}
                    {isTierActive && tier.hotspots && (
                      <div className="product-hotspots-layer">
                        {tier.hotspots.map((hs) => {
                          const isSelected = activeHotspot === hs.id;
                          return (
                            <div
                              key={hs.id}
                              className={`product-hotspot-pin ${isSelected ? 'is-open' : ''}`}
                              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                              onClick={() => setActiveHotspot(isSelected ? null : hs.id)}
                              onMouseEnter={() => setActiveHotspot(hs.id)}
                            >
                              <button
                                type="button"
                                className="product-pin-beacon"
                                aria-label={`Inspect ${hs.title}`}
                              >
                                <span className="product-pin-ring" />
                                <span className="product-pin-core" />
                              </button>

                              {isSelected && (
                                <div className="product-pin-card">
                                  <strong className="product-pin-title">{hs.title}</strong>
                                  <p className="product-pin-desc">{hs.desc}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Status HUD Chip */}
              <div className="product-stage-hud">
                <span className="product-hud-dot" />
                <span className="product-hud-text">{activeTier.badge}</span>
              </div>

              {/* Bottom Quick Caption */}
              <div className="product-stage-bottom-caption">
                <span className="product-stage-step-pill">
                  0{selectedIdx + 1} / 0{HARDWARE_TIERS.length}
                </span>
                <strong>{activeTier.title}</strong>
                <span>{activeTier.tagline}</span>
              </div>
            </div>

            {/* 4-Metric Technical Spec Ledger */}
            <div className="product-specs-ledger">
              {activeTier.specs.map((spec, sIdx) => (
                <div key={`${activeTier.id}-spec-${sIdx}`} className="product-ledger-cell">
                  <span className="product-ledger-label">{spec.label}</span>
                  <strong className="product-ledger-val">{spec.value}</strong>
                  <span className="product-ledger-detail">{spec.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Compact Single-Fold Buy & Configuration Module */}
          <div className="product-config-module" key={activeTier.id}>
            {/* Top Bar: Category, Title & Price Lockup */}
            <div className="product-config-top">
              <div className="product-config-heading-group">
                <span className="product-config-category">{activeTier.category}</span>
                <h3 className="product-config-title">{activeTier.title}</h3>
                <p className="product-config-lead">{activeTier.tagline}</p>
              </div>
              <div className="product-price-lockup">
                <div className="product-price-amount">
                  <span className="product-currency-symbol">$</span>
                  <span className="product-price-number">{activeTier.price.replace('$', '')}</span>
                </div>
                <span className="product-price-cadence">{activeTier.priceNote}</span>
              </div>
            </div>

            {/* Compact 2-Column Engineering Highlights Grid */}
            <div className="product-features-checklist">
              <div className="product-checklist-header">
                <span className="product-checklist-title">ENGINEERING HIGHLIGHTS</span>
                <button
                  type="button"
                  className="product-unboxing-inline-btn"
                  onClick={() => setShowInTheBox(!showInTheBox)}
                  aria-expanded={showInTheBox}
                >
                  <IconBox size={14} stroke={1.9} />
                  <span>{showInTheBox ? 'Show engineering specs' : `In the box (${activeTier.inTheBox.length})`}</span>
                </button>
              </div>

              {showInTheBox ? (
                <ul className="product-features-list is-unboxing-grid">
                  {activeTier.inTheBox.map((item, iIdx) => (
                    <li key={iIdx} className="product-feature-item">
                      <span className="product-unboxing-bullet">0{iIdx + 1}</span>
                      <span className="product-feature-text">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="product-features-list">
                  {activeTier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="product-feature-item">
                      <span className="product-check-pill">
                        <IconCheck size={12} stroke={2.5} />
                      </span>
                      <span className="product-feature-text">{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Primary Purchase / Pre-Order Action + Trust Strip */}
            <div className="product-buy-cta-group">
              <a
                href="https://dusq.com/#pdp"
                target="_blank"
                rel="noopener noreferrer"
                className="product-primary-buy-btn"
              >
                <span>{activeTier.ctaLabel}</span>
                <span className="product-btn-arrow-bubble">
                  <IconArrowRight size={15} stroke={2.2} />
                </span>
              </a>

              <div className="product-trust-strip">
                <div className="product-trust-item">
                  <IconShieldCheck size={14} stroke={2} color="#DF6738" />
                  <span>30-Night Risk-Free Trial</span>
                </div>
                <div className="product-trust-item">
                  <IconTruck size={14} stroke={2} color="#DF6738" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="product-trust-item">
                  <IconSparkles size={14} stroke={2} color="#DF6738" />
                  <span>CTRI-Registered Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
