'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2 } from 'lucide-react'
import { useOptimistic, useState } from 'react'
import { deleteFolder, getFolders, updateFolder } from './@actions/dash-actions'

export function FolderList() {
  const [folders, setFolders] = useState([])
  const [optimisticFolders, updateOptimisticFolders] = useOptimistic(
    folders,
    (state, update: { type: 'delete' | 'update', id: string, name?: string }) => {
      if (update.type === 'delete') {
        return state.filter(folder => folder.id !== update.id)
      } else if (update.type === 'update') {
        return state.map(folder =>
          folder.id === update.id ? { ...folder, name: update.name! } : folder
        )
      }
      return state
    }
  )

  useState(() => {
    getFolders().then(setFolders)
  }, [])

  const handleDeleteFolder = async (id: string) => {
    updateOptimisticFolders({ type: 'delete', id })
    await deleteFolder(id)
  }

  const handleUpdateFolder = async (id: string, newName: string) => {
    updateOptimisticFolders({ type: 'update', id, name: newName })
    await updateFolder(id, newName)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Folders</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {optimisticFolders.map((folder) => (
            <li key={folder.id} className="flex justify-between items-center">
              <span className="text-foreground">{folder.name}</span>
              <div>
                <Button variant="ghost" size="sm" onClick={() => handleUpdateFolder(folder.id, prompt('New folder name') || folder.name)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteFolder(folder.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
