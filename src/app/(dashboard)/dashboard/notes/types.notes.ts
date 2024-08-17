import { Folder } from "@/core/server/db/schema";

export type OnboardingProps = {
  onComplete: () => void;
};

export type FolderTreeProps = {
  onSelectFolder: (folderId: string) => void;
};

export type FolderNodeProps = {
  folder: Folder;
  level: number;
  onSelectFolder: (folderId: string) => void;
};
