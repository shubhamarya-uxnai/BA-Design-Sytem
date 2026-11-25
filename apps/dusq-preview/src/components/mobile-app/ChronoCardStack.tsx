import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { ChronoCard } from './types';
import { useReducedMotion } from './hooks/useReducedMotion';

/**
 * Swipe-to-dismiss card stack.
 * Drag: translateX + rotateY about the card's vertical centre axis + slight rotateZ.
 * The stacked card scales/lifts toward the top position in proportion to drag
 * progress via the --dusq-swipe-p custom property (no React re-render per frame).
 * Release: dismiss past 30% width or on a flick (>0.5 px/ms); otherwise spring back.
 * Keyboard: ←/→ inside the stack; dots are a full alternative.
 */

const AXIS_LOCK_PX = 8;
const DISMISS_RATIO = 0.3;
const FLICK_VELOCITY = 0.5; // px/ms
const MAX_ROT_Y = 22; // deg
const MAX_ROT_Z = 3; // deg
const FLY_MS = 380;
const SNAP_MS = 520;

interface Gesture {
  id: number;
  x0: number;
  y0: number;
  dx: number;
  lastX: number;
  lastT: number;
  v: number;
  axis: 'x' | 'y' | null;
}

const idleGesture = (): Gesture => ({ id: -1, x0: 0, y0: 0, dx: 0, lastX: 0, lastT: 0, v: 0, axis: null });
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const flat = (s: string) => s.replace(/\n/g, ' ');
const ctaVerb = (s: string) => s.replace(/[→›>]/g, '').trim();

interface ChronoCardStackProps {
  cards: ChronoCard[];
  label: string;
  onOpen: (card: ChronoCard) => void;
}

