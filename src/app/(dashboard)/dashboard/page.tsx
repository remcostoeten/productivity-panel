import { default as OnboardingFlow } from "@/components/auth/OnboardingFlow";
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
    const primaryEmail = user.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId,
    );

    if (!primaryEmail) {
      throw new Error("User primary email address is missing.");
    }

    // Create or update user in the database
    await createOrUpdateUser({
      id: userId,
      email: primaryEmail.emailAddress,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      profileImageUrl: user.imageUrl ?? "",
      emailVerified: primaryEmail.verification?.status === "verified" ?? false,
    });

    // Update last sign-in time (but don't increment count)
    await updateLastSignIn();

    // Fetch updated user profile
    const userProfile = await getUserProfile();

    return (
      //   <div>
      //     <h1>Welcome to your dashboard, {userProfile.firstName}!</h1>
      //     <p>You have signed in {userProfile.signInCount} times.</p>
      //     <p>
      //       Last sign-in:{" "}
      //       {new Date(userProfile.lastSignIn * 1000).toLocaleString()}
      //     </p>
      //   </div>
      <OnboardingFlow />
    );
  } catch (error) {
    console.error("Error in DashboardPage:", error);
    return <div>An error occurred. Please try again later.</div>;
  }
}
