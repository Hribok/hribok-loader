/**
 * Hribok UI — Animation Tab
 */

(function () {
    'use strict';
    let h = null, C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;
        window.HribokTabs = window.HribokTabs || {};
        window.HribokTabs.AnimationTab = AnimationTab;
        console.log('[Hribok] Animation tab loaded');
    }

    function AnimationTab({ state, setState }) {
        const s = state.animation || (state.animation = {
            menuOpen: 'fade', menuClose: 'fade', rowHover: 'glow', tabSwitch: 'slide',
            toggleAnim: 'smooth', sliderAnim: 'glow', background: 'grid',
            mouseTrail: false, mouseTrailStyle: 'glow', uiSounds: false, volume: 50,
        });
        const u = (k, v) => { s[k] = v; setState({}); };

        return h('div', null, [
            h(C.SectionTitle, { key: 'a1' }, 'MENU ANIMATION'),
            h(C.Row, { key: 'a2', label: 'Menu Open' }, h(C.Dropdown, { value: s.menuOpen, options: ['fade', 'slide', 'blur', 'scale'], onChange: v => u('menuOpen', v) })),
            h(C.Row, { key: 'a3', label: 'Menu Close' }, h(C.Dropdown, { value: s.menuClose, options: ['fade', 'slide', 'blur', 'scale'], onChange: v => u('menuClose', v) })),

            h(C.SectionTitle, { key: 'a4' }, 'ELEMENT ANIMATION'),
            h(C.Row, { key: 'a5', label: 'Row Hover' }, h(C.Dropdown, { value: s.rowHover, options: ['glow', 'slide', 'ripple', 'pulse'], onChange: v => u('rowHover', v) })),
            h(C.Row, { key: 'a6', label: 'Tab Switch' }, h(C.Dropdown, { value: s.tabSwitch, options: ['slide', 'fade', 'bounce', 'none'], onChange: v => u('tabSwitch', v) })),
            h(C.Row, { key: 'a7', label: 'Toggle Animation' }, h(C.Dropdown, { value: s.toggleAnim, options: ['smooth', 'instant', 'elastic'], onChange: v => u('toggleAnim', v) })),
            h(C.Row, { key: 'a8', label: 'Slider Animation' }, h(C.Dropdown, { value: s.sliderAnim, options: ['smooth', 'glow'], onChange: v => u('sliderAnim', v) })),

            h(C.SectionTitle, { key: 'a9' }, 'BACKGROUND'),
            h(C.Row, { key: 'a10', label: 'Background Effect' }, h(C.Dropdown, { value: s.background, options: ['none', 'grid', 'particles', 'gradient'], onChange: v => u('background', v) })),

            h(C.SectionTitle, { key: 'a11' }, 'MOUSE'),
            h(C.Row, { key: 'a12', label: 'Mouse Trail' }, h(C.Toggle, { value: s.mouseTrail, onChange: v => u('mouseTrail', v) })),
            h(C.Row, { key: 'a13', label: 'Trail Style' }, h(C.Dropdown, { value: s.mouseTrailStyle, options: ['dots', 'line', 'glow', 'sparkles'], onChange: v => u('mouseTrailStyle', v) })),

            h(C.SectionTitle, { key: 'a14' }, 'SOUNDS'),
            h(C.Row, { key: 'a15', label: 'UI Sounds' }, h(C.Toggle, { value: s.uiSounds, onChange: v => u('uiSounds', v) })),
            h(C.Row, { key: 'a16', label: 'Volume' }, h(C.Slider, { value: s.volume, min: 0, max: 100, step: 1, onChange: v => u('volume', v) })),
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();