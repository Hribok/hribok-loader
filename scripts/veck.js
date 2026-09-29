/**
 * Hribok — veck.io cheat
 * Version: 1.0.0
 *
 * Main cheat script for veck.io.
 * Creates the UnityWebModkit plugin and registers all hooks.
 */

(function() {
    'use strict';

    const LOG_STYLE_HEAD = 'color: #FF0033; font-weight: bold;';
    const LOG_STYLE_OK = 'color: #00FF88;';
    const LOG_STYLE_WARN = 'color: #FFB300;';
    const LOG_STYLE_ERR = 'color: #FF0033; font-weight: bold;';

    function log(msg) {
        console.log('%c[Hribok]%c ' + msg, LOG_STYLE_HEAD, LOG_STYLE_OK);
    }

    function warn(msg) {
        console.warn('%c[Hribok]%c ' + msg, LOG_STYLE_HEAD, LOG_STYLE_WARN);
    }

    function error(msg, err) {
        console.error('%c[Hribok]%c ' + msg, LOG_STYLE_HEAD, LOG_STYLE_ERR, err || '');
    }

    // ============================================================
    // UTILITIES
    // ============================================================

    async function waitForGlobal(varName, interval = 50, timeout = 15000) {
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

    // ============================================================
    // MAIN
    // ============================================================

    (async () => {
        try {
            log('Initializing on veck.io...');

            // 1. Wait for UnityWebModkit (loaded via @require in userscript)
            await waitForGlobal('UnityWebModkit');
            log('UnityWebModkit detected');

            // 2. Create plugin
            const ctx = UnityWebModkit.Runtime.createPlugin({
                name: 'Hribok',
                version: '1.0.0',
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

            // 3. Expose globally for debugging
            window.ctx = ctx;
            window.Hribok = {
                version: '1.0.0',
                ctx: ctx,
                game: 'veck.io',
                loadedAt: new Date().toISOString(),
            };

            log('Plugin created successfully');
            log('Game: veck.io');
            log('Ready.');

            // ============================================================
            // HOOKS — TODO
            // ============================================================
            // Next steps:
            //   - ctx.hookPostfix({ typeName: '...', methodName: '...', params: [], returnType: 'void' }, () => { ... })
            //   - ctx.hookPrefix({ typeName: '...', methodName: '...', params: ['i32'], returnType: 'void' }, (arg) => { ... })
            //   - ctx.call('ClassName', 'MethodName', [args])
            //   - ctx.createObject(typeInfo)
            //   - ctx.createMstr('string')
            //

            // ============================================================
            // UI — TODO
            // ============================================================
            // Next steps:
            //   - Build menu (React or vanilla)
            //   - Register hotkeys (P to toggle)
            //   - Connect to config manager
            //

            log('Waiting for you to add hooks...');

        } catch (err) {
            error('Init failed:', err);
        }
    })();

})();
