<script lang="ts">
  import { VegaLite, type VisualizationSpec } from "svelte-vega";
  import { DATASET, type MonthlyRidership } from "#lib/ridership.js";

  interface Props {
    spec: VisualizationSpec;
    ridership: MonthlyRidership[];
  }

  const { spec, ridership }: Props = $props();

  const data = $derived({ [DATASET]: ridership });
</script>

<!-- The specs size to this container, so the page reserves the chart's space before it renders. -->
<VegaLite
  {spec}
  {data}
  options={{ actions: false, renderer: "svg" }}
  style="width: 100%; height: 300px"
/>
