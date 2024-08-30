import { Folder, FolderTreeProps } from "../../notes.types";

export default function FolderTree({
  folders,
  onFolderSelect,
}: FolderTreeProps) {
  const renderFolder = (folder: Folder) => (
    <div key={folder.id} className="mb-2">
      <div
        onClick={() => onFolderSelect(folder.id)}
        className="cursor-pointer hover:text-blue-500 flex items-center"
      >
        <span className="mr-2">📁</span> {folder.name}
      </div>
      {folder.children && folder.children.length > 0 && (
        <div className="ml-4 mt-1">
          {folder.children.map((child) => renderFolder(child))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {folders.length > 0 ? (
        folders.map((folder) => renderFolder(folder))
      ) : (
        <p>No folders yet. Create one to get started!</p>
      )}
    </div>
  );
}
