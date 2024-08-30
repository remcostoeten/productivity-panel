import React from "react"

export function StatsCardsSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
            ))}
        </div>
    )
}

export function FolderListSkeleton() {
    return (
        <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-muted animate-pulse rounded" />
            ))}
        </div>
    )
}

export function NoteListSkeleton() {
    return (
        <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
            ))}
        </div>
    )
}
