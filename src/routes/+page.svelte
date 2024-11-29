<script lang="ts">
  import { VegaLite, type View, type VisualizationSpec } from "svelte-vega";

  const data = {
    table: [
      { category: "A", amount: 28 },
      { category: "B", amount: 55 },
      { category: "C", amount: 43 },
      { category: "D", amount: 91 },
      { category: "E", amount: 81 },
      { category: "F", amount: 53 },
      { category: "G", amount: 19 },
      { category: "H", amount: 87 },
    ],
  };

  let view: View | undefined = $state(undefined);
  const spec: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "A simple bar chart with embedded data.",
    data: {
      name: "table",
    },
    mark: "bar",
    encoding: {
      x: { field: "category", type: "nominal" },
      y: { field: "amount", type: "quantitative" },
    },
  };
</script>

<h1 class="text-4xl font-bold">Transit Charts</h1>
<p>View ridership data for transit systems around the world.</p>

<VegaLite {data} {spec} bind:view />
