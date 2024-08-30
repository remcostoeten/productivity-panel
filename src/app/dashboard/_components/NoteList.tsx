'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAllNotes } from './@actions/dash-actions'

export function NoteList() {
  const [notes, setNotes] = useState([])
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    getAllNotes().then(setNotes)
  }, [])

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardDescription>
          {searchQuery ? `Search results for "${searchQuery}"` : 'All Notes'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {filteredNotes.map((note) => (
            <li key={note.id} className="flex justify-between items-center">
              <span className="text-foreground">{note.title}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
