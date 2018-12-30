
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-adjusted-yearling-weight-results-placeholder'
})
export class AgcAdjustedYearlingWeightResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.adjusted-yearling-weight">Adjusted Yearling Weight</h2>
                        {placeholder()}
                    </li>                                      
                </ul>
            </section>
        );
    }
}