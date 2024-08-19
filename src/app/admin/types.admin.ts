export type StatsT = {
  totalVisits: number;
  uniqueVisitors: number;
  topPaths: { path: string; count: number }[];
};
