'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { markMessageAsRead } from '@/core/server/server-actions/messages'
import { getGlobalMessages } from '@/core/server/server-actions/users/get-global-messages'
import { useUser } from '@clerk/nextjs'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

type GlobalMessage = {
    id: string
    content: string
    createdAt: number
    expiresAt: number | null
}

export function GlobalMessages() {
    const { user } = useUser()
    const [messages, setMessages] = useState<GlobalMessage[]>([])

    useEffect(() => {
        if (user) {
            getGlobalMessages(user.id).then(setMessages)
        }
    }, [user])

    const handleDismiss = async (messageId: string) => {
        if (user) {
            await markMessageAsRead(user.id, messageId)
            setMessages(messages.filter(m => m.id !== messageId))
        }
    }

    if (messages.length === 0) {
        return null
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Messages</CardTitle>
            </CardHeader>
            <CardContent>
                {messages.map(message => (
                    <div key={message.id} className="mb-4 p-4 bg-secondary rounded-lg relative">
                        <p>{message.content}</p>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => handleDismiss(message.id)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
