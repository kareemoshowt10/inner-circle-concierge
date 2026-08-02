import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAnthropicClient } from "@/lib/anthropic";
import { getActiveProperty } from "@/lib/knowledgeBase";
import { buildSystemPrompt } from "@/lib/buildSystemPrompt";
import type { ChatMessage, ChatApiResponse } from "@/lib/types";

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 1024;
const MAX_HISTORY_TURNS = 20;
const MAX_MESSAGE_LENGTH = 2000;

const kb = getActiveProperty();
const SYSTEM_PROMPT = buildSystemPrompt(kb);

function fallbackResponse(reply: string): NextResponse<ChatApiResponse> {
  return NextResponse.json({ reply, escalate: true, error: true });
}

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong reading your message. Please try again.", escalate: false, error: true },
      { status: 400 }
    );
  }

  const messages = body.messages ?? [];
  if (messages.length === 0 || messages[messages.length - 1]?.role !== "user") {
    return NextResponse.json(
      { reply: "Please send a message first.", escalate: false, error: true },
      { status: 400 }
    );
  }

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.content.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({
      reply: "That message is a bit long — could you shorten it and try again?",
      escalate: false,
    });
  }

  const trimmedHistory = messages.slice(-MAX_HISTORY_TURNS);

  if (!process.env.ANTHROPIC_API_KEY) {
    return fallbackResponse(
      `Sorry, I'm having trouble connecting right now — please reach ${kb.host.name} directly.`
    );
  }

  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    let reply = textBlock && textBlock.type === "text" ? textBlock.text : "";
    let escalate = false;

    if (reply.startsWith("ESCALATE:")) {
      reply = reply.slice("ESCALATE:".length).trimStart();
      escalate = true;
    }

    if (!reply) {
      return fallbackResponse(
        `Sorry, I wasn't able to put together an answer — please reach ${kb.host.name} directly.`
      );
    }

    const result: ChatApiResponse = { reply, escalate };
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      console.error("Anthropic rate limit:", err);
    } else if (err instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic auth error:", err);
    } else if (err instanceof Anthropic.APIConnectionError) {
      console.error("Anthropic connection error:", err);
    } else if (err instanceof Anthropic.APIError) {
      console.error("Anthropic API error:", err);
    } else {
      console.error("Unexpected chat route error:", err);
    }

    return fallbackResponse(
      `Sorry, I'm having trouble connecting right now — please reach ${kb.host.name} directly.`
    );
  }
}
