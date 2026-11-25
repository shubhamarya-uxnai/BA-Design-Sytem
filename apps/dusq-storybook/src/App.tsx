import React, { useState, useEffect } from 'react';
import { Sidebar, STORIES } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ResponsiveFrame, type ViewportMode } from './components/ResponsiveFrame';

// Foundation Stories
import { ColorPrimitivesStory } from './stories/foundations/ColorPrimitivesStory';
import { SemanticColorsStory } from './stories/foundations/SemanticColorsStory';
import { TypographyStory } from './stories/foundations/TypographyStory';
import { IconographyStory } from './stories/foundations/IconographyStory';

// Core UI Primitives Stories
import { PillButtonStory } from './stories/primitives/PillButtonStory';
import { BAReactPrimitivesStory } from './stories/primitives/BAReactPrimitivesStory';
import { MobileAppStory } from './stories/mobile/MobileAppStory';

// Section Stories
import { AllSectionsStory } from './stories/sections/AllSectionsStory';
import { HeaderStory } from './stories/sections/HeaderStory';
import { HeroStory } from './stories/sections/HeroStory';
import { BrandsTickerStory } from './stories/sections/BrandsTickerStory';
import { FindYourFixStory } from './stories/sections/FindYourFixStory';
import { CommunityStory } from './stories/sections/CommunityStory';
import { MeetTeamStory } from './stories/sections/MeetTeamStory';
import { HowItWorksStory } from './stories/sections/HowItWorksStory';
import { ClinicalDataStory } from './stories/sections/ClinicalDataStory';
import { ComparisonStory } from './stories/sections/ComparisonStory';
import { ProductOneStory } from './stories/sections/ProductOneStory';
import { FAQStory } from './stories/sections/FAQStory';
import { FooterStory } from './stories/sections/FooterStory';

// Science Stories
import { SciencePageStory } from './stories/science/SciencePageStory';
import { ScienceHeroStory } from './stories/science/ScienceHeroStory';
import { AutonomicSeeSawStory } from './stories/science/AutonomicSeeSawStory';
import { SurgesStory } from './stories/science/SurgesStory';
import { SensorStackStory } from './stories/science/SensorStackStory';
import { NeuromodulationStory } from './stories/science/NeuromodulationStory';
import { ConvergenceStory } from './stories/science/ConvergenceStory';
import { ChronobiologyStory } from './stories/science/ChronobiologyStory';
import { SleepLabStory } from './stories/science/SleepLabStory';
import { PsgConcordanceStory } from './stories/science/PsgConcordanceStory';
import { ScienceComparisonStory } from './stories/science/ScienceComparisonStory';
import { TheSleepLabPageStory } from './stories/sleeplab/TheSleepLabPageStory';

export function App() {
  const getInitialStory = (): string => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && STORIES.some(s => s.id === hash)) {
      return hash;
    }
    return 'foundations-colors';
  };

  const [activeStoryId, setActiveStoryId] = useState<string>(getInitialStory);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('full');
  const [zoom, setZoom] = useState<number>(1);
  const [canvasTheme, setCanvasTheme] = useState<'light' | 'dark'>('light');
  const [showRulers, setShowRulers] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'canvas' | 'docs'>('canvas');

  // Sync active story to URL hash
  const handleSelectStory = (id: string) => {
    setActiveStoryId(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && STORIES.some(s => s.id === hash)) {
        setActiveStoryId(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderActiveStory = () => {
    switch (activeStoryId) {
      // Foundations
      case 'foundations-colors':
        return <ColorPrimitivesStory />;
      case 'foundations-semantic':
        return <SemanticColorsStory />;
      case 'foundations-typography':
        return <TypographyStory />;
      case 'foundations-iconography':
        return <IconographyStory />;

      // Core UI Primitives
      case 'primitives-pillbutton':
        return <PillButtonStory />;
      case 'primitives-bareact':
        return <BAReactPrimitivesStory />;
      case 'mobile-app':
        return <MobileAppStory />;

      // Sections
      case 'sections-all':
        return <AllSectionsStory />;
      case 'sections-header':
        return <HeaderStory />;
      case 'sections-hero':
        return <HeroStory />;
      case 'sections-brandsticker':
        return <BrandsTickerStory />;
      case 'sections-findyourfix':
        return <FindYourFixStory />;
      case 'sections-community':
        return <CommunityStory />;
      case 'sections-meetteam':
        return <MeetTeamStory />;
      case 'sections-howitworks':
        return <HowItWorksStory />;
      case 'sections-clinicaldata':
        return <ClinicalDataStory />;
      case 'sections-comparison':
        return <ComparisonStory />;
      case 'sections-productone':
        return <ProductOneStory />;
      case 'sections-faq':
        return <FAQStory />;
      case 'sections-footer':
        return <FooterStory />;
      case 'sleeplab-page':
        return <TheSleepLabPageStory />;

      // DUSQ Science Page Sections
      case 'science-all':
        return <SciencePageStory />;
      case 'science-hero':
        return <ScienceHeroStory />;
      case 'science-seesaw':
        return <AutonomicSeeSawStory />;
      case 'science-surges':
        return <SurgesStory />;
      case 'science-sensorstack':
        return <SensorStackStory />;
      case 'science-neuromodulation':
        return <NeuromodulationStory />;
      case 'science-convergence':
        return <ConvergenceStory />;
      case 'science-chronobiology':
        return <ChronobiologyStory />;
      case 'science-sleeplab':
        return <SleepLabStory />;
      case 'science-psg':
        return <PsgConcordanceStory />;
      case 'science-comparison':
        return <ScienceComparisonStory />;

      default:
        return <ColorPrimitivesStory />;
    }
  };

  return (
    <div className={`storybook-app-root theme-${canvasTheme} mode-${activeTab}`}>
      <Sidebar activeStoryId={activeStoryId} onSelectStory={handleSelectStory} />

      <div className="storybook-main-area">
        <TopBar
          activeStoryId={activeStoryId}
          viewportMode={viewportMode}
          onSetViewportMode={setViewportMode}
          zoom={zoom}
          onSetZoom={setZoom}
          canvasTheme={canvasTheme}
          onToggleCanvasTheme={() => setCanvasTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
          showRulers={showRulers}
          onToggleRulers={() => setShowRulers(prev => !prev)}
          activeTab={activeTab}
          onSetActiveTab={setActiveTab}
        />

        <main className={`storybook-canvas-viewport ${viewportMode !== 'full' ? 'is-constrained' : ''}`}>
          <ResponsiveFrame mode={viewportMode} zoom={zoom} showRuler={showRulers}>
            <div className="story-content-container" data-theme={canvasTheme}>
              {renderActiveStory()}
            </div>
          </ResponsiveFrame>
        </main>
      </div>
    </div>
  );
}
