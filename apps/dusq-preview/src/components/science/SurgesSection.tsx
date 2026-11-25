import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  IconFileCertificate,
  IconActivity,
  IconFlame,
  IconBolt,
  IconHeartbeat,
} from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

interface SurgePillar {
  id: string;
  x: number;
  width: number;
  peakIndex: number;
  time: string;
  heartRate: string;
  cortisolLevel: string;
  label: string;
}

const SURGE_PILLARS: SurgePillar[] = [
  { id: 'p1', x: 185, width: 34, peakIndex: 1, time: '11:15 PM', heartRate: '+26 BPM spike', cortisolLevel: 'High micro-surge', label: 'Surge 01' },
  { id: 'p2', x: 232, width: 34, peakIndex: 1, time: '11:45 PM', heartRate: '+22 BPM spike', cortisolLevel: 'Peak arousal', label: 'Surge 02' },
  { id: 'p3', x: 415, width: 34, peakIndex: 2, time: '1:30 AM', heartRate: '+19 BPM spike', cortisolLevel: 'Steep rise', label: 'Surge 03' },
  { id: 'p4', x: 470, width: 34, peakIndex: 2, time: '2:05 AM', heartRate: '+18 BPM spike', cortisolLevel: 'Stage 2 pull', label: 'Surge 04' },
  { id: 'p5', x: 680, width: 34, peakIndex: 3, time: '3:50 AM', heartRate: '+21 BPM spike', cortisolLevel: 'REM intrusion', label: 'Surge 05' },
  { id: 'p6', x: 880, width: 34, peakIndex: 4, time: '5:20 AM', heartRate: '+15 BPM spike', cortisolLevel: 'Pre-dawn surge', label: 'Surge 06' },
  { id: 'p7', x: 925, width: 34, peakIndex: 4, time: '5:45 AM', heartRate: '+17 BPM spike', cortisolLevel: 'Awakening drift', label: 'Surge 07' },
];

const D_SURGE_WAVE =
  'M 70 350 C 100 350, 130 330, 160 270 C 190 200, 205 110, 220 110 C 235 110, 270 230, 310 300 C 330 320, 345 320, 360 315 C 385 300, 415 200, 440 155 C 465 155, 495 240, 520 295 C 535 315, 545 315, 560 310 C 590 290, 630 220, 660 205 C 690 205, 720 270, 750 310 C 765 325, 775 325, 790 320 C 820 305, 850 280, 870 275 C 890 275, 930 320, 970 340 C 990 348, 1010 350, 1030 350';

