import { useMemo, useSyncExternalStore } from 'react';

export type Feeling = 'rested' | 'refreshed' | 'neutral' | 'groggy' | 'restless';
export type CognitiveTone = 'sharp' | 'calm' | 'slow' | 'fog';

export interface CheckInEntry {
  /** Local date (YYYY-MM-DD) of the evening the night began. */
  night: string;
  feeling: Feeling;
  tone: CognitiveTone;
  note: string;
  savedAt: number;
}

export type NightStatus = 'checked' | 'open' | 'tonight' | 'upcoming';

export interface WeekNight {
  key: string;
  letter: string;
  dayName: string;
  status: NightStatus;
}

type Entries = Readonly<Record<string, CheckInEntry>>;

const STORAGE_KEY = 'dusq.checkins.v1';
const MAX_ENTRIES = 120;
export const NOTE_MAX = 280;

const FEELINGS: readonly Feeling[] = ['rested', 'refreshed', 'neutral', 'groggy', 'restless'];
const TONES: readonly CognitiveTone[] = ['sharp', 'calm', 'slow', 'fog'];
const LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const EMPTY: Entries = Object.freeze({});

/* ---------- Local-date helpers (never toISOString: UTC shifts IST dates) ---------- */

const pad = (n: number) => String(n).padStart(2, '0');
export const toNightKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (k: string) => {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d: Date, n: number) => {
  const c = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  c.setDate(c.getDate() + n);
  return c;
};
const daysBetween = (a: string, b: string) =>
  Math.round((fromKey(b).getTime() - fromKey(a).getTime()) / 86_400_000);

/** A morning check-in always reflects the night that began yesterday evening. */
export const lastNightKey = (now = new Date()) => toNightKey(addDays(now, -1));

/* ---------- Store ---------- */

let cacheLoaded = false;
let cacheEntries: Entries = EMPTY;
const listeners = new Set<() => void>();

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // Safari private mode, disabled storage, etc.
  }
}

function parse(raw: string | null): Entries {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw) as { v?: number; entries?: Record<string, Partial<CheckInEntry>> };
    if (!data || data.v !== 1 || typeof data.entries !== 'object' || data.entries === null) return EMPTY;
    const out: Record<string, CheckInEntry> = {};
    for (const [key, e] of Object.entries(data.entries)) {
      if (
        /^\d{4}-\d{2}-\d{2}$/.test(key) &&
        e &&
        FEELINGS.includes(e.feeling as Feeling) &&
        TONES.includes(e.tone as CognitiveTone)
      ) {
        out[key] = {
          night: key,
          feeling: e.feeling as Feeling,
          tone: e.tone as CognitiveTone,
          note: typeof e.note === 'string' ? e.note.slice(0, NOTE_MAX) : '',
          savedAt: Number(e.savedAt) || 0,
        };
      }
    }
    return Object.freeze(out);
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): Entries {
  if (typeof window === 'undefined') return EMPTY;
  if (!cacheLoaded) {
    cacheEntries = parse(readRaw());
    cacheLoaded = true;
  }
  return cacheEntries;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      cacheLoaded = false; // another tab wrote — re-read lazily
      cb();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

/** Returns true when persisted to localStorage, false when kept in memory only. */
export function saveCheckIn(entry: CheckInEntry): boolean {
  const next: Record<string, CheckInEntry> = { ...getSnapshot(), [entry.night]: entry };
  const keys = Object.keys(next).sort();
  while (keys.length > MAX_ENTRIES) delete next[keys.shift() as string];

  let persisted = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, entries: next }));
  } catch {
    persisted = false;
  }
  cacheEntries = Object.freeze(next);
  cacheLoaded = true;
  listeners.forEach((l) => l());
  return persisted;
}

export function clearCheckIns() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
  cacheEntries = EMPTY;
  cacheLoaded = true;
  listeners.forEach((l) => l());
}

/* ---------- Derived views ---------- */

/** Preview-only history: 26 of the last 30 nights (= 87%). Never written to storage. */
const DEMO_GAPS = new Set([5, 11, 18, 26]);
function demoEntries(now: Date): Record<string, CheckInEntry> {
  const out: Record<string, CheckInEntry> = {};
  for (let off = 1; off <= 30; off++) {
    if (DEMO_GAPS.has(off)) continue;
    const key = toNightKey(addDays(now, -off));
    out[key] = { night: key, feeling: 'rested', tone: 'calm', note: '', savedAt: 0 };
  }
  return out;
}

export function buildWeek(entries: Entries, now = new Date()): WeekNight[] {
  const todayKey = toNightKey(now);
  const monday = addDays(now, -((now.getDay() + 6) % 7));
  return LETTERS.map((letter, i) => {
    const d = addDays(monday, i);
    const key = toNightKey(d);
    const status: NightStatus = entries[key]
      ? 'checked'
      : key < todayKey
        ? 'open'
        : key === todayKey
          ? 'tonight'
          : 'upcoming';
    return { key, letter, dayName: d.toLocaleDateString(undefined, { weekday: 'long' }), status };
  });
}

/** Share of nights with a check-in over the trailing 30 (or since first use). */
export function consistencyPercent(entries: Entries, now = new Date()): number | null {
  const keys = Object.keys(entries).sort();
  if (keys.length === 0) return null;
  const last = lastNightKey(now);
  const windowStart = toNightKey(addDays(now, -30));
  const first = keys[0] > windowStart ? keys[0] : windowStart;
  const span = Math.max(1, daysBetween(first, last) + 1);
  const count = keys.filter((k) => k >= first && k <= last).length;
  return Math.round(Math.min(1, count / span) * 100);
}

export function useCheckIns({ demoSeed = false }: { demoSeed?: boolean } = {}) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  return useMemo(() => {
    const now = new Date();
    const entries: Entries = demoSeed ? { ...demoEntries(now), ...stored } : stored;
    return {
      entries,
      isDemo: demoSeed,
      week: buildWeek(entries, now),
      consistency: consistencyPercent(entries, now),
      /** Real (non-demo) entry for last night, for hydrating the form. */
      storedLastNight: stored[lastNightKey(now)] ?? null,
      save: saveCheckIn,
      clear: clearCheckIns,
    };
  }, [stored, demoSeed]);
}
