export const DAYS_OF_THE_WEEK = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
] as const;

export type Day = (typeof DAYS_OF_THE_WEEK)[number];

export const MONTHS_OF_THE_YEAR = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
] as const;

export type Month = (typeof MONTHS_OF_THE_YEAR)[number];
