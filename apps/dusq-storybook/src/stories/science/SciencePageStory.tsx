import React from 'react';
import { Header } from '@dusq-preview/components/Header';
import { SciencePage } from '@dusq-preview/components/science/SciencePage';
import { Footer } from '@dusq-preview/components/Footer';
import { DocsTable } from '../../components/DocsTable';

export function SciencePageStory() {
  return (
    <div className="section-story-wrapper all-sections-story">
      <div className="isolated-component-canvas full-page-canvas">
        <Header currentPath="/pages/science" />
        <main>
          <SciencePage />
        </main>
        <Footer currentPath="/pages/science" />
      </div>

      <DocsTable
        title="DUSQ Science Page (Full Composition)"
        description="The complete 10-section deep dive into DUSQ's autonomic neurobiology and closed-loop sleep science (/pages/science). Integrates autonomic physiology, sympathetic micro-surges, the hinter-ear EDA+PPG sensor stack, dual non-invasive neuromodulation (nVNS and nVEnS), chronobiology pathways, physical 7-bed sleep lab protocols, polysomnography (PSG) 94.2% gold standard concordance, and active vs passive wearable matrix."
        componentPath="apps/dusq-preview/src/components/science/SciencePage.tsx"
        tokensUsed={[
          { name: 'Canvas Paper White', cssVar: '--paper', role: 'Editorial document background' },
          { name: 'Canvas Cream Inset', cssVar: '--cream', role: 'Telemetry and data panel backgrounds' },
          { name: 'Deep Night', cssVar: '--night', role: 'Hardware convergence and final CTA stage' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange', role: 'Active telemetry cues and primary buttons' },
          { name: 'Plus Jakarta Display', cssVar: 'Plus Jakarta Sans', role: 'Authentic clinical headlines and proof counters' },
        ]}
      />
    </div>
  );
}
