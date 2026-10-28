/**
 * Hribok UI — Themes Tab
 */

(function () {
    'use strict';
    let h = null, C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;
        window.HribokTabs = window.HribokTabs || {};
        window.HribokTabs.ThemesTab = ThemesTab;
        console.log('[Hribok] Themes tab loaded');
    }

    function ThemesTab({ state, setState }) {
        const s = state.themes || (state.themes = { current: 'red', animated: true });
        const themes = (window.HribokTheme && window.HribokTheme.getList()) || [];
        const applyTheme = (id) => {
            s.current = id;
            if (window.HribokTheme) window.HribokTheme.apply(id);
            setState({});
        };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'THEMES'),
            h(C.Row, { key: 't2', label: 'Animated Themes' }, h(C.Toggle, { value: s.animated, onChange: v => { s.animated = v; setState({}); } })),
            ...themes.map(t => h(C.Row, { key: t.id, label: t.name }, h(C.Button, {
                label: s.current === t.id ? 'ACTIVE' : 'APPLY',
                variant: s.current === t.id ? '' : 'danger',
                onClick: () => applyTheme(t.id)
            }))),
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();