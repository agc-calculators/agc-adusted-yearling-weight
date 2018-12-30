/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface AgcAdjustedYearlingWeightProgress {
    'socket': string;
  }
  interface AgcAdjustedYearlingWeightProgressAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcAdjustedYearlingWeightResultsPlaceholder {}
  interface AgcAdjustedYearlingWeightResultsPlaceholderAttributes extends StencilHTMLAttributes {}

  interface AgcAdjustedYearlingWeightResults {
    'socket': string;
  }
  interface AgcAdjustedYearlingWeightResultsAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcAdjustedYearlingWeight {
    'mode': 'full' | 'step';
    'socket': string;
    'tract': string;
    'units': any;
  }
  interface AgcAdjustedYearlingWeightAttributes extends StencilHTMLAttributes {
    'mode'?: 'full' | 'step';
    'onAgcCalculated'?: (event: CustomEvent) => void;
    'onAgcStepChanged'?: (event: CustomEvent) => void;
    'socket'?: string;
    'tract'?: string;
    'units'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AgcAdjustedYearlingWeightProgress': Components.AgcAdjustedYearlingWeightProgress;
    'AgcAdjustedYearlingWeightResultsPlaceholder': Components.AgcAdjustedYearlingWeightResultsPlaceholder;
    'AgcAdjustedYearlingWeightResults': Components.AgcAdjustedYearlingWeightResults;
    'AgcAdjustedYearlingWeight': Components.AgcAdjustedYearlingWeight;
  }

  interface StencilIntrinsicElements {
    'agc-adjusted-yearling-weight-progress': Components.AgcAdjustedYearlingWeightProgressAttributes;
    'agc-adjusted-yearling-weight-results-placeholder': Components.AgcAdjustedYearlingWeightResultsPlaceholderAttributes;
    'agc-adjusted-yearling-weight-results': Components.AgcAdjustedYearlingWeightResultsAttributes;
    'agc-adjusted-yearling-weight': Components.AgcAdjustedYearlingWeightAttributes;
  }


  interface HTMLAgcAdjustedYearlingWeightProgressElement extends Components.AgcAdjustedYearlingWeightProgress, HTMLStencilElement {}
  var HTMLAgcAdjustedYearlingWeightProgressElement: {
    prototype: HTMLAgcAdjustedYearlingWeightProgressElement;
    new (): HTMLAgcAdjustedYearlingWeightProgressElement;
  };

  interface HTMLAgcAdjustedYearlingWeightResultsPlaceholderElement extends Components.AgcAdjustedYearlingWeightResultsPlaceholder, HTMLStencilElement {}
  var HTMLAgcAdjustedYearlingWeightResultsPlaceholderElement: {
    prototype: HTMLAgcAdjustedYearlingWeightResultsPlaceholderElement;
    new (): HTMLAgcAdjustedYearlingWeightResultsPlaceholderElement;
  };

  interface HTMLAgcAdjustedYearlingWeightResultsElement extends Components.AgcAdjustedYearlingWeightResults, HTMLStencilElement {}
  var HTMLAgcAdjustedYearlingWeightResultsElement: {
    prototype: HTMLAgcAdjustedYearlingWeightResultsElement;
    new (): HTMLAgcAdjustedYearlingWeightResultsElement;
  };

  interface HTMLAgcAdjustedYearlingWeightElement extends Components.AgcAdjustedYearlingWeight, HTMLStencilElement {}
  var HTMLAgcAdjustedYearlingWeightElement: {
    prototype: HTMLAgcAdjustedYearlingWeightElement;
    new (): HTMLAgcAdjustedYearlingWeightElement;
  };

  interface HTMLElementTagNameMap {
    'agc-adjusted-yearling-weight-progress': HTMLAgcAdjustedYearlingWeightProgressElement
    'agc-adjusted-yearling-weight-results-placeholder': HTMLAgcAdjustedYearlingWeightResultsPlaceholderElement
    'agc-adjusted-yearling-weight-results': HTMLAgcAdjustedYearlingWeightResultsElement
    'agc-adjusted-yearling-weight': HTMLAgcAdjustedYearlingWeightElement
  }

  interface ElementTagNameMap {
    'agc-adjusted-yearling-weight-progress': HTMLAgcAdjustedYearlingWeightProgressElement;
    'agc-adjusted-yearling-weight-results-placeholder': HTMLAgcAdjustedYearlingWeightResultsPlaceholderElement;
    'agc-adjusted-yearling-weight-results': HTMLAgcAdjustedYearlingWeightResultsElement;
    'agc-adjusted-yearling-weight': HTMLAgcAdjustedYearlingWeightElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
