import React from 'react';
import { BrandsTicker } from '@dusq-preview/components/BrandsTicker';
import { DocsTable } from '../../components/DocsTable';

export function BrandsTickerStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <BrandsTicker />
      </div>

      <DocsTable
        title="Featured Press & Media Ticker"
        description="Infinite horizontal marquee showcasing editorial press and media logos (Business Insider, Digital Journal, Forbes, The Economic Times, Apple News). Features continuous linear velocity with smooth CSS keyframes, pause-on-hover interaction, duplicate aria-hidden clone groups for seamless looping, and automatic fallback handling."
        componentPath="apps/dusq-preview/src/components/BrandsTicker.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Section background' },
          { name: 'Muted Text', cssVar: '--muted', role: 'Eyebrow label text (#564636 / neutral-700)' },
          { name: 'Neutral 200', cssVar: '--ba-primitive-color-tokens-neutral-200', role: 'Subtle boundary dividers' },
          { name: 'Eyebrow Style', cssVar: '.eyebrow', role: 'Uppercase tracked metadata typography' },
        ]}
      />
    </div>
  );
}
