import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  IconWaveSine,
  IconFlame,
  IconRipple,
  IconMoon,
  IconMoonStars,
  IconBed,
  IconSunrise,
  IconActivity,
  IconCheck,
} from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

interface Milestone {
  id: string;
  stepNumber: string;
  label: string;
  time: string;
  x: number;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
  phaseName: string;
  clinicalNote: string;
  toneRatio: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'evening',
    stepNumber: '01',
    label: 'EVENING',
    time: '6:30 PM',
    x: 135,
    icon: IconMoon,
    phaseName: 'Sympathetic Wind Down',
    clinicalNote: 'Evening unwinding begins as daily sympathetic stress tapers.',
    toneRatio: 'Sympathetic: 78% · Parasympathetic: 22%',
  },
  {
    id: 'wind-down',
    stepNumber: '02',
    label: 'WIND DOWN',
    time: '9:00 PM',
    x: 310,
    icon: IconMoonStars,
    phaseName: 'Autonomic Shift',
    clinicalNote: 'Parasympathetic tone climbs steadily as heart rate slows.',
    toneRatio: 'Sympathetic: 48% · Parasympathetic: 52%',
  },
  {
    id: 'bedtime',
    stepNumber: '03',
    label: 'BEDTIME',
    time: '10:45 PM',
    x: 445,
    icon: IconBed,
    phaseName: 'Sleep Onset Crossover',
    clinicalNote: 'Parasympathetic dominance unlocks smooth, natural sleep onset.',
    toneRatio: 'Sympathetic: 28% · Parasympathetic: 72%',
  },
  {
    id: 'deep-sleep',
    stepNumber: '04',
    label: 'DEEP SLEEP',
    time: '12:00 AM',
    x: 545,
    icon: IconWaveSine,
    phaseName: 'Peak Delta Sleep',
    clinicalNote: 'Peak slow-wave delta activity driving deep cellular and neural repair.',
    toneRatio: 'Sympathetic: 12% · Parasympathetic: 88%',
  },
  {
    id: 'cortisol-rise',
    stepNumber: '05',
    label: 'CORTISOL RISE',
    time: '4:15 AM',
    x: 855,
    icon: IconActivity,
    phaseName: 'Surge Vulnerability',
    clinicalNote: 'Subconscious micro-arousals threaten deep sleep continuity before dawn.',
    toneRatio: 'Sympathetic: 42% · Parasympathetic: 58%',
  },
  {
    id: 'wake-up',
    stepNumber: '06',
    label: 'WAKE UP',
    time: '6:45 AM',
    x: 1045,
    icon: IconSunrise,
    phaseName: 'Circadian Awakening',
    clinicalNote: 'Natural cortisol rise restores morning alertness and daytime energy.',
    toneRatio: 'Sympathetic: 82% · Parasympathetic: 18%',
  },
];

const SURGE_PEAKS = [
  { cx: 595, cy: 320, label: 'Micro-Arousal 1' },
  { cx: 700, cy: 275, label: 'Micro-Arousal 2' },
  { cx: 810, cy: 235, label: 'Micro-Arousal 3' },
  { cx: 920, cy: 195, label: 'Micro-Arousal 4' },
  { cx: 1030, cy: 160, label: 'Micro-Arousal 5' },
];

const D_SYMPATHETIC =
  'M 80 110 C 190 115, 290 170, 370 240 C 415 280, 460 330, 525 365 C 555 365, 575 320, 595 320 C 615 320, 630 365, 645 365 C 665 365, 680 275, 700 275 C 720 275, 735 355, 750 355 C 770 355, 790 235, 810 235 C 830 235, 845 340, 860 340 C 880 340, 900 195, 920 195 C 940 195, 955 305, 970 305 C 990 305, 1010 160, 1030 160 C 1050 160, 1065 100, 1080 95';

const D_PARASYMPATHETIC =
  'M 80 350 C 200 350, 310 280, 445 165 C 490 115, 520 80, 545 80 C 570 80, 585 130, 605 130 C 625 130, 640 90, 665 90 C 690 90, 705 155, 730 155 C 755 155, 775 105, 805 105 C 835 105, 855 180, 885 180 C 915 180, 935 130, 965 130 C 990 130, 1010 220, 1030 220 C 1050 220, 1065 330, 1080 355';

