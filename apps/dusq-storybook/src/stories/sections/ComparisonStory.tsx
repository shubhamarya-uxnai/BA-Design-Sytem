import React from 'react';
import { Comparison } from '@dusq-preview/components/Comparison';
import { DocsTable } from '../../components/DocsTable';

export function ComparisonStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <Comparison />
      </div>

      <DocsTable
        title="Comparison Table (DUSQ vs Trackers & Pulse Devices)"
        description="Head-to-head comparison table distinguishing DUSQ from passive sleep trackers (Whoop, Oura) and non-adaptive stimulators (Pulsetto). Employs an orange-accented column highlight using orange-0 and orange-800 token values to draw focus to DUSQ's real-time closed-loop sensing and stimulation advantages."
        componentPath="apps/dusq-preview/src/components/Comparison.tsx"
        tokensUsed={[
          { name: 'Primary Ink', cssVar: '--ink', role: 'Table header row background' },
          { name: 'Orange 800', cssVar: '--ba-primitive-color-tokens-orange-800', role: 'DUSQ header column highlight background' },
          { name: 'Orange 0', cssVar: '--ba-primitive-color-tokens-orange-0', role: 'DUSQ cell column tint background (#FFF8F0)' },
          { name: 'Neutral 200', cssVar: '--ba-primitive-color-tokens-neutral-200', role: 'Table horizontal divider borders' },
          { name: 'Neutral 250', cssVar: '--ba-primitive-color-tokens-neutral-250', role: 'Scroll container outer rounded border' },
        ]}
      />
    </div>
  );
}
