// ==UserScript==
// @name        Hribok Loader
// @namespace   https://github.com/Hribok
// @version     1.0.0
// @description Hribok — elite multi-game cheat framework for Unity WebGL
// @author      Hribok
// @match       *://*.veck.io/*
// @match       *://*.smashkarts.io/*
// @match       *://*.kour.io/*
// @match       *://*.narrow.one/*
// @match       *://*buildnow-gg.game-files.crazygames.com/unity/unity2020/*
// @run-at      document-idle
// @grant       none
// @require     https://raw.githubusercontent.com/Hribok/hribok-loader/main/unitywebmodkit.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('%c[Hribok] %cLoader started', 'color: #FF0033; font-weight: bold;', 'color: #FFFFFF;');

    const BASE = 'https://raw.githubusercontent.com/Hribok/hribok-loader/main';

    async function loadScript(url) {
        try {
            const res = await fetch(url + '?t=' + Date.now());
            const code = await res.text();
            (0, eval)(code);
            console.log('%c[Hribok] %cLoaded: ' + url.split('/').pop(), 'color: #FF0033; font-weight: bold;', 'color: #00FF88;');
        } catch (err) {
            console.error('[Hribok] Failed to load:', url, err);
        }
    }

    async function waitForGlobal(varName, interval = 50, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
                if (window[varName] !== undefined) {
                    resolve(window[varName]);
                } else if (Date.now() - start > timeout) {
                    reject(new Error(varName + ' not found after ' + timeout + 'ms'));
                } else {
                    setTimeout(check, interval);
                }
            };
            check();
        });
    }

    (async () => {
        try {
            await waitForGlobal('UnityWebModkit');
            console.log('%c[Hribok] %cUnityWebModkit ready', 'color: #FF0033; font-weight: bold;', 'color: #00FF88;');

            await loadScript(BASE + '/dothething.js');

        } catch (err) {
            console.error('[Hribok] Init failed:', err);
        }
    })();

    try {
        const del = indexedDB.deleteDatabase('UnityCache');
        del.onsuccess = () => console.log('%c[Hribok] %cUnityCache cleared', 'color: #FF0033; font-weight: bold;', 'color: #00FF88;');
    } catch (e) {}

})();
