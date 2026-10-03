/**
 * Hribok UI — Tabs: Extra
 * Butterfly, Spin, Skybox, Custom Model, Custom Hands, Custom Weapon, Grenade
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
        window.HribokTabs.ButterflyTab = ButterflyTab;
        window.HribokTabs.SpinTab = SpinTab;
        window.HribokTabs.SkyboxTab = SkyboxTab;
        window.HribokTabs.CustomModelTab = CustomModelTab;
        window.HribokTabs.CustomHandsTab = CustomHandsTab;
        window.HribokTabs.CustomWeaponTab = CustomWeaponTab;
        window.HribokTabs.GrenadeTab = GrenadeTab;

        console.log('[Hribok] Extra tabs loaded');
    }

    // ============================================================
    // BUTTERFLY (9)
    // ============================================================
    function ButterflyTab({ state, setState }) {
        const s = state.butterfly || (state.butterfly = {});
        const upd = (k, v) => { state.butterfly[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'BUTTERFLY'),
            h(C.Row, { key: 'r1', label: 'Butterfly' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Butterfly Speed' }, h(C.Slider, { value: s.speed, min: 1, max: 20, step: 0.5, onChange: v => upd('speed', v) })),
            h(C.Row, { key: 'r3', label: 'Butterfly Color' }, h(C.ColorPicker, { value: s.color || '#FF0033', onChange: v => upd('color', v) })),
            h(C.Row, { key: 'r4', label: 'Butterfly Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => upd('rainbow', v) })),
            h(C.Row, { key: 'r5', label: 'Butterfly Size' }, h(C.Slider, { value: s.size, min: 0.1, max: 5, step: 0.1, onChange: v => upd('size', v) })),
            h(C.Row, { key: 'r6', label: 'Butterfly Trail' }, h(C.Toggle, { value: s.trail, onChange: v => upd('trail', v) })),
            h(C.Row, { key: 'r7', label: 'Trail Color' }, h(C.ColorPicker, { value: s.trailColor || '#FF0033', onChange: v => upd('trailColor', v) })),
            h(C.Row, { key: 'r8', label: 'Butterfly Model' }, h(C.Dropdown, { value: s.model, options: ['Default', 'Blue', 'Red', 'Purple', 'Golden'], onChange: v => upd('model', v) })),
            h(C.Row, { key: 'r9', label: 'Butterfly Sound' }, h(C.Toggle, { value: s.sound, onChange: v => upd('sound', v) })),
        ]);
    }

    // ============================================================
    // SPIN (6)
    // ============================================================
    function SpinTab({ state, setState }) {
        const s = state.spin || (state.spin = {});
        const upd = (k, v) => { state.spin[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'SPIN BOT'),
            h(C.Row, { key: 'r1', label: 'Spin Bot' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Spin Speed' }, h(C.Slider, { value: s.speed, min: 1, max: 100, step: 1, onChange: v => upd('speed', v) })),
            h(C.Row, { key: 'r3', label: 'Spin Axis' }, h(C.Dropdown, { value: s.axis, options: ['X', 'Y', 'Z'], onChange: v => upd('axis', v) })),
            h(C.Row, { key: 'r4', label: 'Spin Mode' }, h(C.Dropdown, { value: s.mode, options: ['Continuous', 'Random', 'Jitter'], onChange: v => upd('mode', v) })),
            h(C.Row, { key: 'r5', label: 'Spin on Kill' }, h(C.Toggle, { value: s.onKill, onChange: v => upd('onKill', v) })),
            h(C.Row, { key: 'r6', label: 'Spin on Hit' }, h(C.Toggle, { value: s.onHit, onChange: v => upd('onHit', v) })),
        ]);
    }

    // ============================================================
    // SKYBOX (7)
    // ============================================================
    function SkyboxTab({ state, setState }) {
        const s = state.skybox || (state.skybox = {});
        const upd = (k, v) => { state.skybox[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'SKYBOX'),
            h(C.Row, { key: 'r1', label: 'Skybox Changer' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Preset' }, h(C.Dropdown, { value: s.preset, options: ['Default', 'Sunset', 'Night', 'Space', 'Neon', 'Matrix', 'Cyberpunk', 'Anime'], onChange: v => upd('preset', v) })),
            h(C.Row, { key: 'r3', label: 'Skybox Color' }, h(C.ColorPicker, { value: s.color || '#000000', onChange: v => upd('color', v) })),
            h(C.Row, { key: 'r4', label: 'Skybox Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => upd('rainbow', v) })),
            h(C.Row, { key: 'r5', label: 'Skybox Rotation' }, h(C.Slider, { value: s.rotation, min: 0, max: 360, step: 1, onChange: v => upd('rotation', v) })),
            h(C.Row, { key: 'r6', label: 'Skybox Brightness' }, h(C.Slider, { value: s.brightness, min: 0, max: 200, step: 1, onChange: v => upd('brightness', v) })),
            h(C.Row, { key: 'r7', label: 'Upload Custom Skybox' }, h(C.Button, { label: 'Upload', onClick: () => console.log('Upload skybox') })),
        ]);
    }

    // ============================================================
    // CUSTOM MODEL (9)
    // ============================================================
    function CustomModelTab({ state, setState }) {
        const s = state.customModel || (state.customModel = {});
        const upd = (k, v) => { state.customModel[k] = v; setState({}); };
        const catalog = ['Default', 'SpongeBob', 'Shrek', 'Among Us', 'Patrick', 'Sonic', 'Mario', 'Pikachu', 'Zero Two', 'Rem', 'Mikasa', 'Nezuko', 'Naruto'];
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'CUSTOM MODEL'),
            h(C.Row, { key: 'r1', label: 'Enable' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Model Catalog' }, h(C.Dropdown, { value: s.catalog, options: catalog, onChange: v => upd('catalog', v) })),
            h(C.Row, { key: 'r3', label: 'Upload Custom (.glb)' }, h(C.Button, { label: 'Upload', onClick: () => console.log('Upload model') })),
            h(C.Row, { key: 'r4', label: 'Model Scale' }, h(C.Slider, { value: s.scale, min: 0.1, max: 5, step: 0.1, onChange: v => upd('scale', v) })),
            h(C.Row, { key: 'r5', label: 'Model Rotation' }, h(C.Slider, { value: s.rotation, min: 0, max: 360, step: 1, onChange: v => upd('rotation', v) })),
            h(C.Row, { key: 'r6', label: 'Model Offset X' }, h(C.Slider, { value: s.offsetX, min: -5, max: 5, step: 0.1, onChange: v => upd('offsetX', v) })),
            h(C.Row, { key: 'r7', label: 'Model Offset Y' }, h(C.Slider, { value: s.offsetY, min: -5, max: 5, step: 0.1, onChange: v => upd('offsetY', v) })),
            h(C.Row, { key: 'r8', label: 'Model Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => upd('rainbow', v) })),
            h(C.Row, { key: 'r9', label: 'Model Wireframe' }, h(C.Toggle, { value: s.wireframe, onChange: v => upd('wireframe', v) })),
        ]);
    }

    // ============================================================
    // CUSTOM HANDS (4)
    // ============================================================
    function CustomHandsTab({ state, setState }) {
        const s = state.customHands || (state.customHands = {});
        const upd = (k, v) => { state.customHands[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'CUSTOM HANDS'),
            h(C.Row, { key: 'r1', label: 'Custom Hands' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Hands Catalog' }, h(C.Dropdown, { value: s.catalog, options: ['Default', 'Knife', 'Glove', 'Karambit', 'Butterfly'], onChange: v => upd('catalog', v) })),
            h(C.Row, { key: 'r3', label: 'Hands Color' }, h(C.ColorPicker, { value: s.color || '#FF0033', onChange: v => upd('color', v) })),
            h(C.Row, { key: 'r4', label: 'Hands Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => upd('rainbow', v) })),
        ]);
    }

    // ============================================================
    // CUSTOM WEAPON (6)
    // ============================================================
    function CustomWeaponTab({ state, setState }) {
        const s = state.customWeapon || (state.customWeapon = {});
        const upd = (k, v) => { state.customWeapon[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'CUSTOM WEAPON'),
            h(C.Row, { key: 'r1', label: 'Custom Weapon Model' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Weapon Catalog' }, h(C.Dropdown, { value: s.catalog, options: ['Default', 'AK-47', 'M4A4', 'AWP', 'Deagle', 'Knife'], onChange: v => upd('catalog', v) })),
            h(C.Row, { key: 'r3', label: 'Weapon Skin' }, h(C.Dropdown, { value: s.skin, options: ['Default', 'Redline', 'Asiimov', 'Dragon Lore', 'Howl'], onChange: v => upd('skin', v) })),
            h(C.Row, { key: 'r4', label: 'Weapon Skin Catalog' }, h(C.Button, { label: 'Open', onClick: () => console.log('Open catalog') })),
            h(C.Row, { key: 'r5', label: 'Upload Weapon Skin' }, h(C.Button, { label: 'Upload', onClick: () => console.log('Upload skin') })),
            h(C.Row, { key: 'r6', label: 'Weapon Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => upd('rainbow', v) })),
        ]);
    }

    // ============================================================
    // GRENADE (12)
    // ============================================================
    function GrenadeTab({ state, setState }) {
        const s = state.grenade || (state.grenade = {});
        const upd = (k, v) => { state.grenade[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'GRENADE DIRECTION'),
            h(C.Row, { key: 'r1', label: 'Grenade Direction' }, h(C.Toggle, { value: s.direction, onChange: v => upd('direction', v) })),
            h(C.Row, { key: 'r2', label: 'Style' }, h(C.Dropdown, { value: s.dirStyle, options: ['Arrow', 'Line', 'Trail'], onChange: v => upd('dirStyle', v) })),
            h(C.Row, { key: 'r3', label: 'Direction Color' }, h(C.ColorPicker, { value: s.dirColor || '#FF0033', onChange: v => upd('dirColor', v) })),
            h(C.Row, { key: 'r4', label: 'Direction Thickness' }, h(C.Slider, { value: s.dirThickness, min: 1, max: 10, step: 1, onChange: v => upd('dirThickness', v) })),
            h(C.Row, { key: 'r5', label: 'Direction Fade' }, h(C.Toggle, { value: s.dirFade, onChange: v => upd('dirFade', v) })),

            h(C.SectionTitle, { key: 't2' }, 'GRENADE MAGNET'),
            h(C.Row, { key: 'r6', label: 'Grenade Magnet' }, h(C.Toggle, { value: s.magnet, onChange: v => upd('magnet', v) })),
            h(C.Row, { key: 'r7', label: 'Magnet Mode' }, h(C.Dropdown, { value: s.magnetMode, options: ['Auto', 'Key', 'Always'], onChange: v => upd('magnetMode', v) })),
            h(C.Row, { key: 'r8', label: 'Magnet FOV' }, h(C.Slider, { value: s.magnetFov, min: 10, max: 360, step: 1, onChange: v => upd('magnetFov', v) })),
            h(C.Row, { key: 'r9', label: 'Magnet Strength' }, h(C.Slider, { value: s.magnetStrength, min: 1, max: 100, step: 1, onChange: v => upd('magnetStrength', v) })),
            h(C.Row, { key: 'r10', label: 'Magnet Priority' }, h(C.Dropdown, { value: s.magnetPriority, options: ['Nearest', 'Lowest HP', 'Most HP'], onChange: v => upd('magnetPriority', v) })),
            h(C.Row, { key: 'r11', label: 'Magnet Visible Check' }, h(C.Toggle, { value: s.magnetVisible, onChange: v => upd('magnetVisible', v) })),
            h(C.Row, { key: 'r12', label: 'Magnet Prediction' }, h(C.Toggle, { value: s.magnetPrediction, onChange: v => upd('magnetPrediction', v) })),
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
