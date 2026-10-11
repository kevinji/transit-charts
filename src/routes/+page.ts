import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    description: "Charts of public transit ridership for BART and Muni.",
  };
};
