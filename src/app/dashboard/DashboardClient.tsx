'use client';

import Skeleton from '@/components/effect/skeletons/generic-skeleton';
import { Suspense } from 'react';
import { ActionButtons } from './_components/ActionButton';
import { FolderList } from './_components/FolderList';
import { GlobalMessages } from './_components/GlobalMessages';
import { NoteList } from './_components/NoteList';
import { PersonalMessages } from './_components/PersonalMessages';
import { SearchBar } from './_components/SearchBar';
import { StatsCards } from './_components/StatsCards';
import { WelcomeMessage } from './_components/WelcomeMessage';

interface DashboardClientProps {
    user: any;
    userId: string;
}

export default function DashboardClient({ user, userId }: DashboardClientProps) {
    return (
        <div className="container mx-auto p-6 space-y-6" >
            <Suspense fallback={<Skeleton className="h-12 w-3/4" />}>
                <WelcomeMessage user={user} />
            </Suspense>

            < SearchBar />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
                <div className="md:col-span-2 space-y-6" >
                    <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                        <GlobalMessages />
                    </Suspense>

                    < Suspense fallback={< Skeleton className="h-[200px] w-full" />}>
                        <PersonalMessages userId={userId} />
                    </Suspense>

                    < Suspense fallback={< Skeleton className="h-[200px] w-full" />}>
                        <StatsCards userId={userId} />
                    </Suspense>

                    < Suspense fallback={< Skeleton className="h-[400px] w-full" />}>
                        <NoteList userId={userId} />
                    </Suspense>
                </div>

                < div className="space-y-6" >
                    <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                        <FolderList userId={userId} />
                    </Suspense>

                    < ActionButtons userId={userId} />
                </div>
            </div>
        </div>
    );
}
