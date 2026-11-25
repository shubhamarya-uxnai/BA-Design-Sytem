import React from 'react';
import { IconCpu, IconHourglassEmpty, IconRepeat, IconInfinity, IconQuote } from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';

export function SleepLabWhyBuilt() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="why-built" className="sleep-lab-section sleep-lab-why-built" ref={sectionRef}>
      <div className="sleep-lab-container">
        {/* Editorial Section Header */}
        <div className="section-header-editorial rv">
          <div className="section-eyebrow-chip">
            <IconCpu size={14} stroke={1.75} aria-hidden="true" />
            <span>ORIGIN &middot; RESEARCH VELOCITY</span>
          </div>
          <h2 className="section-title-editorial">
            Why we built our own lab.
          </h2>
          <p className="section-sub-editorial">
            The original plan was a schedule of external commissions. What it could not account for was pace.
          </p>
        </div>

        {/* Narrative Columns (Two-column editorial essay layout) */}
        <div className="editorial-essay-grid rv rv-d1">
          <div className="essay-col">
            <p className="essay-para lead-para">
              External research introduces variables that cannot be controlled: different equipment,
              different environments, different subject populations, different timelines. Each study
              answers a single question in isolation.
            </p>
            <p className="essay-para">
              But the questions were compounding faster than any external academic study could answer them.
              Every answer generated three more. The gap between what the product needed to know and
              what any individual outsourced study could tell us kept widening, and a product built on
              a claim as specific as ours could not afford that gap.
            </p>
          </div>

          <div className="essay-col">
            <p className="essay-para">
              The claim is this: gentle, targeted nerve stimulation, delivered at the right moment
              before and during sleep, changes how the body recovers through the night. Testing whether
              that holds, across every iteration of the sensor and every refinement of the protocol,
              requires infrastructure.
            </p>
            <p className="essay-para highlight-para">
              A permanent, embedded research environment that could answer questions as fast as they
              were being asked. Not as a credential to point to, but as a requirement for building the product at all.
            </p>
          </div>
        </div>

        {/* Primary Unboxed Editorial Callout Quote */}
        <div className="sleep-lab-quote-unboxed rv rv-d2">
          <div className="quote-mark-icon" aria-hidden="true">
            <IconQuote size={32} stroke={1.5} />
          </div>
          <blockquote className="quote-text-editorial">
            &ldquo;You cannot build a product on the science of sleep by visiting that science occasionally.
            You have to be embedded in it.&rdquo;
          </blockquote>
          <cite className="quote-author-editorial">
            &mdash; Dr. Siddhant Bhargava, CEO &amp; Founder, DUSQ
          </cite>
        </div>

        {/* 3 Infrastructure Pillars (Unboxed minimal comparative cards) */}
        <div className="infrastructure-pillars-strip rv rv-d3">
          <div className="infra-pillar-item">
            <div className="infra-pillar-icon-box">
              <IconHourglassEmpty size={20} stroke={1.75} />
            </div>
            <div className="infra-pillar-content">
              <span className="infra-pillar-tag">QUESTION VELOCITY</span>
              <h3 className="infra-pillar-title">24-Hour Closed Loop</h3>
              <p className="infra-pillar-desc">
                Traditional sleep studies take 9&ndash;14 months to commission, conduct, and score.
                An in-house lab allows nightly hypotheses testing, algorithm refinement, and instant feedback.
              </p>
            </div>
          </div>

          <div className="infra-pillar-item">
            <div className="infra-pillar-icon-box">
              <IconRepeat size={20} stroke={1.75} />
            </div>
            <div className="infra-pillar-content">
              <span className="infra-pillar-tag">FIRMWARE IN THE LOOP</span>
              <h3 className="infra-pillar-title">Hardware Validation</h3>
              <p className="infra-pillar-desc">
                Every patch adhesive formulation, electrode geometry, and digital filter on the
                postauricular EDA sensor is physically validated on living sleepers before code deployment.
              </p>
            </div>
          </div>

          <div className="infra-pillar-item">
            <div className="infra-pillar-icon-box">
              <IconInfinity size={20} stroke={1.75} />
            </div>
            <div className="infra-pillar-content">
              <span className="infra-pillar-tag">ZERO DISTURBANCE</span>
              <h3 className="infra-pillar-title">Embedded Infrastructure</h3>
              <p className="infra-pillar-desc">
                Over 1,200 continuous polysomnography nights completed across varied chronotypes,
                insomnia profiles, and autonomic stress states without external dependency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
