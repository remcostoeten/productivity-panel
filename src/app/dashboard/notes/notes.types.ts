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
  initialFolders: Folder[];
  initialNotes: Note[];
  userId: string;
  isLoadingFolders: boolean;
  isLoadingNotes: boolean;
  folders: Folder[];
  notes: Note[];
};

type FolderTreeProps = {
  folders: Folder[];
  onFolderSelect: (folderId: string) => void;
};

type NoteCardProps = {
  note: Note;
  key: string;
};

type NoteEditModalProps = {
  isOpen: boolean;
  onEdit: (note: { title: string; content: string }) => void;
  onClose: () => void;
  note: Note;
};

export type {
    Folder,
    FolderTreeProps,
    Note,
    NoteCardProps,
    NoteEditModalProps,
    NotesPageClientProps
};

