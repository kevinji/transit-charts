import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    description:
      "Charts of public transit ridership for BART, Link light rail, Muni Metro, the New York City Subway, and the Washington Metro.",
  };
};
