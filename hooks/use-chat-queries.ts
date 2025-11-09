import { useCallback, useEffect, useState } from "react";
import { chatService, type Message, type ChatHistoryItem } from "@/services/chat.service";

export function useChatHistory() {
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        // Align with available chatService method
        const res = await chatService.getChatHistory();
        if (res.success && res.data) {
          // Support both array and object shapes from service
          const data: any = res.data;
          const conversations = Array.isArray(data)
            ? data
            : Array.isArray(data?.conversations)
            ? data.conversations
            : [];
          setHistory(conversations as ChatHistoryItem[]);
        } else {
          setHistory([]);
        }
      } catch (e: any) {
        setError(e?.message || "Failed to load chat history");
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, []);

  return { history, loading, error } as const;
}

export function useChatConversation(conversationId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(!!conversationId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conversationId) return;
    const run = async () => {
      try {
        setLoading(true);
        // Use the method that accepts a conversation id
        const res = await chatService.getChatConversation(conversationId);
        if (res.success && res.data) {
          setMessages(res.data);
        }
      } catch (e: any) {
        setError(e?.message || "Failed to load conversation");
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [conversationId]);

  return { messages, loading, error } as const;
}

/**
 * useConversationLoader
 * On-demand conversation fetcher to load messages when a user selects a chat.
 * Keeps loading and error state localized; returns the fetched messages.
 */
export function useConversationLoader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (chatId: string): Promise<Message[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await chatService.getChatConversation(chatId);
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error(res.error || "Failed to load conversation");
    } catch (e: any) {
      const msg = e?.message || "Failed to load conversation";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { load, loading, error } as const;
}