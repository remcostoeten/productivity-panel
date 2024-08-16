import {
  createOrUpdateUser,
  getUserProfile,
  updateSignInInfo,
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
    const primaryEmail = user.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId,
    );

    if (!primaryEmail) {
      throw new Error("User primary email address is missing.");
    }

    await createOrUpdateUser({
      id: userId,
      email: primaryEmail.emailAddress,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      profileImageUrl: user.imageUrl ?? "",
      emailVerified: primaryEmail.verification?.status === "verified" ?? false,
    });

    await updateSignInInfo(userId);

    const userProfile = await getUserProfile(userId);

    return (
      <div>
        <h1>Welcome to your dashboard, {userProfile.firstName}!</h1>
        <p>You have signed in {userProfile.signInCount} times.</p>
        <p>
          Last sign-in:{" "}
          {new Date(Number(userProfile.lastSignIn) * 1000).toLocaleString()}
        </p>
        {/* Rest of your dashboard component */}
      </div>
    );
  } catch (error) {
    console.error("Error in DashboardPage:", error);
    return <div>An error occurred. Please try again later.</div>;
  }
}
