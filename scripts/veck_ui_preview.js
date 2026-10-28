/**
 * Hribok UI — Preview Window
 */

(function () {
    'use strict';
    let h = null, C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;
        window.HribokPreview = { PreviewWindow };
        console.log('[Hribok] Preview module loaded');
    }

    function PreviewWindow({ state, setState }) {
        const ps = state.preview || (state.preview = {});
        const canvasRef = window.preactHooks.useRef(null);
        const rotRef = window.preactHooks.useRef(0);
        const bobRef = window.preactHooks.useRef(0);
        const animRef = window.preactHooks.useRef(null);

        window.preactHooks.useEffect(() => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            const draw = () => {
                const w = canvas.width, hh = canvas.height;
                ctx.clearRect(0, 0, w, hh);

                const accent = getComputedStyle(document.documentElement).getPropertyValue('--hb-accent').trim() || '#FF0033';
                const skinColor = (state.skinchanger && state.skinchanger.solidColor) || accent;

                if (ps.background === 'gradient') {
                    const grad = ctx.createRadialGradient(w/2, hh/2, 10, w/2, hh/2, w);
                    grad.addColorStop(0, 'rgba(30,20,25,0.9)');
                    grad.addColorStop(1, 'rgba(5,5,8,0.98)');
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, w, hh);
                } else if (ps.background === 'grid') {
                    ctx.fillStyle = 'rgba(8,8,10,0.95)';
                    ctx.fillRect(0, 0, w, hh);
                    ctx.strokeStyle = 'rgba(255,0,51,0.08)';
                    ctx.lineWidth = 1;
                    for (let i = 0; i < w; i += 24) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,hh); ctx.stroke(); }
                    for (let i = 0; i < hh; i += 24) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(w,i); ctx.stroke(); }
                } else if (ps.background === 'transparent') {
                    // nothing
                } else {
                    ctx.fillStyle = 'rgba(5,5,8,0.95)';
                    ctx.fillRect(0, 0, w, hh);
                }

                if (ps.autoRotate) rotRef.current += (ps.rotateSpeed || 1) * 0.02;
                bobRef.current += 0.04;
                const scaleX = Math.cos(rotRef.current);
                const bob = Math.sin(bobRef.current) * 4;

                const cx = w / 2;
                const cy = hh / 2 + 20 + bob;
                const zoom = ps.zoom || 1;
                const baseScale = (ps.size ? ps.size / 300 : 1.3) * zoom;

                ctx.save();
                ctx.translate(cx, cy);
                ctx.scale(baseScale * scaleX, baseScale);

                ctx.fillStyle = 'rgba(0,0,0,0.6)';
                ctx.beginPath();
                ctx.ellipse(0, 105, 42, 8, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowColor = accent;
                ctx.shadowBlur = ps.glow !== false ? 20 : 0;

                if (ps.showSkeleton) {
                    ctx.strokeStyle = accent;
                    ctx.lineWidth = 2;
                    ctx.globalAlpha = 0.6;
                    ctx.beginPath(); ctx.moveTo(0,-60); ctx.lineTo(0,-40); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(0,-40); ctx.lineTo(0,10); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(-18,-35); ctx.lineTo(18,-35); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(-18,-35); ctx.lineTo(-25,0); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(18,-35); ctx.lineTo(25,0); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(-12,10); ctx.lineTo(12,10); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(-8,10); ctx.lineTo(-8,60); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(8,10); ctx.lineTo(8,60); ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                ctx.fillStyle = skinColor;
                ctx.beginPath();
                ctx.arc(0, -70, 16, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillRect(-5, -56, 10, 8);

                ctx.beginPath();
                ctx.moveTo(-14, -48);
                ctx.lineTo(14, -48);
                ctx.lineTo(16, 12);
                ctx.lineTo(-16, 12);
                ctx.closePath();
                ctx.fill();

                ctx.fillRect(-24, -46, 9, 46);
                ctx.fillRect(15, -46, 9, 46);

                ctx.beginPath(); ctx.arc(-19.5, 2, 5, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.arc(19.5, 2, 5, 0, Math.PI*2); ctx.fill();

                ctx.fillRect(-13, 14, 11, 50);
                ctx.fillRect(2, 14, 11, 50);

                ctx.fillRect(-14, 62, 12, 6);
                ctx.fillRect(2, 62, 12, 6);

                if (ps.showWeapon) {
                    ctx.fillStyle = '#2A2A2A';
                    ctx.shadowBlur = 0;
                    ctx.fillRect(15, -25, 34, 5);
                    ctx.fillRect(42, -26, 12, 7);
                    ctx.fillRect(28, -20, 6, 14);
                    ctx.fillRect(-19, -24, 34, 3);
                    ctx.fillStyle = skinColor;
                    ctx.beginPath(); ctx.arc(19.5, 2, 5, 0, Math.PI*2); ctx.fill();
                }

                ctx.restore();

                ctx.fillStyle = accent;
                ctx.font = 'bold 13px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.shadowBlur = 8;
                ctx.shadowColor = accent;
                ctx.fillText('PREVIEW', w / 2, 24);
                ctx.shadowBlur = 0;

                ctx.fillStyle = 'rgba(224,224,224,0.5)';
                ctx.font = '10px Inter, sans-serif';
                const deg = Math.floor(((rotRef.current * 180 / Math.PI) % 360 + 360) % 360);
                ctx.fillText('Rotation: ' + deg + '°  |  Zoom: ' + (ps.zoom || 1).toFixed(1) + 'x', w / 2, hh - 12);

                animRef.current = requestAnimationFrame(draw);
            };
            draw();
            return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
        }, [ps]);

        const closePreview = () => { ps.enabled = false; setState({}); };

        const posStyle = () => {
            const size = ps.size || 400;
            const base = 'position:fixed;z-index:2147483646;width:' + size + 'px;background:var(--hb-bg);border:1px solid var(--hb-accent-border);border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.85);overflow:hidden;pointer-events:auto;backdrop-filter:blur(20px);';
            const pos = ps.position || 'Right';
            if (pos === 'Left') return base + 'top:100px;left:20px;';
            if (pos === 'Bottom') return base + 'bottom:20px;left:50%;transform:translateX(-50%);';
            return base + 'top:100px;right:20px;';
        };

        return h('div', { class: 'hb-preview-window', style: posStyle() }, [
            h('div', { style: 'height:38px;display:flex;align-items:center;padding:0 14px;border-bottom:1px solid var(--hb-accent-border);background:var(--hb-bg-header);user-select:none;' }, [
                h('div', { style: 'width:22px;height:22px;background:var(--hb-accent);border-radius:5px;display:flex;align-items:center;justify-content:center;color:#000;font-weight:700;font-size:12px;margin-right:8px;box-shadow:0 0 12px var(--hb-accent-glow);' }, 'P'),
                h('div', { style: 'color:var(--hb-text);font-weight:600;font-size:13px;' }, 'Preview'),
                h('div', { style: 'margin-left:auto;color:var(--hb-text-muted);cursor:pointer;font-size:18px;line-height:1;padding:0 4px;', onClick: closePreview }, '×'),
            ]),
            h('div', { style: 'padding:10px;' }, [
                h('canvas', { ref: canvasRef, width: (ps.size || 400) - 20, height: (ps.size || 400) - 20, style: 'display:block;border-radius:8px;background:#0a0a0a;' }),
            ]),
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();