export function ChronoCardStack({ cards, label, onOpen }: ChronoCardStackProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const flyingRef = useRef<HTMLDivElement | null>(null);
  const gesture = useRef<Gesture>(idleGesture());
  const raf = useRef<number | null>(null);
  const timers = useRef<number[]>([]);
  const busy = useRef(false);
  const restoreFocus = useRef(false);
  const hintId = useId();
  const n = cards.length;

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      if (raf.current != null) cancelAnimationFrame(raf.current);
    },
    [],
  );

  const setReveal = (p: number) =>
    containerRef.current?.style.setProperty('--dusq-swipe-p', p.toFixed(3));

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % n) + n) % n;
      setIndex(next);
      const c = cards[next];
      setAnnouncement(`Card ${next + 1} of ${n}: ${c.timeTag}, ${flat(c.title)}`);
    },
    [cards, n],
  );

  // After the index changes: clean up the card that flew off, reset reveal, restore focus.
  useLayoutEffect(() => {
    const el = flyingRef.current;
    if (el) {
      el.style.transition = 'none';
      el.style.transform = '';
      el.style.opacity = '';
      flyingRef.current = null;
      requestAnimationFrame(() => {
        el.style.transition = '';
      });
    }
    setReveal(0);
    busy.current = false;
    if (restoreFocus.current) {
      restoreFocus.current = false;
      activeRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    }
  }, [index]);

  const paint = (dx: number) => {
    const el = activeRef.current;
    if (!el) return;
    const w = el.offsetWidth || 1;
    const p = clamp(dx / w, -1, 1);
    el.style.transform = `translate3d(${dx}px,0,0) rotateY(${p * MAX_ROT_Y}deg) rotateZ(${p * MAX_ROT_Z}deg)`;
    setReveal(Math.min(1, Math.abs(p) / 0.6));
  };

  const snapBack = () => {
    const el = activeRef.current;
    if (!el) return;
    el.style.transition = reduced ? 'none' : `transform ${SNAP_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    el.style.transform = '';
    setReveal(0);
  };

  const dismiss = (dir: 1 | -1) => {
    if (busy.current || n < 2) return;
    const el = activeRef.current;
    if (reduced || !el) {
      goTo(index + 1);
      return;
    }
    busy.current = true;
    const w = el.offsetWidth;
    el.style.transition = `transform ${FLY_MS}ms cubic-bezier(0.3, 0.7, 0.2, 1), opacity ${FLY_MS}ms ease-out`;
    el.style.transform = `translate3d(${dir * w * 1.2}px,0,0) rotateY(${dir * MAX_ROT_Y * 1.8}deg) rotateZ(${
      dir * MAX_ROT_Z * 2
    }deg)`;
    el.style.opacity = '0';
    setReveal(1);
    flyingRef.current = el;
    timers.current.push(window.setTimeout(() => goTo(index + 1), FLY_MS));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (busy.current || (e.pointerType === 'mouse' && e.button !== 0)) return;
    gesture.current = {
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      dx: 0,
      lastX: e.clientX,
      lastT: e.timeStamp,
      v: 0,
      axis: null,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = gesture.current;
    if (e.pointerId !== s.id || s.axis === 'y' || n < 2) return;
    const dx = e.clientX - s.x0;
    const dy = e.clientY - s.y0;

    if (s.axis === null) {
      if (Math.hypot(dx, dy) < AXIS_LOCK_PX) return;
      s.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (s.axis === 'y') return; // let the page scroll (touch-action: pan-y)
      // Capture only once a real drag starts, so taps still reach the CTA button.
      e.currentTarget.setPointerCapture(e.pointerId);
      containerRef.current?.classList.add('is-dragging');
      if (activeRef.current) activeRef.current.style.transition = 'none';
    }

    const dt = Math.max(1, e.timeStamp - s.lastT);
    s.v = 0.8 * ((e.clientX - s.lastX) / dt) + 0.2 * s.v;
    s.lastX = e.clientX;
    s.lastT = e.timeStamp;
    s.dx = dx;

    if (raf.current == null) {
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        paint(gesture.current.dx);
      });
    }
  };

  const endGesture = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = gesture.current;
    if (e.pointerId !== s.id) return;
    gesture.current = idleGesture();
    if (raf.current != null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }

    if (s.axis !== 'x') {
      // Plain tap on the card body (not the CTA) opens it — pointer convenience only.
      if (e.type === 'pointerup' && s.axis === null && !(e.target as HTMLElement).closest('button')) {
        onOpen(cards[index]);
      }
      return;
    }

    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    containerRef.current?.classList.remove('is-dragging');

    const w = activeRef.current?.offsetWidth ?? 1;
    const far = Math.abs(s.dx) > w * DISMISS_RATIO;
    const flick = Math.abs(s.v) > FLICK_VELOCITY && Math.sign(s.v) === Math.sign(s.dx);
    if (e.type === 'pointerup' && (far || flick)) dismiss(s.dx >= 0 ? 1 : -1);
    else snapBack();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (n < 2 || busy.current) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      restoreFocus.current = true;
      dismiss(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      restoreFocus.current = true;
      goTo(index - 1);
    }
  };

  if (n === 0) return null;
  const nextIndex = (index + 1) % n;

  return (
    <div className="dusq-card-stack">
      <div
        ref={containerRef}
        className="dusq-card-stack-container"
        role="region"
        aria-roledescription="card stack"
        aria-label={label}
        aria-describedby={hintId}
        onKeyDown={onKeyDown}
      >
        {cards.map((card, i) => {
          const isActive = i === index;
          const isNext = n > 1 && i === nextIndex && !isActive;
          if (!isActive && !isNext) return null;
          const bg = { backgroundImage: `url(${card.image})` };

          if (!isActive) {
            return (
              <div
                key={card.id}
                className="dusq-chrono-card is-stacked"
                style={bg}
                aria-hidden="true"
                onClick={() => !busy.current && goTo(i)}
              >
                <div className="dusq-chrono-card__gradient" />
                <div className="dusq-chrono-card__content">
                  <span className="dusq-chrono-card__tag">{card.timeTag}</span>
                  <div className="dusq-chrono-card__footer">
                    <h3 className="dusq-chrono-card__title" style={{ whiteSpace: 'pre-line' }}>
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={card.id}
              ref={activeRef}
              className="dusq-chrono-card is-active"
              style={bg}
              role="group"
              aria-roledescription="card"
              aria-label={`${i + 1} of ${n}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endGesture}
              onPointerCancel={endGesture}
            >
              <div className="dusq-chrono-card__gradient" aria-hidden="true" />
              <div className="dusq-chrono-card__content">
                <span className="dusq-chrono-card__tag">{card.timeTag}</span>
                <div className="dusq-chrono-card__footer">
                  <h3 className="dusq-chrono-card__title" style={{ whiteSpace: 'pre-line' }}>
                    {card.title}
                  </h3>
                  <button
                    type="button"
                    className="dusq-chrono-pill-cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen(card);
                    }}
                  >
                    {card.ctaText}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dusq-card-stack-dots" role="group" aria-label="Choose a card">
        {cards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className={`dusq-card-dot ${i === index ? 'is-active' : ''}`}
            aria-current={i === index ? 'true' : undefined}
            aria-label={`${c.timeTag}: ${flat(c.title)}`}
            onClick={() => !busy.current && i !== index && goTo(i)}
          />
        ))}
      </div>

      <p id={hintId} className="dusq-sr-only">
        Swipe the card, or use the left and right arrow keys, to move between cards.
      </p>
      <p className="dusq-sr-only" aria-live="polite">{announcement}</p>
    </div>
  );
}
