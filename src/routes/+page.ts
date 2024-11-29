export const prerender = true;

// svelte-vega depends on json-stringily-pretty-compact, which does not work with SSR:
// https://github.com/vega/svelte-vega/issues/977
export const ssr = false;
