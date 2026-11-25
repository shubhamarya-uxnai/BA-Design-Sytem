import React, { useState } from 'react';
import { PillButton } from '@dusq-preview/components/PillButton';
import {
  IconCheck,
  IconCopy,
  IconSparkles,
  IconArrowUpRight,
  IconHandClick,
} from '@tabler/icons-react';

export function PillButtonStory() {
  const [label, setLabel] = useState('Explore DUSQ One');
  const [isLight, setIsLight] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const generatedCode = `<PillButton\n  href="#product"\n  ${isLight ? 'light\n  ' : ''}${isExternal ? 'external\n  ' : ''}>\n  ${label}\n</PillButton>`;

  const copyCode = async () => {
    await navigator.clipboard?.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  return (
    <div className="primitive-story pill-button-story">
      <div className="story-intro-hero">
        <div className="story-intro-copy">
          <span className="story-category-eyebrow">CORE UI PRIMITIVES / CTA</span>
          <h1 className="story-main-heading">PillButton (Sliding Arrow Container)</h1>
          <p className="story-summary-text">
            The signature action element of the DUSQ Design System. Features an asymmetric rounded pill geometry,
            direct typography, and an interactive 46px dark slide-behind arrow container (<code>::before</code>) that
            expands smoothly across the entire pill on hover with <code>transition: width 0.35s ease</code>.
          </p>
        </div>
      </div>

      <div className="primitive-interactive-workspace">
        {/* Playground Canvas */}
        <div className="primitive-stage">
          <div className="stage-header">
            <span className="stage-title">Interactive Stage</span>
            <span className="stage-hint">Hover or focus the button to trigger the sliding 46px arrow animation</span>
          </div>

          <div className={`stage-canvas ${isLight ? 'stage-light-bg' : 'stage-cream-bg'}`}>
            <div className={isCompact ? 'header-action' : ''}>
              <PillButton href="#demo" light={isLight} external={isExternal}>
                {label}
              </PillButton>
            </div>
          </div>

          <div className="stage-notes">
            <div className="anatomy-badge">
              <strong>Anatomy:</strong>
              <span>
                Height: {isCompact ? '40px (Header compact)' : '62px (Default)'} · Arrow Container:{' '}
                {isCompact ? '32px' : '46px'} · Icon: Tabler IconArrowUpRight (18px, stroke: 1.75)
              </span>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <aside className="primitive-controls-panel">
          <h3 className="controls-panel-title">Interactive Controls</h3>

          <div className="control-group">
            <label className="control-label">Button Label</label>
            <input
              type="text"
              className="text-input-field"
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label className="control-label">Theme Variant</label>
            <div className="control-toggle-row">
              <button
                type="button"
                className={`variant-toggle-btn ${!isLight ? 'is-active' : ''}`}
                onClick={() => setIsLight(false)}
              >
                Dark (Ink #111111)
              </button>
              <button
                type="button"
                className={`variant-toggle-btn ${isLight ? 'is-active' : ''}`}
                onClick={() => setIsLight(true)}
              >
                Light (Paper White)
              </button>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Size Variant</label>
            <div className="control-toggle-row">
              <button
                type="button"
                className={`variant-toggle-btn ${!isCompact ? 'is-active' : ''}`}
                onClick={() => setIsCompact(false)}
              >
                Standard (62px)
              </button>
              <button
                type="button"
                className={`variant-toggle-btn ${isCompact ? 'is-active' : ''}`}
                onClick={() => setIsCompact(true)}
              >
                Header Compact (40px)
              </button>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Link Behavior</label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isExternal}
                onChange={e => setIsExternal(e.target.checked)}
              />
              <span>External Link (target="_blank")</span>
            </label>
          </div>

          <div className="code-export-box">
            <div className="code-export-header">
              <span>Code Snippet</span>
              <button type="button" className="copy-code-btn" onClick={copyCode}>
                {copiedCode ? <IconCheck size={12} stroke={2} /> : <IconCopy size={12} stroke={1.75} />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="code-export-pre">
              <code>{generatedCode}</code>
            </pre>
          </div>
        </aside>
      </div>

      {/* Side-by-side Variant Matrix */}
      <section className="variants-matrix-section">
        <h2 className="palette-section-title">Design System Variant Matrix</h2>
        <p className="palette-section-desc">Standard production usages across the DUSQ site</p>

        <div className="variants-matrix-grid">
          <div className="matrix-card">
            <span className="matrix-card-label">Default Hero Primary (62px)</span>
            <div className="matrix-preview-box">
              <PillButton href="#how-it-works">Explore the approach</PillButton>
            </div>
            <code className="matrix-code">&lt;PillButton href="..."&gt;</code>
          </div>

          <div className="matrix-card">
            <span className="matrix-card-label">Hero Secondary Light (62px)</span>
            <div className="matrix-preview-box">
              <PillButton href="#find-your-fix" light>Find your fix</PillButton>
            </div>
            <code className="matrix-code">&lt;PillButton href="..." light&gt;</code>
          </div>

          <div className="matrix-card">
            <span className="matrix-card-label">Header Compact Action (40px)</span>
            <div className="matrix-preview-box dark-box">
              <div className="header-action">
                <PillButton href="#product" light>Explore DUSQ One</PillButton>
              </div>
            </div>
            <code className="matrix-code">.header-action .pill-button</code>
          </div>

          <div className="matrix-card">
            <span className="matrix-card-label">External Outbound Link</span>
            <div className="matrix-preview-box">
              <PillButton href="https://dusq.com" external>Explore DUSQ One</PillButton>
            </div>
            <code className="matrix-code">&lt;PillButton external&gt;</code>
          </div>
        </div>
      </section>
    </div>
  );
}
