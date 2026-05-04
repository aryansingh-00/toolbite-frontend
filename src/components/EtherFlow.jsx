import React, { useRef, useEffect } from 'react';

/**
 * EtherFlow — Canvas-based animated silk background.
 * Exactly matches the vision mockup: thick 3D flowing silk ribbons in
 * deep purple, lavender, pink, and blue on near-black.
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

    // ── Helper: draw a thick volumetric ribbon ──
    // spine: array of {x, y} points (the center-line)
    // halfW: half-width of the ribbon (varies per point via widths[])
    // gradient: CanvasGradient or color string
    // alpha: global opacity
    const drawRibbon = (spine, widths, gradient, alpha, blur = 0) => {
      if (spine.length < 2) return;

      // Build left and right edge points
      const left = [];
      const right = [];
      for (let i = 0; i < spine.length; i++) {
        let dx, dy;
        if (i === 0) {
          dx = spine[1].x - spine[0].x;
          dy = spine[1].y - spine[0].y;
        } else if (i === spine.length - 1) {
          dx = spine[i].x - spine[i - 1].x;
          dy = spine[i].y - spine[i - 1].y;
        } else {
          dx = spine[i + 1].x - spine[i - 1].x;
          dy = spine[i + 1].y - spine[i - 1].y;
        }
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = (-dy / len) * widths[i];
        const ny = (dx / len) * widths[i];
        left.push({ x: spine[i].x + nx, y: spine[i].y + ny });
        right.push({ x: spine[i].x - nx, y: spine[i].y - ny });
      }

      // Smooth bezier path: left edge forward, right edge backward
      const catmull = (pts) => {
        const out = [];
        for (let i = 0; i < pts.length - 1; i++) {
          const p0 = pts[Math.max(0, i - 1)];
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const p3 = pts[Math.min(pts.length - 1, i + 2)];
          out.push({
            cp1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
            cp2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
            end: p2,
          });
        }
        return out;
      };

      const leftSegs = catmull(left);
      const rightSegs = catmull(right);

      if (blur > 0) ctx.filter = `blur(${blur}px)`;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(left[0].x, left[0].y);
      for (const s of leftSegs) ctx.bezierCurveTo(s.cp1.x, s.cp1.y, s.cp2.x, s.cp2.y, s.end.x, s.end.y);
      ctx.lineTo(right[right.length - 1].x, right[right.length - 1].y);
      for (let i = rightSegs.length - 1; i >= 0; i--) {
        const s = rightSegs[i];
        ctx.bezierCurveTo(s.cp2.x, s.cp2.y, s.cp1.x, s.cp1.y, right[i].x, right[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
    };

    // ── Make a linear gradient along two points ──
    const lg = (x0, y0, x1, y1, stops) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      stops.forEach(([t, c]) => g.addColorStop(t, c));
      return g;
    };

    // ── Animation loop ──
    const animate = (ts) => {
      const t = ts * 0.00018; // very slow

      ctx.clearRect(0, 0, W, H);

      // Base — near-black
      ctx.fillStyle = '#08080f';
      ctx.fillRect(0, 0, W, H);

      // ═══════════════════════════════════════════════
      // LAYER 1 — SOFT BACKGROUND GLOW (blurred blobs)
      // These create the ambient atmospheric light
      // ═══════════════════════════════════════════════

      // Deep violet mass — bottom-left (ambient glow)
      ctx.filter = 'blur(80px)';
      ctx.globalAlpha = 0.75;
      const bg1 = ctx.createRadialGradient(W * 0.1, H * 0.85, 0, W * 0.1, H * 0.85, W * 0.45);
      bg1.addColorStop(0, 'rgba(80, 20, 160, 0.9)');
      bg1.addColorStop(0.5, 'rgba(50, 10, 100, 0.5)');
      bg1.addColorStop(1, 'rgba(10, 5, 30, 0)');
      ctx.fillStyle = bg1;
      ctx.fillRect(0, 0, W, H);

      // Pink/lavender mass — top-right  
      ctx.globalAlpha = 0.6;
      const bg2 = ctx.createRadialGradient(W * 0.9, H * 0.15, 0, W * 0.9, H * 0.15, W * 0.4);
      bg2.addColorStop(0, 'rgba(180, 130, 220, 0.7)');
      bg2.addColorStop(0.5, 'rgba(120, 80, 180, 0.35)');
      bg2.addColorStop(1, 'rgba(20, 10, 50, 0)');
      ctx.fillStyle = bg2;
      ctx.fillRect(0, 0, W, H);

      // Blue/cyan mass — right-center
      ctx.globalAlpha = 0.55;
      const bg3 = ctx.createRadialGradient(W * 0.88, H * 0.55, 0, W * 0.88, H * 0.55, W * 0.35);
      bg3.addColorStop(0, 'rgba(80, 170, 230, 0.65)');
      bg3.addColorStop(0.5, 'rgba(40, 100, 180, 0.3)');
      bg3.addColorStop(1, 'rgba(5, 20, 60, 0)');
      ctx.fillStyle = bg3;
      ctx.fillRect(0, 0, W, H);

      ctx.globalAlpha = 1;
      ctx.filter = 'none';

      // ═══════════════════════════════════════════════
      // LAYER 2 — MAIN SILK RIBBONS
      // Thick volumetric flowing fabric shapes
      // ═══════════════════════════════════════════════

      // === RIBBON A: Large dark-purple silk — left side, sweeping from bottom-left to top ===
      // In the mockup: the dominant large purple ribbon on the left
      const rA_spine = [
        { x: W * -0.05,                               y: H * 1.05 },
        { x: W * 0.05 + Math.sin(t * 1.1) * W * 0.03, y: H * 0.75 + Math.sin(t * 0.8) * H * 0.04 },
        { x: W * 0.12 + Math.sin(t * 0.9) * W * 0.04, y: H * 0.5  + Math.sin(t * 1.0) * H * 0.05 },
        { x: W * 0.08 + Math.sin(t * 1.2) * W * 0.03, y: H * 0.25 + Math.sin(t * 0.7) * H * 0.04 },
        { x: W * 0.18 + Math.sin(t * 0.8) * W * 0.04, y: H * -0.05 },
      ];
      const rA_w = [
        W * 0.18,
        W * 0.17 + Math.sin(t * 0.6) * W * 0.02,
        W * 0.16 + Math.sin(t * 0.8) * W * 0.025,
        W * 0.14 + Math.sin(t * 0.7) * W * 0.02,
        W * 0.12,
      ];
      // Soft blur pass first
      drawRibbon(rA_spine, rA_w.map(v => v * 1.4),
        lg(-W * 0.1, H * 0.9, W * 0.3, 0, [
          [0, 'rgba(15, 5, 40, 0)'],
          [0.2, 'rgba(55, 15, 110, 0.6)'],
          [0.5, 'rgba(90, 35, 160, 0.5)'],
          [1, 'rgba(60, 20, 110, 0)'],
        ]), 0.8, 35);
      // Sharp main pass
      drawRibbon(rA_spine, rA_w,
        lg(-W * 0.1, H * 0.95, W * 0.25, -H * 0.1, [
          [0,    'rgba(10, 3, 30, 0)'],
          [0.12, 'rgba(45, 12, 100, 0.9)'],
          [0.35, 'rgba(75, 25, 150, 0.95)'],
          [0.55, 'rgba(110, 55, 185, 0.9)'],
          [0.75, 'rgba(140, 90, 200, 0.75)'],
          [1,    'rgba(100, 50, 160, 0)'],
        ]), 0.95);
      // Highlight fold on the right edge of ribbon A
      const rA_hi_spine = rA_spine.map((p, i) => ({
        x: p.x + rA_w[i] * 0.82,
        y: p.y,
      }));
      drawRibbon(rA_hi_spine, rA_w.map(v => v * 0.12),
        lg(W * 0.05, H, W * 0.3, 0, [
          [0, 'rgba(200, 170, 240, 0)'],
          [0.3, 'rgba(210, 180, 245, 0.55)'],
          [0.65, 'rgba(195, 165, 235, 0.5)'],
          [1, 'rgba(160, 130, 210, 0)'],
        ]), 0.7, 3);

      // === RIBBON B: Pink/mauve sweeping from top-left corner across ===
      // In the mockup: the pink band that sweeps across above center
      const rB_spine = [
        { x: W * -0.08,                                 y: H * 0.35 },
        { x: W * 0.15 + Math.sin(t * 0.9 + 1) * W * 0.03, y: H * 0.28 + Math.sin(t * 1.1) * H * 0.03 },
        { x: W * 0.38 + Math.sin(t * 0.7 + 2) * W * 0.04, y: H * 0.38 + Math.sin(t * 0.9) * H * 0.04 },
        { x: W * 0.62 + Math.sin(t * 1.0 + 1) * W * 0.03, y: H * 0.52 + Math.sin(t * 0.8) * H * 0.03 },
        { x: W * 0.78 + Math.sin(t * 0.8) * W * 0.02,     y: H * 0.72 + Math.sin(t * 1.0) * H * 0.03 },
        { x: W * 1.05,                                  y: H * 1.05 },
      ];
      const rB_w = [
        W * 0.09,
        W * 0.12 + Math.sin(t * 0.7) * W * 0.015,
        W * 0.14 + Math.sin(t * 0.85) * W * 0.02,
        W * 0.13 + Math.sin(t * 0.75) * W * 0.015,
        W * 0.11 + Math.sin(t * 0.9) * W * 0.015,
        W * 0.08,
      ];
      drawRibbon(rB_spine, rB_w.map(v => v * 1.5),
        lg(-W * 0.1, H * 0.3, W * 1.1, H * 1.0, [
          [0, 'rgba(180, 120, 200, 0)'],
          [0.3, 'rgba(190, 140, 210, 0.45)'],
          [0.6, 'rgba(160, 110, 190, 0.35)'],
          [1, 'rgba(100, 60, 150, 0)'],
        ]), 0.7, 28);
      drawRibbon(rB_spine, rB_w,
        lg(-W * 0.1, H * 0.3, W * 1.1, H * 1.0, [
          [0,    'rgba(160, 100, 190, 0)'],
          [0.15, 'rgba(190, 140, 215, 0.85)'],
          [0.4,  'rgba(210, 160, 225, 0.9)'],
          [0.6,  'rgba(180, 130, 210, 0.85)'],
          [0.82, 'rgba(130, 80, 175, 0.7)'],
          [1,    'rgba(80, 30, 130, 0)'],
        ]), 0.9);
      // Pink highlight fold
      const rB_hi = rB_spine.map((p, i) => ({
        x: p.x - rB_w[i] * 0.65,
        y: p.y + rB_w[i] * 0.1,
      }));
      drawRibbon(rB_hi, rB_w.map(v => v * 0.1),
        lg(-W * 0.1, H * 0.25, W * 1.1, H, [
          [0, 'rgba(235, 200, 245, 0)'],
          [0.25, 'rgba(240, 210, 250, 0.5)'],
          [0.55, 'rgba(230, 195, 245, 0.45)'],
          [1, 'rgba(180, 150, 220, 0)'],
        ]), 0.65, 2);

      // === RIBBON C: Blue/cyan silk — right side flowing top-right to center ===
      // In the mockup: the blue/teal silk visible on the right
      const rC_spine = [
        { x: W * 1.08,                                 y: H * -0.05 },
        { x: W * 0.9  + Math.sin(t * 0.8 + 2) * W * 0.03, y: H * 0.22 + Math.sin(t * 1.0) * H * 0.03 },
        { x: W * 0.72 + Math.sin(t * 0.9 + 1) * W * 0.04, y: H * 0.42 + Math.sin(t * 0.7) * H * 0.04 },
        { x: W * 0.6  + Math.sin(t * 0.7) * W * 0.03,     y: H * 0.58 + Math.sin(t * 0.9) * H * 0.03 },
        { x: W * 0.55 + Math.sin(t * 1.0) * W * 0.03,     y: H * 0.78 + Math.sin(t * 0.8) * H * 0.03 },
        { x: W * 0.6,                                  y: H * 1.08 },
      ];
      const rC_w = [
        W * 0.1,
        W * 0.13 + Math.sin(t * 0.75) * W * 0.02,
        W * 0.14 + Math.sin(t * 0.85) * W * 0.02,
        W * 0.13 + Math.sin(t * 0.8) * W * 0.015,
        W * 0.11 + Math.sin(t * 0.7) * W * 0.015,
        W * 0.09,
      ];
      drawRibbon(rC_spine, rC_w.map(v => v * 1.5),
        lg(W * 1.1, 0, W * 0.5, H, [
          [0, 'rgba(60, 150, 220, 0)'],
          [0.3, 'rgba(70, 165, 230, 0.4)'],
          [0.6, 'rgba(55, 140, 210, 0.3)'],
          [1, 'rgba(30, 80, 150, 0)'],
        ]), 0.65, 28);
      drawRibbon(rC_spine, rC_w,
        lg(W * 1.1, 0, W * 0.5, H, [
          [0,    'rgba(50, 130, 210, 0)'],
          [0.15, 'rgba(80, 175, 235, 0.82)'],
          [0.4,  'rgba(95, 185, 240, 0.88)'],
          [0.62, 'rgba(65, 155, 220, 0.8)'],
          [0.82, 'rgba(40, 100, 180, 0.65)'],
          [1,    'rgba(15, 50, 120, 0)'],
        ]), 0.88);
      // Blue highlight fold (inner bright line)
      const rC_hi = rC_spine.map((p, i) => ({
        x: p.x + rC_w[i] * 0.5,
        y: p.y - rC_w[i] * 0.15,
      }));
      drawRibbon(rC_hi, rC_w.map(v => v * 0.09),
        lg(W * 1.1, 0, W * 0.5, H, [
          [0, 'rgba(180, 230, 255, 0)'],
          [0.3, 'rgba(190, 235, 255, 0.5)'],
          [0.6, 'rgba(170, 220, 250, 0.45)'],
          [1, 'rgba(120, 190, 240, 0)'],
        ]), 0.6, 2);

      // === RIBBON D: Small teal/cyan wisp — lower right ===
      // In the mockup: small blue/teal wisps in the lower-center area
      const rD_spine = [
        { x: W * 0.42 + Math.sin(t * 0.9) * W * 0.02, y: H * 0.62 + Math.sin(t * 1.1) * H * 0.02 },
        { x: W * 0.56 + Math.sin(t * 0.8) * W * 0.03, y: H * 0.7  + Math.sin(t * 0.7) * H * 0.03 },
        { x: W * 0.68 + Math.sin(t * 1.0) * W * 0.025,y: H * 0.82 + Math.sin(t * 0.85)* H * 0.02 },
        { x: W * 0.78,                                  y: H * 1.0  },
      ];
      const rD_w = [
        W * 0.05, W * 0.065, W * 0.06, W * 0.04,
      ];
      drawRibbon(rD_spine, rD_w,
        lg(W * 0.4, H * 0.6, W * 0.8, H, [
          [0,   'rgba(80, 200, 230, 0)'],
          [0.3, 'rgba(90, 210, 235, 0.6)'],
          [0.65,'rgba(60, 170, 210, 0.55)'],
          [1,   'rgba(30, 100, 160, 0)'],
        ]), 0.75);

      // ═══════════════════════════════════════════════
      // LAYER 3 — SURFACE DETAILS: bright highlight streaks
      // ═══════════════════════════════════════════════
      // Bright lavender streak across the main ribbon fold point
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(6px)';
      ctx.globalAlpha = 0.35;
      const streak1 = ctx.createLinearGradient(0, H * 0.8, W * 0.4, 0);
      streak1.addColorStop(0, 'rgba(210, 185, 250, 0)');
      streak1.addColorStop(0.3, 'rgba(215, 190, 255, 0.7)');
      streak1.addColorStop(0.65, 'rgba(200, 175, 250, 0.6)');
      streak1.addColorStop(1, 'rgba(170, 145, 230, 0)');
      ctx.strokeStyle = streak1;
      ctx.lineWidth = 22;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(W * 0.02, H * 0.78);
      ctx.bezierCurveTo(W * 0.1, H * 0.55, W * 0.2, H * 0.28, W * 0.35, H * 0.02);
      ctx.stroke();
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      // ═══════════════════════════════════════════════
      // LAYER 4 — VIGNETTE & FADES
      // ═══════════════════════════════════════════════
      // Center darkening so text is readable
      const vignette = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.72);
      vignette.addColorStop(0, 'rgba(5,5,15,0.35)');
      vignette.addColorStop(0.55, 'rgba(5,5,15,0.15)');
      vignette.addColorStop(1, 'rgba(5,5,15,0.75)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      // Bottom fade to dark
      const fade = ctx.createLinearGradient(0, H * 0.7, 0, H);
      fade.addColorStop(0, 'rgba(8,8,15,0)');
      fade.addColorStop(1, 'rgba(8,8,15,1)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, H * 0.7, W, H * 0.3);

      // Top-edge slight fade
      const topFade = ctx.createLinearGradient(0, 0, 0, H * 0.12);
      topFade.addColorStop(0, 'rgba(8,8,15,0.5)');
      topFade.addColorStop(1, 'rgba(8,8,15,0)');
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, W, H * 0.12);

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
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};

export default EtherFlow;
