import React, { useEffect, useState, type ReactNode } from 'react';
import { DusqLoader } from './DusqLoader';

const MIN_DISPLAY_MS = 2800; // ensures full Detect (01) and Intervene (02) before Stabilise exit window (t > 0.62)

export interface RevealShellProps {
  children: ReactNode;
}

export function RevealShell({ children }: RevealShellProps) {
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const minTime = reduced
      ? Promise.resolve()
      : new Promise((r) => setTimeout(r, MIN_DISPLAY_MS));

    const pageLoaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener('load', r, { once: true }));

    Promise.all([minTime, pageLoaded]).then(() => setLoading(false));
  }, []);

  return (
    <>
      <DusqLoader loading={loading} onRevealed={() => setRevealed(true)} />
      <div className={`dq-reveal-shell ${revealed ? 'dq-revealed' : ''}`}>
        {children}
      </div>
    </>
  );
}

export default RevealShell;
