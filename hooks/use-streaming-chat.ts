import { useState } from "react";
import { chatService, type Message } from "@/services/chat.service";

export function useStreamingChat() {
  const [streamingContent, setStreamingContent] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (text: string): Promise<{ user: Message; ai?: Message }> => {
    setError(null);
    const userMsg: Message = { id: `${Date.now()}`, content: text, isUser: true, timestamp: new Date() };
    setIsStreaming(true);
    setStreamingContent("");
    try {
      const res = await chatService.sendMessage({ user_input: text });
      if (!res.success || !res.data) {
        throw new Error(res.error || "Failed to send message");
      }
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        content: res.data.output || "",
        isUser: false,
        timestamp: new Date(),
        conversation_id: res.data.conversation_id,
      };
      return { user: userMsg, ai: aiMsg };
    } catch (e: any) {
      setError(e?.message || "Failed to send message");
      return { user: userMsg };
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
    }
  };

  return { streamingContent, isStreaming, send, error } as const;
}