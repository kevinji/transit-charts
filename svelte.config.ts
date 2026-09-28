import adapter from "@sveltejs/adapter-cloudflare";
import type { Config } from "@sveltejs/kit";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config: Config = {
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
        config.include.push("../eslint.config.ts", "../prettier.config.ts", "../svelte.config.ts");
      },
    },
  },
};

export default config;
