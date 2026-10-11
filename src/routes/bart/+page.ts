import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = async () => {
  return {
    title: "BART Ridership",
    description: "Average weekday BART ridership by year and by month.",
  };
};
