"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  createNotification,
  getNotifications,
  updateNotificationStatus,
} from "~/src/core/server/server-actions/notifications";

export default function Inbox() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.isRead).length);
  }, [notifications]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
      if (data.length === 0) {
        await createWelcomeMessages();
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
    setLoading(false);
  };

  const createWelcomeMessages = async () => {
    const welcomeMessages = [
      "Welcome to our platform! We're excited to have you on board.",
      "Don't forget to complete your profile to get the most out of your experience.",
    ];
    for (const message of welcomeMessages) {
      await createNotification(message);
    }
    await fetchNotifications();
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateNotificationStatus(id, !currentStatus);
      setNotifications(
        notifications.map((notif) =>
          notif.id === id ? { ...notif, isRead: !currentStatus } : notif,
        ),
      );
    } catch (error) {
      console.error("Failed to update notification status:", error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          Inbox
          <motion.span
            key={unreadCount}
            className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {unreadCount}
          </motion.span>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={fetchNotifications}>
          <Bell className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <motion.div
              className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-center text-muted-foreground">No notifications</p>
        ) : (
          <ScrollArea className="h-[300px]">
            <AnimatePresence>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start space-x-4 p-4 ${
                    notification.isRead ? "opacity-50" : ""
                  }`}
                >
                  <Bell className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.createdAt * 1000).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      toggleReadStatus(notification.id, notification.isRead)
                    }
                  >
                    {notification.isRead ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
