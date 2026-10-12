<script lang="ts" module>
  import * as stylex from "@stylexjs/stylex";
  import { colors } from "#lib/styles/tokens.stylex.js";

  const styles = stylex.create({
    source: {
      fontSize: "0.875rem",
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
  import type { Agency } from "#lib/ridership.js";

  interface Props {
    agency: Agency;
  }

  const { agency }: Props = $props();
</script>

<p {...stylex.attrs(styles.source)}>
  Data: <a href={agency.source.url} rel="external" {...stylex.attrs(styles.link)}
    >{agency.source.name}</a
  >{#if agency.license}
    , licensed under <a href={agency.license.url} rel="external" {...stylex.attrs(styles.link)}
      >{agency.license.name}</a
    >{/if}. Monthly averages are computed from the source data.
</p>
