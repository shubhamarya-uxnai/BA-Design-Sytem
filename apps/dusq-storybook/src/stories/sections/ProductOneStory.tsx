import React from 'react';
import { ProductOne } from '@dusq-preview/components/ProductOne';
import { DocsTable } from '../../components/DocsTable';

export function ProductOneStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <ProductOne />
      </div>

      <DocsTable
        title="Product One (Hardware Gallery & Specs)"
        description="The primary hardware presentation section for the DUSQ One wearable. Features an interactive 4-shot image gallery with active thumbnail borders, clear benefit pills (Behind-the-ear fit, EDA + PPG sensing, Overnight on-device operation), and an external outbound PillButton directing users to the pre-order PDP."
        componentPath="apps/dusq-preview/src/components/ProductOne.tsx"
        tokensUsed={[
          { name: 'Canvas White Surface', cssVar: '--paper', role: 'Section white background' },
          { name: 'Cream Inset Surface', cssVar: '--cream', role: 'Product hero image and thumbnail container background' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Main product title and selected thumbnail active border' },
          { name: 'Neutral 300', cssVar: '--ba-primitive-color-tokens-neutral-300', role: 'Hardware feature pill stroke border' },
          { name: 'Muted Text', cssVar: '--muted', role: 'Pre-order shipping notification text' },
        ]}
      />
    </div>
  );
}
