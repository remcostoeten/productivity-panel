export type ColorItem = {
  color: string;
  cssVar: string;
};

export type Folder = {
  name: string;
  description?: string;
  colors: ColorItem[];
};

export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type AddFolderDialogProps = DialogProps & {
  onAddFolder: (name: string, description: string) => void;
};

export type MoveColorDialogProps = DialogProps & {
  folders: Folder[];
  activeFolder: string;
  colorToMove: ColorItem | null;
  onMoveColor: (targetFolder: string) => void;
};

export type ButtonBarProps = {
  pickingColor: boolean;
  setPickingColor: (value: boolean) => void;
  handleClearLocalStorage: () => void;
  setIsAddFolderDialogOpen: (value: boolean) => void;
  generateCode: () => void;
  useCssVariables: boolean;
  setUseCssVariables: (value: boolean) => void;
};

export type ColorFolderProps = {
  folder: Folder;
  deleteFolder: (name: string) => void;
  deleteColor: (folderName: string, colorToDelete: ColorItem) => void;
  startEditingColor: (colorItem: ColorItem) => void;
  saveEditedColor: () => void;
  editingColor: ColorItem | null;
  editedCssVar: string;
  setEditedCssVar: (value: string) => void;
  copyToClipboard: (text: string) => void;
  openMoveColorDialog: (colorItem: ColorItem) => void;
};
