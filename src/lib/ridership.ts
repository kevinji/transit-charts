import type { TopLevelSpec } from "vega-lite";
import bartRidership from "#data/bart/weekday-ridership.json";
import dcMetroRidership from "#data/wmata/weekday-ridership.json";
import linkLightRailRidership from "#data/sound-transit/weekday-ridership.json";
import muniMetroRidership from "#data/sfmta/weekday-ridership.json";
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
  slug: "bart" | "dc-metro" | "link-light-rail" | "muni-metro" | "nyc-subway";
  name: string;
  fullName: string;
  source: Link;
  license?: Link;
  /** Notes shown with the monthly chart for a given year. */
  notes?: Record<number, string>;
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
  muniMetro: {
    slug: "muni-metro",
    name: "Muni Metro",
    fullName: "Muni Metro",
    source: {
      name: "SFMTA",
      url: "https://transtat.sfmta.com/t/public/views/Goal2Dashboards/RidershipTable",
    },
    notes: {
      2020:
        "Muni Metro was suspended from April through November 2020 and replaced by buses. " +
        "SFMTA doesn't break out ridership for the replacement buses, so these " +
        "months show no Muni Metro riders.",
    },
    ridership: muniMetroRidership,
  },
  nycSubway: {
    slug: "nyc-subway",
    name: "NYC Subway",
    fullName: "the New York City Subway",
    source: { name: "MTA", url: "https://www.mta.info/open-data" },
    notes: {
      2010:
        "The MTA's turnstile data is missing May 15 to 21, 2010, so May 2010 is " +
        "averaged over its other weekdays.",
      2012:
        "Hurricane Sandy shut down the subway from October 29 to 31, 2012, and fares " +
        "were waived on November 1 and 2, so those days count almost no riders.",
    },
    ridership: nycSubwayRidership,
  },
  dcMetro: {
    slug: "dc-metro",
    name: "DC Metro",
    fullName: "the Washington Metro",
    source: {
      name: "WMATA",
      url: "https://www.wmata.com/about/open-data-hub/ridership-data/metrorail-ridership-summary.html",
    },
    ridership: dcMetroRidership,
  },
  linkLightRail: {
    slug: "link-light-rail",
    name: "Link light rail",
    fullName: "Sound Transit's Link light rail",
    source: {
      name: "Sound Transit",
      url: "https://www.soundtransit.org/ride-with-us/system-performance-tracker/ridership",
    },
    ridership: linkLightRailRidership,
  },
} satisfies Record<string, Agency>;

/**
 * Average weekday ridership over the agency's latest 12 months of data, which compares
 * agencies fairly even when their data ends in different months.
 */
export function recentRidership(agency: Agency): number {
  const recent = agency.ridership.slice(-12);
  return recent.reduce((sum, row) => sum + row.riders, 0) / recent.length;
}

/** Agencies sorted from highest to lowest recent ridership. */
export const agenciesByRidership: Agency[] = Object.values(agencies).sort(
  (a, b) => recentRidership(b) - recentRidership(a),
);

const SCHEMA = "https://vega.github.io/schema/vega-lite/v6.json";
const RIDERS_TITLE = "Average weekday riders";

// Charts read their rows from this named dataset, which the chart component fills in.
export const DATASET = "ridership";
// The monthly chart's y-axis maximum, which the chart component sets for each agency.
export const MAX_RIDERS_SIGNAL = "maxRiders";

/** Average weekday ridership for each year, with partial years drawn lighter. */
export function yearlyRidershipSpec(): TopLevelSpec {
  return {
    $schema: SCHEMA,
    width: "container",
    height: "container",
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
 * Average weekday ridership for each month of one year. The `maxRiders` signal fixes the
 * y-axis across years so switching years doesn't rescale the chart.
 */
export function monthlyRidershipSpec(): TopLevelSpec {
  return {
    $schema: SCHEMA,
    width: "container",
    height: "container",
    params: [{ name: MAX_RIDERS_SIGNAL, value: 0 }],
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
        scale: { domain: [0, { expr: MAX_RIDERS_SIGNAL }], nice: true },
      },
      tooltip: [
        { field: "date", timeUnit: "yearmonth", title: "Month" },
        { field: "riders", title: RIDERS_TITLE, format: ",.0f" },
      ],
    },
  };
}
