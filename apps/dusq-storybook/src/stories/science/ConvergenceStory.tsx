import React from 'react';
import { ConvergenceSection } from '@dusq-preview/components/science/ConvergenceSection';
import { DocsTable } from '../../components/DocsTable';

export function ConvergenceStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <ConvergenceSection />
      </div>

      <DocsTable
        title="Closed-Loop Bioelectronic Convergence Console"
        description="Features a modern 2-column architectural console uniting the 3D mastoid convergence video in its natural portrait ratio (4 / 4.4) on the left with an interactive 4-stage closed-loop neural pipeline (01 Sense -> 02 Classify -> 03 Modulate -> 04 Stabilize) on the right. Includes a dynamic anatomical locus HUD overlay, auto-cycling progress bars (3.5s per stage), continuous overnight return loop bar, and an integrated 4-pillar hairline telemetry footer."
        componentPath="apps/dusq-preview/src/components/science/ConvergenceSection.tsx"
        tokensUsed={[
          { name: 'Paper White Surface', cssVar: '--paper', role: 'Main console showcase container (#FFFFFF)' },
          { name: 'Deep Night Espresso', cssVar: '--night', role: 'Active stage card surface (#111111) and topbar' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Active borders, locus code, progress fill, and radar pulses (#E28C38)' },
          { name: 'Warm Cream Wash', cssVar: '--cream', role: 'Bottom 4-pillar telemetry strip surface' },
          { name: 'Neutral 200 Border', cssVar: '--ba-primitive-color-tokens-neutral-200', role: 'Hairline console borders and dividers' },
        ]}
      />
    </div>
  );
}
