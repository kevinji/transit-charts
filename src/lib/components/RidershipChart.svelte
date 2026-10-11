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

<VegaLite {spec} {data} options={{ actions: false, renderer: "svg" }} style="width: 100%" />
