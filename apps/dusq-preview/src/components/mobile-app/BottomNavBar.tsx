import React from 'react';
import type { MobileTab } from './types';

interface BottomNavBarProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  onOpenHardware?: () => void;
  batteryPercent?: number;
  badges?: Partial<Record<MobileTab, boolean | number>>;
}

interface TabDefinition {
  id: MobileTab;
  label: string;
  outlineIcon: React.ReactNode;
  filledIcon: React.ReactNode;
}

const TABS: TabDefinition[] = [
  {
    id: 'home',
    label: 'Home',
    outlineIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 2.5L21 9.5V20C21 20.6 20.6 21 20 21H15V15H9V21H4C3.4 21 3 20.6 3 20V9.5Z" />
      </svg>
    ),
    filledIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.35 2.45C11.73 2.15 12.27 2.15 12.65 2.45L20.65 8.7C20.87 8.87 21 9.14 21 9.42V20C21 20.55 20.55 21 20 21H14.5V14.5H9.5V21H4C3.45 21 3 20.55 3 20V9.42C3 9.14 3.13 8.87 3.35 8.7L11.35 2.45Z" />
      </svg>
    ),
  },
  {
    id: 'insights',
    label: 'Insights',
    outlineIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="13" width="3.5" height="8" rx="1.2" />
        <rect x="10.25" y="4" width="3.5" height="17" rx="1.2" />
        <rect x="16.5" y="9" width="3.5" height="12" rx="1.2" />
      </svg>
    ),
    filledIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <rect x="4" y="13" width="3.5" height="8" rx="1.2" />
        <rect x="10.25" y="4" width="3.5" height="17" rx="1.2" />
        <rect x="16.5" y="9" width="3.5" height="12" rx="1.2" />
      </svg>
    ),
  },
  {
    id: 'explore',
    label: 'Explore',
    outlineIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </svg>
    ),
    filledIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </svg>
    ),
  },
];

export function BottomNavBar({ activeTab, onSelectTab, onOpenHardware, batteryPercent = 87, badges }: BottomNavBarProps) {
  return (
    <div className="dusq-bottomnav-container">
      {/* Battery Telemetry Pill (Directly above the hardware pod button) */}
      <div className="dusq-battery-callout" title="DUSQ One battery telemetry">
        <svg width="18" height="10" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="1" y="1" width="18" height="10" rx="3" stroke="var(--ba-color-themes-base-200)" />
          <path d="M21 4v4" stroke="var(--ba-color-themes-base-200)" strokeLinecap="round" />
          <rect x="3" y="3" width="12" height="6" rx="1.5" fill="var(--ba-semantic-color-tokens-status-success-fill)" />
        </svg>
        <span>{batteryPercent}%</span>
      </div>

      <div className="dusq-bottomnav-row">
        {/* Main 3-Tab Floating Glass Navigation Dock */}
        <nav
          className="dusq-phone-bottomnav"
          role="tablist"
          aria-label="DUSQ Primary Tab Navigation"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const hasBadge = Boolean(badges?.[tab.id]);

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`dusq-nav-tab ${isActive ? 'dusq-nav-tab--active' : ''}`}
                onClick={() => onSelectTab(tab.id)}
              >
                <div className="dusq-nav-tab__icon">
                  {isActive ? tab.filledIcon : tab.outlineIcon}
                  {hasBadge && <span className="dusq-nav-tab__badge" />}
                </div>
                <span className="dusq-nav-tab__label">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Dedicated DUSQ One Behind-The-Ear Hardware Pod Button */}
        <button
          type="button"
          className={`dusq-hardware-pod-btn ${activeTab === 'hardware' ? 'is-active' : ''}`}
          aria-label="DUSQ One Hardware Hub"
          title="DUSQ One Hardware Hub"
          onClick={() => {
            if (onOpenHardware) onOpenHardware();
            else onSelectTab('hardware');
          }}
        >
          <div className="dusq-pod-glyph">
            <span className="pod-dot pod-dot-1" />
            <span className="pod-dot pod-dot-2" />
          </div>
        </button>
      </div>
    </div>
  );
}
