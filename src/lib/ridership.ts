import type { VisualizationSpec } from "svelte-vega";
import bartRidership from "#data/bart/weekday-ridership.json";
import muniRidership from "#data/sfmta/weekday-ridership.json";
import nycSubwayRidership from "#data/mta/weekday-ridership.json";

export interface MonthlyRidership {
  year: number;
  month: number;
  riders: number;
}

export interface Link {
  name: string;
  url: string;
}

export interface Agency {
  slug: "bart" | "muni" | "nyc-subway";
  name: string;
  fullName: string;
  source: Link;
  license?: Link;
  ridership: MonthlyRidership[];
}

export const agencies = {
  bart: {
    slug: "bart",
    name: "BART",
    fullName: "Bay Area Rapid Transit",
    source: { name: "BART", url: "https://www.bart.gov/about/reports/ridership" },
    license: { name: "CC BY", url: "https://opendefinition.org/licenses/cc-by/" },
    ridership: bartRidership,
  },
  muni: {
    slug: "muni",
    name: "Muni",
    fullName: "San Francisco Municipal Railway",
    source: {
      name: "SFMTA",
      url: "https://transtat.sfmta.com/t/public/views/Goal2Dashboards/RidershipTable",
    },
    ridership: muniRidership,
  },
  nycSubway: {
    slug: "nyc-subway",
    name: "NYC Subway",
    fullName: "the New York City Subway",
    source: { name: "MTA", url: "https://www.mta.info/open-data" },
    ridership: nycSubwayRidership,
  },
} satisfies Record<string, Agency>;

const SCHEMA = "https://vega.github.io/schema/vega-lite/v6.json";
const RIDERS_TITLE = "Average weekday riders";

// Charts read their rows from this named dataset, passed in through the `data` prop.
export const DATASET = "ridership";

/** Average weekday ridership for each year, with partial years drawn lighter. */
export function yearlyRidershipSpec(): VisualizationSpec {
  return {
    $schema: SCHEMA,
    width: "container",
    height: 300,
    data: { name: DATASET },
    transform: [
      {
        aggregate: [
          { op: "mean", field: "riders", as: "riders" },
          { op: "count", as: "months" },
        ],
        groupby: ["year"],
      },
    ],
    mark: { type: "bar", tooltip: true },
    encoding: {
      x: {
        field: "year",
        type: "ordinal",
        title: null,
        axis: { labelAngle: 0, labelOverlap: "greedy" },
      },
      y: {
        field: "riders",
        type: "quantitative",
        title: RIDERS_TITLE,
        axis: { format: "~s" },
      },
      opacity: { condition: { test: "datum.months < 12", value: 0.5 }, value: 1 },
      tooltip: [
        { field: "year", title: "Year" },
        { field: "riders", title: RIDERS_TITLE, format: ",.0f" },
        { field: "months", title: "Months of data" },
      ],
    },
  };
}

/**
 * Average weekday ridership for each month of one year. `maxRiders` fixes the y-axis
 * across years so switching years doesn't rescale the chart.
 */
export function monthlyRidershipSpec(maxRiders: number): VisualizationSpec {
  return {
    $schema: SCHEMA,
    width: "container",
    height: 300,
    data: { name: DATASET },
    transform: [{ calculate: "datetime(datum.year, datum.month - 1, 1)", as: "date" }],
    mark: { type: "bar", tooltip: true },
    encoding: {
      x: {
        field: "date",
        timeUnit: "month",
        type: "ordinal",
        title: null,
        axis: { labelAngle: 0 },
      },
      y: {
        field: "riders",
        type: "quantitative",
        title: RIDERS_TITLE,
        axis: { format: "~s" },
        scale: { domain: [0, maxRiders], nice: true },
      },
      tooltip: [
        { field: "date", timeUnit: "yearmonth", title: "Month" },
        { field: "riders", title: RIDERS_TITLE, format: ",.0f" },
      ],
    },
  };
}
