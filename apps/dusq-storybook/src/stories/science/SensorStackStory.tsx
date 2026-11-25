import React from 'react';
import { SensorStackSection } from '@dusq-preview/components/science/SensorStackSection';
import { DocsTable } from '../../components/DocsTable';

export function SensorStackStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <SensorStackSection />
      </div>

      <DocsTable
        title="Hinter-Ear Sensor Stack · Unboxed Editorial Showcase"
        description="Features an unboxed, editorial hardware showcase presenting the exploded 3D engineering render of the 12g DUSQ One mastoid pod alongside 3 minimal, scannable sensor modalities (EDA, PPG, IMU) and an open 4-column metric strip. Eliminates nested card enclosures, messy floating callouts, and HUD topbars in favor of clean typographic clarity."
        componentPath="apps/dusq-preview/src/components/science/SensorStackSection.tsx"
        tokensUsed={[
          { name: 'Canvas Paper', cssVar: '--paper', role: 'Main background and editorial canvas' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Sensor titles, monumental metrics, and bold labels' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Category tags, active indicators, and spec icons' },
          { name: 'Muted Neutral', cssVar: '--muted', role: 'Secondary descriptions and subtle metadata' },
        ]}
      />
    </div>
  );
}
