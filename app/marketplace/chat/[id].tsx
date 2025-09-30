import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import { mockLawyers } from "@/modules/marketplace/data/mockLawyers";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isLawyer: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "lawyer-1",
    text: "Hi! I've reviewed your case details. I have extensive experience with small claims contract disputes. I can help you prepare your documents and represent you if needed. What questions do you have?",
    timestamp: new Date(),
    isLawyer: true,
  },
  {
    id: "2",
    senderId: "user-1",
    text: "Thanks! I need help filing the complaint and understanding the timeline for my case.",
    timestamp: new Date(),
    isLawyer: false,
  },
];

function TypingIndicator({ lawyerPhoto }: { lawyerPhoto: string }) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ".";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.messageRow}>
      <Image source={{ uri: lawyerPhoto }} style={styles.messageAvatar} />
      <View style={[styles.messageBubble, styles.lawyerMessageBubble]}>
        <Text style={styles.typingText}>{dots}</Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const lawyer = mockLawyers.find((l) => l.id === id);

  if (!lawyer) {
    return (
      <SoftSkyBackdrop>
        <SafeAreaView style={styles.container}>
          <Text>Lawyer not found</Text>
        </SafeAreaView>
      </SoftSkyBackdrop>
    );
  }

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "user-1",
        text: inputText.trim(),
        timestamp: new Date(),
        isLawyer: false,
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SoftSkyBackdrop>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.6}
                onPress={() => router.back()}
              >
                <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.lawyerInfoContainer}>
                <Image source={{ uri: lawyer.photoUrl }} style={styles.lawyerPhoto} />
                <View style={styles.lawyerTextInfo}>
                  <Text style={styles.lawyerName}>{lawyer.name}</Text>
                  <View style={styles.statusContainer}>
                    <View style={styles.onlineIndicator} />
                    <Text style={styles.statusText}>Online</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.videoButton} activeOpacity={0.8}>
              <Ionicons name="videocam" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Messages Area */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {/* Connection Banner */}
            <View style={styles.connectionBanner}>
              <Text style={styles.connectionText}>Connected with {lawyer.name}</Text>
            </View>

            {/* Case Details Card */}
            <View style={styles.caseDetailsCard}>
              <View style={styles.caseDetailsHeader}>
                <Ionicons name="shield-checkmark" size={20} color="#5B4FE5" />
                <Text style={styles.caseDetailsTitle}>Case Details Shared</Text>
              </View>
              <Text style={styles.caseDetailsText}>
                Johnson v. Smith - Small Claims · Timeline & Documents automatically shared
              </Text>
            </View>

            {/* Messages */}
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  message.isLawyer ? styles.lawyerMessageRow : styles.userMessageRow,
                ]}
              >
                {message.isLawyer && (
                  <Image source={{ uri: lawyer.photoUrl }} style={styles.messageAvatar} />
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.isLawyer ? styles.lawyerMessageBubble : styles.userMessageBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.isLawyer ? styles.lawyerMessageText : styles.userMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator lawyerPhoto={lawyer.photoUrl} />}

            <View style={styles.messageTimestamp}>
              <Text style={styles.timestampText}>Just now</Text>
            </View>
          </ScrollView>

          {/* Input Footer */}
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.attachButton} activeOpacity={0.6}>
                <Ionicons name="attach" size={24} color="#6B7280" />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder="Type your message..."
                placeholderTextColor="#9CA3AF"
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              <TouchableOpacity
                style={styles.sendButton}
                activeOpacity={0.8}
                onPress={handleSend}
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.billingNotice}>
              <Ionicons name="time-outline" size={16} color="#059669" />
              <Text style={styles.billingText}>Billable time starts after consultation agreement</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#2B8CAF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    marginRight: 8,
  },
  lawyerInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  lawyerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#E5F3F8",
  },
  lawyerTextInfo: {
    flex: 1,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  videoButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  connectionBanner: {
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  connectionText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  caseDetailsCard: {
    backgroundColor: "rgba(91, 79, 229, 0.08)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#5B4FE5",
  },
  caseDetailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  caseDetailsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5B4FE5",
  },
  caseDetailsText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  lawyerMessageRow: {
    justifyContent: "flex-start",
  },
  userMessageRow: {
    justifyContent: "flex-end",
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#E5F3F8",
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lawyerMessageBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
  },
  userMessageBubble: {
    backgroundColor: "#2B8CAF",
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  lawyerMessageText: {
    color: "#1F2937",
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  typingText: {
    fontSize: 28,
    color: "#6B7280",
    fontWeight: "700",
    lineHeight: 28,
  },
  messageTimestamp: {
    alignItems: "center",
    marginTop: 8,
  },
  timestampText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  footer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  attachButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#1F2937",
    maxHeight: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2B8CAF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  billingNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  billingText: {
    fontSize: 13,
    color: "#059669",
    fontWeight: "500",
  },
});
