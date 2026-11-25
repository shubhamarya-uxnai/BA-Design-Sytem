import { IconBrandLinkedin } from '@tabler/icons-react';
import { useReveal } from '../hooks/useReveal';

export function MeetTeam() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section className="team-section" id="team" ref={sectionRef}>
      <div className="team-background-slot" data-slot="team-background" aria-hidden="true" />
      <div className="team-inner">
        <div className="team-copy rv">
          <div className="team-eyebrow-pill">
            <span className="team-eyebrow-dot" aria-hidden="true" />
            <span className="team-eyebrow-text">Meet the Founder · Clinical Perspective</span>
          </div>

          <h2 className="team-heading">
            DUSQ began where other sleep solutions stopped.
          </h2>

          <div className="team-beats">
            {/* Beat 1: Warm paper lead (clinical origin & health challenge) */}
            <p className="team-beat team-beat-lead">
              Dr Siddhant Bhargava began building DUSQ after confronting acute autonomic disruption, discovering firsthand that clinical sleep medicine stopped at passive observation without providing active relief.
            </p>

            {/* Beat 2: Muted sandstone support (clinical gap of passive tracking) */}
            <p className="team-beat team-beat-support">
              Conventional wearables and rings catalog sleep architecture the morning after, but passive telemetry cannot prevent a sympathetic surge while you are in bed.
            </p>

            {/* Beat 3: Amber turning point (DUSQ autonomous intervention) */}
            <p className="team-beat team-beat-turn">
              <strong className="team-beat-highlight">Autonomous intervention:</strong> We engineered DUSQ as a real-time closed loop—detecting sympathetic micro-arousals at the ear and autonomously delivering targeted neuro-vestibular modulation to stabilize deep sleep before it fragments.
            </p>
          </div>

          <blockquote className="team-quote">
            “I didn't trust that passive tracking solved the problem. We built DUSQ to intervene when sleep actually breaks.”
          </blockquote>
        </div>

        <div className="team-portrait-wrapper rv rv-d1">
          <div className="founder-portrait-card">
            <img
              src="/founder/dr-siddhant-bhargava.webp"
              alt="Dr Siddhant Bhargava, Founder &amp; CEO of DUSQ"
              className="founder-portrait-img"
              loading="lazy"
              decoding="async"
            />
            <div className="founder-caption-rail">
              <div className="founder-caption-meta">
                <span className="founder-name">Dr Siddhant Bhargava</span>
                <span className="founder-rail-sep" aria-hidden="true">·</span>
                <span className="founder-role">Founder &amp; CEO, DUSQ</span>
              </div>
              <a
                className="founder-linkedin-btn"
                href="https://www.linkedin.com/in/dr-siddhant-bhargava"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dr Siddhant Bhargava on LinkedIn"
              >
                <IconBrandLinkedin size={18} stroke={1.75} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
