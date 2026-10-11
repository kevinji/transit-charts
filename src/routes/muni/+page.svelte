<script lang="ts">
  import AgencyRidership from "#lib/components/AgencyRidership.svelte";
  import { agencies } from "#lib/ridership.js";
</script>

<AgencyRidership agency={agencies.muni} />
