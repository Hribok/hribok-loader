// ==UserScript==
// @name        Hribok Loader
// @namespace   https://github.com/Hribok
// @version     1.0.6
// @description Hribok — elite multi-game cheat framework for Unity WebGL
// @author      Hribok
// @match       *://*.veck.io/*
// @match       *://*.smashkarts.io/*
// @match       *://*.kour.io/*
// @match       *://*.narrow.one/*
// @match       *://*buildnow-gg.game-files.crazygames.com/unity/unity2020/*
// @run-at      document-start
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @connect     raw.githubusercontent.com
// @connect     cdn.jsdelivr.net
// @connect     unpkg.com
// ==/UserScript==

(function() {
    'use strict';

    const LOG_HEAD = 'color: #FF0033; font-weight: bold;';
    const LOG_OK = 'color: #00FF88;';
    const LOG_WARN = 'color: #FFB300;';
    const LOG_ERR = 'color: #FF0033; font-weight: bold;';

    // Real window (bypass Tampermonkey sandbox)
    const W = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;

    console.log('%c[Hribok]%c Loader started (v1.0.6)', LOG_HEAD, LOG_OK);

    const BASE = 'https://raw.githubusercontent.com/Hribok/hribok-loader/main';

    // ============================================================
    // GM_xmlhttpRequest — bypasses UnityWebModkit Preloader entirely
    // ============================================================
    function gmFetch(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: (res) => {
                    if (res.status >= 200 && res.status < 300) {
                        resolve(res.responseText);
                    } else {
                        reject(new Error('HTTP ' + res.status));
                    }
                },
                onerror: (err) => reject(new Error('GM_xmlhttpRequest failed')),
                ontimeout: () => reject(new Error('Timeout')),
                timeout: 15000,
            });
        });
    }

    // Expose to window so veck.js can use it
    W.__hribokGmFetch = gmFetch;

    // ============================================================
    // SCRIPT LOADER — uses GM_xmlhttpRequest (bypasses Preloader)
    // ============================================================
    async function loadScript(url) {
        try {
            const code = await gmFetch(url + '?t=' + Date.now());
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