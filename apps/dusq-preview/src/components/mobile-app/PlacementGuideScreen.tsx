import React from 'react';
import { Button, IconButton, Chip, ProgressBar } from '@dusq-design-system/react';
import type { MobileScreenId } from './types';

interface PlacementGuideScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
}

/**
 * Hardware Mastoid Placement Guide
 * Built following Apple's AirPods Fit Test / Apple Watch Setup pattern
 * Integrating DUSQ Design System components:
 * - ProgressBar (Electrode Skin Conductance)
 * - Button (Primary Brand Orange)
 * - IconButton (Ghost Back button)
 * - Chip (Primary Filled/Ghost)
 */
export function PlacementGuideScreen({ onNavigate, onBack }: PlacementGuideScreenProps) {
  return (
    <div className="dusq-screen-scroll" data-theme="dark">
      {/* Top Header matching unified mobile screen bar */}
      <div className="dusq-screen-top-bar">
        <IconButton Type="Ghost" Size="Small" icon="arrow_back" onClick={onBack} aria-label="Back" />
        <h3 className="dusq-screen-top-bar__title">PLACEMENT CHECK</h3>
        <Chip Type="Success" Style="Ghost" Icon={false} chip="Optimal Fit" />
      </div>

      {/* Hero Visual: Placement & Contact Halo */}
      <div
        className="dusq-visual-card"
        style={{
          padding: 0,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src="/how-it-works/step-1-detect.jpg"
          alt="DUSQ One Behind-Ear Placement"
          style={{
            width: '100%',
            height: '176px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div className="dusq-placement-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="dusq-placement-dot" aria-hidden="true" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dusq-text-primary)' }}>Postauricular Mastoid</span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--ba-color-themes-primary-300)', fontWeight: 600 }}>0.8 kΩ · Calibrated</span>
        </div>
      </div>

      {/* Real-time Conductance Signal Bar (Design System ProgressBar) */}
      <div className="dusq-visual-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
          <span style={{ color: 'var(--dusq-text-secondary)', fontWeight: 500 }}>Electrode Skin Conductance</span>
          <span style={{ fontWeight: 600, color: 'var(--ba-color-themes-primary-300)' }}>96% Coupling</span>
        </div>
        <ProgressBar
          Type="In Progress"
          value={96}
          Legend={false}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px', fontSize: '11.5px', color: 'var(--dusq-text-muted)', marginTop: '6px' }}>
          <span>Clean skin</span>
          <span>Sleep Link flush</span>
          <span>nVNS locked</span>
        </div>
      </div>

      {/* 3 Glanceable Checklist Tiles */}
      <div className="apple-inset-grouped-list">
        <div className="apple-inset-grouped-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" fill="rgba(250, 248, 245, 0.14)" />
              <path d="M8 12.5L10.5 15L16 9.5" stroke="var(--dusq-text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--dusq-text-primary)' }}>Alcohol wipe behind ear</div>
              <div style={{ fontSize: '12px', color: 'var(--dusq-text-muted)', marginTop: '2px' }}>Removes sebum for clear EDA impedance</div>
            </div>
          </div>
          <Chip Type="Primary" Style="Ghost" Icon={false} chip="Done" />
        </div>

        <div className="apple-inset-grouped-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" fill="rgba(250, 248, 245, 0.14)" />
              <path d="M8 12.5L10.5 15L16 9.5" stroke="var(--dusq-text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--dusq-text-primary)' }}>Sleep Link snapped in place</div>
              <div style={{ fontSize: '12px', color: 'var(--dusq-text-muted)', marginTop: '2px' }}>Dual magnetic contacts docked to DUSQ One</div>
            </div>
          </div>
          <Chip Type="Primary" Style="Ghost" Icon={false} chip="Done" />
        </div>

        <div className="apple-inset-grouped-row apple-inset-grouped-row--selected">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <div className="dusq-placement-step-badge" aria-hidden="true">
              3
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--dusq-text-primary)' }}>Pressed behind mastoid bone</div>
              <div style={{ fontSize: '12px', color: 'var(--ba-color-themes-primary-300)', marginTop: '2px' }}>Ready for silent 0 dB vagal modulation</div>
            </div>
          </div>
          <Chip Type="Primary" Style="Filled" Icon={false} chip="Active" />
        </div>
      </div>

      {/* Continue to Wind-Down Action */}
      <div style={{ marginTop: '4px' }}>
        <Button
          Type="Primary"
          Size="Large"
          className="dusq-btn-full"
          Button="Continue to Wind-Down"
          {...{
            'Leading Icon': true,
            'leading-icon': (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ),
            'Tailing Icon': false,
          }}
          onClick={() => onNavigate('wind-down')}
        />
      </div>
    </div>
  );
}
