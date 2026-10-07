// ==UserScript==
// @name        Hribok Loader
// @namespace   https://github.com/Hribok
// @version     1.0.5
// @description Hribok — elite multi-game cheat framework for Unity WebGL
// @author      Hribok
// @match       *://*.veck.io/*
// @match       *://*.smashkarts.io/*
// @match       *://*.kour.io/*
// @match       *://*.narrow.one/*
// @match       *://*buildnow-gg.game-files.crazygames.com/unity/unity2020/*
// @run-at      document-start
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    const LOG_HEAD = 'color: #FF0033; font-weight: bold;';
    const LOG_OK = 'color: #00FF88;';
    const LOG_WARN = 'color: #FFB300;';
    const LOG_ERR = 'color: #FF0033; font-weight: bold;';

    // Real window (bypass Tampermonkey sandbox)
    const W = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;

    // ============================================================
    // CRITICAL: Save original fetch BEFORE UnityWebModkit hooks it
    // ============================================================
    try {
        W.__hribokOriginalFetch = W.fetch.bind(W);
        W.__hribokOriginalXHR = W.XMLHttpRequest;
        console.log('%c[Hribok]%c Original fetch saved', LOG_HEAD, LOG_OK);
    } catch (e) {
        console.warn('%c[Hribok]%c Failed to save original fetch', LOG_HEAD, LOG_WARN, e);
    }

    console.log('%c[Hribok]%c Loader started (v1.0.5)', LOG_HEAD, LOG_OK);

    const BASE = 'https://raw.githubusercontent.com/Hribok/hribok-loader/main';

    // ============================================================
    // SCRIPT LOADER — uses saved original fetch (bypasses Preloader)
    // ============================================================
    async function loadScript(url) {
        try {
            const fetchFn = W.__hribokOriginalFetch || W.fetch;
            const res = await fetchFn(url + '?t=' + Date.now());
            if (!res.ok) {
                throw new Error('HTTP ' + res.status);
            }
            const code = await res.text();
            const fn = new Function('window', 'document', 'globalThis', 'console', code);
            fn.call(W, W, W.document, W, console);
            console.log('%c[Hribok]%c Loaded: ' + url.split('/').pop(), LOG_HEAD, LOG_OK);
            return true;
        } catch (err) {
            console.error('%c[Hribok]%c Failed to load: ' + url, LOG_HEAD, LOG_ERR, err);
            return false;
        }
    }

    // ============================================================
    // WAIT FOR GLOBAL
    // ============================================================
    async function waitForGlobal(varName, interval = 50, timeout = 15000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
                if (typeof W[varName] !== 'undefined') {
                    resolve(W[varName]);
                } else if (typeof window[varName] !== 'undefined') {
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

    // ============================================================
    // MAIN
    // ============================================================
    (async () => {
        try {
            console.log('%c[Hribok]%c Step 1: Loading UnityWebModkit core...', LOG_HEAD, LOG_OK);
            const okCore = await loadScript(BASE + '/unitywebmodkit.js');
            if (!okCore) {
                console.error('%c[Hribok]%c UnityWebModkit failed to load. Aborting.', LOG_HEAD, LOG_ERR);
                return;
            }

            console.log('%c[Hribok]%c Step 2: Waiting for UnityWebModkit global...', LOG_HEAD, LOG_OK);
            await waitForGlobal('UnityWebModkit');
            console.log('%c[Hribok]%c UnityWebModkit ready', LOG_HEAD, LOG_OK);

            console.log('%c[Hribok]%c Step 3: Loading site-specific cheat...', LOG_HEAD, LOG_OK);
            await loadScript(BASE + '/dothething.js');

            console.log('%c[Hribok]%c Bootstrap complete. Waiting for game...', LOG_HEAD, LOG_OK);

        } catch (err) {
            console.error('%c[Hribok]%c Init failed:', LOG_HEAD, LOG_ERR, err);
        }
    })();

    // ============================================================
    // UNITY CACHE CLEANUP
    // ============================================================
    try {
        const del = W.indexedDB.deleteDatabase('UnityCache');
        del.onsuccess = () => console.log('%c[Hribok]%c UnityCache cleared', LOG_HEAD, LOG_OK);
        del.onerror = () => console.warn('%c[Hribok]%c UnityCache delete failed', LOG_HEAD, LOG_WARN);
        del.onblocked = () => console.warn('%c[Hribok]%c UnityCache delete blocked', LOG_HEAD, LOG_WARN);
    } catch (e) {}

})();