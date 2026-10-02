/**
 * Hribok — DIAGNOSTIC TEST
 * Мета: з'ясувати, які методи гри викликаються
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
                version: '1.0.0',
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
                { type: 'ColyShooter', method: 'Update' },
                { type: 'ColyTransform', method: 'UpdateLocalPlayer' },
                { type: 'ColyTransform', method: 'Update' },
                { type: 'AimManager', method: 'Update' },
                { type: 'AimManager', method: 'SetAiming' },
                { type: 'Crosshair', method: 'Update' },
                { type: 'Bullet', method: 'Update' },
            ];

            // Лічильники для кожного методу
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
                        window._hribokCounters = counters;
                    });
                    log('✓ Hooked ' + m.type + '.' + m.method);
                } catch (e) {
                    err('✗ Failed to hook ' + m.type + '.' + m.method + ': ' + e.message);
                }
            });

            log('All hooks registered. Зайди в матч і чекай 5 сек.');

            // Кожні 3 секунди виводимо статистику
            setInterval(() => {
                console.log('========== [Hribok Counter] ==========');
                Object.keys(counters).forEach(k => {
                    console.log('  ' + k + ': ' + counters[k]);
                });
                console.log('======================================');
            }, 3000);

        } catch (e) {
            err('Init failed: ' + e.message);
        }
    })();

})();
