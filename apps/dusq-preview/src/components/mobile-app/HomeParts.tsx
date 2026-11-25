import React, { useId } from 'react';
import type { NightStatus, WeekNight } from './state/checkInStore';

export function CircadianArc({ activeArc }: { activeArc: string }) {
  return (
    <div className="dusq-ambient-circadian-arc" aria-hidden="true">
      <svg width="24" height="240" viewBox="0 0 24 240" fill="none">
        <path d="M 2 10 A 180 180 0 0 1 2 230" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" />
        <path d={activeArc} stroke="var(--ba-color-themes-base-0)" strokeWidth="2.75" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function ChronoGreeting({ lead, name, onProfile }: { lead: string; name: string; onProfile: () => void }) {
  return (
    <div className="dusq-chrono-header">
      <div className="dusq-chrono-greeting">
        <span className="dusq-chrono-greeting__lead">{lead}</span>
        <h2 className="dusq-chrono-greeting__name">{name}</h2>
      </div>
      <button type="button" className="dusq-chrono-profile-btn" aria-label="Profile and DUSQ One hub" onClick={onProfile}>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>
    </div>
  );
}

const STATUS_TEXT: Record<NightStatus, string> = {
  checked: 'checked in',
  open: 'no check-in',
  tonight: 'tonight',
  upcoming: 'upcoming',
};

/** Non-punitive: missed nights look identical to upcoming ones — no red, no X. */
export function WeeklyConsistency({ week }: { week: WeekNight[] }) {
  const labelId = useId();
  return (
    <div className="dusq-weekly-consistency">
      <span id={labelId} className="dusq-consistency-label">Your nights this week</span>
      <ol className="dusq-consistency-days dusq-list-reset" aria-labelledby={labelId}>
        {week.map((n) => (
          <li key={n.key} className="dusq-day-slot">
            <div
              aria-hidden="true"
              className={`dusq-day-pill ${n.status === 'checked' ? 'is-checked' : 'is-upcoming'} ${
                n.status === 'tonight' ? 'is-tonight' : ''
              }`}
            >
              {n.status === 'checked' && (
                <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5l3.5 3.5L11 1" stroke="var(--ba-color-themes-base-900)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="dusq-day-letter" aria-hidden="true">{n.letter}</span>
            <span className="dusq-sr-only">{n.dayName}: {STATUS_TEXT[n.status]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BedsideEdgeTab({ onOpen }: { onOpen: () => void }) {
  return (
    <button type="button" className="dusq-bedside-edge-tab" aria-label="Open Bedside Glance mode" onClick={onOpen}>
      <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
      </svg>
    </button>
  );
}
