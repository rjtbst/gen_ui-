"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Page() {
  const [url, setUrl] = useState("");
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `/api/generate?url=${encodeURIComponent(url)}`,
  });

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🕸️ URL Scraper + AI Summary</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} className="space-y-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a webpage URL"
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {isLoading ? "Thinking..." : "Generate Summary"}
        </button>
      </form>

      <div className="mt-6 space-y-2">
        {messages.map((m, i) => (
          <p key={i} className={m.role === "user" ? "text-blue-600" : "text-green-700"}>
            {m.content}
          </p>
        ))}
      </div>
    </main>
  );
}
