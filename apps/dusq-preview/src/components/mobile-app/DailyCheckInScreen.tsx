import React, { useEffect, useId, useRef, useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, InputField, Selection, IconButton } from '@dusq-design-system/react';
import {
  useCheckIns,
  lastNightKey,
  NOTE_MAX,
  type Feeling,
  type CognitiveTone,
} from './state/checkInStore';

interface DailyCheckInScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
}

const FEELINGS: Array<{ id: Feeling; label: string; desc: string; icon: string }> = [
  { id: 'rested', label: 'Rested & Grounded', desc: 'Deep recovery felt across the body', icon: '✨' },
  { id: 'refreshed', label: 'Refreshed', desc: 'Woke naturally without alarm shock', icon: '🌿' },
  { id: 'neutral', label: 'Neutral', desc: 'Balanced, steady morning pace', icon: '⚖️' },
  { id: 'groggy', label: 'Groggy', desc: 'Sleep inertia clearing slowly', icon: '☕' },
  { id: 'restless', label: 'Restless', desc: 'Frequent tossing or fragmented sleep', icon: '🌙' },
];

const TONES: Array<{ id: CognitiveTone; label: string }> = [
  { id: 'sharp', label: 'Sharp & Clear' },
  { id: 'calm', label: 'Calmly Focused' },
  { id: 'slow', label: 'Waking Up Slow' },
  { id: 'fog', label: 'Mild Brain Fog' },
];

export function DailyCheckInScreen({ onNavigate, onBack }: DailyCheckInScreenProps) {
  const { storedLastNight, consistency, save } = useCheckIns({ demoSeed: true });
  const [feeling, setFeeling] = useState<Feeling>(() => storedLastNight?.feeling ?? 'rested');
  const [tone, setTone] = useState<CognitiveTone>(() => storedLastNight?.tone ?? 'calm');
  const [note, setNote] = useState<string>(() => storedLastNight?.note ?? '');
  const [status, setStatus] = useState<'idle' | 'saved' | 'memory-only'>('idle');
  const submitting = useRef(false);
  const navTimer = useRef<number | undefined>(undefined);
  const uid = useId();
  const noteId = `${uid}-note`;
  const countId = `${uid}-count`;

  useEffect(() => () => window.clearTimeout(navTimer.current), []);

  const submit = () => {
    if (submitting.current) return; // guards double-fire if Button renders type="submit"
    submitting.current = true;
    const persisted = save({
      night: lastNightKey(),
      feeling,
      tone,
      note: note.trim().slice(0, NOTE_MAX),
      savedAt: Date.now(),
    });
    setStatus(persisted ? 'saved' : 'memory-only');
    navTimer.current = window.setTimeout(() => onNavigate('surges-telemetry'), 900);
  };

  const statusText =
    status === 'saved'
      ? 'Check-in saved on this device.'
      : status === 'memory-only'
        ? 'Check-in recorded for this session. Device storage is unavailable.'
        : '';

  return (
    <div className="dusq-screen-scroll dusq-checkin-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton Type="Ghost" Size="Small" icon="arrow_back" onClick={onBack} aria-label="Back to Home" />
        <h3 className="dusq-screen-top-bar__title">MORNING CHECK-IN</h3>
        {consistency !== null && (
          <Chip Type="Primary" Style="Ghost" Icon={false} chip={`${consistency}% Consistency`} />
        )}
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ marginTop: '4px', marginBottom: '18px' }}>
          <div className="dusq-hud-eyebrow">SUBJECTIVE SLEEP PERCEPTION</div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '6px 0 6px', color: 'var(--dusq-text-primary)' }}>
            How was last night?
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--dusq-text-secondary)', lineHeight: 1.48, margin: 0 }}>
            Sleep isn't a test. Rather than grading your night with an anxiety-inducing number, DUSQ asks how you
            actually feel this morning.
          </p>
        </div>

        <fieldset className="dusq-checkin-fieldset">
          <legend className="dusq-checkin-legend">1. Awakening physical state</legend>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {FEELINGS.map((f) => {
              const isSelected = feeling === f.id;
              return (
                // Container click is a pointer convenience; the Selection radio is the semantic control.
                <div
                  key={f.id}
                  className={`dusq-feeling-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setFeeling(f.id)}
                >
                  <span className="dusq-feeling-emoji" aria-hidden="true">{f.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dusq-text-primary)' }}>{f.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--dusq-text-secondary)', marginTop: '2px' }}>
                      {f.desc}
                    </div>
                  </div>
                  <Selection
                    Type="Radio"
                    Checked={isSelected}
                    showLabel={false}
                    onCheckedChange={() => setFeeling(f.id)}
                    aria-label={`${f.label}: ${f.desc}`}
                  />
                </div>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="dusq-checkin-fieldset">
          <legend id={`${uid}-tone-legend`} className="dusq-checkin-legend">2. Cognitive tone</legend>
          <div role="radiogroup" aria-labelledby={`${uid}-tone-legend`} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {TONES.map((t) => {
              const isSelected = tone === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className="dusq-chip-btn"
                  onClick={() => setTone(t.id)}
                >
                  <Chip Type="Primary" Style={isSelected ? 'Filled' : 'Ghost'} Icon={false} chip={t.label} />
                </button>
              );
            })}
          </div>
        </fieldset>

        <div style={{ marginBottom: '16px' }}>
          <InputField
            id={noteId}
            label="3. Optional reflection note"
            Label={true}
            input="e.g. Read 15 min, no late caffeine"
            value={note}
            Typed={note.length > 0}
            Button={false}
            aria-describedby={countId}
            {...{ 'Leading Icon': false, 'Tailing Icon': false }}
            onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
          />
          <span id={countId} className="dusq-checkin-counter">
            {note.length}/{NOTE_MAX} · Stored only on this device
          </span>
        </div>

        <div style={{ marginTop: '4px' }}>
          <Button
            Type="Primary"
            Size="Large"
            className="dusq-btn-full"
            Button={
              status !== 'idle'
                ? 'Check-in Saved'
                : storedLastNight
                  ? 'Update Check-in'
                  : 'Save Check-in'
            }
            {...{ 'Leading Icon': false, 'Tailing Icon': false }}
            onClick={submit}
          />
        </div>
      </form>

      <p className="dusq-sr-only" role="status" aria-live="polite">{statusText}</p>
    </div>
  );
}
