import type { ChatMessage } from "@/lib/types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-[#E08D4B] to-[#C1622D] text-[#FBF3E7] rounded-br-sm"
            : "bg-white text-[#3B2A21] border border-[#EADFCB] rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
