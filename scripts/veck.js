/**
 * Hribok — veck.io cheat
 * Version: 2.0.0
 *
 * Main file: loads UnityWebModkit, creates plugin, loads UI modules.
 */

(function () {
    'use strict';

    const HRIBOK_VERSION = '2.0.0';
    const LOG_HEAD = 'color: #FF0033; font-weight: bold;';
    const LOG_OK = 'color: #00FF88;';
    const LOG_WARN = 'color: #FFB300;';
    const LOG_ERR = 'color: #FF0033; font-weight: bold;';

    function log(m) { console.log('%c[Hribok]%c ' + m, LOG_HEAD, LOG_OK); }
    function warn(m) { console.warn('%c[Hribok]%c ' + m, LOG_HEAD, LOG_WARN); }
    function err(m, e) { console.error('%c[Hribok]%c ' + m, LOG_HEAD, LOG_ERR, e || ''); }

    const BASE = 'https://raw.githubusercontent.com/Hribok/hribok-loader/main';

    // ============================================================
    // UTILS
    // ============================================================
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
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const code = await res.text();
            const fn = new Function(code);
            fn.call(window);
            return true;
        } catch (e) {
            err('Failed to load: ' + url, e);
            return false;
        }
    }

    async function loadExternalScript(url) {
        return new Promise((resolve, reject) => {
            if (document.querySelector('script[src="' + url + '"]')) return resolve();
            const s = document.createElement('script');
            s.src = url;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error('Failed to load: ' + url));
            document.head.appendChild(s);
        });
    }

    // ============================================================
    // MAIN
    // ============================================================
    (async () => {
        try {
            log('Initializing on veck.io...');

            await waitForGlobal('UnityWebModkit');
            log('UnityWebModkit detected');

            const ctx = UnityWebModkit.Runtime.createPlugin({
                name: 'Hribok',
                version: HRIBOK_VERSION,
                referencedAssemblies: [
                    'ACTk.Runtime.dll',
                    'GameAssembly.dll',
                    'System.Runtime.InteropServices.dll',
                    'mscorlib.dll',
                    'PhotonRealtime.dll',
                    'PhotonUnityNetworking.dll',
                    'PhotonUnityNetworking.Utilities.dll',
                    'Assembly-CSharp.dll',
                    'UnityEngine.CoreModule.dll',
                    'UnityEngine.PhysicsModule.dll',
                    'StompyRobot.SRDebugger.dll',
                    'UnityEngine.IMGUIModule.dll',
                    'Photon3Unity3D.dll',
                    'Unity.TextMeshPro.dll',
                    'FishNet.Runtime.dll',
                    'UnityEngine.AnimationModule.dll',
                ],
            });

            window.ctx = ctx;
            window.Hribok = {
                version: HRIBOK_VERSION,
                ctx: ctx,
                modules: {},
                state: null,
            };

            log('Plugin created successfully');

            // Load Preact
            log('Loading Preact...');
            await loadExternalScript('https://unpkg.com/preact@10.19.3/dist/preact.min.js');
            await loadExternalScript('https://unpkg.com/preact@10.19.3/hooks/dist/hooks.umd.js');

            if (!window.preact || !window.preactHooks) {
                throw new Error('Preact failed to load');
            }
            log('Preact loaded');

            // Load UI modules (parallel)
            log('Loading UI modules...');
            await Promise.all([
                loadScript(BASE + '/scripts/veck_ui_themes.js'),
                loadScript(BASE + '/scripts/veck_ui_components.js'),
                loadScript(BASE + '/scripts/veck_ui_tabs.js'),
                loadScript(BASE + '/scripts/veck_ui_preview.js'),
            ]);
            log('UI modules loaded');

            // Init theme system
            if (window.HribokTheme) {
                window.HribokTheme.apply('red');
            }

            // Init UI components
            if (window.HribokComponents) {
                window.HribokComponents.init();
            }

            // Init tabs
            if (window.HribokTabs) {
                window.HribokTabs.init();
            }

            // Init preview window
            if (window.HribokPreview) {
                window.HribokPreview.init();
            }

            // Init main menu
            if (window.HribokUI) {
                window.HribokUI.init();
            }

            log('UI rendered. Press P to toggle menu.');

        } catch (e) {
            err('Init failed:', e);
        }
    })();

})();
