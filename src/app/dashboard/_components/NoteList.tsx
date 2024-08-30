import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNotes } from "@/core/server/server-actions/notes"
import Link from 'next/link'

export async function NoteList({ userId }: { userId: string }) {
  const notes = await getNotes(userId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id}>
              <Link href={`/dashboard/notes/${note.id}`} className="flex justify-between items-center p-2 hover:bg-secondary rounded-md">
                <span>{note.title}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(note.updatedAt * 1000).toLocaleDateString()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
