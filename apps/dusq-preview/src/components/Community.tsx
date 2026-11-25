import { useState, useEffect, useRef } from 'react';
import { IconArrowRight, IconStarFilled, IconCheck } from '@tabler/icons-react';
import { useReveal } from '../hooks/useReveal';

interface CommunityStory {
  id: string;
  name: string;
  location: string;
  problem: string;
  quote: string;
  src: string;
  pos: string;
}

const COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: 'matt',
    name: 'Matt S.',
    location: 'Phoenix, Arizona',
    problem: 'Years of sleep breaking at 2 AM',
    quote:
      'I used to wake up at 2 AM like clockwork with my heart pounding. DUSQ’s behind-ear sensors detect the sympathetic spike and quiet my vagal tone before I even open my eyes. I haven’t had a broken night in four months.',
    src: '/community/member-1.webp',
    pos: '50% 20%',
  },
  {
    id: 'sam',
    name: 'Sam T.',
    location: 'Austin, Texas',
    problem: 'Trouble falling asleep on time',
    quote:
      'Falling asleep used to take 90 minutes of endless mental racing. The gentle evening vagus cadence downshifts my overstimulated nervous system within 15 minutes. It’s like an off-switch for work stress.',
    src: '/community/member-2.webp',
    pos: '50% 22%',
  },
  {
    id: 'blair',
    name: 'Blair R.',
    location: 'Seattle, Washington',
    problem: 'Not getting enough deep sleep',
    quote:
      'My sleep rings always told me I only had 35 minutes of deep sleep. With DUSQ, my delta slow-wave sleep jumped to 1 hour 25 minutes. Waking up actually clear-headed has completely transformed my mornings.',
    src: '/community/member-3.webp',
    pos: '48% 22%',
  },
  {
    id: 'elena',
    name: 'Dr. Elena K.',
    location: 'Boston, Massachusetts',
    problem: 'Stress-induced nocturnal awakenings',
    quote:
      'As a physician working erratic shift hours, my circadian rhythm was shattered. DUSQ is the first wearable that actively protects sleep architecture rather than passively recording poor nights.',
    src: '/community/member-4.webp',
    pos: '50% 16%',
  },
  {
    id: 'marcus',
    name: 'Marcus D.',
    location: 'Denver, Colorado',
    problem: 'Shallow fragmented sleep cycles',
    quote:
      'I thought I was just getting older and light sleep was inevitable. Wearing DUSQ behind the ear is completely weightless and my physical recovery scores are back to where they were ten years ago.',
    src: '/community/member-5.webp',
    pos: '50% 28%',
  },
  {
    id: 'chloe',
    name: 'Chloe V.',
    location: 'San Francisco, California',
    problem: 'Work burnout and nervous exhaustion',
    quote:
      'The biggest difference is morning clarity. No grogginess, no racing cortisol at 4 AM. DUSQ stabilizes my nervous system while I sleep so I wake up genuinely calm and restored.',
    src: '/community/member-6.webp',
    pos: '50% 22%',
  },
  {
    id: 'david',
    name: 'David W.',
    location: 'Chicago, Illinois',
    problem: 'Autonomic nighttime micro-arousals',
    quote:
      'Zero in-ear occlusion and zero phone EMF in the bedroom were huge for me. The closed-loop stimulation works quietly on-device all night long. The best sleep investment I have ever made.',
    src: '/community/member-7.jpg',
    pos: '50% 32%',
  },
  {
    id: 'sarah',
    name: 'Sarah M.',
    location: 'New York, New York',
    problem: 'Chronic evening sleep resistance',
    quote:
      'Within two weeks of using DUSQ, my body relearned how to sleep deeply. It turns off the midnight anxiety loop and restores restorative deep sleep naturally.',
    src: '/community/member-8.webp',
    pos: '50% 18%',
  },
];

export function Community() {
  const [page, setPage] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const sectionRef = useReveal<HTMLElement>();

  const handleCardEnter = (idx: number) => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setHoveredIdx(idx);
    }, 55);
  };

  const handleRowLeave = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setHoveredIdx(null);
    }, 60);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setPage((p) => (p + 1) % 2), 9000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const currentStories = COMMUNITY_STORIES.slice(page * 4, page * 4 + 4);

  return (
    <section
      className="community-section"
      id="community"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        handleRowLeave();
      }}
    >
      <div className="community-heading rv">
        <span className="eyebrow">Real lives, unbroken nights</span>
        <h2 className="va-text-heading-large">
          <span className="accent">Thousands</span> of people are sleeping through the night with DUSQ.
        </h2>
        <p className="community-subtitle">
          Hover over any member to read their verified sleep journey.
        </p>
      </div>

      {/* M3 Multi-browse Accordion Row: Bounded container width with synchronized flex-grow interpolation */}
      <div
        className="community-push-row rv rv-d1"
        onMouseLeave={handleRowLeave}
      >
        {currentStories.map((story, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <div
              className={`community-push-item ${isHovered ? 'is-expanded' : ''}`}
              key={story.id}
              onMouseEnter={() => handleCardEnter(i)}
              onClick={() => setHoveredIdx(isHovered ? null : i)}
              tabIndex={0}
              onFocus={() => setHoveredIdx(i)}
              onBlur={() => setHoveredIdx(null)}
            >
              {/* Stable Photo Frame */}
              <div className="community-push-photo">
                <img
                  src={story.src}
                  alt={`${story.name}, DUSQ customer`}
                  style={{ objectPosition: story.pos }}
                  loading="eager"
                  decoding="async"
                />
                <div className="community-push-chip" aria-hidden={isHovered}>
                  <strong>{story.name}</strong>
                  <span>{story.location}</span>
                </div>
              </div>

              {/* Details panel reveals smoothly via synchronized flex-grow + opacity */}
              <div className="community-push-details" aria-hidden={!isHovered}>
                <div className="community-push-details-inner">
                  <div className="community-push-stars">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <IconStarFilled key={sIdx} size={13} color="#DF6738" />
                    ))}
                    <span className="community-push-verified">
                      <IconCheck size={11} stroke={3} /> Verified
                    </span>
                  </div>
                  <strong className="community-push-name">{story.name}</strong>
                  <span className="community-push-loc">{story.location}</span>
                  <div className="community-push-problem">{story.problem}</div>
                  <p className="community-push-quote">“{story.quote}”</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="carousel-controls rv rv-d2" aria-label="Community carousel pages">
        <span>0{page + 1} / 02</span>
        <div className="carousel-steps">
          {[0, 1].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show community page ${i + 1}`}
              aria-current={page === i ? 'page' : undefined}
              onClick={() => setPage(i)}
            >
              <span className="progress-fill" />
            </button>
          ))}
        </div>
        <button
          className="carousel-next"
          type="button"
          aria-label="Next community page"
          onClick={() => setPage((page + 1) % 2)}
        >
          <IconArrowRight size={16} stroke={1.75} />
        </button>
      </div>
    </section>
  );
}
