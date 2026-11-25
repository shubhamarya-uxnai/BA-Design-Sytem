import React, { useRef, useState } from 'react';
import { IconWaveSine, IconPlayerPlay, IconPlayerPause, IconRipple, IconBrain } from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

export function NeuromodulationSection() {
  const sectionRef = useReveal<HTMLElement>();
  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isPlaying2, setIsPlaying2] = useState(true);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const toggleVideo1 = () => {
    if (!video1Ref.current) return;
    if (video1Ref.current.paused) {
      video1Ref.current.play();
      setIsPlaying1(true);
    } else {
      video1Ref.current.pause();
      setIsPlaying1(false);
    }
  };

  const toggleVideo2 = () => {
    if (!video2Ref.current) return;
    if (video2Ref.current.paused) {
      video2Ref.current.play();
      setIsPlaying2(true);
    } else {
      video2Ref.current.pause();
      setIsPlaying2(false);
    }
  };

  return (
    <section id="neuromodulation" className="science-section neuromodulation-section" ref={sectionRef}>
      <div className="science-section-header rv">
        <div className="science-section-tag">
          <IconWaveSine size={14} stroke={1.75} aria-hidden="true" />
          <span>Intervention · Dual Neuromodulation</span>
        </div>
        <h2 className="science-section-title">We can read the system. Now, can we move it?</h2>
        <p className="science-section-lead">
          Reading sleep breaks is only half the breakthrough. DUSQ actively shifts the
          autonomic nervous system back into parasympathetic equilibrium using two gentle,
          non-invasive neuromodulation mechanisms inspired by evolutionary biology.
        </p>
      </div>

      {/* Dual Video Cards Grid */}
      <div className="neuromod-cards-grid rv rv-d1">
        {/* Pathway 1: Stochastic Vestibular Stimulation */}
        <article className="neuromod-card">
          <div className="neuromod-media-container">
            <video
              ref={video1Ref}
              src="/science/vestibular-nvens.mp4"
              className="neuromod-video"
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Simulation of gentle stochastic vestibular stimulation entraining delta brainwaves"
            />
            <button
              type="button"
              className="neuromod-video-control"
              onClick={toggleVideo1}
              aria-label={isPlaying1 ? 'Pause vestibular stimulation video' : 'Play vestibular stimulation video'}
            >
              {isPlaying1 ? (
                <IconPlayerPause size={16} stroke={1.75} aria-hidden="true" />
              ) : (
                <IconPlayerPlay size={16} stroke={1.75} aria-hidden="true" />
              )}
            </button>
            <div className="neuromod-media-badge">
              <IconRipple size={14} stroke={1.75} aria-hidden="true" />
              <span>Otolith Synchrony</span>
            </div>
          </div>

          <div className="neuromod-content">
            <span className="neuromod-pathway-num">Pathway 01 · Vestibular Entrainment</span>
            <h3 className="neuromod-title">Stochastic Vestibular Stimulation (nVEnS)</h3>
            <p className="neuromod-desc">
              Why do infants fall asleep when gently rocked? Why do adults drift off on rhythmic
              train rides? Gentle sub-threshold vestibular stimulation activates otolith organs
              in the inner ear, entraining slow-wave delta rhythms in the thalamocortical network
              and quieting bedtime hyperarousal.
            </p>
            <div className="neuromod-specs">
              <span className="neuromod-spec-chip">Sub-sensory 0.25–1.0 Hz motion cues</span>
              <span className="neuromod-spec-chip">Accelerates Stage 3 deep sleep onset</span>
            </div>
          </div>
        </article>

        {/* Pathway 2: Auricular Vagus Nerve Stimulation */}
        <article className="neuromod-card">
          <div className="neuromod-media-container">
            <video
              ref={video2Ref}
              src="/science/vagal-nvns.mp4"
              className="neuromod-video"
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Simulation of non-invasive auricular vagus nerve stimulation activating the nucleus tractus solitarii"
            />
            <button
              type="button"
              className="neuromod-video-control"
              onClick={toggleVideo2}
              aria-label={isPlaying2 ? 'Pause vagus stimulation video' : 'Play vagus stimulation video'}
            >
              {isPlaying2 ? (
                <IconPlayerPause size={16} stroke={1.75} aria-hidden="true" />
              ) : (
                <IconPlayerPlay size={16} stroke={1.75} aria-hidden="true" />
              )}
            </button>
            <div className="neuromod-media-badge">
              <IconBrain size={14} stroke={1.75} aria-hidden="true" />
              <span>Brainstem Gateway</span>
            </div>
          </div>

          <div className="neuromod-content">
            <span className="neuromod-pathway-num">Pathway 02 · Vagal Parasympathetic Tone</span>
            <h3 className="neuromod-title">Non-Invasive Vagus Nerve Stimulation (nVNS)</h3>
            <p className="neuromod-desc">
              The Auricular Branch of the Vagus Nerve (ABVN) surfaces behind the ear. DUSQ
              delivers gentle, imperceptible micro-currents that ascend through the vagus nerve
              directly to the nucleus tractus solitarii (NTS) in the brainstem, immediately
              dampening sympathetic overdrive and activating parasympathetic recovery.
            </p>
            <div className="neuromod-specs">
              <span className="neuromod-spec-chip">Direct brainstem autonomic modulation</span>
              <span className="neuromod-spec-chip">Suppresses nocturnal heart-rate spikes</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
