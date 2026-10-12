import * as stylex from "@stylexjs/stylex";

// Colors are the Tailwind v4 palette values the site used before moving to StyleX.
// `app.css` repeats `background` for `<body>`, since plain CSS cannot read StyleX variables.
export const colors = stylex.defineVars({
  // slate-50
  background: "oklch(98.4% 0.003 247.858)",
  text: "#000",
  // slate-600
  mutedText: "oklch(44.6% 0.043 257.281)",
  // blue-700
  link: "oklch(48.8% 0.243 264.376)",
  // slate-200
  border: "oklch(92.9% 0.013 255.508)",
});

export const typography = stylex.defineConsts({
  headingSize: "2.25rem",
  headingLineHeight: "2.5rem",
  subheadingSize: "1.5rem",
  subheadingLineHeight: "2rem",
});

export const spacing = stylex.defineConsts({
  pageBlock: "2.5rem",
  pageInline: "1rem",
  pageMaxWidth: "64rem",
  sectionGap: "2.5rem",
});
