import React, { useEffect } from 'react';
import { SleepLabHero } from './SleepLabHero';
import { SleepLabWhyBuilt } from './SleepLabWhyBuilt';
import { SleepLabFirstNight } from './SleepLabFirstNight';
import { SleepLabGroundTruth } from './SleepLabGroundTruth';
import { SleepLabDomesticSuite } from './SleepLabDomesticSuite';
import { SleepLabResearchConsole } from './SleepLabResearchConsole';
import { SleepLabStandardsCta } from './SleepLabStandardsCta';
import './sleep-lab.css';

interface SleepLabPageProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function SleepLabPage({ onNavigate }: SleepLabPageProps) {
  useEffect(() => {
    document.title = 'The Sleep Lab — DUSQ Clinical Research Facility';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = 'DUSQ Design System — React Preview';
    };
  }, []);

  return (
    <div className="sleep-lab-page">
      <SleepLabHero onNavigate={onNavigate} />
      <SleepLabWhyBuilt />
      <SleepLabFirstNight />
      <SleepLabGroundTruth />
      <SleepLabDomesticSuite />
      <SleepLabResearchConsole />
      <SleepLabStandardsCta onNavigate={onNavigate} />
    </div>
  );
}
