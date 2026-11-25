import React from 'react';
import { Header } from '@dusq-preview/components/Header';
import { SleepLabPage } from '@dusq-preview/components/sleep-lab/SleepLabPage';
import { Footer } from '@dusq-preview/components/Footer';
import { DocsTable } from '../../components/DocsTable';

export function TheSleepLabPageStory() {
  return (
    <div className="section-story-wrapper all-sections-story">
      <div className="isolated-component-canvas full-page-canvas">
        <Header currentPath="/pages/the-sleep-lab" />
        <main>
          <SleepLabPage />
        </main>
        <Footer currentPath="/pages/the-sleep-lab" />
      </div>

      <DocsTable
        title="DUSQ The Sleep Lab (Full Dedicated Page)"
        description="The dedicated clinical sleep laboratory page (/pages/the-sleep-lab) detailing why DUSQ built its own 7-bed facility, solving the clinical First-Night Effect (FNE), establishing 32-channel polysomnography (PSG) + research EDA ground truth, replicating domestic bedrooms with continuous bedside telemetry, executing the 4-question active validation console, and publishing verified peer-reviewed white papers and clinical trials."
        componentPath="apps/dusq-preview/src/components/sleep-lab/SleepLabPage.tsx"
        tokensUsed={[
          { name: 'Warm Cream Canvas', cssVar: '--cream', role: 'Editorial background & domestic suite surfaces' },
          { name: 'Paper White', cssVar: '#FFFFFF', role: 'Pillars, comparison cards, and publication blocks' },
          { name: 'Deep Night', cssVar: '--night', role: 'Hero stage, PSG console, bedside telemetry & credo card' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Primary status indicators, pulses, and callouts' },
          { name: 'Plus Jakarta Display', cssVar: 'Plus Jakarta Sans', role: 'Editorial headlines, counters, and callout titles' },
        ]}
      />
    </div>
  );
}
