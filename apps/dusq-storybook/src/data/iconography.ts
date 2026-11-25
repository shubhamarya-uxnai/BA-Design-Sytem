import React from 'react';
import {
  IconArrowUpRight,
  IconArrowRight,
  IconArrowUp,
  IconArrowDown,
  IconMenu2,
  IconX,
  IconPlus,
  IconWaveSine,
  IconBrandLinkedin,
  IconMoon,
  IconSun,
  IconSparkles,
  IconBrain,
  IconActivity,
  IconZzz,
  IconHeartRateMonitor,
  IconShieldCheck,
  IconAward,
  IconCheck,
  IconInfoCircle,
  IconAdjustments,
  IconSettings,
  IconChevronRight,
  IconChevronDown,
  IconRefresh,
  IconEye,
  IconDeviceWatch,
  IconHeadphones,
  IconVolume,
  IconBolt,
  IconClock,
  IconBed,
  IconFlame,
  IconFilter,
  IconDeviceMobile,
  type IconProps,
} from '@tabler/icons-react';

export interface IconItem {
  name: string;
  category: 'DUSQ Website Live' | 'Sleep & Neuroscience' | 'UI & Navigation' | 'Hardware & Sensing';
  component: React.ComponentType<IconProps>;
  usage: string;
}

export const DUSQ_ICONS: IconItem[] = [
  // DUSQ Website Live
  { name: 'IconArrowUpRight', category: 'DUSQ Website Live', component: IconArrowUpRight, usage: 'PillButton sliding arrow container, external website outbound links' },
  { name: 'IconArrowRight', category: 'DUSQ Website Live', component: IconArrowRight, usage: 'Carousel next control button, step flow indicator' },
  { name: 'IconMenu2', category: 'DUSQ Website Live', component: IconMenu2, usage: 'Mobile responsive header hamburger toggle trigger' },
  { name: 'IconX', category: 'DUSQ Website Live', component: IconX, usage: 'Mobile menu close button, modal dismiss' },
  { name: 'IconPlus', category: 'DUSQ Website Live', component: IconPlus, usage: 'FAQ interactive accordion expand / rotate 45deg on open' },
  { name: 'IconWaveSine', category: 'DUSQ Website Live', component: IconWaveSine, usage: 'FindYourFix section header icon slot, neuromodulation frequency' },
  { name: 'IconBrandLinkedin', category: 'DUSQ Website Live', component: IconBrandLinkedin, usage: 'MeetTeam founder LinkedIn profile external button' },
  { name: 'IconArrowUp', category: 'DUSQ Website Live', component: IconArrowUp, usage: 'Clinical data positive sleep efficiency outcome indicator' },
  { name: 'IconArrowDown', category: 'DUSQ Website Live', component: IconArrowDown, usage: 'Clinical data microarousal frequency reduction' },

  // Sleep & Neuroscience
  { name: 'IconBrain', category: 'Sleep & Neuroscience', component: IconBrain, usage: 'Nervous system dysregulation, vagus nerve stimulation tracking' },
  { name: 'IconActivity', category: 'Sleep & Neuroscience', component: IconActivity, usage: 'EDA (electrodermal activity) skin conductance and surge sensing' },
  { name: 'IconZzz', category: 'Sleep & Neuroscience', component: IconZzz, usage: 'Deep sleep slow-wave state, sleep readiness score' },
  { name: 'IconMoon', category: 'Sleep & Neuroscience', component: IconMoon, usage: 'Night mode, bedtime onset cycle trigger' },
  { name: 'IconSun', category: 'Sleep & Neuroscience', component: IconSun, usage: 'Morning recovery report, wake cycle stabilization' },
  { name: 'IconHeartRateMonitor', category: 'Sleep & Neuroscience', component: IconHeartRateMonitor, usage: 'PPG photoplethysmography pulse sensor, HRV heart rate variability' },
  { name: 'IconBed', category: 'Sleep & Neuroscience', component: IconBed, usage: 'Bedtime posture, overnight session recording' },
  { name: 'IconSparkles', category: 'Sleep & Neuroscience', component: IconSparkles, usage: 'Neuro-adaptive algorithm recommendations, AI fix generator' },

  // UI & Navigation
  { name: 'IconCheck', category: 'UI & Navigation', component: IconCheck, usage: 'Comparison table feature supported badge, success alert' },
  { name: 'IconChevronRight', category: 'UI & Navigation', component: IconChevronRight, usage: 'Breadcrumbs, multi-step navigation flow' },
  { name: 'IconChevronDown', category: 'UI & Navigation', component: IconChevronDown, usage: 'Dropdown selectors, filter accordions' },
  { name: 'IconInfoCircle', category: 'UI & Navigation', component: IconInfoCircle, usage: 'Scientific trial citations, methodology tooltips' },
  { name: 'IconShieldCheck', category: 'UI & Navigation', component: IconShieldCheck, usage: 'Clinical safety compliance, medical grade biocompatibility' },
  { name: 'IconAward', category: 'UI & Navigation', component: IconAward, usage: 'Peer-reviewed clinical validation award' },
  { name: 'IconRefresh', category: 'UI & Navigation', component: IconRefresh, usage: 'Closed loop DETECT-INTERVENE-STABILISE continuous cycle' },
  { name: 'IconFilter', category: 'UI & Navigation', component: IconFilter, usage: 'Diagnostic questionnaire filter' },

  // Hardware & Sensing
  { name: 'IconDeviceWatch', category: 'Hardware & Sensing', component: IconDeviceWatch, usage: 'DUSQ One behind-the-ear wearable hardware' },
  { name: 'IconHeadphones', category: 'Hardware & Sensing', component: IconHeadphones, usage: 'Vestibular acoustic neuromodulation channel' },
  { name: 'IconVolume', category: 'Hardware & Sensing', component: IconVolume, usage: 'Gentle auditory stimulus intensity' },
  { name: 'IconBolt', category: 'Hardware & Sensing', component: IconBolt, usage: 'Micro-electrical vagal nerve stimulation pulses' },
  { name: 'IconClock', category: 'Hardware & Sensing', component: IconClock, usage: 'Overnight runtime, sleep onset latency (minutes)' },
  { name: 'IconDeviceMobile', category: 'Hardware & Sensing', component: IconDeviceMobile, usage: 'DUSQ Companion iOS and Android mobile app sync' },
  { name: 'IconEye', category: 'Hardware & Sensing', component: IconEye, usage: 'Microarousal eye-movement tracking' },
  { name: 'IconAdjustments', category: 'Hardware & Sensing', component: IconAdjustments, usage: 'Personalized stimulus calibration slider' },
  { name: 'IconSettings', category: 'Hardware & Sensing', component: IconSettings, usage: 'App settings, sensor thresholds configuration' },
];
