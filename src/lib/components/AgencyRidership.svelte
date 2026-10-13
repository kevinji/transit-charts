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
    label: {
      display: "inline-flex",
      gap: "0.5rem",
      alignItems: "center",
      marginBottom: "1rem",
    },
    select: {
      paddingBlock: "0.25rem",
      paddingInline: "0.5rem",
      fontSize: "1rem",
    },
  });
</script>

<script lang="ts">
  import { resolve } from "$app/paths";
  import DataSource from "#lib/components/DataSource.svelte";
  import RidershipChart from "#lib/components/RidershipChart.svelte";
  import { monthlyRidershipSpec, yearlyRidershipSpec, type Agency } from "#lib/ridership.js";

  interface Props {
    agency: Agency;
  }

  const { agency }: Props = $props();

  const years = $derived(
    [...new Set(agency.ridership.map((row) => row.year))].sort((a, b) => b - a),
  );
  const maxRiders = $derived(Math.max(...agency.ridership.map((row) => row.riders)));

  let selectedYear: number | undefined = $state();
  const year = $derived(selectedYear ?? years[0]);
  const yearRidership = $derived(agency.ridership.filter((row) => row.year === year));
</script>

<p><a href={resolve("/")} {...stylex.attrs(styles.link)}>← All transit systems</a></p>
<h1 {...stylex.attrs(styles.h1)}>{agency.name} ridership</h1>
<p {...stylex.attrs(styles.muted)}>
  Average weekday ridership on {agency.fullName}. Lighter bars are years with only some months of
  data.
</p>

<h2 {...stylex.attrs(styles.h2)}>By year</h2>
<RidershipChart spec={yearlyRidershipSpec()} ridership={agency.ridership} />

<h2 {...stylex.attrs(styles.h2)}>By month</h2>
<label {...stylex.attrs(styles.label)}>
  Year
  <select
    value={year}
    onchange={(e) => (selectedYear = Number(e.currentTarget.value))}
    {...stylex.attrs(styles.select)}
  >
    {#each years as y (y)}
      <option value={y}>{y}</option>
    {/each}
  </select>
</label>
<RidershipChart spec={monthlyRidershipSpec(maxRiders)} ridership={yearRidership} />
{#if agency.notes?.[year]}
  <p {...stylex.attrs(styles.muted)}>{agency.notes[year]}</p>
{/if}
<DataSource {agency} />
