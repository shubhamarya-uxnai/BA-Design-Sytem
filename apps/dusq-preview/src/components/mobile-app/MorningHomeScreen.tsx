import React from 'react';
import type { MobileScreenId, ChronoCard } from './types';
import { ChronoCardStack } from './ChronoCardStack';
import { BedsideEdgeTab, ChronoGreeting, CircadianArc, WeeklyConsistency } from './HomeParts';
import { useCheckIns } from './state/checkInStore';

interface MorningHomeScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  batteryPercent?: number;
}

const MORNING_CARDS: ChronoCard[] = [
  { id: 'checkin', timeTag: 'Check-in', title: 'How was last\nnight?', ctaText: 'Start →', image: '/mobile/cards/card_checkin.png', screenTarget: 'daily-checkin', mode: 'morning' },
  { id: 'surges', timeTag: 'New', title: 'Introducing\nSurges', ctaText: 'Start →', image: '/mobile/cards/card_surges.png', screenTarget: 'surges-telemetry', mode: 'morning' },
];

export function MorningHomeScreen({ onNavigate }: MorningHomeScreenProps) {
  const { week } = useCheckIns({ demoSeed: true });

  return (
    <div className="dusq-screen-scroll dusq-chrono-home" data-theme="dark">
      <CircadianArc activeArc="M 2 20 A 180 180 0 0 1 2 75" />
      <ChronoGreeting lead="Good morning" name="Christopher" onProfile={() => onNavigate('hardware-hub')} />

      <div className="dusq-chrono-metrics-row">
        <WeeklyConsistency week={week} />
        <button
          type="button"
          className="dusq-readiness-squircle dusq-dusk-squircle"
          onClick={() => onNavigate('hardware-hub')}
          aria-label="Device ready. Dusk awaits. Open hardware hub."
        >
          <div className="dusq-pod-glyph is-small" aria-hidden="true">
            <span className="pod-dot pod-dot-1" />
            <span className="pod-dot pod-dot-2" />
          </div>
          <span className="dusq-readiness-label dusq-dusk-label" aria-hidden="true">
            Dusk awaits
          </span>
        </button>
      </div>

      <BedsideEdgeTab onOpen={() => onNavigate('bedside-glance')} />

      <ChronoCardStack
        cards={MORNING_CARDS}
        label="Morning cards"
        onOpen={(card) => onNavigate(card.screenTarget)}
      />
    </div>
  );
}
