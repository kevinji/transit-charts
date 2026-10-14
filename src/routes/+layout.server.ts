import type { Spec } from "vega";
import { compile, type TopLevelSpec } from "vega-lite";
import { monthlyRidershipSpec, yearlyRidershipSpec } from "#lib/ridership.js";
import type { LayoutServerLoad } from "./$types";

/**
 * Compile a Vega-Lite spec to Vega. The compiled spec contains objects that aren't plain
 * objects, which SvelteKit can't serialize into page data, so it's copied through JSON.
 */
function compileToVega(spec: TopLevelSpec): Spec {
  return JSON.parse(JSON.stringify(compile(spec).spec)) as Spec;
}

// Every page is prerendered, so the Vega-Lite specs are compiled to Vega here at build
// time and the browser only needs the Vega runtime to draw them.
export const load: LayoutServerLoad = () => {
  return {
    chartSpecs: {
      yearly: compileToVega(yearlyRidershipSpec()),
      monthly: compileToVega(monthlyRidershipSpec()),
    },
  };
};
