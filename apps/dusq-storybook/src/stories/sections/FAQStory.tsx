import React from 'react';
import { FAQ } from '@dusq-preview/components/FAQ';
import { DocsTable } from '../../components/DocsTable';

export function FAQStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <FAQ />
      </div>

      <DocsTable
        title="FAQ Accordion"
        description="Frequently Asked Questions implemented with native semantic HTML <details> and <summary> elements. Includes custom Tabler IconPlus icons with a 45-degree CSS rotation transform upon expansion, keyboard accessibility, and warm neutral divider borders."
        componentPath="apps/dusq-preview/src/components/FAQ.tsx"
        tokensUsed={[
          { name: 'Primary Ink', cssVar: '--ink', role: 'Question summary typography in Helvetica Neue' },
          { name: 'Muted Text', cssVar: '--muted', role: 'Answer explanation text (#564636 / neutral-700)' },
          { name: 'Neutral 300', cssVar: '--ba-primitive-color-tokens-neutral-300', role: 'Accordion separator borders' },
          { name: 'Orange Accent', cssVar: '--orange', role: 'Keyboard focus ring on active accordion trigger' },
        ]}
      />
    </div>
  );
}
