import React from 'react';

interface PressLogo {
  name: string;
  src: string;
  fallback: string;
  width: number;
  height: number;
}

const PRESS_LOGOS: PressLogo[] = [
  {
    name: 'Business Insider',
    src: '/press/business-insider.png',
    fallback: '/press/business-insider.png',
    width: 138,
    height: 32,
  },
  {
    name: 'Digital Journal',
    src: '/press/digital-journal.png',
    fallback: '/press/digital-journal.png',
    width: 130,
    height: 32,
  },
  {
    name: 'Forbes',
    src: '/press/forbes.svg',
    fallback: '/press/forbes.png',
    width: 112,
    height: 30,
  },
  {
    name: 'The Economic Times',
    src: '/press/et.png',
    fallback: '/press/et.png',
    width: 96,
    height: 32,
  },
  {
    name: 'Apple News',
    src: '/press/apple-news.png',
    fallback: '/press/apple-news.png',
    width: 134,
    height: 30,
  },
];

export const BrandsTicker: React.FC = () => {
  return (
    <section className="brands-ticker-section" aria-label="Press and Media Features">
      <div className="brands-ticker-header">
        <span className="eyebrow brands-ticker-eyebrow">Featured &amp; covered in</span>
      </div>

      <div className="brands-ticker-viewport">
        <div className="brands-ticker-track">
          {/* Primary set read by screen readers */}
          <div className="brands-ticker-group">
            {PRESS_LOGOS.map((logo) => (
              <div key={logo.name} className="brands-ticker-item">
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== logo.fallback) {
                      target.src = logo.fallback;
                    }
                  }}
                  className="brands-ticker-logo"
                />
              </div>
            ))}
          </div>

          {/* Clones for seamless infinite scroll - hidden from screen readers */}
          <div className="brands-ticker-group" aria-hidden="true">
            {PRESS_LOGOS.map((logo, idx) => (
              <div key={`clone-1-${idx}`} className="brands-ticker-item">
                <img
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== logo.fallback) {
                      target.src = logo.fallback;
                    }
                  }}
                  className="brands-ticker-logo"
                />
              </div>
            ))}
          </div>

          <div className="brands-ticker-group" aria-hidden="true">
            {PRESS_LOGOS.map((logo, idx) => (
              <div key={`clone-2-${idx}`} className="brands-ticker-item">
                <img
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== logo.fallback) {
                      target.src = logo.fallback;
                    }
                  }}
                  className="brands-ticker-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
