/**
 * Hribok UI — Tabs: System
 * Players, Configs, Settings, Credits
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
        window.HribokTabs.PlayersTab = PlayersTab;
        window.HribokTabs.ConfigsTab = ConfigsTab;
        window.HribokTabs.SettingsTab = SettingsTab;
        window.HribokTabs.CreditsTab = CreditsTab;

        console.log('[Hribok] System tabs loaded');
    }

    // ============================================================
    // PLAYERS
    // ============================================================
    function PlayersTab({ state, setState }) {
        const players = [
            { name: 'You', hp: 100, tag: 'Hr', isFriend: true },
            { name: 'Enemy1', hp: 85, tag: null, isFriend: false },
        ];

        return h('div', null, [
            h(C.SectionTitle, { key: 't' }, 'PLAYERS (' + players.length + ')'),
            ...players.map((p, i) => h('div', {
                key: 'p' + i,
                class: 'hb-row',
                style: 'display:flex;align-items:center;justify-content:space-between;gap:8px;'
            }, [
                h('div', { style: 'display:flex;align-items:center;gap:8px;' }, [
                    h('div', {
                        style: 'width:8px;height:8px;border-radius:50%;background:' + (p.isFriend ? '#00FF88' : '#FF0033') + ';'
                    }),
                    h('div', { style: 'color:var(--hb-text);font-size:13px;font-weight:500;' }, p.name),
                    p.tag ? h('span', {
                        style: 'color:var(--hb-accent);font-size:11px;font-weight:600;background:var(--hb-accent-dim);padding:1px 6px;border-radius:3px;'
                    }, p.tag) : null,
                ]),
            ])),
        ]);
    }

    // ============================================================
    // CONFIGS (18)
    // ============================================================
    function ConfigsTab({ state, setState }) {
        const s = state.configs || (state.configs = {});
        const presets = ['Legit', 'Rage', 'HvH', 'Scout', 'Sniper', 'Visuals Only', 'Farm'];
        const customs = s.customs || ['My Config 1', 'My Config 2'];

        const onSave = () => {
            const name = prompt('Config name:');
            if (!name) return;
            customs.push(name);
            state.configs.customs = customs;
            setState({});
            console.log('[Hribok] Saved config:', name);
        };

        const onDelete = (name) => {
            const idx = customs.indexOf(name);
            if (idx !== -1) {
                customs.splice(idx, 1);
                state.configs.customs = customs;
                setState({});
                console.log('[Hribok] Deleted config:', name);
            }
        };

        return h('div', null, [
            h('div', { style: 'display:flex;gap:8px;margin-bottom:16px;' }, [
                h(C.Button, { label: '+ Save Current', onClick: onSave }),
                h(C.Button, { label: 'Export', onClick: () => console.log('Export') }),
                h(C.Button, { label: 'Import', onClick: () => console.log('Import') }),
            ]),

            h(C.SectionTitle, { key: 't1' }, 'PRESETS'),
            ...presets.map((cfg, i) => h(C.Row, { key: 'c' + i, label: cfg },
                h('div', { style: 'display:flex;gap:6px;' }, [
                    h(C.Button, { label: 'Load', onClick: () => console.log('Load:', cfg) }),
                ])
            )),

            h(C.SectionTitle, { key: 't2' }, 'MY CONFIGS (' + customs.length + ')'),
            ...customs.map((cfg, i) => h(C.Row, { key: 'm' + i, label: cfg },
                h('div', { style: 'display:flex;gap:6px;' }, [
                    h(C.Button, { label: 'Load', onClick: () => console.log('Load:', cfg) }),
                    h(C.Button, { label: 'Delete', variant: 'danger', onClick: () => onDelete(cfg) }),
                ])
            )),

            h(C.SectionTitle, { key: 't3' }, 'ACTIONS'),
            h(C.Row, { key: 'r1', label: 'Reset to default' },
                h(C.Button, { label: 'Reset', variant: 'danger', onClick: () => console.log('Reset') })
            ),
        ]);
    }

    // ============================================================
    // SETTINGS (Оновлено)
    // ============================================================
    function SettingsTab({ state, setState }) {
        const s = state.settings;
        const upd = (k, v) => { state.settings[k] = v; setState({}); };
        const keys = ['None', 'P', 'F', 'G', 'H', 'J', 'K', 'L', 'X', 'C', 'V', 'B', 'N', 'M'];
        
        // Беремо список тем динамічно з HribokTheme
        const themes = window.HribokTheme ? window.HribokTheme.list() : ['red', 'black', 'white', 'purple', 'blue'];

        return h('div', null, [
            h(C.SectionTitle, { key: 't1' }, 'THEME'),
            h(C.Row, { key: 'r0', label: 'Theme' }, h(C.Dropdown, {
                value: state.theme || 'red',
                options: themes,
                onChange: v => {
                    state.theme = v;
                    if (window.HribokTheme) window.HribokTheme.apply(v);
                    setState({});
                }
            })),

            h(C.SectionTitle, { key: 't2' }, 'KEYBINDS'),
            h(C.Row, { key: 'r1', label: 'Menu Toggle Key' }, h(C.Dropdown, { value: s.menuKey, options: keys, onChange: v => upd('menuKey', v) })),
            h(C.Row, { key: 'r2', label: 'Godmode Key' }, h(C.Dropdown, { value: s.godmodeKey, options: keys, onChange: v => upd('godmodeKey', v) })),
            h(C.Row, { key: 'r3', label: 'Wallbang Key' }, h(C.Dropdown, { value: s.wallbangKey, options: keys, onChange: v => upd('wallbangKey', v) })),
            h(C.Row, { key: 'r4', label: 'Chams Key' }, h(C.Dropdown, { value: s.chamsKey, options: keys, onChange: v => upd('chamsKey', v) })),
            h(C.Row, { key: 'r5', label: 'ESP Key' }, h(C.Dropdown, { value: s.espKey, options: keys, onChange: v => upd('espKey', v) })),
            h(C.Row, { key: 'r6', label: 'Fly Key' }, h(C.Dropdown, { value: s.flyKey, options: keys, onChange: v => upd('flyKey', v) })),
        ]);
    }

    // ============================================================
    // CREDITS
    // ============================================================
    function CreditsTab() {
        return h('div', null, [
            h(C.SectionTitle, { key: 't' }, 'CREDITS'),
            h(C.Row, { key: 'r1', label: 'Developer' }, h('span', { style: 'color:var(--hb-text);font-size:13px;' }, 'Hribok')),
            h(C.Row, { key: 'r2', label: 'Framework' }, h('span', { style: 'color:var(--hb-text);font-size:13px;' }, 'UnityWebModkit')),
            h(C.Row, { key: 'r3', label: 'UI Framework' }, h('span', { style: 'color:var(--hb-text);font-size:13px;' }, 'Preact')),
            h(C.Row, { key: 'r4', label: 'Version' }, h('span', { style: 'color:var(--hb-text);font-size:13px;' }, 'v2.0.6')),
            h(C.Row, { key: 'r5', label: 'Discord' },
                h(C.Button, { label: 'Join', onClick: () => window.open('https://discord.gg/hribok4ek', '_blank') })
            ),
        ]);
    }

    // Register
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