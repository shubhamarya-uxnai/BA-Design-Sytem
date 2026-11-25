import React from 'react';
import { ScienceComparisonSection } from '@dusq-preview/components/science/ScienceComparisonSection';
import { DocsTable } from '../../components/DocsTable';

export function ScienceComparisonStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <ScienceComparisonSection />
      </div>

      <DocsTable
        title="Active Intervention vs Passive Wearables & Final CTA"
        description="Presents the 6-row architectural comparison matrix contrasting DUSQ's real-time closed-loop intervention against passive sleep rings and watches that only log poor sleep retroactively. Concludes with the final editorial CTA card featuring dual PillButtons linking to product pre-orders and clinical trials."
        componentPath="apps/dusq-preview/src/components/science/ScienceComparisonSection.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Matrix table background' },
          { name: 'DUSQ Column Highlight', cssVar: '#fcf6ef', role: 'DUSQ active column highlight tint' },
          { name: 'Deep Night', cssVar: '--night', role: 'Final editorial CTA block surface' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Checkmark icons and accent highlights' },
        ]}
      />
    </div>
  );
}
