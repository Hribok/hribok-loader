/**
 * Hribok UI — Tabs: Core
 * Aimbot, Player, Gun, Visuals, Skinchanger
 */

(function () {
    'use strict';

    let h = null;
    let C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;

        window.HribokTabs = window.HribokTabs || {};
        window.HribokTabs.AimbotTab = AimbotTab;
        window.HribokTabs.PlayerTab = PlayerTab;
        window.HribokTabs.GunTab = GunTab;
        window.HribokTabs.VisualsTab = VisualsTab;
        window.HribokTabs.SkinchangerTab = SkinchangerTab;

        console.log('[Hribok] Core tabs loaded');
    }

    // ============================================================
    // AIMBOT (20)
    // ============================================================
    function AimbotTab({ state, setState }) {
        const s = state.aimbot;
        const upd = (k, v) => { state.aimbot[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'AIMBOT'),
            h(C.Row, { key: 'r1', label: 'Aimbot' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Aim Type' }, h(C.Dropdown, { value: s.aimType, options: ['aimbot', 'silent', 'psilent'], onChange: v => upd('aimType', v) })),
            h(C.Row, { key: 'r3', label: 'Aim Target' }, h(C.Dropdown, { value: s.aimTarget, options: ['center', 'nearest', 'lowest hp'], onChange: v => upd('aimTarget', v) })),
            h(C.Row, { key: 'r4', label: 'Target Switch Interval' }, h(C.Slider, { value: s.switchInterval, min: 0, max: 10, step: 1, onChange: v => upd('switchInterval', v) })),
            h(C.Row, { key: 'r5', label: 'Aim Key' }, h(C.Dropdown, { value: s.aimKey, options: ['LeftMouse', 'RightMouse', 'Shift', 'Ctrl', 'Alt'], onChange: v => upd('aimKey', v) })),
            h(C.Row, { key: 'r6', label: 'Aim Speed' }, h(C.Slider, { value: s.aimSpeed, min: 1, max: 20, step: 1, onChange: v => upd('aimSpeed', v) })),
            h(C.Row, { key: 'r7', label: 'Aim Bone' }, h(C.Dropdown, { value: s.aimBone, options: ['Head', 'Neck', 'Chest', 'Pelvis'], onChange: v => upd('aimBone', v) })),
            h(C.Row, { key: 'r8', label: 'FOV' }, h(C.Toggle, { value: s.fov, onChange: v => upd('fov', v) })),
            h(C.Row, { key: 'r9', label: 'FOV Size' }, h(C.Slider, { value: s.fovSize, min: 10, max: 360, step: 1, onChange: v => upd('fovSize', v) })),
            h(C.Row, { key: 'r10', label: 'FOV Color' }, h(C.ColorPicker, { value: s.fovColor, onChange: v => upd('fovColor', v) })),
            h(C.Row, { key: 'r11', label: 'FOV Rainbow' }, h(C.Toggle, { value: s.fovRainbow, onChange: v => upd('fovRainbow', v) })),
            h(C.Row, { key: 'r12', label: 'Sticky Targeting' }, h(C.Toggle, { value: s.stickyTargeting, onChange: v => upd('stickyTargeting', v) })),

            h(C.SectionTitle, { key: 't2' }, 'ADVANCED'),
            h(C.Row, { key: 'r13', label: 'Silent Aim' }, h(C.Toggle, { value: s.silentAim, onChange: v => upd('silentAim', v) })),
            h(C.Row, { key: 'r14', label: 'PSilent' }, h(C.Toggle, { value: s.psilent, onChange: v => upd('psilent', v) })),
            h(C.Row, { key: 'r15', label: 'Hitchance' }, h(C.Slider, { value: s.hitchance, min: 0, max: 100, step: 1, onChange: v => upd('hitchance', v) })),
            h(C.Row, { key: 'r16', label: 'Min Damage' }, h(C.Slider, { value: s.minDamage, min: 1, max: 1000, step: 1, onChange: v => upd('minDamage', v) })),
            h(C.Row, { key: 'r17', label: 'Auto Wall' }, h(C.Toggle, { value: s.autoWall, onChange: v => upd('autoWall', v) })),
            h(C.Row, { key: 'r18', label: 'Backtrack' }, h(C.Toggle, { value: s.backtrack, onChange: v => upd('backtrack', v) })),
            h(C.Row, { key: 'r19', label: 'Visible Check' }, h(C.Toggle, { value: s.visibleCheck, onChange: v => upd('visibleCheck', v) })),
            h(C.Row, { key: 'r20', label: 'Visible Mode' }, h(C.Dropdown, { value: s.visibleMode, options: ['Always', 'Only when visible', 'Through smoke'], onChange: v => upd('visibleMode', v) })),
        ]);
    }

    // ============================================================
    // PLAYER (18)
    // ============================================================
    function PlayerTab({ state, setState }) {
        const s = state.player;
        const upd = (k, v) => { state.player[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'MOVEMENT'),
            h(C.Row, { key: 'r1', label: 'Bhop' }, h(C.Toggle, { value: s.bhop, onChange: v => upd('bhop', v) })),
            h(C.Row, { key: 'r2', label: 'Auto Strafe' }, h(C.Toggle, { value: s.autoStrafe, onChange: v => upd('autoStrafe', v) })),
            h(C.Row, { key: 'r3', label: 'Speed' }, h(C.Slider, { value: s.speed, min: 0, max: 100, step: 1, onChange: v => upd('speed', v) })),
            h(C.Row, { key: 'r4', label: 'Fly' }, h(C.Toggle, { value: s.fly, onChange: v => upd('fly', v) })),
            h(C.Row, { key: 'r5', label: 'Fly Speed' }, h(C.Slider, { value: s.flySpeed, min: 100, max: 5000, step: 50, onChange: v => upd('flySpeed', v) })),
            h(C.Row, { key: 'r6', label: 'No Gravity' }, h(C.Toggle, { value: s.noGravity, onChange: v => upd('noGravity', v) })),

            h(C.SectionTitle, { key: 't2' }, 'PHYSICS'),
            h(C.Row, { key: 'r7', label: 'Slope Angle' }, h(C.Slider, { value: s.slopeAngle, min: 0, max: 90, step: 0.1, onChange: v => upd('slopeAngle', v) })),
            h(C.Row, { key: 'r8', label: 'Step Height' }, h(C.Slider, { value: s.stepHeight, min: 0, max: 5, step: 0.1, onChange: v => upd('stepHeight', v) })),
            h(C.Row, { key: 'r9', label: 'Jump Height' }, h(C.Slider, { value: s.jumpHeight, min: 0, max: 50, step: 1, onChange: v => upd('jumpHeight', v) })),
            h(C.Row, { key: 'r10', label: 'Gravity' }, h(C.Slider, { value: s.gravity, min: -100, max: 0, step: 0.5, onChange: v => upd('gravity', v) })),
            h(C.Row, { key: 'r11', label: 'No Knockback' }, h(C.Toggle, { value: s.noKnockback, onChange: v => upd('noKnockback', v) })),

            h(C.SectionTitle, { key: 't3' }, 'SURVIVAL'),
            h(C.Row, { key: 'r12', label: 'Invisibility' }, h(C.Toggle, { value: s.invisibility, onChange: v => upd('invisibility', v) })),
            h(C.Row, { key: 'r13', label: 'God Mode' }, h(C.Toggle, { value: s.godMode, onChange: v => upd('godMode', v) })),
            h(C.Row, { key: 'r14', label: 'No Fall Damage' }, h(C.Toggle, { value: s.noFallDamage, onChange: v => upd('noFallDamage', v) })),
            h(C.Row, { key: 'r15', label: 'Fake Lag' }, h(C.Toggle, { value: s.fakeLag, onChange: v => upd('fakeLag', v) })),
            h(C.Row, { key: 'r16', label: 'Anti-Aim' }, h(C.Toggle, { value: s.antiAim, onChange: v => upd('antiAim', v) })),
            h(C.Row, { key: 'r17', label: 'Desync' }, h(C.Toggle, { value: s.desync, onChange: v => upd('desync', v) })),
            h(C.Row, { key: 'r18', label: 'Third Person' }, h(C.Toggle, { value: s.thirdPerson, onChange: v => upd('thirdPerson', v) })),
        ]);
    }

    // ============================================================
    // GUN (46)
    // ============================================================
    function GunTab({ state, setState }) {
        const s = state.gun;
        const upd = (k, v) => { state.gun[k] = v; setState({}); };
        const weapons = ['Auto', 'Gun', 'Knife', 'Pistol'];
        const bones = ['Head', 'Neck', 'Chest', 'Body', 'Random'];
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'HOVER TO KILL'),
            h(C.Row, { key: 'r1', label: 'Hover to Kill' }, h(C.Toggle, { value: s.hoverToKill, onChange: v => upd('hoverToKill', v) })),
            h(C.Row, { key: 'r2', label: 'Kill Key' }, h(C.Dropdown, { value: s.killKey, options: ['LeftMouse', 'RightMouse', 'Shift', 'Ctrl', 'Alt'], onChange: v => upd('killKey', v) })),
            h(C.Row, { key: 'r3', label: 'Kill Mode' }, h(C.Dropdown, { value: s.killMode, options: ['Always', 'Only Visible', 'Only When Aiming'], onChange: v => upd('killMode', v) })),
            h(C.Row, { key: 'r4', label: 'Weapon Mode' }, h(C.Dropdown, { value: s.weaponMode, options: weapons, onChange: v => upd('weaponMode', v) })),
            h(C.Row, { key: 'r5', label: 'Auto Distance' }, h(C.Slider, { value: s.autoDistance, min: 100, max: 5000, step: 50, onChange: v => upd('autoDistance', v) })),
            h(C.Row, { key: 'r6', label: 'Knife Distance' }, h(C.Slider, { value: s.knifeDistance, min: 10, max: 200, step: 5, onChange: v => upd('knifeDistance', v) })),
            h(C.Row, { key: 'r7', label: 'Kill Delay Mode' }, h(C.Dropdown, { value: s.killDelayMode, options: ['Off', 'Fixed', 'Random'], onChange: v => upd('killDelayMode', v) })),
            h(C.Row, { key: 'r8', label: 'Kill Delay Min (ms)' }, h(C.Slider, { value: s.killDelayMin, min: 0, max: 500, step: 10, onChange: v => upd('killDelayMin', v) })),
            h(C.Row, { key: 'r9', label: 'Kill Delay Max (ms)' }, h(C.Slider, { value: s.killDelayMax, min: 0, max: 500, step: 10, onChange: v => upd('killDelayMax', v) })),
            h(C.Row, { key: 'r10', label: 'Aim Bone' }, h(C.Dropdown, { value: s.aimBone, options: bones, onChange: v => upd('aimBone', v) })),
            h(C.Row, { key: 'r11', label: 'Bone Random Chance (%)' }, h(C.Slider, { value: s.boneRandomChance, min: 0, max: 100, step: 1, onChange: v => upd('boneRandomChance', v) })),
            h(C.Row, { key: 'r12', label: 'Visible Check' }, h(C.Toggle, { value: s.visibleCheck, onChange: v => upd('visibleCheck', v) })),
            h(C.Row, { key: 'r13', label: 'Through Smoke' }, h(C.Toggle, { value: s.throughSmoke, onChange: v => upd('throughSmoke', v) })),
            h(C.Row, { key: 'r14', label: 'Through Wall' }, h(C.Toggle, { value: s.throughWall, onChange: v => upd('throughWall', v) })),
            h(C.Row, { key: 'r15', label: 'Miss Chance (%)' }, h(C.Slider, { value: s.missChance, min: 0, max: 30, step: 1, onChange: v => upd('missChance', v) })),
            h(C.Row, { key: 'r16', label: 'Miss Spread' }, h(C.Slider, { value: s.missSpread, min: 0, max: 10, step: 0.5, onChange: v => upd('missSpread', v) })),
            h(C.Row, { key: 'r17', label: 'Tap Fire' }, h(C.Toggle, { value: s.tapFire, onChange: v => upd('tapFire', v) })),
            h(C.Row, { key: 'r18', label: 'Burst Fire' }, h(C.Toggle, { value: s.burstFire, onChange: v => upd('burstFire', v) })),
            h(C.Row, { key: 'r19', label: 'Show Indicator' }, h(C.Toggle, { value: s.showIndicator, onChange: v => upd('showIndicator', v) })),
            h(C.Row, { key: 'r20', label: 'Indicator Color' }, h(C.ColorPicker, { value: s.indicatorColor, onChange: v => upd('indicatorColor', v) })),
            h(C.Row, { key: 'r21', label: 'Indicator Style' }, h(C.Dropdown, { value: s.indicatorStyle, options: ['Dot', 'Cross', 'Text'], onChange: v => upd('indicatorStyle', v) })),

            h(C.SectionTitle, { key: 't2' }, 'COMBAT'),
            h(C.Row, { key: 'r22', label: 'Trigger Bot' }, h(C.Toggle, { value: s.triggerBot, onChange: v => upd('triggerBot', v) })),
            h(C.Row, { key: 'r23', label: 'Auto Fire' }, h(C.Toggle, { value: s.autoFire, onChange: v => upd('autoFire', v) })),
            h(C.Row, { key: 'r24', label: 'WallBang' }, h(C.Toggle, { value: s.wallbang, onChange: v => upd('wallbang', v) })),
            h(C.Row, { key: 'r25', label: 'Damage' }, h(C.Slider, { value: s.damage, min: 1, max: 1000, step: 1, onChange: v => upd('damage', v) })),
            h(C.Row, { key: 'r26', label: 'Damage Multiplier' }, h(C.Slider, { value: s.damageMultiplier, min: 1, max: 10, step: 0.1, onChange: v => upd('damageMultiplier', v) })),
            h(C.Row, { key: 'r27', label: 'One Shot' }, h(C.Toggle, { value: s.oneShot, onChange: v => upd('oneShot', v) })),
            h(C.Row, { key: 'r28', label: 'Bullet Hit Random' }, h(C.Toggle, { value: s.bulletHitRandom, onChange: v => upd('bulletHitRandom', v) })),
            h(C.Row, { key: 'r29', label: 'Hover to Kill' }, h(C.Toggle, { value: s.hoverToKill, onChange: v => upd('hoverToKill', v) })),

            h(C.SectionTitle, { key: 't3' }, 'HANDLING'),
            h(C.Row, { key: 'r30', label: 'Fast Reload' }, h(C.Toggle, { value: s.fastReload, onChange: v => upd('fastReload', v) })),
            h(C.Row, { key: 'r31', label: 'Fast Switch' }, h(C.Toggle, { value: s.fastSwitch, onChange: v => upd('fastSwitch', v) })),
            h(C.Row, { key: 'r32', label: 'Infinite Ammo' }, h(C.Toggle, { value: s.infiniteAmmo, onChange: v => upd('infiniteAmmo', v) })),
            h(C.Row, { key: 'r33', label: 'Infinite Range' }, h(C.Toggle, { value: s.infiniteRange, onChange: v => upd('infiniteRange', v) })),
            h(C.Row, { key: 'r34', label: 'No Recoil' }, h(C.Toggle, { value: s.noRecoil, onChange: v => upd('noRecoil', v) })),
            h(C.Row, { key: 'r35', label: 'No Spread' }, h(C.Toggle, { value: s.noSpread, onChange: v => upd('noSpread', v) })),
            h(C.Row, { key: 'r36', label: 'No Punch' }, h(C.Toggle, { value: s.noPunch, onChange: v => upd('noPunch', v) })),
            h(C.Row, { key: 'r37', label: 'Fire Rate' }, h(C.Toggle, { value: s.fireRate, onChange: v => upd('fireRate', v) })),
            h(C.Row, { key: 'r38', label: 'No Ability Cooldown' }, h(C.Toggle, { value: s.noAbilityCooldown, onChange: v => upd('noAbilityCooldown', v) })),

            h(C.SectionTitle, { key: 't4' }, 'CS2 STYLE'),
            h(C.Row, { key: 'r39', label: 'StatTrak' }, h(C.Toggle, { value: s.statTrak, onChange: v => upd('statTrak', v) })),
            h(C.Row, { key: 'r40', label: 'Nametag' }, h(C.Toggle, { value: s.nameTag, onChange: v => upd('nameTag', v) })),
            h(C.Row, { key: 'r41', label: 'Sticker' }, h(C.Toggle, { value: s.sticker, onChange: v => upd('sticker', v) })),
            h(C.Row, { key: 'r42', label: 'Float' }, h(C.Slider, { value: s.float, min: 0, max: 1, step: 0.01, onChange: v => upd('float', v) })),
            h(C.Row, { key: 'r43', label: 'Pattern' }, h(C.Slider, { value: s.pattern, min: 0, max: 1000, step: 1, onChange: v => upd('pattern', v) })),
            h(C.Row, { key: 'r44', label: 'Wear' }, h(C.Dropdown, { value: s.wear, options: ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred'], onChange: v => upd('wear', v) })),
            h(C.Row, { key: 'r45', label: 'Quality' }, h(C.Dropdown, { value: s.quality, options: ['Normal', 'StatTrak', 'Souvenir'], onChange: v => upd('quality', v) })),
            h(C.Row, { key: 'r46', label: 'Auto Buy' }, h(C.Toggle, { value: s.autoBuy, onChange: v => upd('autoBuy', v) })),
        ]);
    }

    // ============================================================
    // VISUALS (35)
    // ============================================================
    function VisualsTab({ state, setState }) {
        const s = state.visuals;
        const upd = (k, v) => { state.visuals[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'UTILITY'),
            h(C.Row, { key: 'r1', label: 'No Flash' }, h(C.Toggle, { value: s.noFlash, onChange: v => upd('noFlash', v) })),
            h(C.Row, { key: 'r2', label: 'No Smoke' }, h(C.Toggle, { value: s.noSmoke, onChange: v => upd('noSmoke', v) })),
            h(C.Row, { key: 'r3', label: 'Transparent Shield' }, h(C.Toggle, { value: s.transparentShield, onChange: v => upd('transparentShield', v) })),
            h(C.Row, { key: 'r4', label: 'Fullbright' }, h(C.Toggle, { value: s.fullbright, onChange: v => upd('fullbright', v) })),
            h(C.Row, { key: 'r5', label: 'No Scope' }, h(C.Toggle, { value: s.noScope, onChange: v => upd('noScope', v) })),
            h(C.Row, { key: 'r6', label: 'FOV Changer' }, h(C.Slider, { value: s.fovChanger, min: 60, max: 140, step: 1, onChange: v => upd('fovChanger', v) })),

            h(C.SectionTitle, { key: 't2' }, 'CHAMS'),
            h(C.Row, { key: 'r7', label: 'Chams' }, h(C.Toggle, { value: s.chams, onChange: v => upd('chams', v) })),
            h(C.Row, { key: 'r8', label: 'Chams Color' }, h(C.ColorPicker, { value: s.chamsColor, onChange: v => upd('chamsColor', v) })),
            h(C.Row, { key: 'r9', label: 'Chams Wireframe' }, h(C.Toggle, { value: s.chamsWireframe, onChange: v => upd('chamsWireframe', v) })),
            h(C.Row, { key: 'r10', label: 'Hands Chams' }, h(C.Toggle, { value: s.handsChams, onChange: v => upd('handsChams', v) })),
            h(C.Row, { key: 'r11', label: 'Hands Color' }, h(C.ColorPicker, { value: s.handsColor, onChange: v => upd('handsColor', v) })),
            h(C.Row, { key: 'r12', label: 'Player Visible Color' }, h(C.ColorPicker, { value: s.playerVisibleColor, onChange: v => upd('playerVisibleColor', v) })),
            h(C.Row, { key: 'r13', label: 'Glow' }, h(C.Toggle, { value: s.glow, onChange: v => upd('glow', v) })),
            h(C.Row, { key: 'r14', label: 'Glow Color' }, h(C.ColorPicker, { value: s.glowColor, onChange: v => upd('glowColor', v) })),

            h(C.SectionTitle, { key: 't3' }, 'ESP'),
            h(C.Row, { key: 'r15', label: 'Global ESP' }, h(C.Toggle, { value: s.globalEsp, onChange: v => upd('globalEsp', v) })),
            h(C.Row, { key: 'r16', label: 'Box ESP' }, h(C.Toggle, { value: s.boxEsp, onChange: v => upd('boxEsp', v) })),
            h(C.Row, { key: 'r17', label: 'Box Thickness' }, h(C.Slider, { value: s.boxThickness, min: 1, max: 20, step: 1, onChange: v => upd('boxThickness', v) })),
            h(C.Row, { key: 'r18', label: 'Box Color' }, h(C.ColorPicker, { value: s.boxColor, onChange: v => upd('boxColor', v) })),
            h(C.Row, { key: 'r19', label: 'Box Rainbow' }, h(C.Toggle, { value: s.boxRainbow, onChange: v => upd('boxRainbow', v) })),
            h(C.Row, { key: 'r20', label: 'Corner Box ESP' }, h(C.Toggle, { value: s.cornerBoxEsp, onChange: v => upd('cornerBoxEsp', v) })),
            h(C.Row, { key: 'r21', label: 'Corner Box Thickness' }, h(C.Slider, { value: s.cornerBoxThickness, min: 1, max: 20, step: 0.1, onChange: v => upd('cornerBoxThickness', v) })),
            h(C.Row, { key: 'r22', label: 'Corner Box Color' }, h(C.ColorPicker, { value: s.cornerBoxColor, onChange: v => upd('cornerBoxColor', v) })),
            h(C.Row, { key: 'r23', label: 'Skeleton ESP' }, h(C.Toggle, { value: s.skeletonEsp, onChange: v => upd('skeletonEsp', v) })),
            h(C.Row, { key: 'r24', label: 'Skeleton Thickness' }, h(C.Slider, { value: s.skeletonThickness, min: 1, max: 20, step: 0.1, onChange: v => upd('skeletonThickness', v) })),
            h(C.Row, { key: 'r25', label: 'Skeleton Color' }, h(C.ColorPicker, { value: s.skeletonColor, onChange: v => upd('skeletonColor', v) })),
            h(C.Row, { key: 'r26', label: 'Filled Box ESP' }, h(C.Toggle, { value: s.filledBoxEsp, onChange: v => upd('filledBoxEsp', v) })),
            h(C.Row, { key: 'r27', label: 'Filled Box Color' }, h(C.ColorPicker, { value: s.filledBoxColor, onChange: v => upd('filledBoxColor', v) })),
            h(C.Row, { key: 'r28', label: 'Tracer ESP' }, h(C.Toggle, { value: s.tracerEsp, onChange: v => upd('tracerEsp', v) })),
            h(C.Row, { key: 'r29', label: 'Tracer Thickness' }, h(C.Slider, { value: s.tracerThickness, min: 1, max: 10, step: 1, onChange: v => upd('tracerThickness', v) })),
            h(C.Row, { key: 'r30', label: 'Tracer Color' }, h(C.ColorPicker, { value: s.tracerColor, onChange: v => upd('tracerColor', v) })),
            h(C.Row, { key: 'r31', label: 'Tracer From' }, h(C.Dropdown, { value: s.tracerFrom, options: ['Center', 'Bottom', 'Top'], onChange: v => upd('tracerFrom', v) })),
            h(C.Row, { key: 'r32', label: 'Tracer To' }, h(C.Dropdown, { value: s.tracerTo, options: ['Head', 'Chest', 'Pelvis'], onChange: v => upd('tracerTo', v) })),
            h(C.Row, { key: 'r33', label: 'Bullet Tracer' }, h(C.Toggle, { value: s.bulletTracer, onChange: v => upd('bulletTracer', v) })),
            h(C.Row, { key: 'r34', label: 'Grenade Tracer' }, h(C.Toggle, { value: s.grenadeTracer, onChange: v => upd('grenadeTracer', v) })),
            h(C.Row, { key: 'r35', label: 'Grenade Prediction' }, h(C.Toggle, { value: s.grenadePrediction, onChange: v => upd('grenadePrediction', v) })),

            h(C.SectionTitle, { key: 't4' }, 'PLAYER INFO'),
            h(C.Row, { key: 'r36', label: 'Name ESP' }, h(C.Toggle, { value: s.nameEsp, onChange: v => upd('nameEsp', v) })),
            h(C.Row, { key: 'r37', label: 'Name Size' }, h(C.Slider, { value: s.nameSize, min: 8, max: 32, step: 1, onChange: v => upd('nameSize', v) })),
            h(C.Row, { key: 'r38', label: 'Name Color' }, h(C.ColorPicker, { value: s.nameColor, onChange: v => upd('nameColor', v) })),
            h(C.Row, { key: 'r39', label: 'Health Bar' }, h(C.Toggle, { value: s.healthBar, onChange: v => upd('healthBar', v) })),
            h(C.Row, { key: 'r40', label: 'Health Text' }, h(C.Toggle, { value: s.healthText, onChange: v => upd('healthText', v) })),
            h(C.Row, { key: 'r41', label: 'Distance ESP' }, h(C.Toggle, { value: s.distanceEsp, onChange: v => upd('distanceEsp', v) })),
            h(C.Row, { key: 'r42', label: 'Distance Color' }, h(C.ColorPicker, { value: s.distanceColor, onChange: v => upd('distanceColor', v) })),
            h(C.Row, { key: 'r43', label: 'Gun ESP' }, h(C.Toggle, { value: s.gunEsp, onChange: v => upd('gunEsp', v) })),
            h(C.Row, { key: 'r44', label: 'Ammo ESP' }, h(C.Toggle, { value: s.ammoEsp, onChange: v => upd('ammoEsp', v) })),
            h(C.Row, { key: 'r45', label: 'Armor Bar' }, h(C.Toggle, { value: s.armorBar, onChange: v => upd('armorBar', v) })),
            h(C.Row, { key: 'r46', label: 'Flags' }, h(C.Toggle, { value: s.flags, onChange: v => upd('flags', v) })),
            h(C.Row, { key: 'r47', label: 'Radar' }, h(C.Toggle, { value: s.radar, onChange: v => upd('radar', v) })),
        ]);
    }

    // ============================================================
    // SKINCHANGER (26)
    // ============================================================
    function SkinchangerTab({ state, setState }) {
        const s = state.skinchanger || (state.skinchanger = {});
        const upd = (k, v) => { state.skinchanger[k] = v; setState({}); };
        const skins = ['Default', 'Redline', 'Asiimov', 'Dragon Lore', 'Howl', 'Hyper Beast', 'Fade', 'Doppler', 'Case Hardened', 'Neon Rider', 'Wild Lotus'];
        const knives = ['Default', 'Karambit', 'Butterfly', 'M9', 'Bayonet', 'Flip', 'Gut', 'Huntsman', 'Falchion', 'Bowie', 'Shadow Daggers'];
        const gloves = ['Default', 'Sport', 'Specialist', 'Driver', 'Moto', 'Hand Wraps', 'Hydra', 'Broken Fang', 'Bloodhound'];
        const agents = ['Default', 'Custom 1', 'Custom 2'];

        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'WEAPON SKINS'),
            h(C.Row, { key: 'r1', label: 'Skin Changer' }, h(C.Toggle, { value: s.enabled, onChange: v => upd('enabled', v) })),
            h(C.Row, { key: 'r2', label: 'Skin Mode' }, h(C.Dropdown, { value: s.mode, options: ['Original', 'Solid', 'Custom', 'CS2', 'Default'], onChange: v => upd('mode', v) })),
            h(C.Row, { key: 'r3', label: 'AK-47' }, h(C.Dropdown, { value: s.ak47, options: skins, onChange: v => upd('ak47', v) })),
            h(C.Row, { key: 'r4', label: 'M4A4' }, h(C.Dropdown, { value: s.m4a4, options: skins, onChange: v => upd('m4a4', v) })),
            h(C.Row, { key: 'r5', label: 'M4A1-S' }, h(C.Dropdown, { value: s.m4a1s, options: skins, onChange: v => upd('m4a1s', v) })),
            h(C.Row, { key: 'r6', label: 'AWP' }, h(C.Dropdown, { value: s.awp, options: skins, onChange: v => upd('awp', v) })),
            h(C.Row, { key: 'r7', label: 'Deagle' }, h(C.Dropdown, { value: s.deagle, options: skins, onChange: v => upd('deagle', v) })),
            h(C.Row, { key: 'r8', label: 'USP-S' }, h(C.Dropdown, { value: s.usps, options: skins, onChange: v => upd('usps', v) })),
            h(C.Row, { key: 'r9', label: 'Glock' }, h(C.Dropdown, { value: s.glock, options: skins, onChange: v => upd('glock', v) })),
            h(C.Row, { key: 'r10', label: 'Solid Color' }, h(C.ColorPicker, { value: s.solidColor || '#FF0033', onChange: v => upd('solidColor', v) })),
            h(C.Row, { key: 'r11', label: 'Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => upd('rainbow', v) })),
            h(C.Row, { key: 'r12', label: 'Metallic' }, h(C.Slider, { value: s.metallic, min: 0, max: 100, step: 1, onChange: v => upd('metallic', v) })),
            h(C.Row, { key: 'r13', label: 'Glow' }, h(C.Toggle, { value: s.glow, onChange: v => upd('glow', v) })),
            h(C.Row, { key: 'r14', label: 'Upload Custom Skin' }, h(C.Button, { label: 'Upload', onClick: () => console.log('Upload skin') })),

            h(C.SectionTitle, { key: 't2' }, 'KNIFE'),
            h(C.Row, { key: 'r15', label: 'Knife Changer' }, h(C.Toggle, { value: s.knifeEnabled, onChange: v => upd('knifeEnabled', v) })),
            h(C.Row, { key: 'r16', label: 'Knife Type' }, h(C.Dropdown, { value: s.knifeType, options: knives, onChange: v => upd('knifeType', v) })),
            h(C.Row, { key: 'r17', label: 'Knife Skin' }, h(C.Dropdown, { value: s.knifeSkin, options: skins, onChange: v => upd('knifeSkin', v) })),

            h(C.SectionTitle, { key: 't3' }, 'GLOVES'),
            h(C.Row, { key: 'r18', label: 'Glove Changer' }, h(C.Toggle, { value: s.gloveEnabled, onChange: v => upd('gloveEnabled', v) })),
            h(C.Row, { key: 'r19', label: 'Glove Type' }, h(C.Dropdown, { value: s.gloveType, options: gloves, onChange: v => upd('gloveType', v) })),

            h(C.SectionTitle, { key: 't4' }, 'AGENT'),
            h(C.Row, { key: 'r20', label: 'Agent Changer' }, h(C.Toggle, { value: s.agentEnabled, onChange: v => upd('agentEnabled', v) })),
            h(C.Row, { key: 'r21', label: 'Agent Type' }, h(C.Dropdown, { value: s.agentType, options: agents, onChange: v => upd('agentType', v) })),

            h(C.SectionTitle, { key: 't5' }, 'CS2 STYLE'),
            h(C.Row, { key: 'r22', label: 'CS2 Style' }, h(C.Toggle, { value: s.cs2Style, onChange: v => upd('cs2Style', v) })),
            h(C.Row, { key: 'r23', label: 'StatTrak' }, h(C.Toggle, { value: s.statTrak, onChange: v => upd('statTrak', v) })),
            h(C.Row, { key: 'r24', label: 'Nametag' }, h(C.Toggle, { value: s.nameTag, onChange: v => upd('nameTag', v) })),
            h(C.Row, { key: 'r25', label: 'Sticker' }, h(C.Toggle, { value: s.sticker, onChange: v => upd('sticker', v) })),
            h(C.Row, { key: 'r26', label: 'Float' }, h(C.Slider, { value: s.float, min: 0, max: 1, step: 0.01, onChange: v => upd('float', v) })),
        ]);
    }

    // Register init
    if (window.HribokComponents) {
        init();
    } else {
        const check = setInterval(() => {
            if (window.HribokComponents) {
                clearInterval(check);
                init();
            }
        }, 50);
    }

})();
