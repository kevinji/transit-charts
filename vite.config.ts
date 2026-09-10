import path from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    {
      // Runs after the Svelte compiler so StyleX sees plain JavaScript, hence no `enforce: "pre"`.
      ...stylex.vite({
        useCSSLayers: true,
        aliases: { "$lib/*": [path.resolve("src/lib/*")] },
      }),
      enforce: undefined,
    },
  ],
});
