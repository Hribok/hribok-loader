/**
 * Hribok UI — Themes Tab (Elite + Animated)
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
            
            h('div', { style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px;' },
                themes.map(t => {
                    const isActive = s.current === t.id;
                    const isAnimated = t.type === 'animated';
                    
                    // Якщо анімована і увімкнено анімацію — додаємо градієнт
                    let bgStyle = 'background: var(--hb-bg-row);';
                    if (isAnimated && s.animated) {
                        bgStyle = 'background: linear-gradient(90deg, ' + t.accent + '22, ' + t.accent + '11);';
                    }
                    
                    return h('div', {
                        key: t.id,
                        style: bgStyle + 'border: 1px solid ' + (isActive ? 'var(--hb-accent)' : 'var(--hb-accent-border)') + '; border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.3s;' + (isActive ? ' box-shadow: 0 0 20px ' + t.accent + '44;' : ''),
                        onClick: () => applyTheme(t.id)
                    }, [
                        h('div', { style: 'display: flex; align-items: center; gap: 10px;' }, [
                            h('div', { style: 'width: 18px; height: 18px; border-radius: 50%; background: ' + t.accent + '; box-shadow: 0 0 12px ' + t.accent + ';' }),
                            h('span', { style: 'color: ' + (isActive ? 'var(--hb-accent)' : 'var(--hb-text-label)') + '; font-size: 13px; font-weight: 600;' }, t.name)
                        ]),
                        isActive ? h('span', { style: 'color: var(--hb-accent); font-size: 10px; font-weight: 800; letter-spacing: 1px;' }, 'ACTIVE') : null
                    ]);
                })
            )
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();