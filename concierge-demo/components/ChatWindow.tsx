"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import HostContactCard from "./HostContactCard";
import type { ChatApiResponse, ChatMessage } from "@/lib/types";

interface DisplayMessage extends ChatMessage {
  escalate?: boolean;
}

interface ChatWindowProps {
  propertyName: string;
  hostName: string;
  hostPhone: string;
  hostEmail: string;
}

export default function ChatWindow({ propertyName, hostName, hostPhone, hostEmail }: ChatWindowProps) {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      role: "assistant",
      content: `Hi! I'm the AI concierge for ${propertyName}. Ask me about check-in, wifi, the pool/spa, parking, house rules, or things to do nearby — I'm happy to help.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: DisplayMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data: ChatApiResponse = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply, escalate: data.escalate }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I'm having trouble connecting right now — please reach ${hostName} directly.`,
          escalate: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-dvh flex-col bg-[#F7F1E8]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EADFCB] bg-[#F7F1E8]/95 px-4 py-3 backdrop-blur">
        <div>
          <h1 className="font-serif text-lg font-semibold text-[#3B2A21]">{propertyName}</h1>
          <p className="text-xs text-[#8A7860]">Ask your AI concierge</p>
        </div>
        <a
          href={`tel:${hostPhone}`}
          className="rounded-full border border-[#E3B98A] bg-white px-3 py-1.5 text-xs font-medium text-[#8A4B1F] shadow-sm"
        >
          Contact host
        </a>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className="flex flex-col gap-2">
              <MessageBubble message={m} />
              {m.role === "assistant" && m.escalate && (
                <HostContactCard hostName={hostName} phone={hostPhone} email={hostEmail} />
              )}
            </div>
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 border-t border-[#EADFCB] bg-[#F7F1E8] px-4 py-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your stay..."
            className="flex-1 rounded-full border border-[#EADFCB] bg-white px-4 py-2.5 text-[15px] text-[#3B2A21] outline-none focus:border-[#C1622D]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full bg-gradient-to-br from-[#E08D4B] to-[#C1622D] px-5 py-2.5 text-sm font-medium text-[#FBF3E7] shadow-sm disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
