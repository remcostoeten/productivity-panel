'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SearchBar() {
    const [query, setQuery] = useState('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/dashboard/search?q=${encodeURIComponent(query)}`)
    }

    return (
        <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search notes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8"
            />
        </form>
    )
} 
