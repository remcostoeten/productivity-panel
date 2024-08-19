"use server";

import { auth } from "@clerk/nextjs/server/";
import { db } from "../db";
import { siteVisits } from "../db/schema";
import { incrementSignInCount } from "./increment-sign-in-count";
import { createOrUpdateUser } from "./userActions";

export async function POST(req: Request) {
  // ... (keep existing webhook verification code)

  // Handle the event
  const eventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, email_verified } = evt.data;
    const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
    
    await createOrUpdateUser({
      id,
      email: primaryEmail ? primaryEmail.email_address : '',
      firstName: first_name,
      lastName: last_name,
      profileImageUrl: image_url,
      emailVerified: email_verified,
    });
  } else if (eventType === 'session.created') {
    // Increment sign-in count for new sessions
    const { user_id } = evt.data;
    await incrementSignInCount(user_id);
  }
 
  return new Response('', { status: 200 })
}";

export async function recordSiteVisit(request: Request) {
  const { userId } = auth();
  const url = new URL(request.url);

  await db.insert(siteVisits).values({
    id: crypto.randomUUID(),
    userId: userId || null,
    ipAddress:
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      null,
    userAgent: request.headers.get("user-agent") || null,
    referrer: request.headers.get("referer") || null,
    path: url.pathname,
  });
}