// Precision cubic-bezier path parser for zero-jank 120fps tracking
function parsePathToSegments(d: string) {
  const tokens = d.trim().split(/(?=[MC])/);
  let current = { x: 0, y: 0 };
  const segments: { p0: { x: number; y: number }; p1: { x: number; y: number }; p2: { x: number; y: number }; p3: { x: number; y: number } }[] = [];

  for (const token of tokens) {
    const type = token[0];
    const nums = token.slice(1).trim().replace(/,/g, ' ').split(/\s+/).map(Number);
    if (type === 'M') {
      current = { x: nums[0], y: nums[1] };
    } else if (type === 'C') {
      for (let i = 0; i < nums.length; i += 6) {
        const p0 = { ...current };
        const p1 = { x: nums[i], y: nums[i + 1] };
        const p2 = { x: nums[i + 2], y: nums[i + 3] };
        const p3 = { x: nums[i + 4], y: nums[i + 5] };
        segments.push({ p0, p1, p2, p3 });
        current = p3;
      }
    }
  }
  return segments;
}

function createInterpolator(d: string) {
  const segments = parsePathToSegments(d);
  const points: { x: number; y: number }[] = [];
  for (const seg of segments) {
    const numSubSteps = 40;
    for (let i = 0; i < numSubSteps; i++) {
      const t = i / numSubSteps;
      const mt = 1 - t;
      const x = mt * mt * mt * seg.p0.x + 3 * mt * mt * t * seg.p1.x + 3 * mt * t * t * seg.p2.x + t * t * t * seg.p3.x;
      const y = mt * mt * mt * seg.p0.y + 3 * mt * mt * t * seg.p1.y + 3 * mt * t * t * seg.p2.y + t * t * t * seg.p3.y;
      points.push({ x, y });
    }
  }
  const lastSeg = segments[segments.length - 1];
  if (lastSeg) {
    points.push({ x: lastSeg.p3.x, y: lastSeg.p3.y });
  }

  return function getY(targetX: number, fallbackY = 200): number {
    if (points.length === 0) return fallbackY;
    if (targetX <= points[0].x) return points[0].y;
    if (targetX >= points[points.length - 1].x) return points[points.length - 1].y;

    let low = 0;
    let high = points.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (points[mid].x < targetX) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const p0 = points[Math.max(0, low - 1)];
    const p1 = points[Math.min(points.length - 1, low)];
    if (!p0 || !p1 || p1.x === p0.x) return p0 ? p0.y : fallbackY;
    const t = (targetX - p0.x) / (p1.x - p0.x);
    return p0.y + t * (p1.y - p0.y);
  };
}

