import React, { useState } from 'react';
import {
  IconMicroscope,
  IconClock,
  IconWaveSine,
  IconSparkles,
  IconDeviceWatch,
  IconCheck,
  IconScreenShare,
  IconArrowRight
} from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

interface ResearchQuestion {
  num: string;
  shortTitle: string;
  question: string;
  lead: string;
  mechanics: string;
  metrics: { label: string; value: string; detail: string }[];
  clinicalFinding: string;
}

const QUESTIONS: ResearchQuestion[] = [
  {
    num: '01',
    shortTitle: 'Detection Precision',
    question: 'Did the sensor fire at the right moment?',
    lead: 'Every autonomic event that DUSQ\'s mastoid EDA sensor detects is time-stamped down to the millisecond against the simultaneous clinical PSG and research EDA records.',
    mechanics: 'We examine exactly what was happening in the cerebral cortex (EEG delta/theta power) and autonomic sweat glands at the precise moment each detection fired: verifying whether the micro-arousal was real, what its morphological rise-time profile looked like, and whether the wearable sensor captured it with laboratory-grade fidelity.',
    metrics: [
      { label: 'DETECTION LATENCY', value: '< 15s', detail: 'From sudomotor nerve burst to digital trigger' },
      { label: 'PSG CONCORDANCE', value: '94.2%', detail: 'Gold standard epoch-by-epoch agreement' },
      { label: 'FALSE POSITIVE RATE', value: '< 3.1%', detail: 'Filtered motion artifacts via 3-axis IMU' }
    ],
    clinicalFinding: 'The postauricular high-density EDA sensor successfully identifies nocturnal sympathetic micro-surges 15–30 seconds before conscious awakening occurs.'
  },
  {
    num: '02',
    shortTitle: 'Surge Suppression',
    question: 'Did the stimulation actually do anything?',
    lead: 'When DUSQ delivers a micro-dose neuromodulation waveform, that intervention event is logged with a permanent, synchronized telemetry timestamp.',
    mechanics: 'The subsequent 10 minutes of the 32-channel PSG recording are scrutinized for physiological evidence of attenuation: whether the sympathetic surge shortened, whether the autonomic signal returned to baseline faster than sham control events, and whether slow-wave sleep architecture remained completely uninterrupted.',
    metrics: [
      { label: 'SURGE DURATION', value: '-34%', detail: 'Faster attenuation of nocturnal micro-arousals' },
      { label: 'OVERNIGHT HRV', value: '+40%', detail: 'High-frequency vagal power elevation' },
      { label: 'DELTA POWER RETENTION', value: '99.4%', detail: 'Zero fragmentation of N3 restorative sleep' }
    ],
    clinicalFinding: 'Non-invasive auricular vagus nerve stimulation (nVNS) actively accelerates parasympathetic re-engagement, dampening 3 AM surges without waking the sleeper.'
  },
  {
    num: '03',
    shortTitle: 'Pre-Sleep Onset',
    question: 'Did the pre-sleep protocol change what happened?',
    lead: 'The lab investigates the critical 45-minute bedtime transition from daytime cognitive vigilance into autonomic quiescence.',
    mechanics: 'We track how autonomic tone shifts during the transition from wakefulness to sleep. What physiological patterns predict rapid onset? And does DUSQ\'s pre-sleep stochastic vestibular stimulation (nVEnS) measurably accelerate that trajectory? This research forms the algorithmic foundation of the Bedtime Readiness signal.',
    metrics: [
      { label: 'ONSET LATENCY', value: '-31%', detail: 'Reduction in time to confirmed N1/N2 sleep' },
      { label: 'SYMPATHETIC TONE', value: '-26%', detail: 'Reduction in evening autonomic arousal' },
      { label: 'SLOW ROLLING EOG', value: '4.2x', detail: 'Accelerated onset of natural saccadic deceleration' }
    ],
    clinicalFinding: 'Stochastic vestibular stimulation activates otolith pathways, mimicking the gentle rocking motion of natural infancy and triggering rapid parasympathetic down-regulation.'
  },
  {
    num: '04',
    shortTitle: 'Wearable Visibility',
    question: 'What does the person wearing DUSQ actually see?',
    lead: 'With every leading commercial wearable running simultaneously in the lab, each study captures what shifts in the consumer apps our users already trust.',
    mechanics: 'When DUSQ actively attenuates surges, where do consumer readings shift? In which metrics, and by how much? By cross-referencing PSG truth with commercial algorithms, the research proves not only that DUSQ works biologically, but that the wearer will immediately observe the transformation on their own nightstand.',
    metrics: [
      { label: 'RECOVERY SCORE', value: '+38%', detail: 'Documented increase in commercial readiness scores' },
      { label: 'RESTING HEART RATE', value: '-4.6 bpm', detail: 'Lower nocturnal heart rate nadir' },
      { label: 'DEEP SLEEP MINUTES', value: '+28 min', detail: 'Average gain in restorative slow-wave duration' }
    ],
    clinicalFinding: 'Biological sleep stabilization translates directly into measurable improvements across commercial sleep trackers, validating real-world consumer efficacy.'
  }
];

