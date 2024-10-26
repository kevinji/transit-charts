import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      routes: {
        include: ["/*"],
        exclude: ["/*"],
      },
    }),
    paths: {
      relative: false,
    },
    prerender: {
      origin: "https://transitcharts.com",
    },
    typescript: {
      config: (config) => {
        config.include.push(
          "../eslint.config.js",
          "../postcss.config.js",
          "../prettier.config.js",
          "../svelte.config.js",
          "../tailwind.config.ts",
        );
      },
    },
  },
};

export default config;
