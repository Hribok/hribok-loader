/**
 * Hribok — veck.io cheat
 * Version: 2.0.0
 *
 * Main: loads UnityWebModkit, creates plugin, loads all UI modules, renders menu.
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
    // STATE — every option that UI can change
    // ============================================================
    const state = {
        visible: false,
        activeTab: 'aimbot',
        theme: 'red',

        aimbot: {
            enabled: false, aimType: 'aimbot', aimTarget: 'center', switchInterval: 0,
            aimKey: 'LeftMouse', aimSpeed: 5, aimBone: 'Head', fov: false, fovSize: 90,
            fovColor: '#FF0033', fovRainbow: false, stickyTargeting: false,
            silentAim: false, psilent: false, hitchance: 50, minDamage: 1,
            autoWall: false, backtrack: false, visibleCheck: true,
            visibleMode: 'Only when visible',
        },
        player: {
            bhop: false, autoStrafe: false, speed: 0, fly: false, flySpeed: 1000,
            noGravity: false, slopeAngle: 65.8, stepHeight: 0.2, jumpHeight: 10,
            gravity: -24.5, noKnockback: false, invisibility: false, godMode: false,
            noFallDamage: false, fakeLag: false, antiAim: false, desync: false, thirdPerson: false,
        },
        gun: {
            hoverToKill: false, killKey: 'LeftMouse', killMode: 'Only Visible',
            weaponMode: 'Auto', autoDistance: 500, knifeDistance: 50,
            killDelayMode: 'Off', killDelayMin: 150, killDelayMax: 250,
            aimBone: 'Chest', boneRandomChance: 20, visibleCheck: true,
            throughSmoke: false, throughWall: false, missChance: 0, missSpread: 2,
            tapFire: false, burstFire: false, showIndicator: false,
            indicatorColor: '#FF0033', indicatorStyle: 'Dot',
            triggerBot: false, autoFire: false, wallbang: false, damage: 150,
            damageMultiplier: 1, oneShot: false, bulletHitRandom: false,
            fastReload: false, fastSwitch: false, infiniteAmmo: false, infiniteRange: false,
            noRecoil: false, noSpread: false, noPunch: false, fireRate: false,
            noAbilityCooldown: false, statTrak: false, nameTag: false, sticker: false,
            float: 0, pattern: 0, wear: 'Factory New', quality: 'Normal', autoBuy: false,
        },
        visuals: {
            noFlash: false, noSmoke: false, transparentShield: false, fullbright: false,
            noScope: false, fovChanger: 90,
            chams: false, chamsColor: '#FF0033', chamsWireframe: false,
            handsChams: false, handsColor: '#FF0033', playerVisibleColor: '#00FF00',
            glow: false, glowColor: '#FF0033',
            globalEsp: false, boxEsp: false, boxThickness: 6, boxColor: '#FF0033', boxRainbow: false,
            cornerBoxEsp: false, cornerBoxThickness: 7.1, cornerBoxColor: '#FF0033',
            skeletonEsp: false, skeletonThickness: 9.3, skeletonColor: '#0033FF',
            filledBoxEsp: false, filledBoxColor: '#880000',
            tracerEsp: false, tracerThickness: 2, tracerColor: '#FF0033',
            tracerFrom: 'Bottom', tracerTo: 'Head',
            bulletTracer: false, grenadeTracer: false, grenadePrediction: false,
            nameEsp: false, nameSize: 16, nameColor: '#FFFFFF',
            healthBar: false, healthText: false,
            distanceEsp: false, distanceColor: '#FFFFFF',
            gunEsp: false, ammoEsp: false, armorBar: false, flags: false, radar: false,
        },
        skinchanger: {
            enabled: false, mode: 'CS2',
            ak47: 'Default', m4a4: 'Default', m4a1s: 'Default', awp: 'Default',
            deagle: 'Default', usps: 'Default', glock: 'Default',
            solidColor: '#FF0033', rainbow: false, metallic: 0, glow: false,
            knifeEnabled: false, knifeType: 'Default', knifeSkin: 'Default',
            gloveEnabled: false, gloveType: 'Default',
            agentEnabled: false, agentType: 'Default',
            cs2Style: true, statTrak: false, nameTag: false, sticker: false,
            float: 0, pattern: 0,
        },
        butterfly: {
            enabled: false, speed: 3, color: '#FF0033', rainbow: false,
            size: 1, trail: false, trailColor: '#FF0033', model: 'Default', sound: false,
        },
        spin: {
            enabled: false, speed: 30, axis: 'Y', mode: 'Continuous', onKill: false, onHit: false,
        },
        skybox: {
            enabled: false, preset: 'Default', color: '#000000', rainbow: false,
            rotation: 0, brightness: 100,
        },
        customModel: {
            enabled: false, catalog: 'Default', scale: 1, rotation: 0,
            offsetX: 0, offsetY: 0, rainbow: false, wireframe: false,
        },
        customHands: { enabled: false, catalog: 'Default', color: '#FF0033', rainbow: false },
        customWeapon: {
            enabled: false, catalog: 'Default', skin: 'Default', rainbow: false,
        },
        grenade: {
            direction: false, dirStyle: 'Arrow', dirColor: '#FF0033', dirThickness: 3, dirFade: false,
            magnet: false, magnetMode: 'Auto', magnetFov: 90, magnetStrength: 50,
            magnetPriority: 'Nearest', magnetVisible: true, magnetPrediction: true,
        },
        watermark: {
            enabled: true, text: 'Hribok | User', position: 'Top-Right',
            color: '#FF0033', size: 14, rainbow: false,
            tagEnabled: true, tagMode: 'Everyone', tagColor: '#FF0033',
        },
        unique: {
            ai: false, cloud: false, stats: false, replay: false,
            highlights: false, api: false, marketplace: false, butterfly: false,
        },
        effects: {
            killEffect: false, killEffectType: 'Explosion',
            hitEffect: false, hitEffectType: 'Spark',
            killSoundPack: 'Default', hitSoundPack: 'Default',
            crosshair: false, crosshairStyle: 'Cross', crosshairColor: '#FF0033', crosshairSize: 4,
            worldParticles: false, trailBehind: false,
        },
        preview: {
            enabled: true, position: 'Right', size: 300,
            showPlayer: true, showWeapon: true,
            autoRotate: true, rotateSpeed: 1,
        },
        configs: {
            customs: ['My Config 1', 'My Config 2'],
        },
        settings: {
            menuKey: 'P', godmodeKey: 'None', wallbangKey: 'None', chamsKey: 'F',
            espKey: 'None', loadoutKey: 'None', invisibilityKey: 'None', flyKey: 'None',
            uiScale: 100, opacity: 95, showWatermark: true, streamProof: false,
        },
    };

    // ============================================================
    // STYLES
    // ============================================================
    function injectStyles() {
        if (document.getElementById('hribok-styles')) return;
        const style = document.createElement('style');
        style.id = 'hribok-styles';
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

            :root {
                --hb-accent: #FF0033;
                --hb-accent-dim: rgba(255, 0, 51, 0.15);
                --hb-accent-glow: rgba(255, 0, 51, 0.4);
                --hb-accent-hover: rgba(255, 0, 51, 0.08);
                --hb-accent-border: rgba(255, 0, 51, 0.1);
                --hb-accent-border-hover: rgba(255, 0, 51, 0.2);
                --hb-bg: rgba(10, 10, 10, 0.95);
                --hb-bg-header: rgba(10, 10, 10, 0.6);
                --hb-bg-sidebar: rgba(5, 5, 5, 0.7);
                --hb-bg-row: rgba(20, 20, 20, 0.7);
                --hb-bg-row-hover: rgba(24, 24, 24, 0.8);
                --hb-bg-input: rgba(30, 30, 30, 0.9);
                --hb-text: #E0E0E0;
                --hb-text-dim: #888;
                --hb-text-label: #C0C0C0;
                --hb-text-muted: #666;
            }

            #hribok-root * { box-sizing: border-box; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }
            #hribok-root { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 2147483647; }

            .hb-menu { position: fixed; width: 780px; height: 560px; background: var(--hb-bg); border: 1px solid var(--hb-accent-border); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px var(--hb-accent-hover); display: flex; overflow: hidden; pointer-events: auto; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); animation: hb-fade-in 0.2s ease-out; }
            @keyframes hb-fade-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
            .hb-header { position: absolute; top: 0; left: 0; right: 0; height: 52px; display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid var(--hb-accent-border); background: var(--hb-bg-header); cursor: move; user-select: none; z-index: 10; }
            .hb-logo-box { width: 28px; height: 28px; background: var(--hb-accent); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #000; font-weight: 700; font-size: 14px; margin-right: 10px; box-shadow: 0 0 16px var(--hb-accent-glow); }
            .hb-logo-text { color: var(--hb-text); font-weight: 600; font-size: 15px; letter-spacing: 0.3px; }
            .hb-version { margin-left: auto; color: var(--hb-text-muted); font-size: 11px; font-weight: 500; letter-spacing: 0.5px; }
            .hb-close { margin-left: 16px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; color: var(--hb-text-muted); cursor: pointer; border-radius: 4px; transition: all 0.15s; font-size: 16px; line-height: 1; }
            .hb-close:hover { background: var(--hb-accent-dim); color: var(--hb-accent); }
            .hb-sidebar { width: 180px; background: var(--hb-bg-sidebar); border-right: 1px solid var(--hb-accent-border); padding-top: 68px; display: flex; flex-direction: column; padding-bottom: 12px; overflow-y: auto; }
            .hb-sidebar::-webkit-scrollbar { width: 4px; }
            .hb-sidebar::-webkit-scrollbar-thumb { background: var(--hb-accent-dim); border-radius: 2px; }
            .hb-tab { padding: 9px 20px; color: var(--hb-text-dim); font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; border-left: 2px solid transparent; user-select: none; letter-spacing: 0.3px; flex-shrink: 0; }
            .hb-tab:hover { color: var(--hb-text); background: var(--hb-accent-hover); }
            .hb-tab.active { color: var(--hb-accent); background: var(--hb-accent-hover); border-left-color: var(--hb-accent); box-shadow: inset 4px 0 16px var(--hb-accent-dim); }
            .hb-content { flex: 1; padding: 68px 24px 24px; overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain; }
            .hb-content::-webkit-scrollbar { width: 6px; }
            .hb-content::-webkit-scrollbar-track { background: transparent; }
            .hb-content::-webkit-scrollbar-thumb { background: var(--hb-accent-dim); border-radius: 3px; }
            .hb-content::-webkit-scrollbar-thumb:hover { background: var(--hb-accent-glow); }
            .hb-section-title { color: var(--hb-accent); font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; text-align: center; margin: 18px 0 12px; opacity: 0.85; }
            .hb-section-title:first-child { margin-top: 0; }
            .hb-row { background: var(--hb-bg-row); border: 1px solid var(--hb-accent-border); border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s; }
            .hb-row:hover { border-color: var(--hb-accent-border-hover); background: var(--hb-bg-row-hover); }
            .hb-row-label { color: var(--hb-text-label); font-size: 13px; font-weight: 500; letter-spacing: 0.2px; }
            .hb-toggle { width: 40px; height: 22px; background: #2A2A2A; border-radius: 11px; position: relative; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
            .hb-toggle.on { background: var(--hb-accent); box-shadow: 0 0 12px var(--hb-accent-glow); }
            .hb-toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: var(--hb-text); border-radius: 50%; transition: all 0.2s; }
            .hb-toggle.on::after { left: 21px; background: #FFFFFF; }
            .hb-slider-wrap { display: flex; align-items: center; gap: 10px; flex-shrink: 0; width: 200px; }
            .hb-slider { -webkit-appearance: none; appearance: none; flex: 1; height: 4px; background: #2A2A2A; border-radius: 2px; outline: none; cursor: pointer; }
            .hb-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; background: var(--hb-accent); border-radius: 50%; cursor: pointer; box-shadow: 0 0 8px var(--hb-accent-glow); transition: transform 0.15s; }
            .hb-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
            .hb-slider-value { min-width: 40px; text-align: center; color: var(--hb-text); font-size: 12px; font-weight: 600; background: var(--hb-accent-dim); border: 1px solid var(--hb-accent-border-hover); border-radius: 4px; padding: 2px 8px; }
            .hb-select { background: var(--hb-bg-input); border: 1px solid var(--hb-accent-border); color: var(--hb-text); font-size: 12px; font-weight: 500; padding: 6px 12px; border-radius: 6px; outline: none; cursor: pointer; min-width: 130px; transition: all 0.15s; font-family: inherit; }
            .hb-select:hover { border-color: var(--hb-accent-border-hover); }
            .hb-select:focus { border-color: var(--hb-accent); }
            .hb-select option { background: #0A0A0A; color: var(--hb-text); }
            .hb-color { width: 30px; height: 22px; border: 1px solid var(--hb-accent-border-hover); border-radius: 5px; cursor: pointer; padding: 0; background: none; flex-shrink: 0; transition: all 0.15s; }
            .hb-color:hover { border-color: var(--hb-accent); transform: scale(1.05); }
            .hb-color::-webkit-color-swatch-wrapper { padding: 2px; }
            .hb-color::-webkit-color-swatch { border: none; border-radius: 3px; }
            .hb-btn { background: var(--hb-accent-dim); border: 1px solid var(--hb-accent-border-hover); color: var(--hb-text); font-size: 12px; font-weight: 500; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
            .hb-btn:hover { background: var(--hb-accent-hover); border-color: var(--hb-accent); color: var(--hb-accent); }
            .hb-btn-danger { background: rgba(255, 0, 51, 0.15); }
            .hb-btn-danger:hover { background: rgba(255, 0, 51, 0.25); }
            .hb-placeholder { display: flex; align-items: center; justify-content: center; height: 300px; color: var(--hb-text-muted); font-size: 14px; font-weight: 500; letter-spacing: 0.5px; }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // MENU COMPONENT
    // ============================================================
    function createMenu() {
        const preact = window.preact;
        const hooks = window.preactHooks;
        const h = preact.h;
        const useState = hooks.useState;
        const useEffect = hooks.useEffect;
        const useRef = hooks.useRef;
        const Fragment = preact.Fragment;

        function Menu() {
            const [visible, setVisible] = useState(state.visible);
            const [activeTab, setActiveTab] = useState(state.activeTab);
            const [pos, setPos] = useState({ x: null, y: null });
            const dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

            // Force re-render
            const [, forceUpdate] = useState(0);
            const setState = () => forceUpdate(x => x + 1);

            useEffect(() => {
                if (pos.x === null) {
                    setPos({
                        x: Math.floor((window.innerWidth - 780) / 2),
                        y: Math.floor((window.innerHeight - 560) / 2),
                    });
                }
            }, []);

            useEffect(() => {
                const onKey = (e) => {
                    const key = e.key.toUpperCase();
                    if (key === state.settings.menuKey.toUpperCase()) {
                        e.preventDefault();
                        state.visible = !state.visible;
                        setVisible(state.visible);
                    }
                };
                window.addEventListener('keydown', onKey);
                return () => window.removeEventListener('keydown', onKey);
            }, []);

            const onMouseDown = (e) => {
                dragRef.current.dragging = true;
                dragRef.current.offsetX = e.clientX - pos.x;
                dragRef.current.offsetY = e.clientY - pos.y;
                e.preventDefault();
            };

            // Touchpad / wheel scroll for menu dragging alternative
            useEffect(() => {
                const onMouseMove = (e) => {
                    if (dragRef.current.dragging) {
                        const newX = Math.max(0, Math.min(window.innerWidth - 780, e.clientX - dragRef.current.offsetX));
                        const newY = Math.max(0, Math.min(window.innerHeight - 560, e.clientY - dragRef.current.offsetY));
                        setPos({ x: newX, y: newY });
                    }
                };
                const onMouseUp = () => { dragRef.current.dragging = false; };
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
                return () => {
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                };
            }, [pos]);

            if (!visible) return null;

            const T = window.HribokTabs || {};

            const tabs = [
                { id: 'aimbot', label: 'Aimbot', comp: T.AimbotTab },
                { id: 'player', label: 'Player', comp: T.PlayerTab },
                { id: 'gun', label: 'Gun', comp: T.GunTab },
                { id: 'visuals', label: 'Visuals', comp: T.VisualsTab },
                { id: 'skinchanger', label: 'Skinchanger', comp: T.SkinchangerTab },
                { id: 'butterfly', label: 'Butterfly', comp: T.ButterflyTab },
                { id: 'spin', label: 'Spin', comp: T.SpinTab },
                { id: 'skybox', label: 'Skybox', comp: T.SkyboxTab },
                { id: 'customModel', label: 'Custom Model', comp: T.CustomModelTab },
                { id: 'customHands', label: 'Custom Hands', comp: T.CustomHandsTab },
                { id: 'customWeapon', label: 'Custom Weapon', comp: T.CustomWeaponTab },
                { id: 'grenade', label: 'Grenade', comp: T.GrenadeTab },
                { id: 'watermark', label: 'Watermark', comp: T.WatermarkTab },
                { id: 'unique', label: 'Hribok Unique', comp: T.UniqueTab },
                { id: 'effects', label: 'Effects', comp: T.EffectsTab },
                { id: 'preview', label: 'Preview', comp: T.PreviewTab },
                { id: 'misc', label: 'Misc', comp: T.MiscTab },
                { id: 'players', label: 'Players', comp: T.PlayersTab },
                { id: 'configs', label: 'Configs', comp: T.ConfigsTab },
                { id: 'settings', label: 'Settings', comp: T.SettingsTab },
                { id: 'credits', label: 'Credits', comp: T.CreditsTab },
            ];

            const ActiveComp = tabs.find(t => t.id === activeTab)?.comp;

            const setTab = (id) => {
                state.activeTab = id;
                setActiveTab(id);
            };

            const PreviewWindow = window.HribokPreview?.PreviewWindow;

            return h(Fragment, null, [
                h('div', {
                    key: 'menu',
                    class: 'hb-menu',
                    style: 'left:' + pos.x + 'px;top:' + pos.y + 'px;'
                }, [
                    h('div', { key: 'h', class: 'hb-header', onMouseDown },
                        h('div', { class: 'hb-logo-box' }, 'H'),
                        h('div', { class: 'hb-logo-text' }, 'Hribok'),
                        h('div', { class: 'hb-version' }, 'v' + HRIBOK_VERSION),
                        h('div', { class: 'hb-close', onClick: () => { state.visible = false; setVisible(false); } }, '×')
                    ),
                    h('div', { key: 's', class: 'hb-sidebar' },
                        tabs.map(tab => h('div', {
                            key: tab.id,
                            class: 'hb-tab' + (activeTab === tab.id ? ' active' : ''),
                            onClick: () => setTab(tab.id)
                        }, tab.label))
                    ),
                    h('div', { key: 'c', class: 'hb-content' },
                        ActiveComp ? h(ActiveComp, { state: state, setState: setState }) : h('div', { class: 'hb-placeholder' }, 'Tab not found')
                    ),
                ]),
                // Preview window (separate)
                (state.preview.enabled && PreviewWindow) ?
                    h(PreviewWindow, { key: 'preview', state: state, setState: setState }) : null,
            ]);
        }

        return Menu;
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
                state: state,
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
                loadScript(BASE + '/scripts/veck_ui_tabs_core.js'),
                loadScript(BASE + '/scripts/veck_ui_tabs_extra.js'),
                loadScript(BASE + '/scripts/veck_ui_tabs_unique.js'),
                loadScript(BASE + '/scripts/veck_ui_tabs_system.js'),
                loadScript(BASE + '/scripts/veck_ui_preview.js'),
            ]);
            log('UI modules loaded');

            // Apply theme
            if (window.HribokTheme) {
                const savedTheme = localStorage.getItem('hribok-theme') || 'red';
                window.HribokTheme.apply(savedTheme);
            }

            // Init
            if (window.HribokComponents && window.HribokComponents.init) window.HribokComponents.init();
            if (window.HribokTabs && window.HribokTabs.init) window.HribokTabs.init();
            if (window.HribokPreview && window.HribokPreview.init) window.HribokPreview.init();

            // Inject styles
            injectStyles();

            // Create root
            let root = document.getElementById('hribok-root');
            if (!root) {
                root = document.createElement('div');
                root.id = 'hribok-root';
                document.body.appendChild(root);
            }

            // Render
            const Menu = createMenu();
            window.preact.render(window.preact.h(Menu), root);

            log('UI rendered. Press ' + state.settings.menuKey + ' to toggle menu.');

        } catch (e) {
            err('Init failed:', e);
        }
    })();

})();
