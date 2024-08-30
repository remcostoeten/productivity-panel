import { Suspense } from 'react'
 import { ActionButtons } from './_components/ActionButton'
import { FolderList } from './_components/FolderList'
import { GlobalMessages } from './_components/GlobalMessages'
import { NoteList } from './_components/NoteList'
import { SearchBar } from './_components/SearchBar'
import { FolderListSkeleton, NoteListSkeleton, StatsCardsSkeleton } from './_components/Skeletons'
import { StatsCards } from './_components/StatsCards'
import { WelcomeMessage } from './_components/WelcomeMessage'

export default function DashboardPage() {
    return (
        <div className="flex flex-col space-y-6 p-6 bg-background">
            <Suspense fallback={<div>Loading welcome message...</div>}>
                <WelcomeMessage />
            </Suspense>
            <SearchBar />

            <Suspense fallback={<div>Loading messages...</div>}>
                <GlobalMessages />
            </Suspense>

            <Suspense fallback={<StatsCardsSkeleton />}>
                <StatsCards />
            </Suspense>

            <div className="flex space-x-4">
                <div className="w-1/4">
                    <Suspense fallback={<FolderListSkeleton />}>
                        <FolderList />
                    </Suspense>
                </div>
                <div className="w-3/4">
                    <Suspense fallback={<NoteListSkeleton />}>
                        <NoteList />
                    </Suspense>
                </div>
            </div>

            <ActionButtons />
        </div>
    )
}
