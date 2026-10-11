import * as sitemap from "super-sitemap/sveltekit";
import type { RequestHandler } from "@sveltejs/kit";

export const prerender = true;

export const GET: RequestHandler = async ({ url }) => {
  return sitemap.response({
    origin: url.origin,
    excludeRoutePatterns: [/^\/404$/],
  });
};
