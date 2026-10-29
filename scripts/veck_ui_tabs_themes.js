/**
 * Hribok UI — Themes Tab (Elite Version)
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
            h(C.Row, { key: 't2', label: 'Animated Themes' }, h(C.Toggle, {
                value: s.animated,
                onChange: v => { s.animated = v; setState({}); }
            })),
            
            // Сітка з темами
            h('div', { style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px;' },
                themes.map(t => {
                    const isActive = s.current === t.id;
                    return h('div', {
                        key: t.id,
                        style: 'background: var(--hb-bg-row); border: 1px solid ' + (isActive ? 'var(--hb-accent)' : 'var(--hb-accent-border)') + '; border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.2s;' + (isActive ? ' box-shadow: 0 0 15px var(--hb-accent-glow);' : ''),
                        onClick: () => applyTheme(t.id)
                    }, [
                        h('div', { style: 'display: flex; align-items: center; gap: 10px;' }, [
                            // Кольоровий кружечок
                            h('div', { style: 'width: 16px; height: 16px; border-radius: 50%; background: ' + t.accent + '; box-shadow: 0 0 10px ' + t.accent + ';' }),
                            h('span', { style: 'color: ' + (isActive ? 'var(--hb-accent)' : 'var(--hb-text-label)') + '; font-size: 13px; font-weight: 500;' }, t.name)
                        ]),
                        isActive ? h('span', { style: 'color: var(--hb-accent); font-size: 11px; font-weight: 700;' }, 'ACTIVE') : null
                    ]);
                })
            )
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();