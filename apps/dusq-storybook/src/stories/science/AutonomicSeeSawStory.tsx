import React from 'react';
import { AutonomicSeeSaw } from '@dusq-preview/components/science/AutonomicSeeSaw';
import { DocsTable } from '../../components/DocsTable';

export function AutonomicSeeSawStory() {
  return (
    <div className="section-story-wrapper">
      <div className="isolated-component-canvas">
        <AutonomicSeeSaw />
      </div>

      <DocsTable
        title="The Nervous System See-Saw"
        description="Explains autonomic balance: the delicate equilibrium between sympathetic overdrive (fight-or-flight) and parasympathetic tone (rest-and-digest). Features a bespoke live-animated interactive SVG telemetry chart in 100% DUSQ Brand Colors (var(--orange) #E28C38 for Sympathetic Overdrive with flowing animated dash and deep espresso #1A1816 for Parasympathetic Dominance with restorative delta peaks), 6 interactive circadian milestone markers, a continuous sweeping playhead scrubber, sleep-state bar, and comparative mechanism cards."
        componentPath="apps/dusq-preview/src/components/science/AutonomicSeeSaw.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Section surface background' },
          { name: 'Cream Inset Surface', cssVar: '--cream', role: 'Physiological comparison card backgrounds' },
          { name: 'Primary Ink', cssVar: '--ink', role: 'Headlines and card titles' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Sympathetic curve stroke, gradient fill, and live telemetry beacons' },
          { name: 'Deep Night Espresso', cssVar: '--night', role: 'Parasympathetic curve stroke and sleep state indicator' },
        ]}
      />
    </div>
  );
}
