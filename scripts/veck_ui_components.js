/**
 * Hribok UI — Components
 * Toggle, Slider, Dropdown, ColorPicker, Row, SectionTitle, Button, Placeholder
 */

(function () {
    'use strict';

    let h = null;

    function init() {
        if (!window.preact) {
            console.error('[Hribok] Preact not loaded, cannot init components');
            return;
        }
        h = window.preact.h;

        window.HribokComponents = {
            h: h,
            Toggle: Toggle,
            Slider: Slider,
            Dropdown: Dropdown,
            ColorPicker: ColorPicker,
            Row: Row,
            SectionTitle: SectionTitle,
            Button: Button,
            Placeholder: Placeholder,
            Group: Group,
        };

        console.log('[Hribok] Components module loaded');
    }

    // ============================================================
    // TOGGLE
    // ============================================================
    function Toggle({ value, onChange }) {
        return h('div', {
            class: 'hb-toggle' + (value ? ' on' : ''),
            onClick: () => onChange(!value)
        });
    }

    // ============================================================
    // SLIDER
    // ============================================================
    function Slider({ value, min, max, step, onChange }) {
        return h('div', { class: 'hb-slider-wrap' }, [
            h('input', {
                type: 'range',
                class: 'hb-slider',
                min: min,
                max: max,
                step: step || 1,
                value: value,
                onInput: (e) => onChange(parseFloat(e.target.value))
            }),
            h('div', { class: 'hb-slider-value' }, value)
        ]);
    }

    // ============================================================
    // DROPDOWN
    // ============================================================
    function Dropdown({ value, options, onChange }) {
        return h('select', {
            class: 'hb-select',
            value: value,
            onChange: (e) => onChange(e.target.value)
        }, options.map(opt => h('option', { value: opt, key: opt }, opt)));
    }

    // ============================================================
    // COLOR PICKER
    // ============================================================
    function ColorPicker({ value, onChange }) {
        return h('input', {
            type: 'color',
            class: 'hb-color',
            value: value,
            onInput: (e) => onChange(e.target.value)
        });
    }

    // ============================================================
    // ROW
    // ============================================================
    function Row({ label, children, key }) {
        return h('div', { class: 'hb-row', key: key }, [
            h('div', { class: 'hb-row-label' }, label),
            children
        ]);
    }

    // ============================================================
    // SECTION TITLE
    // ============================================================
    function SectionTitle({ children }) {
        return h('div', { class: 'hb-section-title' }, children);
    }

    // ============================================================
    // BUTTON
    // ============================================================
    function Button({ label, onClick, variant, style }) {
        const cls = 'hb-btn' + (variant ? ' hb-btn-' + variant : '');
        return h('button', {
            class: cls,
            style: style || '',
            onClick: onClick
        }, label);
    }

    // ============================================================
    // PLACEHOLDER
    // ============================================================
    function Placeholder({ name }) {
        return h('div', { class: 'hb-placeholder' }, name + ' — coming soon');
    }

    // ============================================================
    // GROUP (section with title + children)
    // ============================================================
    function Group({ title, children }) {
        return h('div', { class: 'hb-group' }, [
            h(SectionTitle, { key: 't' }, title),
            ...children
        ]);
    }

})();
