import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter({ fallback: "plaintext" }),
      paths: { relative: false, origin: "https://transitcharts.com" },
    }),

    {
      // Runs after the Svelte compiler so StyleX sees plain JavaScript, hence no `enforce: "pre"`.
      ...stylex.vite({
        useCSSLayers: true,
        aliases: { "#lib/*": [path.resolve("src/lib/*")] },
      }),
      enforce: undefined,
      // SvelteKit has no index.html, so this hook never runs; +layout.svelte injects the
      // dev stylesheet and runtime instead. Dropping it silences SvelteKit's warning.
      transformIndexHtml: undefined,
    },
  ],
});
