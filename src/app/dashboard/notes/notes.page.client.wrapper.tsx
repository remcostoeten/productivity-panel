import NotesPageClient from "@/app/dashboard/notes/page.client";
import { Folder, Note } from "./notes.types";

export async function NotesPageClientWrapper({
  userId,
  loadData,
}: {
  userId: string;
  loadData: () => Promise<{ folders: Folder[]; notes: Note[] }>;
}) {
  const { folders, notes } = await loadData();

  return (
    <NotesPageClient
      initialFolders={folders}
      initialNotes={notes}
      userId={userId}
      folders={folders}
      notes={notes}
      isLoadingFolders={false}
      isLoadingNotes={false}
    />
  );
}
