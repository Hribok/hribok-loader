/**
 * Hribok — DIAGNOSTIC TEST v3
 * Мета: з'ясувати, чому il2CppContext не створюється
 *
 * У консолі введи:
 *   d() — показати числа хуків
 *   ctx._runtime.il2CppContext — подивитись контекст
 */

(function() {
    'use strict';

    const LOG_HEAD = 'color: #FF0033; font-weight: bold;';
    const LOG_OK = 'color: #00FF88;';
    const LOG_WARN = 'color: #FFB300;';
    const LOG_ERR = 'color: #FF0033; font-weight: bold;';

    function log(m) { console.log('%c[Hribok]%c ' + m, LOG_HEAD, LOG_OK); }
    function warn(m) { console.warn('%c[Hribok]%c ' + m, LOG_HEAD, LOG_WARN); }
    function err(m) { console.error('%c[Hribok]%c ' + m, LOG_HEAD, LOG_ERR); }

    function waitForGlobal(name, interval = 50, timeout = 15000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
                if (window[name] !== undefined) resolve();
                else if (Date.now() - start > timeout) reject(new Error(name + ' not found'));
                else setTimeout(check, interval);
            };
            check();
        });
    }

    (async () => {
        try {
            log('Diagnostic test v3 starting...');

            // Чекаємо UnityWebModkit
            await waitForGlobal('UnityWebModkit');
            log('UnityWebModkit found, version: ' + (UnityWebModkit.version || 'unknown'));

            // Створюємо плагін З ПОВНИМ СПИСКОМ DLL
            const ctx = UnityWebModkit.Runtime.createPlugin({
                name: 'HribokDiag',
                version: '3.0.0',
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
            log('Plugin created successfully');

            // ЧЕКАЄМО, поки il2CppContext створиться
            log('Waiting for il2CppContext (may take 10-30 sec)...');
            let waited = 0;
            while (!ctx._runtime.il2CppContext && waited < 60000) {
                await new Promise(r => setTimeout(r, 1000));
                waited += 1000;
                if (waited % 5000 === 0) {
                    log('Still waiting... ' + (waited / 1000) + 's | globalMetadata: ' + (!!ctx._runtime.globalMetadata));
                }
            }

            if (ctx._runtime.il2CppContext) {
                const scriptData = ctx._runtime.il2CppContext.scriptData || {};
                log('✓ il2CppContext created! Class count: ' + Object.keys(scriptData).length);

                // Перевіряємо ключові класи
                const testClasses = ['PlayerInput', 'ColyShooter', 'ColyTransform', 'AimManager', 'Bullet', 'Crosshair'];
                testClasses.forEach(c => {
                    const exists = !!scriptData[c];
                    log('  ' + (exists ? '✓' : '✗') + ' ' + c + (exists ? ' (' + Object.keys(scriptData[c]).length + ' methods)' : ' NOT FOUND'));
                });
            } else {
                err('✗ il2CppContext NOT created after 60s!');
                warn('globalMetadata: ' + (!!ctx._runtime.globalMetadata));
                warn('allReferencedAssemblies: ' + JSON.stringify(ctx._runtime.allReferencedAssemblies));
            }

            // Список методів для тесту
            const methodsToTest = [
                { type: 'PlayerInput', method: 'Update' },
                { type: 'PlayerInput', method: 'HandleDesktopInput' },
                { type: 'PlayerInput', method: 'HandleGamepadInput' },
                { type: 'PlayerInput', method: 'GetActionDown' },
                { type: 'PlayerInput', method: 'GetKey' },
                { type: 'PlayerInput', method: 'GetKeyDown' },
                { type: 'ColyShooter', method: 'Update' },
                { type: 'ColyShooter', method: 'TryShoot' },
                { type: 'ColyShooter', method: 'IsAbleToShoot' },
                { type: 'ColyShooter', method: 'ReloadAllGunsImmediate' },
                { type: 'ColyTransform', method: 'UpdateLocalPlayer' },
                { type: 'ColyTransform', method: 'Update' },
                { type: 'ColyTransform', method: 'SendPositionUpdate' },
                { type: 'ColyTransform', method: 'SetAirLocal' },
                { type: 'AimManager', method: 'Update' },
                { type: 'AimManager', method: 'SetAiming' },
                { type: 'AimManager', method: 'UpdateTargetFOVs' },
                { type: 'Crosshair', method: 'Update' },
                { type: 'Bullet', method: 'Update' },
                { type: 'Bullet', method: 'OnSpawn' },
            ];

            // Лічильники
            const counters = {};
            methodsToTest.forEach(m => { counters[m.type + '.' + m.method] = 0; });

            // Реєструємо хуки
            log('Registering hooks...');
            methodsToTest.forEach(m => {
                try {
                    ctx.hookPostfix({
                        typeName: m.type,
                        methodName: m.method,
                        params: [],
                        returnType: 'void'
                    }, function (self) {
                        const key = m.type + '.' + m.method;
                        counters[key]++;
                    });
                    log('✓ Registered ' + m.type + '.' + m.method);
                } catch (e) {
                    err('✗ Failed: ' + m.type + '.' + m.method + ' — ' + e.message);
                }
            });

            window._hribokCounters = counters;

            // Функція для перевірки
            window.d = function() {
                console.log('========== [Hribok Counter] ==========');
                Object.keys(counters).forEach(k => {
                    console.log('  ' + k + ': ' + counters[k]);
                });
                console.log('======================================');
                return counters;
            };

            window.diag = function() {
                console.log('========== [Hribok Diagnostic] ==========');
                console.log('il2CppContext:', !!ctx._runtime.il2CppContext);
                console.log('globalMetadata:', !!ctx._runtime.globalMetadata);
                console.log('scriptData length:', Object.keys(ctx._runtime.il2CppContext?.scriptData || {}).length);
                console.log('allReferencedAssemblies:', ctx._runtime.allReferencedAssemblies);
                console.log('=== Hook status ===');
                ctx._hooks.forEach((h, i) => {
                    console.log('  [' + i + '] ' + h.typeName + '.' + h.methodName +
                                ' | applied: ' + h.applied +
                                ' | tableIndex: ' + h.tableIndex +
                                ' | index: ' + h.index);
                });
                console.log('=========================================');
            };

            log('All hooks registered.');
            log('Commands:');
            log('  d()      — показати числа хуків');
            log('  diag()   — показати діагностику');

        } catch (e) {
            err('Init failed: ' + e.message);
            console.error(e);
        }
    })();

})();
