import React from 'react';
import { Footer } from '@dusq-preview/components/Footer';
import { DocsTable } from '../../components/DocsTable';

export function FooterStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <Footer />
      </div>

      <DocsTable
        title="Footer"
        description="The terminal block of the DUSQ website. Built on deep ink background with brand logo, large Helvetica Neue tagline ('Better nights begin with a quieter system.'), responsive navigation links with external outbound arrow indicator, and design system preview metadata."
        componentPath="apps/dusq-preview/src/components/Footer.tsx"
        tokensUsed={[
          { name: 'Primary Ink', cssVar: '--ink', role: 'Footer background (#1A1816 / neutral-900)' },
          { name: 'Paper White Text', cssVar: '--paper', role: 'Headline and primary link text' },
          { name: 'Border Subtle Dark', cssVar: '#45403b', role: 'Horizontal footer divider stroke' },
          { name: 'Orange Accent', cssVar: '--orange', role: 'Focus states' },
        ]}
      />
    </div>
  );
}
