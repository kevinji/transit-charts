<script lang="ts" module>
  import * as stylex from "@stylexjs/stylex";
  import { colors, spacing } from "#lib/styles/tokens.stylex.js";

  const styles = stylex.create({
    footer: {
      paddingBlock: "1.5rem",
      borderTopColor: colors.border,
      borderTopStyle: "solid",
      borderTopWidth: "1px",
    },
    // Matches the width and padding of the layout's <main> so the text lines up.
    inner: {
      maxWidth: spacing.pageMaxWidth,
      paddingInline: spacing.pageInline,
      marginInline: "auto",
      fontSize: "0.875rem",
      color: colors.mutedText,
    },
    link: {
      color: "inherit",
      textDecoration: {
        default: "none",
        ":hover": "underline",
      },
    },
  });
</script>

<footer {...stylex.attrs(styles.footer)}>
  <div {...stylex.attrs(styles.inner)}>
    <a
      href="https://github.com/kevinji/transit-charts"
      rel="external"
      {...stylex.attrs(styles.link)}>View the source code on GitHub</a
    >
  </div>
</footer>
