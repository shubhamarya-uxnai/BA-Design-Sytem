import React from 'react';

interface MobileHeaderProps {
  batteryPercent?: number;
  timeString?: string;
}

/**
 * Apple iOS 18 Status Bar with SF Symbols
 * - Left: Tabular Time (SF Pro Text / Plus Jakarta Sans)
 * - Right: SF Symbols for Cellular (4-bar), Wi-Fi (3-arc), and Battery (Crisp White/Orange Shell)
 */
export function MobileHeader({ batteryPercent = 98, timeString = '9:41' }: MobileHeaderProps) {
  const isLowBattery = batteryPercent <= 20;

  return (
    <header
      className="dusq-phone-statusbar"
      role="banner"
      aria-label="iOS Status Bar"
      style={{
        height: '50px',
        padding: '14px 32px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14.5px',
        fontWeight: 600,
        color: '#FFFFFF',
        zIndex: 40,
        userSelect: 'none',
        boxSizing: 'border-box',
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {/* Time */}
      <span>{timeString}</span>

      {/* Right-side System Status Icons (Apple SF Symbols) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Cellular Signal (SF Symbol: cellularbars, 4-bar) */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
          <rect x="0.5" y="7.5" width="2.8" height="3.5" rx="0.6" />
          <rect x="4.8" y="5" width="2.8" height="6" rx="0.6" />
          <rect x="9.1" y="2.5" width="2.8" height="8.5" rx="0.6" />
          <rect x="13.4" y="0.2" width="2.8" height="10.8" rx="0.6" />
        </svg>

        {/* Wi-Fi Signal (SF Symbol: wifi, 3-arc) */}
        <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
          <path d="M8 10a1.5 1.5 0 1 0 0 2.5A1.5 1.5 0 0 0 8 10z" />
          <path d="M4.6 7.4a4.8 4.8 0 0 1 6.8 0 .8.8 0 0 0 1.1-1.1 6.4 6.4 0 0 0-9 0 .8.8 0 0 0 1.1 1.1z" />
          <path d="M2.3 5.1a8 8 0 0 1 11.4 0 .8.8 0 0 0 1.1-1.1 9.6 9.6 0 0 0-13.6 0 .8.8 0 0 0 1.1 1.1z" />
        </svg>

        {/* Battery Indicator (Apple HIG Battery Glyph) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5px', marginLeft: '1px' }}>
          <div
            style={{
              width: '23px',
              height: '11.5px',
              border: '1.2px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '3.5px',
              padding: '1.5px',
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: `${Math.min(100, Math.max(12, batteryPercent))}%`,
                height: '100%',
                background: isLowBattery ? '#FF9F0A' : '#FFFFFF',
                borderRadius: '1.5px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          {/* Battery Cathode Cap */}
          <div
            style={{
              width: '1.2px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '0 1px 1px 0',
            }}
          />
        </div>
      </div>
    </header>
  );
}
