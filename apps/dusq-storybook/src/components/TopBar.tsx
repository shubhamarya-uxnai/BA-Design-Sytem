import React from 'react';
import {
  IconDeviceDesktop,
  IconDeviceTablet,
  IconDeviceMobile,
  IconMaximize,
  IconSun,
  IconMoon,
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
} from '@tabler/icons-react';
import type { ViewportMode } from './ResponsiveFrame';
import { STORIES } from './Sidebar';

interface TopBarProps {
  activeStoryId: string;
  viewportMode: ViewportMode;
  onSetViewportMode: (mode: ViewportMode) => void;
  zoom: number;
  onSetZoom: (zoom: number) => void;
  canvasTheme: 'light' | 'dark';
  onToggleCanvasTheme: () => void;
  showRulers: boolean;
  onToggleRulers: () => void;
  activeTab: 'canvas' | 'docs';
  onSetActiveTab: (tab: 'canvas' | 'docs') => void;
}

export function TopBar({
  activeStoryId,
  viewportMode,
  onSetViewportMode,
  zoom,
  onSetZoom,
  canvasTheme,
  onToggleCanvasTheme,
  showRulers,
  onToggleRulers,
  activeTab,
  onSetActiveTab,
}: TopBarProps) {
  const currentStory = STORIES.find(s => s.id === activeStoryId);

  return (
    <header className="storybook-topbar">
      <div className="topbar-left">
        <div className="breadcrumbs">
          <span className="breadcrumb-group">{currentStory?.group || 'Story'}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-title">{currentStory?.title}</span>
        </div>

        <div className="story-mode-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'canvas' ? 'is-active' : ''}`}
            onClick={() => onSetActiveTab('canvas')}
          >
            Canvas
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'docs' ? 'is-active' : ''}`}
            onClick={() => onSetActiveTab('docs')}
          >
            Docs & Tokens
          </button>
        </div>
      </div>

      <div className="topbar-center">
        <div className="viewport-switcher-group" role="group" aria-label="Responsive Viewports">
          <button
            type="button"
            className={`tool-btn ${viewportMode === 'full' ? 'is-active' : ''}`}
            title="Full Width (100%)"
            onClick={() => onSetViewportMode('full')}
          >
            <IconMaximize size={15} stroke={1.75} />
            <span className="tool-btn-label">Full</span>
          </button>
          <button
            type="button"
            className={`tool-btn ${viewportMode === 'desktop' ? 'is-active' : ''}`}
            title="Desktop 1440px"
            onClick={() => onSetViewportMode('desktop')}
          >
            <IconDeviceDesktop size={15} stroke={1.75} />
            <span className="tool-btn-label">1440px</span>
          </button>
          <button
            type="button"
            className={`tool-btn ${viewportMode === 'tablet' ? 'is-active' : ''}`}
            title="Tablet 900px"
            onClick={() => onSetViewportMode('tablet')}
          >
            <IconDeviceTablet size={15} stroke={1.75} />
            <span className="tool-btn-label">900px</span>
          </button>
          <button
            type="button"
            className={`tool-btn ${viewportMode === 'mobile' ? 'is-active' : ''}`}
            title="Mobile 375px"
            onClick={() => onSetViewportMode('mobile')}
          >
            <IconDeviceMobile size={15} stroke={1.75} />
            <span className="tool-btn-label">375px</span>
          </button>
        </div>
      </div>

      <div className="topbar-right">
        <div className="zoom-controls">
          <button
            type="button"
            className="tool-btn-icon"
            title="Zoom Out"
            disabled={zoom <= 0.5}
            onClick={() => onSetZoom(Math.max(0.5, Number((zoom - 0.25).toFixed(2))))}
          >
            <IconZoomOut size={15} stroke={1.75} />
          </button>
          <button
            type="button"
            className="zoom-level-btn"
            title="Reset Zoom (100%)"
            onClick={() => onSetZoom(1)}
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            className="tool-btn-icon"
            title="Zoom In"
            disabled={zoom >= 1.5}
            onClick={() => onSetZoom(Math.min(1.5, Number((zoom + 0.25).toFixed(2))))}
          >
            <IconZoomIn size={15} stroke={1.75} />
          </button>
        </div>

        <button
          type="button"
          className={`tool-btn-icon ${showRulers ? 'is-active' : ''}`}
          title={showRulers ? 'Hide Viewport Info' : 'Show Viewport Info'}
          onClick={onToggleRulers}
        >
          <IconZoomReset size={15} stroke={1.75} />
        </button>

        <button
          type="button"
          className={`theme-toggle-btn ${canvasTheme === 'dark' ? 'is-dark' : 'is-light'}`}
          title={`Canvas Theme: currently ${canvasTheme}. Click to toggle.`}
          onClick={onToggleCanvasTheme}
        >
          {canvasTheme === 'dark' ? (
            <>
              <IconMoon size={15} stroke={1.75} />
              <span>Dark</span>
            </>
          ) : (
            <>
              <IconSun size={15} stroke={1.75} />
              <span>Light</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
