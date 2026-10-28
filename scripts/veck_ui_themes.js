/**
 * Hribok UI — Themes
 * 5 базових + 7 анімованих
 */

(function () {
    'use strict';

    const THEMES = {
        red: { name: 'Red', type: 'basic', accent: '#FF0033', class: '' },
        black: { name: 'Black', type: 'basic', accent: '#FFFFFF', class: 'hb-theme-black' },
        white: { name: 'White', type: 'basic', accent: '#00AAFF', class: 'hb-theme-white' },
        purple: { name: 'Purple', type: 'basic', accent: '#AA00FF', class: 'hb-theme-purple' },
        blue: { name: 'Blue', type: 'basic', accent: '#0066FF', class: 'hb-theme-blue' },
        sakura: { name: 'Sakura', type: 'animated', accent: '#FF69B4', class: 'hb-theme-sakura' },
        aurora: { name: 'Aurora', type: 'animated', accent: '#00FFAA', class: 'hb-theme-aurora' },
        neon: { name: 'Neon', type: 'animated', accent: '#FF00FF', class: 'hb-theme-neon' },
        blood: { name: 'Blood', type: 'animated', accent: '#CC0000', class: 'hb-theme-blood' },
        ice: { name: 'Ice', type: 'animated', accent: '#00CCFF', class: 'hb-theme-ice' },
        cyberpunk: { name: 'Cyberpunk', type: 'animated', accent: '#FFE600', class: 'hb-theme-cyberpunk' },
        matrix: { name: 'Matrix', type: 'animated', accent: '#00FF00', class: 'hb-theme-matrix' },
    };

    function apply(themeName) {
        const theme = THEMES[themeName] || THEMES.red;
        const root = document.getElementById('hribok-root');
        if (!root) return;
        Object.values(THEMES).forEach(t => { if (t.class) root.classList.remove(t.class); });
        if (theme.class) root.classList.add(theme.class);
        document.documentElement.style.setProperty('--hb-accent', theme.accent);
        document.documentElement.style.setProperty('--hb-accent-dim', theme.accent + '26');
        document.documentElement.style.setProperty('--hb-accent-glow', theme.accent + '66');
        localStorage.setItem('hribok-theme', themeName);
        console.log('[Hribok] Theme applied:', themeName);
    }

    function getList() {
        return Object.entries(THEMES).map(([id, t]) => ({ id, ...t }));
    }

    window.HribokTheme = { apply, getList, THEMES };
    console.log('[Hribok] Themes module loaded');
})();