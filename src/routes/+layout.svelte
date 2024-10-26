<script lang="ts">
  import type { Snippet } from "svelte";
  import { page } from "$app/stores";

  import "../app.css";

  interface Props {
    children: Snippet;
  }

  const { children }: Props = $props();

  const siteTitle = "Transit Charts";

  const title = $derived($page.data?.title ? `${$page.data.title} • ${siteTitle}` : siteTitle);
  const description = $derived($page.data?.description ?? "");
  const canonicalUrl = $derived(`${$page.url.origin}${$page.url.pathname}`);
</script>

<svelte:head>
  <title>{title}</title>
  {#if !$page.data?.isError && !$page.error}
    <meta name="author" content="Kevin Ji" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={siteTitle} />
    <meta property="og:title" content={title} />
    <meta name="description" property="og:description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:url" content={canonicalUrl} />
  {:else}
    <meta name="robots" content="noindex, nofollow" />
  {/if}
</svelte:head>

<main class="px-4 py-10">
  {@render children()}
</main>
