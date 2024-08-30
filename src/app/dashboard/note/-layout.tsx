import FolderNavigation from "@/app/dashboard/note/components/folder-navigation";
import { getFolders } from "@/core/server/server-actions/notes";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const folders = await getFolders();

  return (
    <html lang="en">
      <body>
        <div className="flex">
          <FolderNavigation onSelectFolder={() => { }} />
          <main className="flex-1 p-4">
            <nav className="mb-4">
              <Link
                href="/dashboard/note/create"
                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create New Note
              </Link>
            </nav>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
