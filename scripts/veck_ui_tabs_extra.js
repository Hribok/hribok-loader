/**
 * Hribok UI — Extra Tabs
 */

(function () {
    'use strict';
    let h = null, C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;
        window.HribokTabs = window.HribokTabs || {};
        Object.assign(window.HribokTabs, { ButterflyTab, SpinTab, SkyboxTab, CustomModelTab, CustomHandsTab, CustomWeaponTab, GrenadeTab });
        console.log('[Hribok] Extra tabs loaded');
    }

    function ButterflyTab({ state, setState }) {
        const s = state.butterfly;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'b1' }, 'BUTTERFLY'),
            h(C.Row, { key: 'b2', label: 'Enable' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 'b3', label: 'Speed' }, h(C.Slider, { value: s.speed, min: 1, max: 10, step: 0.1, onChange: v => u('speed', v) })),
            h(C.Row, { key: 'b4', label: 'Color' }, h(C.ColorPicker, { value: s.color, onChange: v => u('color', v) })),
            h(C.Row, { key: 'b5', label: 'Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => u('rainbow', v) })),
            h(C.Row, { key: 'b6', label: 'Size' }, h(C.Slider, { value: s.size, min: 0.5, max: 3, step: 0.1, onChange: v => u('size', v) })),
            h(C.Row, { key: 'b7', label: 'Trail' }, h(C.Toggle, { value: s.trail, onChange: v => u('trail', v) })),
            h(C.Row, { key: 'b8', label: 'Trail Color' }, h(C.ColorPicker, { value: s.trailColor, onChange: v => u('trailColor', v) })),
            h(C.Row, { key: 'b9', label: 'Model' }, h(C.Dropdown, { value: s.model, options: ['Default', 'Sakura', 'Neon', 'Fire'], onChange: v => u('model', v) })),
            h(C.Row, { key: 'b10', label: 'Sound' }, h(C.Toggle, { value: s.sound, onChange: v => u('sound', v) })),
        ]);
    }

    function SpinTab({ state, setState }) {
        const s = state.spin;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'sp1' }, 'SPIN BOT'),
            h(C.Row, { key: 'sp2', label: 'Enable' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 'sp3', label: 'Speed' }, h(C.Slider, { value: s.speed, min: 1, max: 360, step: 1, onChange: v => u('speed', v) })),
            h(C.Row, { key: 'sp4', label: 'Axis' }, h(C.Dropdown, { value: s.axis, options: ['X', 'Y', 'Z'], onChange: v => u('axis', v) })),
            h(C.Row, { key: 'sp5', label: 'Mode' }, h(C.Dropdown, { value: s.mode, options: ['Continuous', 'On Kill', 'On Hit'], onChange: v => u('mode', v) })),
            h(C.Row, { key: 'sp6', label: 'On Kill' }, h(C.Toggle, { value: s.onKill, onChange: v => u('onKill', v) })),
            h(C.Row, { key: 'sp7', label: 'On Hit' }, h(C.Toggle, { value: s.onHit, onChange: v => u('onHit', v) })),
        ]);
    }

    function SkyboxTab({ state, setState }) {
        const s = state.skybox;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'sk1' }, 'SKYBOX'),
            h(C.Row, { key: 'sk2', label: 'Enable' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 'sk3', label: 'Preset' }, h(C.Dropdown, { value: s.preset, options: ['Default', 'Space', 'Neon', 'Cyberpunk', 'Sakura'], onChange: v => u('preset', v) })),
            h(C.Row, { key: 'sk4', label: 'Color' }, h(C.ColorPicker, { value: s.color, onChange: v => u('color', v) })),
            h(C.Row, { key: 'sk5', label: 'Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => u('rainbow', v) })),
            h(C.Row, { key: 'sk6', label: 'Rotation' }, h(C.Slider, { value: s.rotation, min: 0, max: 360, step: 1, onChange: v => u('rotation', v) })),
            h(C.Row, { key: 'sk7', label: 'Brightness' }, h(C.Slider, { value: s.brightness, min: 0, max: 200, step: 1, onChange: v => u('brightness', v) })),
        ]);
    }

    function CustomModelTab({ state, setState }) {
        const s = state.customModel;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'cm1' }, 'CUSTOM MODEL'),
            h(C.Row, { key: 'cm2', label: 'Enable' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 'cm3', label: 'Catalog' }, h(C.Dropdown, { value: s.catalog, options: ['Default', 'SpongeBob', 'Shrek', 'Among Us', 'Zero Two', 'Rem'], onChange: v => u('catalog', v) })),
            h(C.Row, { key: 'cm4', label: 'Scale' }, h(C.Slider, { value: s.scale, min: 0.1, max: 5, step: 0.1, onChange: v => u('scale', v) })),
            h(C.Row, { key: 'cm5', label: 'Rotation' }, h(C.Slider, { value: s.rotation, min: 0, max: 360, step: 1, onChange: v => u('rotation', v) })),
            h(C.Row, { key: 'cm6', label: 'Offset X' }, h(C.Slider, { value: s.offsetX, min: -10, max: 10, step: 0.1, onChange: v => u('offsetX', v) })),
            h(C.Row, { key: 'cm7', label: 'Offset Y' }, h(C.Slider, { value: s.offsetY, min: -10, max: 10, step: 0.1, onChange: v => u('offsetY', v) })),
            h(C.Row, { key: 'cm8', label: 'Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => u('rainbow', v) })),
            h(C.Row, { key: 'cm9', label: 'Wireframe' }, h(C.Toggle, { value: s.wireframe, onChange: v => u('wireframe', v) })),
        ]);
    }

    function CustomHandsTab({ state, setState }) {
        const s = state.customHands;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'ch1' }, 'CUSTOM HANDS'),
            h(C.Row, { key: 'ch2', label: 'Enable' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 'ch3', label: 'Catalog' }, h(C.Dropdown, { value: s.catalog, options: ['Default', 'Karambit', 'Gloves', 'Anime'], onChange: v => u('catalog', v) })),
            h(C.Row, { key: 'ch4', label: 'Color' }, h(C.ColorPicker, { value: s.color, onChange: v => u('color', v) })),
            h(C.Row, { key: 'ch5', label: 'Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => u('rainbow', v) })),
        ]);
    }

    function CustomWeaponTab({ state, setState }) {
        const s = state.customWeapon;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'cw1' }, 'CUSTOM WEAPON'),
            h(C.Row, { key: 'cw2', label: 'Enable' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 'cw3', label: 'Catalog' }, h(C.Dropdown, { value: s.catalog, options: ['Default', 'Banana', 'Sword', 'Fish'], onChange: v => u('catalog', v) })),
            h(C.Row, { key: 'cw4', label: 'Skin' }, h(C.Dropdown, { value: s.skin, options: ['Default', 'Neon', 'Gold'], onChange: v => u('skin', v) })),
            h(C.Row, { key: 'cw5', label: 'Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => u('rainbow', v) })),
        ]);
    }

    function GrenadeTab({ state, setState }) {
        const s = state.grenade;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'gr1' }, 'GRENADE DIRECTION'),
            h(C.Row, { key: 'gr2', label: 'Show Direction' }, h(C.Toggle, { value: s.direction, onChange: v => u('direction', v) })),
            h(C.Row, { key: 'gr3', label: 'Style' }, h(C.Dropdown, { value: s.dirStyle, options: ['Arrow', 'Line', 'Dot'], onChange: v => u('dirStyle', v) })),
            h(C.Row, { key: 'gr4', label: 'Color' }, h(C.ColorPicker, { value: s.dirColor, onChange: v => u('dirColor', v) })),
            h(C.Row, { key: 'gr5', label: 'Thickness' }, h(C.Slider, { value: s.dirThickness, min: 1, max: 10, step: 0.1, onChange: v => u('dirThickness', v) })),
            h(C.Row, { key: 'gr6', label: 'Fade' }, h(C.Toggle, { value: s.dirFade, onChange: v => u('dirFade', v) })),
            h(C.SectionTitle, { key: 'gr7' }, 'GRENADE MAGNET'),
            h(C.Row, { key: 'gr8', label: 'Enable Magnet' }, h(C.Toggle, { value: s.magnet, onChange: v => u('magnet', v) })),
            h(C.Row, { key: 'gr9', label: 'Mode' }, h(C.Dropdown, { value: s.magnetMode, options: ['Auto', 'Manual'], onChange: v => u('magnetMode', v) })),
            h(C.Row, { key: 'gr10', label: 'FOV' }, h(C.Slider, { value: s.magnetFov, min: 10, max: 360, step: 5, onChange: v => u('magnetFov', v) })),
            h(C.Row, { key: 'gr11', label: 'Strength' }, h(C.Slider, { value: s.magnetStrength, min: 0, max: 100, step: 1, onChange: v => u('magnetStrength', v) })),
            h(C.Row, { key: 'gr12', label: 'Priority' }, h(C.Dropdown, { value: s.magnetPriority, options: ['Nearest', 'Lowest HP', 'Most Visible'], onChange: v => u('magnetPriority', v) })),
            h(C.Row, { key: 'gr13', label: 'Visible Only' }, h(C.Toggle, { value: s.magnetVisible, onChange: v => u('magnetVisible', v) })),
            h(C.Row, { key: 'gr14', label: 'Prediction' }, h(C.Toggle, { value: s.magnetPrediction, onChange: v => u('magnetPrediction', v) })),
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();