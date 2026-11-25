import React from 'react';
import { SurgesSection } from '@dusq-preview/components/science/SurgesSection';
import { DocsTable } from '../../components/DocsTable';

export function SurgesStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <SurgesSection />
      </div>

      <DocsTable
        title="Surges: The Invisible Determinants of Sleep Quality"
        description="Highlights the clinical discovery of 20-30 nocturnal sympathetic micro-surges pulling the brain from restorative delta sleep into shallow stages. Features the Nature (Herberger et al., 2025) peer-reviewed benchmark citation card, a bespoke live-animated interactive SVG waveform chart with 4 diminishing sleep-depth cycles, 7 sympathetic disruption pillars with illuminated micro-arousal icon badges, sweeping telemetry playhead, and clinical metric callouts."
        componentPath="apps/dusq-preview/src/components/science/SurgesSection.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Main container surface' },
          { name: 'Canvas Cream Inset', cssVar: '--cream', role: 'Citation card and telemetry panel fills' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Card headlines and metric values' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Sympathetic surge waveform, pillar highlights, and live telemetry beacons' },
          { name: 'Deep Night Espresso', cssVar: '--night', role: 'Nature benchmark citation card surface' },
        ]}
      />
    </div>
  );
}
