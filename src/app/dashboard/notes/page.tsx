import { getFolders, getNotes } from "@/core/server/server-actions/notes";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import Loading from "../loading";
import NotesPageClient from "./page.client";

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) {
    return <div>Please log in to view your notes.</div>;
  }

  async function loadData() {
    const folders = await getFolders();
    const notes = await getNotes(userId);
    return { folders, notes };
  }

  return (
    <Suspense fallback={<Loading />}>
      <NotesPageClientWrapper userId={userId} loadData={loadData} />
    </Suspense>
  );
}

async function NotesPageClientWrapper({
  userId,
  loadData,
}: {
  userId: string;
  loadData: () => Promise<{ folders: any[]; notes: any[] }>;
}) {
  const { folders, notes } = await loadData();

  return (
    <NotesPageClient
      initialFolders={folders}
      initialNotes={notes}
      userId={userId}
    />
  );
}
