import { FolderList } from "./FolderList";
import { getFolders } from "./StatsCards";

export default async function FolderListServer() {
    const folders = await getFolders();
    return <FolderList folders={folders} />;
}
