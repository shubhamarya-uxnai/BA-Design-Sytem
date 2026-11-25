# DUSQ Master Architecture, Design Decisions & Source Codebase Dossier

> **Specification & Implementation Dossier for Fable 5.2**  
> **Project:** DUSQ Neurotechnology — Design System, Digital Experience & Chrono-Adaptive Companion Mobile Application  
> **Scientific & Design Foundation:** Dr. Siddhant Bhargava (Founder & CEO) & Yashabh Srivastava (Head of Design)  
> **Codebase Target:** `@dusq-design-system/react`, `apps/dusq-preview`, `apps/dusq-storybook`

---

## Table of Contents
1. [Executive Summary & Core Mission](#1-executive-summary--core-mission)
2. [What We Are Building](#2-what-we-are-building)
3. [Key Architectural & Design Decisions](#3-key-architectural--design-decisions)
4. [Master Component Catalog](#4-master-component-catalog)
5. [Complete Source Code — Chrono-Adaptive Mobile Companion](#5-complete-source-code--chrono-adaptive-mobile-companion)
   - 5.1 [`types.ts`](#51-typests)
   - 5.2 [`MobileAppPage.tsx`](#52-mobileapppagetsx)
   - 5.3 [`MobileAppSimulator.tsx`](#53-mobileappsimulatortsx)
   - 5.4 [`MobileHeader.tsx`](#54-mobileheadertsx)
   - 5.5 [`BottomNavBar.tsx`](#55-bottomnavbartsx)
   - 5.6 [`EveningHomeScreen.tsx`](#56-eveninghomescreentsx)
   - 5.7 [`MorningHomeScreen.tsx`](#57-morninghomescreentsx)
   - 5.8 [`DailyCheckInScreen.tsx`](#58-dailycheckinscreentsx)
   - 5.9 [`SleepScoreScreen.tsx`](#59-sleepscorescreentsx)
   - 5.10 [`BedtimeReadinessScreen.tsx`](#510-bedtimereadinessscreentsx)
   - 5.11 [`NightActiveScreen.tsx`](#511-nightactivescreentsx)
   - 5.12 [`HardwareHubScreen.tsx`](#512-hardwarehubscreentsx)
   - 5.13 [`ExploreSessionsScreen.tsx`](#513-exploresessionsscreentsx)
   - 5.14 [`PlacementGuideScreen.tsx`](#514-placementguidescreentsx)
   - 5.15 [`mobile-app.css`](#515-mobile-appcss)
6. [Design System Primitives & Tokens (`@dusq-design-system/react`)](#6-design-system-primitives--tokens)
7. [Fable 5.2 Optimization & Improvement Roadmap](#7-fable-52-optimization--improvement-roadmap)

---

## 1. Executive Summary & Core Mission

**DUSQ** is a luxury behind-the-ear neurotechnology wearable engineered to autonomously preserve human deep slow-wave delta sleep. Unlike passive wristbands (Whoop, Oura, Apple Watch) that merely record poor sleep the following morning, DUSQ is an active, closed-loop bioelectronic intervention system. 

It pairs medical-grade silver/silver-chloride (Ag/AgCl) mastoid micro-electrodes, auricular photoplethysmography (PPG), high-density electrodermal activity (EDA), and 3-axis kinematic inertial measurement to detect autonomic micro-arousals in under 50 milliseconds. Once detected, the device emits targeted non-invasive vagus nerve stimulation (nVNS) acoustic micro-bursts (432Hz binaural & vagal pink noise) to suppress the sympathetic flare, stabilize heart rate, and preserve uninterrupted slow-wave sleep.

---

## 2. What We Are Building

The monorepo encompasses three deeply integrated layers:

1. **`packages/react` & Design Tokens**:
   - The tokenized design system built strictly from Figma component contracts (`contract.button`, `contract.iconButton`, `contract.chip`, `contract.input`, `contract.selection`, `contract.progress`, `contract.loader`).
   - Dark-first aesthetic: Void Black (`#0B0D0E`), Graphite Surface (`#121516`), Elevated Cards (`rgba(255, 255, 255, 0.05)`), Dusq Amber Accent (`#DF6738`), Ice Blue (`#7DD3FC`), and Forest Recovery Green (`#4ADE80`).

2. **DUSQ Web Experience (`apps/dusq-preview`)**:
   - **Flagship Web Store (`/`)**: Hero cinematic showcase, interactive 3D Product Drawer (`ProductOne`), 10-point Clinical Comparison vs Oura/Whoop/Eight Sleep, quiz selector (`FindYourFix`), Clinical Data & Polysomnography graphs.
   - **The Science Portal (`/pages/science`)**: Interactive 4-layer sensor exploded stack, closed-loop nVNS neuro-circuit breakdown, and clinical polysomnography validation data.
   - **The Sleep Lab Portal (`/pages/the-sleep-lab`)**: Split architectural walk-through contrasting Domestic Testing Suites against Polysomnography (PSG) Control Rooms, plus Ground-Truth telemetry matrix.
   - **The Chrono-Adaptive Companion Mobile App (`/app`)**: An authentic, interactive Apple iPhone 14 Pro simulator demonstrating the complete mobile companion system.

3. **Storybook Catalog (`apps/dusq-storybook`)**:
   - Component isolation, variant audits, accessibility testing, and Figma parity verification.

---

## 3. Key Architectural & Design Decisions

### Decision 1: Elimination of the "Morning Score Trap" (Anti-Orthosomnia)
* **The Problem**: Conventional sleep trackers give the user a scalar grade (e.g., "Sleep Score: 64") upon waking. Dr. Siddhant Bhargava observed that this triggers clinical *orthosomnia*—the user feels anxious before they even get out of bed, and the anxiety ruins their day regardless of how they actually feel.
* **The Decision**: Eliminate the judgmental morning score completely. On waking, the app greets Christopher with a non-punitive, qualitative check-in: *"How was last night?"*, a 7-day consistency matrix (e.g. *87% consistency maintained*), and a subtle note: *"Dusk awaits"*. Sleep is framed as a long-term neurological habit rather than an exam.

### Decision 2: Chrono-Adaptive Circadian Card Stack
* **The Problem**: Static mobile dashboards present the same clutter at 7:00 AM as they do at 10:00 PM.
* **The Decision**: The home screen dynamically mutates based on the body's circadian nadir:
  - **Evening Phase (06:00 PM – 11:00 PM)**: Surfaces time-triggered pre-sleep pacing cards (`Last night | Your Night, Recapped`, `06:30 PM | Evening Wind-Down`, `07:00 PM | Sleep Readiness Session`).
  - **Morning Phase (06:00 AM – 12:00 PM)**: Surfaces waking reflection cards (`Check-in | How was last night?`, `New | Introducing Surges`).
  - Cards are stacked with 3D depth, interactive peeking, and zero duplicate typography.

### Decision 3: Closed-Loop Surge Reconstruction HUD (Proposal 1)
* **The Innovation**: Shows the user how DUSQ protected their sleep without them ever waking up.
* **The Mechanism**: Visualizes the 3-step closed-loop sequence:
  1. **Detect**: Autonomic micro-arousal sympathetic flare detected in <50ms.
  2. **Intervene**: Targeted nVNS 432Hz acoustic micro-burst delivered locally.
  3. **Stabilise**: Heart rate deceleration (68 → 51 bpm) and delta wave rhythm preserved.
* **Interactive Timeline**: Allows scrubbing across real overnight timestamps (12:44 AM, 02:14 AM, 04:02 AM, 05:38 AM) to inspect physiological waveforms and total delta sleep preserved (`+38m`).

### Decision 4: Context-Aware Bedside Glance Mode (Proposal 2)
* **The Innovation**: Nocturnal awakenings require zero melatonin disruption.
* **The Decision**: An ultra-dim, monochromatic red-shifted OLED display mode. Blue and amber photons are 100% eliminated. If Christopher taps his phone in the middle of the night, he sees a dim red clock (`02:14`), pod battery status, mastoid impedance, and a single emergency touch button: *"Can't Sleep? Instant Vagal Burst →"*.

### Decision 5: Dedicated ODU Hardware Hub & Offline Overnight Architecture
* **The Innovation**: Zero electromagnetic radiation next to the brain during sleep.
* **The Decision**: The behind-the-ear wearable operates 100% autonomously and offline overnight. Raw sensor DSP and acoustic pulses run on local firmware (v2.1.4) and store up to 42 nights of telemetry in offline flash memory. Phone Bluetooth connects only on morning wake-up for a rapid 10-second background sync.
* **Navigation Integration**: A dedicated ODU Pod squircle button on the floating bottom dock with live battery telemetry (`87% · 42h Left`).

### Decision 6: Pre-Sleep Habit Scaffolding
* **The Thesis**: By the time you get into bed, sleep quality is 80% pre-determined. DUSQ begins intervening 4 hours before bedtime with:
  - 06:30 PM Amber Screen Curfew.
  - 432Hz Vagal Acoustic Soundscapes.
  - 07:00 PM Biofeedback Vagal Breathing Pacer (4-7-8 parasympathetic exercise) to shift readiness from 12% to 85%.

---

## 4. Master Component Catalog

### 4.1 Design System Primitives (`@dusq-design-system/react`)
| Component | Supported Props / Variants | Primary Use Case |
|---|---|---|
| `<Button />` | `Type: "Primary" \| "Default" \| "Ghost"`, `Size: "Large" \| "Small"`, `Enabled`, `Leading Icon`, `Tailing Icon` | Main call-to-actions, start sessions, navigation actions |
| `<IconButton />` | `Type: "Primary" \| "Default" \| "Ghost"`, `Size: "Large" \| "Small"`, `icon: ReactNode` | Back buttons, dismiss buttons, audio toggles, profile triggers |
| `<Chip />` | `Type: "Primary" \| "Success" \| "Error"`, `Style: "Filled" \| "Ghost"`, `Icon`, `chip: string` | Badges, status tags (`4/4 Stabilized`, `87% Consistency`, `BLE 5.3`) |
| `<Selection />` | `Type: "Checkbox" \| "Radio" \| "Toggle"`, `Checked`, `label`, `onCheckedChange` | Habit toggles, qualitative check-in survey choices |
| `<InputField />` | `Active`, `Typed`, `Typing`, `label`, `input`, `Leading Icon`, `button` | Morning qualitative notes, search, feedback |
| `<ProgressDonut />` | `Type: "In Progress" \| "Success"`, `value: number` | Sleep readiness priming donut (12% → 85%) |
| `<ProgressBar />` | `Type`, `value: number`, `legend: boolean` | Hypnogram sleep stage percentage bars |
| `<Loader />` | `Type: "Circular" \| "Bar" \| "Skeleton"` | Telemetry syncing and diagnostic transitions |

### 4.2 Mobile Companion Simulator Components (`apps/dusq-preview`)
| Component File | Role & Visual Feature |
|---|---|
| `MobileAppPage.tsx` | Simulator orchestrator, master IA screen switcher (01 to 08), design dossier notes |
| `MobileAppSimulator.tsx` | Apple iPhone 14 Pro chassis with Dynamic Island, hardware buttons, and dock router |
| `MobileHeader.tsx` | Authentic iOS Status Bar with Dynamic Island, WiFi, 5G, and Pod battery telemetry |
| `BottomNavBar.tsx` | Floating glass dock (Home, Insights, Explore) + dedicated ODU pod button with live battery badge |
| `EveningHomeScreen.tsx` | Evening home with circadian arc, 7-day checklist, 12% readiness squircle, and card stack |
| `MorningHomeScreen.tsx` | Non-punitive morning home, "How was last night?", "Dusk awaits" indicator, and surge card |
| `DailyCheckInScreen.tsx` | 30-second qualitative survey (Physical State radio, Cognitive Tone pills, notes) |
| `SleepScoreScreen.tsx` | Closed-Loop Surge Reconstruction HUD (waveform, detect-intervene-stabilise sequence) |
| `BedtimeReadinessScreen.tsx`| 07:00 PM session (12% → 85% readiness donut, 4-7-8 breathing circle pacer, 0.8 kΩ check) |
| `NightActiveScreen.tsx` | 06:30 PM wind-down protocol steps + Context-Aware Bedside Glance Mode (red OLED clock) |
| `HardwareHubScreen.tsx` | Behind-the-ear wearable diagnostics (87% battery, 0.8 kΩ impedance, 432Hz test tone) |
| `ExploreSessionsScreen.tsx` | Acoustic neuromodulation frequency library (432Hz vagal audio, delta binaural beats) |
| `PlacementGuideScreen.tsx` | Behind-the-ear mastoid ergonomic placement instructions and impedance calibration |

---

## 5. Complete Source Code — Chrono-Adaptive Mobile Companion

### 5.1 `types.ts`
```typescript
export type MobileScreenId =
  | 'home-evening'
  | 'home-morning'
  | 'wind-down'
  | 'readiness'
  | 'daily-checkin'
  | 'surges-telemetry'
  | 'hardware-hub'
  | 'explore'
  | 'bedside-glance';

export type MobileTab = 'home' | 'insights' | 'explore' | 'hardware';

export interface ChronoCard {
  id: string;
  timeTag: string;
  title: string;
  ctaText: string;
  image: string;
  screenTarget: MobileScreenId;
  mode: 'evening' | 'morning';
}

export interface DayCheck {
  day: string;
  checked: boolean;
}
```

### 5.2 `MobileAppPage.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId } from './types';
import { MobileAppSimulator } from './MobileAppSimulator';
import { Chip } from '@dusq-design-system/react';
import './mobile-app.css';

interface MobileAppPageProps {
  onNavigate: (path: string) => void;
}

interface ScreenSpec {
  id: MobileScreenId;
  label: string;
  mode: 'morning' | 'evening' | 'night';
  sourceKeyframe: string;
  components: string[];
  thesisNote: string;
}

const SCREENS: ScreenSpec[] = [
  {
    id: 'home-evening',
    label: '01: Evening Home (Card Stack)',
    mode: 'evening',
    sourceKeyframe: '01_evening_home_night_recap & 02_evening_wind_down',
    components: ['ChronoCardStack', 'PillCTA (White / Black)', '7-Day Check Matrix', 'ReadinessSquircle (12%)', 'CircadianArc'],
    thesisNote: 'Chrono-Adaptive Card Stack dynamically indexes based on circadian nadir. Surfaces "Your Night, Recapped" and peeks 06:30 PM Wind-Down.',
  },
  {
    id: 'wind-down',
    label: '02: 06:30 PM Wind-Down',
    mode: 'evening',
    sourceKeyframe: '02_evening_wind_down_card & 03_transition',
    components: ['ProtocolSteps (01, 02, 03)', 'IconButton (Ghost)', 'CurfewToggle', 'BedsideGlancePreview'],
    thesisNote: 'Pre-Sleep Pacing: By bedtime, sleep readiness is 80% determined. Intervenes hours earlier with blue-light curfew & 432Hz vagal audio.',
  },
  {
    id: 'readiness',
    label: '03: 07:00 PM Readiness Session',
    mode: 'evening',
    sourceKeyframe: '04_evening_sleep_readiness_active',
    components: ['ProgressDonut (12% → 85%)', 'VagalPacer (4-7-8 Circle)', 'HardwareCheckTile (0.8 kΩ)', 'Button (Primary)'],
    thesisNote: 'Physiological biofeedback session. Micro-electrode impedance check primes autonomic vagal tone from 12% to 85% readiness.',
  },
  {
    id: 'home-morning',
    label: '04: Morning Home (Non-Punitive)',
    mode: 'morning',
    sourceKeyframe: '06_morning_home_subjective_checkin',
    components: ['ChronoCardStack', 'StartPillCTA', 'DuskAwaitsSquircle', '7-Day Check Matrix (87%)', 'ZeroScoreFraming'],
    thesisNote: 'Eliminates the Morning Score Trap. Decouples waking consciousness from metric-induced orthosomnia with "How was last night?".',
  },
  {
    id: 'daily-checkin',
    label: '05: Qualitative Check-in Survey',
    mode: 'morning',
    sourceKeyframe: '06_morning_subjective_checkin_flow',
    components: ['QualitativeFeelingCards', 'ClarityPills', 'InputField (Text)', 'Button (Primary Large)'],
    thesisNote: '30-second qualitative reflection on bodily ease and mental tone, reinforcing 87% weekly consistency over single-night panic.',
  },
  {
    id: 'surges-telemetry',
    label: '06: Introducing Surges (Closed-Loop HUD)',
    mode: 'morning',
    sourceKeyframe: '07_morning_introducing_surges & Proposal 1',
    components: ['SurgeStatsGrid (4/4 Stabilized)', 'SurgeReconstructionHUD', 'WaveCanvas', 'HypnogramStages (Delta +38m)'],
    thesisNote: 'Visualizes the Detect → Intervene → Stabilise clinical cycle. Proves how acoustic pulses preserved slow-wave delta rhythm overnight.',
  },
  {
    id: 'hardware-hub',
    label: '07: ODU Hardware Hub',
    mode: 'evening',
    sourceKeyframe: 'Hardware Dock Action & Section 4 IA',
    components: ['ODUPodGlyph', 'BatteryTelemetry (87% / 42h)', 'ImpedanceCheck (0.8 kΩ)', 'AcousticToneCheckButton'],
    thesisNote: 'Behind-the-ear wearable telemetry. Confirms offline flash memory storage (zero phone radiation) and Ag/AgCl skin contact.',
  },
  {
    id: 'explore',
    label: '08: Explore (Intervention Library)',
    mode: 'evening',
    sourceKeyframe: 'Section 4 Explore Library',
    components: ['FilterChips (All, Vagal, Delta)', 'AudioSessionCards', 'PlayStateButton'],
    thesisNote: 'Acoustic neuromodulation frequencies (432Hz, pink noise, bilateral beats) and clinical sleep guides by Dr. Siddhant Bhargava.',
  },
];

export function MobileAppPage({ onNavigate }: MobileAppPageProps) {
  const [selectedScreen, setSelectedScreen] = useState<MobileScreenId>(() => {
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('screen') as MobileScreenId;
      if (q && SCREENS.some((s) => s.id === q)) return q;
    }
    return 'home-evening';
  });

  const handleSelectScreen = (id: MobileScreenId) => {
    setSelectedScreen(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('screen', id);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const activeMeta = SCREENS.find((s) => s.id === selectedScreen) || SCREENS[0];

  return (
    <div className="dusq-mobile-page">
      <header className="dusq-mobile-page__header">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Back to Web Store
          </button>
          <div className="dusq-mobile-page__badge">
            DUSQ Companion App · <strong>Master IA Specification</strong>
          </div>
        </div>

        <h1 className="dusq-mobile-page__title">DUSQ Chrono-Adaptive Mobile System</h1>
        <p className="dusq-mobile-page__subtitle">
          Engineered from official product assets by <strong>Yashabh Srivastava</strong> (Head of Design) and <strong>Dr. Siddhant Bhargava</strong> (Founder & CEO). Built strictly using tokenized design system components.
        </p>

        <div className="dusq-screen-nav-bar" role="tablist">
          {SCREENS.map((s) => {
            const isCurrent = s.id === selectedScreen;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isCurrent}
                className={`dusq-screen-nav-pill ${isCurrent ? 'is-active' : ''}`}
                onClick={() => handleSelectScreen(s.id)}
              >
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="dusq-mobile-page__main">
        <aside className="dusq-mobile-audit-panel">
          <div className="dusq-audit-card">
            <div className="dusq-audit-card__eyebrow">ACTIVE SPECIFICATION</div>
            <h2 className="dusq-audit-card__title">{activeMeta.label}</h2>
            <p className="dusq-audit-card__desc">{activeMeta.thesisNote}</p>

            <div className="dusq-audit-section">
              <span className="dusq-audit-label">Official Source Dossier:</span>
              <code className="dusq-audit-code">{activeMeta.sourceKeyframe}</code>
            </div>

            <div className="dusq-audit-section">
              <span className="dusq-audit-label">Design System Components:</span>
              <div className="dusq-audit-tokens">
                {activeMeta.components.map((c, i) => (
                  <Chip key={i} Type="Primary" Style="Filled" Icon={false} chip={c} />
                ))}
              </div>
            </div>

            <div className="dusq-audit-callout">
              <strong>Core Clinical IA Principle:</strong>
              <p>
                Eliminates the "Morning Score Trap" (verdict-based orthosomnia) and implements the <strong>Detect → Intervene → Stabilise</strong> autonomous neuromodulation loop.
              </p>
            </div>
          </div>
        </aside>

        <section className="dusq-mobile-stage" aria-label="iPhone 14 Pro Mobile Simulator">
          <MobileAppSimulator
            key={selectedScreen}
            initialScreen={selectedScreen}
            timeMode={activeMeta.mode}
          />
        </section>
      </div>
    </div>
  );
}
```

### 5.3 `MobileAppSimulator.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId, MobileTab } from './types';
import { MobileHeader } from './MobileHeader';
import { BottomNavBar } from './BottomNavBar';
import { MorningHomeScreen } from './MorningHomeScreen';
import { EveningHomeScreen } from './EveningHomeScreen';
import { BedtimeReadinessScreen } from './BedtimeReadinessScreen';
import { NightActiveScreen } from './NightActiveScreen';
import { SleepScoreScreen } from './SleepScoreScreen';
import { ExploreSessionsScreen } from './ExploreSessionsScreen';
import { DailyCheckInScreen } from './DailyCheckInScreen';
import { HardwareHubScreen } from './HardwareHubScreen';

interface MobileAppSimulatorProps {
  initialScreen?: MobileScreenId;
  timeMode?: 'morning' | 'evening' | 'night';
}

export function MobileAppSimulator({ initialScreen = 'home-evening', timeMode = 'evening' }: MobileAppSimulatorProps) {
  const [currentScreen, setCurrentScreen] = useState<MobileScreenId>(initialScreen);
  const [screenHistory, setScreenHistory] = useState<MobileScreenId[]>([]);
  const [batteryPercent] = useState<number>(87);

  const navigateTo = (screen: MobileScreenId) => {
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory((history) => history.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen(timeMode === 'morning' ? 'home-morning' : 'home-evening');
    }
  };

  const getActiveTab = (): MobileTab => {
    if (currentScreen === 'hardware-hub') return 'hardware';
    if (currentScreen === 'home-morning' || currentScreen === 'home-evening') return 'home';
    if (currentScreen === 'surges-telemetry' || currentScreen === 'readiness') return 'insights';
    if (currentScreen === 'explore') return 'explore';
    return 'home';
  };

  const handleTabSelect = (tab: MobileTab) => {
    if (tab === 'home') {
      navigateTo(timeMode === 'morning' ? 'home-morning' : 'home-evening');
    } else if (tab === 'insights') {
      navigateTo('surges-telemetry');
    } else if (tab === 'explore') {
      navigateTo('explore');
    } else if (tab === 'hardware') {
      navigateTo('hardware-hub');
    }
  };

  const getTimeString = () => {
    if (currentScreen === 'wind-down') return '06:30';
    if (currentScreen === 'readiness') return '07:00';
    if (currentScreen === 'home-evening') return '9:41';
    if (currentScreen === 'home-morning' || currentScreen === 'daily-checkin' || currentScreen === 'surges-telemetry') return '9:41';
    return '9:41';
  };

  return (
    <div className="device device-iphone-14-pro" role="region" aria-label="DUSQ Mobile App Phone Simulator">
      <div className="device-frame">
        <div className="device-header">
          <div className="device-sensors" />
        </div>

        <div className="device-screen" data-theme="dark">
          <MobileHeader
            batteryPercent={batteryPercent}
            timeString={getTimeString()}
          />

          {currentScreen === 'home-evening' && (
            <EveningHomeScreen
              onNavigate={navigateTo}
              batteryPercent={batteryPercent}
            />
          )}

          {currentScreen === 'home-morning' && (
            <MorningHomeScreen
              onNavigate={navigateTo}
              batteryPercent={batteryPercent}
            />
          )}

          {currentScreen === 'wind-down' && (
            <NightActiveScreen
              onNavigate={navigateTo}
              onBack={navigateBack}
            />
          )}

          {currentScreen === 'readiness' && (
            <BedtimeReadinessScreen
              onNavigate={navigateTo}
              onBack={navigateBack}
            />
          )}

          {currentScreen === 'daily-checkin' && (
            <DailyCheckInScreen
              onNavigate={navigateTo}
              onBack={navigateBack}
            />
          )}

          {currentScreen === 'surges-telemetry' && (
            <SleepScoreScreen
              onNavigate={navigateTo}
              onBack={navigateBack}
            />
          )}

          {currentScreen === 'hardware-hub' && (
            <HardwareHubScreen
              onNavigate={navigateTo}
              onBack={navigateBack}
              batteryPercent={batteryPercent}
            />
          )}

          {currentScreen === 'explore' && (
            <ExploreSessionsScreen
              onNavigate={navigateTo}
            />
          )}

          <BottomNavBar
            activeTab={getActiveTab()}
            onSelectTab={handleTabSelect}
            onOpenHardware={() => navigateTo('hardware-hub')}
            batteryPercent={batteryPercent}
            badges={{
              insights: currentScreen === 'home-morning',
            }}
          />

          <div className="dusq-phone-home-indicator" aria-hidden="true" />
        </div>
      </div>

      <div className="device-stripe" aria-hidden="true" />
      <div className="device-btns" aria-hidden="true" />
      <div className="device-power" aria-hidden="true" />
    </div>
  );
}
```

### 5.4 `MobileHeader.tsx`
```tsx
import React from 'react';

interface MobileHeaderProps {
  batteryPercent?: number;
  timeString?: string;
}

export function MobileHeader({ batteryPercent = 87, timeString = '9:41' }: MobileHeaderProps) {
  return (
    <div className="dusq-phone-status-bar" role="banner">
      <span className="status-time">{timeString}</span>

      <div className="status-icons">
        <svg width="15" height="11" viewBox="0 0 17 12" fill="none">
          <rect x="0.5" y="8" width="2.5" height="4" rx="0.75" fill="currentColor" />
          <rect x="4.5" y="5.5" width="2.5" height="6.5" rx="0.75" fill="currentColor" />
          <rect x="8.5" y="3" width="2.5" height="9" rx="0.75" fill="currentColor" />
          <rect x="12.5" y="0.5" width="2.5" height="11.5" rx="0.75" fill="currentColor" />
        </svg>

        <svg width="14" height="11" viewBox="0 0 16 12" fill="none">
          <path d="M8 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor" />
          <path d="M4.5 7.5a5 5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M1.5 4.5a9.2 9.2 0 0 1 13 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        <div className="status-battery" title={`Battery: ${batteryPercent}%`}>
          <div className="status-battery-body">
            <div className="status-battery-fill" style={{ width: `${Math.min(100, batteryPercent)}%` }} />
          </div>
          <div className="status-battery-cap" />
        </div>
      </div>
    </div>
  );
}
```

### 5.5 `BottomNavBar.tsx`
```tsx
import React from 'react';
import type { MobileTab } from './types';

interface BottomNavBarProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  onOpenHardware: () => void;
  batteryPercent?: number;
  badges?: {
    insights?: boolean;
  };
}

export function BottomNavBar({
  activeTab,
  onSelectTab,
  onOpenHardware,
  batteryPercent = 87,
  badges,
}: BottomNavBarProps) {
  return (
    <div className="dusq-bottom-nav-wrap" role="navigation" aria-label="Bottom Navigation">
      <div className="dusq-bottom-nav-dock">
        <button
          type="button"
          className={`dusq-dock-item ${activeTab === 'home' ? 'is-active' : ''}`}
          onClick={() => onSelectTab('home')}
          aria-label="Home Tab"
        >
          <div className="dusq-dock-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z" fill="currentColor" fillOpacity={activeTab === 'home' ? '0.2' : '0'} />
            </svg>
          </div>
          <span className="dusq-dock-label">Home</span>
        </button>

        <button
          type="button"
          className={`dusq-dock-item ${activeTab === 'insights' ? 'is-active' : ''}`}
          onClick={() => onSelectTab('insights')}
          aria-label="Insights Tab"
        >
          <div className="dusq-dock-icon">
            {badges?.insights && <span className="dusq-dock-badge-dot" />}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
            </svg>
          </div>
          <span className="dusq-dock-label">Insights</span>
        </button>

        <button
          type="button"
          className={`dusq-dock-item ${activeTab === 'explore' ? 'is-active' : ''}`}
          onClick={() => onSelectTab('explore')}
          aria-label="Explore Tab"
        >
          <div className="dusq-dock-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <span className="dusq-dock-label">Explore</span>
        </button>
      </div>

      <div className="dusq-pod-action-container">
        <div className="dusq-pod-battery-badge" title="ODU Wearable Battery Telemetry">
          <svg width="10" height="7" viewBox="0 0 16 10" fill="none">
            <rect x="0.5" y="0.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1" />
            <path d="M14.5 3.5v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <rect x="2" y="2" width="9" height="6" rx="1" fill="#4ADE80" />
          </svg>
          <span>{batteryPercent}%</span>
        </div>

        <button
          type="button"
          className={`dusq-pod-hardware-btn ${activeTab === 'hardware' ? 'is-active' : ''}`}
          onClick={onOpenHardware}
          aria-label="ODU Behind-the-Ear Wearable Hardware Hub"
          title="Open ODU Hardware Telemetry"
        >
          <span className="dusq-pod-glyph" />
        </button>
      </div>
    </div>
  );
}
```

### 5.6 `EveningHomeScreen.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId, ChronoCard, DayCheck } from './types';

interface EveningHomeScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  batteryPercent?: number;
}

const EVENING_CARDS: ChronoCard[] = [
  {
    id: 'recap',
    timeTag: 'Last night',
    title: 'Your Night,\nRecapped',
    ctaText: 'Begin →',
    image: '/mobile/cards/card_recap.png',
    screenTarget: 'surges-telemetry',
    mode: 'evening',
  },
  {
    id: 'winddown',
    timeTag: '06:30 PM',
    title: 'Evening\nWind-Down',
    ctaText: 'Begin →',
    image: '/mobile/cards/card_winddown.png',
    screenTarget: 'wind-down',
    mode: 'evening',
  },
  {
    id: 'readiness',
    timeTag: '07:00 PM',
    title: 'Sleep Readiness\nSession',
    ctaText: 'Begin →',
    image: '/mobile/cards/card_readiness.png',
    screenTarget: 'readiness',
    mode: 'evening',
  },
];

const WEEK_DAYS: DayCheck[] = [
  { day: 'M', checked: true },
  { day: 'T', checked: true },
  { day: 'W', checked: true },
  { day: 'T', checked: true },
  { day: 'F', checked: false },
  { day: 'S', checked: false },
  { day: 'S', checked: false },
];

export function EveningHomeScreen({ onNavigate }: EveningHomeScreenProps) {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [cards] = useState<ChronoCard[]>(EVENING_CARDS);
  const [days] = useState<DayCheck[]>(WEEK_DAYS);

  return (
    <div className="dusq-screen-scroll dusq-chrono-home" data-theme="dark">
      <div className="dusq-ambient-circadian-arc" aria-hidden="true">
        <svg width="24" height="240" viewBox="0 0 24 240" fill="none">
          <path
            d="M 2 10 A 180 180 0 0 1 2 230"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
          />
          <path
            d="M 2 110 A 180 180 0 0 1 2 165"
            stroke="#FAF8F5"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="dusq-chrono-header">
        <div className="dusq-chrono-greeting">
          <span className="dusq-chrono-greeting__lead">Good evening</span>
          <h2 className="dusq-chrono-greeting__name">Christopher</h2>
        </div>

        <button
          type="button"
          className="dusq-chrono-profile-btn"
          aria-label="User profile"
          onClick={() => onNavigate('hardware-hub')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>

      <div className="dusq-chrono-metrics-row">
        <div className="dusq-weekly-consistency">
          <span className="dusq-consistency-label">Your nights this week</span>
          <div className="dusq-consistency-days">
            {days.map((d, idx) => (
              <div key={idx} className="dusq-day-slot">
                <div className={`dusq-day-pill ${d.checked ? 'is-checked' : 'is-upcoming'}`}>
                  {d.checked && (
                    <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5l3.5 3.5L11 1" stroke="#121516" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="dusq-day-letter">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="dusq-readiness-squircle"
          onClick={() => onNavigate('readiness')}
          title="Open Sleep Readiness Telemetry"
        >
          <div className="dusq-readiness-value">
            <strong>12</strong>
            <span>%</span>
          </div>
          <span className="dusq-readiness-label">Readiness</span>
        </button>
      </div>

      <button
        type="button"
        className="dusq-bedside-edge-tab"
        aria-label="Preview Bedside Glance Mode"
        title="Context-Aware Bedside Glance Mode"
        onClick={() => onNavigate('wind-down')}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
        </svg>
      </button>

      <div className="dusq-card-stack-container" role="region" aria-label="Chrono-Adaptive Card Stack">
        {cards.map((card, idx) => {
          const isActive = idx === activeCardIndex;
          const isNext = idx === (activeCardIndex + 1) % cards.length;
          const isHidden = !isActive && !isNext;

          if (isHidden) return null;

          return (
            <div
              key={card.id}
              className={`dusq-chrono-card ${isActive ? 'is-active' : 'is-stacked'}`}
              onClick={() => {
                if (!isActive) {
                  setActiveCardIndex(idx);
                } else {
                  onNavigate(card.screenTarget);
                }
              }}
              style={{
                backgroundImage: `url(${card.image})`,
                cursor: 'pointer',
              }}
              role="button"
              tabIndex={0}
              aria-label={`${card.timeTag} - ${card.title.replace('\n', ' ')}`}
            >
              {isActive && (
                <button
                  type="button"
                  className="dusq-chrono-pill-hotspot"
                  aria-label={card.ctaText}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(card.screenTarget);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="dusq-card-stack-dots" aria-label="Card switcher">
        {cards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className={`dusq-card-dot ${i === activeCardIndex ? 'is-active' : ''}`}
            onClick={() => setActiveCardIndex(i)}
            aria-label={`Show ${c.title.replace('\n', ' ')}`}
          />
        ))}
      </div>
    </div>
  );
}
```

### 5.7 `MorningHomeScreen.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId, ChronoCard, DayCheck } from './types';

interface MorningHomeScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  batteryPercent?: number;
}

const MORNING_CARDS: ChronoCard[] = [
  {
    id: 'checkin',
    timeTag: 'Check-in',
    title: 'How was last\nnight?',
    ctaText: 'Start →',
    image: '/mobile/cards/card_checkin.png',
    screenTarget: 'daily-checkin',
    mode: 'morning',
  },
  {
    id: 'surges',
    timeTag: 'New',
    title: 'Introducing\nSurges',
    ctaText: 'Start →',
    image: '/mobile/cards/card_surges.png',
    screenTarget: 'surges-telemetry',
    mode: 'morning',
  },
];

const MORNING_WEEK_DAYS: DayCheck[] = [
  { day: 'M', checked: true },
  { day: 'T', checked: true },
  { day: 'W', checked: true },
  { day: 'T', checked: true },
  { day: 'F', checked: false },
  { day: 'S', checked: false },
  { day: 'S', checked: false },
];

export function MorningHomeScreen({ onNavigate }: MorningHomeScreenProps) {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [cards] = useState<ChronoCard[]>(MORNING_CARDS);
  const [days] = useState<DayCheck[]>(MORNING_WEEK_DAYS);

  return (
    <div className="dusq-screen-scroll dusq-chrono-home" data-theme="dark">
      <div className="dusq-ambient-circadian-arc" aria-hidden="true">
        <svg width="24" height="240" viewBox="0 0 24 240" fill="none">
          <path
            d="M 2 10 A 180 180 0 0 1 2 230"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
          />
          <path
            d="M 2 20 A 180 180 0 0 1 2 75"
            stroke="#FAF8F5"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="dusq-chrono-header">
        <div className="dusq-chrono-greeting">
          <span className="dusq-chrono-greeting__lead">Good morning</span>
          <h2 className="dusq-chrono-greeting__name">Christopher</h2>
        </div>

        <button
          type="button"
          className="dusq-chrono-profile-btn"
          aria-label="User profile"
          onClick={() => onNavigate('hardware-hub')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>

      <div className="dusq-chrono-metrics-row">
        <div className="dusq-weekly-consistency">
          <span className="dusq-consistency-label">Your nights this week</span>
          <div className="dusq-consistency-days">
            {days.map((d, idx) => (
              <div key={idx} className="dusq-day-slot">
                <div className={`dusq-day-pill ${d.checked ? 'is-checked' : 'is-upcoming'}`}>
                  {d.checked && (
                    <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5l3.5 3.5L11 1" stroke="#121516" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="dusq-day-letter">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="dusq-readiness-squircle dusq-dusk-squircle"
          onClick={() => onNavigate('hardware-hub')}
          title="ODU Device Ready. Dusk awaits."
        >
          <div className="dusq-pod-glyph is-small" />
          <span className="dusq-readiness-label" style={{ marginTop: '6px' }}>Dusk awaits</span>
        </button>
      </div>

      <button
        type="button"
        className="dusq-bedside-edge-tab"
        aria-label="Preview Bedside Glance Mode"
        title="Context-Aware Bedside Glance Mode"
        onClick={() => onNavigate('wind-down')}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
        </svg>
      </button>

      <div className="dusq-card-stack-container" role="region" aria-label="Morning Chrono-Adaptive Stack">
        {cards.map((card, idx) => {
          const isActive = idx === activeCardIndex;
          const isNext = idx === (activeCardIndex + 1) % cards.length;
          const isHidden = !isActive && !isNext;

          if (isHidden) return null;

          return (
            <div
              key={card.id}
              className={`dusq-chrono-card ${isActive ? 'is-active' : 'is-stacked'}`}
              onClick={() => {
                if (!isActive) {
                  setActiveCardIndex(idx);
                } else {
                  onNavigate(card.screenTarget);
                }
              }}
              style={{
                backgroundImage: `url(${card.image})`,
                cursor: 'pointer',
              }}
              role="button"
              tabIndex={0}
              aria-label={`${card.timeTag} - ${card.title.replace('\n', ' ')}`}
            >
              {isActive && (
                <button
                  type="button"
                  className="dusq-chrono-pill-hotspot"
                  aria-label={card.ctaText}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(card.screenTarget);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="dusq-card-stack-dots" aria-label="Card switcher">
        {cards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className={`dusq-card-dot ${i === activeCardIndex ? 'is-active' : ''}`}
            onClick={() => setActiveCardIndex(i)}
            aria-label={`Show ${c.title.replace('\n', ' ')}`}
          />
        ))}
      </div>
    </div>
  );
}
```

### 5.8 `DailyCheckInScreen.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, Selection, IconButton } from '@dusq-design-system/react';

interface DailyCheckInScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
}

export function DailyCheckInScreen({ onNavigate, onBack }: DailyCheckInScreenProps) {
  const [selectedFeeling, setSelectedFeeling] = useState<string>('rested');
  const [cognitiveClarity, setCognitiveClarity] = useState<string>('focused');
  const [note, setNote] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const feelings = [
    { id: 'rested', label: 'Rested & Grounded', desc: 'Deep recovery felt across the body', icon: '✨' },
    { id: 'refreshed', label: 'Refreshed', desc: 'Woke naturally without alarm shock', icon: '🌿' },
    { id: 'neutral', label: 'Neutral', desc: 'Balanced, steady morning pace', icon: '⚖️' },
    { id: 'groggy', label: 'Groggy', desc: 'Sleep inertia clearing slowly', icon: '☕' },
    { id: 'restless', label: 'Restless', desc: 'Frequent tossing or fragmented sleep', icon: '🌙' },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('surges-telemetry');
    }, 400);
  };

  return (
    <div className="dusq-screen-scroll dusq-checkin-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton
          Type="Ghost"
          Size="Small"
          icon="arrow_back"
          onClick={onBack}
          aria-label="Back to Home"
        />
        <h3 className="dusq-screen-top-bar__title">MORNING CHECK-IN</h3>
        <Chip Type="Primary" Style="Ghost" Icon={false} chip="87% Consistency" />
      </div>

      <div style={{ marginTop: '12px', marginBottom: '18px' }}>
        <div className="dusq-hud-eyebrow">SUBJECTIVE SLEEP PERCEPTION</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '4px 0 6px', color: '#FAF8F5' }}>
          How was last night?
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45, margin: 0 }}>
          Sleep isn't a test. Rather than grading your night with an anxiety-inducing number, DUSQ measures how your autonomic system actually feels this morning.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.01em' }}>
          1. Awakening Physical State
        </span>

        {feelings.map((f) => {
          const isSelected = selectedFeeling === f.id;
          return (
            <div
              key={f.id}
              className={`dusq-feeling-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => setSelectedFeeling(f.id)}
            >
              <span className="dusq-feeling-emoji">{f.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: isSelected ? '#FAF8F5' : 'rgba(255, 255, 255, 0.9)' }}>
                  {f.label}
                </div>
                <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                  {f.desc}
                </div>
              </div>
              <Selection
                Type="Radio"
                Checked={isSelected}
                onChange={() => setSelectedFeeling(f.id)}
                aria-label={f.label}
              />
            </div>
          );
        })}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', display: 'block', marginBottom: '8px' }}>
          2. Cognitive Tone
        </span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Sharp & Clear', 'Calmly Focused', 'Waking Up Slow', 'Mild Brain Fog'].map((t) => {
            const isSelected = cognitiveClarity === t;
            return (
              <button
                key={t}
                type="button"
                className={`dusq-cognitive-pill ${isSelected ? 'is-active' : ''}`}
                onClick={() => setCognitiveClarity(t)}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', display: 'block', marginBottom: '8px' }}>
          3. Optional Reflection Note
        </span>
        <input
          type="text"
          className="dusq-checkin-input"
          placeholder="e.g. Read in bed for 15 mins, no caffeine after 2pm"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 'auto', paddingBottom: '16px' }}>
        <Button
          Type="Primary"
          Size="Large"
          className="dusq-btn-full"
          Button={submitted ? 'Logging Check-in...' : 'Complete Check-in →'}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
```

### 5.9 `SleepScoreScreen.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, IconButton } from '@dusq-design-system/react';

interface SleepScoreScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
}

interface SurgeEvent {
  time: string;
  stage: string;
  type: string;
  heartRateDrop: string;
  vagalAudioFrequency: string;
  deltaPreserved: string;
  detectSummary: string;
  interveneSummary: string;
  stabiliseSummary: string;
}

const SURGE_EVENTS: SurgeEvent[] = [
  {
    time: '12:44 AM',
    stage: 'Core Sleep',
    type: 'Sympathetic Micro-Arousal',
    heartRateDrop: '64 → 52 bpm',
    vagalAudioFrequency: '432Hz Acoustic Tone',
    deltaPreserved: '+8m Delta Preserved',
    detectSummary: 'EDA tonic spike + sudden 11 bpm heart rate acceleration detected in 42ms.',
    interveneSummary: 'DUSQ delivered 12s sub-perceptual 432Hz binaural acoustic stimulation.',
    stabiliseSummary: 'Vagal deceleration restored baseline core sleep. Awake threshold was avoided.',
  },
  {
    time: '02:14 AM',
    stage: 'Deep Delta',
    type: 'High Micro-Arousal Spike',
    heartRateDrop: '68 → 51 bpm',
    vagalAudioFrequency: 'Targeted nVNS Acoustic Burst (12s)',
    deltaPreserved: '+14m Slow-Wave Preserved',
    detectSummary: 'Micro-arousal sympathetic flare detected in <50ms while in deep delta.',
    interveneSummary: 'Targeted nVNS 432Hz acoustic micro-burst suppressed the autonomic spike.',
    stabiliseSummary: 'Heart rate dropped from 68 to 51 bpm. Slow-wave delta rhythm preserved intact.',
  },
  {
    time: '04:02 AM',
    stage: 'REM Sleep',
    type: 'Vascular Autonomic Shift',
    heartRateDrop: '71 → 58 bpm',
    vagalAudioFrequency: '432Hz Vagal Pink Noise',
    deltaPreserved: '+9m REM Continuity',
    detectSummary: 'Peripheral vasoconstriction detected via Auricular PPG vascular sensors.',
    interveneSummary: 'Gentle acoustic pink noise pulsed to support parasympathetic tone.',
    stabiliseSummary: 'Vasomotor stability recovered. Dreaming phase continued uninterrupted.',
  },
  {
    time: '05:38 AM',
    stage: 'Deep Delta',
    type: 'Sub-Threshold Cortisol Flare',
    heartRateDrop: '63 → 50 bpm',
    vagalAudioFrequency: '432Hz Binaural Stabilizer',
    deltaPreserved: '+7m Delta Preserved',
    detectSummary: 'Pre-dawn sympathetic cortisol surge detected 45 mins before scheduled wake.',
    interveneSummary: 'Stabilizing vagal frequency delivered to prevent premature awakening.',
    stabiliseSummary: 'Christopher remained in slow-wave sleep until natural circadian dawn.',
  },
];

export function SleepScoreScreen({ onNavigate, onBack }: SleepScoreScreenProps) {
  const [activeSurgeIndex, setActiveSurgeIndex] = useState<number>(1);
  const activeSurge = SURGE_EVENTS[activeSurgeIndex];

  return (
    <div className="dusq-screen-scroll dusq-surges-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton
          Type="Ghost"
          Size="Small"
          icon="arrow_back"
          onClick={onBack}
          aria-label="Back to Home"
        />
        <h3 className="dusq-screen-top-bar__title">INTRODUCING SURGES</h3>
        <Chip Type="Success" Style="Ghost" Icon={false} chip="4/4 Stabilized" />
      </div>

      <div style={{ marginTop: '12px', marginBottom: '16px' }}>
        <div className="dusq-hud-eyebrow">AUTONOMOUS SLEEP PRESERVATION</div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0 6px', color: '#FAF8F5', letterSpacing: '-0.01em' }}>
          Your Brain Was Protected 4 Times Last Night
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45, margin: 0 }}>
          When sleep breaks, it's not because you woke up—it's because an autonomic micro-arousal triggered minutes earlier. DUSQ intercepts surges silently before you wake.
        </p>
      </div>

      <div className="dusq-surge-stats-grid">
        <div className="dusq-surge-stat-card">
          <span className="dusq-stat-big">4</span>
          <span className="dusq-stat-sub">Surges Intercepted</span>
          <span className="dusq-stat-tag" style={{ color: '#4ADE80' }}>100% Efficacy</span>
        </div>
        <div className="dusq-surge-stat-card">
          <span className="dusq-stat-big" style={{ color: '#DF6738' }}>+38m</span>
          <span className="dusq-stat-sub">Delta Sleep Saved</span>
          <span className="dusq-stat-tag" style={{ color: '#4ADE80' }}>Slow-Wave Rhythm</span>
        </div>
        <div className="dusq-surge-stat-card">
          <span className="dusq-stat-big">0</span>
          <span className="dusq-stat-sub">Full Awakenings</span>
          <span className="dusq-stat-tag" style={{ color: '#4ADE80' }}>Zero Sleep Inertia</span>
        </div>
      </div>

      <div className="dusq-surge-hud-card">
        <div className="dusq-hud-top-row">
          <div>
            <div className="dusq-hud-eyebrow">CLOSED-LOOP SURGE RECONSTRUCTION</div>
            <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#FAF8F5' }}>
              Select an overnight surge event:
            </h4>
          </div>
          <Chip Type="Success" Style="Ghost" Icon={false} chip="OFFLINE SYNCED" />
        </div>

        <div className="dusq-surge-timeline-tabs">
          {SURGE_EVENTS.map((evt, idx) => (
            <button
              key={idx}
              type="button"
              className={`dusq-timeline-tab ${idx === activeSurgeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveSurgeIndex(idx)}
            >
              <span className="tab-dot" />
              <span>{evt.time}</span>
            </button>
          ))}
        </div>

        <div className="dusq-surge-wave-panel">
          <div className="dusq-wave-stage-badge">
            Stage: <strong>{activeSurge.stage}</strong> · {activeSurge.type}
          </div>

          <div className="dusq-wave-canvas-wrap">
            <svg viewBox="0 0 320 90" className="dusq-surge-svg-canvas">
              <path
                d="M 10 50 Q 50 48 80 44 Q 100 24 110 20 Q 120 72 130 52 Q 140 64 150 50 Q 180 50 310 50"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1.5"
              />
              <path
                d="M 10 50 Q 50 48 80 44 Q 100 24 110 20"
                fill="none"
                stroke="#DF6738"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 110 20 Q 120 72 130 52 Q 140 64 150 50"
                fill="none"
                stroke="#F97316"
                strokeWidth="2.75"
                strokeLinecap="round"
              />
              <path
                d="M 150 50 Q 180 50 250 48 Q 280 46 310 50"
                fill="none"
                stroke="#4ADE80"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="110" cy="20" r="4" fill="#DF6738" />
              <rect x="98" y="14" width="48" height="62" rx="6" fill="#DF6738" fillOpacity="0.15" stroke="#DF6738" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="170" cy="50" r="4" fill="#4ADE80" />
            </svg>
          </div>

          <div className="dusq-closed-loop-flow">
            <div className="flow-step">
              <span className="step-num" style={{ color: '#DF6738' }}>1. DETECT</span>
              <p className="step-body">Micro-arousal sympathetic flare detected in &lt;50ms</p>
            </div>
            <div className="flow-step">
              <span className="step-num" style={{ color: '#F97316' }}>2. INTERVENE</span>
              <p className="step-body">Targeted nVNS Acoustic Burst (12s)</p>
            </div>
            <div className="flow-step">
              <span className="step-num" style={{ color: '#4ADE80' }}>3. STABILISE</span>
              <p className="step-body">HR drop 68 → 51 bpm · Delta Restored</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dusq-hypnogram-card">
        <div className="dusq-hud-eyebrow">OVERNIGHT SLEEP ARCHITECTURE</div>
        <h4 style={{ margin: '2px 0 10px', fontSize: '15px', color: '#FAF8F5' }}>
          Preserved Hypnogram Stages
        </h4>

        <div className="dusq-stage-row">
          <div className="dusq-stage-meta">
            <span className="stage-name">Deep Delta (Slow-Wave)</span>
            <span className="stage-val" style={{ color: '#DF6738' }}>1h 48m · +38m preserved</span>
          </div>
          <div className="dusq-stage-bar">
            <div className="dusq-stage-fill" style={{ width: '42%', background: '#DF6738' }} />
          </div>
        </div>

        <div className="dusq-stage-row">
          <div className="dusq-stage-meta">
            <span className="stage-name">REM Sleep (Cognitive Restoration)</span>
            <span className="stage-val">1h 42m</span>
          </div>
          <div className="dusq-stage-bar">
            <div className="dusq-stage-fill" style={{ width: '38%', background: '#7DD3FC' }} />
          </div>
        </div>

        <div className="dusq-stage-row">
          <div className="dusq-stage-meta">
            <span className="stage-name">Core Sleep (Light N2)</span>
            <span className="stage-val">3h 48m</span>
          </div>
          <div className="dusq-stage-bar">
            <div className="dusq-stage-fill" style={{ width: '65%', background: 'rgba(255, 255, 255, 0.4)' }} />
          </div>
        </div>

        <div className="dusq-stage-row">
          <div className="dusq-stage-meta">
            <span className="stage-name">Awake Time</span>
            <span className="stage-val">24m · 0 Full Awakenings</span>
          </div>
          <div className="dusq-stage-bar">
            <div className="dusq-stage-fill" style={{ width: '8%', background: 'rgba(255, 255, 255, 0.2)' }} />
          </div>
        </div>
      </div>

      <div className="dusq-quote-card">
        <p className="dusq-quote-text">
          "A score in the morning is a verdict on a night that's already over. You can't change it. You can only carry it into your day. DUSQ protects the night as it happens."
        </p>
        <span className="dusq-quote-author">— Dr. Siddhant Bhargava, Founder & CEO</span>
      </div>

      <div style={{ marginTop: '16px', paddingBottom: '16px' }}>
        <Button
          Type="Primary"
          Size="Large"
          className="dusq-btn-full"
          Button="Return to Morning Home →"
          onClick={() => onNavigate('home-morning')}
        />
      </div>
    </div>
  );
}
```

### 5.10 `BedtimeReadinessScreen.tsx`
```tsx
import React, { useState, useEffect } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, ProgressDonut, IconButton } from '@dusq-design-system/react';

interface BedtimeReadinessScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
}

export function BedtimeReadinessScreen({ onNavigate, onBack }: BedtimeReadinessScreenProps) {
  const [readinessVal, setReadinessVal] = useState<number>(12);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale (4s)' | 'Hold (7s)' | 'Exhale (8s)'>('Inhale (4s)');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sessionActive) {
      timer = setInterval(() => {
        setReadinessVal((prev) => {
          if (prev >= 85) return 85;
          return prev + 1;
        });
      }, 350);
    }
    return () => clearInterval(timer);
  }, [sessionActive]);

  useEffect(() => {
    let phaseTimer: NodeJS.Timeout;
    if (sessionActive) {
      let step = 0;
      phaseTimer = setInterval(() => {
        step = (step + 1) % 3;
        if (step === 0) setBreathingPhase('Inhale (4s)');
        else if (step === 1) setBreathingPhase('Hold (7s)');
        else setBreathingPhase('Exhale (8s)');
      }, 4000);
    }
    return () => clearInterval(phaseTimer);
  }, [sessionActive]);

  return (
    <div className="dusq-screen-scroll dusq-readiness-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton
          Type="Ghost"
          Size="Small"
          icon="arrow_back"
          onClick={onBack}
          aria-label="Back to Home"
        />
        <h3 className="dusq-screen-top-bar__title">07:00 PM READINESS</h3>
        <Chip Type="Primary" Style="Ghost" Icon={false} chip="Pre-Sleep Pacing" />
      </div>

      <div className="dusq-readiness-donut-container">
        <div className="dusq-donut-wrap">
          <ProgressDonut
            Type={readinessVal >= 70 ? 'Success' : 'In Progress'}
            value={readinessVal}
          />
          <div className="dusq-donut-center">
            <span className="donut-num">{readinessVal}%</span>
            <span className="donut-label">READINESS</span>
          </div>
        </div>

        <div className="dusq-readiness-pacing-meta">
          <Chip
            Type={readinessVal >= 70 ? 'Success' : 'Primary'}
            Style="Ghost"
            Icon={false}
            chip={sessionActive ? `${readinessVal}% Primed · Session Active` : '12% Baseline · Session Active'}
          />
        </div>

        <div className="dusq-readiness-trio">
          <div className="trio-item">
            <span className="trio-val">52 bpm</span>
            <span className="trio-lbl">Resting HR</span>
          </div>
          <div className="trio-item">
            <span className="trio-val" style={{ color: '#4ADE80' }}>0.8 kΩ</span>
            <span className="trio-lbl">Ag/AgCl Contact</span>
          </div>
          <div className="trio-item">
            <span className="trio-val">+{Math.max(0, readinessVal - 12)}%</span>
            <span className="trio-lbl">Vagal Shift</span>
          </div>
        </div>
      </div>

      <div className="dusq-vagal-pacer-card">
        <div className="dusq-hud-top-row">
          <div>
            <div className="dusq-hud-eyebrow">BIOFEEDBACK PACER</div>
            <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#FAF8F5' }}>4-7-8 Parasympathetic Pacing</h4>
          </div>
          <Chip Type="Primary" Style="Ghost" Icon={false} chip="5-Min Vagal" />
        </div>

        <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.65)', margin: '8px 0 14px' }}>
          Synchronizes respiration with heart rate variability to stimulate the vagus nerve and shift autonomic balance before bed.
        </p>

        <div className="dusq-pacer-wrap">
          <div className={`dusq-pacer-circle ${sessionActive ? 'is-active' : ''}`}>
            <span className="dusq-pacer-text">{sessionActive ? breathingPhase : 'Tap Start'}</span>
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <Button
            Type={sessionActive ? 'Ghost' : 'Primary'}
            Size="Large"
            className="dusq-btn-full"
            Button={sessionActive ? 'Pause Vagal Breathing' : 'Start Vagal Breathing Protocol →'}
            onClick={() => setSessionActive((prev) => !prev)}
          />
        </div>
      </div>

      <div className="dusq-hardware-check-tile" onClick={() => onNavigate('hardware-hub')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="dusq-pod-glyph is-small" />
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#FAF8F5' }}>
              ODU Behind-the-Ear Wearable
            </div>
            <div style={{ fontSize: '11px', color: '#4ADE80' }}>
              ✓ Skin impedance optimal · Ready for overnight autonomous sync
            </div>
          </div>
        </div>
        <span style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.4)' }}>→</span>
      </div>

      <div style={{ marginTop: '16px', paddingBottom: '16px' }}>
        <Button
          Type="Primary"
          Size="Large"
          className="dusq-btn-full"
          Button="Done · Return to Home →"
          onClick={() => onNavigate('home-evening')}
        />
      </div>
    </div>
  );
}
```

### 5.11 `NightActiveScreen.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, Selection, IconButton } from '@dusq-design-system/react';

interface NightActiveScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
}

export function NightActiveScreen({ onNavigate, onBack }: NightActiveScreenProps) {
  const [bedsideGlance, setBedsideGlance] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(true);
  const [amberCurfew, setAmberCurfew] = useState<boolean>(true);

  if (bedsideGlance) {
    return (
      <div className="dusq-screen-scroll dusq-bedside-glance-mode" data-theme="dark">
        <div className="dusq-glance-header">
          <span className="dusq-glance-dot" />
          <span>BEDSIDE GLANCE · MELATONIN PRESERVATION</span>
          <button
            type="button"
            className="dusq-glance-exit-btn"
            onClick={() => setBedsideGlance(false)}
          >
            ✕ Exit
          </button>
        </div>

        <div className="dusq-glance-clock">
          <span className="dusq-glance-time">02:14</span>
          <span className="dusq-glance-sub">AUTONOMOUS SLEEP SHIELD ACTIVE</span>
        </div>

        <div className="dusq-glance-status-card">
          <div className="dusq-glance-metric">
            <span className="glance-label">ODU Pod Battery</span>
            <span className="glance-value">87% · 42h Left</span>
          </div>
          <div className="dusq-glance-divider" />
          <div className="dusq-glance-metric">
            <span className="glance-label">Mastoid Impedance</span>
            <span className="glance-value">0.8 kΩ · Optimal</span>
          </div>
        </div>

        <div className="dusq-glance-action">
          <Button
            Type="Ghost"
            Size="Large"
            className="dusq-btn-full"
            Button="Can't Sleep? Instant Vagal Burst →"
            onClick={() => onNavigate('readiness')}
          />
          <span className="dusq-glance-note">
            Delivers a 12-second 432Hz vagal neuromodulation pulse to restore slow-wave delta rhythm.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="dusq-screen-scroll dusq-winddown-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton
          Type="Ghost"
          Size="Small"
          icon="arrow_back"
          onClick={onBack}
          aria-label="Back to Home"
        />
        <h3 className="dusq-screen-top-bar__title">06:30 PM WIND-DOWN</h3>
        <Chip Type="Primary" Style="Ghost" Icon={false} chip="Circadian Pacing" />
      </div>

      <div style={{ marginTop: '12px', marginBottom: '18px' }}>
        <div className="dusq-hud-eyebrow">PRE-SLEEP HABIT SCAFFOLDING</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '4px 0 6px', color: '#FAF8F5' }}>
          Evening Wind-Down
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45, margin: 0 }}>
          By the time you get into bed, your neurological sleep readiness is already 80% determined. Intervene hours before bedtime to prime slow-wave recovery.
        </p>
      </div>

      <div className="dusq-winddown-steps">
        <div className="dusq-step-card is-active">
          <div className="step-num">01</div>
          <div className="step-content">
            <div className="step-title">Amber Spectrum Screen Curfew</div>
            <div className="step-desc">Enabled · Suppressing short-wavelength blue light</div>
          </div>
          <Selection
            Type="Toggle"
            Checked={amberCurfew}
            onChange={() => setAmberCurfew(!amberCurfew)}
            aria-label="Amber Curfew Toggle"
          />
        </div>

        <div className="dusq-step-card">
          <div className="step-num">02</div>
          <div className="step-content">
            <div className="step-title">432Hz Vagal Acoustic Soundscape</div>
            <div className="step-desc">{audioPlaying ? 'Playing · Pink noise & bilateral acoustic pacing' : 'Paused'}</div>
          </div>
          <button
            type="button"
            className="dusq-mini-audio-btn"
            onClick={() => setAudioPlaying(!audioPlaying)}
          >
            {audioPlaying ? 'PAUSE' : 'PLAY'}
          </button>
        </div>

        <div className="dusq-step-card">
          <div className="step-num">03</div>
          <div className="step-content">
            <div className="step-title">Autonomous Overnight Shield Armed</div>
            <div className="step-desc">ODU Pod connected · Operates offline with zero phone radiation</div>
          </div>
          <Chip Type="Success" Style="Ghost" Icon={false} chip="ARMED" />
        </div>
      </div>

      <div className="dusq-bedside-glance-card">
        <div className="dusq-hud-top-row">
          <div>
            <div className="dusq-hud-eyebrow">NIGHTTIME DISPLAY</div>
            <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#FAF8F5' }}>Context-Aware Bedside Glance</h4>
          </div>
          <Chip Type="Primary" Style="Ghost" Icon={false} chip="OLED Dim" />
        </div>
        <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.65)', margin: '8px 0 14px' }}>
          Test the ultra-dim red-shift bedside mode for night awakenings. Zero melatonin disruption.
        </p>
        <Button
          Type="Ghost"
          Size="Small"
          className="dusq-btn-full"
          Button="Preview Bedside Glance Mode →"
          onClick={() => setBedsideGlance(true)}
        />
      </div>

      <div style={{ marginTop: '12px' }}>
        <Button
          Type="Primary"
          Size="Large"
          className="dusq-btn-full"
          Button="Done · Return to Home →"
          onClick={() => onNavigate('home-evening')}
        />
      </div>
    </div>
  );
}
```

### 5.12 `HardwareHubScreen.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, IconButton } from '@dusq-design-system/react';

interface HardwareHubScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
  batteryPercent?: number;
}

export function HardwareHubScreen({ onNavigate, onBack, batteryPercent = 87 }: HardwareHubScreenProps) {
  const [testToneActive, setTestToneActive] = useState<boolean>(false);

  const handleTestTone = () => {
    setTestToneActive(true);
    setTimeout(() => {
      setTestToneActive(false);
    }, 3000);
  };

  return (
    <div className="dusq-screen-scroll dusq-hardware-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton
          Type="Ghost"
          Size="Small"
          icon="arrow_back"
          onClick={onBack}
          aria-label="Back"
        />
        <h3 className="dusq-screen-top-bar__title">ODU HARDWARE HUB</h3>
        <Chip Type="Success" Style="Ghost" Icon={false} chip="BLE 5.3 Connected" />
      </div>

      <div className="dusq-hardware-pod-hero">
        <div className="dusq-pod-hero-glow">
          <div className="dusq-pod-glyph is-large" />
        </div>
        <h3 className="dusq-pod-hero-name">DUSQ Behind-the-Ear Pod</h3>
        <span className="dusq-pod-hero-sub">Model SQ-2026 · Firmware v2.1.4</span>

        <div className="dusq-pod-stats-strip">
          <div className="strip-item">
            <span className="strip-val">{batteryPercent}%</span>
            <span className="strip-lbl">Battery Level</span>
            <span className="strip-sub">~42h Standby</span>
          </div>
          <div className="strip-divider" />
          <div className="strip-item">
            <span className="strip-val" style={{ color: '#4ADE80' }}>0.8 kΩ</span>
            <span className="strip-lbl">Mastoid Fit</span>
            <span className="strip-sub">Ag/AgCl Contact</span>
          </div>
          <div className="strip-divider" />
          <div className="strip-item">
            <span className="strip-val">42</span>
            <span className="strip-lbl">Nights Memory</span>
            <span className="strip-sub">Offline Flash</span>
          </div>
        </div>
      </div>

      <div className="dusq-hardware-feature-card">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div className="dusq-feature-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18.36 5.64a9 9 0 0 1 0 12.73M5.64 5.64a9 9 0 0 0 0 12.73M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" strokeLinecap="round" />
              <line x1="1" y1="1" x2="23" y2="23" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: '#FAF8F5' }}>
              Zero Phone Radiation at Night
            </h4>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45 }}>
              DUSQ executes detection and acoustic neuromodulation locally on device. Your phone can remain in Airplane mode or in another room.
            </p>
          </div>
        </div>
      </div>

      <div className="dusq-hardware-feature-card">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div className="dusq-feature-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 16h5v5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: '#FAF8F5' }}>
              Overnight Telemetry Buffer
            </h4>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45 }}>
              All 4 overnight surge events synced to companion app at 07:15 AM via 10-second low-energy burst.
            </p>
          </div>
        </div>
      </div>

      <div className="dusq-bedside-glance-card">
        <div className="dusq-hud-top-row">
          <div>
            <div className="dusq-hud-eyebrow">ACOUSTIC CALIBRATION</div>
            <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#FAF8F5' }}>Test Neuromodulation Tone</h4>
          </div>
          <Chip Type="Primary" Style="Ghost" Icon={false} chip="432Hz Test" />
        </div>
        <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.65)', margin: '0 0 14px' }}>
          Emits a gentle 3-second diagnostic tone to verify speaker placement and volume threshold behind your ear.
        </p>
        <Button
          Type={testToneActive ? 'Ghost' : 'Primary'}
          Size="Small"
          className="dusq-btn-full"
          Button={testToneActive ? 'Playing 432Hz Diagnostic Tone...' : 'Run Acoustic Tone Check →'}
          onClick={handleTestTone}
        />
      </div>

      <div style={{ marginTop: '12px' }}>
        <Button
          Type="Primary"
          Size="Large"
          className="dusq-btn-full"
          Button="Done · Return to Home →"
          onClick={() => onNavigate('home-evening')}
        />
      </div>
    </div>
  );
}
```

### 5.13 `ExploreSessionsScreen.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip } from '@dusq-design-system/react';

interface ExploreSessionsScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
}

interface AudioSession {
  id: string;
  title: string;
  category: 'vagal' | 'delta' | 'winddown' | 'science';
  duration: string;
  frequency: string;
  desc: string;
  author: string;
}

const SESSIONS: AudioSession[] = [
  {
    id: 's1',
    title: '432Hz Vagal Nerve Reset',
    category: 'vagal',
    duration: '15 mins',
    frequency: '432Hz Binaural',
    desc: 'Bilateral harmonic modulation designed to stimulate the auricular branch of the vagus nerve (ABVN).',
    author: 'Dr. Siddhant Bhargava',
  },
  {
    id: 's2',
    title: 'Deep Delta Slow-Wave Synchronizer',
    category: 'delta',
    duration: '45 mins',
    frequency: '0.5 - 2Hz Carrier',
    desc: 'Entrainment soundscape engineered to amplify restorative slow-wave oscillations during N3 sleep.',
    author: 'DUSQ Sleep Lab',
  },
  {
    id: 's3',
    title: 'Pre-Sleep Somatosensory Curfew',
    category: 'winddown',
    duration: '20 mins',
    frequency: 'Pink Noise',
    desc: 'Gentle sensory attenuation audio to lower sympathetic tone prior to entering bedroom.',
    author: 'Yashabh Srivastava',
  },
  {
    id: 's4',
    title: 'Autonomic Micro-Arousal Breakdown',
    category: 'science',
    duration: '8 mins',
    frequency: 'Audio Guide',
    desc: 'Clinical explanation of how micro-arousals cause chronic fatigue even when total sleep time appears normal.',
    author: 'Dr. Siddhant Bhargava',
  },
];

export function ExploreSessionsScreen({ onNavigate }: ExploreSessionsScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredSessions = selectedFilter === 'all'
    ? SESSIONS
    : SESSIONS.filter((s) => s.category === selectedFilter);

  return (
    <div className="dusq-screen-scroll dusq-explore-screen" data-theme="dark">
      <div style={{ marginTop: '6px', marginBottom: '14px' }}>
        <div className="dusq-hud-eyebrow">NEUROMODULATION LIBRARY</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '4px 0 6px', color: '#FAF8F5' }}>
          Explore Interventions
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45, margin: 0 }}>
          Clinically calibrated acoustic frequencies and sleep architecture guides developed by the DUSQ neurotechnology team.
        </p>
      </div>

      <div className="dusq-explore-filters">
        {[
          { id: 'all', label: 'All' },
          { id: 'vagal', label: 'Vagal Tone' },
          { id: 'delta', label: 'Delta Sleep' },
          { id: 'winddown', label: 'Wind-Down' },
          { id: 'science', label: 'Science' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            className={`dusq-filter-chip ${selectedFilter === f.id ? 'is-active' : ''}`}
            onClick={() => setSelectedFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="dusq-sessions-list">
        {filteredSessions.map((s) => {
          const isPlaying = playingId === s.id;
          return (
            <div key={s.id} className="dusq-session-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="dusq-session-tag">{s.frequency} · {s.duration}</span>
                  <h3 className="dusq-session-title">{s.title}</h3>
                </div>
                <button
                  type="button"
                  className={`dusq-session-play-btn ${isPlaying ? 'is-playing' : ''}`}
                  onClick={() => setPlayingId(isPlaying ? null : s.id)}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>

              <p className="dusq-session-desc">{s.desc}</p>
              <div className="dusq-session-author">{s.author}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### 5.14 `PlacementGuideScreen.tsx`
```tsx
import React, { useState } from 'react';
import type { MobileScreenId } from './types';
import { Button, Chip, IconButton } from '@dusq-design-system/react';

interface PlacementGuideScreenProps {
  onNavigate: (screen: MobileScreenId) => void;
  onBack: () => void;
}

export function PlacementGuideScreen({ onNavigate, onBack }: PlacementGuideScreenProps) {
  const [impedanceCalibrated, setImpedanceCalibrated] = useState<boolean>(true);

  return (
    <div className="dusq-screen-scroll dusq-placement-screen" data-theme="dark">
      <div className="dusq-screen-top-bar">
        <IconButton
          Type="Ghost"
          Size="Small"
          icon="arrow_back"
          onClick={onBack}
          aria-label="Back"
        />
        <h3 className="dusq-screen-top-bar__title">MASTOID PLACEMENT</h3>
        <Chip Type="Success" Style="Ghost" Icon={false} chip="0.8 kΩ Optimal" />
      </div>

      <div style={{ marginTop: '12px', marginBottom: '18px' }}>
        <div className="dusq-hud-eyebrow">BIOMETRIC CALIBRATION</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '4px 0 6px', color: '#FAF8F5' }}>
          Behind-the-Ear Fit
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45, margin: 0 }}>
          Optimal vagal stimulation requires dry micro-contact with the post-auricular mastoid process. Follow the tactile guide below.
        </p>
      </div>

      <div className="dusq-placement-graphic">
        <div className="dusq-ear-diagram">
          <div className="dusq-mastoid-target-dot" />
        </div>
      </div>

      <div className="dusq-placement-steps">
        <div className="dusq-placement-step">
          <div className="step-num">01</div>
          <div className="step-text">
            <strong>Hook Over Auricle:</strong> Rest the contoured titanium pod flange directly behind the upper ear curve.
          </div>
        </div>
        <div className="dusq-placement-step">
          <div className="step-num">02</div>
          <div className="step-text">
            <strong>Seat Mastoid Electrodes:</strong> Lightly press the Ag/AgCl micro-contacts against the bone behind the earlobe until impedance turns green.
          </div>
        </div>
        <div className="dusq-placement-step">
          <div className="step-num">03</div>
          <div className="step-text">
            <strong>Verify Optical Lock:</strong> Ensure the auricular PPG lens sits flush against vascular micro-capillaries.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingBottom: '16px' }}>
        <Button
          Type="Primary"
          Size="Large"
          className="dusq-btn-full"
          Button="Placement Verified · Proceed →"
          onClick={() => onNavigate('home-evening')}
        />
      </div>
    </div>
  );
}
```

### 5.15 `mobile-app.css` (Extract of Simulator & IA Classes)
```css
/* ==========================================================================
   DUSQ Chrono-Adaptive Companion Mobile System Stylesheet
   ========================================================================== */

.dusq-mobile-page {
  min-height: 100vh;
  background: #0B0D0E;
  color: #FAF8F5;
  padding: 32px 24px 64px;
  box-sizing: border-box;
}

.dusq-mobile-page__header {
  max-width: 1240px;
  margin: 0 auto 28px;
}

.dusq-mobile-page__badge {
  display: inline-block;
  background: rgba(223, 103, 56, 0.14);
  border: 1px solid rgba(223, 103, 56, 0.35);
  color: #DF6738;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.dusq-mobile-page__title {
  font-size: 32px;
  font-weight: 700;
  margin: 14px 0 8px;
  letter-spacing: -0.02em;
}

.dusq-mobile-page__subtitle {
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 760px;
  margin: 0 0 20px;
  line-height: 1.5;
}

/* Master Screen Navigation Pills */
.dusq-screen-nav-bar {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: none;
}

.dusq-screen-nav-bar::-webkit-scrollbar {
  display: none;
}

.dusq-screen-nav-pill {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.75);
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.dusq-screen-nav-pill:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #FAF8F5;
}

.dusq-screen-nav-pill.is-active {
  background: #FFFFFF;
  color: #121516;
  font-weight: 600;
  border-color: #FFFFFF;
}

/* Layout Stage */
.dusq-mobile-page__main {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 48px;
  align-items: start;
}

@media (max-width: 960px) {
  .dusq-mobile-page__main {
    grid-template-columns: 1fr;
  }
}

/* Audit Panel */
.dusq-mobile-audit-panel {
  position: sticky;
  top: 32px;
}

.dusq-audit-card {
  background: #121516;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
}

.dusq-audit-card__eyebrow {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #DF6738;
}

.dusq-audit-card__title {
  font-size: 19px;
  font-weight: 700;
  margin: 6px 0 10px;
}

.dusq-audit-card__desc {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  margin: 0 0 18px;
}

.dusq-audit-section {
  margin-bottom: 16px;
}

.dusq-audit-label {
  display: block;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 6px;
}

.dusq-audit-code {
  display: block;
  font-family: ui-monospace, Menlo, Monaco, monospace;
  font-size: 11.5px;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 10px;
  border-radius: 6px;
  color: #7DD3FC;
  word-break: break-all;
}

.dusq-audit-tokens {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.dusq-audit-callout {
  background: rgba(223, 103, 56, 0.08);
  border-left: 3px solid #DF6738;
  padding: 12px 14px;
  border-radius: 0 8px 8px 0;
  margin-top: 20px;
  font-size: 12.5px;
}

.dusq-audit-callout strong {
  color: #DF6738;
  display: block;
  margin-bottom: 4px;
}

.dusq-audit-callout p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

/* Stage & Chassis */
.dusq-mobile-stage {
  display: flex;
  justify-content: center;
  align-items: center;
}

.device.device-iphone-14-pro {
  width: 380px;
  height: 780px;
  background: #1b1a1f;
  border-radius: 54px;
  padding: 12px;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.9), inset 0 0 0 2px rgba(255, 255, 255, 0.15);
  position: relative;
  box-sizing: border-box;
}

.device-frame {
  width: 100%;
  height: 100%;
  border-radius: 44px;
  overflow: hidden;
  position: relative;
  background: #000000;
}

.device-header {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 115px;
  height: 32px;
  background: #000000;
  border-radius: 20px;
  z-index: 50;
}

.device-screen {
  width: 100%;
  height: 100%;
  background: #0B0D0E;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

/* iOS Status Bar */
.dusq-phone-status-bar {
  height: 48px;
  padding: 12px 24px 0 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FAF8F5;
  font-size: 13.5px;
  font-weight: 600;
  z-index: 40;
  position: relative;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-battery {
  display: flex;
  align-items: center;
}

.status-battery-body {
  width: 20px;
  height: 10px;
  border: 1px solid currentColor;
  border-radius: 3px;
  padding: 1px;
}

.status-battery-fill {
  height: 100%;
  background: #4ADE80;
  border-radius: 1.5px;
}

.status-battery-cap {
  width: 1.5px;
  height: 4px;
  background: currentColor;
  border-radius: 0 1px 1px 0;
}

/* Screen Scroll Container */
.dusq-screen-scroll {
  height: calc(100% - 48px);
  padding: 8px 18px 96px;
  overflow-y: auto;
  box-sizing: border-box;
  scrollbar-width: none;
}

.dusq-screen-scroll::-webkit-scrollbar {
  display: none;
}

/* Circadian Arc */
.dusq-ambient-circadian-arc {
  position: absolute;
  top: 130px;
  left: 2px;
  pointer-events: none;
  z-index: 5;
}

/* Chrono Header */
.dusq-chrono-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 6px;
  margin-bottom: 14px;
  padding: 0 2px;
}

.dusq-chrono-greeting {
  display: flex;
  flex-direction: column;
}

.dusq-chrono-greeting__lead {
  font-size: 22px;
  font-weight: 400;
  color: #FAF8F5;
  line-height: 1.15;
}

.dusq-chrono-greeting__name {
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.dusq-chrono-profile-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #FAF8F5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Consistency Row */
.dusq-chrono-metrics-row {
  display: grid;
  grid-template-columns: 1fr 64px;
  gap: 12px;
  margin-bottom: 18px;
}

.dusq-weekly-consistency {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dusq-consistency-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.dusq-consistency-days {
  display: flex;
  gap: 6px;
}

.dusq-day-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.dusq-day-pill {
  width: 25px;
  height: 25px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dusq-day-pill.is-checked {
  background: #FFFFFF;
}

.dusq-day-pill.is-upcoming {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.dusq-day-letter {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 600;
}

/* Readiness Squircle */
.dusq-readiness-squircle {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dusq-readiness-value strong {
  font-size: 19px;
  font-weight: 700;
  color: #7DD3FC;
}

.dusq-readiness-label {
  font-size: 9.5px;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 4px;
}

/* Right-Edge Bedside Tab */
.dusq-bedside-edge-tab {
  position: absolute;
  right: 0;
  top: 52%;
  transform: translateY(-50%);
  width: 24px;
  height: 38px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-right: none;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.2s ease;
}

.dusq-bedside-edge-tab:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #FAF8F5;
  width: 28px;
}

/* Chrono-Adaptive Card Stack */
.dusq-card-stack-container {
  position: relative;
  min-height: 270px;
  margin-top: 48px;
}

.dusq-chrono-card {
  border-radius: 24px;
  overflow: hidden;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.14);
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.dusq-chrono-card.is-active {
  height: 188px;
  z-index: 10;
  opacity: 1;
  transform: translateY(0) scale(1);
}

.dusq-chrono-card.is-stacked {
  position: absolute;
  left: 8px;
  right: 8px;
  top: 135px;
  height: 140px;
  z-index: 5;
  opacity: 0.76;
  transform: translateY(12px) scale(0.96);
  filter: brightness(0.75);
}

.dusq-chrono-card.is-stacked:hover {
  opacity: 0.94;
  transform: translateY(6px) scale(0.98);
}

.dusq-chrono-pill-hotspot {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 95px;
  height: 42px;
  border-radius: 999px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 5;
  transition: background 0.15s ease, transform 0.15s ease;
}

.dusq-chrono-pill-hotspot:hover {
  background: rgba(255, 255, 255, 0.18);
}

.dusq-chrono-pill-hotspot:active {
  transform: scale(0.95);
}

/* Floating Bottom Navigation Dock */
.dusq-bottom-nav-wrap {
  position: absolute;
  bottom: 14px;
  left: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  z-index: 30;
}

.dusq-bottom-nav-dock {
  flex: 1;
  background: rgba(18, 21, 22, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 4px;
}

.dusq-dock-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 16px;
  transition: all 0.2s ease;
}

.dusq-dock-item.is-active {
  color: #DF6738;
  background: rgba(223, 103, 56, 0.14);
}

.dusq-dock-label {
  font-size: 10px;
  font-weight: 500;
}

.dusq-pod-action-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dusq-pod-battery-badge {
  position: absolute;
  top: -20px;
  right: 2px;
  background: rgba(18, 21, 22, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  padding: 2px 7px;
  font-size: 9.5px;
  font-weight: 600;
  color: #FAF8F5;
  display: flex;
  align-items: center;
  gap: 4px;
}

.dusq-pod-hardware-btn {
  width: 58px;
  height: 58px;
  border-radius: 20px;
  background: rgba(18, 21, 22, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dusq-pod-hardware-btn.is-active,
.dusq-pod-hardware-btn:hover {
  background: rgba(223, 103, 56, 0.2);
  border-color: #DF6738;
}

.dusq-pod-glyph {
  width: 22px;
  height: 12px;
  position: relative;
  display: inline-block;
}

.dusq-pod-glyph::before,
.dusq-pod-glyph::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: #FAF8F5;
}

.dusq-pod-glyph::before {
  width: 9px;
  height: 9px;
  left: 0;
  top: 1.5px;
  background: rgba(255, 255, 255, 0.75);
}

.dusq-pod-glyph::after {
  width: 12px;
  height: 12px;
  right: 0;
  top: 0;
  background: #DF6738;
}

/* Proposal 1: Closed-Loop Surge Reconstruction HUD */
.dusq-surge-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.dusq-surge-stat-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.dusq-stat-big {
  font-size: 24px;
  font-weight: 700;
  color: #FAF8F5;
}

.dusq-stat-sub {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.65);
  margin: 3px 0;
}

.dusq-stat-tag {
  font-size: 9.5px;
  font-weight: 600;
}

.dusq-surge-hud-card {
  background: #121516;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;
}

.dusq-surge-timeline-tabs {
  display: flex;
  gap: 6px;
  margin: 12px 0 14px;
  overflow-x: auto;
}

.dusq-timeline-tab {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}

.dusq-timeline-tab.is-active {
  background: #DF6738;
  color: #FFFFFF;
  border-color: #DF6738;
}

.dusq-surge-wave-panel {
  background: rgba(0, 0, 0, 0.45);
  border-radius: 14px;
  padding: 12px;
}

.dusq-wave-stage-badge {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 8px;
}

.dusq-closed-loop-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 10px;
}

.flow-step .step-num {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  display: block;
}

.flow-step .step-body {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.65);
  margin: 3px 0 0;
  line-height: 1.35;
}

/* Proposal 2: Bedside Glance Mode */
.dusq-bedside-glance-mode {
  position: absolute;
  inset: 0;
  z-index: 100;
  background: #000000 !important;
  color: #EF4444 !important;
  padding: 56px 18px 40px 18px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.dusq-glance-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.dusq-glance-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #EF4444;
  box-shadow: 0 0 8px #EF4444;
}

.dusq-glance-exit-btn {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #EF4444;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.dusq-glance-clock {
  text-align: center;
  margin: 40px 0;
}

.dusq-glance-time {
  font-size: 78px;
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 1;
  display: block;
}

.dusq-glance-sub {
  font-size: 10px;
  letter-spacing: 0.14em;
  margin-top: 10px;
  display: block;
  opacity: 0.75;
}

.dusq-glance-status-card {
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.dusq-glance-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.glance-label {
  font-size: 9.5px;
  opacity: 0.65;
}

.glance-value {
  font-size: 13.5px;
  font-weight: 700;
}

.dusq-glance-action {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dusq-glance-note {
  font-size: 10.5px;
  color: rgba(239, 68, 68, 0.7);
  text-align: center;
  line-height: 1.35;
}
```

---

## 6. Design System Primitives & Tokens

### Component Runtime Contract (`packages/react/src/index.ts`)
The React components bind directly to the validated Figma component contract via `createFigmaComponents`:
* **Variant Validation**: Props like `Type` (`Primary`, `Default`, `Ghost`) and `Size` (`Large`, `Small`) match the Figma dataset.
* **Tokens**:
  - `Color / Primary / Dusq-Amber`: `#DF6738`
  - `Color / Neutral / Void-Black`: `#0B0D0E`
  - `Color / Neutral / Surface`: `#121516`
  - `Color / Feedback / Success`: `#4ADE80`
  - `Color / Feedback / Ice-Blue`: `#7DD3FC`
  - `Typography / Display`: `Inter, -apple-system, sans-serif`

---

## 7. Fable 5.2 Optimization & Improvement Roadmap

Fable 5.2 can focus its enhancement and refinement efforts on the following priority tracks:

1. **Card Stack Gesture Physics (Framer Motion / Touch)**:
   - Implement vertical and horizontal swipe gestures on `.dusq-chrono-card`.
   - Swiping the top card dismisses it with rotation around the vertical center axis and reveals the stacked card underneath (replicating Clay Global / Vantara physics).
2. **Web Audio API Vagal Synthesizer**:
   - In `HardwareHubScreen.tsx` (`handleTestTone`) and `NightActiveScreen.tsx`, synthesize an actual 432Hz sine wave with harmonic pink noise via the browser `AudioContext` with gentle exponential gain decay.
3. **Interactive Surge Waveform Canvas (High-Precision 60fps)**:
   - Upgrade the SVG path in `SleepScoreScreen.tsx` to an animated HTML5 `<canvas>` that dynamically traces the sympathetic spike detection (<50ms) and subsequent vagal deceleration smoothing.
4. **Vagal Pacer Breathing Audio-Visual Sync**:
   - Synchronize the expanding/contracting circle in `BedtimeReadinessScreen.tsx` with a soft binaural rhythmic drone for inhalation (4s), retention (7s), and exhalation (8s).
5. **Session Persistence**:
   - Persist check-in responses from `DailyCheckInScreen.tsx` into `localStorage` so the 7-day consistency matrix updates in real time.
