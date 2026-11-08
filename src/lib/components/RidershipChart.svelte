<script lang="ts" module>
  import * as stylex from "@stylexjs/stylex";

  const styles = stylex.create({
    container: {
      width: "100%",
      height: "300px",
    },
  });
</script>

<script lang="ts">
  import { page } from "$app/state";
  import { parse, View } from "vega";
  import { expressionInterpreter } from "vega-interpreter";
  import { Handler } from "vega-tooltip";
  import "./vega-tooltip.css";
  import { DATASET, MAX_RIDERS_SIGNAL, type MonthlyRidership } from "#lib/ridership.js";

  interface Props {
    chart: "yearly" | "monthly";
    ridership: MonthlyRidership[];
    /** The monthly chart's y-axis maximum. */
    maxRiders?: number;
  }

  const { chart, ridership, maxRiders }: Props = $props();

  let container: HTMLDivElement;
  let view: View | undefined = $state.raw();

  $effect(() => {
    // The Content-Security-Policy forbids eval, so Vega interprets expressions from their AST
    // rather than compiling them with `new Function`.
    const newView = new View(parse(page.data.chartSpecs[chart], undefined, { ast: true }), {
      container,
      renderer: "svg",
      hover: true,
      expr: expressionInterpreter,
      tooltip: new Handler({ disableDefaultStyle: true }).call,
    });
    view = newView;
    return () => newView.finalize();
  });

  $effect(() => {
    if (!view) return;
    view.data(DATASET, ridership);
    if (maxRiders !== undefined) view.signal(MAX_RIDERS_SIGNAL, maxRiders);
    // Recompute the chart's size for the new data, as svelte-vega did.
    void view.resize().runAsync();
  });
</script>

<!-- The specs size to this container, so the page reserves the chart's space before it renders. -->
<div bind:this={container} {...stylex.attrs(styles.container)}></div>
