import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    title: "DC Metro Ridership",
    description: "Average weekday Washington Metro ridership by year and by month.",
  };
};
