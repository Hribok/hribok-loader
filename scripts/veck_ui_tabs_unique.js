/**
 * Hribok UI — Unique Tabs
 */

(function () {
    'use strict';
    let h = null, C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;
        window.HribokTabs = window.HribokTabs || {};
        Object.assign(window.HribokTabs, { WatermarkTab, UniqueTab, EffectsTab, PreviewTab });
        console.log('[Hribok] Unique tabs loaded');
    }

    function WatermarkTab({ state, setState }) {
        const s = state.watermark;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'w1' }, 'WATERMARK'),
            h(C.Row, { key: 'w2', label: 'Enable' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 'w3', label: 'Text' }, h('input', { class: 'hb-select', value: s.text, onInput: e => u('text', e.target.value) })),
            h(C.Row, { key: 'w4', label: 'Position' }, h(C.Dropdown, { value: s.position, options: ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right'], onChange: v => u('position', v) })),
            h(C.Row, { key: 'w5', label: 'Color' }, h(C.ColorPicker, { value: s.color, onChange: v => u('color', v) })),
            h(C.Row, { key: 'w6', label: 'Size' }, h(C.Slider, { value: s.size, min: 8, max: 32, step: 1, onChange: v => u('size', v) })),
            h(C.Row, { key: 'w7', label: 'Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => u('rainbow', v) })),
            h(C.SectionTitle, { key: 'w8' }, 'HRIBOK TAG'),
            h(C.Row, { key: 'w9', label: 'Tag Enabled' }, h(C.Toggle, { value: s.tagEnabled, onChange: v => u('tagEnabled', v) })),
            h(C.Row, { key: 'w10', label: 'Tag Mode' }, h(C.Dropdown, { value: s.tagMode, options: ['Everyone', 'Friends Only', 'Dev Only'], onChange: v => u('tagMode', v) })),
            h(C.Row, { key: 'w11', label: 'Tag Color' }, h(C.ColorPicker, { value: s.tagColor, onChange: v => u('tagColor', v) })),
        ]);
    }

    function UniqueTab({ state, setState }) {
        const s = state.unique;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'u1' }, 'HRIBOK UNIQUE'),
            h(C.Row, { key: 'u2', label: 'Hribok AI' }, h(C.Toggle, { value: s.ai, onChange: v => u('ai', v) })),
            h(C.Row, { key: 'u3', label: 'Hribok Cloud' }, h(C.Toggle, { value: s.cloud, onChange: v => u('cloud', v) })),
            h(C.Row, { key: 'u4', label: 'Stats UI' }, h(C.Toggle, { value: s.stats, onChange: v => u('stats', v) })),
            h(C.Row, { key: 'u5', label: 'Replay' }, h(C.Toggle, { value: s.replay, onChange: v => u('replay', v) })),
            h(C.Row, { key: 'u6', label: 'Highlights' }, h(C.Toggle, { value: s.highlights, onChange: v => u('highlights', v) })),
            h(C.Row, { key: 'u7', label: 'API' }, h(C.Toggle, { value: s.api, onChange: v => u('api', v) })),
            h(C.Row, { key: 'u8', label: 'Marketplace' }, h(C.Toggle, { value: s.marketplace, onChange: v => u('marketplace', v) })),
            h(C.Row, { key: 'u9', label: 'Butterfly' }, h(C.Toggle, { value: s.butterfly, onChange: v => u('butterfly', v) })),
        ]);
    }

    function EffectsTab({ state, setState }) {
        const s = state.effects;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'e1' }, 'KILL EFFECTS'),
            h(C.Row, { key: 'e2', label: 'Kill Effect' }, h(C.Toggle, { value: s.killEffect, onChange: v => u('killEffect', v) })),
            h(C.Row, { key: 'e3', label: 'Kill Effect Type' }, h(C.Dropdown, { value: s.killEffectType, options: ['Explosion', 'Lightning', 'Fire', 'Stars'], onChange: v => u('killEffectType', v) })),
            h(C.Row, { key: 'e4', label: 'Kill Sound Pack' }, h(C.Dropdown, { value: s.killSoundPack, options: ['Default', 'CS2', 'Anime', 'Quake'], onChange: v => u('killSoundPack', v) })),
            h(C.SectionTitle, { key: 'e5' }, 'HIT EFFECTS'),
            h(C.Row, { key: 'e6', label: 'Hit Effect' }, h(C.Toggle, { value: s.hitEffect, onChange: v => u('hitEffect', v) })),
            h(C.Row, { key: 'e7', label: 'Hit Effect Type' }, h(C.Dropdown, { value: s.hitEffectType, options: ['Spark', 'Blood', 'Glow'], onChange: v => u('hitEffectType', v) })),
            h(C.Row, { key: 'e8', label: 'Hit Sound Pack' }, h(C.Dropdown, { value: s.hitSoundPack, options: ['Default', 'CS2', 'Anime'], onChange: v => u('hitSoundPack', v) })),
            h(C.SectionTitle, { key: 'e9' }, 'CROSSHAIR'),
            h(C.Row, { key: 'e10', label: 'Custom Crosshair' }, h(C.Toggle, { value: s.crosshair, onChange: v => u('crosshair', v) })),
            h(C.Row, { key: 'e11', label: 'Style' }, h(C.Dropdown, { value: s.crosshairStyle, options: ['Cross', 'Dot', 'Circle', 'Star'], onChange: v => u('crosshairStyle', v) })),
            h(C.Row, { key: 'e12', label: 'Color' }, h(C.ColorPicker, { value: s.crosshairColor, onChange: v => u('crosshairColor', v) })),
            h(C.Row, { key: 'e13', label: 'Size' }, h(C.Slider, { value: s.crosshairSize, min: 1, max: 20, step: 1, onChange: v => u('crosshairSize', v) })),
            h(C.SectionTitle, { key: 'e14' }, 'WORLD'),
            h(C.Row, { key: 'e15', label: 'World Particles' }, h(C.Toggle, { value: s.worldParticles, onChange: v => u('worldParticles', v) })),
            h(C.Row, { key: 'e16', label: 'Trail Behind' }, h(C.Toggle, { value: s.trailBehind, onChange: v => u('trailBehind', v) })),
        ]);
    }

    function PreviewTab({ state, setState }) {
        const s = state.preview;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'pr1' }, 'PREVIEW WINDOW'),
            h(C.Row, { key: 'pr2', label: 'Enable Preview' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 'pr3', label: 'Position' }, h(C.Dropdown, { value: s.position, options: ['Left', 'Right', 'Bottom'], onChange: v => u('position', v) })),
            h(C.Row, { key: 'pr4', label: 'Size' }, h(C.Slider, { value: s.size, min: 200, max: 600, step: 10, onChange: v => u('size', v) })),
            h(C.Row, { key: 'pr5', label: 'Zoom' }, h(C.Slider, { value: s.zoom, min: 0.5, max: 2, step: 0.1, onChange: v => u('zoom', v) })),
            h(C.SectionTitle, { key: 'pr6' }, 'DISPLAY'),
            h(C.Row, { key: 'pr7', label: 'Show Player' }, h(C.Toggle, { value: s.showPlayer, onChange: v => u('showPlayer', v) })),
            h(C.Row, { key: 'pr8', label: 'Show Weapon' }, h(C.Toggle, { value: s.showWeapon, onChange: v => u('showWeapon', v) })),
            h(C.Row, { key: 'pr9', label: 'Show Skeleton' }, h(C.Toggle, { value: s.showSkeleton, onChange: v => u('showSkeleton', v) })),
            h(C.Row, { key: 'pr10', label: 'Show Trail' }, h(C.Toggle, { value: s.showTrail, onChange: v => u('showTrail', v) })),
            h(C.Row, { key: 'pr11', label: 'Glow' }, h(C.Toggle, { value: s.glow, onChange: v => u('glow', v) })),
            h(C.SectionTitle, { key: 'pr12' }, 'ANIMATION'),
            h(C.Row, { key: 'pr13', label: 'Auto Rotate' }, h(C.Toggle, { value: s.autoRotate, onChange: v => u('autoRotate', v) })),
            h(C.Row, { key: 'pr14', label: 'Rotation Speed' }, h(C.Slider, { value: s.rotateSpeed, min: 0, max: 5, step: 0.1, onChange: v => u('rotateSpeed', v) })),
            h(C.SectionTitle, { key: 'pr15' }, 'BACKGROUND'),
            h(C.Row, { key: 'pr16', label: 'Background' }, h(C.Dropdown, { value: s.background, options: ['Dark', 'Grid', 'Gradient', 'Transparent'], onChange: v => u('background', v.toLowerCase()) })),
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();