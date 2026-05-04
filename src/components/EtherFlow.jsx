import React, { useRef, useEffect } from 'react';

/**
 * EtherFlow — Silk smoke canvas matching the exact vision mockup.
 *
 * Analysis of mockup:
 * - BG: #090910 near-black (pure dark, not blue)
 * - LEFT: Warm pink→lavender silk, enters top-left, S-curves down left edge
 * - RIGHT: Cyan-blue→blue-violet silk, enters top-right, sweeps down-center-right
 * - CENTER: Deliberately DARK — no silk, creates contrast for white text
 * - Bottom: Deep purple/indigo wisps
 * - Technique: Many stacked thin semi-transparent strands = 3D cylinder sheen
 */
const EtherFlow = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /**
     * Paints a volumetric silk ribbon using the "many thin strands" technique.
     * This creates the 3D sheen: strands accumulate in the center of the ribbon
     * creating bright highlights, while edges naturally taper off — exactly like
     * real silk or satin reflecting light.
     *
     * @param spineFn   t→{x,y}  — the center spine of the ribbon at time t∈[0,1]
     * @param spreadW   total half-width of the ribbon in pixels
     * @param strandCount number of strands to stack
     * @param colorStops array of {frac, r,g,b} defining color along spread axis
     * @param alpha     base opacity multiplier
     * @param blurPx    per-frame ctx.filter blur value (0 = sharp)
     */
    const paintRibbon = (spineFn, spreadW, strandCount, colorStops, alpha, blurPx = 0) => {
      if (blurPx > 0) ctx.filter = `blur(${blurPx}px)`;

      for (let s = 0; s < strandCount; s++) {
        const frac = s / (strandCount - 1); // 0..1 across width
        const offset = (frac - 0.5) * spreadW * 2;

        // Brightness: peaks in center (frac=0.5), falls off at edges
        const center = 1 - Math.abs(frac - 0.5) * 2; // 0 at edges, 1 at center
        const brightness = 0.15 + center * 0.85; // min brightness at edges

        // Interpolate color at this strand position
        let ci = 0;
        for (let i = 0; i < colorStops.length - 1; i++) {
          if (frac >= colorStops[i].f && frac <= colorStops[i + 1].f) {
            const t2 = (frac - colorStops[i].f) / (colorStops[i + 1].f - colorStops[i].f);
            const a = colorStops[i], b = colorStops[i + 1];
            ci = {
              r: a.r + (b.r - a.r) * t2,
              g: a.g + (b.g - a.g) * t2,
              b: a.b + (b.b - a.b) * t2,
            };
            break;
          }
        }
        if (!ci) ci = colorStops[colorStops.length - 1];

        // Build the strand path by sampling spineFn and offsetting perpendicular
        const pts = [];
        const steps = 30;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const p = spineFn(t);
          const p2 = spineFn(Math.min(t + 0.02, 1));
          const dx = p2.x - p.x, dy = p2.y - p.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          // Perpendicular offset
          pts.push({ x: p.x - (dy / len) * offset, y: p.y + (dx / len) * offset });
        }

        // Draw smooth bezier through the pts (quadratic chaining)
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 2; i++) {
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x + pts[i + 1].x) / 2, (pts[i].y + pts[i + 1].y) / 2);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);

        const strandAlpha = alpha * brightness * (0.04 + center * 0.06);
        ctx.strokeStyle = `rgba(${Math.round(ci.r)},${Math.round(ci.g)},${Math.round(ci.b)},${strandAlpha})`;
        ctx.lineWidth = 2 + center * 12; // thicker at center = 3D cylinder
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      if (blurPx > 0) ctx.filter = 'none';
    };

    const animate = (ts) => {
      const t = ts * 0.00015; // very slow drift

      // ── CLEAR ──
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#090910';
      ctx.fillRect(0, 0, W, H);

      // Use screen blending so silk colors add to the dark background
      ctx.globalCompositeOperation = 'screen';

      // ═══════════════════════════════════════════════════════════
      // PHASE 1 — AMBIENT GLOW (large blurred color masses)
      // Sets the atmospheric color of the scene before silk renders
      // ═══════════════════════════════════════════════════════════

      ctx.filter = 'blur(90px)';
      ctx.globalAlpha = 1;

      // Left ambient — warm pink/violet mass
      const ambL = ctx.createRadialGradient(W * 0.12, H * 0.52, 0, W * 0.12, H * 0.52, W * 0.42);
      ambL.addColorStop(0, 'rgba(200, 120, 180, 0.45)');
      ambL.addColorStop(0.5, 'rgba(130, 60, 160, 0.25)');
      ambL.addColorStop(1, 'rgba(40, 10, 70, 0)');
      ctx.fillStyle = ambL; ctx.fillRect(0, 0, W, H);

      // Right ambient — blue/cyan mass
      const ambR = ctx.createRadialGradient(W * 0.85, H * 0.38, 0, W * 0.85, H * 0.38, W * 0.4);
      ambR.addColorStop(0, 'rgba(80, 160, 240, 0.4)');
      ambR.addColorStop(0.5, 'rgba(50, 90, 200, 0.2)');
      ambR.addColorStop(1, 'rgba(15, 30, 90, 0)');
      ctx.fillStyle = ambR; ctx.fillRect(0, 0, W, H);

      // Bottom-right purple ambient (the "deep indigo" visible bottom-right in mockup)
      const ambBR = ctx.createRadialGradient(W * 0.78, H * 0.82, 0, W * 0.78, H * 0.82, W * 0.32);
      ambBR.addColorStop(0, 'rgba(90, 40, 160, 0.5)');
      ambBR.addColorStop(1, 'rgba(20, 5, 50, 0)');
      ctx.fillStyle = ambBR; ctx.fillRect(0, 0, W, H);

      ctx.filter = 'none';

      // ═══════════════════════════════════════════════════════════
      // PHASE 2 — MAIN SILK RIBBONS
      // These are the dominant flowing fabric shapes in the mockup.
      // Each ribbon is made of ~60 stacked thin strands → 3D sheen.
      // ═══════════════════════════════════════════════════════════

      // ─── RIBBON L1: LEFT MAIN — Warm Pink/Lavender ───
      // Mockup: large ribbon entering top-left, sweeping down the left edge
      // in an S-curve. Warm pink at brightest, violet in shadows.
      const L1 = (t) => {
        const s1x = Math.sin(t * Math.PI * 1.2 + t * 0.8) * W * 0.04;
        const s1y = Math.sin(t * Math.PI * 0.9 + 0.5) * H * 0.04;
        const s2 = Math.sin(t * 0.6 + t) * 0.03;
        return {
          x: W * (-0.04 + t * 0.32 + s1x / W + s2) + Math.sin(t * 1.5 + t * 0.3) * W * 0.03,
          y: H * (t * 1.08 - 0.04 + s1y / H),
        };
      };
      // Blurred soft pass (glow aura)
      paintRibbon(L1, W * 0.22, 30,
        [
          { f: 0, r: 30, g: 5, b: 60 },
          { f: 0.25, r: 160, g: 80, b: 180 },
          { f: 0.5, r: 220, g: 160, b: 220 },
          { f: 0.75, r: 160, g: 80, b: 180 },
          { f: 1, r: 30, g: 5, b: 60 },
        ], 2.5, 20);
      // Sharp silk pass
      paintRibbon(L1, W * 0.18, 55,
        [
          { f: 0, r: 10, g: 2, b: 30 },
          { f: 0.2, r: 120, g: 60, b: 150 },
          { f: 0.42, r: 230, g: 170, b: 230 }, // bright warm pink at center-left fold
          { f: 0.5, r: 245, g: 185, b: 235 }, // peak brightness: warm pink
          { f: 0.58, r: 210, g: 155, b: 215 },
          { f: 0.78, r: 120, g: 60, b: 150 },
          { f: 1, r: 10, g: 2, b: 30 },
        ], 3.2);

      // ─── RIBBON L2: LEFT SECONDARY — Blue wisps crossing into left ───
      // Mockup: thin blue/teal tendrils that cross near the center-left
      const L2 = (t) => {
        const s = Math.sin(t * 0.7 + t * 0.4) * W * 0.025;
        return {
          x: W * (0.05 + t * 0.52 + s / W) + Math.sin(t * 2.1 + t * 0.2) * W * 0.025,
          y: H * (0.55 + t * 0.5 - 0.04),
        };
      };
      paintRibbon(L2, W * 0.08, 30,
        [
          { f: 0, r: 20, g: 40, b: 100 },
          { f: 0.4, r: 80, g: 190, b: 240 },
          { f: 0.5, r: 110, g: 210, b: 250 },
          { f: 0.6, r: 80, g: 190, b: 240 },
          { f: 1, r: 20, g: 40, b: 100 },
        ], 2.2, 5);

      // ─── RIBBON R1: RIGHT MAIN — Cyan-Blue flowing from top-right ───
      // Mockup: large blue-cyan ribbon entering from top-right, sweeping down-left
      // S-curves creating the "wave" pattern visible on the right
      const R1 = (t) => {
        const s1 = Math.sin(t * Math.PI * 1.1 + t * 0.5) * W * 0.04;
        const s2 = Math.sin(t * 0.8 + 1.5) * H * 0.035;
        return {
          x: W * (1.05 - t * 0.38 + s1 / W) + Math.sin(t * 1.8 + t * 0.25) * W * 0.03,
          y: H * (t * 1.06 - 0.03 + s2 / H),
        };
      };
      paintRibbon(R1, W * 0.2, 50,
        [
          { f: 0, r: 10, g: 20, b: 60 },
          { f: 0.2, r: 50, g: 110, b: 200 },
          { f: 0.42, r: 100, g: 190, b: 245 }, // bright cyan-blue
          { f: 0.5, r: 120, g: 200, b: 250 }, // peak: cyan
          { f: 0.58, r: 90, g: 170, b: 240 },
          { f: 0.78, r: 50, g: 100, b: 190 },
          { f: 1, r: 10, g: 15, b: 60 },
        ], 3.0);
      // Blurred glow aura for right silk
      paintRibbon(R1, W * 0.25, 25,
        [
          { f: 0, r: 10, g: 20, b: 60 },
          { f: 0.5, r: 70, g: 140, b: 220 },
          { f: 1, r: 10, g: 20, b: 60 },
        ], 2.0, 25);

      // ─── RIBBON R2: RIGHT SECONDARY — Purple-violet sweep ───
      // Mockup: the deeper purple/indigo tones on the right side, lower area
      const R2 = (t) => {
        const s = Math.sin(t * 1.3 + 2 + t * 0.3) * W * 0.035;
        return {
          x: W * (1.06 - t * 0.42 + s / W),
          y: H * (0.18 + t * 0.92),
        };
      };
      paintRibbon(R2, W * 0.15, 40,
        [
          { f: 0, r: 15, g: 5, b: 50 },
          { f: 0.35, r: 80, g: 40, b: 160 },
          { f: 0.5, r: 120, g: 70, b: 200 }, // medium purple
          { f: 0.65, r: 80, g: 40, b: 160 },
          { f: 1, r: 15, g: 5, b: 50 },
        ], 2.5);

      // ─── RIBBON T: TOP — Pink wisps entering from top-center-left ───
      // Mockup: thin pink/lavender wisps visible at very top coming from top-left
      const RT = (t) => {
        return {
          x: W * (-0.05 + t * 0.55) + Math.sin(t * Math.PI * 1.5 + t * 0.4) * W * 0.04,
          y: H * (t * 0.42 - 0.05) + Math.sin(t * 2.2 + 0.8) * H * 0.03,
        };
      };
      paintRibbon(RT, W * 0.09, 28,
        [
          { f: 0, r: 20, g: 5, b: 40 },
          { f: 0.5, r: 200, g: 150, b: 210 }, // soft pink-lavender
          { f: 1, r: 20, g: 5, b: 40 },
        ], 1.8, 4);

      // ─── RIBBON B: BOTTOM — Deep violet/blue wisps at bottom ───
      // Mockup: bottom area has visible blue-teal wisps + deep purple base
      const RB = (t) => {
        return {
          x: W * (0.1 + t * 0.8) + Math.sin(t * Math.PI * 1.2 + t * 0.6) * W * 0.05,
          y: H * (0.72 + t * 0.35) + Math.sin(t * 1.8 + 1) * H * 0.03,
        };
      };
      paintRibbon(RB, W * 0.1, 35,
        [
          { f: 0, r: 20, g: 10, b: 60 },
          { f: 0.3, r: 60, g: 160, b: 220 },
          { f: 0.5, r: 80, g: 180, b: 235 }, // teal-blue
          { f: 0.7, r: 60, g: 160, b: 220 },
          { f: 1, r: 15, g: 5, b: 50 },
        ], 2.2, 3);

      // ═══════════════════════════════════════════════════════════
      // PHASE 3 — BRIGHT HIGHLIGHT STREAKS
      // The shiny "fold" lines on the silk surface visible in mockup
      // ═══════════════════════════════════════════════════════════

      // Left silk fold highlight (the bright line visible on the left ribbon)
      const HL = (t) => ({
        x: W * (-0.02 + t * 0.28) + Math.sin(t * 2.5 + t * 0.4) * W * 0.025,
        y: H * (t * 1.05 - 0.02),
      });
      paintRibbon(HL, W * 0.02, 15,
        [
          { f: 0, r: 200, g: 170, b: 230, },
          { f: 0.5, r: 240, g: 210, b: 255 },
          { f: 1, r: 200, g: 170, b: 230 },
        ], 2.5, 2);

      // Right silk fold highlight (blue sheen line on right ribbon)
      const HR = (t) => ({
        x: W * (1.04 - t * 0.36) + Math.sin(t * 2.2 + 1 + t * 0.3) * W * 0.02,
        y: H * (t * 1.04 - 0.02),
      });
      paintRibbon(HR, W * 0.018, 12,
        [
          { f: 0, r: 160, g: 220, b: 255 },
          { f: 0.5, r: 200, g: 240, b: 255 },
          { f: 1, r: 160, g: 220, b: 255 },
        ], 2.0, 2);

      // ═══════════════════════════════════════════════════════════
      // PHASE 4 — POST-PROCESSING (normal blend)
      // Vignette, center darkening, bottom fade
      // ═══════════════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.filter = 'none';

      // Center darkening — ensures text stays readable (key to the mockup look)
      const centerDark = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, W * 0.5);
      centerDark.addColorStop(0, 'rgba(6, 6, 12, 0.55)');
      centerDark.addColorStop(0.45, 'rgba(6, 6, 12, 0.3)');
      centerDark.addColorStop(1, 'rgba(6, 6, 12, 0)');
      ctx.fillStyle = centerDark;
      ctx.fillRect(0, 0, W, H);

      // Edge vignette (all four sides)
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, Math.max(W, H) * 0.8);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(4,4,12,0.8)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // Bottom fade into page
      const btm = ctx.createLinearGradient(0, H * 0.68, 0, H);
      btm.addColorStop(0, 'rgba(9,9,16,0)');
      btm.addColorStop(1, 'rgba(9,9,16,1)');
      ctx.fillStyle = btm;
      ctx.fillRect(0, H * 0.68, W, H * 0.32);

      // Top slight fade
      const top = ctx.createLinearGradient(0, 0, 0, H * 0.1);
      top.addColorStop(0, 'rgba(9,9,16,0.6)');
      top.addColorStop(1, 'rgba(9,9,16,0)');
      ctx.fillStyle = top;
      ctx.fillRect(0, 0, W, H * 0.1);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default EtherFlow;
