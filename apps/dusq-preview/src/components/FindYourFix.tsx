import { useState } from 'react';
import { IconWaveSine } from '@tabler/icons-react';
import { problems } from '../content';
import { useReveal } from '../hooks/useReveal';
import { PillButton } from './PillButton';

export function FindYourFix() {
  const [selected, setSelected] = useState(0);
  const sectionRef = useReveal<HTMLElement>();
  const item = problems[selected];

  return (
    <section className="find-section" id="find-your-fix" ref={sectionRef}>
      <div className="find-inner">
        {/* Header with plenty of free breathing room */}
        <div className="find-heading rv">
          <span className="eyebrow">Find your fix</span>
          <h2 className="va-text-heading-large">
            <span className="heading-icon-slot" data-slot="find-your-fix-icon" aria-hidden="true">
              <IconWaveSine size={22} stroke={1.75} />
            </span>
            <span className="heading-text">What is your biggest sleep problem?</span>
          </h2>
          <p className="va-text-body-medium">
            In today's world, sleep disruption is a nervous system issue rather than a routine failure.
          </p>
        </div>

        {/* Minimalist, Open Problem Selector (No Chunky Boxed Borders) */}
        <div className="fix-tabs rv rv-d1" role="tablist" aria-label="Sleep problem tabs">
          {problems.map((p, i) => (
            <button
              key={p.label}
              id={`fix-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-controls="fix-panel"
              className={selected === i ? 'is-active' : ''}
              onClick={() => setSelected(i)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Open, Borderless Editorial Panel (No Nested Card Boxes) */}
        <div
          className="fix-open-layout rv rv-d2"
          id="fix-panel"
          role="tabpanel"
          aria-labelledby={`fix-tab-${selected}`}
        >
          <div className="fix-open-grid" key={selected}>
            {/* Left: Why this happens */}
            <div className="fix-open-col">
              <span className="eyebrow">Why this happens</span>
              <p className="fix-open-text">{item.why}</p>
            </div>

            {/* Right: How DUSQ was designed for it */}
            <div className="fix-open-col">
              <span className="eyebrow">How DUSQ was designed for it</span>
              <p className="fix-open-text">{item.response}</p>
              <div className="fix-open-process">
                <span>Detect</span>
                <span className="process-sep">→</span>
                <span>Intervene</span>
                <span className="process-sep">→</span>
                <span>Stabilise</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean PillButton */}
        <div className="find-cta rv rv-d3">
          <PillButton href="#how-it-works">See how it works</PillButton>
        </div>
      </div>
    </section>
  );
}
