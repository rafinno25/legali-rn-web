import { View, Text, StyleSheet } from "react-native";
import { AgentAvatar } from "@/components/elements/chat";
import { MarkdownRenderer } from "@/components/elements/chat/MarkdownRenderer";
import { formatTimestamp } from "@/lib/chat-formatting-helpers";
import { WorkflowRecommendations } from "@/components/elements/chat/workflow-recommendations";
import { AttachmentList } from "./AttachmentList";
import type { Message } from "@/services/chat.service";

interface MessageItemProps {
  message: Message & { workflow_recommendations?: any[] };
  onDocumentClick: (url: string, fileName: string) => void;
  onAddMessage?: (newMessage: any) => void;
  onRecommendationClick?: (recommendation: any) => void;
  chatId?: string | undefined;
}

export function MessageItem({ message, onDocumentClick, onAddMessage, onRecommendationClick, chatId }: MessageItemProps) {
  return (
    <View style={[styles.row, message.isUser ? styles.rowUser : styles.rowAgent]}>
      {!message.isUser && <AgentAvatar size={32} />}
      <View style={[styles.bubble, message.isUser ? styles.userBubble : styles.agentBubble]}>
        {message.isUser ? (
          <MarkdownRenderer content={message.content} isUser={true} messageRole={message.role} />
        ) : (
          <View>
            {message.content ? (
              <MarkdownRenderer content={message.content} isUser={false} messageRole={message.role} />
            ) : null}

            {message.workflow_recommendations && message.workflow_recommendations.length > 0 ? (
              <View style={styles.recoBox}>
                <WorkflowRecommendations
                  recommendations={message.workflow_recommendations as any[]}
                  {...(onAddMessage && { onAddMessage: msg => onAddMessage(msg as any) })}
                  onRecommendationClick={(recommendation: any) => {
                    onRecommendationClick?.(recommendation);
                  }}
                  conversationId={chatId}
                />
              </View>
            ) : null}
          </View>
        )}

        {message.timestamp ? (
          <Text style={[styles.ts, message.isUser ? styles.tsUser : styles.tsAgent]}>{formatTimestamp(message.timestamp)}</Text>
        ) : null}

        {message.attachments && message.attachments.length > 0 ? (
          <AttachmentList attachments={message.attachments as any} isUserMessage={message.isUser} onDocumentClick={onDocumentClick} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  rowUser: { flexDirection: "row-reverse", justifyContent: "flex-start" },
  rowAgent: { flexDirection: "row", justifyContent: "flex-start" },
  bubble: { maxWidth: 340, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  userBubble: { backgroundColor: "#3B82F6", color: "#FFFFFF" },
  agentBubble: { borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" },
  recoBox: { marginTop: 8, borderRadius: 12, borderWidth: 1, borderColor: "#87CEEB", backgroundColor: "#FFFFFFCC", padding: 8, shadowOpacity: 0.1, shadowRadius: 2 },
  ts: { marginTop: 4, fontSize: 12 },
  tsUser: { color: "#DBEAFE" },
  tsAgent: { color: "#6B7280" },
});