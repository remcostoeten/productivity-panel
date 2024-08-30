'use client'

import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

export function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
    const [isPending, startTransition] = useTransition()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchQuery = e.target.value
        setSearchQuery(newSearchQuery)

        startTransition(() => {
            const params = new URLSearchParams(searchParams)
            if (newSearchQuery) {
                params.set('search', newSearchQuery)
            } else {
                params.delete('search')
            }
            router.push(`/dashboard?${params.toString()}`)
        })
    }

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <Input
                className="max-w-sm"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>
    )
}
