/**
 * Hribok Loader — dothething.js
 * Визначає сайт і завантажує відповідний чит-скрипт.
 */

const siteConfig = {
    'veck.io': {
        mainScript: 'https://raw.githubusercontent.com/Hribok/hribok-loader/main/scripts/veck.js',
    },
    'smashkarts.io': {
        mainScript: 'https://raw.githubusercontent.com/Hribok/hribok-loader/main/scripts/sk.js',
    },
    'kour.io': {
        mainScript: 'https://raw.githubusercontent.com/Hribok/hribok-loader/main/scripts/kour.js',
    },
    'narrow.one': {
        mainScript: 'https://raw.githubusercontent.com/Hribok/hribok-loader/main/scripts/narrowone.js',
    },
    'buildnow-gg.game-files.crazygames.com': {
        mainScript: 'https://raw.githubusercontent.com/Hribok/hribok-loader/main/scripts/bngg.js',
    },
};

const website = window.location.hostname;
const config = siteConfig[website];

if (!config) {
    console.warn('[Hribok] No cheat found for this site:', website);
} else {
    const mainUrl = config.mainScript + '?t=' + Date.now();

    async function loadScript(url) {
        try {
            const res = await fetch(url);
            const code = await res.text();
            (0, eval)(code);
            console.log('[Hribok] Loaded main script:', url);
        } catch (err) {
            console.error('[Hribok] Failed to load main script:', url, err);
        }
    }

    (async () => {
        await loadScript(mainUrl);
    })();
}
