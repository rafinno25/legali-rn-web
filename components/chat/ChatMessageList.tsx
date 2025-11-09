import { View, StyleSheet } from "react-native";
import type { Message } from "@/services/chat.service";
import { DossierMessage } from "./messages/DossierMessage";
import { MessageItem } from "./messages/MessageItem";

interface DossierData {
  url: string;
  fileName: string;
  fileSize: number;
  generatedAt?: string;
}

interface ExtendedMessage extends Message {
  dossier?: DossierData;
  workflow_recommendations?: any[];
}

interface Props {
  messages: ExtendedMessage[];
  chatId?: string | undefined;
  onDocumentClick: (url: string, fileName: string, generatedAt?: string) => void;
  onAddMessage?: (newMessage: any) => void;
  onRecommendationClick?: (recommendation: any) => void;
}

export default function ChatMessageList({ messages, chatId, onDocumentClick, onAddMessage, onRecommendationClick }: Props) {
  return (
    <View style={styles.container}>
      {messages.map((message, index) => {
        const isDossierOnly = (message as any).dossier && !message.content;
        if (isDossierOnly && (message as any).dossier) {
          return (
            <DossierMessage
              key={index}
              dossier={(message as any).dossier}
              timestamp={message.timestamp}
              onDocumentClick={onDocumentClick}
            />
          );
        }
        return (
          <View key={index} style={styles.item}>
            <MessageItem
              message={message as Message}
              chatId={chatId}
              onDocumentClick={(url, fileName) => onDocumentClick(url, fileName)}
              onAddMessage={onAddMessage}
              onRecommendationClick={onRecommendationClick}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  item: { marginBottom: 16 },
  bubble: {},
});