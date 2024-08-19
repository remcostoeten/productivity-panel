import { recordSiteVisit } from "@/core/server/server-actions/incrementSiteVisits";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await recordSiteVisit(request);
  return NextResponse.json({ message: "Visit recorded" });
}
