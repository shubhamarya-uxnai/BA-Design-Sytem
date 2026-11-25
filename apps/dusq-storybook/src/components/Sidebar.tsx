import React, { useState } from 'react';
import {
  IconPalette,
  IconSunMoon,
  IconTypography,
  IconIcons,
  IconHandClick,
  IconComponents,
  IconLayout,
  IconCompass,
  IconSunrise,
  IconNews,
  IconTarget,
  IconUsers,
  IconHeartbeat,
  IconStack2,
  IconActivity,
  IconScale,
  IconDeviceWatch,
  IconHelpCircle,
  IconFolder,
  IconSearch,
  IconChevronDown,
  IconChevronRight,
  IconExternalLink,
  IconDna,
  IconWaveSine,
  IconCpu,
  IconArrowsJoin2,
  IconClock,
  IconBed,
  IconBrain,
  IconGitCompare,
  IconFlask,
} from '@tabler/icons-react';

export interface StoryDefinition {
  id: string;
  title: string;
  group: 'Foundations' | 'Core UI Primitives' | 'DUSQ Website Sections' | 'DUSQ Science Page Sections';
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
  badge?: string;
}

export const STORIES: StoryDefinition[] = [
  // Foundations
  { id: 'foundations-colors', title: 'Color Primitives & Warm Neutral Ladder', group: 'Foundations', icon: IconPalette, badge: '90 tokens' },
  { id: 'foundations-semantic', title: 'Semantic Colors & Theme Modes', group: 'Foundations', icon: IconSunMoon, badge: 'Light/Dark' },
  { id: 'foundations-typography', title: 'Typography & 21 Text Styles', group: 'Foundations', icon: IconTypography, badge: '21 styles' },
  { id: 'foundations-iconography', title: 'Iconography Gallery', group: 'Foundations', icon: IconIcons, badge: 'Tabler 1.75' },

  // Core UI Primitives
  { id: 'primitives-pillbutton', title: 'PillButton (Sliding Arrow Container)', group: 'Core UI Primitives', icon: IconHandClick, badge: 'Interactive' },
  { id: 'primitives-bareact', title: 'BA React Primitives in DUSQ Theme', group: 'Core UI Primitives', icon: IconComponents, badge: 'Form/Status' },
  { id: 'mobile-app', title: 'DUSQ Mobile Companion App (10 Screens)', group: 'Core UI Primitives', icon: IconDeviceWatch, badge: 'Full App' },

  // DUSQ Website Sections
  { id: 'sections-all', title: 'All Sections (Full Page Composition)', group: 'DUSQ Website Sections', icon: IconLayout, badge: 'Full Preview' },
  { id: 'sections-header', title: 'Header (Navigation & Action)', group: 'DUSQ Website Sections', icon: IconCompass },
  { id: 'sections-hero', title: 'Hero & Masthead', group: 'DUSQ Website Sections', icon: IconSunrise },
  { id: 'sections-brandsticker', title: 'Featured Press Ticker', group: 'DUSQ Website Sections', icon: IconNews, badge: 'Marquee' },
  { id: 'sections-findyourfix', title: 'Find Your Fix (Sleep Profiles)', group: 'DUSQ Website Sections', icon: IconTarget },
  { id: 'sections-community', title: 'Community & Testimonials', group: 'DUSQ Website Sections', icon: IconUsers },
  { id: 'sections-meetteam', title: 'Meet the Team / Founder Quote', group: 'DUSQ Website Sections', icon: IconHeartbeat },
  { id: 'sections-howitworks', title: 'How It Works (3 Steps)', group: 'DUSQ Website Sections', icon: IconStack2 },
  { id: 'sections-clinicaldata', title: 'Clinical Data & Metrics', group: 'DUSQ Website Sections', icon: IconActivity },
  { id: 'sections-comparison', title: 'Comparison Table', group: 'DUSQ Website Sections', icon: IconScale },
  { id: 'sections-productone', title: 'Product One Wearable', group: 'DUSQ Website Sections', icon: IconDeviceWatch },
  { id: 'sections-faq', title: 'FAQ Accordion', group: 'DUSQ Website Sections', icon: IconHelpCircle },
  { id: 'sections-footer', title: 'Footer', group: 'DUSQ Website Sections', icon: IconFolder },
  { id: 'sleeplab-page', title: 'The Sleep Lab (Dedicated Page)', group: 'DUSQ Website Sections', icon: IconFlask, badge: 'Full Page' },

  // DUSQ Science Page Sections
  { id: 'science-all', title: 'All Science Sections (Full Page)', group: 'DUSQ Science Page Sections', icon: IconDna, badge: 'Full Science' },
  { id: 'science-hero', title: '1. Science Hero & Autonomic Statement', group: 'DUSQ Science Page Sections', icon: IconSunrise },
  { id: 'science-seesaw', title: '2. The Nervous System See-Saw', group: 'DUSQ Science Page Sections', icon: IconScale },
  { id: 'science-surges', title: '3. Surges: Invisible Determinants', group: 'DUSQ Science Page Sections', icon: IconWaveSine },
  { id: 'science-sensorstack', title: '4. Hinter-Ear Sensor Stack (EDA+PPG)', group: 'DUSQ Science Page Sections', icon: IconCpu },
  { id: 'science-neuromodulation', title: '5. Neuromodulation (nVNS & nVEnS)', group: 'DUSQ Science Page Sections', icon: IconActivity },
  { id: 'science-convergence', title: '6. Mastoid Convergence', group: 'DUSQ Science Page Sections', icon: IconArrowsJoin2 },
  { id: 'science-chronobiology', title: '7. Three Ways Across Night', group: 'DUSQ Science Page Sections', icon: IconClock },
  { id: 'science-sleeplab', title: '8. Physical Sleep Lab & Protocol', group: 'DUSQ Science Page Sections', icon: IconBed },
  { id: 'science-psg', title: '9. PSG Gold Standard Concordance', group: 'DUSQ Science Page Sections', icon: IconBrain },
  { id: 'science-comparison', title: '10. Active vs Passive Wearables & CTA', group: 'DUSQ Science Page Sections', icon: IconGitCompare },
];

