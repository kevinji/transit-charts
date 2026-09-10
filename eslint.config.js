import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import stylex from "@stylexjs/eslint-plugin";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  prettier,
  ...svelte.configs["flat/prettier"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte"],

    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    files: ["**/*.{js,ts,svelte}"],
    plugins: {
      "@stylexjs": stylex,
    },
    rules: {
      "@stylexjs/enforce-extension": "error",
      "@stylexjs/no-conflicting-props": "error",
      "@stylexjs/no-legacy-contextual-styles": "error",
      "@stylexjs/no-lookahead-selectors": "error",
      "@stylexjs/no-nonstandard-styles": "error",
      "@stylexjs/no-unused": "error",
      "@stylexjs/sort-keys": ["error", { order: "recess" }],
      "@stylexjs/valid-shorthands": "error",
      "@stylexjs/valid-styles": "error",
    },
  },
  {
    ignores: ["build/", ".svelte-kit/", "dist/"],
  },
);
