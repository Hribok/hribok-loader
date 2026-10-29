/**
 * Hribok UI — System Tabs: Misc, Players, Configs, Settings, Credits
 */

(function () {
    'use strict';
    let h = null, C = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        C = window.HribokComponents;
        window.HribokTabs = window.HribokTabs || {};
        Object.assign(window.HribokTabs, { MiscTab, PlayersTab, ConfigsTab, SettingsTab, CreditsTab });
        console.log('[Hribok] System tabs loaded');
    }

    function MiscTab({ state, setState }) {
        return h('div', null, [
            h(C.SectionTitle, { key: 'm1' }, 'MISC'),
            h(C.Placeholder, { key: 'm2', name: 'Misc' }),
        ]);
    }

    function PlayersTab({ state, setState }) {
        return h('div', null, [
            h(C.SectionTitle, { key: 'pl1' }, 'PLAYERS'),
            h(C.Placeholder, { key: 'pl2', name: 'Players List' }),
        ]);
    }

    function ConfigsTab({ state, setState }) {
        const s = state.configs;
        return h('div', null, [
            h(C.SectionTitle, { key: 'c1' }, 'CONFIGS'),
            h(C.Row, { key: 'c2', label: 'Config List' }, h(C.Dropdown, { value: s.customs[0], options: s.customs, onChange: v => {} })),
            h(C.Row, { key: 'c3', label: 'Save' }, h(C.Button, { label: 'SAVE', onClick: () => {} })),
            h(C.Row, { key: 'c4', label: 'Load' }, h(C.Button, { label: 'LOAD', onClick: () => {} })),
            h(C.Row, { key: 'c5', label: 'Delete' }, h(C.Button, { label: 'DELETE', variant: 'danger', onClick: () => {} })),
        ]);
    }

    function SettingsTab({ state, setState }) {
        const s = state.settings;
        const u = (k, v) => { s[k] = v; setState({}); };
        return h('div', null, [
            h(C.SectionTitle, { key: 'st1' }, 'GENERAL'),
            h(C.Row, { key: 'st2', label: 'Menu Key' }, h(C.Dropdown, { value: s.menuKey, options: ['P', 'Insert', 'Delete', 'F1', 'F2', 'F3'], onChange: v => u('menuKey', v) })),
            h(C.Row, { key: 'st3', label: 'UI Scale' }, h(C.Slider, { value: s.uiScale, min: 50, max: 150, step: 1, onChange: v => u('uiScale', v) })),
            h(C.Row, { key: 'st4', label: 'Opacity' }, h(C.Slider, { value: s.opacity, min: 50, max: 100, step: 1, onChange: v => u('opacity', v) })),

            h(C.SectionTitle, { key: 'st5' }, 'FEATURES'),
            h(C.Row, { key: 'st6', label: 'Show Watermark' }, h(C.Toggle, { value: s.showWatermark, onChange: v => u('showWatermark', v) })),
            h(C.Row, { key: 'st7', label: 'Stream Proof' }, h(C.Toggle, { value: s.streamProof, onChange: v => u('streamProof', v) })),

            h(C.SectionTitle, { key: 'st8' }, 'KEYBINDS'),
            h(C.Row, { key: 'st9', label: 'Godmode Key' }, h(C.Dropdown, { value: s.godmodeKey, options: ['None', 'V', 'B', 'N', 'G'], onChange: v => u('godmodeKey', v) })),
            h(C.Row, { key: 'st10', label: 'Wallbang Key' }, h(C.Dropdown, { value: s.wallbangKey, options: ['None', 'V', 'B', 'N', 'G'], onChange: v => u('wallbangKey', v) })),
            h(C.Row, { key: 'st11', label: 'Chams Key' }, h(C.Dropdown, { value: s.chamsKey, options: ['None', 'F', 'C', 'X', 'Z'], onChange: v => u('chamsKey', v) })),
            h(C.Row, { key: 'st12', label: 'ESP Key' }, h(C.Dropdown, { value: s.espKey, options: ['None', 'F', 'C', 'X', 'Z'], onChange: v => u('espKey', v) })),
            h(C.Row, { key: 'st13', label: 'Fly Key' }, h(C.Dropdown, { value: s.flyKey, options: ['None', 'F', 'C', 'X', 'Z'], onChange: v => u('flyKey', v) })),
        ]);
    }

    function CreditsTab({ state, setState }) {
        const discordSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>';

        return h('div', null, [
            h(C.SectionTitle, { key: 'cr1' }, 'CREDITS'),
            h('div', { style: 'text-align:center; padding: 30px 20px; color: #E0E0E0; display: flex; flex-direction: column; align-items: center;' }, [
                
                // Логотип
                h('div', { style: 'width: 60px; height: 60px; background: var(--hb-accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 800; color: #000; margin-bottom: 15px; box-shadow: 0 0 30px var(--hb-accent-glow);' }, 'H'),
                h('div', { style: 'font-size: 24px; font-weight: 700; color: var(--hb-accent); margin-bottom: 5px; letter-spacing: 1px;' }, 'Hribok'),
                h('div', { style: 'font-size: 12px; color: #888; margin-bottom: 25px; letter-spacing: 2px; text-transform: uppercase;' }, 'Elite Multi-Game Framework'),
                
                // Developer
                h('div', { style: 'font-size: 14px; margin-bottom: 15px;' }, 
                    'Developer: ', h('span', { style: 'color: var(--hb-accent); font-weight: 600;' }, 'Hribok')
                ),

                // Discord Link
                h('a', { 
                    href: 'https://discord.gg/hribok', 
                    target: '_blank', 
                    style: 'display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: rgba(88, 101, 242, 0.1); border: 1px solid rgba(88, 101, 242, 0.3); border-radius: 8px; color: #5865F2; text-decoration: none; font-weight: 600; font-size: 14px; transition: all 0.2s;' 
                }, [
                    h('span', { dangerouslySetInnerHTML: { __html: discordSvg } }),
                    h('span', null, 'Join Discord')
                ]),

                // Footer
                h('div', { style: 'font-size: 11px; color: #555; margin-top: 40px;' }, 'Version 2.0.9 — All rights reserved'),
            ]),
        ]);
    }

    if (window.HribokComponents) init();
    else { const c = setInterval(() => { if (window.HribokComponents) { clearInterval(c); init(); } }, 50); }
})();