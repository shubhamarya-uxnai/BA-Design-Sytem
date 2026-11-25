import React from 'react';

export type ViewportMode = 'full' | 'desktop' | 'tablet' | 'mobile';

interface ResponsiveFrameProps {
  mode: ViewportMode;
  zoom: number;
  showRuler?: boolean;
  children: React.ReactNode;
}

export const VIEWPORT_CONFIGS: Record<ViewportMode, { label: string; width: string; widthNum: number | null }> = {
  full: { label: 'Full Width (100%)', width: '100%', widthNum: null },
  desktop: { label: 'Desktop (1440px)', width: '1440px', widthNum: 1440 },
  tablet: { label: 'Tablet (900px)', width: '900px', widthNum: 900 },
  mobile: { label: 'Mobile (375px)', width: '375px', widthNum: 375 },
};

export function ResponsiveFrame({ mode, zoom, showRuler = true, children }: ResponsiveFrameProps) {
  const config = VIEWPORT_CONFIGS[mode];
  const isConstrained = mode !== 'full';

  return (
    <div className={`responsive-frame-wrapper viewport-${mode}`}>
      {isConstrained && showRuler && (
        <div className="viewport-ruler-header">
          <span className="ruler-badge">{config.label}</span>
          <span className="ruler-dims">Width: {config.width} · Zoom: {Math.round(zoom * 100)}%</span>
        </div>
      )}
      <div
        className={`responsive-canvas-container ${isConstrained ? 'has-device-frame' : ''}`}
        style={{
          width: config.width,
          transform: zoom !== 1 ? `scale(${zoom})` : undefined,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
