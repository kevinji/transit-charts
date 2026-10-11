import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = async () => {
  return {
    title: "Muni Ridership",
    description: "Average weekday Muni ridership by year and by month.",
  };
};
