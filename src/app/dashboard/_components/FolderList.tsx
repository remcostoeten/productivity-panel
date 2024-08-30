import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder, Plus } from "lucide-react"
import Link from 'next/link'
import { getFolders } from "./@actions/dash-actions"

export async function FolderList() {
  const folders = await getFolders()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Folders</CardTitle>
        <Button asChild size="sm">
          <Link href="/dashboard/folders/new">
            <Plus className="mr-2 h-4 w-4" />
            New Folder
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {folders.map((folder) => (
            <li key={folder.id}>
              <Link href={`/dashboard/folders/${folder.id}`} className="flex items-center p-2 hover:bg-secondary rounded-md">
                <Folder className="mr-2 h-4 w-4" />
                <span>{folder.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
