export type MobileScreenId =
  | 'home-evening' // 01 & 02: Evening Home (Night Recap & Wind-Down stack)
  | 'home-morning' // 06 & 07: Morning Home (Check-in & Surges stack)
  | 'wind-down' // 06:30 PM Evening Wind-Down Routine
  | 'readiness' // 07:00 PM Sleep Readiness Session
  | 'daily-checkin' // Qualitative Check-in Survey ("How was last night?")
  | 'surges-telemetry' // Introducing Surges & Closed-Loop Surge Reconstruction
  | 'hardware-hub' // DUSQ One Hub (Behind-the-ear wearable modal/sheet)
  | 'placement-guide' // Mastoid Placement Check (Sleep Link conductance & fit)
  | 'explore' // Evening Unwind Audio & Pre-Sleep Protocols Library
  | 'bedside-glance'; // Context-Aware Bedside Glance Mode

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

export interface MobileAppState {
  currentScreen: MobileScreenId;
  activeTab: MobileTab;
  batteryPercent: number;
  deviceConnected: boolean;
  streakDays: number;
  timeOfDay: 'morning' | 'evening' | 'night';
  sosActive: boolean;
  selectedAudio: string | null;
  habitsChecked: Record<string, boolean>;
  personalNotes: string;
}
