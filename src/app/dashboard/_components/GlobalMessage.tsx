import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getGlobalMessages, markMessageAsRead } from "@/core/server/server-actions/messages"
import { X } from "lucide-react"

export async function GlobalMessages() {
    const messages = await getGlobalMessages()

    if (messages.length === 0) {
        return null
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Global Messages</CardTitle>
            </CardHeader>
            <CardContent>
                {messages.map(message => (
                    <div key={message.id} className="mb-4 p-4 bg-secondary rounded-lg relative">
                        <p>{message.content}</p>
                        <form action={markMessageAsRead.bind(null, message.id)}>
                            <Button
                                type="submit"
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
