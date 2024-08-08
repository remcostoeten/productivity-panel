
export type ColorFoldersProps = {
    folders: FolderType[];
    deleteFolder: (folderName: string) => void;
    deleteColor: (folderName: string, colorItem: ColorItem) => void;
    openMoveColorDialog: (colorItem: ColorItem) => void;
}

export interface FolderType {
    name: string;
    colors: ColorItem[];
}

export type ColorItemProps = {
    colorItem: ColorItem;
    folderName: string;
    deleteColor: (folderName: string, colorItem: ColorItem) => void;
    openMoveColorDialog: (colorItem: ColorItem) => void;
};


export type AddFolderDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    addFolder: (name: string) => void;
};

export type Folder = {
    name: string;
    colors: ColorItem[];
};

export type ColorItem = {
    cssVar: string;
    color: string;
};

export type GeneratedCodeProps = {
    code: string;
};

export type MoveColorDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    folders: FolderType[];
    activeFolder: string;
    colorToMove: ColorItem | null;
    moveColor?: (fromFolder: string, toFolder: string, color: ColorItem) => void;
};
