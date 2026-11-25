import React from 'react';
import { ChronobiologySection } from '@dusq-preview/components/science/ChronobiologySection';
import { DocsTable } from '../../components/DocsTable';

export function ChronobiologyStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <ChronobiologySection />
      </div>

      <DocsTable
        title="Three Ways Across the Night (Chronobiology)"
        description="Interactive chronobiology navigation rail and tabbed panels detailing DUSQ's adaptive intervention across the night: 7:00 PM The Evening (parasympathetic shift), 9:00 PM Sleep Onset (otolith rocking), and 11:00 PM Through the Night (closed-loop surge attenuation)."
        componentPath="apps/dusq-preview/src/components/science/ChronobiologySection.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Section surface background' },
          { name: 'Cream Inset Surface', cssVar: '--cream', role: 'Chronobiology active tab panel fill' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Timeline markers and headings' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Active timeline node and time badge' },
        ]}
      />
    </div>
  );
}
