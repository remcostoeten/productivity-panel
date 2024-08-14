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
    return null; // Ensure the function exits after redirect
  }

  try {
    // Check if user email addresses exist
    if (!user.emailAddresses || !user.emailAddresses[0]) {
      throw new Error("User email addresses are missing.");
    }

    // Create or update user in the database
    await createOrUpdateUser({
      id: userId,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.imageUrl,
      emailVerified: user.emailAddresses[0].verification.status === "verified",
    });

    // Update last sign-in time (but don't increment count)
    await updateLastSignIn();

    // Fetch updated user profile
    const userProfile = await getUserProfile();

    return (
      <div>
        <h1>Welcome to your dashboard, {userProfile.firstName}!</h1>
        <p>You have signed in {userProfile.signInCount} times.</p>
        <p>Last sign-in: {userProfile.lastSignIn.toString()}</p>
        {/* Rest of your dashboard component */}
      </div>
    );
  } catch (error) {
    console.error("Error in DashboardPage:", error);
    return (
      <div>An error occurred: {error.message}. Please try again later.</div>
    );
  }
}
