// ==UserScript==
// @name        Hribok Loader
// @namespace   https://github.com/Hribok
// @version     1.0.4
// @description Hribok — elite multi-game cheat framework for Unity WebGL
// @author      Hribok
// @match       *://*.veck.io/*
// @match       *://*.smashkarts.io/*
// @match       *://*.kour.io/*
// @match       *://*.narrow.one/*
// @match       *://*buildnow-gg.game-files.crazygames.com/unity/unity2020/*
// @run-at      document-start
// @grant       none
// @require     https://raw.githubusercontent.com/Hribok/hribok-loader/main/unitywebmodkit.js
// ==/UserScript==

(async function() {
    'use strict';

    console.log('%c[Hribok]%c Loader started (v1.0.4)', 'color: #FF0033; font-weight: bold;', 'color: #00FF88;');

    const BASE = 'https://raw.githubusercontent.com/Hribok/hribok-loader/main';

    // Чекаємо, поки UnityWebModkit з'явиться (він через @require)
    async function waitForGlobal(varName, interval = 50, timeout = 15000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
                if (window[varName] !== undefined) resolve(window[varName]);
                else if (Date.now() - start > timeout) reject(new Error(varName + ' not found'));
                else setTimeout(check, interval);
            };
            check();
        });
    }

    async function loadScript(url) {
        try {
            const res = await fetch(url + '?t=' + Date.now());
            const code = await res.text();
            const fn = new Function(code);
            fn.call(window);
            console.log('%c[Hribok]%c Loaded: ' + url.split('/').pop(), 'color: #FF0033; font-weight: bold;', 'color: #00FF88;');
        } catch (err) {
            console.error('%c[Hribok]%c Failed to load: ' + url, 'color: #FF0033; font-weight: bold;', err);
        }
    }

    try {
        // Чекаємо UnityWebModkit
        await waitForGlobal('UnityWebModkit');
        console.log('%c[Hribok]%c UnityWebModkit ready', 'color: #FF0033; font-weight: bold;', 'color: #00FF88;');

        // Завантажуємо dothething.js
        await loadScript(BASE + '/dothething.js');

    } catch (err) {
        console.error('%c[Hribok]%c Init failed:', 'color: #FF0033; font-weight: bold;', err);
    }

    // UnityCache cleanup
    try {
        const del = indexedDB.deleteDatabase('UnityCache');
        del.onsuccess = () => console.log('%c[Hribok]%c UnityCache cleared', 'color: #FF0033; font-weight: bold;', 'color: #00FF88;');
        del.onerror = () => console.warn('%c[Hribok]%c UnityCache delete failed', 'color: #FF0033; font-weight: bold;', 'color: #FFB300;');
        del.onblocked = () => console.warn('%c[Hribok]%c UnityCache delete blocked', 'color: #FF0033; font-weight: bold;', 'color: #FFB300;');
    } catch (e) {}

})();