export function SleepLabResearchConsole() {
  const sectionRef = useReveal<HTMLElement>();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const activeQ = QUESTIONS[selectedIdx];

  return (
    <section id="research-console" className="sleep-lab-section sleep-lab-research" ref={sectionRef}>
      <div className="sleep-lab-container">
        {/* Editorial Section Header */}
        <div className="section-header-editorial rv">
          <div className="section-eyebrow-chip">
            <IconMicroscope size={14} stroke={1.75} aria-hidden="true" />
            <span>ACTIVE EXPERIMENTATION</span>
          </div>
          <h2 className="section-title-editorial">
            How the research actually runs.
          </h2>
          <p className="section-sub-editorial">
            The research team monitors active studies from a separate analysis suite with direct
            sightlines into every sleep room. No disturbance. No interruption. The record stays clean through the night.
          </p>
        </div>

        {/* Master Framed Visual: Research Control Room */}
        <div className="sleep-lab-visual-frame-block rv rv-d1">
          <div className="sleep-lab-image-container control-room-image-frame">
            <img
              src="/sleep-lab/research-control-room.png"
              alt="DUSQ sleep research control room with multi-screen telemetry monitoring stations and real-time EEG scoring"
              className="sleep-lab-framed-img"
              width="2280"
              height="1343"
              loading="eager"
              decoding="async"
            />
            <div className="image-caption-tag">
              <span className="caption-dot" aria-hidden="true" />
              <span className="caption-label">Central Telemetry Station</span>
              <span className="caption-divider" aria-hidden="true">&middot;</span>
              <span className="caption-val">Real-Time 30-Second Epoch Scoring &middot; Remote Biometric Streams &middot; Zero Disturbance</span>
            </div>
          </div>
        </div>

        {/* Subhead for the 4 Questions */}
        <div className="research-lead-row rv rv-d2">
          <p className="research-lead-text">
            Each overnight study is designed to answer four questions, each building on the one before it:
          </p>
        </div>

        {/* The 4-Question Interactive Research Console */}
        <div className="research-questions-console rv rv-d3">
          {/* Top Question Switcher Tabs */}
          <div className="questions-nav-tabs" role="tablist" aria-label="Research questions">
            {QUESTIONS.map((q, idx) => (
              <button
                key={q.num}
                type="button"
                role="tab"
                aria-selected={selectedIdx === idx}
                className={`question-tab-btn ${selectedIdx === idx ? 'is-active' : ''}`}
                onClick={() => setSelectedIdx(idx)}
              >
                <span className="tab-q-num">Q{q.num}</span>
                <span className="tab-q-label">{q.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Active Question Investigation Panel */}
          <div className="question-stage-panel" role="tabpanel">
            <div className="stage-panel-header">
              <div className="stage-q-badge">
                <span>QUESTION {activeQ.num} OF 04</span>
              </div>
              <h3 className="stage-q-title">{activeQ.question}</h3>
              <p className="stage-q-lead">{activeQ.lead}</p>
            </div>

            {/* Mechanics Explanation */}
            <div className="stage-q-mechanics">
              <h4 className="mechanics-subtitle">TESTING PROTOCOL &amp; TELEMETRY ANALYSIS</h4>
              <p className="mechanics-body">{activeQ.mechanics}</p>
            </div>

            {/* Validated Metrics Row */}
            <div className="stage-q-metrics-row">
              {activeQ.metrics.map((m, i) => (
                <div key={i} className="stage-metric-box">
                  <span className="stage-metric-label">{m.label}</span>
                  <strong className="stage-metric-val">{m.value}</strong>
                  <span className="stage-metric-detail">{m.detail}</span>
                </div>
              ))}
            </div>

            {/* Clinical Finding Callout Bar */}
            <div className="stage-finding-strip">
              <div className="finding-icon-wrap">
                <IconCheck size={18} stroke={2} />
              </div>
              <div className="finding-text-wrap">
                <strong>LAB FINDING:</strong> {activeQ.clinicalFinding}
              </div>
            </div>
          </div>
        </div>

        {/* Closing Affirmation Strip */}
        <div className="sleep-lab-affirmation-strip rv rv-d4">
          <p className="affirmation-text">
            Detection validated. Suppression validated. Readiness tracked.
            Each layer of the product earned its place in this room before it shipped.
          </p>
        </div>
      </div>
    </section>
  );
}
