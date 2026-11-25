import React, { useRef, useState, useEffect } from 'react';
import {
  IconActivity,
  IconCpu,
  IconWaveSine,
  IconShieldCheck,
  IconPlayerPlay,
  IconPlayerPause,
  IconRefresh,
  IconCheck,
} from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

interface PipelineStage {
  id: string;
  num: string;
  title: string;
  eyebrow: string;
  latency: string;
  description: string;
  chip: string;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
  locusName: string;
  locusDesc: string;
}

const STAGES: PipelineStage[] = [
  {
    id: 'sense',
    num: '01',
    title: 'Sense',
    eyebrow: 'SYMPATHETIC DETECTION',
    latency: '0–200 ms',
    description:
      'Postauricular EDA electrodes detect micro-sweat conductance spikes within milliseconds of sympathetic nerve firing.',
    chip: 'Sub-ms EDA + Optical PPG',
    icon: IconActivity,
    locusName: 'POSTAURICULAR ECCRINE & ARTERIAL BED',
    locusDesc:
      'Continuous sampling of sympathetic micro-sweat and pulse transit directly over the posterior auricular artery.',
  },
  {
    id: 'classify',
    num: '02',
    title: 'Classify',
    eyebrow: 'ON-DEVICE EDGE DSP',
    latency: '200–650 ms',
    description:
      'Onboard bioelectronic DSP algorithms separate true sub-cortical autonomic surges from ordinary gross motor rolls.',
    chip: '50M+ Datapoint Calibration',
    icon: IconCpu,
    locusName: 'ON-DEVICE BIOELECTRONIC DSP',
    locusDesc:
      'Filtering gross motor adjustments from true autonomic micro-arousals without cloud latency.',
  },
  {
    id: 'modulate',
    num: '03',
    title: 'Modulate',
    eyebrow: 'DUAL NEUROMODULATION',
    latency: '0.7–8.0 s',
    description:
      'Adaptive micro-pulses activate the auricular vagus (nVNS) and vestibular (nVEnS) pathways to brake sympathetic overdrive.',
    chip: 'Sub-Sensory 0 dB Micro-Currents',
    icon: IconWaveSine,
    locusName: 'AURICULAR VAGUS (ABVN) & OTOLITH PATHWAY',
    locusDesc:
      'Delivering sub-sensory vagal and vestibular micro-pulses directly to cranial nerve branches.',
  },
  {
    id: 'stabilize',
    num: '04',
    title: 'Stabilize',
    eyebrow: 'SLOW-WAVE PRESERVATION',
    latency: '< 15.0 s',
    description:
      'Parasympathetic dominance is restored before sleep architecture fragments, preserving unbroken Stage 3 slow-wave sleep.',
    chip: 'Closed-Loop All-Night Lock',
    icon: IconShieldCheck,
    locusName: 'THALAMOCORTICAL DELTA SYNCHRONY',
    locusDesc:
      'Restoring parasympathetic dominance before awakening occurs, preserving deep delta continuity.',
  },
];

const CONVERGENCE_SPECS = [
  {
    val: '0 mm',
    label: 'Ear Canal Intrusion',
    sub: 'Leaves ear canal 100% open & breathable',
  },
  {
    val: '< 15 s',
    label: 'Closed-Loop Latency',
    sub: 'Detects & attenuates surges before waking',
  },
  {
    val: '2 Pathways',
    label: 'Converged at Mastoid',
    sub: 'Auricular Vagus + Vestibular Otolith',
  },
  {
    val: '14+ hrs',
    label: 'Autonomous Operation',
    sub: 'Zero phone or Bluetooth radiation overnight',
  },
];

