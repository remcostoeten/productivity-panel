import { updateLastSignIn } from "@/core/server/server-actions/userActions";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  // Update last sign in time
  await updateLastSignIn();

  return (
    <div>
      <h1>Welcome to your dashboard, {user.firstName}!</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}