export function AutonomicSeeSaw() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeIdx, setActiveIdx] = useState<number>(3); // Deep sleep default
  const [scrubberX, setScrubberX] = useState<number>(545);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Precomputed exact mathematical curve interpolators
  const getSymY = useMemo(() => createInterpolator(D_SYMPATHETIC), []);
  const getParaY = useMemo(() => createInterpolator(D_PARASYMPATHETIC), []);

  const activeMilestone = MILESTONES[activeIdx];

  // Ambient smooth telemetry traversal loop (relaxed pacing: ~38s full traversal)
  useEffect(() => {
    const minX = 80;
    const maxX = 1080;
    const speed = 26; // Smooth, relaxed speed (~38s cycle, giving ~6.5s per stage)

    const step = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      setScrubberX((prevX) => {
        let nextX = prevX + speed * dt;
        if (nextX > maxX) nextX = minX;

        // Auto-update active milestone based on closest milestone x
        let closestIdx = 0;
        let minDist = Infinity;
        MILESTONES.forEach((m, idx) => {
          const dist = Math.abs(m.x - nextX);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        });
        setActiveIdx(closestIdx);

        return nextX;
      });

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleSelectMilestone = (idx: number) => {
    setActiveIdx(idx);
    setScrubberX(MILESTONES[idx].x);
    lastTimeRef.current = 0;
  };

  // Continuous mathematical coordinates tracking along the curves
  const currentSymY = getSymY(scrubberX, 230);
  const currentParaY = getParaY(scrubberX, 230);

  // Stepper progress percent (0 to 100%)
  const stepperProgressPercent = (activeIdx / (MILESTONES.length - 1)) * 100;

  return (
    <section id="see-saw" className="science-section see-saw-section" ref={sectionRef}>
      <div className="science-section-header rv">
        <div className="science-section-tag">
          <IconWaveSine size={14} stroke={1.75} aria-hidden="true" />
          <span>Biology · The Autonomic Balance</span>
        </div>
        <h2 className="science-section-title">The Nervous System See-Saw</h2>
        <p className="science-section-lead">
          Your nervous system runs two modes simultaneously: the sympathetic branch
          (fight-or-flight, driving heart rate, alertness, and arousal) and the
          parasympathetic branch (rest-and-digest, driving cellular recovery and restorative
          slow-wave sleep).
        </p>
      </div>

      {/* Interactive Bespoke SVG Diagram Stage (Unboxed, Organic Luxury Canvas) */}
      <div className="see-saw-diagram-stage rv rv-d1">
        {/* Connected Horizontal Stepper Bar (Replaces bulky button tabs) */}
        <div className="see-saw-stepper-wrap" role="tablist" aria-label="Circadian Sleep Stages Stepper">
          {/* Stepper Base Track & Filled Animated Progress Line */}
          <div className="see-saw-stepper-track-line" aria-hidden="true">
            <div
              className="see-saw-stepper-fill"
              style={{ width: `${stepperProgressPercent}%` }}
            />
          </div>

          <div className="see-saw-stepper-nodes">
            {MILESTONES.map((m, idx) => {
              const Icon = m.icon;
              const isSelected = activeIdx === idx;
              const isCompleted = idx < activeIdx;

              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`see-saw-step-node ${isSelected ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                  onClick={() => handleSelectMilestone(idx)}
                >
                  <div className="step-node-bubble">
                    {isCompleted ? (
                      <IconCheck size={16} stroke={2.75} className="step-check-icon" />
                    ) : (
                      <span className="step-number">{m.stepNumber}</span>
                    )}
                    {isSelected && <span className="step-pulse-ring" aria-hidden="true" />}
                  </div>

                  <div className="step-node-content">
                    <span className="step-node-label">{m.label}</span>
                    <span className="step-node-time">{m.time}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Unboxed Editorial Telemetry Strip with Fixed Height & External Legend */}
        <div className="see-saw-telemetry-ribbon">
          <div className="telemetry-info-left">
            <span className="telemetry-live-dot" aria-hidden="true" />
            <div className="telemetry-phase-animated" key={activeMilestone.id}>
              <strong className="telemetry-phase-title">
                {activeMilestone.label} ({activeMilestone.time}) · {activeMilestone.phaseName}
              </strong>
              <span className="telemetry-desc">{activeMilestone.clinicalNote}</span>
            </div>
          </div>
          <div className="telemetry-info-right">
            <div className="see-saw-external-legend" aria-label="Graph legend">
              <span className="surges-legend-item">
                <span className="surges-legend-wave-swatch is-dashed" aria-hidden="true">
                  <span className="surges-legend-wave-dot" />
                </span>
                <span>Sympathetic Overdrive</span>
              </span>
              <span className="surges-legend-item">
                <span className="surges-legend-wave-swatch is-espresso" aria-hidden="true">
                  <span className="surges-legend-wave-dot is-espresso" />
                </span>
                <span>Parasympathetic Tone</span>
              </span>
            </div>
            <span className="telemetry-ratio-badge">{activeMilestone.toneRatio}</span>
          </div>
        </div>

        {/* SVG Vector Canvas with Integrated Internal Legends */}
        <div className="see-saw-svg-container">
          <svg
            className="see-saw-svg-canvas"
            viewBox="0 0 1120 480"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Interactive telemetry chart illustrating the autonomic nervous system balance across 13 hours"
          >
            <defs>
              {/* Sympathetic Warm Amber/Orange Vertical Gradient Fill */}
              <linearGradient id="sympathetic-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E28C38" stopOpacity="0.28" />
                <stop offset="45%" stopColor="#E28C38" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#E28C38" stopOpacity="0.01" />
              </linearGradient>

              {/* Parasympathetic Rich Espresso/Charcoal Vertical Gradient Fill */}
              <linearGradient id="parasympathetic-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A1816" stopOpacity="0.18" />
                <stop offset="50%" stopColor="#1A1816" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#1A1816" stopOpacity="0.01" />
              </linearGradient>

              {/* Scrubber Glow Filter */}
              <filter id="scrubber-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle Sleep Window Background Box */}
            <rect
              x="445"
              y="55"
              width="580"
              height="335"
              fill="rgba(26, 24, 22, 0.022)"
              stroke="rgba(26, 24, 22, 0.06)"
              strokeDasharray="4 4"
              rx="12"
            />

            {/* Horizontal Gridlines & Y-Axis Labels */}
            <g className="svg-gridlines" stroke="rgba(26, 24, 22, 0.07)" strokeDasharray="4 4" strokeWidth="1">
              <line x1="75" y1="90" x2="1080" y2="90" />
              <line x1="75" y1="230" x2="1080" y2="230" />
              <line x1="75" y1="370" x2="1080" y2="370" />
            </g>

            {/* Y-Axis High-Contrast Labels */}
            <g className="svg-axis-labels" fill="#6F685F" fontSize="11" fontWeight="600" letterSpacing="0.08em" textAnchor="end">
              <text x="64" y="94">HIGH</text>
              <text x="64" y="234">MED</text>
              <text x="64" y="374">LOW</text>
            </g>

            {/* Vertical Milestone Guides */}
            <g className="svg-vertical-guides" stroke="rgba(26, 24, 22, 0.06)" strokeDasharray="3 3">
              {MILESTONES.map((m) => (
                <line key={m.id} x1={m.x} y1="55" x2={m.x} y2="390" />
              ))}
            </g>

            {/* 1. PARASYMPATHETIC AREA FILL (Warm Espresso Gradient) */}
            <path
              d="M 80 350 C 200 350, 310 280, 445 165 C 490 115, 520 80, 545 80 C 570 80, 585 130, 605 130 C 625 130, 640 90, 665 90 C 690 90, 705 155, 730 155 C 755 155, 775 105, 805 105 C 835 105, 855 180, 885 180 C 915 180, 935 130, 965 130 C 990 130, 1010 220, 1030 220 C 1050 220, 1065 330, 1080 355 L 1080 390 L 80 390 Z"
              fill="url(#parasympathetic-grad)"
            />

            {/* 2. SYMPATHETIC AREA FILL (DUSQ Orange Gradient) */}
            <path
              d="M 80 110 C 190 115, 290 170, 370 240 C 415 280, 460 330, 525 365 C 555 365, 575 320, 595 320 C 615 320, 630 365, 645 365 C 665 365, 680 275, 700 275 C 720 275, 735 355, 750 355 C 770 355, 790 235, 810 235 C 830 235, 845 340, 860 340 C 880 340, 900 195, 920 195 C 940 195, 955 305, 970 305 C 990 305, 1010 160, 1030 160 C 1050 160, 1065 100, 1080 95 L 1080 390 L 80 390 Z"
              fill="url(#sympathetic-grad)"
            />

            {/* 3. PARASYMPATHETIC SOLID CURVE STROKE (Warm Espresso #1A1816) */}
            <path
              d={D_PARASYMPATHETIC}
              fill="none"
              stroke="#1A1816"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 4. SYMPATHETIC FLOWING DASHED CURVE STROKE (DUSQ Orange #E28C38) */}
            <path
              className="sympathetic-dash-curve"
              d={D_SYMPATHETIC}
              fill="none"
              stroke="#E28C38"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="9 6"
            />

            {/* 5. Animated Nocturnal Micro-Surge Pulse Rings */}
            <g className="surge-pulse-beacons">
              {SURGE_PEAKS.map((peak, idx) => (
                <g key={idx} transform={`translate(${peak.cx}, ${peak.cy})`}>
                  <circle r="12" fill="none" stroke="#E28C38" strokeWidth="1.5" className="surge-beacon-ring" opacity="0.6" />
                  <circle r="4" fill="#E28C38" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>
              ))}
            </g>

            {/* 6. Dynamic Playhead Scrubber with Pointers Locked to Graph Heights */}
            <g className="svg-scrubber" transform={`translate(${scrubberX}, 0)`}>
              <line
                x1="0"
                y1="50"
                x2="0"
                y2="395"
                stroke="#E28C38"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.85"
              />
              {/* Parasympathetic Tracker Node — mathematically rides the curve */}
              <circle
                cx="0"
                cy={currentParaY}
                r="6.5"
                fill="#1A1816"
                stroke="#FAF8F5"
                strokeWidth="2.5"
                filter="url(#scrubber-glow)"
              />
              {/* Sympathetic Tracker Node — mathematically rides the curve */}
              <circle
                cx="0"
                cy={currentSymY}
                r="6.5"
                fill="#E28C38"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                filter="url(#scrubber-glow)"
              />
            </g>

            {/* 8. Bottom Sleep State Bar (AWAKE · ASLEEP · AWAKE) */}
            <g className="svg-sleep-state-bar">
              {/* AWAKE 1 (6:00 PM - 10:45 PM) in DUSQ Orange */}
              <rect x="80" y="405" width="365" height="18" rx="4" fill="#E28C38" />
              <text x="262" y="418" fill="#111111" fontSize="10.5" fontWeight="700" letterSpacing="0.14em" textAnchor="middle">
                AWAKE
              </text>

              {/* ASLEEP (10:45 PM - 6:20 AM) in Deep Espresso */}
              <rect x="448" y="405" width="574" height="18" rx="4" fill="#1A1816" />
              <text x="735" y="418" fill="#FAF8F5" fontSize="10.5" fontWeight="700" letterSpacing="0.14em" textAnchor="middle">
                ASLEEP
              </text>

              {/* AWAKE 2 (6:20 AM - 7:00 AM) in DUSQ Orange */}
              <rect x="1025" y="405" width="55" height="18" rx="4" fill="#E28C38" />
              <text x="1052" y="418" fill="#111111" fontSize="9.5" fontWeight="700" letterSpacing="0.14em" textAnchor="middle">
                AWAKE
              </text>
            </g>

            {/* 9. X-Axis Time Labels (High-contrast #6F685F) */}
            <g className="svg-time-labels" fill="#6F685F" fontSize="11" fontWeight="600" letterSpacing="0.05em" textAnchor="middle">
              <text x="80" y="442">6 PM</text>
              <text x="235" y="442">8 PM</text>
              <text x="390" y="442">10 PM</text>
              <text x="545" y="442">12 AM</text>
              <text x="700" y="442">2 AM</text>
              <text x="855" y="442">4 AM</text>
              <text x="1010" y="442">6 AM</text>
              <text x="1080" y="442">7 AM</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Two Comparative Mechanism Cards (Brand Styled) */}
      <div className="see-saw-cards-grid rv rv-d2">
        <article className="see-saw-card sympathetic-card">
          <div className="see-saw-card-icon-wrap sympathetic-icon">
            <IconFlame size={20} stroke={1.75} aria-hidden="true" />
          </div>
          <span className="see-saw-card-mode">Branch 01 · Fight-or-Flight</span>
          <h3 className="see-saw-card-title">Sympathetic Overdrive</h3>
          <p className="see-saw-card-desc">
            Elevated nighttime adrenaline keeps the heart fast and traps the brain in shallow, unrefreshing sleep.
          </p>
          <ul className="see-saw-card-list">
            <li>Elevated resting heart rate and depressed HRV</li>
            <li>Frequent micro-arousals breaking deep sleep</li>
            <li>Morning fatigue despite 8 hours in bed</li>
          </ul>
        </article>

        <article className="see-saw-card parasympathetic-card">
          <div className="see-saw-card-icon-wrap parasympathetic-icon">
            <IconRipple size={20} stroke={1.75} aria-hidden="true" />
          </div>
          <span className="see-saw-card-mode">Branch 02 · Rest-and-Digest</span>
          <h3 className="see-saw-card-title">Parasympathetic Dominance</h3>
          <p className="see-saw-card-desc">
            Vagal nerve activation slows the heart and guides the brain into deep, restorative slow-wave delta sleep.
          </p>
          <ul className="see-saw-card-list">
            <li>High heart rate variability (HRV / RMSSD)</li>
            <li>Active cellular repair and glymphatic clearance</li>
            <li>Unbroken, restorative Stage 3 deep sleep</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
