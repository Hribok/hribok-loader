/**
 * Hribok UI — Tabs: Unique
 * Watermark + Tag, Hribok Unique, Понтові фічі, Preview settings
 */

(function () {
    'use strict';

    let h = null;
    let C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;

        window.HribokTabs = window.HribokTabs || {};
        window.HribokTabs.WatermarkTab = WatermarkTab;
        window.HribokTabs.UniqueTab = UniqueTab;
        window.HribokTabs.EffectsTab = EffectsTab;
        window.HribokTabs.PreviewTab = PreviewTab;

        console.log('[Hribok] Unique tabs loaded');
    }

    // ============================================================
    // WATERMARK + TAG (9)
    // ============================================================
    function WatermarkTab({ state, setState }) {
        const s = state.watermark || (state.watermark = {});
        const upd = (k, v) => { state.watermark[k] = v; setState({}); };
        const positions = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right', 'Top-Center'];
        const tagModes = ['Off', 'Only Friends', 'Everyone'];
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'WATERMARK'),
            h(C.Row, { key: 'r1', label: 'Enable Watermark' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Watermark Text' }, h('input', {
                type: 'text',
                class: 'hb-input',
                value: s.text || 'Hribok | User',
                onInput: (e) => upd('text', e.target.value),
                style: 'width:180px;padding:6px 10px;background:rgba(30,30,30,0.9);border:1px solid var(--hb-accent-border);color:var(--hb-text);border-radius:6px;font-family:inherit;font-size:12px;outline:none;'
            })),
            h(C.Row, { key: 'r3', label: 'Position' }, h(C.Dropdown, { value: s.position, options: positions, onChange: v => upd('position', v) })),
            h(C.Row, { key: 'r4', label: 'Watermark Color' }, h(C.ColorPicker, { value: s.color || '#FF0033', onChange: v => upd('color', v) })),
            h(C.Row, { key: 'r5', label: 'Watermark Size' }, h(C.Slider, { value: s.size || 14, min: 8, max: 32, step: 1, onChange: v => upd('size', v) })),
            h(C.Row, { key: 'r6', label: 'Watermark Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => upd('rainbow', v) })),

            h(C.SectionTitle, { key: 't2' }, 'HRIBOK TAG'),
            h(C.Row, { key: 'r7', label: 'Hribok Tag' }, h(C.Toggle, { value: s.tagEnabled, onChange: v => upd('tagEnabled', v) })),
            h(C.Row, { key: 'r8', label: 'Tag Mode' }, h(C.Dropdown, { value: s.tagMode, options: tagModes, onChange: v => upd('tagMode', v) })),
            h(C.Row, { key: 'r9', label: 'Tag Color' }, h(C.ColorPicker, { value: s.tagColor || '#FF0033', onChange: v => upd('tagColor', v) })),
        ]);
    }

    // ============================================================
    // HRIBOK UNIQUE (8)
    // ============================================================
    function UniqueTab({ state, setState }) {
        const s = state.unique || (state.unique = {});
        const upd = (k, v) => { state.unique[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'HRIBOK UNIQUE'),
            h(C.Row, { key: 'r1', label: 'Hribok AI' }, h(C.Toggle, { value: s.ai, onChange: v => upd('ai', v) })),
            h(C.Row, { key: 'r2', label: 'Hribok Cloud' }, h(C.Toggle, { value: s.cloud, onChange: v => upd('cloud', v) })),
            h(C.Row, { key: 'r3', label: 'Hribok Stats' }, h(C.Toggle, { value: s.stats, onChange: v => upd('stats', v) })),
            h(C.Row, { key: 'r4', label: 'Hribok Replay' }, h(C.Toggle, { value: s.replay, onChange: v => upd('replay', v) })),
            h(C.Row, { key: 'r5', label: 'Hribok Highlights' }, h(C.Toggle, { value: s.highlights, onChange: v => upd('highlights', v) })),
            h(C.Row, { key: 'r6', label: 'Hribok API' }, h(C.Toggle, { value: s.api, onChange: v => upd('api', v) })),
            h(C.Row, { key: 'r7', label: 'Hribok Marketplace' }, h(C.Toggle, { value: s.marketplace, onChange: v => upd('marketplace', v) })),
            h(C.Row, { key: 'r8', label: 'Butterfly' }, h(C.Toggle, { value: s.butterfly, onChange: v => upd('butterfly', v) })),
        ]);
    }

    // ============================================================
    // ПОНТОВІ ФІЧІ (12)
    // ============================================================
    function EffectsTab({ state, setState }) {
        const s = state.effects || (state.effects = {});
        const upd = (k, v) => { state.effects[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'KILL EFFECTS'),
            h(C.Row, { key: 'r1', label: 'Kill Effect' }, h(C.Toggle, { value: s.killEffect, onChange: v => upd('killEffect', v) })),
            h(C.Row, { key: 'r2', label: 'Kill Effect Type' }, h(C.Dropdown, { value: s.killEffectType, options: ['Explosion', 'Lightning', 'Fire', 'Ice', 'Rainbow'], onChange: v => upd('killEffectType', v) })),
            h(C.Row, { key: 'r3', label: 'Hit Effect' }, h(C.Toggle, { value: s.hitEffect, onChange: v => upd('hitEffect', v) })),
            h(C.Row, { key: 'r4', label: 'Hit Effect Type' }, h(C.Dropdown, { value: s.hitEffectType, options: ['Spark', 'Blood', 'Flash', 'Star'], onChange: v => upd('hitEffectType', v) })),

            h(C.SectionTitle, { key: 't2' }, 'SOUNDS'),
            h(C.Row, { key: 'r5', label: 'Kill Sound Pack' }, h(C.Dropdown, { value: s.killSoundPack, options: ['Default', 'CS2', 'Quake', 'Anime', 'Custom'], onChange: v => upd('killSoundPack', v) })),
            h(C.Row, { key: 'r6', label: 'Hit Sound Pack' }, h(C.Dropdown, { value: s.hitSoundPack, options: ['Default', 'CS2', 'Quake', 'Anime', 'Custom'], onChange: v => upd('hitSoundPack', v) })),

            h(C.SectionTitle, { key: 't3' }, 'CROSSHAIR'),
            h(C.Row, { key: 'r7', label: 'Custom Crosshair' }, h(C.Toggle, { value: s.crosshair, onChange: v => upd('crosshair', v) })),
            h(C.Row, { key: 'r8', label: 'Crosshair Style' }, h(C.Dropdown, { value: s.crosshairStyle, options: ['Dot', 'Cross', 'Circle'], onChange: v => upd('crosshairStyle', v) })),
            h(C.Row, { key: 'r9', label: 'Crosshair Color' }, h(C.ColorPicker, { value: s.crosshairColor || '#FF0033', onChange: v => upd('crosshairColor', v) })),
            h(C.Row, { key: 'r10', label: 'Crosshair Size' }, h(C.Slider, { value: s.crosshairSize || 4, min: 1, max: 20, step: 1, onChange: v => upd('crosshairSize', v) })),

            h(C.SectionTitle, { key: 't4' }, 'WORLD'),
            h(C.Row, { key: 'r11', label: 'World Particles' }, h(C.Toggle, { value: s.worldParticles, onChange: v => upd('worldParticles', v) })),
            h(C.Row, { key: 'r12', label: 'Trail Behind Player' }, h(C.Toggle, { value: s.trailBehind, onChange: v => upd('trailBehind', v) })),
        ]);
    }

    // ============================================================
    // PREVIEW SETTINGS (7)
    // ============================================================
    function PreviewTab({ state, setState }) {
        const s = state.preview || (state.preview = {});
        const upd = (k, v) => { state.preview[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'PREVIEW WINDOW'),
            h(C.Row, { key: 'r1', label: 'Enable Preview' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Position' }, h(C.Dropdown, { value: s.position, options: ['Left', 'Right', 'Bottom'], onChange: v => upd('position', v) })),
            h(C.Row, { key: 'r3', label: 'Preview Size' }, h(C.Slider, { value: s.size || 300, min: 200, max: 600, step: 10, onChange: v => upd('size', v) })),
            h(C.Row, { key: 'r4', label: 'Show Player Model' }, h(C.Toggle, { value: s.showPlayer, onChange: v => upd('showPlayer', v) })),
            h(C.Row, { key: 'r5', label: 'Show Weapon' }, h(C.Toggle, { value: s.showWeapon, onChange: v => upd('showWeapon', v) })),
            h(C.Row, { key: 'r6', label: 'Auto Rotate' }, h(C.Toggle, { value: s.autoRotate, onChange: v => upd('autoRotate', v) })),
            h(C.Row, { key: 'r7', label: 'Rotation Speed' }, h(C.Slider, { value: s.rotateSpeed || 1, min: 0, max: 5, step: 0.1, onChange: v => upd('rotateSpeed', v) })),
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
