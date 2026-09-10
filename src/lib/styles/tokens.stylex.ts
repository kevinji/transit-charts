import * as stylex from "@stylexjs/stylex";

// Colors are the Tailwind v4 palette values the site used before moving to StyleX.
// `app.css` repeats `background` for `<body>`, since plain CSS cannot read StyleX variables.
export const colors = stylex.defineVars({
  // slate-50
  background: "oklch(98.4% 0.003 247.858)",
  text: "#000",
});

export const typography = stylex.defineConsts({
  headingSize: "2.25rem",
  headingLineHeight: "2.5rem",
});

export const spacing = stylex.defineConsts({
  pageBlock: "2.5rem",
  pageInline: "1rem",
});
