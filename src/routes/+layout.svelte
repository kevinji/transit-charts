<script lang="ts" module>
  import * as stylex from "@stylexjs/stylex";
  import { spacing } from "#lib/styles/tokens.stylex.js";

  const styles = stylex.create({
    main: {
      paddingBlock: spacing.pageBlock,
      paddingInline: spacing.pageInline,
    },
  });
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { page } from "$app/state";

  import "../app.css";

  interface Props {
    children: Snippet;
  }

  const { children }: Props = $props();

  const siteTitle = "Transit Charts";

  const title = $derived(page.data?.title ? `${page.data.title} • ${siteTitle}` : siteTitle);
  const description = $derived(page.data?.description ?? "");
  const canonicalUrl = $derived(`${page.url.origin}${page.url.pathname}`);

  // In production the StyleX CSS is appended to the built stylesheet. In dev the
  // plugin serves it separately and this runtime swaps it in on hot updates.
  if (import.meta.env.DEV) {
    $effect(() => {
      void import("virtual:stylex:runtime");
    });
  }
</script>

<svelte:head>
  <title>{title}</title>
  {#if import.meta.env.DEV}
    <link rel="stylesheet" href="/virtual:stylex.css" />
  {/if}
  {#if !page.data?.isError && !page.error}
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

<main {...stylex.attrs(styles.main)}>
  {@render children()}
</main>
