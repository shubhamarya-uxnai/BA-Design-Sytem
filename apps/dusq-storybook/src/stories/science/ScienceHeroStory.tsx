import React from 'react';
import { ScienceHero } from '@dusq-preview/components/science/ScienceHero';
import { DocsTable } from '../../components/DocsTable';

export function ScienceHeroStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <ScienceHero />
      </div>

      <DocsTable
        title="Science Hero & Autonomic Statement"
        description="The opening thesis of DUSQ's scientific foundation: 'Sleep happens according to your nervous system\'s capacity for it.' Features physiological domain badges (Autonomic Physiology, Vagus Neuromodulation, Evolutionary Biology), animated proof counters (25 nocturnal micro-arousals, 50M+ datapoints, CTRI/2026 registry), and immediate keyframe reveal for the hero wearable photography."
        componentPath="apps/dusq-preview/src/components/science/ScienceHero.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Section background (#FAF9F6)' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Primary editorial typography and headline' },
          { name: 'Muted Text', cssVar: '--muted', role: 'Physiological body copy (#564636)' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Telemetry badge accents' },
        ]}
      />
    </div>
  );
}
