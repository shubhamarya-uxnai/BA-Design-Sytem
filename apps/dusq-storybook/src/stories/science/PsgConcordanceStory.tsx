import React from 'react';
import { PsgConcordanceSection } from '@dusq-preview/components/science/PsgConcordanceSection';
import { DocsTable } from '../../components/DocsTable';

export function PsgConcordanceStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <PsgConcordanceSection />
      </div>

      <DocsTable
        title="Polysomnography (PSG) Gold Standard Concordance"
        description="Highlights the 94.2% epoch-by-epoch concordance against board-certified clinical polysomnography (PSG) scoring. Features an animated 94.2% proof metric card and 4-channel montage telemetry cards (EEG, EOG, EMG, ECG & EDA) demonstrating physiological fidelity."
        componentPath="apps/dusq-preview/src/components/science/PsgConcordanceSection.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Section background' },
          { name: 'Cream Inset Surface', cssVar: '--cream', role: 'Concordance proof card and telemetry card backgrounds' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Large 94.2% metric number and headlines' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Telemetry channel active status icons' },
        ]}
      />
    </div>
  );
}
