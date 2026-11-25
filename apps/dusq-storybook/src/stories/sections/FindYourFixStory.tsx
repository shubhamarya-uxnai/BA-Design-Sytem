import React from 'react';
import { FindYourFix } from '@dusq-preview/components/FindYourFix';
import { DocsTable } from '../../components/DocsTable';

export function FindYourFixStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <FindYourFix />
      </div>

      <DocsTable
        title="Find Your Fix (Sleep Problem Selector)"
        description="Diagnostic questionnaire section addressing specific nervous system manifestations: 'Can't fall asleep', 'Waking at 3 AM', 'Tired after 8 hours', and 'All 3'. Includes interactive tab buttons with smooth focus states, an icon slot housing the neuromodulation wave, split-panel explanation with reason vs DUSQ response, and process tag pills (DETECT, INTERVENE, STABILISE)."
        componentPath="apps/dusq-preview/src/components/FindYourFix.tsx"
        tokensUsed={[
          { name: 'Canvas White Surface', cssVar: '--paper', role: 'Find section background (#FFFFFF)' },
          { name: 'Cream Inset Surface', cssVar: '--cream', role: 'Diagnostic split-panel background (#FAF8F5 / neutral-0)' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Active tab background and primary title' },
          { name: 'Neutral 300', cssVar: '--ba-primitive-color-tokens-neutral-300', role: 'Inactive tab pill stroke' },
          { name: 'Orange Accent', cssVar: '--orange', role: 'Wave sine icon fill and keyboard focus rings' },
        ]}
        props={[
          {
            name: 'selected (internal state)',
            type: 'number (0..3)',
            defaultValue: '0',
            description: 'Active tab index matching problems array in content.ts',
          },
        ]}
      />
    </div>
  );
}
