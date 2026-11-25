import React, { useState, useEffect } from 'react';
import { RevealShell } from './components/RevealShell';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandsTicker } from './components/BrandsTicker';
import { FindYourFix } from './components/FindYourFix';
import { Community } from './components/Community';
import { MeetTeam } from './components/MeetTeam';
import { HowItWorks } from './components/HowItWorks';
import { ClinicalData } from './components/ClinicalData';
import { Comparison } from './components/Comparison';
import { ProductOne } from './components/ProductOne';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { SciencePage } from './components/science/SciencePage';
import { MobileAppPage } from './components/mobile-app/MobileAppPage';
import { SleepLabPage } from './components/sleep-lab/SleepLabPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.replace(/\/$/, '') || '/';
      return p;
    }
    return '/';
  });

  const navigate = (path: string, hash?: string) => {
    const cleanPath = path.replace(/\/$/, '') || '/';
    const targetUrl = cleanPath + (hash || '');

    if (cleanPath !== currentPath) {
      window.history.pushState({}, '', targetUrl);
      setCurrentPath(cleanPath);

      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      if (hash) {
        if (hash === '#top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(p);

      if (window.location.hash) {
        setTimeout(() => {
          const el = document.querySelector(window.location.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle initial hash scroll if present
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  }, []);

  const isScience = currentPath === '/pages/science' || currentPath === '/pages/science/';
  const isSleepLab =
    currentPath === '/pages/the-sleep-lab' ||
    currentPath === '/pages/the-sleep-lab/' ||
    currentPath === '/the-sleep-lab' ||
    currentPath === '/the-sleep-lab/' ||
    currentPath === '/pages/sleep-lab' ||
    currentPath === '/pages/sleep-lab/' ||
    currentPath === '/sleep-lab' ||
    currentPath === '/sleep-lab/';
  const isApp = currentPath === '/app' || currentPath === '/app/';

  if (isApp) {
    return (
      <RevealShell>
        <Header currentPath={currentPath} onNavigate={navigate} />
        <main id="top">
          <MobileAppPage onNavigate={navigate} />
        </main>
        <Footer currentPath={currentPath} onNavigate={navigate} />
      </RevealShell>
    );
  }

  return (
    <RevealShell>
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main id="top">
        {isSleepLab ? (
          <SleepLabPage onNavigate={navigate} />
        ) : isScience ? (
          <SciencePage onNavigate={navigate} />
        ) : (
          <>
            <Hero />
            <BrandsTicker />
            <FindYourFix />
            <Community />
            <MeetTeam />
            <HowItWorks onNavigate={navigate} />
            <ClinicalData onNavigate={navigate} />
            <Comparison />
            <ProductOne />
            <FAQ />
          </>
        )}
      </main>
      <Footer currentPath={currentPath} onNavigate={navigate} />
    </RevealShell>
  );
}
