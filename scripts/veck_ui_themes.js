/**
 * Hribok UI — Themes
 * 10 themes: Red, Black, White, Purple, Blue, Sakura, Blood, Matrix, Ice, Cyberpunk, Aurora
 */

(function () {
    'use strict';

    const THEMES = {
        red: {
            '--hb-accent': '#FF0033', '--hb-accent-dim': 'rgba(255, 0, 51, 0.15)', '--hb-accent-glow': 'rgba(255, 0, 51, 0.4)',
            '--hb-bg': 'rgba(10, 10, 10, 0.95)', '--hb-bg-header': 'rgba(10, 10, 10, 0.6)', '--hb-bg-sidebar': 'rgba(5, 5, 5, 0.7)',
            '--hb-bg-row': 'rgba(20, 20, 20, 0.7)', '--hb-bg-input': 'rgba(30, 30, 30, 0.9)',
            '--hb-text': '#E0E0E0', '--hb-text-dim': '#888', '--hb-text-label': '#C0C0C0', '--hb-text-muted': '#666',
        },
        black: {
            '--hb-accent': '#FFFFFF', '--hb-accent-dim': 'rgba(255, 255, 255, 0.15)', '--hb-accent-glow': 'rgba(255, 255, 255, 0.3)',
            '--hb-bg': 'rgba(5, 5, 5, 0.97)', '--hb-bg-header': 'rgba(5, 5, 5, 0.7)', '--hb-bg-sidebar': 'rgba(0, 0, 0, 0.8)',
            '--hb-bg-row': 'rgba(15, 15, 15, 0.8)', '--hb-bg-input': 'rgba(25, 25, 25, 0.95)',
            '--hb-text': '#FFFFFF', '--hb-text-dim': '#999', '--hb-text-label': '#CCCCCC', '--hb-text-muted': '#777',
        },
        white: {
            '--hb-accent': '#1A73E8', '--hb-accent-dim': 'rgba(26, 115, 232, 0.1)', '--hb-accent-glow': 'rgba(26, 115, 232, 0.2)',
            '--hb-bg': 'rgba(250, 250, 250, 0.98)', '--hb-bg-header': 'rgba(255, 255, 255, 0.9)', '--hb-bg-sidebar': 'rgba(240, 240, 240, 0.9)',
            '--hb-bg-row': 'rgba(255, 255, 255, 0.95)', '--hb-bg-input': 'rgba(255, 255, 255, 1)',
            '--hb-text': '#202124', '--hb-text-dim': '#5F6368', '--hb-text-label': '#3C4043', '--hb-text-muted': '#80868B',
        },
        purple: {
            '--hb-accent': '#A855F7', '--hb-accent-dim': 'rgba(168, 85, 247, 0.15)', '--hb-accent-glow': 'rgba(168, 85, 247, 0.4)',
            '--hb-bg': 'rgba(15, 8, 25, 0.95)', '--hb-bg-header': 'rgba(15, 8, 25, 0.6)', '--hb-bg-sidebar': 'rgba(10, 5, 18, 0.7)',
            '--hb-bg-row': 'rgba(25, 15, 40, 0.7)', '--hb-bg-input': 'rgba(40, 25, 60, 0.9)',
            '--hb-text': '#E8DBFF', '--hb-text-dim': '#8A7AA8', '--hb-text-label': '#C7B8E0', '--hb-text-muted': '#665577',
        },
        blue: {
            '--hb-accent': '#00BFFF', '--hb-accent-dim': 'rgba(0, 191, 255, 0.15)', '--hb-accent-glow': 'rgba(0, 191, 255, 0.4)',
            '--hb-bg': 'rgba(8, 15, 25, 0.95)', '--hb-bg-header': 'rgba(8, 15, 25, 0.6)', '--hb-bg-sidebar': 'rgba(5, 10, 18, 0.7)',
            '--hb-bg-row': 'rgba(15, 25, 40, 0.7)', '--hb-bg-input': 'rgba(25, 40, 60, 0.9)',
            '--hb-text': '#DBEEFF', '--hb-text-dim': '#7A94B0', '--hb-text-label': '#B8CDE0', '--hb-text-muted': '#556B80',
        },
        sakura: {
            '--hb-accent': '#FFB7C5', '--hb-accent-dim': 'rgba(255, 183, 197, 0.15)', '--hb-accent-glow': 'rgba(255, 183, 197, 0.5)',
            '--hb-bg': 'rgba(25, 10, 15, 0.95)', '--hb-bg-header': 'rgba(25, 10, 15, 0.6)', '--hb-bg-sidebar': 'rgba(15, 5, 10, 0.7)',
            '--hb-bg-row': 'rgba(35, 15, 20, 0.7)', '--hb-bg-input': 'rgba(45, 20, 25, 0.9)',
            '--hb-text': '#FFFFFF', '--hb-text-dim': '#A08080', '--hb-text-label': '#FFD1DC', '--hb-text-muted': '#805060',
        },
        blood: {
            '--hb-accent': '#FF0000', '--hb-accent-dim': 'rgba(255, 0, 0, 0.2)', '--hb-accent-glow': 'rgba(255, 0, 0, 0.6)',
            '--hb-bg': 'rgba(10, 0, 0, 0.95)', '--hb-bg-header': 'rgba(10, 0, 0, 0.6)', '--hb-bg-sidebar': 'rgba(5, 0, 0, 0.7)',
            '--hb-bg-row': 'rgba(20, 5, 5, 0.7)', '--hb-bg-input': 'rgba(30, 10, 10, 0.9)',
            '--hb-text': '#FFCCCC', '--hb-text-dim': '#AA6666', '--hb-text-label': '#FF9999', '--hb-text-muted': '#804040',
        },
        matrix: {
            '--hb-accent': '#00FF00', '--hb-accent-dim': 'rgba(0, 255, 0, 0.15)', '--hb-accent-glow': 'rgba(0, 255, 0, 0.4)',
            '--hb-bg': 'rgba(0, 5, 0, 0.95)', '--hb-bg-header': 'rgba(0, 5, 0, 0.6)', '--hb-bg-sidebar': 'rgba(0, 5, 0, 0.7)',
            '--hb-bg-row': 'rgba(5, 15, 5, 0.7)', '--hb-bg-input': 'rgba(10, 25, 10, 0.9)',
            '--hb-text': '#00FF00', '--hb-text-dim': '#007700', '--hb-text-label': '#00AA00', '--hb-text-muted': '#005500',
        },
        ice: {
            '--hb-accent': '#00FFFF', '--hb-accent-dim': 'rgba(0, 255, 255, 0.15)', '--hb-accent-glow': 'rgba(0, 255, 255, 0.4)',
            '--hb-bg': 'rgba(5, 10, 15, 0.95)', '--hb-bg-header': 'rgba(5, 10, 15, 0.6)', '--hb-bg-sidebar': 'rgba(0, 5, 10, 0.7)',
            '--hb-bg-row': 'rgba(10, 20, 30, 0.7)', '--hb-bg-input': 'rgba(15, 30, 40, 0.9)',
            '--hb-text': '#E0FFFF', '--hb-text-dim': '#709090', '--hb-text-label': '#B0E0E0', '--hb-text-muted': '#508080',
        },
        cyberpunk: {
            '--hb-accent': '#FF00FF', '--hb-accent-dim': 'rgba(255, 0, 255, 0.15)', '--hb-accent-glow': 'rgba(255, 0, 255, 0.5)',
            '--hb-bg': 'rgba(10, 0, 10, 0.95)', '--hb-bg-header': 'rgba(10, 0, 10, 0.6)', '--hb-bg-sidebar': 'rgba(5, 0, 5, 0.7)',
            '--hb-bg-row': 'rgba(20, 0, 20, 0.7)', '--hb-bg-input': 'rgba(30, 0, 30, 0.9)',
            '--hb-text': '#FFFF00', '--hb-text-dim': '#888800', '--hb-text-label': '#FFDD00', '--hb-text-muted': '#666600',
        },
        aurora: {
            '--hb-accent': '#00FFCC', '--hb-accent-dim': 'rgba(0, 255, 204, 0.15)', '--hb-accent-glow': 'rgba(0, 255, 204, 0.5)',
            '--hb-bg': 'rgba(5, 15, 20, 0.95)', '--hb-bg-header': 'rgba(5, 15, 20, 0.6)', '--hb-bg-sidebar': 'rgba(0, 10, 15, 0.7)',
            '--hb-bg-row': 'rgba(10, 25, 30, 0.7)', '--hb-bg-input': 'rgba(15, 35, 40, 0.9)',
            '--hb-text': '#E0FFFF', '--hb-text-dim': '#608080', '--hb-text-label': '#A0E0D0', '--hb-text-muted': '#408070',
        }
    };

    let currentTheme = 'red';

    function apply(themeName) {
        if (!THEMES[themeName]) return;
        currentTheme = themeName;
        const root = document.documentElement;
        const theme = THEMES[themeName];
        
        const base = THEMES.red;
        for (const key in base) root.style.setProperty(key, base[key]);
        for (const key in theme) root.style.setProperty(key, theme[key]);

        try { localStorage.setItem('hribok-theme', themeName); } catch (e) {}
        console.log('[Hribok] Theme applied:', themeName);
    }

    try {
        const saved = localStorage.getItem('hribok-theme');
        if (saved && THEMES[saved]) currentTheme = saved;
    } catch (e) {}

    window.HribokTheme = { apply, getCurrent: () => currentTheme, list: () => Object.keys(THEMES) };
    console.log('[Hribok] Themes loaded (10 themes available)');
})();