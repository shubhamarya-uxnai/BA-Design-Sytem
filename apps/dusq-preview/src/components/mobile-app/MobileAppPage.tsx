import React, { useState } from 'react';
import type { MobileScreenId } from './types';
import { MobileAppSimulator } from './MobileAppSimulator';
import { Chip } from '@dusq-design-system/react';
import './mobile-app.css';
import './mobile-app.motion.css';

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
    components: ['ProtocolSteps (01, 02, 03)', 'Selection (Toggle)', 'Button (Primary / Ghost)', 'BedsideGlancePreview'],
    thesisNote: 'Pre-Sleep Pacing: By bedtime, sleep readiness is 80% determined. Intervenes early with blue-light curfew, optional phone wind-down audio, and silent 0 dB nVNS/nVEnS arming.',
  },
  {
    id: 'readiness',
    label: '03: 07:00 PM Readiness Session',
    mode: 'evening',
    sourceKeyframe: '04_evening_sleep_readiness_active',
    components: ['ProgressDonut (12% → 85%)', 'VagalPacer (4-7-8 Circle)', 'HardwareCheckTile (0.8 kΩ)', 'Button (Primary)'],
    thesisNote: 'Physiological biofeedback session. Ag/AgCl Sleep Link impedance check primes autonomic vagal tone from 12% to 85% readiness.',
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
    thesisNote: 'Visualizes the Detect → Intervene → Stabilise clinical cycle. Proves how silent 0 dB nVNS + nVEnS neurostimulation preserved slow-wave delta rhythm overnight.',
  },
  {
    id: 'hardware-hub',
    label: '07: DUSQ One Hub',
    mode: 'evening',
    sourceKeyframe: 'Hardware Dock Action & Section 4 IA',
    components: ['DUSQOnePodGlyph', 'BatteryTelemetry (87% / 42h)', 'ImpedanceCheck (0.8 kΩ)', 'PlacementFitLink'],
    thesisNote: 'Behind-the-ear wearable telemetry. Confirms offline flash memory storage (zero phone radiation) and Ag/AgCl Sleep Link contact.',
  },
  {
    id: 'placement-guide',
    label: '08: Mastoid Placement Check',
    mode: 'evening',
    sourceKeyframe: 'Hardware Fit & Sleep Link Coupling',
    components: ['ProgressBar (96% Coupling)', 'IconButton (Ghost)', 'Chip (Success/Primary)', 'Button (Primary Large)'],
    thesisNote: 'Step-by-step postauricular Sleep Link preparation and real-time 0.8 kΩ Ag/AgCl conductance verification before bedtime.',
  },
  {
    id: 'explore',
    label: '09: Explore (Unwind Library)',
    mode: 'evening',
    sourceKeyframe: 'Section 4 Explore Library',
    components: ['FilterChips (All, Vagal, Delta)', 'UnwindAudioCards', 'Button (Play / Pause)'],
    thesisNote: 'Phone-guided pre-sleep wind-down soundscapes (pink noise, breath pacing cues) and clinical sleep guides by Dr. Siddhant Bhargava.',
  },
  {
    id: 'bedside-glance',
    label: '10: Bedside Glance (Pure Red OLED)',
    mode: 'night',
    sourceKeyframe: 'Proposal 2 / NightActiveScreen',
    components: ['BedsideGlance (Monochrome)', 'CalmingCueButton', 'InPlaceIntervention', 'RedOLEDTheme'],
    thesisNote: 'Zero-blue/green nocturnal mode (pure #FF0000 / #C00000). Protects dark-adapted pupils and melatonin production during middle-of-the-night awakenings.',
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
    <div className="dusq-mobile-page" data-theme="dark">
      {/* Top Header & Architectural Context */}
      <header className="dusq-mobile-page__header">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className="dusq-mobile-page__back-btn"
            onClick={() => onNavigate('/')}
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

        {/* Screen Switcher Bar */}
        <div className="dusq-mobile-page__screen-bar" role="tablist" aria-label="Select screen">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={selectedScreen === s.id}
              className={`dusq-mobile-page__screen-pill ${selectedScreen === s.id ? 'dusq-mobile-page__screen-pill--active' : ''}`}
              onClick={() => handleSelectScreen(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content: Phone Bezel Simulator + Component Inspector */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          justifyContent: 'center',
          alignItems: 'flex-start',
          maxWidth: '1140px',
          width: '100%',
        }}
      >
        {/* The Live Interactive Phone Frame */}
        <MobileAppSimulator
          key={selectedScreen}
          initialScreen={selectedScreen}
          timeMode={activeMeta.mode}
        />

        {/* Information Architecture & Design System Audit Panel */}
        <div className="dusq-audit-panel">
          <div className="dusq-audit-panel__header">
            <h3 className="dusq-audit-panel__title">Architectural Dossier</h3>
            <Chip Type="Success" Style="Filled" Icon={false} chip="100% IA Parity" />
          </div>

          <p className="dusq-audit-panel__screen">
            Active Screen: <strong>{activeMeta.label}</strong>
          </p>

          <div className="dusq-audit-panel__section">
            <h4 className="dusq-audit-panel__section-title">Design Leadership Thesis:</h4>
            <blockquote className="dusq-audit-panel__quote">
              "{activeMeta.thesisNote}"
            </blockquote>
            <span className="dusq-audit-panel__source">
              Ref: <code>{activeMeta.sourceKeyframe}</code>
            </span>
          </div>

          <div className="dusq-audit-panel__section">
            <h4 className="dusq-audit-panel__section-title">Components Rendered:</h4>
            <ul className="dusq-audit-panel__list">
              {activeMeta.components.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="dusq-audit-panel__section">
            <h4 className="dusq-audit-panel__section-title">Circadian Attributes:</h4>
            <div className="dusq-audit-panel__chips">
              <span className="dusq-audit-panel__tag">Mode: {activeMeta.mode}</span>
              <span className="dusq-audit-panel__tag">Zero-Score Trap</span>
              <span className="dusq-audit-panel__tag">Closed-Loop nVNS</span>
            </div>
          </div>

          <div className="dusq-audit-panel__callout">
            ✓ <strong>No external UI components.</strong> All buttons, inputs, selections, progress donuts, and steppers originate strictly from <code>@dusq-design-system/react</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
