'use client'

import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Input, Label, Switch, Textarea } from "@/components/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createGlobalMessage, createPersonalMessage } from "@/core/server/server-actions/messages"
import { AnimatePresence, motion } from "framer-motion"
import { Globe, Loader2, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function CreateMessagePage() {
  const [content, setContent] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [recipientId, setRecipientId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("global")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (activeTab === "global") {
        await createGlobalMessage({
          content,
          expiresAt: expiresAt ? new Date(expiresAt) : undefined,
          isUrgent,
        })
      } else {
        await createPersonalMessage({
          content,
          recipientId,
          expiresAt: expiresAt ? new Date(expiresAt) : undefined,
          isUrgent,
        })
      }

      toast({
        title: "Success",
        description: `${activeTab === "global" ? "Global" : "Personal"} message created successfully!`,
        duration: 3000,
      })

      setContent("")
      setExpiresAt("")
      setIsUrgent(false)
      setRecipientId("")
      router.refresh()
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="rounded-lg border bg-card text-card-foreground shadow-sm break-all w-max max-w-2xl h-max">
      <CardHeader>
        <CardTitle>Create Message</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="global">Global Message</TabsTrigger>
            <TabsTrigger value="personal">Personal Message</TabsTrigger>
          </TabsList>
          <TabsContent value="global">
            <p className="text-sm text-muted-foreground mb-4">
              Create a message that will be shown to all users.
            </p>
          </TabsContent>
          <TabsContent value="personal">
            <p className="text-sm text-muted-foreground mb-4">
              Create a message for a specific user.
            </p>
          </TabsContent>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Message Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          {activeTab === "personal" && (
            <div className="space-y-2">
              <Label htmlFor="recipientId">Recipient ID</Label>
              <Input
                id="recipientId"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="expiresAt">Expires At (optional)</Label>
            <Input
              type="datetime-local"
              id="expiresAt"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="urgent"
              checked={isUrgent}
              onCheckedChange={setIsUrgent}
            />
            <Label htmlFor="urgent">Mark as Urgent</Label>
          </div>

          <AnimatePresence>
            {content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-secondary p-4 rounded-md"
              >
                <h3 className="font-semibold mb-2">Preview:</h3>
                <p>{content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : activeTab === "global" ? (
            <Globe className="mr-2 h-4 w-4" />
          ) : (
            <User className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Creating..." : `Create ${activeTab === "global" ? "Global" : "Personal"} Message`}
        </Button>
      </CardFooter>
    </Card>
  )
}
