import React from 'react';
import type { MobileScreenId, ChronoCard } from './types';
import { ChronoCardStack } from './ChronoCardStack';
import { BedsideEdgeTab, ChronoGreeting, CircadianArc, WeeklyConsistency } from './HomeParts';
import { useCheckIns } from './state/checkInStore';

interface EveningHomeScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  batteryPercent?: number;
}

const EVENING_CARDS: ChronoCard[] = [
  { id: 'recap', timeTag: 'Last night', title: 'Your Night,\nRecapped', ctaText: 'View Recap →', image: '/mobile/cards/card_recap.png', screenTarget: 'surges-telemetry', mode: 'evening' },
  { id: 'winddown', timeTag: '06:30 PM', title: 'Evening\nWind-Down', ctaText: 'Begin →', image: '/mobile/cards/card_winddown.png', screenTarget: 'wind-down', mode: 'evening' },
  { id: 'readiness', timeTag: '07:00 PM', title: 'Sleep Readiness\nSession', ctaText: 'Begin →', image: '/mobile/cards/card_readiness.png', screenTarget: 'readiness', mode: 'evening' },
];

export function EveningHomeScreen({ onNavigate }: EveningHomeScreenProps) {
  const { week } = useCheckIns({ demoSeed: true });

  return (
    <div className="dusq-screen-scroll dusq-chrono-home" data-theme="dark">
      <CircadianArc activeArc="M 2 110 A 180 180 0 0 1 2 165" />
      <ChronoGreeting lead="Good evening" name="Christopher" onProfile={() => onNavigate('hardware-hub')} />

      <div className="dusq-chrono-metrics-row">
        <WeeklyConsistency week={week} />
        <button
          type="button"
          className="dusq-readiness-squircle"
          onClick={() => onNavigate('readiness')}
          aria-label="Sleep readiness 12 percent. Open readiness session."
        >
          <div className="dusq-readiness-value" aria-hidden="true">
            <strong>12</strong>
            <span>%</span>
          </div>
          <span className="dusq-readiness-label" aria-hidden="true">Readiness</span>
        </button>
      </div>

      <BedsideEdgeTab onOpen={() => onNavigate('bedside-glance')} />

      <ChronoCardStack
        cards={EVENING_CARDS}
        label="Evening cards"
        onOpen={(card) => onNavigate(card.screenTarget)}
      />
    </div>
  );
}
