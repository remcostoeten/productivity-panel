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
  }

  try {
    // Create or update user in the database
    await createOrUpdateUser({
      id: userId,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
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
        <p>
          Last sign-in:{" "}
          {new Date(userProfile.lastSignIn * 1000).toLocaleString()}
        </p>
        {/* Rest of your dashboard component */}
      </div>
    );
  } catch (error) {
    console.error("Error in DashboardPage:", error);
    return <div>An error occurred. Please try again later.</div>;
  }
}
