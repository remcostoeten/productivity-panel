
export type Folder = {
    id: string;
    name: string;
};

export type FoldersProps = {
    folders: Folder[];
    currentFolder: Folder | null;
    setCurrentFolder: (folder: Folder) => void;
    editFolder: (folderId: string, name: string) => Promise<void>;
}
