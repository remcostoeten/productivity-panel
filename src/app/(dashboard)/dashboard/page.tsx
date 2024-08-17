import {
  createOrUpdateUser,
  getUserProfile,
  updateLastSignIn,
} from "@/core/server/server-actions/userActions";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
    return null;
  }

  try {
    // Check if user email addresses exist and get the primary email
    const primary_email = user.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId,
    );

    if (!primary_email) {
      throw new Error("User primary email address is missing.");
    }

    // Create or update user in the database
    await createOrUpdateUser({
      id: userId,
      email: primary_email.emailAddress,
      first_name: user.firstName ?? "",
      last_name: user.lastName ?? "",
      profile_image_url: user.imageUrl ?? "",
      email_verified:
        primary_email.verification?.status === "verified" ?? false,
    });

    // Update last sign-in time (but don't increment count)
    await updateLastSignIn();

    // Fetch updated user profile
    const user_profile = await getUserProfile();

    return (
      <div>
        <h1>Welcome to your dashboard, {user_profile.first_name}!</h1>
        <p>You have signed in {user_profile.sign_in_count} times.</p>
        <p>
          Last sign-in:{" "}
          {new Date(user_profile.last_sign_in * 1000).toLocaleString()}
        </p>
        {/* Rest of your dashboard component */}
      </div>
    );
  } catch (error) {
    console.error("Error in DashboardPage:", error);
    return <div>An error occurred. Please try again later.</div>;
  }
}
