/**
 * Hribok — veck.io cheat
 * Version: 1.0.0
 *
 * UI: Preact + htm via CDN
 */

(function () {
    'use strict';

    // ============================================================
    // CONFIG
    // ============================================================
    const HRIBOK_VERSION = '1.0.0';
    const LOG_HEAD = 'color: #FF0033; font-weight: bold;';
    const LOG_OK = 'color: #00FF88;';
    const LOG_WARN = 'color: #FFB300;';
    const LOG_ERR = 'color: #FF0033; font-weight: bold;';

    function log(msg) { console.log('%c[Hribok]%c ' + msg, LOG_HEAD, LOG_OK); }
    function warn(msg) { console.warn('%c[Hribok]%c ' + msg, LOG_HEAD, LOG_WARN); }
    function err(msg, e) { console.error('%c[Hribok]%c ' + msg, LOG_HEAD, LOG_ERR, e || ''); }

    // ============================================================
    // UTILITIES
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

    // ============================================================
    // UI STATE
    // ============================================================
    const state = {
        visible: false,
        activeTab: 'aimbot',
        position: { x: null, y: null },
        // Aimbot
        aimbot: {
            enabled: false,
            aimType: 'aimbot',
            aimTarget: 'center',
            switchInterval: 0,
            aimKey: 'LeftMouse',
            aimSpeed: 5,
            aimBone: 'Head',
            fov: false,
            fovSize: 90,
            fovColor: '#FF0033',
            fovRainbow: false,
            stickyTargeting: false,
        },
        // Player
        player: {
            noGravity: false,
            slopeAngle: 65.8,
            stepHeight: 0.2,
            jumpHeight: 10,
            gravity: -24.5,
            invisibility: false,
            fly: false,
            flySpeed: 1000,
            noKnockback: false,
            speed: 0,
        },
        // Gun
        gun: {
            hoverToKill: false,
            bulletHitRandom: false,
            wallbang: false,
            noAbilityCooldown: false,
            damage: 150,
            oneShot: false,
            fastSwitch: false,
            infiniteRange: false,
            infiniteAmmo: false,
            fireRate: false,
            autoFire: false,
            noRecoil: false,
        },
        // Visuals
        visuals: {
            noFlash: false,
            noSmoke: false,
            transparentShield: false,
            handsChams: false,
            handsColor: '#FF0033',
            chams: false,
            chamsWireframe: false,
            playerVisibleColor: '#00FF00',
            globalEsp: false,
            boxEsp: false,
            boxThickness: 6,
            boxColor: '#FF0033',
            boxRainbow: false,
            cornerBoxEsp: false,
            cornerBoxThickness: 7.1,
            cornerBoxColor: '#FF0033',
            skeletonEsp: false,
            skeletonThickness: 9.3,
            skeletonColor: '#0033FF',
            filledBoxEsp: false,
            filledBoxColor: '#880000',
            tracerEsp: false,
            tracerThickness: 2,
            tracerColor: '#FF0033',
            nameEsp: false,
            nameSize: 16,
            nameColor: '#FFFFFF',
            healthText: false,
            healthBar: false,
            healthEsp: false,
            healthSize: 16,
            healthColor: '#FFFFFF',
            distanceEsp: false,
            distanceSize: 16,
            distanceColor: '#FFFFFF',
            gunEsp: false,
            gunSize: 16,
            gunColor: '#FFFFFF',
        },
        // Misc
        misc: {
            neckRotation: 0,
            instantRespawn: false,
            chatSpam: false,
            roastAll: false,
        },
        // Settings
        settings: {
            menuKey: 'P',
            godmodeKey: 'None',
            wallbangKey: 'None',
            chamsKey: 'F',
            espKey: 'None',
            loadoutKey: 'None',
            invisibilityKey: 'None',
            flyKey: 'None',
        },
    };

    // ============================================================
    // UI INJECTION (CSS)
    // ============================================================
    function injectStyles() {
        if (document.getElementById('hribok-styles')) return;

        const style = document.createElement('style');
        style.id = 'hribok-styles';
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

            #hribok-root * {
                box-sizing: border-box;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                -webkit-font-smoothing: antialiased;
            }

            #hribok-root {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 2147483647;
            }

            .hb-menu {
                position: fixed;
                width: 780px;
                height: 560px;
                background: rgba(10, 10, 10, 0.95);
                border: 1px solid rgba(255, 0, 51, 0.15);
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 0, 51, 0.08);
                display: flex;
                overflow: hidden;
                pointer-events: auto;
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                animation: hb-fade-in 0.2s ease-out;
            }

            @keyframes hb-fade-in {
                from { opacity: 0; transform: scale(0.97); }
                to { opacity: 1; transform: scale(1); }
            }

            /* HEADER */
            .hb-header {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 52px;
                display: flex;
                align-items: center;
                padding: 0 20px;
                border-bottom: 1px solid rgba(255, 0, 51, 0.1);
                background: rgba(10, 10, 10, 0.6);
                cursor: move;
                user-select: none;
                z-index: 10;
            }

            .hb-logo-box {
                width: 28px;
                height: 28px;
                background: #FF0033;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #000;
                font-weight: 700;
                font-size: 14px;
                margin-right: 10px;
                box-shadow: 0 0 16px rgba(255, 0, 51, 0.4);
            }

            .hb-logo-text {
                color: #E0E0E0;
                font-weight: 600;
                font-size: 15px;
                letter-spacing: 0.3px;
            }

            .hb-version {
                margin-left: auto;
                color: #666;
                font-size: 11px;
                font-weight: 500;
                letter-spacing: 0.5px;
            }

            .hb-close {
                margin-left: 16px;
                width: 22px;
                height: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                cursor: pointer;
                border-radius: 4px;
                transition: all 0.15s;
                font-size: 16px;
                line-height: 1;
            }

            .hb-close:hover {
                background: rgba(255, 0, 51, 0.15);
                color: #FF0033;
            }

            /* SIDEBAR */
            .hb-sidebar {
                width: 180px;
                background: rgba(5, 5, 5, 0.7);
                border-right: 1px solid rgba(255, 0, 51, 0.08);
                padding-top: 68px;
                display: flex;
                flex-direction: column;
                padding-bottom: 12px;
            }

            .hb-tab {
                padding: 11px 20px;
                color: #888;
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.15s;
                border-left: 2px solid transparent;
                user-select: none;
                letter-spacing: 0.3px;
            }

            .hb-tab:hover {
                color: #E0E0E0;
                background: rgba(255, 0, 51, 0.04);
            }

            .hb-tab.active {
                color: #FF0033;
                background: rgba(255, 0, 51, 0.08);
                border-left-color: #FF0033;
                box-shadow: inset 4px 0 16px rgba(255, 0, 51, 0.1);
            }

            /* CONTENT */
            .hb-content {
                flex: 1;
                padding: 68px 24px 24px;
                overflow-y: auto;
                overflow-x: hidden;
            }

            .hb-content::-webkit-scrollbar {
                width: 6px;
            }
            .hb-content::-webkit-scrollbar-track {
                background: transparent;
            }
            .hb-content::-webkit-scrollbar-thumb {
                background: rgba(255, 0, 51, 0.3);
                border-radius: 3px;
            }
            .hb-content::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 0, 51, 0.5);
            }

            .hb-section-title {
                color: #FF0033;
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                text-align: center;
                margin: 18px 0 12px;
                opacity: 0.85;
            }

            .hb-section-title:first-child {
                margin-top: 0;
            }

            /* ROW */
            .hb-row {
                background: rgba(20, 20, 20, 0.7);
                border: 1px solid rgba(255, 0, 51, 0.08);
                border-radius: 8px;
                padding: 12px 16px;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transition: all 0.15s;
            }

            .hb-row:hover {
                border-color: rgba(255, 0, 51, 0.2);
                background: rgba(24, 24, 24, 0.8);
            }

            .hb-row-label {
                color: #C0C0C0;
                font-size: 13px;
                font-weight: 500;
                letter-spacing: 0.2px;
            }

            /* TOGGLE */
            .hb-toggle {
                width: 40px;
                height: 22px;
                background: #2A2A2A;
                border-radius: 11px;
                position: relative;
                cursor: pointer;
                transition: all 0.2s;
                flex-shrink: 0;
            }

            .hb-toggle.on {
                background: #FF0033;
                box-shadow: 0 0 12px rgba(255, 0, 51, 0.5);
            }

            .hb-toggle::after {
                content: '';
                position: absolute;
                top: 3px;
                left: 3px;
                width: 16px;
                height: 16px;
                background: #E0E0E0;
                border-radius: 50%;
                transition: all 0.2s;
            }

            .hb-toggle.on::after {
                left: 21px;
                background: #FFFFFF;
            }

            /* SLIDER */
            .hb-slider-wrap {
                display: flex;
                align-items: center;
                gap: 10px;
                flex-shrink: 0;
                width: 200px;
            }

            .hb-slider {
                -webkit-appearance: none;
                appearance: none;
                flex: 1;
                height: 4px;
                background: #2A2A2A;
                border-radius: 2px;
                outline: none;
                cursor: pointer;
            }

            .hb-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 14px;
                height: 14px;
                background: #FF0033;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 8px rgba(255, 0, 51, 0.6);
                transition: transform 0.15s;
            }

            .hb-slider::-webkit-slider-thumb:hover {
                transform: scale(1.15);
            }

            .hb-slider-value {
                min-width: 40px;
                text-align: center;
                color: #E0E0E0;
                font-size: 12px;
                font-weight: 600;
                background: rgba(255, 0, 51, 0.1);
                border: 1px solid rgba(255, 0, 51, 0.2);
                border-radius: 4px;
                padding: 2px 8px;
            }

            /* DROPDOWN */
            .hb-select {
                background: rgba(30, 30, 30, 0.9);
                border: 1px solid rgba(255, 0, 51, 0.15);
                color: #E0E0E0;
                font-size: 12px;
                font-weight: 500;
                padding: 6px 12px;
                border-radius: 6px;
                outline: none;
                cursor: pointer;
                min-width: 130px;
                transition: all 0.15s;
                font-family: inherit;
            }

            .hb-select:hover {
                border-color: rgba(255, 0, 51, 0.3);
            }

            .hb-select:focus {
                border-color: #FF0033;
            }

            .hb-select option {
                background: #0A0A0A;
                color: #E0E0E0;
            }

            /* COLOR PICKER */
            .hb-color {
                width: 30px;
                height: 22px;
                border: 1px solid rgba(255, 0, 51, 0.3);
                border-radius: 5px;
                cursor: pointer;
                padding: 0;
                background: none;
                flex-shrink: 0;
                transition: all 0.15s;
            }

            .hb-color:hover {
                border-color: #FF0033;
                transform: scale(1.05);
            }

            .hb-color::-webkit-color-swatch-wrapper {
                padding: 2px;
            }

            .hb-color::-webkit-color-swatch {
                border: none;
                border-radius: 3px;
            }

            /* PLACEHOLDER */
            .hb-placeholder {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 300px;
                color: #444;
                font-size: 14px;
                font-weight: 500;
                letter-spacing: 0.5px;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // REACT/PREACT SETUP
    // ============================================================
    let h = null, render = null, useState = null, useEffect = null, useRef = null, html = null;

    async function loadPreact() {
        // Load Preact + htm via dynamic import
        const preactMod = await import('https://unpkg.com/preact@10.19.3/dist/preact.module.js');
        const hooksMod = await import('https://unpkg.com/preact@10.19.3/hooks/dist/hooks.module.js');
        const htmMod = await import('https://unpkg.com/htm@3.1.1/dist/htm.module.js');

        h = preactMod.h;
        render = preactMod.render;
        useState = hooksMod.useState;
        useEffect = hooksMod.useEffect;
        useRef = hooksMod.useRef;
        html = htmMod.default.bind(h);

        log('Preact loaded');
    }

    // ============================================================
    // UI COMPONENTS
    // ============================================================
    function createComponents() {

        // --- TOGGLE ---
        function Toggle({ value, onChange }) {
            return html`
                <div
                    class=${'hb-toggle' + (value ? ' on' : '')}
                    onClick=${() => onChange(!value)}
                ></div>
            `;
        }

        // --- SLIDER ---
        function Slider({ value, min, max, step, onChange }) {
            return html`
                <div class="hb-slider-wrap">
                    <input
                        type="range"
                        class="hb-slider"
                        min=${min}
                        max=${max}
                        step=${step || 1}
                        value=${value}
                        onInput=${(e) => onChange(parseFloat(e.target.value))}
                    />
                    <div class="hb-slider-value">${value}</div>
                </div>
            `;
        }

        // --- DROPDOWN ---
        function Dropdown({ value, options, onChange }) {
            return html`
                <select
                    class="hb-select"
                    value=${value}
                    onChange=${(e) => onChange(e.target.value)}
                >
                    ${options.map(opt => html`<option value=${opt}>${opt}</option>`)}
                </select>
            `;
        }

        // --- COLOR PICKER ---
        function ColorPicker({ value, onChange }) {
            return html`
                <input
                    type="color"
                    class="hb-color"
                    value=${value}
                    onInput=${(e) => onChange(e.target.value)}
                />
            `;
        }

        // --- ROW ---
        function Row({ label, children }) {
            return html`
                <div class="hb-row">
                    <div class="hb-row-label">${label}</div>
                    ${children}
                </div>
            `;
        }

        // --- SECTION TITLE ---
        function SectionTitle({ children }) {
            return html`<div class="hb-section-title">${children}</div>`;
        }

        // --- PLACEHOLDER ---
        function Placeholder({ name }) {
            return html`<div class="hb-placeholder">${name} — coming soon</div>`;
        }

        // --- AIMBOT TAB ---
        function AimbotTab() {
            const [aimbot, setAimbot] = useState(state.aimbot);
            const update = (key, val) => {
                state.aimbot[key] = val;
                setAimbot({ ...state.aimbot });
            };

            return html`
                <${SectionTitle}>AIMBOT</${SectionTitle}>
                <${Row} label="Aimbot"><${Toggle} value=${aimbot.enabled} onChange=${v => update('enabled', v)} /></${Row}>
                <${Row} label="Aim Type"><${Dropdown} value=${aimbot.aimType} options=${['aimbot', 'silent', 'psilent']} onChange=${v => update('aimType', v)} /></${Row}>
                <${Row} label="Aim Target"><${Dropdown} value=${aimbot.aimTarget} options=${['center', 'nearest', 'lowest hp']} onChange=${v => update('aimTarget', v)} /></${Row}>
                <${Row} label="Target Switch Interval"><${Slider} value=${aimbot.switchInterval} min=${0} max=${10} step=${1} onChange=${v => update('switchInterval', v)} /></${Row}>
                <${Row} label="Aim Key"><${Dropdown} value=${aimbot.aimKey} options=${['LeftMouse', 'RightMouse', 'Shift', 'Ctrl', 'Alt']} onChange=${v => update('aimKey', v)} /></${Row}>
                <${Row} label="Aim Speed"><${Slider} value=${aimbot.aimSpeed} min=${1} max=${20} step=${1} onChange=${v => update('aimSpeed', v)} /></${Row}>
                <${Row} label="Aim Bone"><${Dropdown} value=${aimbot.aimBone} options=${['Head', 'Neck', 'Chest', 'Pelvis']} onChange=${v => update('aimBone', v)} /></${Row}>
                <${Row} label="FOV"><${Toggle} value=${aimbot.fov} onChange=${v => update('fov', v)} /></${Row}>
                <${Row} label="FOV Size"><${Slider} value=${aimbot.fovSize} min=${10} max=${360} step=${1} onChange=${v => update('fovSize', v)} /></${Row}>
                <${Row} label="FOV Color"><${ColorPicker} value=${aimbot.fovColor} onChange=${v => update('fovColor', v)} /></${Row}>
                <${Row} label="FOV Rainbow"><${Toggle} value=${aimbot.fovRainbow} onChange=${v => update('fovRainbow', v)} /></${Row}>
                <${Row} label="Sticky Targeting"><${Toggle} value=${aimbot.stickyTargeting} onChange=${v => update('stickyTargeting', v)} /></${Row}>
            `;
        }

        // --- PLAYER TAB ---
        function PlayerTab() {
            const [player, setPlayer] = useState(state.player);
            const update = (key, val) => {
                state.player[key] = val;
                setPlayer({ ...state.player });
            };

            return html`
                <${SectionTitle}>PLAYER</${SectionTitle}>
                <${Row} label="No Gravity"><${Toggle} value=${player.noGravity} onChange=${v => update('noGravity', v)} /></${Row}>
                <${Row} label="Slope Angle"><${Slider} value=${player.slopeAngle} min=${0} max=${90} step=${0.1} onChange=${v => update('slopeAngle', v)} /></${Row}>
                <${Row} label="Step Height"><${Slider} value=${player.stepHeight} min=${0} max=${5} step=${0.1} onChange=${v => update('stepHeight', v)} /></${Row}>
                <${Row} label="Jump Height"><${Slider} value=${player.jumpHeight} min=${0} max=${50} step=${1} onChange=${v => update('jumpHeight', v)} /></${Row}>
                <${Row} label="Gravity"><${Slider} value=${player.gravity} min=${-100} max=${0} step=${0.5} onChange=${v => update('gravity', v)} /></${Row}>
                <${Row} label="Invisibility"><${Toggle} value=${player.invisibility} onChange=${v => update('invisibility', v)} /></${Row}>
                <${Row} label="Fly"><${Toggle} value=${player.fly} onChange=${v => update('fly', v)} /></${Row}>
                <${Row} label="Fly Speed"><${Slider} value=${player.flySpeed} min=${100} max=${5000} step=${50} onChange=${v => update('flySpeed', v)} /></${Row}>
                <${Row} label="No Knockback"><${Toggle} value=${player.noKnockback} onChange=${v => update('noKnockback', v)} /></${Row}>
                <${Row} label="Speed"><${Slider} value=${player.speed} min=${0} max=${100} step=${1} onChange=${v => update('speed', v)} /></${Row}>
            `;
        }

        // --- GUN TAB ---
        function GunTab() {
            const [gun, setGun] = useState(state.gun);
            const update = (key, val) => {
                state.gun[key] = val;
                setGun({ ...state.gun });
            };

            return html`
                <${SectionTitle}>GUN</${SectionTitle}>
                <${Row} label="Hover to Kill"><${Toggle} value=${gun.hoverToKill} onChange=${v => update('hoverToKill', v)} /></${Row}>
                <${Row} label="Bullet Hit Random"><${Toggle} value=${gun.bulletHitRandom} onChange=${v => update('bulletHitRandom', v)} /></${Row}>
                <${Row} label="WallBang"><${Toggle} value=${gun.wallbang} onChange=${v => update('wallbang', v)} /></${Row}>
                <${Row} label="No Ability Cooldown"><${Toggle} value=${gun.noAbilityCooldown} onChange=${v => update('noAbilityCooldown', v)} /></${Row}>
                <${Row} label="Damage"><${Slider} value=${gun.damage} min=${1} max=${1000} step=${1} onChange=${v => update('damage', v)} /></${Row}>
                <${Row} label="One Shot"><${Toggle} value=${gun.oneShot} onChange=${v => update('oneShot', v)} /></${Row}>
                <${Row} label="Fast Switch"><${Toggle} value=${gun.fastSwitch} onChange=${v => update('fastSwitch', v)} /></${Row}>
                <${Row} label="Infinite Range"><${Toggle} value=${gun.infiniteRange} onChange=${v => update('infiniteRange', v)} /></${Row}>
                <${Row} label="Infinite Ammo"><${Toggle} value=${gun.infiniteAmmo} onChange=${v => update('infiniteAmmo', v)} /></${Row}>
                <${Row} label="Fire Rate"><${Toggle} value=${gun.fireRate} onChange=${v => update('fireRate', v)} /></${Row}>
                <${Row} label="Auto Fire"><${Toggle} value=${gun.autoFire} onChange=${v => update('autoFire', v)} /></${Row}>
                <${Row} label="No Recoil"><${Toggle} value=${gun.noRecoil} onChange=${v => update('noRecoil', v)} /></${Row}>
            `;
        }

        // --- VISUALS TAB ---
        function VisualsTab() {
            const [visuals, setVisuals] = useState(state.visuals);
            const update = (key, val) => {
                state.visuals[key] = val;
                setVisuals({ ...state.visuals });
            };

            return html`
                <${SectionTitle}>UTILITY</${SectionTitle}>
                <${Row} label="No Flash"><${Toggle} value=${visuals.noFlash} onChange=${v => update('noFlash', v)} /></${Row}>
                <${Row} label="No Smoke"><${Toggle} value=${visuals.noSmoke} onChange=${v => update('noSmoke', v)} /></${Row}>
                <${Row} label="Transparent Shield"><${Toggle} value=${visuals.transparentShield} onChange=${v => update('transparentShield', v)} /></${Row}>

                <${SectionTitle}>CHAMS</${SectionTitle}>
                <${Row} label="Hands"><${Toggle} value=${visuals.handsChams} onChange=${v => update('handsChams', v)} /></${Row}>
                <${Row} label="Hands Color"><${ColorPicker} value=${visuals.handsColor} onChange=${v => update('handsColor', v)} /></${Row}>
                <${Row} label="Chams"><${Toggle} value=${visuals.chams} onChange=${v => update('chams', v)} /></${Row}>
                <${Row} label="Chams Wireframe"><${Toggle} value=${visuals.chamsWireframe} onChange=${v => update('chamsWireframe', v)} /></${Row}>
                <${Row} label="Player Visible Color"><${ColorPicker} value=${visuals.playerVisibleColor} onChange=${v => update('playerVisibleColor', v)} /></${Row}>

                <${SectionTitle}>ESP</${SectionTitle}>
                <${Row} label="Global ESP"><${Toggle} value=${visuals.globalEsp} onChange=${v => update('globalEsp', v)} /></${Row}>
                <${Row} label="Box ESP"><${Toggle} value=${visuals.boxEsp} onChange=${v => update('boxEsp', v)} /></${Row}>
                <${Row} label="Box Thickness"><${Slider} value=${visuals.boxThickness} min=${1} max=${20} step=${1} onChange=${v => update('boxThickness', v)} /></${Row}>
                <${Row} label="Box Color"><${ColorPicker} value=${visuals.boxColor} onChange=${v => update('boxColor', v)} /></${Row}>
                <${Row} label="Box Rainbow"><${Toggle} value=${visuals.boxRainbow} onChange=${v => update('boxRainbow', v)} /></${Row}>
                <${Row} label="Corner Box ESP"><${Toggle} value=${visuals.cornerBoxEsp} onChange=${v => update('cornerBoxEsp', v)} /></${Row}>
                <${Row} label="Corner Box Thickness"><${Slider} value=${visuals.cornerBoxThickness} min=${1} max=${20} step=${0.1} onChange=${v => update('cornerBoxThickness', v)} /></${Row}>
                <${Row} label="Corner Box Color"><${ColorPicker} value=${visuals.cornerBoxColor} onChange=${v => update('cornerBoxColor', v)} /></${Row}>
                <${Row} label="Skeleton ESP"><${Toggle} value=${visuals.skeletonEsp} onChange=${v => update('skeletonEsp', v)} /></${Row}>
                <${Row} label="Skeleton Thickness"><${Slider} value=${visuals.skeletonThickness} min=${1} max=${20} step=${0.1} onChange=${v => update('skeletonThickness', v)} /></${Row}>
                <${Row} label="Skeleton Color"><${ColorPicker} value=${visuals.skeletonColor} onChange=${v => update('skeletonColor', v)} /></${Row}>
                <${Row} label="Filled Box ESP"><${Toggle} value=${visuals.filledBoxEsp} onChange=${v => update('filledBoxEsp', v)} /></${Row}>
                <${Row} label="Filled Box Color"><${ColorPicker} value=${visuals.filledBoxColor} onChange=${v => update('filledBoxColor', v)} /></${Row}>
                <${Row} label="Tracer ESP"><${Toggle} value=${visuals.tracerEsp} onChange=${v => update('tracerEsp', v)} /></${Row}>
                <${Row} label="Tracer Thickness"><${Slider} value=${visuals.tracerThickness} min=${1} max=${10} step=${1} onChange=${v => update('tracerThickness', v)} /></${Row}>
                <${Row} label="Tracer Color"><${ColorPicker} value=${visuals.tracerColor} onChange=${v => update('tracerColor', v)} /></${Row}>

                <${SectionTitle}>PLAYER INFO</${SectionTitle}>
                <${Row} label="Name ESP"><${Toggle} value=${visuals.nameEsp} onChange=${v => update('nameEsp', v)} /></${Row}>
                <${Row} label="Name Size"><${Slider} value=${visuals.nameSize} min=${8} max=${32} step=${1} onChange=${v => update('nameSize', v)} /></${Row}>
                <${Row} label="Name Color"><${ColorPicker} value=${visuals.nameColor} onChange=${v => update('nameColor', v)} /></${Row}>
                <${Row} label="Health Bar"><${Toggle} value=${visuals.healthBar} onChange=${v => update('healthBar', v)} /></${Row}>
                <${Row} label="Health Text"><${Toggle} value=${visuals.healthText} onChange=${v => update('healthText', v)} /></${Row}>
                <${Row} label="Distance ESP"><${Toggle} value=${visuals.distanceEsp} onChange=${v => update('distanceEsp', v)} /></${Row}>
                <${Row} label="Distance Color"><${ColorPicker} value=${visuals.distanceColor} onChange=${v => update('distanceColor', v)} /></${Row}>
                <${Row} label="Gun ESP"><${Toggle} value=${visuals.gunEsp} onChange=${v => update('gunEsp', v)} /></${Row}>
                <${Row} label="Gun Color"><${ColorPicker} value=${visuals.gunColor} onChange=${v => update('gunColor', v)} /></${Row}>
            `;
        }

        // --- MISC TAB ---
        function MiscTab() {
            const [misc, setMisc] = useState(state.misc);
            const update = (key, val) => {
                state.misc[key] = val;
                setMisc({ ...state.misc });
            };

            return html`
                <${SectionTitle}>MISC</${SectionTitle}>
                <${Row} label="Neck Rotation"><${Slider} value=${misc.neckRotation} min=${0} max=${180} step=${1} onChange=${v => update('neckRotation', v)} /></${Row}>
                <${Row} label="Instant Respawn"><${Toggle} value=${misc.instantRespawn} onChange=${v => update('instantRespawn', v)} /></${Row}>
                <${Row} label="Chat Spam"><${Toggle} value=${misc.chatSpam} onChange=${v => update('chatSpam', v)} /></${Row}>
                <${Row} label="Roast All"><${Toggle} value=${misc.roastAll} onChange=${v => update('roastAll', v)} /></${Row}>
            `;
        }

        // --- SETTINGS TAB ---
        function SettingsTab() {
            const [settings, setSettings] = useState(state.settings);
            const update = (key, val) => {
                state.settings[key] = val;
                setSettings({ ...state.settings });
            };
            const keys = ['None', 'P', 'F', 'G', 'H', 'J', 'K', 'L', 'X', 'C', 'V', 'B', 'N', 'M'];

            return html`
                <${SectionTitle}>KEYBINDS</${SectionTitle}>
                <${Row} label="Menu Toggle Key"><${Dropdown} value=${settings.menuKey} options=${keys} onChange=${v => update('menuKey', v)} /></${Row}>
                <${Row} label="Godmode Key"><${Dropdown} value=${settings.godmodeKey} options=${keys} onChange=${v => update('godmodeKey', v)} /></${Row}>
                <${Row} label="Wallbang Key"><${Dropdown} value=${settings.wallbangKey} options=${keys} onChange=${v => update('wallbangKey', v)} /></${Row}>
                <${Row} label="Chams Key"><${Dropdown} value=${settings.chamsKey} options=${keys} onChange=${v => update('chamsKey', v)} /></${Row}>
                <${Row} label="ESP Key"><${Dropdown} value=${settings.espKey} options=${keys} onChange=${v => update('espKey', v)} /></${Row}>
                <${Row} label="Loadout Key"><${Dropdown} value=${settings.loadoutKey} options=${keys} onChange=${v => update('loadoutKey', v)} /></${Row}>
                <${Row} label="Invisibility Key"><${Dropdown} value=${settings.invisibilityKey} options=${keys} onChange=${v => update('invisibilityKey', v)} /></${Row}>
                <${Row} label="Fly Key"><${Dropdown} value=${settings.flyKey} options=${keys} onChange=${v => update('flyKey', v)} /></${Row}>
            `;
        }

        // --- CONFIGS TAB ---
        function ConfigsTab() {
            const configs = ['Legit', 'Rage', 'HvH', 'Scout', 'Sniper', 'Custom'];

            return html`
                <${SectionTitle}>PRESETS</${SectionTitle}>
                ${configs.map(cfg => html`
                    <${Row} label=${cfg}>
                        <button class="hb-select" style="cursor: pointer; min-width: 100px;" onClick=${() => log('Load config: ' + cfg)}>Load</button>
                    </${Row}>
                `)}
                <${SectionTitle}>CUSTOM</${SectionTitle}>
                <${Row} label="Save current config">
                    <button class="hb-select" style="cursor: pointer; min-width: 100px;" onClick=${() => log('Save config')}>Save</button>
                </${Row}>
                <${Row} label="Reset to default">
                    <button class="hb-select" style="cursor: pointer; min-width: 100px;" onClick=${() => log('Reset config')}>Reset</button>
                </${Row}>
            `;
        }

        // --- PLAYERS TAB ---
        function PlayersTab() {
            return html`
                <${SectionTitle}>PLAYERS</${SectionTitle}>
                <${Placeholder} name="Player list" />
            `;
        }

        // --- CREDITS TAB ---
        function CreditsTab() {
            return html`
                <${SectionTitle}>CREDITS</${SectionTitle}>
                <${Row} label="Developer"><span style="color:#E0E0E0;font-size:13px;">Hribok</span></${Row}>
                <${Row} label="Framework"><span style="color:#E0E0E0;font-size:13px;">UnityWebModkit</span></${Row}>
                <${Row} label="UI Framework"><span style="color:#E0E0E0;font-size:13px;">Preact + htm</span></${Row}>
                <${Row} label="Discord">
                    <button class="hb-select" style="cursor: pointer;" onClick=${() => window.open('https://discord.gg/hribok', '_blank')}>Join</button>
                </${Row}>
            `;
        }

        // --- MENU ---
        function Menu() {
            const [visible, setVisible] = useState(state.visible);
            const [activeTab, setActiveTab] = useState(state.activeTab);
            const [pos, setPos] = useState({ x: null, y: null });
            const menuRef = useRef(null);
            const dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

            // Initial position (center)
            useEffect(() => {
                if (pos.x === null) {
                    setPos({
                        x: Math.floor((window.innerWidth - 780) / 2),
                        y: Math.floor((window.innerHeight - 560) / 2),
                    });
                }
            }, []);

            // P key handler
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

            // Drag handlers
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

            const ActiveTabComp = tabs.find(t => t.id === activeTab)?.comp || AimbotTab;

            const setTab = (id) => {
                state.activeTab = id;
                setActiveTab(id);
            };

            return html`
                <div
                    class="hb-menu"
                    ref=${menuRef}
                    style=${'left:' + pos.x + 'px;top:' + pos.y + 'px;'}
                >
                    <div class="hb-header" onMouseDown=${onMouseDown}>
                        <div class="hb-logo-box">H</div>
                        <div class="hb-logo-text">Hribok</div>
                        <div class="hb-version">v${HRIBOK_VERSION}</div>
                        <div class="hb-close" onClick=${() => { state.visible = false; setVisible(false); }}>×</div>
                    </div>

                    <div class="hb-sidebar">
                        ${tabs.map(tab => html`
                            <div
                                class=${'hb-tab' + (activeTab === tab.id ? ' active' : '')}
                                onClick=${() => setTab(tab.id)}
                            >${tab.label}</div>
                        `)}
                    </div>

                    <div class="hb-content">
                        <${ActiveTabComp} />
                    </div>
                </div>
            `;
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

            // Load Preact + htm
            await loadPreact();

            // Inject styles
            injectStyles();

            // Create root container
            let root = document.getElementById('hribok-root');
            if (!root) {
                root = document.createElement('div');
                root.id = 'hribok-root';
                document.body.appendChild(root);
            }

            // Render menu
            const { Menu } = createComponents();
            render(html`<${Menu} />`, root);

            log('UI rendered. Press ' + state.settings.menuKey + ' to toggle menu.');

        } catch (e) {
            err('Init failed:', e);
        }
    })();

})();
