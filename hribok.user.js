// ==UserScript==
// @name        Hribok Loader
// @namespace   https://github.com/Hribok
// @version     1.0.7
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

    console.log('%c[Hribok]%c Loader started (v1.0.7)', LOG_HEAD, LOG_OK);

    // ============================================================
    // CRITICAL: Intercept WebAssembly.instantiateStreaming
    // to capture the raw WASM buffer before UnityWebModkit does.
    // ============================================================
    try {
        const origInstantiateStreaming = W.WebAssembly.instantiateStreaming;
        if (origInstantiateStreaming) {
            W.WebAssembly.instantiateStreaming = async function (source, imports) {
                try {
                    const response = await source;
                    const clonedResponse = response.clone();
                    const buffer = await clonedResponse.arrayBuffer();
                    W._wasmBuffer = buffer;
                    console.log('%c[Hribok]%c WASM buffer captured (streaming): ' + buffer.byteLength + ' bytes', LOG_HEAD, LOG_OK);
                    const originalResponse = new Response(buffer, {
                        headers: response.headers,
                        status: response.status,
                        statusText: response.statusText
                    });
                    return origInstantiateStreaming.call(W.WebAssembly, originalResponse, imports);
                } catch (e) {
                    console.error('%c[Hribok]%c WASM streaming capture failed:', LOG_HEAD, LOG_ERR, e);
                    return origInstantiateStreaming.call(W.WebAssembly, source, imports);
                }
            };
        }

        const origInstantiate = W.WebAssembly.instantiate;
        if (origInstantiate) {
            W.WebAssembly.instantiate = async function (bufferSource, imports) {
                try {
                    if (bufferSource instanceof ArrayBuffer || ArrayBuffer.isView(bufferSource)) {
                        W._wasmBuffer = bufferSource instanceof ArrayBuffer ? bufferSource : bufferSource.buffer;
                        console.log('%c[Hribok]%c WASM buffer captured (instantiate): ' + W._wasmBuffer.byteLength + ' bytes', LOG_HEAD, LOG_OK);
                    }
                } catch (e) {}
                return origInstantiate.call(W.WebAssembly, bufferSource, imports);
            };
        }
    } catch (e) {
        console.error('%c[Hribok]%c Failed to hook WebAssembly:', LOG_HEAD, LOG_ERR, e);
    }

    // ============================================================
    // GM_xmlhttpRequest (bypasses Preloader)
    // ============================================================
    function gmFetch(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: (res) => {
                    if (res.status >= 200 && res.status < 300) resolve(res.responseText);
                    else reject(new Error('HTTP ' + res.status));
                },
                onerror: () => reject(new Error('GM_xmlhttpRequest failed')),
                ontimeout: () => reject(new Error('Timeout')),
                timeout: 15000,
            });
        });
    }

    W.__hribokGmFetch = gmFetch;

    async function loadScript(url) {
        try {
            let code;
            if (W.__hribokGmFetch) {
                code = await W.__hribokGmFetch(url + '?t=' + Date.now());
            } else {
                const res = await W.fetch(url + '?t=' + Date.now());
                if (!res.ok) throw new Error('HTTP ' + res.status);
                code = await res.text();
            }
            const fn = new Function('window', 'document', 'globalThis', 'console', code);
            fn.call(W, W, W.document, W, console);
            console.log('%c[Hribok]%c Loaded: ' + url.split('/').pop(), LOG_HEAD, LOG_OK);
            return true;
        } catch (err) {
            console.error('%c[Hribok]%c Failed to load: ' + url, LOG_HEAD, LOG_ERR, err);
            return false;
        }
    }

    async function waitForGlobal(varName, interval = 50, timeout = 15000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
                if (typeof W[varName] !== 'undefined') resolve(W[varName]);
                else if (typeof window[varName] !== 'undefined') resolve(window[varName]);
                else if (Date.now() - start > timeout) reject(new Error(varName + ' not found'));
                else setTimeout(check, interval);
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
            const okCore = await loadScript('https://raw.githubusercontent.com/Hribok/hribok-loader/main/unitywebmodkit.js');
            if (!okCore) {
                console.error('%c[Hribok]%c UnityWebModkit failed to load. Aborting.', LOG_HEAD, LOG_ERR);
                return;
            }

            console.log('%c[Hribok]%c Step 2: Waiting for UnityWebModkit global...', LOG_HEAD, LOG_OK);
            await waitForGlobal('UnityWebModkit');
            console.log('%c[Hribok]%c UnityWebModkit ready', LOG_HEAD, LOG_OK);

            console.log('%c[Hribok]%c Step 3: Loading site-specific cheat...', LOG_HEAD, LOG_OK);
            await loadScript('https://raw.githubusercontent.com/Hribok/hribok-loader/main/dothething.js');

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