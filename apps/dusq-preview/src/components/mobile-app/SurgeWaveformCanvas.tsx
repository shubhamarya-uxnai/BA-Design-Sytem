import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './hooks/useReducedMotion';

export interface SurgeTrace {
  preBpm: number;
  peakBpm: number;
  stableBpm: number;
  detectMs: number;
  burstSec: number;
}

const WINDOW_SEC = 90;
const T_DETECT = 0.3;
const RISE = 0.045;
const SAMPLES = 260;
const MORPH_MS = 650;
const SWEEP_MS = 1900;
const HEIGHT = 128;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

const lerpTrace = (a: SurgeTrace, b: SurgeTrace, t: number): SurgeTrace => ({
  preBpm: lerp(a.preBpm, b.preBpm, t),
  peakBpm: lerp(a.peakBpm, b.peakBpm, t),
  stableBpm: lerp(a.stableBpm, b.stableBpm, t),
  detectMs: lerp(a.detectMs, b.detectMs, t),
  burstSec: lerp(a.burstSec, b.burstSec, t),
});

function phases(p: SurgeTrace) {
  const tPeak = T_DETECT + RISE;
  return { tPeak, tBurstEnd: tPeak + p.burstSec / WINDOW_SEC };
}

/** Modelled HR: baseline with RSA → smoothstep sympathetic spike → exponential vagal deceleration. */
function hrAt(t: number, p: SurgeTrace): number {
  const { tPeak, tBurstEnd } = phases(p);
  const rsa = Math.sin(t * Math.PI * 2 * 22) * 0.8 + Math.sin(t * Math.PI * 2 * 6.7 + 1.3) * 0.5;
  if (t <= T_DETECT) return p.preBpm + rsa;
  if (t <= tPeak) {
    const u = (t - T_DETECT) / RISE;
    const s = u * u * (3 - 2 * u);
    return p.preBpm + (p.peakBpm - p.preBpm) * s + rsa * (1 - s);
  }
  const tau = (tBurstEnd - tPeak) / 2.4;
  const d = t - tPeak;
  const settle = 1 - Math.exp(-d / (tau * 1.5));
  return p.stableBpm + (p.peakBpm - p.stableBpm) * Math.exp(-d / tau) + rsa * 0.7 * settle;
}

interface Palette {
  amber: string;
  orange: string;
  green: string;
  muted: string;
  grid: string;
  ghost: string;
}

function readPalette(el: HTMLElement): Palette {
  const cs = getComputedStyle(el);
  const v = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
  return {
    amber: v('--ba-color-themes-primary-300', '#F7A366'),
    orange: v('--ba-color-themes-primary-400', '#F0650D'),
    green: v('--ba-semantic-color-tokens-status-success-fill', '#49B374'),
    muted: 'rgba(250, 248, 245, 0.72)',
    grid: 'rgba(255, 255, 255, 0.08)',
    ghost: 'rgba(255, 255, 255, 0.16)',
  };
}

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, p: SurgeTrace, sweep: number, c: Palette) {
  ctx.clearRect(0, 0, w, h);
  const top = 22;
  const bottom = h - 18;
  const left = 6;
  const right = w - 6;
  const lo = Math.min(p.preBpm, p.stableBpm) - 4;
  const hi = p.peakBpm + 4;
  const X = (t: number) => left + t * (right - left);
  const Y = (bpm: number) => top + (1 - (bpm - lo) / (hi - lo)) * (bottom - top);
  const { tPeak, tBurstEnd } = phases(p);

  // grid
  ctx.strokeStyle = c.grid;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = Math.round(top + (i / 3) * (bottom - top)) + 0.5;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  // intervention window
  const bx0 = X(tPeak - 0.012);
  const bx1 = X(tBurstEnd);
  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = c.orange;
  ctx.fillRect(bx0, top - 6, bx1 - bx0, bottom - top + 10);
  ctx.globalAlpha = 0.7;
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = c.orange;
  ctx.strokeRect(bx0 + 0.5, top - 5.5, bx1 - bx0 - 1, bottom - top + 9);
  ctx.restore();

  const trace = (t0: number, t1: number, color: string, width: number) => {
    if (t1 <= t0) return;
    const steps = Math.max(2, Math.ceil((t1 - t0) * SAMPLES));
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = t0 + ((t1 - t0) * i) / steps;
      const x = X(t);
      const y = Y(hrAt(t, p));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  trace(0, 1, c.ghost, 1.25);
  trace(0, Math.min(sweep, tPeak), c.amber, 2.25);
  trace(tPeak, Math.min(sweep, tBurstEnd), c.orange, 2.6);
  trace(tBurstEnd, sweep, c.green, 2.1);

  ctx.font = '600 11px Arial, sans-serif';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = c.orange;
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.round(p.burstSec)}s burst`, (bx0 + bx1) / 2, top - 9);

  if (sweep >= tPeak) {
    const px = X(tPeak);
    const py = Y(p.peakBpm);
    ctx.fillStyle = c.amber;
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(p.peakBpm)} bpm · ${Math.round(p.detectMs)} ms`, px - 7, Math.max(top + 2, py + 3));
  }

  if (sweep >= tBurstEnd) {
    ctx.fillStyle = c.green;
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(p.stableBpm)} bpm`, right, Y(p.stableBpm) - 8);
  }

  ctx.fillStyle = c.muted;
  ctx.textAlign = 'left';
  ctx.fillText('Heart rate · 90 s window', left, h - 3);

  if (sweep < 1) {
    const color = sweep < tPeak ? c.amber : sweep < tBurstEnd ? c.orange : c.green;
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(X(sweep), Y(hrAt(sweep, p)), 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export function SurgeWaveformCanvas({ trace, description }: { trace: SurgeTrace; description: string }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shown = useRef<SurgeTrace>(trace);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || width === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(HEIGHT * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const palette = readPalette(wrap);
    const from = shown.current;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const m = reduced ? 1 : Math.min(1, (now - start) / MORPH_MS);
      const s = reduced ? 1 : Math.min(1, (now - start) / SWEEP_MS);
      const current = lerpTrace(from, trace, easeOutCubic(m));
      shown.current = current;
      draw(ctx, width, HEIGHT, current, easeInOutSine(s), palette);
      if (m < 1 || s < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [trace, width, reduced]);

  return (
    <div ref={wrapRef} className="dusq-wave-canvas-wrap">
      <canvas ref={canvasRef} className="dusq-surge-canvas" role="img" aria-label={description} style={{ height: HEIGHT }}>
        {description}
      </canvas>
    </div>
  );
}
