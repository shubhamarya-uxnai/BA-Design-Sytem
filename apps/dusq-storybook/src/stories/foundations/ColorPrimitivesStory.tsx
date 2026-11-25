import React, { useState } from 'react';
import {
  WARM_NEUTRAL_LADDER,
  ORANGE_LADDER,
  STATUS_PALETTES,
  DUSQ_BRAND_ACCENT,
  type ColorToken,
} from '../../data/tokens';
import { IconCheck, IconCopy, IconSearch, IconSparkles } from '@tabler/icons-react';

export function ColorPrimitivesStory() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'neutral' | 'orange' | 'status'>('all');

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const getWcagBadge = (cWhite: number, cBlack: number) => {
    // Return WCAG rating for the higher contrast
    const maxC = Math.max(cWhite, cBlack);
    if (maxC >= 7) return <span className="wcag-badge wcag-aaa" title={`Contrast ${maxC}:1 - Passes WCAG AAA`}>AAA {maxC}:1</span>;
    if (maxC >= 4.5) return <span className="wcag-badge wcag-aa" title={`Contrast ${maxC}:1 - Passes WCAG AA`}>AA {maxC}:1</span>;
    if (maxC >= 3) return <span className="wcag-badge wcag-large" title={`Contrast ${maxC}:1 - Large text only`}>AA-L {maxC}:1</span>;
    return <span className="wcag-badge wcag-fail" title={`Contrast ${maxC}:1`}>{maxC}:1</span>;
  };

  const matchesFilter = (token: ColorToken) => {
    if (!filter) return true;
    const term = filter.toLowerCase();
    return (
      token.name.toLowerCase().includes(term) ||
      token.hex.toLowerCase().includes(term) ||
      token.cssVar.toLowerCase().includes(term) ||
      (token.role && token.role.toLowerCase().includes(term))
    );
  };

  const renderSwatchCard = (token: ColorToken) => {
    const isCopiedHex = copiedKey === `hex-${token.name}`;
    const isCopiedVar = copiedKey === `var-${token.name}`;

    return (
      <div
        key={token.name}
        className={`color-swatch-card ${token.isBrandAccent ? 'is-brand-accent' : ''}`}
      >
        <div
          className="swatch-preview"
          style={{ backgroundColor: `var(${token.cssVar}, ${token.hex})` }}
        >
          {token.isBrandAccent && (
            <span className="brand-accent-tag">
              <IconSparkles size={12} stroke={2} /> DUSQ Accent
            </span>
          )}
          <div className="swatch-contrast-bar">
            {getWcagBadge(token.cWhite, token.cBlack)}
          </div>
        </div>

        <div className="swatch-details">
          <div className="swatch-title-row">
            <span className="swatch-name">{token.name}</span>
            <span className="swatch-hex">{token.hex}</span>
          </div>

          {token.role && <p className="swatch-role">{token.role}</p>}

          <div className="swatch-copy-actions">
            <button
              type="button"
              className={`copy-btn ${isCopiedHex ? 'is-copied' : ''}`}
              onClick={() => copyToClipboard(token.hex, `hex-${token.name}`)}
              title="Copy HEX value"
            >
              {isCopiedHex ? <IconCheck size={12} stroke={2} /> : <IconCopy size={12} stroke={1.75} />}
              <span>{isCopiedHex ? 'HEX Copied' : 'Copy HEX'}</span>
            </button>
            <button
              type="button"
              className={`copy-btn copy-var-btn ${isCopiedVar ? 'is-copied' : ''}`}
              onClick={() => copyToClipboard(token.cssVar, `var-${token.name}`)}
              title="Copy CSS variable name"
            >
              {isCopiedVar ? <IconCheck size={12} stroke={2} /> : <IconCopy size={12} stroke={1.75} />}
              <span>{isCopiedVar ? 'Var Copied' : 'var()'}</span>
            </button>
          </div>

          <div className="swatch-contrast-ratios">
            <span>vs White: <strong>{token.cWhite}:1</strong></span>
            <span>vs Black: <strong>{token.cBlack}:1</strong></span>
          </div>
        </div>
      </div>
    );
  };

  const filteredNeutral = WARM_NEUTRAL_LADDER.filter(matchesFilter);
  const filteredOrange = [DUSQ_BRAND_ACCENT, ...ORANGE_LADDER].filter(matchesFilter);

  return (
    <div className="color-primitives-story">
      <div className="story-intro-hero">
        <div className="story-intro-copy">
          <span className="story-category-eyebrow">FOUNDATIONS / TOKENS</span>
          <h1 className="story-main-heading">Color Primitives & Warm Neutral Ladder</h1>
          <p className="story-summary-text">
            The core palette of the DUSQ Design System. Anchored by a 20-step Warm Neutral Ladder
            spanning from <code>#FAF8F5</code> (cream canvas) to <code>#111111</code> (deep night ink),
            the signature DUSQ Orange Accent <code>#F0650D</code>, and precise clinical status color ramps.
          </p>
        </div>

        <div className="palette-stats-card">
          <div className="stat-item">
            <span className="stat-num">20</span>
            <span className="stat-label">Warm Neutrals</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-item">
            <span className="stat-num">10</span>
            <span className="stat-label">Orange Steps</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-item">
            <span className="stat-num">#F0650D</span>
            <span className="stat-label">Primary Brand Accent</span>
          </div>
        </div>
      </div>

      <div className="palette-toolbar">
        <div className="palette-filter-tabs">
          <button
            type="button"
            className={`filter-tab ${activeTab === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Colors
          </button>
          <button
            type="button"
            className={`filter-tab ${activeTab === 'neutral' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('neutral')}
          >
            Warm Neutral Ladder ({WARM_NEUTRAL_LADDER.length})
          </button>
          <button
            type="button"
            className={`filter-tab ${activeTab === 'orange' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('orange')}
          >
            Orange & Accent ({ORANGE_LADDER.length + 1})
          </button>
          <button
            type="button"
            className={`filter-tab ${activeTab === 'status' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('status')}
          >
            Clinical & Status
          </button>
        </div>

        <div className="palette-search">
          <IconSearch size={14} stroke={1.75} />
          <input
            type="text"
            placeholder="Search hex, token name, or usage..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Warm Neutral Ladder */}
      {(activeTab === 'all' || activeTab === 'neutral') && (
        <section className="palette-section">
          <div className="section-title-wrap">
            <h2 className="palette-section-title">Warm Neutral Ladder (#FAF8F5 to #111111)</h2>
            <p className="palette-section-desc">
              20 calibrated steps providing warm organic tone contrast. Used for all pages, card backgrounds,
              hairline borders, muted typography, and dark-mode night surfaces.
            </p>
          </div>

          <div className="swatches-grid">
            {filteredNeutral.map(renderSwatchCard)}
          </div>
        </section>
      )}

      {/* Orange & Accent Ladder */}
      {(activeTab === 'all' || activeTab === 'orange') && (
        <section className="palette-section">
          <div className="section-title-wrap">
            <h2 className="palette-section-title">DUSQ Orange Accent & Primitive Ladder</h2>
            <p className="palette-section-desc">
              The focal accent of DUSQ. <code>#F0650D</code> anchors key calls-to-action, active step numbers,
              and brand dot styling.
            </p>
          </div>

          <div className="swatches-grid">
            {filteredOrange.map(renderSwatchCard)}
          </div>
        </section>
      )}

      {/* Status Palettes */}
      {(activeTab === 'all' || activeTab === 'status') && (
        <section className="palette-section">
          <div className="section-title-wrap">
            <h2 className="palette-section-title">Clinical & Status Palettes</h2>
            <p className="palette-section-desc">
              High-legibility functional colors for sleep sensors, microarousal warnings, and clinical outcome metrics.
            </p>
          </div>

          {STATUS_PALETTES.map(statusGroup => {
            const filteredTokens = statusGroup.tokens.filter(matchesFilter);
            if (filteredTokens.length === 0) return null;

            return (
              <div key={statusGroup.name} className="status-subgroup">
                <div className="subgroup-header">
                  <h3 className="subgroup-title">{statusGroup.name}</h3>
                  <span className="subgroup-desc">{statusGroup.description}</span>
                </div>
                <div className="swatches-grid">
                  {filteredTokens.map(renderSwatchCard)}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
