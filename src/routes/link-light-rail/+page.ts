import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    title: "Link Light Rail Ridership",
    description:
      "Average weekday Link light rail ridership in the Seattle area by year and by month.",
  };
};
