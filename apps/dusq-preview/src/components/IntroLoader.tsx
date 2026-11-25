import React, { useEffect, useState } from 'react';

export const IntroLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion: immediately skip and unmount
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsMounted(false);
      return;
    }

    const duration = 900; // ~900ms fill
    const startTime = performance.now();
    let animId: number;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animId = requestAnimationFrame(frame);
      } else {
        // Trigger smooth curtain reveal upward
        setIsExiting(true);
        // After 700ms slide-up transition, unmount cleanly
        const timer = setTimeout(() => {
          setIsMounted(false);
        }, 700);
        return () => clearTimeout(timer);
      }
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`intro-loader ${isExiting ? 'is-exiting' : ''}`}
      role="progressbar"
      aria-label="Calibrating quiet recovery"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="intro-loader-content">
        <img
          src="/dusq-logo.svg"
          alt="DUSQ"
          width="126"
          height="36"
          className="intro-loader-logo"
        />
        <p className="intro-loader-eyebrow">Calibrating quiet recovery</p>
        <div className="intro-loader-bar-wrap" aria-hidden="true">
          <div
            className="intro-loader-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="intro-loader-counter" aria-hidden="true">
          {progress === 100 ? '100' : String(progress).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};
