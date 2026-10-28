/**
 * Hribok UI — Themes
 * Base: Red, Black, White, Purple, Blue, Sakura, Aurora, Cyberpunk, Blood, Matrix
 * Animated: Neon, Sakura, Cyberpunk, Aurora, Blood, Ice, Matrix
 */

(function () {
    'use strict';

    const THEMES = {
        // --- БАЗОВІ ---
        red: {
            '--hb-accent': '#FF0033',
            '--hb-accent-dim': 'rgba(255, 0, 51, 0.15)',
            '--hb-accent-glow': 'rgba(255, 0, 51, 0.4)',
            '--hb-bg': 'rgba(10, 10, 10, 0.95)',
            '--hb-bg-header': 'rgba(10, 10, 10, 0.6)',
            '--hb-bg-sidebar': 'rgba(5, 5, 5, 0.7)',
            '--hb-bg-row': 'rgba(20, 20, 20, 0.7)',
            '--hb-text': '#E0E0E0',
            '--hb-text-label': '#C0C0C0',
            '--hb-text-muted': '#666',
        },
        black: {
            '--hb-accent': '#FFFFFF',
            '--hb-accent-dim': 'rgba(255, 255, 255, 0.15)',
            '--hb-accent-glow': 'rgba(255, 255, 255, 0.3)',
            '--hb-bg': 'rgba(5, 5, 5, 0.97)',
            '--hb-bg-header': 'rgba(5, 5, 5, 0.7)',
            '--hb-bg-sidebar': 'rgba(0, 0, 0, 0.8)',
            '--hb-bg-row': 'rgba(15, 15, 15, 0.8)',
            '--hb-text': '#FFFFFF',
            '--hb-text-label': '#CCCCCC',
            '--hb-text-muted': '#777',
        },
        white: {
            '--hb-accent': '#1A73E8',
            '--hb-accent-dim': 'rgba(26, 115, 232, 0.15)',
            '--hb-accent-glow': 'rgba(26, 115, 232, 0.3)',
            '--hb-bg': 'rgba(250, 250, 250, 0.98)',
            '--hb-bg-header': 'rgba(245, 245, 245, 0.9)',
            '--hb-bg-sidebar': 'rgba(240, 240, 240, 0.9)',
            '--hb-bg-row': 'rgba(255, 255, 255, 0.9)',
            '--hb-text': '#202124',
            '--hb-text-label': '#3C4043',
            '--hb-text-muted': '#80868B',
        },
        purple: {
            '--hb-accent': '#A855F7',
            '--hb-accent-dim': 'rgba(168, 85, 247, 0.15)',
            '--hb-accent-glow': 'rgba(168, 85, 247, 0.4)',
            '--hb-bg': 'rgba(15, 8, 25, 0.95)',
            '--hb-bg-header': 'rgba(15, 8, 25, 0.6)',
            '--hb-bg-sidebar': 'rgba(10, 5, 18, 0.7)',
            '--hb-bg-row': 'rgba(25, 15, 40, 0.7)',
            '--hb-text': '#E8DBFF',
            '--hb-text-label': '#C7B8E0',
            '--hb-text-muted': '#665577',
        },
        blue: {
            '--hb-accent': '#00BFFF',
            '--hb-accent-dim': 'rgba(0, 191, 255, 0.15)',
            '--hb-accent-glow': 'rgba(0, 191, 255, 0.4)',
            '--hb-bg': 'rgba(8, 15, 25, 0.95)',
            '--hb-bg-header': 'rgba(8, 15, 25, 0.6)',
            '--hb-bg-sidebar': 'rgba(5, 10, 18, 0.7)',
            '--hb-bg-row': 'rgba(15, 25, 40, 0.7)',
            '--hb-text': '#DBEEFF',
            '--hb-text-label': '#B8CDE0',
            '--hb-text-muted': '#556B80',
        },

        // --- СПЕЦІАЛЬНІ ---
        sakura: {
            '--hb-accent': '#FFB7C5', // Рожевий
            '--hb-accent-dim': 'rgba(255, 183, 197, 0.15)',
            '--hb-accent-glow': 'rgba(255, 183, 197, 0.5)',
            '--hb-bg': 'rgba(25, 10, 15, 0.95)',
            '--hb-bg-header': 'rgba(25, 10, 15, 0.6)',
            '--hb-bg-sidebar': 'rgba(15, 5, 10, 0.7)',
            '--hb-bg-row': 'rgba(35, 15, 20, 0.7)',
            '--hb-text': '#FFFFFF',
            '--hb-text-label': '#FFD1DC',
            '--hb-text-muted': '#A08080',
        },
        blood: {
            '--hb-accent': '#FF0000',
            '--hb-accent-dim': 'rgba(255, 0, 0, 0.2)',
            '--hb-accent-glow': 'rgba(255, 0, 0, 0.6)',
            '--hb-bg': 'rgba(10, 0, 0, 0.95)',
            '--hb-bg-header': 'rgba(10, 0, 0, 0.6)',
            '--hb-bg-sidebar': 'rgba(5, 0, 0, 0.7)',
            '--hb-bg-row': 'rgba(20, 5, 5, 0.7)',
            '--hb-text': '#FFCCCC',
            '--hb-text-label': '#FF9999',
            '--hb-text-muted': '#804040',
        },
        matrix: {
            '--hb-accent': '#00FF00',
            '--hb-accent-dim': 'rgba(0, 255, 0, 0.15)',
            '--hb-accent-glow': 'rgba(0, 255, 0, 0.4)',
            '--hb-bg': 'rgba(0, 5, 0, 0.95)',
            '--hb-bg-header': 'rgba(0, 5, 0, 0.6)',
            '--hb-bg-sidebar': 'rgba(0, 5, 0, 0.7)',
            '--hb-bg-row': 'rgba(5, 15, 5, 0.7)',
            '--hb-text': '#00FF00',
            '--hb-text-label': '#00AA00',
            '--hb-text-muted': '#005500',
        },
        ice: {
            '--hb-accent': '#00FFFF',
            '--hb-accent-dim': 'rgba(0, 255, 255, 0.15)',
            '--hb-accent-glow': 'rgba(0, 255, 255, 0.4)',
            '--hb-bg': 'rgba(5, 10, 15, 0.95)',
            '--hb-bg-header': 'rgba(5, 10, 15, 0.6)',
            '--hb-bg-sidebar': 'rgba(0, 5, 10, 0.7)',
            '--hb-bg-row': 'rgba(10, 20, 30, 0.7)',
            '--hb-text': '#E0FFFF',
            '--hb-text-label': '#B0E0E0',
            '--hb-text-muted': '#508080',
        },
        cyberpunk: {
            '--hb-accent': '#FF00FF', // Неоновий рожевий
            '--hb-accent-dim': 'rgba(255, 0, 255, 0.15)',
            '--hb-accent-glow': 'rgba(255, 0, 255, 0.5)',
            '--hb-bg': 'rgba(10, 0, 10, 0.95)',
            '--hb-bg-header': 'rgba(10, 0, 10, 0.6)',
            '--hb-bg-sidebar': 'rgba(5, 0, 5, 0.7)',
            '--hb-bg-row': 'rgba(20, 0, 20, 0.7)',
            '--hb-text': '#FFFF00', // Жовтий текст
            '--hb-text-label': '#FFDD00',
            '--hb-text-muted': '#888800',
        },
        aurora: {
            '--hb-accent': '#00FFCC', // Бірюзовий
            '--hb-accent-dim': 'rgba(0, 255, 204, 0.15)',
            '--hb-accent-glow': 'rgba(0, 255, 204, 0.5)',
            '--hb-bg': 'rgba(5, 15, 20, 0.95)',
            '--hb-bg-header': 'rgba(5, 15, 20, 0.6)',
            '--hb-bg-sidebar': 'rgba(0, 10, 15, 0.7)',
            '--hb-bg-row': 'rgba(10, 25, 30, 0.7)',
            '--hb-text': '#E0FFFF',
            '--hb-text-label': '#A0E0D0',
            '--hb-text-muted': '#408070',
        }
    };

    let currentTheme = 'red';

    function apply(themeName) {
        if (!THEMES[themeName]) return;
        currentTheme = themeName;
        const root = document.documentElement;
        const theme = THEMES[themeName];
        
        // Скидаємо до базових
        const base = THEMES.red;
        for (const key in base) root.style.setProperty(key, base[key]);
        
        // Застосовуємо нові
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