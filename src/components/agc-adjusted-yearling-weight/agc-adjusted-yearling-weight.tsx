
import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { round, validate } from '../../utils'

@Component({
    tag: 'agc-adjusted-yearling-weight'
})
export class AgcAdjustedYearlingWeight {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() units: any = { weight: 'lbs' }
    @Prop() mode: 'full' | 'step' = 'step'
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-adjusted-yearling-weight" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.current-weight">Current Weight</label>
                            <input name="currentWeight" type="number" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.current-weight.required" data-validates="currentWeight">Please enter a value.</p>
                            <p data-i18n={`hints.current-weight.${this.units['weight']}`}>⮤ Enter the current weight in pounds.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>}
                        </div>
                    </section>
                    <section data-wizard-section="2">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.current-age">Current Age</label>
                            <input name="currentAge" type="number" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.current-age.required" data-validates="currentAge">Please enter a value.</p>
                            <p data-i18n="hints.current-age">⮤ Enter the current age in days.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [
                                <button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                                <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="3">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.adjusted-weaning-weight">Adjusted Weaning Weight</label>
                            <input name="adjustedWeaningWeight" type="number" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.adjusted-weaning-weight.required" data-validates="adjustedWeaningWeight">Please enter a value.</p>
                            <p data-i18n="hints.adjusted-weaning-weight">⮤ Enter the current weight.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>}
                            <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3)}>Calculate 🠖</button>
                        </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
        let valid = true;

        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'currentWeight')) {
                valid = false
            }
        }

        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'currentAge')) {
                valid = false
            }
        }

        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'adjustedWeaningWeight')) {
                valid = false
            }
        }        

        return valid;
    }

    nextPrev(n, e) {
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }

    showResults() {
        let currentWeight =  parseFloat((this.form.querySelector('[name="currentWeight"') as HTMLInputElement).value);
        let currentAge = parseInt((this.form.querySelector('[name="currentAge"]') as HTMLInputElement).value);
        let adjustedWeaningWeight = parseFloat((this.form.querySelector('[name="adjustedWeaningWeight"') as HTMLInputElement).value);
        let weightDiff = round(currentWeight - adjustedWeaningWeight, 0)
        let ageDiff = currentAge - 205
        let averageDailyGain = round(weightDiff / ageDiff, 1)
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
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        (this.form.querySelector('[name="first"]') as HTMLInputElement)!.defaultValue = 'Yup';

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}