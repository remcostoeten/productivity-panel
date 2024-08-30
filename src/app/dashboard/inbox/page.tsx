
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/';
import { Suspense } from "react";
import { InboxMessages } from "./inbox-messages";

export default function InboxPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <Tabs defaultValue="unread">
        <TabsList>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="unread">
          <Suspense fallback={<div>Loading...</div>}>
            <InboxMessages filter="unread" />
          </Suspense>
        </TabsContent>
        <TabsContent value="read">
          <Suspense fallback={<div>Loading...</div>}>
            <InboxMessages filter="read" />
          </Suspense>
        </TabsContent>
        <TabsContent value="all">
          <Suspense fallback={<div>Loading...</div>}>
            <InboxMessages filter="all" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
