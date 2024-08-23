"use server";

import { db } from "../db";
import { countUniqueVisitors } from "../db/schema/site-visits";

export const getUniqueVisitorCount = async () => {
  return await countUniqueVisitors(db);
};
