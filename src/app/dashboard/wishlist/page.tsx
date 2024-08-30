import { auth } from "@clerk/nextjs/server";
import WishlistComponent from "./_components/WishlistComponent";

export default function WishlistPage() {
  const { userId } = auth();

  if (!userId) {
    return <div>Please log in to view your wishlists.</div>;
  }

  return <WishlistComponent userId={userId} />;
}
