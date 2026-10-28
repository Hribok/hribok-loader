/**
 * Hribok UI — Components
 */

(function () {
    'use strict';
    let h = null;

    function init() {
        if (!window.preact) return;
        h = window.preact.h;
        window.HribokComponents = { h, Toggle, Slider, Dropdown, ColorPicker, Row, SectionTitle, Button, Placeholder, Group };
        console.log('[Hribok] Components module loaded');
    }

    function Toggle({ value, onChange }) {
        return h('div', { class: 'hb-toggle' + (value ? ' on' : ''), onClick: () => onChange(!value) });
    }
    function Slider({ value, min, max, step, onChange }) {
        return h('div', { class: 'hb-slider-wrap' }, [
            h('input', { type: 'range', class: 'hb-slider', min, max, step: step || 1, value, onInput: e => onChange(parseFloat(e.target.value)) }),
            h('div', { class: 'hb-slider-value' }, value)
        ]);
    }
    function Dropdown({ value, options, onChange }) {
        return h('select', { class: 'hb-select', value, onChange: e => onChange(e.target.value) }, options.map(o => h('option', { value: o, key: o }, o)));
    }
    function ColorPicker({ value, onChange }) {
        return h('input', { type: 'color', class: 'hb-color', value, onInput: e => onChange(e.target.value) });
    }
    function Row({ label, children, key }) {
        return h('div', { class: 'hb-row', key }, [h('div', { class: 'hb-row-label' }, label), children]);
    }
    function SectionTitle({ children }) { return h('div', { class: 'hb-section-title' }, children); }
    function Button({ label, onClick, variant, style }) {
        return h('button', { class: 'hb-btn' + (variant ? ' hb-btn-' + variant : ''), style: style || '', onClick }, label);
    }
    function Placeholder({ name }) { return h('div', { class: 'hb-placeholder' }, name + ' — coming soon'); }
    function Group({ title, children }) { return h('div', { class: 'hb-group' }, [h(SectionTitle, { key: 't' }, title), ...children]); }

    if (window.preact) init();
    else { const c = setInterval(() => { if (window.preact) { clearInterval(c); init(); } }, 50); }
})();