export function ConvergenceSection() {
  const sectionRef = useReveal<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStage, setActiveStage] = useState(0);
  const [isLoopPaused, setIsLoopPaused] = useState(false);
  const [stageProgress, setStageProgress] = useState(0);

  useEffect(() => {
    if (
      isLoopPaused ||
      (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      return;
    }

    const STEP_MS = 50;
    const STAGE_DURATION = 4200;
    const increment = (STEP_MS / STAGE_DURATION) * 100;

    const timer = window.setInterval(() => {
      setStageProgress((prev) => {
        if (prev + increment >= 100) {
          setActiveStage((s) => (s + 1) % STAGES.length);
          return 0;
        }
        return prev + increment;
      });
    }, STEP_MS);

    return () => window.clearInterval(timer);
  }, [isLoopPaused]);

  const handleSelectStage = (idx: number) => {
    setActiveStage(idx);
    setStageProgress(0);
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const currentLocus = STAGES[activeStage];

  return (
    <section id="convergence" className="science-section convergence-section" ref={sectionRef}>
      {/* Section Header */}
      <div className="science-section-header rv">
        <div className="science-section-tag">
          <IconShieldCheck size={14} stroke={1.75} aria-hidden="true" />
          <span>Architecture · The Mastoid Convergence</span>
        </div>
        <h2 className="science-section-title">
          How Sensing and Intervening Converge at One Point
        </h2>
        <p className="science-section-lead">
          By anchoring behind the ear on the mastoid process, DUSQ unites real-time sympathetic
          sensing (EDA + PPG) with adaptive closed-loop neuromodulation (nVNS &amp; nVEnS) in an
          ergonomic 12-gram form factor.
        </p>
      </div>

      {/* Fluid Stage */}
      <div
        className="convergence-fluid-stage rv rv-d1"
        onMouseEnter={() => setIsLoopPaused(true)}
        onMouseLeave={() => setIsLoopPaused(false)}
      >
        <div className="convergence-unboxed-grid">
          {/* Left Column: Natural 3D Anatomical Viewport */}
          <div className="convergence-anatomical-column">
            <div className="anatomical-media-viewport">
              <video
                ref={videoRef}
                src="/science/mastoid-convergence.mp4"
                className="anatomical-video-clean"
                preload="auto"
                autoPlay
                loop
                muted
                playsInline
                aria-label="3D anatomical rendering of DUSQ behind-the-ear mastoid sensor convergence and vagus nerve pathway"
              />

              {/* Minimalist Top Tag */}
              <div className="anatomical-header-tag">
                <span className="anatomical-tag-dot" aria-hidden="true" />
                <span>12G Behind-the-Ear Mastoid Anchor · Zero Ear Canal Obstruction</span>
              </div>

              {/* Minimalist Video Control */}
              <button
                type="button"
                className="anatomical-play-btn"
                onClick={toggleVideo}
                aria-label={isPlaying ? 'Pause convergence video' : 'Play convergence video'}
              >
                {isPlaying ? (
                  <IconPlayerPause size={14} stroke={2} aria-hidden="true" />
                ) : (
                  <IconPlayerPlay size={14} stroke={2} aria-hidden="true" />
                )}
              </button>

              {/* Locus Readout: Clean Gradient Overlay without Blur Smudge */}
              <div className="anatomical-locus-caption" key={currentLocus.id}>
                <div className="locus-caption-header">
                  <span className="locus-live-indicator" aria-hidden="true" />
                  <strong className="locus-caption-title">
                    STAGE {currentLocus.num} · {currentLocus.locusName}
                  </strong>
                </div>
                <p className="locus-caption-text">{currentLocus.locusDesc}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Precision Editorial Closed-Loop Sequence (No Broken Vertical Sticks) */}
          <div className="convergence-flow-column">
            <div className="convergence-flow-header">
              <div className="convergence-flow-title-group">
                <span className="flow-eyebrow-pill">AUTONOMIC FEEDBACK LOOP</span>
                <span className="flow-latency-indicator">&lt; 15s Closed-Loop Response</span>
              </div>

              {/* Horizontal 4-Stage Quick Progress Pills */}
              <div className="convergence-progress-pills" aria-hidden="true">
                {STAGES.map((s, sIdx) => {
                  const isCurrent = activeStage === sIdx;
                  const isDone = sIdx < activeStage;
                  return (
                    <span
                      key={s.id}
                      className={`convergence-progress-bar ${isCurrent ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                    >
                      <span
                        className="convergence-progress-fill"
                        style={{
                          width: isCurrent ? `${stageProgress}%` : isDone ? '100%' : '0%',
                        }}
                      />
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Clean Architectural Hairline Accordion Rows */}
            <div className="convergence-pathway-stream" role="tablist" aria-label="Closed-loop stages">
              {STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                const IconComponent = stage.icon;

                return (
                  <div
                    key={stage.id}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={0}
                    className={`pathway-stage-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleSelectStage(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectStage(idx);
                      }
                    }}
                  >
                    {/* Top Row Header: Always visible & scannable */}
                    <div className="pathway-stage-header">
                      <span className="pathway-stage-num">{stage.num}</span>
                      <span className="pathway-stage-icon-badge" aria-hidden="true">
                        <IconComponent size={15} stroke={1.85} />
                      </span>
                      <div className="pathway-stage-titles">
                        <h3 className="pathway-title">{stage.title}</h3>
                        <span className="pathway-eyebrow">{stage.eyebrow}</span>
                      </div>
                      <span className="pathway-stage-latency">{stage.latency}</span>
                    </div>

                    {/* Smooth M3 CSS-Grid Expandable Body */}
                    <div className="pathway-stage-collapse" aria-hidden={!isActive}>
                      <div className="pathway-stage-collapse-inner">
                        <div className="pathway-stage-body">
                          <p className="pathway-desc">{stage.description}</p>
                          <div className="pathway-chip-row">
                            <span className="pathway-spec-chip">
                              <IconCheck size={12} stroke={2.4} aria-hidden="true" />
                              <span>{stage.chip}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continuous Overnight Loop Status Footer */}
            <div className="convergence-loop-status-line">
              <span className="loop-status-icon-wrap" aria-hidden="true">
                <IconRefresh size={14} stroke={2} className="loop-status-spin" />
              </span>
              <div className="loop-status-copy">
                <strong>CONTINUOUS OVERNIGHT LOOP</strong>
                <span> · Closed-loop stabilization feeds back into real-time autonomic sensing at 64 Hz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Unboxed 4-Column Technical Metrics Strip */}
        <div className="convergence-unboxed-metrics">
          {CONVERGENCE_SPECS.map((item, idx) => (
            <div key={idx} className="convergence-metric-col">
              <span className="convergence-metric-val">{item.val}</span>
              <strong className="convergence-metric-lbl">{item.label}</strong>
              <span className="convergence-metric-sub">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
