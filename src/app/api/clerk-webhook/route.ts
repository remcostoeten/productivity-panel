import { createOrUpdateUser } from "@/core/server/server-actions/userActions";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET to .env.local");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error occurred", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
      primary_email_address_id,
    } = evt.data;

    if ("email_addresses" in evt.data) {
      const primaryEmail = email_addresses.find(
        (email) => email.id === primary_email_address_id,
      );

      if (primaryEmail) {
        await createOrUpdateUser({
          id,
          email: primaryEmail.email_address,
          firstName: first_name || null,
          lastName: last_name || null,
          profileImageUrl: image_url || undefined,
          emailVerified: primaryEmail.verification !== null,
        });

        console.log(`User ${id} ${eventType}`);

        return new NextResponse("User created or updated", {
          status: 200,
        });
      }
    }
  }

  console.log("Webhook received", eventType);
  return new NextResponse("Webhook received", {
    status: 200,
  });
}
