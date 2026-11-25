import React from 'react';
import { SleepLabSection } from '@dusq-preview/components/science/SleepLabSection';
import { DocsTable } from '../../components/DocsTable';

export function SleepLabStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <SleepLabSection />
      </div>

      <DocsTable
        title="Physical Sleep Lab & Validation Protocol"
        description="Showcases DUSQ's dedicated 7-bed physical sleep laboratory (/science/sleep-lab-bg.png) where all algorithms and hardware iterations originate. Outlines the 4-stage scientific protocol (Collection -> Processing -> Validation -> Publication) and clinical registry credentials (1,200+ nights analyzed, CTRI/2026 registered)."
        componentPath="apps/dusq-preview/src/components/science/SleepLabSection.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Main container surface' },
          { name: 'Deep Night Wash', cssVar: '--night', role: 'Atmospheric laboratory photo overlay' },
          { name: 'Cream Inset Surface', cssVar: '--cream', role: 'Protocol breakdown step panels' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Facility metric accents' },
        ]}
      />
    </div>
  );
}
