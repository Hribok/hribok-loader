/**
 * Hribok — veck.io cheat
 * Version: 2.0.8
 * Updated: SVG icons, 3D Preview support, Touchpad fix.
 */

(function () {
    'use strict';

    const HRIBOK_VERSION = '2.0.8';
    const LOG_HEAD = 'color: #FF0033; font-weight: bold;';
    const LOG_OK = 'color: #00FF88;';
    const LOG_WARN = 'color: #FFB300;';
    const LOG_ERR = 'color: #FF0033; font-weight: bold;';

    function log(m) { console.log('%c[Hribok]%c ' + m, LOG_HEAD, LOG_OK); }
    function warn(m) { console.warn('%c[Hribok]%c ' + m, LOG_HEAD, LOG_WARN); }
    function err(m, e) { console.error('%c[Hribok]%c ' + m, LOG_HEAD, LOG_ERR, e || ''); }

    const BASE = 'https://raw.githubusercontent.com/Hribok/hribok-loader/main';

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
            let code;
            if (window.__hribokGmFetch) {
                code = await window.__hribokGmFetch(url + '?t=' + Date.now());
            } else {
                const res = await fetch(url + '?t=' + Date.now());
                if (!res.ok) throw new Error('HTTP ' + res.status);
                code = await res.text();
            }
            const fn = new Function('window', 'document', 'globalThis', 'console', code);
            fn.call(window, window, document, window, console);
            log('Loaded: ' + url.split('/').pop());
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

    const state = {
        visible: false, activeTab: 'aimbot', theme: 'red',
        aimbot: { enabled: false, aimType: 'aimbot', aimTarget: 'center', switchInterval: 0, aimKey: 'LeftMouse', aimSpeed: 5, aimBone: 'Head', fov: false, fovSize: 90, fovColor: '#FF0033', fovRainbow: false, stickyTargeting: false, silentAim: false, psilent: false, hitchance: 50, minDamage: 1, autoWall: false, backtrack: false, visibleCheck: true, visibleMode: 'Only when visible' },
        player: { bhop: false, autoStrafe: false, speed: 0, fly: false, flySpeed: 1000, noGravity: false, slopeAngle: 65.8, stepHeight: 0.2, jumpHeight: 10, gravity: -24.5, noKnockback: false, invisibility: false, godMode: false, noFallDamage: false, fakeLag: false, antiAim: false, desync: false, thirdPerson: false },
        gun: { hoverToKill: false, killKey: 'LeftMouse', killMode: 'Only Visible', weaponMode: 'Auto', autoDistance: 500, knifeDistance: 50, killDelayMode: 'Off', killDelayMin: 150, killDelayMax: 250, aimBone: 'Chest', boneRandomChance: 20, visibleCheck: true, throughSmoke: false, throughWall: false, missChance: 0, missSpread: 2, tapFire: false, burstFire: false, showIndicator: false, indicatorColor: '#FF0033', indicatorStyle: 'Dot', triggerBot: false, autoFire: false, wallbang: false, damage: 150, damageMultiplier: 1, oneShot: false, bulletHitRandom: false, fastReload: false, fastSwitch: false, infiniteAmmo: false, infiniteRange: false, noRecoil: false, noSpread: false, noPunch: false, fireRate: false, noAbilityCooldown: false, statTrak: false, nameTag: false, sticker: false, float: 0, pattern: 0, wear: 'Factory New', quality: 'Normal', autoBuy: false, autoPistol: false },
        visuals: { noFlash: false, noSmoke: false, transparentShield: false, fullbright: false, noScope: false, fovChanger: 90, chams: false, chamsColor: '#FF0033', chamsWireframe: false, handsChams: false, handsColor: '#FF0033', playerVisibleColor: '#00FF00', glow: false, glowColor: '#FF0033', globalEsp: false, boxEsp: false, boxThickness: 6, boxColor: '#FF0033', boxRainbow: false, cornerBoxEsp: false, cornerBoxThickness: 7.1, cornerBoxColor: '#FF0033', skeletonEsp: false, skeletonThickness: 9.3, skeletonColor: '#0033FF', filledBoxEsp: false, filledBoxColor: '#880000', tracerEsp: false, tracerThickness: 2, tracerColor: '#FF0033', tracerFrom: 'Bottom', tracerTo: 'Head', bulletTracer: false, grenadeTracer: false, grenadePrediction: false, nameEsp: false, nameSize: 16, nameColor: '#FFFFFF', healthBar: false, healthText: false, distanceEsp: false, distanceColor: '#FFFFFF', gunEsp: false, ammoEsp: false, armorBar: false, flags: false, radar: false },
        skinchanger: { enabled: false, mode: 'CS2', ak47: 'Default', m4a4: 'Default', m4a1s: 'Default', awp: 'Default', deagle: 'Default', usps: 'Default', glock: 'Default', solidColor: '#FF0033', rainbow: false, metallic: 0, glow: false, knifeEnabled: false, knifeType: 'Default', knifeSkin: 'Default', gloveEnabled: false, gloveType: 'Default', agentEnabled: false, agentType: 'Default', cs2Style: true, statTrak: false, nameTag: false, sticker: false, float: 0, pattern: 0 },
        butterfly: { enabled: false, speed: 3, color: '#FF0033', rainbow: false, size: 1, trail: false, trailColor: '#FF0033', model: 'Default', sound: false },
        spin: { enabled: false, speed: 30, axis: 'Y', mode: 'Continuous', onKill: false, onHit: false },
        skybox: { enabled: false, preset: 'Default', color: '#000000', rainbow: false, rotation: 0, brightness: 100 },
        customModel: { enabled: false, catalog: 'Default', scale: 1, rotation: 0, offsetX: 0, offsetY: 0, rainbow: false, wireframe: false },
        customHands: { enabled: false, catalog: 'Default', color: '#FF0033', rainbow: false },
        customWeapon: { enabled: false, catalog: 'Default', skin: 'Default', rainbow: false },
        grenade: { direction: false, dirStyle: 'Arrow', dirColor: '#FF0033', dirThickness: 3, dirFade: false, magnet: false, magnetMode: 'Auto', magnetFov: 90, magnetStrength: 50, magnetPriority: 'Nearest', magnetVisible: true, magnetPrediction: true },
        watermark: { enabled: true, text: 'Hribok | User', position: 'Top-Right', color: '#FF0033', size: 14, rainbow: false, tagEnabled: true, tagMode: 'Everyone', tagColor: '#FF0033' },
        unique: { ai: false, cloud: false, stats: false, replay: false, highlights: false, api: false, marketplace: false, butterfly: false },
        effects: { killEffect: false, killEffectType: 'Explosion', hitEffect: false, hitEffectType: 'Spark', killSoundPack: 'Default', hitSoundPack: 'Default', crosshair: false, crosshairStyle: 'Cross', crosshairColor: '#FF0033', crosshairSize: 4, worldParticles: false, trailBehind: false },
        preview: { enabled: true, position: 'Right', size: 300, showPlayer: true, showWeapon: true, autoRotate: true, rotateSpeed: 1 },
        configs: { customs: ['My Config 1', 'My Config 2'] },
        settings: { menuKey: 'P', godmodeKey: 'None', wallbangKey: 'None', chamsKey: 'F', espKey: 'None', loadoutKey: 'None', invisibilityKey: 'None', flyKey: 'None', uiScale: 100, opacity: 95, showWatermark: true, streamProof: false },
    };

    function injectStyles() {
        if (document.getElementById('hribok-styles')) return;
        const style = document.createElement('style');
        style.id = 'hribok-styles';
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            :root {
                --hb-accent: #FF0033; --hb-accent-dim: rgba(255, 0, 51, 0.15); --hb-accent-glow: rgba(255, 0, 51, 0.4);
                --hb-accent-hover: rgba(255, 0, 51, 0.08); --hb-accent-border: rgba(255, 0, 51, 0.1); --hb-accent-border-hover: rgba(255, 0, 51, 0.2);
                --hb-bg: rgba(10, 10, 10, 0.95); --hb-bg-header: rgba(10, 10, 10, 0.6); --hb-bg-sidebar: rgba(5, 5, 5, 0.7);
                --hb-bg-row: rgba(20, 20, 20, 0.7); --hb-bg-row-hover: rgba(24, 24, 24, 0.8); --hb-bg-input: rgba(30, 30, 30, 0.9);
                --hb-text: #E0E0E0; --hb-text-dim: #888; --hb-text-label: #C0C0C0; --hb-text-muted: #666;
            }
            #hribok-root * { box-sizing: border-box; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
            #hribok-root { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 2147483647; }
            
            .hb-menu { position: fixed; width: 780px; height: 560px; background: var(--hb-bg); border: 1px solid var(--hb-accent-border); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px var(--hb-accent-hover); display: flex; overflow: hidden; pointer-events: auto; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); animation: hb-fade-in 0.2s ease-out; }
            @keyframes hb-fade-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
            
            .hb-header { position: absolute; top: 0; left: 0; right: 0; height: 52px; display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid var(--hb-accent-border); background: var(--hb-bg-header); cursor: move; user-select: none; z-index: 10; }
            .hb-logo-box { width: 28px; height: 28px; background: linear-gradient(135deg, var(--hb-accent), #000); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #FFF; font-weight: 700; font-size: 14px; margin-right: 10px; box-shadow: 0 0 16px var(--hb-accent-glow); }
            .hb-logo-text { color: var(--hb-text); font-weight: 600; font-size: 15px; letter-spacing: 0.3px; }
            .hb-version { margin-left: auto; color: var(--hb-text-muted); font-size: 11px; font-weight: 500; }
            .hb-close { margin-left: 16px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; color: var(--hb-text-muted); cursor: pointer; border-radius: 4px; transition: all 0.2s; font-size: 16px; }
            .hb-close:hover { background: var(--hb-accent-dim); color: var(--hb-accent); transform: rotate(90deg); }
            
            .hb-sidebar { 
                width: 200px; 
                background: var(--hb-bg-sidebar); 
                border-right: 1px solid var(--hb-accent-border); 
                padding-top: 68px; 
                display: flex; 
                flex-direction: column; 
                padding: 68px 12px 12px 12px;
                overflow-y: auto; 
                -webkit-overflow-scrolling: touch;
                overscroll-behavior: contain;
            }
            .hb-sidebar::-webkit-scrollbar { width: 4px; }
            .hb-sidebar::-webkit-scrollbar-thumb { background: var(--hb-accent-dim); border-radius: 2px; }
            
            .hb-tab { 
                padding: 12px 16px; 
                color: var(--hb-text-dim); 
                font-size: 13px; 
                font-weight: 600; 
                cursor: pointer; 
                transition: all 0.2s; 
                border-radius: 8px; 
                margin-bottom: 4px; 
                user-select: none; 
                display: flex;
                align-items: center;
                gap: 12px;
                text-transform: uppercase; 
                letter-spacing: 0.5px;
            }
            .hb-tab svg { width: 18px; height: 18px; fill: currentColor; }
            .hb-tab:hover { 
                color: var(--hb-text); 
                background: var(--hb-accent-hover); 
                transform: translateX(4px); 
            }
            .hb-tab.active { 
                color: #FFF; 
                background: var(--hb-accent); 
                box-shadow: 0 4px 15px var(--hb-accent-glow); 
                font-weight: 700;
            }
            
            .hb-content { 
                flex: 1; 
                padding: 68px 24px 24px; 
                overflow-y: auto; 
                overflow-x: hidden; 
                -webkit-overflow-scrolling: touch;
                overscroll-behavior: contain;
            }
            .hb-content::-webkit-scrollbar { width: 6px; }
            .hb-content::-webkit-scrollbar-thumb { background: var(--hb-accent-dim); border-radius: 3px; }
            
            .hb-section-title { color: var(--hb-accent); font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; text-align: center; margin: 18px 0 12px; opacity: 0.9; text-shadow: 0 0 10px var(--hb-accent-glow); }
            
            .hb-row { background: var(--hb-bg-row); border: 1px solid var(--hb-accent-border); border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s; }
            .hb-row:hover { border-color: var(--hb-accent-border-hover); background: var(--hb-bg-row-hover); transform: translateX(2px); box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
            .hb-row-label { color: var(--hb-text-label); font-size: 13px; font-weight: 500; }
            
            .hb-btn { background: linear-gradient(180deg, var(--hb-accent-dim), transparent); border: 1px solid var(--hb-accent-border-hover); color: var(--hb-text); font-size: 12px; font-weight: 600; padding: 8px 16px; border-radius: 6px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.5px; }
            .hb-btn:hover { background: var(--hb-accent); border-color: var(--hb-accent); color: #000; box-shadow: 0 0 15px var(--hb-accent-glow); transform: translateY(-1px); }
            .hb-btn:active { transform: translateY(1px); box-shadow: none; }
            .hb-btn-danger { background: linear-gradient(180deg, rgba(255, 0, 0, 0.2), transparent); border-color: rgba(255, 0, 0, 0.3); }
            .hb-btn-danger:hover { background: #FF0000; border-color: #FF0000; color: #FFF; box-shadow: 0 0 15px rgba(255, 0, 0, 0.5); }
            
            .hb-toggle { width: 44px; height: 24px; background: #1A1A1A; border: 1px solid #333; border-radius: 12px; position: relative; cursor: pointer; transition: all 0.3s; flex-shrink: 0; }
            .hb-toggle.on { background: var(--hb-accent); border-color: var(--hb-accent); box-shadow: 0 0 12px var(--hb-accent-glow); }
            .hb-toggle::after { content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; background: #666; border-radius: 50%; transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
            .hb-toggle.on::after { left: 22px; background: #FFF; }
            
            .hb-slider-wrap { display: flex; align-items: center; gap: 10px; flex-shrink: 0; width: 200px; }
            .hb-slider { -webkit-appearance: none; flex: 1; height: 6px; background: #1A1A1A; border-radius: 3px; outline: none; cursor: pointer; }
            .hb-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; background: var(--hb-accent); border-radius: 50%; cursor: pointer; box-shadow: 0 0 10px var(--hb-accent-glow); transition: transform 0.1s; }
            .hb-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
            .hb-slider-value { min-width: 40px; text-align: center; color: var(--hb-text); font-size: 12px; font-weight: 700; background: var(--hb-accent-dim); border: 1px solid var(--hb-accent-border-hover); border-radius: 4px; padding: 4px 8px; }
            
            .hb-select { background: var(--hb-bg-input); border: 1px solid var(--hb-accent-border); color: var(--hb-text); font-size: 12px; font-weight: 500; padding: 8px 12px; border-radius: 6px; outline: none; cursor: pointer; min-width: 140px; transition: all 0.2s; }
            .hb-select:hover { border-color: var(--hb-accent-border-hover); }
            .hb-select:focus { border-color: var(--hb-accent); box-shadow: 0 0 10px var(--hb-accent-dim); }
            
            .hb-color { width: 32px; height: 24px; border: 1px solid var(--hb-accent-border-hover); border-radius: 6px; cursor: pointer; background: none; transition: all 0.2s; }
            .hb-color:hover { border-color: var(--hb-accent); transform: scale(1.1); box-shadow: 0 0 10px var(--hb-accent-glow); }
            .hb-placeholder { display: flex; align-items: center; justify-content: center; height: 300px; color: var(--hb-text-muted); font-size: 14px; font-weight: 500; }
        `;
        document.head.appendChild(style);
    }

    function createMenu() {
        const preact = window.preact, hooks = window.preactHooks, h = preact.h, useState = hooks.useState, useEffect = hooks.useEffect, useRef = hooks.useRef, Fragment = preact.Fragment;
        
        const icons = {
            aimbot: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z',
            player: 'M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z',
            gun: 'M18 4v1h-2V4h-2v1h-2V4H8v3H6v2h12V7h-2V4zm-6 5v4h2v-2h2v-2h-4z',
            visuals: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
            skinchanger: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
            butterfly: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
            spin: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
            skybox: 'M12 2L2 22h20L12 2zm0 3.8L18.2 20H5.8L12 5.8z',
            customModel: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
            customHands: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
            customWeapon: 'M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z',
            grenade: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
            watermark: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
            unique: 'M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z',
            effects: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
            preview: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
            misc: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
            players: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
            configs: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
            settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
            credits: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
        };

        function Menu() {
            const [visible, setVisible] = useState(state.visible), [activeTab, setActiveTab] = useState(state.activeTab), [pos, setPos] = useState({ x: null, y: null }), dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });
            const [, forceUpdate] = useState(0); const setState = () => forceUpdate(x => x + 1);
            useEffect(() => { if (pos.x === null) setPos({ x: Math.floor((window.innerWidth - 780) / 2), y: Math.floor((window.innerHeight - 560) / 2) }); }, []);
            useEffect(() => { const onKey = (e) => { if (e.key.toUpperCase() === state.settings.menuKey.toUpperCase()) { e.preventDefault(); state.visible = !state.visible; setVisible(state.visible); } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, []);
            const onMouseDown = (e) => { dragRef.current.dragging = true; dragRef.current.offsetX = e.clientX - pos.x; dragRef.current.offsetY = e.clientY - pos.y; e.preventDefault(); };
            useEffect(() => {
                const onMouseMove = (e) => { if (dragRef.current.dragging) setPos({ x: Math.max(0, Math.min(window.innerWidth - 780, e.clientX - dragRef.current.offsetX)), y: Math.max(0, Math.min(window.innerHeight - 560, e.clientY - dragRef.current.offsetY)) }); };
                const onMouseUp = () => { dragRef.current.dragging = false; };
                window.addEventListener('mousemove', onMouseMove); window.addEventListener('mouseup', onMouseUp);
                return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); };
            }, [pos]);
            if (!visible) return null;
            const T = window.HribokTabs || {};
            const tabs = [
                { id: 'aimbot', label: 'Aimbot', comp: T.AimbotTab, icon: icons.aimbot }, { id: 'player', label: 'Player', comp: T.PlayerTab, icon: icons.player },
                { id: 'gun', label: 'Gun', comp: T.GunTab, icon: icons.gun }, { id: 'visuals', label: 'Visuals', comp: T.VisualsTab, icon: icons.visuals },
                { id: 'skinchanger', label: 'Skinchanger', comp: T.SkinchangerTab, icon: icons.skinchanger }, { id: 'butterfly', label: 'Butterfly', comp: T.ButterflyTab, icon: icons.butterfly },
                { id: 'spin', label: 'Spin', comp: T.SpinTab, icon: icons.spin }, { id: 'skybox', label: 'Skybox', comp: T.SkyboxTab, icon: icons.skybox },
                { id: 'customModel', label: 'Custom Model', comp: T.CustomModelTab, icon: icons.customModel }, { id: 'customHands', label: 'Custom Hands', comp: T.CustomHandsTab, icon: icons.customHands },
                { id: 'customWeapon', label: 'Custom Weapon', comp: T.CustomWeaponTab, icon: icons.customWeapon }, { id: 'grenade', label: 'Grenade', comp: T.GrenadeTab, icon: icons.grenade },
                { id: 'watermark', label: 'Watermark', comp: T.WatermarkTab, icon: icons.watermark }, { id: 'unique', label: 'Hribok Unique', comp: T.UniqueTab, icon: icons.unique },
                { id: 'effects', label: 'Effects', comp: T.EffectsTab, icon: icons.effects }, { id: 'preview', label: 'Preview', comp: T.PreviewTab, icon: icons.preview },
                { id: 'misc', label: 'Misc', comp: T.MiscTab, icon: icons.misc }, { id: 'players', label: 'Players', comp: T.PlayersTab, icon: icons.players },
                { id: 'configs', label: 'Configs', comp: T.ConfigsTab, icon: icons.configs }, { id: 'settings', label: 'Settings', comp: T.SettingsTab, icon: icons.settings }, { id: 'credits', label: 'Credits', comp: T.CreditsTab, icon: icons.credits },
            ];
            const ActiveComp = tabs.find(t => t.id === activeTab)?.comp;
            const setTab = (id) => { state.activeTab = id; setActiveTab(id); };
            const PreviewWindow = window.HribokPreview?.PreviewWindow;
            return h(Fragment, null, [
                h('div', { key: 'menu', class: 'hb-menu', style: 'left:' + pos.x + 'px;top:' + pos.y + 'px;' }, [
                    h('div', { key: 'h', class: 'hb-header', onMouseDown }, h('div', { class: 'hb-logo-box' }, 'H'), h('div', { class: 'hb-logo-text' }, 'Hribok'), h('div', { class: 'hb-version' }, 'v' + HRIBOK_VERSION), h('div', { class: 'hb-close', onClick: () => { state.visible = false; setVisible(false); } }, '×')),
                    h('div', { key: 's', class: 'hb-sidebar' }, 
                        tabs.map(tab => h('div', { key: tab.id, class: 'hb-tab' + (activeTab === tab.id ? ' active' : ''), onClick: () => setTab(tab.id) }, [
                            h('svg', { viewBox: '0 0 24 24' }, h('path', { d: tab.icon })),
                            h('span', null, tab.label)
                        ]))
                    ),
                    h('div', { key: 'c', class: 'hb-content' }, ActiveComp ? h(ActiveComp, { state: state, setState: setState }) : h('div', { class: 'hb-placeholder' }, 'Tab not found')),
                ]),
                (state.preview.enabled && PreviewWindow) ? h(PreviewWindow, { key: 'preview', state: state, setState: setState }) : null,
            ]);
        }
        return Menu;
    }

    (async () => {
        try {
            log('Initializing on veck.io...');
            await waitForGlobal('UnityWebModkit');
            log('UnityWebModkit detected');

            const ctx = UnityWebModkit.Runtime.createPlugin({
                name: 'Hribok', version: HRIBOK_VERSION,
                referencedAssemblies: [ 'ACTk.Runtime.dll', 'GameAssembly.dll', 'System.Runtime.InteropServices.dll', 'mscorlib.dll', 'PhotonRealtime.dll', 'PhotonUnityNetworking.dll', 'PhotonUnityNetworking.Utilities.dll', 'Assembly-CSharp.dll', 'UnityEngine.CoreModule.dll', 'UnityEngine.PhysicsModule.dll', 'StompyRobot.SRDebugger.dll', 'UnityEngine.IMGUIModule.dll', 'Photon3Unity3D.dll', 'Unity.TextMeshPro.dll', 'FishNet.Runtime.dll', 'UnityEngine.AnimationModule.dll' ],
            });
            window.ctx = ctx;
            window.Hribok = { version: HRIBOK_VERSION, ctx: ctx, modules: {}, state: state };
            log('Plugin created successfully');

            log('Loading Preact...');
            await loadExternalScript('https://unpkg.com/preact@10.19.3/dist/preact.min.js');
            await loadExternalScript('https://unpkg.com/preact@10.19.3/hooks/dist/hooks.umd.js');
            if (!window.preact || !window.preactHooks) throw new Error('Preact failed to load');
            log('Preact loaded');

            log('Loading Three.js...');
            await loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
            if (!window.THREE) throw new Error('Three.js failed to load');
            log('Three.js loaded');

            log('Loading UI modules...');
            await loadScript(BASE + '/scripts/veck_ui_themes.js');
            await loadScript(BASE + '/scripts/veck_ui_components.js');
            await loadScript(BASE + '/scripts/veck_ui_tabs_core.js');
            await loadScript(BASE + '/scripts/veck_ui_tabs_extra.js');
            await loadScript(BASE + '/scripts/veck_ui_tabs_unique.js');
            await loadScript(BASE + '/scripts/veck_ui_tabs_system.js');
            await loadScript(BASE + '/scripts/veck_ui_preview.js');
            log('UI modules loaded');

            if (window.HribokTheme) window.HribokTheme.apply(localStorage.getItem('hribok-theme') || 'red');
            injectStyles();

            let root = document.getElementById('hribok-root');
            if (!root) { root = document.createElement('div'); root.id = 'hribok-root'; document.body.appendChild(root); }

            const Menu = createMenu();
            window.preact.render(window.preact.h(Menu), root);

            log('UI rendered. Press ' + state.settings.menuKey + ' to toggle menu.');
        } catch (e) { err('Init failed:', e); }
    })();
})();