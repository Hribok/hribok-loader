/**
 * Hribok UI — Themes
 * 5 themes: Red (default), Black, White, Purple, Blue
 */

(function () {
    'use strict';

    const THEMES = {
        red: {
            '--hb-accent': '#FF0033',
            '--hb-accent-dim': 'rgba(255, 0, 51, 0.15)',
            '--hb-accent-glow': 'rgba(255, 0, 51, 0.4)',
            '--hb-accent-hover': 'rgba(255, 0, 51, 0.08)',
            '--hb-accent-border': 'rgba(255, 0, 51, 0.1)',
            '--hb-accent-border-hover': 'rgba(255, 0, 51, 0.2)',
            '--hb-bg': 'rgba(10, 10, 10, 0.95)',
            '--hb-bg-header': 'rgba(10, 10, 10, 0.6)',
            '--hb-bg-sidebar': 'rgba(5, 5, 5, 0.7)',
            '--hb-bg-row': 'rgba(20, 20, 20, 0.7)',
            '--hb-bg-row-hover': 'rgba(24, 24, 24, 0.8)',
            '--hb-bg-input': 'rgba(30, 30, 30, 0.9)',
            '--hb-text': '#E0E0E0',
            '--hb-text-dim': '#888',
            '--hb-text-label': '#C0C0C0',
            '--hb-text-muted': '#666',
        },
        black: {
            '--hb-accent': '#FFFFFF',
            '--hb-accent-dim': 'rgba(255, 255, 255, 0.15)',
            '--hb-accent-glow': 'rgba(255, 255, 255, 0.3)',
            '--hb-accent-hover': 'rgba(255, 255, 255, 0.06)',
            '--hb-accent-border': 'rgba(255, 255, 255, 0.1)',
            '--hb-accent-border-hover': 'rgba(255, 255, 255, 0.2)',
            '--hb-bg': 'rgba(5, 5, 5, 0.97)',
            '--hb-bg-header': 'rgba(5, 5, 5, 0.7)',
            '--hb-bg-sidebar': 'rgba(0, 0, 0, 0.8)',
            '--hb-bg-row': 'rgba(15, 15, 15, 0.8)',
            '--hb-bg-row-hover': 'rgba(20, 20, 20, 0.9)',
            '--hb-bg-input': 'rgba(25, 25, 25, 0.95)',
            '--hb-text': '#FFFFFF',
            '--hb-text-dim': '#999',
            '--hb-text-label': '#CCCCCC',
            '--hb-text-muted': '#777',
        },
        white: {
            '--hb-accent': '#1A73E8',
            '--hb-accent-dim': 'rgba(26, 115, 232, 0.15)',
            '--hb-accent-glow': 'rgba(26, 115, 232, 0.3)',
            '--hb-accent-hover': 'rgba(26, 115, 232, 0.06)',
            '--hb-accent-border': 'rgba(26, 115, 232, 0.15)',
            '--hb-accent-border-hover': 'rgba(26, 115, 232, 0.3)',
            '--hb-bg': 'rgba(250, 250, 250, 0.98)',
            '--hb-bg-header': 'rgba(245, 245, 245, 0.9)',
            '--hb-bg-sidebar': 'rgba(240, 240, 240, 0.9)',
            '--hb-bg-row': 'rgba(255, 255, 255, 0.9)',
            '--hb-bg-row-hover': 'rgba(245, 245, 245, 1)',
            '--hb-bg-input': 'rgba(255, 255, 255, 1)',
            '--hb-text': '#202124',
            '--hb-text-dim': '#5F6368',
            '--hb-text-label': '#3C4043',
            '--hb-text-muted': '#80868B',
        },
        purple: {
            '--hb-accent': '#A855F7',
            '--hb-accent-dim': 'rgba(168, 85, 247, 0.15)',
            '--hb-accent-glow': 'rgba(168, 85, 247, 0.4)',
            '--hb-accent-hover': 'rgba(168, 85, 247, 0.08)',
            '--hb-accent-border': 'rgba(168, 85, 247, 0.12)',
            '--hb-accent-border-hover': 'rgba(168, 85, 247, 0.25)',
            '--hb-bg': 'rgba(15, 8, 25, 0.95)',
            '--hb-bg-header': 'rgba(15, 8, 25, 0.6)',
            '--hb-bg-sidebar': 'rgba(10, 5, 18, 0.7)',
            '--hb-bg-row': 'rgba(25, 15, 40, 0.7)',
            '--hb-bg-row-hover': 'rgba(35, 20, 55, 0.8)',
            '--hb-bg-input': 'rgba(40, 25, 60, 0.9)',
            '--hb-text': '#E8DBFF',
            '--hb-text-dim': '#8A7AA8',
            '--hb-text-label': '#C7B8E0',
            '--hb-text-muted': '#665577',
        },
        blue: {
            '--hb-accent': '#00BFFF',
            '--hb-accent-dim': 'rgba(0, 191, 255, 0.15)',
            '--hb-accent-glow': 'rgba(0, 191, 255, 0.4)',
            '--hb-accent-hover': 'rgba(0, 191, 255, 0.08)',
            '--hb-accent-border': 'rgba(0, 191, 255, 0.12)',
            '--hb-accent-border-hover': 'rgba(0, 191, 255, 0.25)',
            '--hb-bg': 'rgba(8, 15, 25, 0.95)',
            '--hb-bg-header': 'rgba(8, 15, 25, 0.6)',
            '--hb-bg-sidebar': 'rgba(5, 10, 18, 0.7)',
            '--hb-bg-row': 'rgba(15, 25, 40, 0.7)',
            '--hb-bg-row-hover': 'rgba(20, 35, 55, 0.8)',
            '--hb-bg-input': 'rgba(25, 40, 60, 0.9)',
            '--hb-text': '#DBEEFF',
            '--hb-text-dim': '#7A94B0',
            '--hb-text-label': '#B8CDE0',
            '--hb-text-muted': '#556B80',
        },
    };

    let currentTheme = 'red';

    function apply(themeName) {
        if (!THEMES[themeName]) {
            console.warn('[Hribok] Unknown theme:', themeName);
            return;
        }
        currentTheme = themeName;

        const root = document.documentElement;
        const theme = THEMES[themeName];
        for (const key in theme) {
            root.style.setProperty(key, theme[key]);
        }

        // Save to localStorage
        try {
            localStorage.setItem('hribok-theme', themeName);
        } catch (e) {}

        console.log('[Hribok] Theme applied:', themeName);
    }

    function getCurrent() {
        return currentTheme;
    }

    function list() {
        return Object.keys(THEMES);
    }

    // Load saved theme on startup
    try {
        const saved = localStorage.getItem('hribok-theme');
        if (saved && THEMES[saved]) {
            currentTheme = saved;
        }
    } catch (e) {}

    window.HribokTheme = {
        apply: apply,
        getCurrent: getCurrent,
        list: list,
        THEMES: THEMES,
    };

    console.log('[Hribok] Themes module loaded. Current theme:', currentTheme);

})();
