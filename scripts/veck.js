/**
 * Hribok — veck.io cheat
 * Version: 1.0.5
 *
 * UI: Preact via script tags (Tampermonkey-safe)
 */

(function () {
    'use strict';

    const HRIBOK_VERSION = '1.0.5';
    const LOG_HEAD = 'color: #FF0033; font-weight: bold;';
    const LOG_OK = 'color: #00FF88;';
    const LOG_WARN = 'color: #FFB300;';
    const LOG_ERR = 'color: #FF0033; font-weight: bold;';

    function log(m) { console.log('%c[Hribok]%c ' + m, LOG_HEAD, LOG_OK); }
    function warn(m) { console.warn('%c[Hribok]%c ' + m, LOG_HEAD, LOG_WARN); }
    function err(m, e) { console.error('%c[Hribok]%c ' + m, LOG_HEAD, LOG_ERR, e || ''); }

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

    function loadExternalScript(url) {
        return new Promise((resolve, reject) => {
            if (document.querySelector('script[src="' + url + '"]')) {
                resolve();
                return;
            }
            const s = document.createElement('script');
            s.src = url;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error('Failed to load: ' + url));
            document.head.appendChild(s);
        });
    }

    // ============================================================
    // UI STATE
    // ============================================================
    const state = {
        visible: false,
        activeTab: 'aimbot',
        position: { x: null, y: null },
        aimbot: {
            enabled: false, aimType: 'aimbot', aimTarget: 'center', switchInterval: 0,
            aimKey: 'LeftMouse', aimSpeed: 5, aimBone: 'Head', fov: false, fovSize: 90,
            fovColor: '#FF0033', fovRainbow: false, stickyTargeting: false,
        },
        player: {
            noGravity: false, slopeAngle: 65.8, stepHeight: 0.2, jumpHeight: 10,
            gravity: -24.5, invisibility: false, fly: false, flySpeed: 1000,
            noKnockback: false, speed: 0,
            bhop: false, autoStrafe: false,
        },
        gun: {
            hoverToKill: false, bulletHitRandom: false, wallbang: false,
            noAbilityCooldown: false, damage: 150, oneShot: false, fastSwitch: false,
            infiniteRange: false, infiniteAmmo: false, fireRate: false,
            autoFire: false, noRecoil: false,
            triggerBot: false, fastReload: false,
        },
        visuals: {
            noFlash: false, noSmoke: false, transparentShield: false,
            handsChams: false, handsColor: '#FF0033', chams: false,
            chamsWireframe: false, playerVisibleColor: '#00FF00',
            globalEsp: false, boxEsp: false, boxThickness: 6, boxColor: '#FF0033',
            boxRainbow: false, cornerBoxEsp: false, cornerBoxThickness: 7.1,
            cornerBoxColor: '#FF0033', skeletonEsp: false, skeletonThickness: 9.3,
            skeletonColor: '#0033FF', filledBoxEsp: false, filledBoxColor: '#880000',
            tracerEsp: false, tracerThickness: 2, tracerColor: '#FF0033',
            nameEsp: false, nameSize: 16, nameColor: '#FFFFFF',
            healthText: false, healthBar: false, healthEsp: false, healthSize: 16,
            healthColor: '#FFFFFF', distanceEsp: false, distanceSize: 16,
            distanceColor: '#FFFFFF', gunEsp: false, gunSize: 16, gunColor: '#FFFFFF',
        },
        misc: {
            neckRotation: 0, instantRespawn: false, chatSpam: false, roastAll: false,
        },
        settings: {
            menuKey: 'P', godmodeKey: 'None', wallbangKey: 'None', chamsKey: 'F',
            espKey: 'None', loadoutKey: 'None', invisibilityKey: 'None', flyKey: 'None',
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
            #hribok-root * { box-sizing: border-box; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }
            #hribok-root { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 2147483647; }
            .hb-menu { position: fixed; width: 780px; height: 560px; background: rgba(10,10,10,0.95); border: 1px solid rgba(255,0,51,0.15); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,0,51,0.08); display: flex; overflow: hidden; pointer-events: auto; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); animation: hb-fade-in 0.2s ease-out; }
            @keyframes hb-fade-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
            .hb-header { position: absolute; top: 0; left: 0; right: 0; height: 52px; display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid rgba(255,0,51,0.1); background: rgba(10,10,10,0.6); cursor: move; user-select: none; z-index: 10; }
            .hb-logo-box { width: 28px; height: 28px; background: #FF0033; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #000; font-weight: 700; font-size: 14px; margin-right: 10px; box-shadow: 0 0 16px rgba(255,0,51,0.4); }
            .hb-logo-text { color: #E0E0E0; font-weight: 600; font-size: 15px; letter-spacing: 0.3px; }
            .hb-version { margin-left: auto; color: #666; font-size: 11px; font-weight: 500; letter-spacing: 0.5px; }
            .hb-close { margin-left: 16px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; color: #666; cursor: pointer; border-radius: 4px; transition: all 0.15s; font-size: 16px; line-height: 1; }
            .hb-close:hover { background: rgba(255,0,51,0.15); color: #FF0033; }
            .hb-sidebar { width: 180px; background: rgba(5,5,5,0.7); border-right: 1px solid rgba(255,0,51,0.08); padding-top: 68px; display: flex; flex-direction: column; padding-bottom: 12px; }
            .hb-tab { padding: 11px 20px; color: #888; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; border-left: 2px solid transparent; user-select: none; letter-spacing: 0.3px; }
            .hb-tab:hover { color: #E0E0E0; background: rgba(255,0,51,0.04); }
            .hb-tab.active { color: #FF0033; background: rgba(255,0,51,0.08); border-left-color: #FF0033; box-shadow: inset 4px 0 16px rgba(255,0,51,0.1); }
            .hb-content { flex: 1; padding: 68px 24px 24px; overflow-y: auto; overflow-x: hidden; }
            .hb-content::-webkit-scrollbar { width: 6px; }
            .hb-content::-webkit-scrollbar-track { background: transparent; }
            .hb-content::-webkit-scrollbar-thumb { background: rgba(255,0,51,0.3); border-radius: 3px; }
            .hb-content::-webkit-scrollbar-thumb:hover { background: rgba(255,0,51,0.5); }
            .hb-section-title { color: #FF0033; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; text-align: center; margin: 18px 0 12px; opacity: 0.85; }
            .hb-section-title:first-child { margin-top: 0; }
            .hb-row { background: rgba(20,20,20,0.7); border: 1px solid rgba(255,0,51,0.08); border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s; }
            .hb-row:hover { border-color: rgba(255,0,51,0.2); background: rgba(24,24,24,0.8); }
            .hb-row-label { color: #C0C0C0; font-size: 13px; font-weight: 500; letter-spacing: 0.2px; }
            .hb-toggle { width: 40px; height: 22px; background: #2A2A2A; border-radius: 11px; position: relative; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
            .hb-toggle.on { background: #FF0033; box-shadow: 0 0 12px rgba(255,0,51,0.5); }
            .hb-toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: #E0E0E0; border-radius: 50%; transition: all 0.2s; }
            .hb-toggle.on::after { left: 21px; background: #FFFFFF; }
            .hb-slider-wrap { display: flex; align-items: center; gap: 10px; flex-shrink: 0; width: 200px; }
            .hb-slider { -webkit-appearance: none; appearance: none; flex: 1; height: 4px; background: #2A2A2A; border-radius: 2px; outline: none; cursor: pointer; }
            .hb-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; background: #FF0033; border-radius: 50%; cursor: pointer; box-shadow: 0 0 8px rgba(255,0,51,0.6); transition: transform 0.15s; }
            .hb-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
            .hb-slider-value { min-width: 40px; text-align: center; color: #E0E0E0; font-size: 12px; font-weight: 600; background: rgba(255,0,51,0.1); border: 1px solid rgba(255,0,51,0.2); border-radius: 4px; padding: 2px 8px; }
            .hb-select { background: rgba(30,30,30,0.9); border: 1px solid rgba(255,0,51,0.15); color: #E0E0E0; font-size: 12px; font-weight: 500; padding: 6px 12px; border-radius: 6px; outline: none; cursor: pointer; min-width: 130px; transition: all 0.15s; font-family: inherit; }
            .hb-select:hover { border-color: rgba(255,0,51,0.3); }
            .hb-select:focus { border-color: #FF0033; }
            .hb-select option { background: #0A0A0A; color: #E0E0E0; }
            .hb-color { width: 30px; height: 22px; border: 1px solid rgba(255,0,51,0.3); border-radius: 5px; cursor: pointer; padding: 0; background: none; flex-shrink: 0; transition: all 0.15s; }
            .hb-color:hover { border-color: #FF0033; transform: scale(1.05); }
            .hb-color::-webkit-color-swatch-wrapper { padding: 2px; }
            .hb-color::-webkit-color-swatch { border: none; border-radius: 3px; }
            .hb-placeholder { display: flex; align-items: center; justify-content: center; height: 300px; color: #444; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // UI COMPONENTS
    // ============================================================
    function createUI(h, useState, useEffect, useRef) {
        const Fragment = window.preact.Fragment;

        function Toggle({ value, onChange }) {
            return h('div', {
                class: 'hb-toggle' + (value ? ' on' : ''),
                onClick: () => onChange(!value)
            });
        }

        function Slider({ value, min, max, step, onChange }) {
            return h('div', { class: 'hb-slider-wrap' }, [
                h('input', {
                    type: 'range', class: 'hb-slider', min, max,
                    step: step || 1, value,
                    onInput: (e) => onChange(parseFloat(e.target.value))
                }),
                h('div', { class: 'hb-slider-value' }, value)
            ]);
        }

        function Dropdown({ value, options, onChange }) {
            return h('select', {
                class: 'hb-select', value,
                onChange: (e) => onChange(e.target.value)
            }, options.map(opt => h('option', { value: opt, key: opt }, opt)));
        }

        function ColorPicker({ value, onChange }) {
            return h('input', {
                type: 'color', class: 'hb-color', value,
                onInput: (e) => onChange(e.target.value)
            });
        }

        function Row({ label, children }) {
            return h('div', { class: 'hb-row' }, [
                h('div', { class: 'hb-row-label' }, label),
                children
            ]);
        }

        function SectionTitle({ children }) {
            return h('div', { class: 'hb-section-title' }, children);
        }

        function Placeholder({ name }) {
            return h('div', { class: 'hb-placeholder' }, name + ' — coming soon');
        }

        // --- AIMBOT TAB ---
        function AimbotTab() {
            const [aimbot, setAimbot] = useState(Object.assign({}, state.aimbot));
            const update = (key, val) => {
                state.aimbot[key] = val;
                setAimbot(Object.assign({}, state.aimbot));
            };
            return h(Fragment, null, [
                h(SectionTitle, { key: 't' }, 'AIMBOT'),
                h(Row, { key: 'r1', label: 'Aimbot' }, h(Toggle, { value: aimbot.enabled, onChange: v => update('enabled', v) })),
                h(Row, { key: 'r2', label: 'Aim Type' }, h(Dropdown, { value: aimbot.aimType, options: ['aimbot', 'silent', 'psilent'], onChange: v => update('aimType', v) })),
                h(Row, { key: 'r3', label: 'Aim Target' }, h(Dropdown, { value: aimbot.aimTarget, options: ['center', 'nearest', 'lowest hp'], onChange: v => update('aimTarget', v) })),
                h(Row, { key: 'r4', label: 'Target Switch Interval' }, h(Slider, { value: aimbot.switchInterval, min: 0, max: 10, step: 1, onChange: v => update('switchInterval', v) })),
                h(Row, { key: 'r5', label: 'Aim Key' }, h(Dropdown, { value: aimbot.aimKey, options: ['LeftMouse', 'RightMouse', 'Shift', 'Ctrl', 'Alt'], onChange: v => update('aimKey', v) })),
                h(Row, { key: 'r6', label: 'Aim Speed' }, h(Slider, { value: aimbot.aimSpeed, min: 1, max: 20, step: 1, onChange: v => update('aimSpeed', v) })),
                h(Row, { key: 'r7', label: 'Aim Bone' }, h(Dropdown, { value: aimbot.aimBone, options: ['Head', 'Neck', 'Chest', 'Pelvis'], onChange: v => update('aimBone', v) })),
                h(Row, { key: 'r8', label: 'FOV' }, h(Toggle, { value: aimbot.fov, onChange: v => update('fov', v) })),
                h(Row, { key: 'r9', label: 'FOV Size' }, h(Slider, { value: aimbot.fovSize, min: 10, max: 360, step: 1, onChange: v => update('fovSize', v) })),
                h(Row, { key: 'r10', label: 'FOV Color' }, h(ColorPicker, { value: aimbot.fovColor, onChange: v => update('fovColor', v) })),
                h(Row, { key: 'r11', label: 'FOV Rainbow' }, h(Toggle, { value: aimbot.fovRainbow, onChange: v => update('fovRainbow', v) })),
                h(Row, { key: 'r12', label: 'Sticky Targeting' }, h(Toggle, { value: aimbot.stickyTargeting, onChange: v => update('stickyTargeting', v) })),
            ]);
        }

        // --- PLAYER TAB ---
        function PlayerTab() {
            const [player, setPlayer] = useState(Object.assign({}, state.player));
            const update = (key, val) => {
                state.player[key] = val;
                setPlayer(Object.assign({}, state.player));
            };
            return h(Fragment, null, [
                h(SectionTitle, { key: 't1' }, 'MOVEMENT'),
                h(Row, { key: 'r1', label: 'Bhop' }, h(Toggle, { value: player.bhop, onChange: v => update('bhop', v) })),
                h(Row, { key: 'r2', label: 'Auto Strafe' }, h(Toggle, { value: player.autoStrafe, onChange: v => update('autoStrafe', v) })),
                h(Row, { key: 'r3', label: 'Speed' }, h(Slider, { value: player.speed, min: 0, max: 100, step: 1, onChange: v => update('speed', v) })),
                h(Row, { key: 'r4', label: 'Fly' }, h(Toggle, { value: player.fly, onChange: v => update('fly', v) })),
                h(Row, { key: 'r5', label: 'Fly Speed' }, h(Slider, { value: player.flySpeed, min: 100, max: 5000, step: 50, onChange: v => update('flySpeed', v) })),
                h(Row, { key: 'r6', label: 'No Gravity' }, h(Toggle, { value: player.noGravity, onChange: v => update('noGravity', v) })),
                h(SectionTitle, { key: 't2' }, 'PHYSICS'),
                h(Row, { key: 'r7', label: 'Slope Angle' }, h(Slider, { value: player.slopeAngle, min: 0, max: 90, step: 0.1, onChange: v => update('slopeAngle', v) })),
                h(Row, { key: 'r8', label: 'Step Height' }, h(Slider, { value: player.stepHeight, min: 0, max: 5, step: 0.1, onChange: v => update('stepHeight', v) })),
                h(Row, { key: 'r9', label: 'Jump Height' }, h(Slider, { value: player.jumpHeight, min: 0, max: 50, step: 1, onChange: v => update('jumpHeight', v) })),
                h(Row, { key: 'r10', label: 'Gravity' }, h(Slider, { value: player.gravity, min: -100, max: 0, step: 0.5, onChange: v => update('gravity', v) })),
                h(Row, { key: 'r11', label: 'No Knockback' }, h(Toggle, { value: player.noKnockback, onChange: v => update('noKnockback', v) })),
                h(SectionTitle, { key: 't3' }, 'SURVIVAL'),
                h(Row, { key: 'r12', label: 'Invisibility' }, h(Toggle, { value: player.invisibility, onChange: v => update('invisibility', v) })),
            ]);
        }

        // --- GUN TAB ---
        function GunTab() {
            const [gun, setGun] = useState(Object.assign({}, state.gun));
            const update = (key, val) => {
                state.gun[key] = val;
                setGun(Object.assign({}, state.gun));
            };
            return h(Fragment, null, [
                h(SectionTitle, { key: 't1' }, 'COMBAT'),
                h(Row, { key: 'r1', label: 'Trigger Bot' }, h(Toggle, { value: gun.triggerBot, onChange: v => update('triggerBot', v) })),
                h(Row, { key: 'r2', label: 'Auto Fire' }, h(Toggle, { value: gun.autoFire, onChange: v => update('autoFire', v) })),
                h(Row, { key: 'r3', label: 'Hover to Kill' }, h(Toggle, { value: gun.hoverToKill, onChange: v => update('hoverToKill', v) })),
                h(Row, { key: 'r4', label: 'WallBang' }, h(Toggle, { value: gun.wallbang, onChange: v => update('wallbang', v) })),
                h(Row, { key: 'r5', label: 'Damage' }, h(Slider, { value: gun.damage, min: 1, max: 1000, step: 1, onChange: v => update('damage', v) })),
                h(Row, { key: 'r6', label: 'One Shot' }, h(Toggle, { value: gun.oneShot, onChange: v => update('oneShot', v) })),
                h(SectionTitle, { key: 't2' }, 'HANDLING'),
                h(Row, { key: 'r7', label: 'Fast Reload' }, h(Toggle, { value: gun.fastReload, onChange: v => update('fastReload', v) })),
                h(Row, { key: 'r8', label: 'Fast Switch' }, h(Toggle, { value: gun.fastSwitch, onChange: v => update('fastSwitch', v) })),
                h(Row, { key: 'r9', label: 'Infinite Ammo' }, h(Toggle, { value: gun.infiniteAmmo, onChange: v => update('infiniteAmmo', v) })),
                h(Row, { key: 'r10', label: 'Infinite Range' }, h(Toggle, { value: gun.infiniteRange, onChange: v => update('infiniteRange', v) })),
                h(Row, { key: 'r11', label: 'No Recoil' }, h(Toggle, { value: gun.noRecoil, onChange: v => update('noRecoil', v) })),
                h(Row, { key: 'r12', label: 'Fire Rate' }, h(Toggle, { value: gun.fireRate, onChange: v => update('fireRate', v) })),
                h(Row, { key: 'r13', label: 'No Ability Cooldown' }, h(Toggle, { value: gun.noAbilityCooldown, onChange: v => update('noAbilityCooldown', v) })),
                h(Row, { key: 'r14', label: 'Bullet Hit Random' }, h(Toggle, { value: gun.bulletHitRandom, onChange: v => update('bulletHitRandom', v) })),
            ]);
        }

        // --- VISUALS TAB ---
        function VisualsTab() {
            const [visuals, setVisuals] = useState(Object.assign({}, state.visuals));
            const update = (key, val) => {
                state.visuals[key] = val;
                setVisuals(Object.assign({}, state.visuals));
            };
            return h(Fragment, null, [
                h(SectionTitle, { key: 't1' }, 'UTILITY'),
                h(Row, { key: 'r1', label: 'No Flash' }, h(Toggle, { value: visuals.noFlash, onChange: v => update('noFlash', v) })),
                h(Row, { key: 'r2', label: 'No Smoke' }, h(Toggle, { value: visuals.noSmoke, onChange: v => update('noSmoke', v) })),
                h(Row, { key: 'r3', label: 'Transparent Shield' }, h(Toggle, { value: visuals.transparentShield, onChange: v => update('transparentShield', v) })),

                h(SectionTitle, { key: 't2' }, 'CHAMS'),
                h(Row, { key: 'r4', label: 'Hands' }, h(Toggle, { value: visuals.handsChams, onChange: v => update('handsChams', v) })),
                h(Row, { key: 'r5', label: 'Hands Color' }, h(ColorPicker, { value: visuals.handsColor, onChange: v => update('handsColor', v) })),
                h(Row, { key: 'r6', label: 'Chams' }, h(Toggle, { value: visuals.chams, onChange: v => update('chams', v) })),
                h(Row, { key: 'r7', label: 'Chams Wireframe' }, h(Toggle, { value: visuals.chamsWireframe, onChange: v => update('chamsWireframe', v) })),
                h(Row, { key: 'r8', label: 'Player Visible Color' }, h(ColorPicker, { value: visuals.playerVisibleColor, onChange: v => update('playerVisibleColor', v) })),

                h(SectionTitle, { key: 't3' }, 'ESP'),
                h(Row, { key: 'r9', label: 'Global ESP' }, h(Toggle, { value: visuals.globalEsp, onChange: v => update('globalEsp', v) })),
                h(Row, { key: 'r10', label: 'Box ESP' }, h(Toggle, { value: visuals.boxEsp, onChange: v => update('boxEsp', v) })),
                h(Row, { key: 'r11', label: 'Box Thickness' }, h(Slider, { value: visuals.boxThickness, min: 1, max: 20, step: 1, onChange: v => update('boxThickness', v) })),
                h(Row, { key: 'r12', label: 'Box Color' }, h(ColorPicker, { value: visuals.boxColor, onChange: v => update('boxColor', v) })),
                h(Row, { key: 'r13', label: 'Box Rainbow' }, h(Toggle, { value: visuals.boxRainbow, onChange: v => update('boxRainbow', v) })),
                h(Row, { key: 'r14', label: 'Corner Box ESP' }, h(Toggle, { value: visuals.cornerBoxEsp, onChange: v => update('cornerBoxEsp', v) })),
                h(Row, { key: 'r15', label: 'Corner Box Thickness' }, h(Slider, { value: visuals.cornerBoxThickness, min: 1, max: 20, step: 0.1, onChange: v => update('cornerBoxThickness', v) })),
                h(Row, { key: 'r16', label: 'Corner Box Color' }, h(ColorPicker, { value: visuals.cornerBoxColor, onChange: v => update('cornerBoxColor', v) })),
                h(Row, { key: 'r17', label: 'Skeleton ESP' }, h(Toggle, { value: visuals.skeletonEsp, onChange: v => update('skeletonEsp', v) })),
                h(Row, { key: 'r18', label: 'Skeleton Thickness' }, h(Slider, { value: visuals.skeletonThickness, min: 1, max: 20, step: 0.1, onChange: v => update('skeletonThickness', v) })),
                h(Row, { key: 'r19', label: 'Skeleton Color' }, h(ColorPicker, { value: visuals.skeletonColor, onChange: v => update('skeletonColor', v) })),
                h(Row, { key: 'r20', label: 'Filled Box ESP' }, h(Toggle, { value: visuals.filledBoxEsp, onChange: v => update('filledBoxEsp', v) })),
                h(Row, { key: 'r21', label: 'Filled Box Color' }, h(ColorPicker, { value: visuals.filledBoxColor, onChange: v => update('filledBoxColor', v) })),
                h(Row, { key: 'r22', label: 'Tracer ESP' }, h(Toggle, { value: visuals.tracerEsp, onChange: v => update('tracerEsp', v) })),
                h(Row, { key: 'r23', label: 'Tracer Thickness' }, h(Slider, { value: visuals.tracerThickness, min: 1, max: 10, step: 1, onChange: v => update('tracerThickness', v) })),
                h(Row, { key: 'r24', label: 'Tracer Color' }, h(ColorPicker, { value: visuals.tracerColor, onChange: v => update('tracerColor', v) })),

                h(SectionTitle, { key: 't4' }, 'PLAYER INFO'),
                h(Row, { key: 'r25', label: 'Name ESP' }, h(Toggle, { value: visuals.nameEsp, onChange: v => update('nameEsp', v) })),
                h(Row, { key: 'r26', label: 'Name Size' }, h(Slider, { value: visuals.nameSize, min: 8, max: 32, step: 1, onChange: v => update('nameSize', v) })),
                h(Row, { key: 'r27', label: 'Name Color' }, h(ColorPicker, { value: visuals.nameColor, onChange: v => update('nameColor', v) })),
                h(Row, { key: 'r28', label: 'Health Bar' }, h(Toggle, { value: visuals.healthBar, onChange: v => update('healthBar', v) })),
                h(Row, { key: 'r29', label: 'Health Text' }, h(Toggle, { value: visuals.healthText, onChange: v => update('healthText', v) })),
                h(Row, { key: 'r30', label: 'Distance ESP' }, h(Toggle, { value: visuals.distanceEsp, onChange: v => update('distanceEsp', v) })),
                h(Row, { key: 'r31', label: 'Distance Color' }, h(ColorPicker, { value: visuals.distanceColor, onChange: v => update('distanceColor', v) })),
                h(Row, { key: 'r32', label: 'Gun ESP' }, h(Toggle, { value: visuals.gunEsp, onChange: v => update('gunEsp', v) })),
                h(Row, { key: 'r33', label: 'Gun Color' }, h(ColorPicker, { value: visuals.gunColor, onChange: v => update('gunColor', v) })),
            ]);
        }

        // --- MISC TAB ---
        function MiscTab() {
            const [misc, setMisc] = useState(Object.assign({}, state.misc));
            const update = (key, val) => {
                state.misc[key] = val;
                setMisc(Object.assign({}, state.misc));
            };
            return h(Fragment, null, [
                h(SectionTitle, { key: 't' }, 'MISC'),
                h(Row, { key: 'r1', label: 'Neck Rotation' }, h(Slider, { value: misc.neckRotation, min: 0, max: 180, step: 1, onChange: v => update('neckRotation', v) })),
                h(Row, { key: 'r2', label: 'Instant Respawn' }, h(Toggle, { value: misc.instantRespawn, onChange: v => update('instantRespawn', v) })),
                h(Row, { key: 'r3', label: 'Chat Spam' }, h(Toggle, { value: misc.chatSpam, onChange: v => update('chatSpam', v) })),
                h(Row, { key: 'r4', label: 'Roast All' }, h(Toggle, { value: misc.roastAll, onChange: v => update('roastAll', v) })),
            ]);
        }

        // --- SETTINGS TAB ---
        function SettingsTab() {
            const [settings, setSettings] = useState(Object.assign({}, state.settings));
            const update = (key, val) => {
                state.settings[key] = val;
                setSettings(Object.assign({}, state.settings));
            };
            const keys = ['None', 'P', 'F', 'G', 'H', 'J', 'K', 'L', 'X', 'C', 'V', 'B', 'N', 'M'];
            return h(Fragment, null, [
                h(SectionTitle, { key: 't' }, 'KEYBINDS'),
                h(Row, { key: 'r1', label: 'Menu Toggle Key' }, h(Dropdown, { value: settings.menuKey, options: keys, onChange: v => update('menuKey', v) })),
                h(Row, { key: 'r2', label: 'Godmode Key' }, h(Dropdown, { value: settings.godmodeKey, options: keys, onChange: v => update('godmodeKey', v) })),
                h(Row, { key: 'r3', label: 'Wallbang Key' }, h(Dropdown, { value: settings.wallbangKey, options: keys, onChange: v => update('wallbangKey', v) })),
                h(Row, { key: 'r4', label: 'Chams Key' }, h(Dropdown, { value: settings.chamsKey, options: keys, onChange: v => update('chamsKey', v) })),
                h(Row, { key: 'r5', label: 'ESP Key' }, h(Dropdown, { value: settings.espKey, options: keys, onChange: v => update('espKey', v) })),
                h(Row, { key: 'r6', label: 'Loadout Key' }, h(Dropdown, { value: settings.loadoutKey, options: keys, onChange: v => update('loadoutKey', v) })),
                h(Row, { key: 'r7', label: 'Invisibility Key' }, h(Dropdown, { value: settings.invisibilityKey, options: keys, onChange: v => update('invisibilityKey', v) })),
                h(Row, { key: 'r8', label: 'Fly Key' }, h(Dropdown, { value: settings.flyKey, options: keys, onChange: v => update('flyKey', v) })),
            ]);
        }

        // --- CONFIGS TAB ---
        function ConfigsTab() {
            const configs = ['Legit', 'Rage', 'HvH', 'Scout', 'Sniper', 'Custom'];
            return h(Fragment, null, [
                h(SectionTitle, { key: 't1' }, 'PRESETS'),
                ...configs.map((cfg, i) => h(Row, { key: 'c' + i, label: cfg },
                    h('button', {
                        class: 'hb-select',
                        style: 'cursor:pointer;min-width:100px;',
                        onClick: () => log('Load config: ' + cfg)
                    }, 'Load')
                )),
                h(SectionTitle, { key: 't2' }, 'CUSTOM'),
                h(Row, { key: 'r1', label: 'Save current config' },
                    h('button', { class: 'hb-select', style: 'cursor:pointer;min-width:100px;', onClick: () => log('Save config') }, 'Save')
                ),
                h(Row, { key: 'r2', label: 'Reset to default' },
                    h('button', { class: 'hb-select', style: 'cursor:pointer;min-width:100px;', onClick: () => log('Reset config') }, 'Reset')
                ),
            ]);
        }

        // --- PLAYERS TAB ---
        function PlayersTab() {
            return h(Fragment, null, [
                h(SectionTitle, { key: 't' }, 'PLAYERS'),
                h(Placeholder, { key: 'p', name: 'Player list' }),
            ]);
        }

        // --- CREDITS TAB ---
        function CreditsTab() {
            return h(Fragment, null, [
                h(SectionTitle, { key: 't' }, 'CREDITS'),
                h(Row, { key: 'r1', label: 'Developer' }, h('span', { style: 'color:#E0E0E0;font-size:13px;' }, 'Hribok')),
                h(Row, { key: 'r2', label: 'Framework' }, h('span', { style: 'color:#E0E0E0;font-size:13px;' }, 'UnityWebModkit')),
                h(Row, { key: 'r3', label: 'UI Framework' }, h('span', { style: 'color:#E0E0E0;font-size:13px;' }, 'Preact')),
                h(Row, { key: 'r4', label: 'Discord' },
                    h('button', { class: 'hb-select', style: 'cursor:pointer;', onClick: () => window.open('https://discord.gg/hribok', '_blank') }, 'Join')
                ),
            ]);
        }

        // --- MENU ---
        function Menu() {
            const [visible, setVisible] = useState(state.visible);
            const [activeTab, setActiveTab] = useState(state.activeTab);
            const [pos, setPos] = useState({ x: null, y: null });
            const menuRef = useRef(null);
            const dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

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

            const tabs = [
                { id: 'aimbot', label: 'Aimbot', comp: AimbotTab },
                { id: 'player', label: 'Player', comp: PlayerTab },
                { id: 'gun', label: 'Gun', comp: GunTab },
                { id: 'visuals', label: 'Visuals', comp: VisualsTab },
                { id: 'misc', label: 'Misc', comp: MiscTab },
                { id: 'players', label: 'Players', comp: PlayersTab },
                { id: 'configs', label: 'Configs', comp: ConfigsTab },
                { id: 'settings', label: 'Settings', comp: SettingsTab },
                { id: 'credits', label: 'Credits', comp: CreditsTab },
            ];

            const ActiveComp = tabs.find(t => t.id === activeTab)?.comp || AimbotTab;

            const setTab = (id) => {
                state.activeTab = id;
                setActiveTab(id);
            };

            return h('div', {
                class: 'hb-menu', ref: menuRef,
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
                    h(ActiveComp, { key: activeTab })
                ),
            ]);
        }

        return { Menu };
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
            window.Hribok = { version: HRIBOK_VERSION, ctx: ctx, state: state };

            log('Plugin created successfully');

            // Load Preact via script tags
            log('Loading Preact...');
            await loadExternalScript('https://unpkg.com/preact@10.19.3/dist/preact.min.js');
            await loadExternalScript('https://unpkg.com/preact@10.19.3/hooks/dist/hooks.umd.js');

            if (!window.preact || !window.preactHooks) {
                throw new Error('Preact failed to load');
            }

            const h = window.preact.h;
            const useState = window.preactHooks.useState;
            const useEffect = window.preactHooks.useEffect;
            const useRef = window.preactHooks.useRef;
            const renderFn = window.preact.render;

            log('Preact loaded');

            injectStyles();

            let root = document.getElementById('hribok-root');
            if (!root) {
                root = document.createElement('div');
                root.id = 'hribok-root';
                document.body.appendChild(root);
            }

            const { Menu } = createUI(h, useState, useEffect, useRef);
            renderFn(h(Menu), root);

            log('UI rendered. Press ' + state.settings.menuKey + ' to toggle menu.');

        } catch (e) {
            err('Init failed:', e);
        }
    })();

})();
