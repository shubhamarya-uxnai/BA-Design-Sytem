import React from 'react';
import { Header } from '@dusq-preview/components/Header';
import { DocsTable } from '../../components/DocsTable';

export function HeaderStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <Header />
      </div>

      <DocsTable
        title="Header (Navigation & Action)"
        description="The signature primary navigational bar for DUSQ. In dark ink mode, features brand typography with orange dot accent, center-aligned navigation links for the 3 website pages (Home, Science, Sleep Labs) with active/hover underline transitions, a separate dedicated link for Application, a compact 40px PillButton action for 'Find your fix', and an accessible hamburger/close toggle menu for mobile screens."
        componentPath="apps/dusq-preview/src/components/Header.tsx"
        tokensUsed={[
          { name: 'Primary Ink', cssVar: '--ink', role: 'Header background (rgba(26, 24, 22, 0.94) / #1A1816)' },
          { name: 'Canvas Paper', cssVar: '--paper', role: 'Navigation text color (#FAF8F5 / neutral-0)' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Brand logo dot accent and active underline (#DF6738 / orange-400)' },
          { name: 'Neutral 200', cssVar: '--ba-primitive-color-tokens-neutral-200', role: 'Mobile menu separator borders' },
        ]}
        props={[
          {
            name: 'open (internal)',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Toggles mobile navigation overlay via Menu / Close trigger button',
          },
        ]}
      />
    </div>
  );
}
