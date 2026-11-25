import React from 'react';
import { NeuromodulationSection } from '@dusq-preview/components/science/NeuromodulationSection';
import { DocsTable } from '../../components/DocsTable';

export function NeuromodulationStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <NeuromodulationSection />
      </div>

      <DocsTable
        title="Evolutionary Neuromodulation (nVNS & nVEnS)"
        description="Presents DUSQ's dual non-invasive neuromodulation mechanisms: Stochastic Vestibular Stimulation (nVEnS) via otolith rocking and Non-Invasive Vagus Nerve Stimulation (nVNS) via the auricular branch of the vagus nerve. Features dual local interactive video players (/science/vestibular-nvens.mp4 and /science/vagal-nvns.mp4) with play/pause controls."
        componentPath="apps/dusq-preview/src/components/science/NeuromodulationSection.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Section surface background' },
          { name: 'Deep Night Stage', cssVar: '--night', role: 'Video container background' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Mechanism titles and body text' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Mechanism tags and active state indicators' },
        ]}
      />
    </div>
  );
}
