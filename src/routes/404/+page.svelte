<script lang="ts" module>
  import * as stylex from "@stylexjs/stylex";
  import { colors, typography } from "#lib/styles/tokens.stylex.js";

  const styles = stylex.create({
    h1: {
      fontSize: typography.headingSize,
      fontWeight: 700,
      lineHeight: typography.headingLineHeight,
      color: colors.text,
    },
  });
</script>

<h1 {...stylex.attrs(styles.h1)}>404</h1>
<p>Not Found</p>
