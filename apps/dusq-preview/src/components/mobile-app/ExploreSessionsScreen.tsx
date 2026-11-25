import React, { useState } from 'react';
import { Button, Chip } from '@dusq-design-system/react';
import type { MobileScreenId } from './types';
import { useVagalVoice, type VoiceOptions } from './audio/vagalAudioEngine';

interface ExploreSessionsScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
}

interface UnwindSession {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  category: 'calm' | 'delta';
  kind: 'calm' | 'delta' | 'primer';
  voice: VoiceOptions;
}

const SESSIONS: UnwindSession[] = [
  {
    id: 'calm',
    title: 'Evening Unwind 432 Hz',
    subtitle: 'Optional iPhone pink noise & soft harmonic tone for bedtime',
    duration: '12 min',
    category: 'calm',
    kind: 'calm',
    voice: {
      frequency: 432,
      toneLevel: 0.32,
      harmonicLevel: 0.08,
      noiseLevel: 0.55,
      noiseLowpassHz: 1300,
      attack: 2,
      release: 2,
    },
  },
  {
    id: 'delta',
    title: 'Deep Delta Soundscape',
    subtitle: 'Low-pass warm brown/pink noise masking bedroom disruptions',
    duration: '20 min',
    category: 'delta',
    kind: 'delta',
    voice: {
      frequency: 174,
      binauralBeatHz: 2.5,
      toneLevel: 0.2,
      harmonicLevel: 0.05,
      noiseLevel: 0.72,
      noiseLowpassHz: 780,
      attack: 2.5,
      release: 2.5,
    },
  },
  {
    id: 'induction',
    title: 'Sleep Link Breath Primer',
    subtitle: 'Guided cadence before switching to silent 0 dB nVNS overnight',
    duration: '8 min',
    category: 'calm',
    kind: 'primer',
    voice: {
      frequency: 432,
      toneLevel: 0.28,
      harmonicLevel: 0.06,
      noiseLevel: 0.35,
      noiseLowpassHz: 1100,
      attack: 1.5,
      release: 2,
    },
  },
];

function SessionBadgeIcon({ kind }: { kind: UnwindSession['kind'] }) {
  if (kind === 'delta') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  if (kind === 'primer') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 12h2M8 8v8M12 5v14M16 9v6M20 12h0" />
    </svg>
  );
}

/**
 * Explore Unwind Audio & Pre-Sleep Protocols Screen
 * Single clear action per card, >=44px touch targets, DUSQ dark-mode tokens.
 */
export function ExploreSessionsScreen({ onNavigate }: ExploreSessionsScreenProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'calm' | 'delta'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const voice = useVagalVoice('explore-session', 1.2);

  const filteredSessions = SESSIONS.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory,
  );

  const handleTogglePlay = async (session: UnwindSession) => {
    if (playingId === session.id) {
      voice.stop(1);
      setPlayingId(null);
      return;
    }
    setPlayingId(session.id);
    await voice.play(session.voice);
  };

  return (
    <div className="dusq-screen-scroll" data-theme="dark">
      {/* Header Copy */}
      <div className="dusq-greeting">
        <div>
          <div className="dusq-greeting__label">Evening Audio & Protocols</div>
          <h2 className="dusq-greeting__name">Unwind Library</h2>
          <div className="dusq-greeting__sub">Phone-guided pre-sleep soundscapes & DUSQ One routines</div>
        </div>
      </div>

      {/* Filter Tabs (>=44px accessible targets) */}
      <div className="dusq-chips-scroll" role="tablist" aria-label="Session categories">
        {(
          [
            { id: 'all', label: 'All Sessions' },
            { id: 'calm', label: 'Evening Unwind' },
            { id: 'delta', label: 'Deep Delta' },
          ] as const
        ).map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className="dusq-filter-chip-btn"
              onClick={() => setActiveCategory(cat.id)}
            >
              <Chip
                Type="Primary"
                Style={isSelected ? 'Filled' : 'Ghost'}
                Icon={false}
                chip={cat.label}
              />
            </button>
          );
        })}
      </div>

      {/* Session Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredSessions.map((session) => {
          const isPlaying = playingId === session.id;
          return (
            <div
              key={session.id}
              className={`apple-audio-card ${isPlaying ? 'apple-audio-card--playing' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: 0 }}>
                  <div className={`dusq-session-badge ${isPlaying ? 'is-playing' : ''}`}>
                    <SessionBadgeIcon kind={session.kind} />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--dusq-text-primary)', margin: 0 }}>
                      {session.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '12.5px',
                        color: isPlaying ? 'var(--ba-color-themes-primary-300)' : 'var(--dusq-text-secondary)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {session.subtitle}
                    </p>
                  </div>
                </div>

                <Chip
                  Type="Primary"
                  Style={isPlaying ? 'Filled' : 'Ghost'}
                  Icon={false}
                  chip={session.duration}
                />
              </div>

              {/* Bottom Row: Equalizer & Single Play/Pause Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--dusq-dark-surface-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <div className="dusq-sound-bars" aria-hidden="true">
                    <div className={`dusq-sound-bar ${isPlaying ? 'dusq-sound-bar--animated' : ''}`} />
                    <div className={`dusq-sound-bar ${isPlaying ? 'dusq-sound-bar--animated' : ''}`} />
                    <div className={`dusq-sound-bar ${isPlaying ? 'dusq-sound-bar--animated' : ''}`} />
                    <div className={`dusq-sound-bar ${isPlaying ? 'dusq-sound-bar--animated' : ''}`} />
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      color: isPlaying ? 'var(--ba-color-themes-primary-300)' : 'var(--dusq-text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {isPlaying ? 'Playing on iPhone · Phone speaker' : 'Phone audio · Pre-sleep wind-down'}
                  </span>
                </div>

                <Button
                  Type={isPlaying ? 'Ghost' : 'Primary'}
                  Size="Small"
                  Button={isPlaying ? 'Pause' : 'Play'}
                  aria-pressed={isPlaying}
                  aria-label={`${isPlaying ? 'Pause' : 'Play'} ${session.title}`}
                  {...{
                    'Leading Icon': true,
                    'leading-icon': isPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '1px' }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ),
                    'Tailing Icon': false,
                  }}
                  onClick={() => void handleTogglePlay(session)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Evening Home Destination Action */}
      <div style={{ marginTop: '4px' }}>
        <Button
          Type="Ghost"
          Size="Large"
          className="dusq-btn-full"
          Button="Evening Home"
          {...{
            'Leading Icon': true,
            'leading-icon': (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ),
            'Tailing Icon': false,
          }}
          onClick={() => onNavigate('home-evening')}
        />
      </div>
    </div>
  );
}
