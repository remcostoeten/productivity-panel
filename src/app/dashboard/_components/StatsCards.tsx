import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Folder, Share2, Tag } from 'lucide-react'
import { getStats } from './@actions/dash-actions'

export async function StatsCards() {
  const stats = await getStats()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Notes" value={stats.totalNotes} icon={FileText} />
      <StatCard title="Folders" value={stats.folderCount} icon={Folder} />
      <StatCard title="Tags" value={stats.tagCount} icon={Tag} />
      <StatCard title="Shared Notes" value={stats.sharedNotes} icon={Share2} />
    </div>
  )
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
