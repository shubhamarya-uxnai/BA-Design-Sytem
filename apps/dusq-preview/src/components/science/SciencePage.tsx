import React, { useEffect } from 'react';
import { ScienceHero } from './ScienceHero';
import { AutonomicSeeSaw } from './AutonomicSeeSaw';
import { SurgesSection } from './SurgesSection';
import { SensorStackSection } from './SensorStackSection';
import { NeuromodulationSection } from './NeuromodulationSection';
import { ConvergenceSection } from './ConvergenceSection';
import { ChronobiologySection } from './ChronobiologySection';
import { SleepLabSection } from './SleepLabSection';
import { PsgConcordanceSection } from './PsgConcordanceSection';
import { ScienceComparisonSection } from './ScienceComparisonSection';

interface SciencePageProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function SciencePage({ onNavigate }: SciencePageProps) {
  useEffect(() => {
    document.title = 'The Science of Sleep — DUSQ Design System';
    return () => {
      document.title = 'DUSQ Design System — React Preview';
    };
  }, []);

  return (
    <div className="science-page">
      <ScienceHero onNavigate={onNavigate} />
      <AutonomicSeeSaw />
      <SurgesSection />
      <SensorStackSection />
      <NeuromodulationSection />
      <ConvergenceSection />
      <ChronobiologySection onNavigate={onNavigate} />
      <SleepLabSection onNavigate={onNavigate} />
      <PsgConcordanceSection />
      <ScienceComparisonSection onNavigate={onNavigate} />
    </div>
  );
}
