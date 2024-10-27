<script lang="ts">
  import { page } from "$app/stores";

  export const prerender = true;
</script>

<h1 class="text-4xl font-bold">{$page.status}</h1>
<p>{$page.error?.message || ""}</p>
