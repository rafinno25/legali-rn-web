import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AnonymousUserWarningModal } from "@/components/chat/AnonymousUserWarningModal";
import ChatInput from "@/components/chat/ChatInput";
import { ChatMessageList } from "@/components/chat/messages";
import { TypingIndicator } from "@/components/elements/chat";
import PromptSuggestions from "@/components/chat/PromptSuggestions";
import StreamingMessage from "@/components/chat/StreamingMessage";
import { Linking } from "react-native";
import UploadAnimation from "@/components/chat/UploadAnimation";
import HeroSection from "@/components/chat/HeroSection";
import { chatService, type Message } from "@/services/chat.service";
import { isAnonymousUser } from "@/lib/auth";
import { generalPromptSuggestions } from "@/data/chat.data";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { useChatHistory, useConversationLoader } from "@/hooks/use-chat-queries";

export default function ChatsScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState<string | undefined>(undefined);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAnonModal, setShowAnonModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversationTitle] = useState<string>("General");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { load: loadConversation, loading: isConversationLoading, error: loadError } = useConversationLoader();

  const {
    history: apiChatHistory,
    loading: isChatHistoryLoading,
    error: chatHistoryError,
  } = useChatHistory();

  const transformedChatHistory =
    apiChatHistory.map((item: any) => ({
      id: item.id,
      title: item.session_name || "New Chat",
      subtitle: item.conversation_type || "General",
      category: item.conversation_type || "General",
      timestamp: new Date(item.created_at).toLocaleTimeString(),
      conversationType: item.conversation_type,
    })) || [];

  useEffect(() => {
    // Show anonymous modal if user is anonymous
    (async () => {
      const anon = await isAnonymousUser();
      setShowAnonModal(anon);
    })();
  }, []);

  const handleSend = async (text: string) => {
    try {
      setError(null);
      setIsSending(true);
      const userMsg: Message = { id: `${Date.now()}`, content: text, isUser: true, timestamp: new Date() };
      setMessages(prev => [...prev, userMsg]);

      const res = await chatService.sendMessage({ user_input: text });
      if (!res.success || !res.data) {
        throw new Error(res.error || "Failed to send message");
      }

      const aiContent = res.data.output || "";
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        content: aiContent,
        isUser: false,
        timestamp: new Date(),
        conversation_id: res.data.conversation_id,
        // include workflow recommendations when present for parity with web
        // @ts-expect-error: extending message with recommendations
        workflow_recommendations: (res.data.workflow_recommendations as any) || [],
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unexpected error";
      setError(msg);
    } finally {
      setIsSending(false);
      setStreamingContent(undefined);
    }
  };

  const handleDocumentClick = (url: string, fileName: string) => {
    void Linking.openURL(url);
  };

  const handleAddMessage = (newMessage: any) => {
    const msg: Message = {
      id: `${Date.now()}`,
      content: String(newMessage?.content ?? ""),
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, msg]);
  };

  const handleRecommendationClick = (_recommendation: any) => {
    // Placeholder: navigation/parity can be added once routes are defined
  };

  const handleSelectChat = async (item: any) => {
    try {
      setError(null);
      setSelectedChatId(item.id);
      const loaded = await loadConversation(item.id);
      setMessages(loaded);
      // Optionally update title from item metadata
      // setConversationTitle(item.subtitle || item.category || "General");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load selected chat";
      setError(msg);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setIsSidebarOpen(true)} accessibilityRole="button" style={styles.headerButton}>
              <Text style={styles.headerButtonText}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{conversationTitle}</Text>
          </View>
        </View>

        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>
            All your progress is saved. You can leave and come back anytime to continue your conversation.
          </Text>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <LinearGradient
          colors={["#EDFAFF", "#FFFFFF", "#FFF2F9"]}
          locations={[0.02, 0.5, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.gradientBody, messages.length === 0 ? styles.centerBody : undefined]}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <HeroSection />
            </View>
          ) : (
            <>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <ChatMessageList
                messages={messages}
                chatId={selectedChatId ?? undefined}
                onDocumentClick={handleDocumentClick}
                onAddMessage={handleAddMessage}
                onRecommendationClick={handleRecommendationClick}
              />
              {(isSending || streamingContent) && (
                <View style={styles.statusCard}>
                  <Text style={styles.statusTitle}>Legal processing</Text>
                  <Text style={styles.statusText}>Legal processing...</Text>
                </View>
              )}
              {streamingContent ? <StreamingMessage content={streamingContent} /> : null}
              {isSending && (
                <View style={styles.typing}>
                  <TypingIndicator />
                </View>
              )}
              </ScrollView>
            </>
          )}
        </LinearGradient>

        <UploadAnimation uploading={uploading} />
        {messages.length === 0 ? (
          <PromptSuggestions
            suggestions={generalPromptSuggestions}
            onSelect={s => void handleSend(s.content || s.description)}
          />
        ) : null}
        <ChatInput
          onSend={handleSend}
          disabled={isSending}
          placeholder="How can we help? Type your concerns to be raised"
        />
      </KeyboardAvoidingView>
      <AnonymousUserWarningModal visible={showAnonModal} onClose={() => setShowAnonModal(false)} />
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentChatId={[...messages].reverse().find(m => m.conversation_id)?.conversation_id || null}
        chatHistory={transformedChatHistory}
        onSelectChat={handleSelectChat}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  flex: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 18, fontWeight: "600", color: "#111827", marginBottom: 4 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerButton: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB" },
  headerButtonText: { fontSize: 14, color: "#111827" },
  gradientBody: { flex: 1 },
  typing: { paddingHorizontal: 16, paddingBottom: 4 },
  error: { color: "#DC2626", paddingHorizontal: 16, paddingVertical: 8 },
  infoBanner: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#F9FAFB", borderBottomColor: "#E5E7EB", borderBottomWidth: 1 },
  infoText: { color: "#374151", fontSize: 12 },
  statusCard: { marginHorizontal: 16, marginTop: 10, backgroundColor: "#F3F4F6", borderColor: "#E5E7EB", borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  statusTitle: { fontSize: 12, color: "#111827", marginBottom: 4 },
  statusText: { fontSize: 14, color: "#065F46" },
  emptyState: { flex: 1, justifyContent: "center", alignItems: "center" },
  centerBody: { justifyContent: "center" },
});