interface SidebarProps {
  activeStoryId: string;
  onSelectStory: (id: string) => void;
}

export function Sidebar({ activeStoryId, onSelectStory }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (group: string) => {
    setCollapsedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const groups: Array<StoryDefinition['group']> = [
    'Foundations',
    'Core UI Primitives',
    'DUSQ Website Sections',
    'DUSQ Science Page Sections',
  ];

  const filteredStories = STORIES.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="storybook-sidebar">
      <div className="sidebar-brand-block">
        <div className="brand-header-row">
          <div className="brand-logo-wrap">
            <span className="brand-dusq-text">DUSQ<span className="brand-dot">·</span></span>
            <span className="brand-subtitle">STORYBOOK</span>
          </div>
          <span className="ds-version-pill">v0.4.0</span>
        </div>
        <p className="sidebar-description">Design System & Isolated Component Explorer</p>
      </div>

      <div className="sidebar-search-box">
        <IconSearch size={14} stroke={1.75} className="search-icon" />
        <input
          type="text"
          placeholder="Filter stories & tokens..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          aria-label="Filter stories"
        />
        {searchTerm && (
          <button type="button" className="clear-search-btn" onClick={() => setSearchTerm('')}>
            ✕
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        {groups.map(group => {
          const storiesInGroup = filteredStories.filter(s => s.group === group);
          if (storiesInGroup.length === 0) return null;
          const isCollapsed = !searchTerm && !!collapsedGroups[group];

          return (
            <div key={group} className="sidebar-group">
              <button
                type="button"
                className="group-title-btn"
                onClick={() => toggleGroup(group)}
                aria-expanded={!isCollapsed}
              >
                <span className="group-toggle-icon">
                  {isCollapsed ? <IconChevronRight size={13} stroke={1.75} /> : <IconChevronDown size={13} stroke={1.75} />}
                </span>
                <span className="group-name">{group}</span>
                <span className="group-count">{storiesInGroup.length}</span>
              </button>

              {!isCollapsed && (
                <ul className="group-story-list">
                  {storiesInGroup.map(story => {
                    const IconComponent = story.icon;
                    const isActive = activeStoryId === story.id;
                    return (
                      <li key={story.id}>
                        <button
                          type="button"
                          className={`story-nav-btn ${isActive ? 'is-active' : ''}`}
                          onClick={() => onSelectStory(story.id)}
                        >
                          <span className="story-icon">
                            <IconComponent size={16} stroke={1.75} />
                          </span>
                          <span className="story-nav-label">{story.title}</span>
                          {story.badge && <span className="story-nav-badge">{story.badge}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <a
          href="http://127.0.0.1:4174"
          target="_blank"
          rel="noopener noreferrer"
          className="preview-link-btn"
        >
          <span>Open Live DUSQ Preview (4174)</span>
          <IconExternalLink size={14} stroke={1.75} />
        </a>
      </div>
    </aside>
  );
}
