import { Folder, FolderTreeProps } from "../notes.types";

export default function FolderTree({
  folders,
  onFolderSelect,
}: FolderTreeProps) {
  const renderFolder = (folder: Folder) => (
    <div key={folder.id}>
      <div
        onClick={() => onFolderSelect(folder.id)}
        className="cursor-pointer hover:text-blue-500"
      >
        {folder.name}
      </div>
      {Array.isArray(folder.children) && folder.children.length > 0 && (
        <div className="ml-4">
          {folder.children.map((child) => renderFolder(child))}
        </div>
      )}
    </div>
  );

  return <div>{folders.map((folder) => renderFolder(folder))}</div>;
}
