import { useState } from 'react';
import { IconPlus, IconArrowUpRight, IconShieldCheck } from '@tabler/icons-react';
import { useReveal } from '../hooks/useReveal';

interface FaqItem {
  id: string;
  tag: string;
  question: string;
  answer: string;
  metricBadge: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'results-timeline',
    tag: 'CLINICAL TIMELINE',
    question: 'How long until I start seeing measurable sleep results?',
    answer:
      'Most members experience a noticeable calmer evening transition within the first 3 to 5 nights as vagal tone stabilizes. In our 42-night polysomnography study, cumulative deep slow-wave (delta) sleep increased by +34% and nocturnal awakenings dropped by 26% over the first two weeks.',
    metricBadge: '+34% Deep Sleep Gain · 14-Day Trial Benchmark',
  },
  {
    id: 'sleep-comfort',
    tag: 'ERGONOMICS & FIT',
    question: 'Can I actually sleep in it comfortably on my side or stomach?',
    answer:
      'Yes. At just 12 grams, DUSQ One sits flush in the natural postauricular hollow behind the ear (over the mastoid process). Because its medical-grade silicone profile is thinner than the outer pinna cartilage, your pillow rests against your ear rather than the device—even for dedicated side and stomach sleepers.',
    metricBadge: '12g Featherweight Profile · Zero Cartilage Pressure',
  },
  {
    id: 'stimulation-feel',
    tag: 'NEUROMODULATION',
    question: 'What does the closed-loop stimulation feel like during the night?',
    answer:
      'During your 15-minute evening wind-down, you may notice a barely perceptible, rhythmic micro-warmth or gentle pulsing behind the ear. Once you enter sleep, DUSQ automatically scales output into a strictly sub-sensory regime—suppressing sympathetic 3 AM micro-arousals without ever crossing your conscious sensory threshold.',
    metricBadge: '0 dB Acoustic Output · Sub-Sensory Nocturnal Mode',
  },
  {
    id: 'phone-emf',
    tag: 'ON-DEVICE AUTONOMY',
    question: 'Do I need my phone nearby or Bluetooth active overnight?',
    answer:
      'No. DUSQ executes its entire 50Hz EDA + PPG biosensing and closed-loop intervention algorithm locally on its onboard edge processor. Bluetooth radios remain completely powered off while you sleep (0 mW nocturnal EMF), and your overnight sleep architecture syncs when you dock the device in the morning.',
    metricBadge: '0 mW Bedroom EMF · 100% On-Device Edge Loop',
  },
  {
    id: 'cpap-earbuds',
    tag: 'COMPATIBILITY',
    question: 'Can I use DUSQ alongside a CPAP mask, nightguard, or sleep earbuds?',
    answer:
      'Yes. Because DUSQ uses zero in-ear components and zero overhead straps, it leaves the ear canal completely open for acoustic earplugs or earbuds and avoids standard nasal/full-face CPAP headgear routing.',
    metricBadge: 'Zero In-Ear Occlusion · CPAP & Earbud Compatible',
  },
  {
    id: 'recurring-cost',
    tag: 'OWNERSHIP & REFILLS',
    question: 'Is there a mandatory monthly subscription after purchase?',
    answer:
      'Never for core sleep intervention. Your DUSQ One suite includes the wearable, billet-aluminum charging dock, a 3-month supply of biocompatible hydrogel sleep links (45 pairs), and 1 year of companion app access. Replacement hydrogel link packs ($29/month) can be paused or ordered on demand.',
    metricBadge: 'Zero Mandatory App Lock-In · 3-Month Links Included',
  },
  {
    id: 'trial-return',
    tag: 'RISK-FREE TRIAL',
    question: 'What if DUSQ does not improve my sleep architecture?',
    answer:
      'Every DUSQ One system is backed by a 30-night in-home clinical trial from the date of delivery. If you do not experience deeper, more continuous rest, return the hardware kit within 30 days for a full refund with free return shipping.',
    metricBadge: '30-Night In-Home Trial · Full Refund Guarantee',
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const sectionRef = useReveal<HTMLElement>();

  const toggleItem = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <div className="faq-wrap">
        <div className="faq-editorial-grid">
          {/* Left Column: Editorial Masthead & Clinical Support Card */}
          <div className="faq-left-col rv">
            <div className="faq-eyebrow-pill">
              <span className="faq-eyebrow-dot" aria-hidden="true" />
              <span>Questions, Answered · Clinical &amp; Hardware</span>
            </div>

            <h2 className="faq-headline">
              Everything you need to know before your first night.
            </h2>

            <p className="faq-subhead">
              From sub-sensory postauricular stimulation to phone-free overnight autonomy—clear answers from our clinical engineering team.
            </p>

            <div className="faq-concierge-card">
              <div className="faq-concierge-badge">
                <IconShieldCheck size={16} stroke={2} color="#DF6738" />
                <span>CLINICAL SLEEP CONCIERGE</span>
              </div>
              <p className="faq-concierge-text">
                Have a specific question about autonomic arousals, shift-work schedules, or clinical PSG data?
              </p>
              <a href="mailto:clinical@dusq.com" className="faq-concierge-link">
                <span>Ask our sleep specialists</span>
                <IconArrowUpRight size={15} stroke={2.2} />
              </a>
            </div>
          </div>

          {/* Right Column: Smooth Animated Editorial Accordion */}
          <div className="faq-accordion-col rv rv-d1" role="region" aria-label="Frequently Asked Questions">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIdx === idx;
              const panelId = `faq-panel-${item.id}`;
              const btnId = `faq-btn-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`faq-card-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    id={btnId}
                    type="button"
                    className="faq-card-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(idx)}
                  >
                    <span className="faq-item-num">0{idx + 1}</span>
                    <div className="faq-trigger-main">
                      <span className="faq-item-tag">{item.tag}</span>
                      <span className="faq-item-question">{item.question}</span>
                    </div>
                    <span className="faq-trigger-icon" aria-hidden="true">
                      <IconPlus size={16} stroke={2} />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="faq-card-collapse"
                    aria-hidden={!isOpen}
                  >
                    <div className="faq-card-collapse-inner">
                      <div className="faq-answer-body">
                        <p className="faq-answer-text">{item.answer}</p>
                        <div className="faq-answer-badge">
                          <span className="faq-answer-badge-dot" aria-hidden="true" />
                          <span>{item.metricBadge}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
