import React from 'react';
import { MeetTeam } from '@dusq-preview/components/MeetTeam';
import { DocsTable } from '../../components/DocsTable';

export function MeetTeamStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <MeetTeam />
      </div>

      <DocsTable
        title="Meet the Team / Founder Origin Story"
        description="A dark espresso editorial origin story featuring Dr Siddhant Bhargava's founding clinical journey. Built on deep espresso ink (#13110f / neutral-950) with 3 sourced beats (paper lead, sandstone support, amber turning point), a restrained pull quote with an orange hairline, a 4:5 face-safe portrait (object-position 78% 16%), and a full-width fine-hairline frosted caption rail."
        componentPath="apps/dusq-preview/src/components/MeetTeam.tsx"
        tokensUsed={[
          { name: 'Night Surface', cssVar: '--night', role: 'Deep night espresso background (#13110f / neutral-950)' },
          { name: 'Paper Text', cssVar: '--paper', role: 'High contrast text and lead beat (#FAF8F5 / neutral-0)' },
          { name: 'Orange 200', cssVar: '--ba-primitive-color-tokens-orange-200', role: 'Warm orange eyebrow on dark surfaces' },
          { name: 'Orange Accent', cssVar: '--orange', role: 'Quote accent bar, eyebrow dot, and turning point highlight' },
          { name: 'Neutral 300', cssVar: '--ba-primitive-color-tokens-neutral-300', role: 'Sandstone support beat and caption meta' },
          { name: 'Neutral 200', cssVar: '--ba-primitive-color-tokens-neutral-200', role: 'Secondary body text in dark mode' },
        ]}
      />
    </div>
  );
}
