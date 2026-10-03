/**
 * Hribok UI — Preview Window
 * Окреме вікно справа з прев'ю моделі гравця, зброї, скінів
 */

(function () {
    'use strict';

    let h = null;
    let C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;

        window.HribokPreview = {
            PreviewWindow: PreviewWindow,
            init: initPreview,
        };

        console.log('[Hribok] Preview module loaded');
    }

    function initPreview() {
        // Плейсхолдер — реальна ініціалізація після завантаження Preact
    }

    // ============================================================
    // PREVIEW WINDOW
    // ============================================================
    function PreviewWindow({ state, setState }) {
        const previewState = state.preview || (state.preview = {});
        const canvasRef = window.preactHooks.useRef(null);
        const rotationRef = window.preactHooks.useRef(0);
        const animRef = window.preactHooks.useRef(null);

        window.preactHooks.useEffect(() => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            const draw = () => {
                const w = canvas.width;
                const hh = canvas.height;
                ctx.clearRect(0, 0, w, hh);

                // Background gradient
                const grad = ctx.createRadialGradient(w/2, hh/2, 20, w/2, hh/2, w);
                grad.addColorStop(0, 'rgba(30, 20, 20, 0.5)');
                grad.addColorStop(1, 'rgba(5, 5, 5, 0.9)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, hh);

                // Grid
                ctx.strokeStyle = 'rgba(255, 0, 51, 0.08)';
                ctx.lineWidth = 1;
                for (let i = 0; i < w; i += 30) {
                    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, hh); ctx.stroke();
                }
                for (let i = 0; i < hh; i += 30) {
                    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
                }

                // Rotate
                if (previewState.autoRotate) {
                    rotationRef.current += (previewState.rotateSpeed || 1) * 0.02;
                }

                const cx = w / 2;
                const cy = hh / 2 + 30;
                const scale = previewState.size ? previewState.size / 300 : 1;

                // Draw player silhouette (simple stick figure with body)
                ctx.save();
                ctx.translate(cx, cy);
                ctx.scale(scale, scale);

                // Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.beginPath();
                ctx.ellipse(0, 100, 40, 8, 0, 0, Math.PI * 2);
                ctx.fill();

                // Body color
                const accent = getComputedStyle(document.documentElement).getPropertyValue('--hb-accent').trim() || '#FF0033';
                ctx.fillStyle = accent;
                ctx.strokeStyle = accent;
                ctx.shadowColor = accent;
                ctx.shadowBlur = 15;

                // Head
                ctx.beginPath();
                ctx.arc(0, -70, 18, 0, Math.PI * 2);
                ctx.fill();

                // Torso
                ctx.fillRect(-15, -50, 30, 60);

                // Arms
                ctx.fillRect(-25, -45, 10, 50);
                ctx.fillRect(15, -45, 10, 50);

                // Legs
                ctx.fillRect(-12, 10, 10, 50);
                ctx.fillRect(2, 10, 10, 50);

                // Weapon (if enabled)
                if (previewState.showWeapon) {
                    ctx.fillStyle = '#333';
                    ctx.strokeStyle = '#666';
                    ctx.shadowBlur = 0;
                    ctx.fillRect(-30, -30, 30, 6);
                    ctx.fillRect(-30, -30, 6, 12);
                }

                ctx.restore();

                // Info text
                ctx.fillStyle = accent;
                ctx.font = 'bold 14px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('PREVIEW', w / 2, 30);

                ctx.fillStyle = 'rgba(224, 224, 224, 0.6)';
                ctx.font = '11px Inter, sans-serif';
                ctx.fillText('Rotation: ' + Math.floor(rotationRef.current * 57.3) + '°', w / 2, hh - 20);

                animRef.current = requestAnimationFrame(draw);
            };

            draw();

            return () => {
                if (animRef.current) cancelAnimationFrame(animRef.current);
            };
        }, [previewState]);

        const closePreview = () => {
            previewState.enabled = false;
            state.preview = previewState;
            setState({});
        };

        return h('div', {
            class: 'hb-preview-window',
            style: 'position:fixed;top:' + (previewState.top || 100) + 'px;right:20px;width:' + (previewState.size || 300) + 'px;height:' + ((previewState.size || 300) + 100) + 'px;background:var(--hb-bg);border:1px solid var(--hb-accent-border);border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.8);overflow:hidden;pointer-events:auto;backdrop-filter:blur(20px);'
        }, [
            // Header
            h('div', {
                style: 'height:40px;display:flex;align-items:center;padding:0 14px;border-bottom:1px solid var(--hb-accent-border);background:var(--hb-bg-header);cursor:move;user-select:none;'
            }, [
                h('div', { style: 'width:22px;height:22px;background:var(--hb-accent);border-radius:4px;display:flex;align-items:center;justify-content:center;color:#000;font-weight:700;font-size:12px;margin-right:8px;' }, 'P'),
                h('div', { style: 'color:var(--hb-text);font-weight:600;font-size:13px;' }, 'Preview'),
                h('div', {
                    style: 'margin-left:auto;color:var(--hb-text-muted);cursor:pointer;font-size:16px;line-height:1;',
                    onClick: closePreview
                }, '×'),
            ]),

            // Canvas
            h('div', { style: 'padding:12px;' }, [
                h('canvas', {
                    ref: canvasRef,
                    width: (previewState.size || 300) - 24,
                    height: (previewState.size || 300) - 24,
                    style: 'display:block;border-radius:8px;background:#0a0a0a;'
                }),
            ]),

            // Controls
            h('div', { style: 'padding:0 12px 12px;display:flex;gap:6px;flex-wrap:wrap;' }, [
                h(C.Button, {
                    label: 'Upload Model',
                    onClick: () => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.glb,.gltf,.obj';
                        input.onchange = (e) => {
                            const file = e.target.files[0];
                            if (file) console.log('[Hribok] Model uploaded:', file.name);
                        };
                        input.click();
                    }
                }),
                h(C.Button, {
                    label: 'Catalog',
                    onClick: () => console.log('[Hribok] Open catalog')
                }),
                h(C.Button, {
                    label: previewState.autoRotate ? 'Stop Rotate' : 'Auto Rotate',
                    onClick: () => {
                        previewState.autoRotate = !previewState.autoRotate;
                        state.preview = previewState;
                        setState({});
                    }
                }),
            ]),
        ]);
    }

    // Register
    if (window.HribokComponents) {
        init();
    } else {
        const check = setInterval(() => {
            if (window.HribokComponents) {
                clearInterval(check);
                init();
            }
        }, 50);
    }

})();
