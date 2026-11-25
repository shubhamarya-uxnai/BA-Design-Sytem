import React, { useState } from 'react';
import {
  IconMoon,
  IconSun,
  IconSparkles,
  IconClock,
  IconCheck,
} from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';
import { PillButton } from '../PillButton';

interface ChronobiologySectionProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function ChronobiologySection({ onNavigate }: ChronobiologySectionProps) {
  const sectionRef = useReveal<HTMLElement>();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'evening',
      time: '7:00 PM',
      title: 'The Evening',
      phaseLabel: 'PHASE 01 · 7:00 PM',
      subtitle: 'Autonomic unwinding & sleep readiness mapping',
      icon: IconSun,
      summary:
        'Worn four hours before bedtime, DUSQ continuously monitors autonomic balance and primes postauricular vagal tone, signaling your nervous system to shift into restorative parasympathetic readiness before sleep.',
      badges: ['Parasympathetic Shift', 'Live Readiness Mapping', 'Vagal Tone Priming'],
    },
    {
      id: 'onset',
      time: '9:00 PM',
      title: 'Sleep Onset',
      phaseLabel: 'PHASE 02 · 9:00 PM',
      subtitle: 'Gentle vestibular guidance into delta sleep',
      icon: IconMoon,
      summary:
        'Once in bed, subtle otolith motion cues stimulate natural vestibular pathways to guide cortical brainwaves into slow-wave delta synchrony, significantly reducing sleep onset latency without grogginess or sensory distraction.',
      badges: ['Sub-Sensory Otolith Cues', 'Reduced Sleep Latency', 'Delta-Wave Entrainment'],
    },
    {
      id: 'night',
      time: '11:00 PM',
      title: 'Through the Night',
      phaseLabel: 'PHASE 03 · 11:00 PM',
      subtitle: 'Closed-loop surge attenuation & slow-wave preservation',
      icon: IconSparkles,
      summary:
        'When nocturnal autonomic micro-surges occur, DUSQ detects the spike in milliseconds and delivers dual vagal and vestibular micro-pulses within 15 seconds, preventing subcortical arousal and preserving Stage 3 slow-wave continuity.',
      badges: ['< 15s Intervention Latency', 'Sympathetic Surge Attenuation', 'Stage 3 SWS Preservation'],
    },
  ];

  const currentStep = steps[activeStep];

  return (
    <section id="chronobiology" className="science-section chronobiology-section" ref={sectionRef}>
      {/* Section Header */}
      <div className="science-section-header rv">
        <div className="science-section-tag">
          <IconClock size={14} stroke={1.75} aria-hidden="true" />
          <span>Synthesis · Chronobiology Pathways</span>
        </div>
        <h2 className="science-section-title">
          Three ways the system works with you, across the night.
        </h2>
        <p className="science-section-lead">
          Everything from L1, L2, and L3 comes together across the nocturnal timeline. Each phase
          combines sensing and neurostimulation to support every critical moment of your night.
        </p>
      </div>

      {/* Sleek Unboxed Chronological Journey */}
      <div className="chrono-journey-stage rv rv-d1">
        {/* Pixel-Perfect Stepper Bar (Connecting lines directly centered with bubbles) */}
        <div className="chrono-stepper-rail" role="tablist" aria-label="Night Timeline Phases">
          <div className="chrono-stepper-track">
            {steps.map((st, idx) => {
              const isSelected = activeStep === idx;
              const isCompleted = idx < activeStep;
              const Icon = st.icon;

              return (
                <React.Fragment key={st.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`chrono-stepper-node ${isSelected ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div className="chrono-node-bubble">
                      <Icon size={18} stroke={1.75} aria-hidden="true" />
                    </div>
                    <div className="chrono-node-meta">
                      <strong className="chrono-node-time">{st.time}</strong>
                      <span className="chrono-node-name">{st.title}</span>
                    </div>
                  </button>

                  {idx < steps.length - 1 && (
                    <div className="chrono-stepper-divider" aria-hidden="true">
                      <div
                        className={`chrono-divider-progress ${idx < activeStep ? 'is-filled' : ''}`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Narrative Showcase for the Active Timeline Stage (Concise, punchy editorial copy) */}
        <div className="chrono-narrative-showcase" key={currentStep.id}>
          <div className="chrono-narrative-header">
            <span className="chrono-phase-pill">{currentStep.phaseLabel}</span>
            <h3 className="chrono-phase-title">{currentStep.title}</h3>
            <p className="chrono-phase-subtitle">{currentStep.subtitle}</p>
          </div>

          <div className="chrono-narrative-body">
            <p className="chrono-summary-text">{currentStep.summary}</p>
          </div>

          <div className="chrono-narrative-footer">
            <div className="chrono-badges-strip">
              {currentStep.badges.map((b, bIdx) => (
                <span key={bIdx} className="chrono-badge-chip">
                  <span className="chip-dot-orange" aria-hidden="true" />
                  <span>{b}</span>
                </span>
              ))}
            </div>

            <div className="chrono-action-row">
              <PillButton
                href="#how-it-works"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/', '#how-it-works');
                  }
                }}
              >
                See How It Works
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
