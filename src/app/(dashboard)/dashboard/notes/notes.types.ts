type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  folderId: string | null;
  createdAt: string;
  updatedAt: string;
};

type Folder = {
  children: boolean;
  id: string;
  userId: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
};

type NotesPageClientProps = {
  folders: Folder[];
  notes: Note[];
  userId: string;
  isLoadingFolders: boolean;
  isLoadingNotes: boolean;
};

type FolderTreeProps = {
  folders: Folder[];
  onFolderSelect: (folderId: string) => void;
};

export type { Folder, FolderTreeProps, Note, NotesPageClientProps };
