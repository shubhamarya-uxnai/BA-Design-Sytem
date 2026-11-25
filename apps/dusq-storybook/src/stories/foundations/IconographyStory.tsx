import React, { useState } from 'react';
import { DUSQ_ICONS, type IconItem } from '../../data/iconography';
import {
  IconCheck,
  IconCopy,
  IconSearch,
  IconAdjustments,
} from '@tabler/icons-react';

export function IconographyStory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [iconSize, setIconSize] = useState<number>(24);
  const [iconStroke, setIconStroke] = useState<number>(1.75);
  const [iconColor, setIconColor] = useState<string>('var(--ink)');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const categories = ['all', 'DUSQ Website Live', 'Sleep & Neuroscience', 'UI & Navigation', 'Hardware & Sensing'];

  const copyCode = async (name: string) => {
    const code = `<${name} size={${iconSize}} stroke={${iconStroke}} />`;
    await navigator.clipboard?.writeText(code);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1800);
  };

  const filteredIcons = DUSQ_ICONS.filter(icon => {
    const matchesCat = selectedCategory === 'all' || icon.category === selectedCategory;
    const matchesSearch =
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.usage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="iconography-story">
      <div className="story-intro-hero">
        <div className="story-intro-copy">
          <span className="story-category-eyebrow">FOUNDATIONS / ICONOGRAPHY</span>
          <h1 className="story-main-heading">Tabler Icons (stroke: 1.75)</h1>
          <p className="story-summary-text">
            DUSQ uses the <strong>@tabler/icons-react</strong> library with an authoritative uniform stroke width of{' '}
            <code>1.75</code>. From the dynamic sliding arrow container in <code>PillButton</code> to clinical EEG
            indicators and FAQ toggles, this gallery showcases every icon across the system.
          </p>
        </div>

        <div className="icon-controls-toolbar">
          <div className="control-field">
            <span className="control-label">Size ({iconSize}px)</span>
            <input
              type="range"
              min="16"
              max="48"
              step="2"
              value={iconSize}
              onChange={e => setIconSize(Number(e.target.value))}
            />
          </div>

          <div className="control-field">
            <span className="control-label">Stroke ({iconStroke})</span>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.25"
              value={iconStroke}
              onChange={e => setIconStroke(Number(e.target.value))}
            />
          </div>

          <div className="control-field">
            <span className="control-label">Color</span>
            <div className="color-swatch-select">
              <button
                type="button"
                className={`color-dot-btn ${iconColor === 'var(--ink)' ? 'is-active' : ''}`}
                style={{ background: '#111111' }}
                onClick={() => setIconColor('var(--ink)')}
                title="Ink (#111111)"
              />
              <button
                type="button"
                className={`color-dot-btn ${iconColor === 'var(--orange)' ? 'is-active' : ''}`}
                style={{ background: '#F0650D' }}
                onClick={() => setIconColor('var(--orange)')}
                title="DUSQ Orange (#F0650D)"
              />
              <button
                type="button"
                className={`color-dot-btn ${iconColor === 'var(--muted)' ? 'is-active' : ''}`}
                style={{ background: '#736657' }}
                onClick={() => setIconColor('var(--muted)')}
                title="Muted (#736657)"
              />
              <button
                type="button"
                className={`color-dot-btn ${iconColor === '#2EAA47' ? 'is-active' : ''}`}
                style={{ background: '#2EAA47' }}
                onClick={() => setIconColor('#2EAA47')}
                title="Green Success"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="palette-toolbar">
        <div className="palette-filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-tab ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? `All Icons (${DUSQ_ICONS.length})` : cat}
            </button>
          ))}
        </div>

        <div className="palette-search">
          <IconSearch size={14} stroke={1.75} />
          <input
            type="text"
            placeholder="Search icon name or usage..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <section className="icons-grid-section">
        <div className="icons-grid">
          {filteredIcons.map(icon => {
            const IconComponent = icon.component;
            const isCopied = copiedName === icon.name;

            return (
              <div
                key={icon.name}
                className={`icon-card ${isCopied ? 'is-copied' : ''}`}
                onClick={() => copyCode(icon.name)}
                title="Click to copy React code"
              >
                <div className="icon-canvas" style={{ color: iconColor }}>
                  <IconComponent size={iconSize} stroke={iconStroke} />
                </div>

                <div className="icon-info">
                  <span className="icon-name">{icon.name}</span>
                  <span className="icon-category-tag">{icon.category}</span>
                  <p className="icon-usage-desc">{icon.usage}</p>
                </div>

                <div className="icon-copy-badge">
                  {isCopied ? (
                    <>
                      <IconCheck size={12} stroke={2} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <IconCopy size={12} stroke={1.75} />
                      <span>Copy Code</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
