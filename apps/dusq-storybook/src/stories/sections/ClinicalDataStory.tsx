import React from 'react';
import { ClinicalData } from '@dusq-preview/components/ClinicalData';
import { DocsTable } from '../../components/DocsTable';

export function ClinicalDataStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <ClinicalData />
      </div>

      <DocsTable
        title="Clinical Data & Evidence"
        description="Presents peer-reviewed clinical trial outcomes from CTRI-registered sham-controlled human trials. Features large display metrics in Plus Jakarta Sans with trend indicators (IconArrowUp / IconArrowDown), trial selector tabs (January 2026 vs May 2026), and polysomnography study summaries."
        componentPath="apps/dusq-preview/src/components/ClinicalData.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Section background and inactive tab fill' },
          { name: 'Cream Inset Surface', cssVar: '--cream', role: 'Metrics comparison panel background (#FAF8F5)' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Active trial tab background and large metric numbers' },
          { name: 'Neutral 300', cssVar: '--ba-primitive-color-tokens-neutral-300', role: 'Tab border' },
          { name: 'Muted Text', cssVar: '--muted', role: 'Clinical trial registry footnote and methodology note' },
        ]}
      />
    </div>
  );
}
