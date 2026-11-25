import React, { useEffect, useState } from 'react';
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
import { PlacementGuideScreen } from './PlacementGuideScreen';
import { vagalAudio } from './audio/vagalAudioEngine';

interface MobileAppSimulatorProps {
  initialScreen?: MobileScreenId;
  timeMode?: 'morning' | 'evening' | 'night';
}

const STATUS_TIME: Partial<Record<MobileScreenId, string>> = {
  'wind-down': '6:30',
  'placement-guide': '6:45',
  readiness: '7:00',
  'bedside-glance': '2:14',
};

const TAB_ROOT: Record<Exclude<MobileTab, 'home'>, MobileScreenId> = {
  insights: 'surges-telemetry',
  explore: 'explore',
  hardware: 'hardware-hub',
};

export function MobileAppSimulator({ initialScreen = 'home-evening', timeMode = 'evening' }: MobileAppSimulatorProps) {
  const [currentScreen, setCurrentScreen] = useState<MobileScreenId>(initialScreen);
  const [screenHistory, setScreenHistory] = useState<MobileScreenId[]>([]);
  const batteryPercent = 87;
  const homeScreen: MobileScreenId = timeMode === 'morning' ? 'home-morning' : 'home-evening';

  // Silence any synth voices when the simulator unmounts (screen switch on the page).
  useEffect(() => () => vagalAudio.stopAll(0.3), []);

  const navigateTo = (screen: MobileScreenId) => {
    if (screen === currentScreen) return;
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    if (screenHistory.length > 0) {
      setCurrentScreen(screenHistory[screenHistory.length - 1]);
      setScreenHistory((h) => h.slice(0, -1));
    } else {
      setCurrentScreen(homeScreen);
    }
  };

  /** Tabs are navigation roots: switching resets the back stack. */
  const selectRoot = (screen: MobileScreenId) => {
    setScreenHistory([]);
    setCurrentScreen(screen);
  };

  const getActiveTab = (): MobileTab => {
    if (currentScreen === 'hardware-hub' || currentScreen === 'placement-guide') return 'hardware';
    if (currentScreen === 'surges-telemetry' || currentScreen === 'readiness') return 'insights';
    if (currentScreen === 'explore') return 'explore';
    return 'home';
  };

  const handleTabSelect = (tab: MobileTab) => selectRoot(tab === 'home' ? homeScreen : TAB_ROOT[tab]);

  return (
    <div className="device device-iphone-14-pro" role="region" aria-label="DUSQ Mobile App Phone Simulator">
      <div className="device-frame">
        <div className="device-header">
          <div className="device-sensors" />
        </div>

        <div className="device-screen" data-theme="dark">
          <MobileHeader batteryPercent={batteryPercent} timeString={STATUS_TIME[currentScreen] ?? '9:41'} />

          {currentScreen === 'home-evening' && <EveningHomeScreen onNavigate={navigateTo} batteryPercent={batteryPercent} />}
          {currentScreen === 'home-morning' && <MorningHomeScreen onNavigate={navigateTo} batteryPercent={batteryPercent} />}
          {currentScreen === 'wind-down' && <NightActiveScreen onNavigate={navigateTo} onBack={navigateBack} />}
          {currentScreen === 'bedside-glance' && (
            <NightActiveScreen onNavigate={navigateTo} onBack={navigateBack} initialGlance />
          )}
          {currentScreen === 'readiness' && <BedtimeReadinessScreen onNavigate={navigateTo} onBack={navigateBack} />}
          {currentScreen === 'daily-checkin' && <DailyCheckInScreen onNavigate={navigateTo} onBack={navigateBack} />}
          {currentScreen === 'surges-telemetry' && <SleepScoreScreen onNavigate={navigateTo} onBack={navigateBack} />}
          {currentScreen === 'hardware-hub' && (
            <HardwareHubScreen onNavigate={navigateTo} onBack={navigateBack} batteryPercent={batteryPercent} />
          )}
          {currentScreen === 'placement-guide' && (
            <PlacementGuideScreen onNavigate={navigateTo} onBack={navigateBack} />
          )}
          {currentScreen === 'explore' && <ExploreSessionsScreen onNavigate={navigateTo} />}

          <BottomNavBar
            activeTab={getActiveTab()}
            onSelectTab={handleTabSelect}
            onOpenHardware={() => selectRoot('hardware-hub')}
            batteryPercent={batteryPercent}
            badges={{ insights: currentScreen === 'home-morning' }}
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
