import React from 'react';
import { Hero } from '@dusq-preview/components/Hero';
import { DocsTable } from '../../components/DocsTable';

export function HeroStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <Hero />
      </div>

      <DocsTable
        title="Hero & Masthead"
        description="The opening statement of DUSQ. Features an asymmetrical grid layout with a high-impact Display headline in Plus Jakarta Sans (va-text-title-large: 60px desktop -> 40px mobile), dual PillButtons (Primary Dark + Secondary Light), an eyebrow label with letter spacing, a 31% deep sleep clinical metric, and full-bleed photography of the behind-the-ear wearable."
        componentPath="apps/dusq-preview/src/components/Hero.tsx"
        tokensUsed={[
          { name: 'Canvas Cream', cssVar: '--cream', role: 'Hero section background (#FAF8F5 / neutral-0)' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Main title and primary pill background' },
          { name: 'Muted Text', cssVar: '--muted', role: 'Hero explanatory body copy (#564636 / neutral-700)' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Focus outlines and active hover accent' },
          { name: 'Neutral 250', cssVar: '--ba-primitive-color-tokens-neutral-250', role: 'Hairline metric top divider' },
        ]}
      />
    </div>
  );
}
