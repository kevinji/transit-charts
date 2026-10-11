import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    title: "NYC Subway Ridership",
    description: "Average weekday New York City Subway ridership by year and by month.",
  };
};
