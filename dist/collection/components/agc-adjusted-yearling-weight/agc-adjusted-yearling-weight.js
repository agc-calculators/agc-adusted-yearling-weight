import { round, validate } from '../../utils';
export class AgcAdjustedYearlingWeight {
    constructor() {
        this.socket = "";
        this.tract = "";
        this.units = { weight: 'lbs' };
        this.mode = 'step';
        this.currentStep = 0;
        this.cache = {};
        this.submitted = false;
        this.results = {};
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: (e) => e.preventDefault(), ref: c => this.form = c, "data-wizard": "agc-adjusted-yearling-weight", "data-wizard-mode": this.mode, class: "agc-wizard" },
                h("slot", null),
                h("section", { "data-wizard-section": "1" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.current-weight" }, "Current Weight"),
                        h("input", { name: "currentWeight", type: "number", required: true, min: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.current-weight.required", "data-validates": "currentWeight" }, "Please enter a value."),
                        h("p", { "data-i18n": `hints.current-weight.${this.units['weight']}` }, "\u2BA4 Enter the current weight in pounds.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16"))),
                h("section", { "data-wizard-section": "2" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.current-age" }, "Current Age"),
                        h("input", { name: "currentAge", type: "number", required: true, min: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.current-age.required", "data-validates": "currentAge" }, "Please enter a value."),
                        h("p", { "data-i18n": "hints.current-age" }, "\u2BA4 Enter the current age in days.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && [
                        h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16")
                    ])),
                h("section", { "data-wizard-section": "3" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.adjusted-weaning-weight" }, "Adjusted Weaning Weight"),
                        h("input", { name: "adjustedWeaningWeight", type: "number", required: true, min: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.adjusted-weaning-weight.required", "data-validates": "adjustedWeaningWeight" }, "Please enter a value."),
                        h("p", { "data-i18n": "hints.adjusted-weaning-weight" }, "\u2BA4 Enter the current weight.")),
                    h("div", { class: "agc-wizard__actions" },
                        this.mode === 'step' && h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.finish", onClick: this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3) }, "Calculate \uD83E\uDC16"))),
                h("section", { "data-wizard-results": true },
                    h("slot", { name: "results" })))));
    }
    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {
            this.cache['sections'][n].style.display = "block";
        }
        if (this.socket) {
            this.agcStepChanged.emit({ socket: this.socket, tract: this.tract, step: this.currentStep });
        }
    }
    reset() {
        this.currentStep = 0;
        this.submitted = false;
        this.showTab(0);
    }
    validateForm() {
        let valid = true;
        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'currentWeight')) {
                valid = false;
            }
        }
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'currentAge')) {
                valid = false;
            }
        }
        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'adjustedWeaningWeight')) {
                valid = false;
            }
        }
        return valid;
    }
    nextPrev(n, e) {
        e && e.preventDefault();
        if (this.mode === 'full') {
            if (!this.validateForm())
                return false;
        }
        else if (n == 1 && !this.validateForm())
            return false;
        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none";
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n;
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true;
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }
    showResults() {
        let currentWeight = parseFloat(this.form.querySelector('[name="currentWeight"').value);
        let currentAge = parseInt(this.form.querySelector('[name="currentAge"]').value);
        let adjustedWeaningWeight = parseFloat(this.form.querySelector('[name="adjustedWeaningWeight"').value);
        let weightDiff = round(currentWeight - adjustedWeaningWeight, 0);
        let ageDiff = currentAge - 205;
        let averageDailyGain = round(weightDiff / ageDiff, 1);
        let adjustedYearlingWeight = (averageDailyGain * 160) + adjustedWeaningWeight;
        let results = {
            socket: this.socket,
            tract: this.tract,
            units: this.units,
            currentWeight,
            currentAge,
            adjustedWeaningWeight,
            weightDiff,
            ageDiff,
            averageDailyGain,
            adjustedYearlingWeight
        };
        if (this.socket) {
            this.agcCalculated.emit({ socket: this.socket, tract: this.tract, results: Object.assign({}, results) });
        }
        this.results = Object.assign({}, results);
        this.cache['results'].forEach(result => {
            result.style.display = 'block';
        });
    }
    handleAction(e) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }
    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c).map(c => c);
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c).map(c => c);
        this.cache = Object.assign({}, this.cache, { sections: sections, results: results });
        window.document.addEventListener('agcAction', this.handleAction.bind(this));
        this.form.querySelector('[name="first"]').defaultValue = 'Yup';
        this.showTab(0);
    }
    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
    static get is() { return "agc-adjusted-yearling-weight"; }
    static get properties() { return {
        "cache": {
            "state": true
        },
        "currentStep": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "results": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "submitted": {
            "state": true
        },
        "tract": {
            "type": String,
            "attr": "tract"
        },
        "units": {
            "type": "Any",
            "attr": "units"
        }
    }; }
    static get events() { return [{
            "name": "agcCalculated",
            "method": "agcCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "agcStepChanged",
            "method": "agcStepChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
