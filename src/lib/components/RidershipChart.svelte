<script lang="ts">
  import { page } from "$app/state";
  import { parse, View } from "vega";
  import { Handler } from "vega-tooltip";
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
    const newView = new View(parse(page.data.chartSpecs[chart]), {
      container,
      renderer: "svg",
      hover: true,
      tooltip: new Handler().call,
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
<div bind:this={container} style="width: 100%; height: 300px"></div>
