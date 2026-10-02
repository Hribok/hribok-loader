/**
 * Hribok — DIAGNOSTIC TEST v2
 * Мета: з'ясувати, які методи гри викликаються
 *
 * У консолі введи:
 *   d() — показати числа
 */

(function() {
    'use strict';

    const LOG_HEAD = 'color: #FF0033; font-weight: bold;';
    const LOG_OK = 'color: #00FF88;';
    const LOG_ERR = 'color: #FF0033; font-weight: bold;';

    function log(m) { console.log('%c[Hribok]%c ' + m, LOG_HEAD, LOG_OK); }
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
            log('Diagnostic test starting...');
            await waitForGlobal('UnityWebModkit');
            log('UnityWebModkit found');

            const ctx = UnityWebModkit.Runtime.createPlugin({
                name: 'HribokDiag',
                version: '2.0.0',
                referencedAssemblies: [
                    'GameAssembly.dll', 'mscorlib.dll', 'Assembly-CSharp.dll',
                    'UnityEngine.CoreModule.dll', 'UnityEngine.PhysicsModule.dll',
                ],
            });

            window.ctx = ctx;
            log('Plugin created');

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
                    log('✓ Hooked ' + m.type + '.' + m.method);
                } catch (e) {
                    err('✗ Failed to hook ' + m.type + '.' + m.method + ': ' + e.message);
                }
            });

            // Робимо лічильники глобальними
            window._hribokCounters = counters;

            // Функція для перевірки в консолі
            window.d = function() {
                console.log('========== [Hribok Counter] ==========');
                Object.keys(counters).forEach(k => {
                    console.log('  ' + k + ': ' + counters[k]);
                });
                console.log('======================================');
                return counters;
            };

            // Псевдонім
            window.hribokDiag = function() {
                return window.d();
            };

            log('All hooks registered.');
            log('У консолі введи: d() — показати числа.');

        } catch (e) {
            err('Init failed: ' + e.message);
        }
    })();

})();