// Mathematical cubic bezier curve interpolator
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

  return function getY(targetX: number, fallbackY = 350): number {
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

export function SurgesSection() {
  const sectionRef = useReveal<HTMLElement>();
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const [playheadX, setPlayheadX] = useState<number>(232);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Precomputed exact mathematical curve interpolator for wave heights
  const getSurgeY = useMemo(() => createInterpolator(D_SURGE_WAVE), []);

  // Ambient continuous sweeping playhead loop across the 4 nocturnal sleep cycles
  useEffect(() => {
    const minX = 70;
    const maxX = 1030;
    const speed = 36; // Paced telemetry sweep (~26s full night traversal)

    const step = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      setPlayheadX((prevX) => {
        let nextX = prevX + speed * dt;
        if (nextX > maxX) nextX = minX;

        // Find if playhead is currently inside any disruption pillar
        const intersectingIdx = SURGE_PILLARS.findIndex(
          (p) => nextX >= p.x - 12 && nextX <= p.x + p.width + 12
        );
        setActivePillar(intersectingIdx !== -1 ? intersectingIdx : null);

        return nextX;
      });

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const currentPillar = activePillar !== null ? SURGE_PILLARS[activePillar] : null;

  // Exact vertical Y on the waveform corresponding to current playheadX
  const currentWaveY = getSurgeY(playheadX, 350);

  return (
    <section id="surges" className="science-section surges-section" ref={sectionRef}>
      <div className="science-section-header rv">
        <div className="science-section-tag">
          <IconActivity size={14} stroke={1.75} aria-hidden="true" />
          <span>Clinical Discovery · Sleep Fragmentation</span>
        </div>
        <h2 className="science-section-title">Surges: The Invisible Determinants of Sleep Quality</h2>
        <p className="science-section-lead">
          You might sleep 8 hours and wake exhausted. Throughout the night, hidden sympathetic
          micro-surges break slow-wave delta sleep without ever waking you consciously.
        </p>
      </div>

      {/* Nature Peer-Reviewed Citation (Minimal, Editorial, Easy to Read) */}
      <div className="science-citation-box rv rv-d1">
        <div className="citation-icon-wrap">
          <IconFileCertificate size={22} stroke={1.75} aria-hidden="true" />
        </div>
        <div className="citation-content">
          <div className="citation-header">
            <span className="citation-journal">Nature · Herberger et al., 2025</span>
            <span className="citation-tag">Peer-Reviewed Benchmark</span>
          </div>
          <blockquote className="citation-quote">
            “Autonomic micro-surges are the primary cause of sleep fragmentation. Even brief
            spikes break deep delta rhythm and block nocturnal recovery.”
          </blockquote>
          <div className="citation-meta">
            <span>Validated across 32-channel clinical polysomnography &amp; skin conductance telemetry</span>
          </div>
        </div>
      </div>

      {/* Bespoke Live-Animated Surges Telemetry Stage (Unboxed Canvas) */}
      <div className="surges-chart-stage rv rv-d2">
        {/* Top Graph Header Bar: Dedicated Legend Row Outside the SVG Plotting Area */}
        <div className="surges-chart-top-bar">
          <div className="surges-chart-top-meta">
            <span className="telemetry-live-dot" aria-hidden="true" />
            <span className="surges-chart-top-label">OVERNIGHT POLYSOMNOGRAPHY · 10 PM – 6 AM</span>
          </div>
          <div className="surges-external-legend" aria-label="Graph legend">
            <span className="surges-legend-item">
              <span className="surges-legend-wave-swatch" aria-hidden="true">
                <span className="surges-legend-wave-dot" />
              </span>
              <span>Micro-Arousal Waves</span>
            </span>
            <span className="surges-legend-item">
              <span className="surges-legend-pillar-swatch" aria-hidden="true" />
              <span>Disruption Pillars (&lt;15s)</span>
            </span>
          </div>
        </div>

        {/* Vector SVG Telemetry Canvas (Zero Overlapping Legend) */}
        <div className="surges-svg-wrapper">
          <svg
            className="surges-svg-canvas"
            viewBox="0 0 1120 420"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Nocturnal sympathetic surges waveform illustrating 4 diminishing sleep-depth waves and 7 micro-arousal disruption pillars"
          >
            <defs>
              {/* DUSQ Brand Orange to Soft Amber Vertical Fill */}
              <linearGradient id="surge-orange-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E28C38" stopOpacity="0.34" />
                <stop offset="45%" stopColor="#E28C38" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#E28C38" stopOpacity="0.01" />
              </linearGradient>

              {/* Disruption Pillar Gradient */}
              <linearGradient id="pillar-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E28C38" stopOpacity="0.16" />
                <stop offset="80%" stopColor="#E28C38" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#E28C38" stopOpacity="0.01" />
              </linearGradient>

              {/* Scrubber Glow */}
              <filter id="surge-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle Horizontal Level Gridlines */}
            <g stroke="rgba(26, 24, 22, 0.07)" strokeDasharray="4 4" strokeWidth="1">
              <line x1="70" y1="100" x2="1030" y2="100" />
              <line x1="70" y1="180" x2="1030" y2="180" />
              <line x1="70" y1="260" x2="1030" y2="260" />
              <line x1="70" y1="345" x2="1030" y2="345" />
            </g>

            {/* 7 Vertical Sympathetic Surge Disruption Pillars */}
            {SURGE_PILLARS.map((p, idx) => {
              const isPillarActive = activePillar === idx;
              return (
                <g
                  key={p.id}
                  className="surge-pillar-group"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setActivePillar(idx);
                    setPlayheadX(p.x + p.width / 2);
                  }}
                >
                  {/* Vertical Translucent Pillar Column */}
                  <rect
                    x={p.x}
                    y="45"
                    width={p.width}
                    height="305"
                    fill={isPillarActive ? 'rgba(226, 140, 56, 0.22)' : 'url(#pillar-grad)'}
                    stroke={isPillarActive ? '#E28C38' : 'rgba(226, 140, 56, 0.22)'}
                    strokeWidth={isPillarActive ? '1.5' : '1'}
                    strokeDasharray={isPillarActive ? 'none' : '3 3'}
                    rx="6"
                    style={{ transition: 'all 0.25s ease' }}
                  />

                  {/* Circular Micro-Arousal Icon Badge at Top */}
                  <g transform={`translate(${p.x + p.width / 2}, 36)`}>
                    <circle
                      r="12"
                      fill={isPillarActive ? '#1A1816' : '#FFFFFF'}
                      stroke={isPillarActive ? '#E28C38' : 'rgba(226, 140, 56, 0.45)'}
                      strokeWidth="1.5"
                    />
                    <circle
                      r="4"
                      fill={isPillarActive ? '#E28C38' : '#6F685F'}
                    />
                    {isPillarActive && (
                      <circle
                        r="18"
                        fill="none"
                        stroke="#E28C38"
                        strokeWidth="1.5"
                        className="surge-beacon-ring"
                      />
                    )}
                  </g>
                </g>
              );
            })}

            {/* Main 4-Peak Sleep Depth Waveform (Gradient Fill Area) */}
            <path
              d={`${D_SURGE_WAVE} L 1030 360 L 70 360 Z`}
              fill="url(#surge-orange-fill)"
            />

            {/* Main 4-Peak Sleep Depth Waveform (Solid Brand Orange Stroke) */}
            <path
              d={D_SURGE_WAVE}
              fill="none"
              stroke="#E28C38"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dynamic Sweeping Telemetry Playhead Line — Pointer Tracks Waveform Curve Exactly! */}
            <g className="surges-playhead-group" transform={`translate(${playheadX}, 0)`}>
              <line
                x1="0"
                y1="36"
                x2="0"
                y2="355"
                stroke="#E28C38"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.85"
              />
              {/* Animated Pointer Node Locked to Wave Curve */}
              <circle
                cx="0"
                cy={currentWaveY}
                r="6"
                fill="#E28C38"
                stroke="#FFFFFF"
                strokeWidth="2"
                filter="url(#surge-glow)"
              />
              <circle
                cx="0"
                cy={currentWaveY}
                r="11"
                fill="none"
                stroke="#E28C38"
                strokeWidth="1.2"
                opacity="0.5"
              />
            </g>

            {/* Right Y-Axis High-Contrast Clinical Labels (High, Steep, Rising, Low) */}
            <g className="svg-right-axis-labels" fill="#6F685F" fontSize="11" fontWeight="600" letterSpacing="0.05em" textAnchor="start">
              <text x="1045" y="104">High</text>
              <text x="1045" y="184">Steep</text>
              <text x="1045" y="264">Rising</text>
              <text x="1045" y="348">Low</text>
            </g>

            {/* Bottom X-Axis Time Labels (10 PM, 12 AM, 2 AM, 4 AM, 6 AM) */}
            <g className="svg-time-labels" fill="#6F685F" fontSize="11.5" fontWeight="600" letterSpacing="0.05em" textAnchor="middle">
              <text x="120" y="390">10 PM</text>
              <text x="340" y="390">12 AM</text>
              <text x="560" y="390">2 AM</text>
              <text x="780" y="390">4 AM</text>
              <text x="1000" y="390">6 AM</text>
            </g>
          </svg>
        </div>

        {/* ACTIVE DETECTION READOUT BELOW THE GRAPH (Fixed-Height Container Prevents Any Layout Shift) */}
        <div className="surges-active-detection-below">
          <div className="detection-status-row">
            <span className="telemetry-live-dot" aria-hidden="true" />
            <span className="detection-status-pill">
              {currentPillar ? 'ACTIVE DETECTION' : 'POLYSOMNOGRAPHY TELEMETRY'}
            </span>
            <span className={`detection-pillar-badge ${currentPillar ? 'is-active' : 'is-ambient'}`}>
              {currentPillar
                ? `${currentPillar.label} · ${currentPillar.time} · ${currentPillar.cortisolLevel}`
                : 'Baseline Tracking · 4 Nocturnal Cycles'}
            </span>
          </div>

          <div
            className="detection-details-animated"
            key={currentPillar ? currentPillar.id : 'ambient-sweep'}
          >
            <strong className="detection-title">
              {currentPillar
                ? `${currentPillar.label} (${currentPillar.time}) — ${currentPillar.heartRate}`
                : '8-Hour Sleep Waveform · 4 Delta Deep Sleep Cycles'}
            </strong>
            <p className="detection-desc">
              {currentPillar
                ? 'Subcortical micro-arousal spike pulls Stage 3 delta sleep back into shallow rest.'
                : 'Continuous sleep depth tracking. Click any pillar to inspect a micro-arousal spike.'}
            </p>
          </div>
        </div>

        {/* Clinical Interpretation Metric Strip (Minimal, Punchy Takeaways) */}
        <div className="surges-metric-strip">
          <div className="surges-metric-card">
            <span className="surges-metric-num">20–30</span>
            <strong className="surges-metric-title">Surges per night</strong>
            <p className="surges-metric-text">
              Hidden heart-rate spikes that disrupt deep sleep without waking you.
            </p>
          </div>
          <div className="surges-metric-card">
            <span className="surges-metric-num">&lt;15s</span>
            <strong className="surges-metric-title">Micro-arousal window</strong>
            <p className="surges-metric-text">
              Too brief to remember, but resets restorative delta cycles back to shallow sleep.
            </p>
          </div>
          <div className="surges-metric-card">
            <span className="surges-metric-num">-42%</span>
            <strong className="surges-metric-title">Deep sleep deficit</strong>
            <p className="surges-metric-text">
              Restorative Stage 3 sleep lost to unmitigated nocturnal surges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
