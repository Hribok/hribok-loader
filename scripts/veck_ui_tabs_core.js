/**
 * Hribok UI — Core Tabs: Aimbot, Player, Gun (30), Visuals, Skinchanger
 */

(function () {
    'use strict';
    let h = null, C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;
        window.HribokTabs = window.HribokTabs || {};
        Object.assign(window.HribokTabs, { AimbotTab, PlayerTab, GunTab, VisualsTab, SkinchangerTab });
        console.log('[Hribok] Core tabs loaded');
    }

    function AimbotTab({ state, setState }) {
        const s = state.aimbot;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'a1' }, 'AIMBOT'),
            h(C.Row, { key: 'a2', label: 'Enable Aimbot' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 'a3', label: 'Aim Type' }, h(C.Dropdown, { value: s.aimType, options: ['aimbot', 'silent', 'psilent'], onChange: v => u('aimType', v) })),
            h(C.Row, { key: 'a4', label: 'Aim Target' }, h(C.Dropdown, { value: s.aimTarget, options: ['center', 'head', 'chest'], onChange: v => u('aimTarget', v) })),
            h(C.Row, { key: 'a5', label: 'Aim Key' }, h(C.Dropdown, { value: s.aimKey, options: ['LeftMouse', 'RightMouse', 'Shift', 'Ctrl', 'Alt'], onChange: v => u('aimKey', v) })),
            h(C.Row, { key: 'a6', label: 'Aim Speed' }, h(C.Slider, { value: s.aimSpeed, min: 1, max: 20, step: 0.5, onChange: v => u('aimSpeed', v) })),
            h(C.Row, { key: 'a7', label: 'Aim Bone' }, h(C.Dropdown, { value: s.aimBone, options: ['Head', 'Neck', 'Chest', 'Body', 'Random'], onChange: v => u('aimBone', v) })),
            h(C.Row, { key: 'a8', label: 'Switch Interval' }, h(C.Slider, { value: s.switchInterval, min: 0, max: 1000, step: 50, onChange: v => u('switchInterval', v) })),
            h(C.SectionTitle, { key: 'a9' }, 'FOV'),
            h(C.Row, { key: 'a10', label: 'Show FOV' }, h(C.Toggle, { value: s.fov, onChange: v => u('fov', v) })),
            h(C.Row, { key: 'a11', label: 'FOV Size' }, h(C.Slider, { value: s.fovSize, min: 10, max: 360, step: 5, onChange: v => u('fovSize', v) })),
            h(C.Row, { key: 'a12', label: 'FOV Color' }, h(C.ColorPicker, { value: s.fovColor, onChange: v => u('fovColor', v) })),
            h(C.Row, { key: 'a13', label: 'FOV Rainbow' }, h(C.Toggle, { value: s.fovRainbow, onChange: v => u('fovRainbow', v) })),
            h(C.SectionTitle, { key: 'a14' }, 'TARGETING'),
            h(C.Row, { key: 'a15', label: 'Sticky Targeting' }, h(C.Toggle, { value: s.stickyTargeting, onChange: v => u('stickyTargeting', v) })),
            h(C.Row, { key: 'a16', label: 'Silent Aim' }, h(C.Toggle, { value: s.silentAim, onChange: v => u('silentAim', v) })),
            h(C.Row, { key: 'a17', label: 'PSilent' }, h(C.Toggle, { value: s.psilent, onChange: v => u('psilent', v) })),
            h(C.Row, { key: 'a18', label: 'Hitchance' }, h(C.Slider, { value: s.hitchance, min: 0, max: 100, step: 1, onChange: v => u('hitchance', v) })),
            h(C.Row, { key: 'a19', label: 'Min Damage' }, h(C.Slider, { value: s.minDamage, min: 1, max: 100, step: 1, onChange: v => u('minDamage', v) })),
            h(C.Row, { key: 'a20', label: 'Auto Wall' }, h(C.Toggle, { value: s.autoWall, onChange: v => u('autoWall', v) })),
            h(C.Row, { key: 'a21', label: 'Backtrack' }, h(C.Toggle, { value: s.backtrack, onChange: v => u('backtrack', v) })),
            h(C.Row, { key: 'a22', label: 'Visible Check' }, h(C.Toggle, { value: s.visibleCheck, onChange: v => u('visibleCheck', v) })),
            h(C.Row, { key: 'a23', label: 'Visible Mode' }, h(C.Dropdown, { value: s.visibleMode, options: ['Only when visible', 'Always', 'Only when aiming'], onChange: v => u('visibleMode', v) })),
        ]);
    }

    function PlayerTab({ state, setState }) {
        const s = state.player;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'p1' }, 'MOVEMENT'),
            h(C.Row, { key: 'p2', label: 'Bhop' }, h(C.Toggle, { value: s.bhop, onChange: v => u('bhop', v) })),
            h(C.Row, { key: 'p3', label: 'Auto Strafe' }, h(C.Toggle, { value: s.autoStrafe, onChange: v => u('autoStrafe', v) })),
            h(C.Row, { key: 'p4', label: 'Speed' }, h(C.Slider, { value: s.speed, min: 0, max: 100, step: 1, onChange: v => u('speed', v) })),
            h(C.Row, { key: 'p5', label: 'Fly' }, h(C.Toggle, { value: s.fly, onChange: v => u('fly', v) })),
            h(C.Row, { key: 'p6', label: 'Fly Speed' }, h(C.Slider, { value: s.flySpeed, min: 100, max: 5000, step: 100, onChange: v => u('flySpeed', v) })),
            h(C.Row, { key: 'p7', label: 'No Gravity' }, h(C.Toggle, { value: s.noGravity, onChange: v => u('noGravity', v) })),
            h(C.SectionTitle, { key: 'p8' }, 'PHYSICS'),
            h(C.Row, { key: 'p9', label: 'Slope Angle' }, h(C.Slider, { value: s.slopeAngle, min: 0, max: 90, step: 0.1, onChange: v => u('slopeAngle', v) })),
            h(C.Row, { key: 'p10', label: 'Step Height' }, h(C.Slider, { value: s.stepHeight, min: 0, max: 1, step: 0.01, onChange: v => u('stepHeight', v) })),
            h(C.Row, { key: 'p11', label: 'Jump Height' }, h(C.Slider, { value: s.jumpHeight, min: 1, max: 50, step: 0.5, onChange: v => u('jumpHeight', v) })),
            h(C.Row, { key: 'p12', label: 'Gravity' }, h(C.Slider, { value: s.gravity, min: -100, max: 0, step: 0.5, onChange: v => u('gravity', v) })),
            h(C.Row, { key: 'p13', label: 'No Knockback' }, h(C.Toggle, { value: s.noKnockback, onChange: v => u('noKnockback', v) })),
            h(C.SectionTitle, { key: 'p14' }, 'SURVIVAL'),
            h(C.Row, { key: 'p15', label: 'Invisibility' }, h(C.Toggle, { value: s.invisibility, onChange: v => u('invisibility', v) })),
            h(C.Row, { key: 'p16', label: 'God Mode' }, h(C.Toggle, { value: s.godMode, onChange: v => u('godMode', v) })),
            h(C.Row, { key: 'p17', label: 'No Fall Damage' }, h(C.Toggle, { value: s.noFallDamage, onChange: v => u('noFallDamage', v) })),
            h(C.Row, { key: 'p18', label: 'Fake Lag' }, h(C.Toggle, { value: s.fakeLag, onChange: v => u('fakeLag', v) })),
            h(C.Row, { key: 'p19', label: 'Anti-Aim' }, h(C.Toggle, { value: s.antiAim, onChange: v => u('antiAim', v) })),
            h(C.Row, { key: 'p20', label: 'Desync' }, h(C.Toggle, { value: s.desync, onChange: v => u('desync', v) })),
            h(C.Row, { key: 'p21', label: 'Third Person' }, h(C.Toggle, { value: s.thirdPerson, onChange: v => u('thirdPerson', v) })),
        ]);
    }

    function GunTab({ state, setState }) {
        const s = state.gun;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'g1' }, 'HOVER TO KILL'),
            h(C.Row, { key: 'g2', label: 'Enable Hover to Kill' }, h(C.Toggle, { value: s.hoverToKill, onChange: v => u('hoverToKill', v) })),
            h(C.Row, { key: 'g3', label: 'Kill Key' }, h(C.Dropdown, { value: s.killKey, options: ['LeftMouse', 'RightMouse', 'Shift', 'Ctrl', 'Alt'], onChange: v => u('killKey', v) })),
            h(C.Row, { key: 'g4', label: 'Kill Mode' }, h(C.Dropdown, { value: s.killMode, options: ['Always', 'Only Visible', 'Only When Aiming', 'Smart'], onChange: v => u('killMode', v) })),
            h(C.Row, { key: 'g5', label: 'Weapon Mode' }, h(C.Dropdown, { value: s.weaponMode, options: ['Auto', 'Gun', 'Knife', 'Pistol', 'Gun Only', 'Knife Only'], onChange: v => u('weaponMode', v) })),
            h(C.Row, { key: 'g6', label: 'Auto Distance' }, h(C.Slider, { value: s.autoDistance, min: 100, max: 5000, step: 50, onChange: v => u('autoDistance', v) })),
            h(C.Row, { key: 'g7', label: 'Knife Distance' }, h(C.Slider, { value: s.knifeDistance, min: 10, max: 200, step: 5, onChange: v => u('knifeDistance', v) })),
            h(C.Row, { key: 'g8', label: 'Kill Delay Mode' }, h(C.Dropdown, { value: s.killDelayMode, options: ['Off', 'Fixed', 'Random'], onChange: v => u('killDelayMode', v) })),
            h(C.Row, { key: 'g9', label: 'Kill Delay Min' }, h(C.Slider, { value: s.killDelayMin, min: 0, max: 500, step: 10, onChange: v => u('killDelayMin', v) })),
            h(C.Row, { key: 'g10', label: 'Kill Delay Max' }, h(C.Slider, { value: s.killDelayMax, min: 0, max: 500, step: 10, onChange: v => u('killDelayMax', v) })),
            h(C.SectionTitle, { key: 'g11' }, 'SMART CONDITIONS'),
            h(C.Row, { key: 'g12', label: "Don't Kill With Knife" }, h(C.Toggle, { value: s.dontKillWithKnife, onChange: v => u('dontKillWithKnife', v) })),
            h(C.Row, { key: 'g13', label: 'Knife Only When Close' }, h(C.Toggle, { value: s.knifeOnlyWhenClose, onChange: v => u('knifeOnlyWhenClose', v) })),
            h(C.Row, { key: 'g14', label: 'Skip Knife If Too Far' }, h(C.Toggle, { value: s.skipKnifeIfTooFar, onChange: v => u('skipKnifeIfTooFar', v) })),
            h(C.Row, { key: 'g15', label: 'Kill Only When Visible' }, h(C.Toggle, { value: s.killOnlyWhenVisible, onChange: v => u('killOnlyWhenVisible', v) })),
            h(C.Row, { key: 'g16', label: 'Only When Enemy In FOV' }, h(C.Toggle, { value: s.onlyWhenEnemyInFov, onChange: v => u('onlyWhenEnemyInFov', v) })),
            h(C.Row, { key: 'g17', label: 'Only When Aiming' }, h(C.Toggle, { value: s.onlyWhenAiming, onChange: v => u('onlyWhenAiming', v) })),
            h(C.Row, { key: 'g18', label: 'Only When Enemy Near' }, h(C.Toggle, { value: s.onlyWhenEnemyNear, onChange: v => u('onlyWhenEnemyNear', v) })),
            h(C.Row, { key: 'g19', label: 'Require Hit Chance' }, h(C.Slider, { value: s.requireHitChance, min: 0, max: 100, step: 1, onChange: v => u('requireHitChance', v) })),
            h(C.Row, { key: 'g20', label: 'Smart Weapon Select' }, h(C.Toggle, { value: s.smartWeaponSelect, onChange: v => u('smartWeaponSelect', v) })),
            h(C.Row, { key: 'g21', label: 'Min Damage' }, h(C.Slider, { value: s.minDamageHover, min: 1, max: 100, step: 1, onChange: v => u('minDamageHover', v) })),
            h(C.SectionTitle, { key: 'g22' }, 'BONE / HITBOX'),
            h(C.Row, { key: 'g23', label: 'Aim Bone' }, h(C.Dropdown, { value: s.aimBone, options: ['Head', 'Neck', 'Chest', 'Body', 'Random'], onChange: v => u('aimBone', v) })),
            h(C.Row, { key: 'g24', label: 'Bone Random Chance' }, h(C.Slider, { value: s.boneRandomChance, min: 0, max: 100, step: 1, onChange: v => u('boneRandomChance', v) })),
            h(C.SectionTitle, { key: 'g25' }, 'VISIBILITY'),
            h(C.Row, { key: 'g26', label: 'Visible Check' }, h(C.Toggle, { value: s.visibleCheck, onChange: v => u('visibleCheck', v) })),
            h(C.Row, { key: 'g27', label: 'Through Smoke' }, h(C.Toggle, { value: s.throughSmoke, onChange: v => u('throughSmoke', v) })),
            h(C.Row, { key: 'g28', label: 'Through Wall' }, h(C.Toggle, { value: s.throughWall, onChange: v => u('throughWall', v) })),
            h(C.SectionTitle, { key: 'g29' }, 'RANDOMIZATION'),
            h(C.Row, { key: 'g30', label: 'Miss Chance' }, h(C.Slider, { value: s.missChance, min: 0, max: 30, step: 1, onChange: v => u('missChance', v) })),
            h(C.Row, { key: 'g31', label: 'Miss Spread' }, h(C.Slider, { value: s.missSpread, min: 0, max: 10, step: 0.1, onChange: v => u('missSpread', v) })),
            h(C.Row, { key: 'g32', label: 'Tap Fire' }, h(C.Toggle, { value: s.tapFire, onChange: v => u('tapFire', v) })),
            h(C.Row, { key: 'g33', label: 'Burst Fire' }, h(C.Toggle, { value: s.burstFire, onChange: v => u('burstFire', v) })),
            h(C.SectionTitle, { key: 'g34' }, 'INDICATOR'),
            h(C.Row, { key: 'g35', label: 'Show Indicator' }, h(C.Toggle, { value: s.showIndicator, onChange: v => u('showIndicator', v) })),
            h(C.Row, { key: 'g36', label: 'Indicator Color' }, h(C.ColorPicker, { value: s.indicatorColor, onChange: v => u('indicatorColor', v) })),
            h(C.Row, { key: 'g37', label: 'Indicator Style' }, h(C.Dropdown, { value: s.indicatorStyle, options: ['Dot', 'Cross', 'Text'], onChange: v => u('indicatorStyle', v) })),
            h(C.SectionTitle, { key: 'g38' }, 'GUN MODS'),
            h(C.Row, { key: 'g39', label: 'Trigger Bot' }, h(C.Toggle, { value: s.triggerBot, onChange: v => u('triggerBot', v) })),
            h(C.Row, { key: 'g40', label: 'Auto Fire' }, h(C.Toggle, { value: s.autoFire, onChange: v => u('autoFire', v) })),
            h(C.Row, { key: 'g41', label: 'Wallbang' }, h(C.Toggle, { value: s.wallbang, onChange: v => u('wallbang', v) })),
            h(C.Row, { key: 'g42', label: 'Damage' }, h(C.Slider, { value: s.damage, min: 1, max: 500, step: 1, onChange: v => u('damage', v) })),
            h(C.Row, { key: 'g43', label: 'Damage Multiplier' }, h(C.Slider, { value: s.damageMultiplier, min: 1, max: 10, step: 0.1, onChange: v => u('damageMultiplier', v) })),
            h(C.Row, { key: 'g44', label: 'One Shot' }, h(C.Toggle, { value: s.oneShot, onChange: v => u('oneShot', v) })),
            h(C.Row, { key: 'g45', label: 'Fast Reload' }, h(C.Toggle, { value: s.fastReload, onChange: v => u('fastReload', v) })),
            h(C.Row, { key: 'g46', label: 'Fast Switch' }, h(C.Toggle, { value: s.fastSwitch, onChange: v => u('fastSwitch', v) })),
            h(C.Row, { key: 'g47', label: 'Infinite Ammo' }, h(C.Toggle, { value: s.infiniteAmmo, onChange: v => u('infiniteAmmo', v) })),
            h(C.Row, { key: 'g48', label: 'No Recoil' }, h(C.Toggle, { value: s.noRecoil, onChange: v => u('noRecoil', v) })),
            h(C.Row, { key: 'g49', label: 'No Spread' }, h(C.Toggle, { value: s.noSpread, onChange: v => u('noSpread', v) })),
            h(C.Row, { key: 'g50', label: 'No Punch' }, h(C.Toggle, { value: s.noPunch, onChange: v => u('noPunch', v) })),
        ]);
    }

    function VisualsTab({ state, setState }) {
        const s = state.visuals;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'v1' }, 'SCREEN'),
            h(C.Row, { key: 'v2', label: 'No Flash' }, h(C.Toggle, { value: s.noFlash, onChange: v => u('noFlash', v) })),
            h(C.Row, { key: 'v3', label: 'No Smoke' }, h(C.Toggle, { value: s.noSmoke, onChange: v => u('noSmoke', v) })),
            h(C.Row, { key: 'v4', label: 'Transparent Shield' }, h(C.Toggle, { value: s.transparentShield, onChange: v => u('transparentShield', v) })),
            h(C.Row, { key: 'v5', label: 'Fullbright' }, h(C.Toggle, { value: s.fullbright, onChange: v => u('fullbright', v) })),
            h(C.Row, { key: 'v6', label: 'No Scope' }, h(C.Toggle, { value: s.noScope, onChange: v => u('noScope', v) })),
            h(C.Row, { key: 'v7', label: 'FOV Changer' }, h(C.Slider, { value: s.fovChanger, min: 60, max: 120, step: 1, onChange: v => u('fovChanger', v) })),
            h(C.SectionTitle, { key: 'v8' }, 'CHAMS'),
            h(C.Row, { key: 'v9', label: 'Chams' }, h(C.Toggle, { value: s.chams, onChange: v => u('chams', v) })),
            h(C.Row, { key: 'v10', label: 'Chams Color' }, h(C.ColorPicker, { value: s.chamsColor, onChange: v => u('chamsColor', v) })),
            h(C.Row, { key: 'v11', label: 'Chams Wireframe' }, h(C.Toggle, { value: s.chamsWireframe, onChange: v => u('chamsWireframe', v) })),
            h(C.Row, { key: 'v12', label: 'Hands Chams' }, h(C.Toggle, { value: s.handsChams, onChange: v => u('handsChams', v) })),
            h(C.Row, { key: 'v13', label: 'Hands Color' }, h(C.ColorPicker, { value: s.handsColor, onChange: v => u('handsColor', v) })),
            h(C.Row, { key: 'v14', label: 'Glow' }, h(C.Toggle, { value: s.glow, onChange: v => u('glow', v) })),
            h(C.Row, { key: 'v15', label: 'Glow Color' }, h(C.ColorPicker, { value: s.glowColor, onChange: v => u('glowColor', v) })),
            h(C.SectionTitle, { key: 'v16' }, 'ESP'),
            h(C.Row, { key: 'v17', label: 'Global ESP' }, h(C.Toggle, { value: s.globalEsp, onChange: v => u('globalEsp', v) })),
            h(C.Row, { key: 'v18', label: 'Box ESP' }, h(C.Toggle, { value: s.boxEsp, onChange: v => u('boxEsp', v) })),
            h(C.Row, { key: 'v19', label: 'Box Thickness' }, h(C.Slider, { value: s.boxThickness, min: 1, max: 20, step: 0.1, onChange: v => u('boxThickness', v) })),
            h(C.Row, { key: 'v20', label: 'Box Color' }, h(C.ColorPicker, { value: s.boxColor, onChange: v => u('boxColor', v) })),
            h(C.Row, { key: 'v21', label: 'Box Rainbow' }, h(C.Toggle, { value: s.boxRainbow, onChange: v => u('boxRainbow', v) })),
            h(C.Row, { key: 'v22', label: 'Corner Box' }, h(C.Toggle, { value: s.cornerBoxEsp, onChange: v => u('cornerBoxEsp', v) })),
            h(C.Row, { key: 'v23', label: 'Corner Thickness' }, h(C.Slider, { value: s.cornerBoxThickness, min: 1, max: 20, step: 0.1, onChange: v => u('cornerBoxThickness', v) })),
            h(C.Row, { key: 'v24', label: 'Corner Color' }, h(C.ColorPicker, { value: s.cornerBoxColor, onChange: v => u('cornerBoxColor', v) })),
            h(C.Row, { key: 'v25', label: 'Skeleton ESP' }, h(C.Toggle, { value: s.skeletonEsp, onChange: v => u('skeletonEsp', v) })),
            h(C.Row, { key: 'v26', label: 'Skeleton Thickness' }, h(C.Slider, { value: s.skeletonThickness, min: 1, max: 20, step: 0.1, onChange: v => u('skeletonThickness', v) })),
            h(C.Row, { key: 'v27', label: 'Skeleton Color' }, h(C.ColorPicker, { value: s.skeletonColor, onChange: v => u('skeletonColor', v) })),
            h(C.Row, { key: 'v28', label: 'Filled Box' }, h(C.Toggle, { value: s.filledBoxEsp, onChange: v => u('filledBoxEsp', v) })),
            h(C.Row, { key: 'v29', label: 'Filled Color' }, h(C.ColorPicker, { value: s.filledBoxColor, onChange: v => u('filledBoxColor', v) })),
            h(C.Row, { key: 'v30', label: 'Tracer ESP' }, h(C.Toggle, { value: s.tracerEsp, onChange: v => u('tracerEsp', v) })),
            h(C.Row, { key: 'v31', label: 'Tracer Thickness' }, h(C.Slider, { value: s.tracerThickness, min: 1, max: 10, step: 0.1, onChange: v => u('tracerThickness', v) })),
            h(C.Row, { key: 'v32', label: 'Tracer Color' }, h(C.ColorPicker, { value: s.tracerColor, onChange: v => u('tracerColor', v) })),
            h(C.Row, { key: 'v33', label: 'Tracer From' }, h(C.Dropdown, { value: s.tracerFrom, options: ['Bottom', 'Center', 'Top'], onChange: v => u('tracerFrom', v) })),
            h(C.Row, { key: 'v34', label: 'Tracer To' }, h(C.Dropdown, { value: s.tracerTo, options: ['Head', 'Chest', 'Body'], onChange: v => u('tracerTo', v) })),
            h(C.SectionTitle, { key: 'v35' }, 'INFO'),
            h(C.Row, { key: 'v36', label: 'Name ESP' }, h(C.Toggle, { value: s.nameEsp, onChange: v => u('nameEsp', v) })),
            h(C.Row, { key: 'v37', label: 'Name Size' }, h(C.Slider, { value: s.nameSize, min: 8, max: 32, step: 1, onChange: v => u('nameSize', v) })),
            h(C.Row, { key: 'v38', label: 'Name Color' }, h(C.ColorPicker, { value: s.nameColor, onChange: v => u('nameColor', v) })),
            h(C.Row, { key: 'v39', label: 'Health Bar' }, h(C.Toggle, { value: s.healthBar, onChange: v => u('healthBar', v) })),
            h(C.Row, { key: 'v40', label: 'Health Text' }, h(C.Toggle, { value: s.healthText, onChange: v => u('healthText', v) })),
            h(C.Row, { key: 'v41', label: 'Distance ESP' }, h(C.Toggle, { value: s.distanceEsp, onChange: v => u('distanceEsp', v) })),
            h(C.Row, { key: 'v42', label: 'Distance Color' }, h(C.ColorPicker, { value: s.distanceColor, onChange: v => u('distanceColor', v) })),
            h(C.Row, { key: 'v43', label: 'Gun ESP' }, h(C.Toggle, { value: s.gunEsp, onChange: v => u('gunEsp', v) })),
            h(C.Row, { key: 'v44', label: 'Ammo ESP' }, h(C.Toggle, { value: s.ammoEsp, onChange: v => u('ammoEsp', v) })),
            h(C.Row, { key: 'v45', label: 'Armor Bar' }, h(C.Toggle, { value: s.armorBar, onChange: v => u('armorBar', v) })),
            h(C.Row, { key: 'v46', label: 'Flags' }, h(C.Toggle, { value: s.flags, onChange: v => u('flags', v) })),
            h(C.Row, { key: 'v47', label: 'Radar' }, h(C.Toggle, { value: s.radar, onChange: v => u('radar', v) })),
        ]);
    }

    function SkinchangerTab({ state, setState }) {
        const s = state.skinchanger;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 's1' }, 'SKINCHANGER'),
            h(C.Row, { key: 's2', label: 'Enable' }, h(C.Toggle, { value: s.enabled, onChange: v => u('enabled', v) })),
            h(C.Row, { key: 's3', label: 'Mode' }, h(C.Dropdown, { value: s.mode, options: ['CS2', 'Solid', 'Custom'], onChange: v => u('mode', v) })),
            h(C.SectionTitle, { key: 's4' }, 'WEAPONS'),
            h(C.Row, { key: 's5', label: 'AK-47' }, h(C.Dropdown, { value: s.ak47, options: ['Default', 'Redline', 'Neon Rider', 'Fire Serpent', 'Asiimov'], onChange: v => u('ak47', v) })),
            h(C.Row, { key: 's6', label: 'M4A4' }, h(C.Dropdown, { value: s.m4a4, options: ['Default', 'Howl', 'Asiimov', 'Neon Rider'], onChange: v => u('m4a4', v) })),
            h(C.Row, { key: 's7', label: 'M4A1-S' }, h(C.Dropdown, { value: s.m4a1s, options: ['Default', 'Printstream', 'Hyper Beast'], onChange: v => u('m4a1s', v) })),
            h(C.Row, { key: 's8', label: 'AWP' }, h(C.Dropdown, { value: s.awp, options: ['Default', 'Dragon Lore', 'Asiimov', 'Neo-Noir'], onChange: v => u('awp', v) })),
            h(C.Row, { key: 's9', label: 'Deagle' }, h(C.Dropdown, { value: s.deagle, options: ['Default', 'Blaze', 'Printstream', 'Code Red'], onChange: v => u('deagle', v) })),
            h(C.Row, { key: 's10', label: 'USP-S' }, h(C.Dropdown, { value: s.usps, options: ['Default', 'Kill Confirmed', 'Printstream'], onChange: v => u('usps', v) })),
            h(C.Row, { key: 's11', label: 'Glock' }, h(C.Dropdown, { value: s.glock, options: ['Default', 'Fade', 'Water Elemental'], onChange: v => u('glock', v) })),
            h(C.SectionTitle, { key: 's12' }, 'COLORS'),
            h(C.Row, { key: 's13', label: 'Solid Color' }, h(C.ColorPicker, { value: s.solidColor, onChange: v => u('solidColor', v) })),
            h(C.Row, { key: 's14', label: 'Rainbow' }, h(C.Toggle, { value: s.rainbow, onChange: v => u('rainbow', v) })),
            h(C.Row, { key: 's15', label: 'Metallic' }, h(C.Slider, { value: s.metallic, min: 0, max: 100, step: 1, onChange: v => u('metallic', v) })),
            h(C.Row, { key: 's16', label: 'Glow' }, h(C.Toggle, { value: s.glow, onChange: v => u('glow', v) })),
            h(C.SectionTitle, { key: 's17' }, 'KNIFE'),
            h(C.Row, { key: 's18', label: 'Knife Enabled' }, h(C.Toggle, { value: s.knifeEnabled, onChange: v => u('knifeEnabled', v) })),
            h(C.Row, { key: 's19', label: 'Knife Type' }, h(C.Dropdown, { value: s.knifeType, options: ['Default', 'Karambit', 'Butterfly', 'M9 Bayonet', 'Talon'], onChange: v => u('knifeType', v) })),
            h(C.Row, { key: 's20', label: 'Knife Skin' }, h(C.Dropdown, { value: s.knifeSkin, options: ['Default', 'Doppler', 'Tiger Tooth', 'Fade', 'Marble Fade'], onChange: v => u('knifeSkin', v) })),
            h(C.SectionTitle, { key: 's21' }, 'GLOVES'),
            h(C.Row, { key: 's22', label: 'Glove Enabled' }, h(C.Toggle, { value: s.gloveEnabled, onChange: v => u('gloveEnabled', v) })),
            h(C.Row, { key: 's23', label: 'Glove Type' }, h(C.Dropdown, { value: s.gloveType, options: ['Default', 'Sport', 'Specialist', 'Driver', 'Moto'], onChange: v => u('gloveType', v) })),
            h(C.SectionTitle, { key: 's24' }, 'AGENT'),
            h(C.Row, { key: 's25', label: 'Agent Enabled' }, h(C.Toggle, { value: s.agentEnabled, onChange: v => u('agentEnabled', v) })),
            h(C.Row, { key: 's26', label: 'Agent Type' }, h(C.Dropdown, { value: s.agentType, options: ['Default', 'Sir Bloody Miami Darryl', 'Number K', 'Blueberries'], onChange: v => u('agentType', v) })),
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();