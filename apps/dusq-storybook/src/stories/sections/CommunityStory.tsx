import React from 'react';
import { Community } from '@dusq-preview/components/Community';
import { DocsTable } from '../../components/DocsTable';

export function CommunityStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <Community />
      </div>

      <DocsTable
        title="Community & Testimonials"
        description="Showcases real sleep recovery stories from the DUSQ cohort. Features an interactive 4-tile organic floating cards grid with stagger animations (card-float 5.5s), flex expansion on hover/focus (flex: 1.6), subtle gradient overlays with legible white typography, and step-indicator carousel controls."
        componentPath="apps/dusq-preview/src/components/Community.tsx"
        tokensUsed={[
          { name: 'Canvas Cream', cssVar: '--cream', role: 'Section surface background (#FAF8F5 / neutral-0)' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Tile fallback background and carousel active step fill' },
          { name: 'Neutral 300', cssVar: '--ba-primitive-color-tokens-neutral-300', role: 'Carousel inactive step track' },
          { name: 'Neutral 400', cssVar: '--ba-primitive-color-tokens-neutral-400', role: 'Carousel circular next arrow border' },
          { name: 'Orange Accent', cssVar: '--orange', role: 'Focus outlines on interactive tiles and buttons' },
        ]}
      />
    </div>
  );
}
