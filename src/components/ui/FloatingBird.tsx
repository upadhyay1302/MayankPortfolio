"use client";
import { useEffect, useRef } from "react";

export default function FloatingBird() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapElRaw = wrapRef.current;
    const imgElRaw  = imgRef.current;
    if (!wrapElRaw || !imgElRaw) return;

    const wrapEl: HTMLDivElement  = wrapElRaw;
    const imgEl: HTMLImageElement = imgElRaw;

    let raf: number;
    let t0: number | null = null;

    // Horizontal speed as a fraction of container width per second.
    // (Keeps the original "vw-based" feel, but scaled off real measurements.)
    const SPEED_FRACTION = 0.065; // ~6.5% of container width per second
    const START_PHASE    = 0.35;  // where in the loop the bird starts (0..1)

    // ── Dynamic container / bird measurements ──────────────────────
    const container = (wrapEl.offsetParent as HTMLElement) || wrapEl.parentElement;

    let containerWidth  = 0;
    let containerHeight = 0;
    let birdWidth        = 0;

    function measure() {
      const rect = container
        ? container.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      containerWidth  = rect.width  || window.innerWidth;
      containerHeight = rect.height || window.innerHeight;
      // Fall back to the img's own box if it hasn't rendered yet.
      birdWidth = imgEl.getBoundingClientRect().width || imgEl.offsetWidth || 250;
    }

    measure();

    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => measure())
      : null;
    if (ro && container) ro.observe(container);
    window.addEventListener("resize", measure);

    // Path spans from fully off-screen-left to fully off-screen-right,
    // with a full bird-width margin on each side so it's NEVER
    // partially visible at the wrap points, regardless of screen size.
    function getXY(t: number) {
      const span = containerWidth + birdWidth * 2;
      const speedPx = SPEED_FRACTION * containerWidth;
      const startPx = START_PHASE * span;
      const x = -birdWidth + ((startPx + speedPx * t) % span);

      const y = 45
        + Math.sin(t * 0.25)       * 13
        + Math.sin(t * 0.09 + 1.7) *  5;

      return { x, y };
    }

    // ── Set position at t=0 BEFORE first frame so there's no flash ──
    const p0 = getXY(0);
    wrapEl.style.left = `${p0.x}px`;
    wrapEl.style.top  = `${p0.y}%`;

    // ── Fade in smoothly ────────────────────────────────────────────
    wrapEl.style.transition = "opacity 1.1s ease 0.7s";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      wrapEl.style.opacity = "1";
    }));

    function frame(ts: number) {
      if (t0 === null) t0 = ts;
      const t = (ts - t0) / 1000;

      const cur = getXY(t);
      const nxt = getXY(t + 0.05);

      const speedPx = SPEED_FRACTION * containerWidth;
      const dxPx  = nxt.x - cur.x;
      const dyPct = Math.abs(dxPx) < (containerWidth * 0.02) ? nxt.y - cur.y : 0;
      // Convert the y delta (in % of height) to px so bank angle stays
      // proportionate regardless of container aspect ratio.
      const dyPx  = (dyPct / 100) * containerHeight;
      const spd   = Math.sqrt(speedPx * speedPx + dyPx * dyPx) || 1;
      const bank  = -(dyPx / spd) * 16;

      const depth = 0.88 + 0.12 * Math.sin(t * 0.07 + 0.4);
      const alpha = 0.50 + 0.16 * Math.sin(t * 0.19 + 1.1);

      wrapEl.style.left = `${cur.x}px`;
      wrapEl.style.top  = `${cur.y}%`;

      imgEl.style.transform =
        `scaleX(-1) rotate(${bank.toFixed(2)}deg) scale(${depth.toFixed(3)})`;
      imgEl.style.opacity = alpha.toFixed(3);

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        opacity: 0,                  // ← starts hidden, JS fades it in
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 1,
        willChange: "left, top",
      }}
    >
      <img
        ref={imgRef}
        src="/bird.gif"
        alt=""
        aria-hidden
        draggable={false}
        style={{
          width: 250,
          height: 250,
          objectFit: "contain",
          display: "block",
          userSelect: "none",
          transformOrigin: "center center",
          willChange: "transform, opacity",
          mixBlendMode: "multiply",
          filter:
            "sepia(0.18) brightness(0.48) saturate(0.30) contrast(1.18)",
        }}
      />
    </div>
  );
}
