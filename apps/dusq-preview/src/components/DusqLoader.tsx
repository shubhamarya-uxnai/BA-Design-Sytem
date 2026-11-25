import React, { useEffect, useRef, useState } from 'react';

type Phase = 'loop' | 'flat' | 'line' | 'split' | 'done';

const STAGES = ['01 · Detect', '02 · Intervene', '03 · Stabilise'];
const CYCLE = 4600; // ms per loop
const WARM = [242, 166, 90]; // volatile / sympathetic surge
const CALM = [143, 168, 255]; // slow-wave / stabilised
const INK = '233,230,242'; // pulse rings + pod dot

const ss = (a: number, b: number, x: number) => {
  x = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

const mix = (a: number[], b: number[], k: number) =>
  a.map((v, i) => Math.round(v + (b[i] - v) * k));

export interface DusqLoaderProps {
  loading: boolean;
  onRevealed?: () => void;
}

export function DusqLoader({ loading, onRevealed }: DusqLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadingRef = useRef(loading);
  const revealedRef = useRef(onRevealed);
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState<Phase>('loop');

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    revealedRef.current = onRevealed;
  }, [onRevealed]);

  // Lock scroll until the screen opens
  useEffect(() => {
    const locked = phase === 'loop' || phase === 'flat' || phase === 'line';
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [phase]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const W = 320,
      H = 90,
      M = H / 2,
      dpr = window.devicePixelRatio || 1;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.scale(dpr, dpr);

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let last = -1;
    let exitAt: number | null = null;
    let startAt: number | null = null;
    const timers: number[] = [];

    const beginExit = (now: number) => {
      exitAt = now;
      setPhase('flat');
      timers.push(window.setTimeout(() => setPhase('line'), reduced ? 0 : 450));
      timers.push(window.setTimeout(() => setPhase('split'), reduced ? 0 : 1050));
      timers.push(window.setTimeout(() => revealedRef.current?.(), reduced ? 0 : 1250));
      timers.push(window.setTimeout(() => setPhase('done'), reduced ? 50 : 2100));
    };

    const draw = (now: number) => {
      if (startAt === null) startAt = now;
      const el = now - startAt;
      const t = reduced ? 0.85 : (el % CYCLE) / CYCLE;
      const s = reduced ? 0 : el / 1000;

      // Only exit during the calm Stabilise window, never mid-spike
      if (!loadingRef.current && exitAt === null && (reduced || (t > 0.62 && t < 0.9))) {
        beginExit(now);
      }

      const amp = exitAt === null ? 1 : 1 - ss(0, 600, now - exitAt);
      const v = ss(0.1, 0.3, t) * (1 - ss(0.44, 0.7, t)); // volatility envelope
      const st = t < 0.36 ? 0 : t < 0.6 ? 1 : 2;
      if (exitAt === null && st !== last) {
        last = st;
        setStage(st);
      }

      ctx.clearRect(0, 0, W, H);
      const c = mix(CALM, WARM, v);
      const col = `rgb(${c})`;
      const g = ctx.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0, `rgba(${c},0)`);
      g.addColorStop(0.2, col);
      g.addColorStop(0.8, col);
      g.addColorStop(1, `rgba(${c},0)`);

      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const u = x / W;
        const edge = Math.pow(Math.sin(Math.PI * u), 0.6);
        const base = Math.sin(u * Math.PI * 3 - s * 1.3) * (0.34 - 0.12 * v); // slow delta wave
        const jit =
          Math.sin(u * 53 + s * 11) * 0.5 +
          Math.sin(u * 97 - s * 17) * 0.3 +
          Math.sin(u * 151 + s * 23) * 0.2; // autonomic volatility
        const spike = Math.exp(-Math.pow((u - 0.5) / 0.055, 2)); // sympathetic surge
        const y = M - H * 0.42 * edge * amp * (base + jit * 0.32 * v + spike * 0.85 * v);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.lineJoin = 'round';
      ctx.shadowColor = `rgba(${c},0.6)`;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (exitAt === null) {
        // Intervention pulses
        for (let i = 0; i < 3; i++) {
          const p = (t - (0.36 + i * 0.06)) / 0.2;
          if (p > 0 && p < 1) {
            ctx.beginPath();
            ctx.arc(W / 2, M, 4 + p * 38, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${INK},${0.35 * (1 - p)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        // Pod dot
        ctx.beginPath();
        ctx.arc(W / 2, M, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${INK},${st === 1 ? 1 : 0.45})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className="dq-overlay"
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label="Loading DUSQ"
    >
      <div className="dq-half dq-half--top" />
      <div className="dq-half dq-half--bot" />
      <div className="dq-center">
        <canvas ref={canvasRef} className="dq-canvas" />
      </div>
      <div className="dq-mark" aria-label="DUSQ">
        <img
          src="/dusq-logo.svg"
          alt="DUSQ"
          width="77"
          height="22"
          className="dq-mark-img"
        />
      </div>
      <div className="dq-stages" aria-hidden="true">
        {STAGES.map((label, i) => (
          <span key={label} className={i === stage ? 'is-on' : ''}>
            {label}
          </span>
        ))}
      </div>
      <div className="dq-horizon" />
    </div>
  );
}

export default DusqLoader;
