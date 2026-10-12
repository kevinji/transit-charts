import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    title: "Muni Metro Ridership",
    description: "Average weekday Muni Metro ridership by year and by month.",
  };
};
