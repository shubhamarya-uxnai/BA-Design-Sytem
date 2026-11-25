import React, { useState } from 'react';
import { SEMANTIC_TOKEN_GROUPS } from '../../data/tokens';
import {
  IconSun,
  IconMoon,
  IconCheck,
  IconCopy,
  IconSparkles,
  IconArrowUpRight,
  IconActivity,
  IconShieldCheck,
} from '@tabler/icons-react';

export function SemanticColorsStory() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyVar = async (val: string, key: string) => {
    await navigator.clipboard?.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="semantic-colors-story">
      <div className="story-intro-hero">
        <div className="story-intro-copy">
          <span className="story-category-eyebrow">FOUNDATIONS / THEMING</span>
          <h1 className="story-main-heading">Semantic Colors & Theme Modes</h1>
          <p className="story-summary-text">
            Semantic tokens map raw color primitives to meaningful interface roles (surfaces, typography, borders,
            and status signals). Toggle between Light and Dark mode to observe how background, foreground, and
            border tokens adapt cohesively.
          </p>
        </div>

        <div className="theme-switcher-banner">
          <span className="theme-banner-label">Active Preview Mode:</span>
          <div className="theme-toggle-pill-group">
            <button
              type="button"
              className={`theme-toggle-pill ${themeMode === 'light' ? 'is-active' : ''}`}
              onClick={() => setThemeMode('light')}
            >
              <IconSun size={16} stroke={1.75} />
              <span>Light Mode (Warm Cream)</span>
            </button>
            <button
              type="button"
              className={`theme-toggle-pill ${themeMode === 'dark' ? 'is-active' : ''}`}
              onClick={() => setThemeMode('dark')}
            >
              <IconMoon size={16} stroke={1.75} />
              <span>Dark Mode (Night Charcoal)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Interactive Token Preview Box */}
      <section className="live-semantic-demo-section">
        <div className="section-title-wrap">
          <h2 className="palette-section-title">Live Dynamic Preview Component</h2>
          <p className="palette-section-desc">
            This card responds dynamically to the active theme mode using the semantic token rules below.
          </p>
        </div>

        <div className={`semantic-demo-card theme-${themeMode}`}>
          <div className="demo-card-header">
            <div className="demo-badge">
              <IconSparkles size={14} stroke={2} />
              <span>SEMANTIC ROLE PREVIEW</span>
            </div>
            <span className="demo-mode-indicator">{themeMode.toUpperCase()} THEME</span>
          </div>

          <div className="demo-card-body">
            <h3 className="demo-heading">Continuous Closed-Loop Neuromodulation</h3>
            <p className="demo-paragraph">
              DUSQ continuously monitors sleep microarousals using EDA and PPG sensors,
              delivering sub-perceptual vagus stimulation to stabilize deep slow-wave sleep.
            </p>

            <div className="demo-stats-row">
              <div className="demo-stat-box">
                <span className="stat-sub">Sensing State</span>
                <span className="stat-val status-success">
                  <IconShieldCheck size={16} stroke={1.75} /> Active Stabilized
                </span>
              </div>
              <div className="demo-stat-box">
                <span className="stat-sub">Microarousal Risk</span>
                <span className="stat-val status-alert">
                  <IconActivity size={16} stroke={1.75} /> Reduced 42%
                </span>
              </div>
            </div>

            <div className="demo-actions">
              <button type="button" className="demo-pill-btn">
                <span>Explore Science</span>
                <span className="demo-arrow-box">
                  <IconArrowUpRight size={16} stroke={1.75} />
                </span>
              </button>
              <button type="button" className="demo-secondary-btn">
                <span>View Raw Telemetry</span>
              </button>
            </div>
          </div>

          <div className="demo-card-footer">
            <code>background: {themeMode === 'light' ? '#FAF8F5 (cream)' : '#1A1816 (ink)'}</code>
            <code>border: {themeMode === 'light' ? '#C2B9AF (neutral-200)' : '#6D5946 (neutral-600)'}</code>
            <code>text: {themeMode === 'light' ? '#111111 (neutral-950)' : '#FAF8F5 (neutral-0)'}</code>
          </div>
        </div>
      </section>

      {/* Semantic Token Mappings Table */}
      <section className="semantic-tables-section">
        <div className="section-title-wrap">
          <h2 className="palette-section-title">Semantic Token Architecture & Mappings</h2>
          <p className="palette-section-desc">
            Complete specification of semantic tokens, their CSS variables, and light/dark resolved values.
          </p>
        </div>

        {SEMANTIC_TOKEN_GROUPS.map(group => (
          <div key={group.category} className="semantic-group-block">
            <div className="group-header">
              <h3 className="group-category-title">{group.category}</h3>
              <p className="group-category-desc">{group.description}</p>
            </div>

            <div className="semantic-table-wrapper">
              <table className="semantic-table">
                <thead>
                  <tr>
                    <th>Role / Semantic Name</th>
                    <th>CSS Variable</th>
                    <th>Light Mode Value</th>
                    <th>Dark Mode Value</th>
                    <th>Usage & Purpose</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {group.tokens.map(token => {
                    const isCopied = copiedKey === token.cssVar;
                    return (
                      <tr key={token.cssVar}>
                        <td>
                          <span className="semantic-name">{token.name}</span>
                        </td>
                        <td>
                          <code className="semantic-code">{token.cssVar}</code>
                        </td>
                        <td>
                          <div className="token-val-cell">
                            <span
                              className="token-dot"
                              style={{
                                backgroundColor: token.lightValue.includes('#')
                                  ? token.lightValue.split(' ')[0]
                                  : '#FAF8F5',
                              }}
                            />
                            <span>{token.lightValue}</span>
                          </div>
                        </td>
                        <td>
                          <div className="token-val-cell">
                            <span
                              className="token-dot"
                              style={{
                                backgroundColor: token.darkValue.includes('#')
                                  ? token.darkValue.split(' ')[0]
                                  : '#111111',
                              }}
                            />
                            <span>{token.darkValue}</span>
                          </div>
                        </td>
                        <td>
                          <span className="token-desc">{token.description}</span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={`copy-mini-btn ${isCopied ? 'is-copied' : ''}`}
                            onClick={() => copyVar(token.cssVar, token.cssVar)}
                            title="Copy CSS variable"
                          >
                            {isCopied ? <IconCheck size={12} stroke={2} /> : <IconCopy size={12} stroke={1.75} />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
