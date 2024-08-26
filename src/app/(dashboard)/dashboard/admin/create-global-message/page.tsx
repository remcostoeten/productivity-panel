"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "~/src/components/ui";
import { createGlobalMessage } from "~/src/core/server/server-actions/global-messages";

export default function CreateGlobalMessagePage() {
  const [content, setContent] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await createGlobalMessage({
        content,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      });
      setSuccess(true);
      setContent("");
      setExpiresAt("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Global Message</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block mb-2">
            Message Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expiresAt" className="block mb-2">
            Expires At (optional)
          </label>
          <Input
            type="datetime-local"
            id="expiresAt"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </div>
        <Button type="submit">Create Global Message</Button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && (
        <p className="text-green-500 mt-4">
          Global message created successfully!
        </p>
      )}
    </div>
  );
}
