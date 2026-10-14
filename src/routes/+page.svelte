<script lang="ts" module>
  import * as stylex from "@stylexjs/stylex";
  import { colors, spacing, typography } from "#lib/styles/tokens.stylex.js";

  const styles = stylex.create({
    h1: {
      marginTop: 0,
      fontSize: typography.headingSize,
      fontWeight: 700,
      lineHeight: typography.headingLineHeight,
      color: colors.text,
    },
    h2: {
      marginTop: spacing.sectionGap,
      fontSize: typography.subheadingSize,
      fontWeight: 700,
      lineHeight: typography.subheadingLineHeight,
      color: colors.text,
    },
    muted: {
      color: colors.mutedText,
    },
    link: {
      color: colors.link,
      textDecoration: {
        default: "none",
        ":hover": "underline",
      },
    },
  });
</script>

<script lang="ts">
  import { resolve } from "$app/paths";
  import DataSource from "#lib/components/DataSource.svelte";
  import RidershipChart from "#lib/components/RidershipChart.svelte";
  import { agenciesByRidership } from "#lib/ridership.js";
</script>

<h1 {...stylex.attrs(styles.h1)}>Transit Charts</h1>
<p {...stylex.attrs(styles.muted)}>
  Average weekday ridership by year. Lighter bars are years with only some months of data.
</p>

{#each agenciesByRidership as agency (agency.slug)}
  <section>
    <h2 {...stylex.attrs(styles.h2)}>{agency.name}</h2>
    <RidershipChart chart="yearly" ridership={agency.ridership} />
    <DataSource {agency} />
    <p>
      <a href={resolve(`/${agency.slug}`)} {...stylex.attrs(styles.link)}>
        {agency.name} ridership by month →
      </a>
    </p>
  </section>
{/each}
