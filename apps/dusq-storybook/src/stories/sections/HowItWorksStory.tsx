import React from 'react';
import { HowItWorks } from '@dusq-preview/components/HowItWorks';
import { DocsTable } from '../../components/DocsTable';

export function HowItWorksStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <HowItWorks />
      </div>

      <DocsTable
        title="How It Works (Option C — Dark-Surface 2-Column Connected Stepper Spine)"
        description="Explains DUSQ's 3-stage closed-loop autonomic restoration sequence (01 Detect sleep breaks -> 02 Intervene adaptively -> 03 Stabilise deep sleep). Built on the DUSQ Design System dark canvas (var(--night) #111111, matching MeetTeam and ProductOne) with a connected 2-column editorial architecture: 58% left vertical stepper accordion spine where the active step expands inline with full narrative and takeaway chips, and 42% right compact dark-glass telemetry card with live status, subordinate 4:3 figure, and 3-metric bottom readout bar."
        componentPath="apps/dusq-preview/src/components/HowItWorks.tsx"
        tokensUsed={[
          { name: 'Canvas Night Neutral', cssVar: '--night', role: 'Main dark surface container (#111111)' },
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Headlines, active expanded story text, and light pill CTA' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Active step node, telemetry indicator dots, check icons, and key accents' },
          { name: 'Neutral 300 / Muted', cssVar: '--ba-primitive-color-tokens-neutral-300', role: 'Clinical secondary detail text, subtitles, and captions' },
          { name: 'Dark-Glass Overlays', cssVar: 'rgba(250, 248, 245, 0.04)', role: 'Translucent glass surfaces for cards, telemetry badge, and chips' },
        ]}
      />
    </div>
  );
}
