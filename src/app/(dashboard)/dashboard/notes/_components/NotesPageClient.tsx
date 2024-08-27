'use client'

import dynamic from 'next/dynamic'
import { Folder, Note } from '../notes.types'

const DynamicTiptap = dynamic(() => import('./Tiptap'), { ssr: false })

export default function NotesPageClient({
  initialFolders,
  initialNotes,
  userId,
}: {
  initialFolders: Folder[]
  initialNotes: Note[]
  userId: string
}) {
  // ... (rest of the component code, exactly as provided in the previous response)
}
