import React, { useState } from 'react';
import { TEXT_STYLES, FONT_FAMILIES } from '../../data/typography';
import {
  IconCheck,
  IconCopy,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconRefresh,
} from '@tabler/icons-react';

export function TypographyStory() {
  const [scaleMode, setScaleMode] = useState<'desktop' | 'mobile'>('desktop');
  const [customText, setCustomText] = useState('');
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyClass = async (className: string) => {
    await navigator.clipboard?.writeText(className);
    setCopiedKey(className);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const groups = ['all', 'Title', 'Heading', 'Body', 'Label', 'Legend'];

  const filteredStyles = activeGroup === 'all'
    ? TEXT_STYLES
    : TEXT_STYLES.filter(s => s.group === activeGroup);

  return (
    <div className="typography-story">
      <div className="story-intro-hero">
        <div className="story-intro-copy">
          <span className="story-category-eyebrow">FOUNDATIONS / TYPOGRAPHY</span>
          <h1 className="story-main-heading">Typography & 21 Text Styles</h1>
          <p className="story-summary-text">
            The DUSQ typographic system employs a tripartite hierarchy: <strong>Plus Jakarta Sans</strong> for
            expressive display titles, <strong>Helvetica Neue</strong> for authoritative section headings, and{' '}
            <strong>Arial</strong> for restrained body copy and microcopy, defined across 21 responsive styles.
          </p>
        </div>

        <div className="typography-scale-toggle">
          <span className="scale-label">Breakpoint Scale:</span>
          <div className="scale-buttons">
            <button
              type="button"
              className={`scale-btn ${scaleMode === 'desktop' ? 'is-active' : ''}`}
              onClick={() => setScaleMode('desktop')}
            >
              <IconDeviceDesktop size={15} stroke={1.75} />
              <span>Desktop Scale (&gt;768px)</span>
            </button>
            <button
              type="button"
              className={`scale-btn ${scaleMode === 'mobile' ? 'is-active' : ''}`}
              onClick={() => setScaleMode('mobile')}
            >
              <IconDeviceMobile size={15} stroke={1.75} />
              <span>Mobile Scale (≤768px)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Font Family Cards */}
      <section className="font-families-section">
        <div className="section-title-wrap">
          <h2 className="palette-section-title">Tripartite Font Family Hierarchy</h2>
          <p className="palette-section-desc">
            DUSQ reserves distinct font families for specific cognitive roles in the interface.
          </p>
        </div>

        <div className="font-family-cards-grid">
          {FONT_FAMILIES.map(family => (
            <div key={family.role} className="font-family-card">
              <div className="family-badge">{family.role}</div>
              <h3 className="family-name" style={{ fontFamily: family.cssFamily }}>
                {family.name}
              </h3>
              <div className="family-spec">
                <span>Weights: <code>{family.weights}</code></span>
                <span>Family: <code>{family.cssFamily}</code></span>
              </div>
              <p className="family-usage">{family.usage}</p>
              <div className="family-preview-alphabet" style={{ fontFamily: family.cssFamily }}>
                Aa Bb Cc Dd Ee Ff Gg Hh 0123456789 &amp; @ #
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Text Customizer */}
      <section className="typography-customizer-section">
        <div className="customizer-bar">
          <span className="customizer-label">Live Text Sandbox:</span>
          <input
            type="text"
            className="customizer-input"
            placeholder="Type custom preview text to test all 21 text styles..."
            value={customText}
            onChange={e => setCustomText(e.target.value)}
          />
          {customText && (
            <button
              type="button"
              className="reset-text-btn"
              onClick={() => setCustomText('')}
              title="Reset to default samples"
            >
              <IconRefresh size={14} stroke={1.75} />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="typography-filter-tabs">
          {groups.map(group => (
            <button
              key={group}
              type="button"
              className={`group-filter-tab ${activeGroup === group ? 'is-active' : ''}`}
              onClick={() => setActiveGroup(group)}
            >
              {group === 'all' ? 'All 21 Styles' : `${group} (${TEXT_STYLES.filter(s => s.group === group).length})`}
            </button>
          ))}
        </div>
      </section>

      {/* 21 Text Styles Showcase */}
      <section className="text-styles-list-section">
        <div className="text-styles-list">
          {filteredStyles.map(spec => {
            const currentSize = scaleMode === 'desktop' ? spec.desktopSize : spec.mobileSize;
            const isCopied = copiedKey === spec.className;
            const displayText = customText || spec.sample;

            return (
              <div key={spec.id} className="text-style-row-card">
                <div className="text-style-meta">
                  <div className="style-name-row">
                    <span className="style-name">{spec.name}</span>
                    <button
                      type="button"
                      className={`class-copy-pill ${isCopied ? 'is-copied' : ''}`}
                      onClick={() => copyClass(spec.className)}
                      title="Copy CSS class name"
                    >
                      {isCopied ? <IconCheck size={12} stroke={2} /> : <IconCopy size={12} stroke={1.75} />}
                      <span>.{spec.className}</span>
                    </button>
                  </div>

                  <div className="style-specs-pills">
                    <span className="spec-pill font-pill">{spec.fontFamilyName}</span>
                    <span className="spec-pill size-pill">
                      Size: <strong>{currentSize}</strong>
                      {spec.desktopSize !== spec.mobileSize && (
                        <small> ({scaleMode === 'desktop' ? `Mobile: ${spec.mobileSize}` : `Desktop: ${spec.desktopSize}`})</small>
                      )}
                    </span>
                    <span className="spec-pill lh-pill">Line-height: {spec.lineHeight}</span>
                    <span className="spec-pill weight-pill">Weight: {spec.weight}</span>
                  </div>

                  <p className="style-usage-notes">{spec.usageNotes}</p>
                </div>

                <div className="text-style-preview-area">
                  <div
                    className={`${spec.className} preview-render-box`}
                    style={{
                      fontFamily: spec.fontFamily,
                      fontSize: currentSize,
                      lineHeight: spec.lineHeight,
                      fontWeight: spec.weight,
                      fontStyle: spec.italic ? 'italic' : 'normal',
                    }}
                  >
                    {displayText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
