<script lang="ts" module>
  import * as stylex from "@stylexjs/stylex";
  import { colors, typography } from "#lib/styles/tokens.stylex.js";

  const styles = stylex.create({
    h1: {
      marginTop: 0,
      fontSize: typography.headingSize,
      fontWeight: 700,
      lineHeight: typography.headingLineHeight,
      color: colors.text,
    },
  });
</script>

<script lang="ts">
  import { page } from "$app/state";
</script>

<h1 {...stylex.attrs(styles.h1)}>{page.status}</h1>
<p>{page.error?.message || ""}</p>
