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
      csp: {
        mode: "auto",
        directives: {
          "default-src": ["self"],
          "base-uri": ["self"],
          "connect-src": [
            "self",
            "https://*.google-analytics.com",
            "https://*.google.com",
            "https://cloudflareinsights.com",
            "https://www.googletagmanager.com",
          ],
          "form-action": ["self"],
          "img-src": ["self", "https://*.google-analytics.com", "https://www.googletagmanager.com"],
          "object-src": ["none"],
          "script-src": [
            // The inline analytics loader in app.html. Recompute this if the script changes.
            "sha256-0htBJlWQi8OP2de/eousEdDQWRflfMcXAWupbejad6I=",
            "strict-dynamic",
          ],
          "style-src-attr": [
            // The inline style on SvelteKit's #svelte-announcer, which visually hides it. Recompute
            // this if SvelteKit changes it. See https://github.com/sveltejs/kit/issues/11747.
            "unsafe-hashes",
            "sha256-S8qMpvofolR8Mpjy4kQvEm7m1q8clzU4dfDH0AmvZjo=",
          ],
        },
      },
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
