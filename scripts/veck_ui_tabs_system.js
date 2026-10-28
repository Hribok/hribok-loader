/**
 * Hribok UI — System Tabs
 */

(function () {
    'use strict';
    let h = null, C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;
        window.HribokTabs = window.HribokTabs || {};
        Object.assign(window.HribokTabs, { MiscTab, PlayersTab, ConfigsTab, SettingsTab, CreditsTab });
        console.log('[Hribok] System tabs loaded');
    }

    function MiscTab({ state, setState }) {
        return h('div', null, [
            h(C.SectionTitle, { key: 'm1' }, 'MISC'),
            h(C.Placeholder, { key: 'm2', name: 'Misc' }),
        ]);
    }

    function PlayersTab({ state, setState }) {
        return h('div', null, [
            h(C.SectionTitle, { key: 'pl1' }, 'PLAYERS'),
            h(C.Placeholder, { key: 'pl2', name: 'Players List' }),
        ]);
    }

    function ConfigsTab({ state, setState }) {
        const s = state.configs;
        return h('div', null, [
            h(C.SectionTitle, { key: 'c1' }, 'CONFIGS'),
            h(C.Row, { key: 'c2', label: 'Config List' }, h(C.Dropdown, { value: s.customs[0], options: s.customs, onChange: v => {} })),
            h(C.Row, { key: 'c3', label: 'Save' }, h(C.Button, { label: 'SAVE', onClick: () => {} })),
            h(C.Row, { key: 'c4', label: 'Load' }, h(C.Button, { label: 'LOAD', onClick: () => {} })),
            h(C.Row, { key: 'c5', label: 'Delete' }, h(C.Button, { label: 'DELETE', variant: 'danger', onClick: () => {} })),
        ]);
    }

    function SettingsTab({ state, setState }) {
        const s = state.settings;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'st1' }, 'SETTINGS'),
            h(C.Row, { key: 'st2', label: 'Menu Key' }, h(C.Dropdown, { value: s.menuKey, options: ['P', 'Insert', 'Delete', 'F1', 'F2'], onChange: v => u('menuKey', v) })),
            h(C.Row, { key: 'st3', label: 'UI Scale' }, h(C.Slider, { value: s.uiScale, min: 50, max: 150, step: 1, onChange: v => u('uiScale', v) })),
            h(C.Row, { key: 'st4', label: 'Opacity' }, h(C.Slider, { value: s.opacity, min: 50, max: 100, step: 1, onChange: v => u('opacity', v) })),
            h(C.Row, { key: 'st5', label: 'Show Watermark' }, h(C.Toggle, { value: s.showWatermark, onChange: v => u('showWatermark', v) })),
            h(C.Row, { key: 'st6', label: 'Stream Proof' }, h(C.Toggle, { value: s.streamProof, onChange: v => u('streamProof', v) })),
        ]);
    }

    function CreditsTab({ state, setState }) {
        return h('div', null, [
            h(C.SectionTitle, { key: 'cr1' }, 'CREDITS'),
            h('div', { style: 'text-align:center; padding: 20px; color: #E0E0E0;' }, [
                h('div', { style: 'font-size: 24px; font-weight: 700; color: var(--hb-accent); margin-bottom: 12px;' }, 'Hribok'),
                h('div', { style: 'font-size: 14px; margin-bottom: 4px;' }, 'Created by Hribok & RedHat'),
                h('div', { style: 'font-size: 12px; color: #888; margin-top: 16px;' }, 'Onyx still Nyx. 6767.'),
            ]),
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();