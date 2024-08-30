"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/src/components/ui";
import {
  getUserMessages,
  markMessageAsRead,
  markMessageAsUnread,
} from "~/src/core/server/server-actions/messages";

type Message = {
  id: number;
  content: string;
  createdAt: Date;
  isRead: boolean;
};

type InboxMessagesProps = {
  filter: "unread" | "read" | "all";
};

export function InboxMessages({ filter }: InboxMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const fetchedMessages = await getUserMessages();
        setMessages(fetchedMessages);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setError("Failed to load messages. Please try again later.");
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((message) => {
    if (filter === "unread") return !message.isRead;
    if (filter === "read") return message.isRead;
    return true;
  });

  const handleToggleRead = async (messageId: number, currentState: boolean) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? { ...message, isRead: !currentState }
          : message,
      ),
    );

    try {
      if (currentState) {
        await markMessageAsUnread(messageId);
      } else {
        await markMessageAsRead(messageId);
      }
    } catch (error) {
      console.error("Failed to update message state:", error);
      // Revert the state if the server action fails
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId
            ? { ...message, isRead: currentState }
            : message,
        ),
      );
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div className="text-errorw">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {filteredMessages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={message.isRead ? "bg-gray-100" : ""}
          >
            <CardHeader>
              <CardTitle>{message.isRead ? "Read" : "Unread"}</CardTitle>
              <CardDescription>
                {new Date(message.createdAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{message.content}</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleToggleRead(message.id, message.isRead)}
              >
                Mark as {message.isRead ? "Unread" : "Read"}
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
