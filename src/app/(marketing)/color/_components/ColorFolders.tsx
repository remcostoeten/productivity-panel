import { Button } from '@/components/ui';
import { TrashIcon } from 'lucide-react';
import ColorItem from './ColorItem';
import { ColorFoldersProps, FolderType } from './types.colors';

export default function ColorFolders({
  folders,
  deleteFolder,
  deleteColor,
  openMoveColorDialog,
}: ColorFoldersProps) {
  console.log(folders);
  return (
    <div className="bg-[#161717] p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Color Folders</h2>
      <div className="grid gap-4">
        {folders.map((folder: FolderType) => (
          <div key={folder.name} className="p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-bold">{folder.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteFolder(folder.name)}
              >
                <TrashIcon className="w-5 h-5 text-destructive" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {folder.colors.map((colorItem) => (
                <ColorItem
                  key={`${colorItem.color}-${colorItem.cssVar}`}
                  colorItem={colorItem}
                  folderName={folder.name}
                  deleteColor={deleteColor}
                  openMoveColorDialog={openMoveColorDialog}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
