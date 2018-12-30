/*! Built with http://stenciljs.com */
const { h } = window.AgcAdjustedYearlingWeight;

class AgcAdjustedYearlingWeightResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.adjusted-yearling-weight" }, "Adjusted Yearling Weight"),
                    placeholder()))));
    }
    static get is() { return "agc-adjusted-yearling-weight-results-placeholder"; }
}

export { AgcAdjustedYearlingWeightResultsPlaceholder };
