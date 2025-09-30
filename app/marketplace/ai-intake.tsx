import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
}

const initialAIMessage: Message = {
  id: "1",
  text: "Hi! I'm your AI legal assistant. I'll help match you with the perfect lawyer for your case. Could you tell me what legal issue you're facing?",
  isAI: true,
  timestamp: new Date(),
};

const mockAIResponses = [
  "Thank you for sharing that. To help me find the best lawyer for you, could you provide more details about your situation?",
  "I understand. That sounds like a [case type] matter. Have you already taken any legal action, or is this a new situation?",
  "Got it. Based on what you've told me, I can connect you with lawyers who specialize in this area. Do you have any documents related to this case you'd like to share?",
  "Perfect! I'm analyzing your case details now. Based on your situation, I've found several qualified lawyers who can help. Let me show you the best matches...",
];

export default function AIIntakeScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([initialAIMessage]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(1)).current;

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isAI: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);

        const nextStep = conversationStep + 1;
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: mockAIResponses[Math.min(nextStep, mockAIResponses.length - 1)],
          isAI: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        setConversationStep(nextStep);

        // After the first AI response, add hardcoded user response and final AI message
        if (nextStep === 1) {
          setTimeout(() => {
            // Add hardcoded user response
            const hardcodedUserMessage: Message = {
              id: (Date.now() + 2).toString(),
              text: "This is a new situation. I haven't taken any legal action yet, but I need guidance on how to proceed.",
              isAI: false,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, hardcodedUserMessage]);
            setIsTyping(true);

            // Add final AI message and redirect
            setTimeout(() => {
              setIsTyping(false);
              const finalAIMessage: Message = {
                id: (Date.now() + 3).toString(),
                text: "Perfect! I understand your situation. Based on what you've told me about your small claims case, I'm now matching you with qualified lawyers who specialize in this area. Let me show you the best matches...",
                isAI: true,
                timestamp: new Date(),
              };
              setMessages((prev) => [...prev, finalAIMessage]);

              // Show loading screen before navigating
              setTimeout(() => {
                setShowLoading(true);
                // Fade in loading overlay
                Animated.parallel([
                  Animated.timing(loadingOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                  Animated.loop(
                    Animated.sequence([
                      Animated.timing(iconRotate, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                      }),
                      Animated.timing(iconRotate, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                      }),
                    ])
                  ),
                  Animated.loop(
                    Animated.sequence([
                      Animated.timing(iconScale, {
                        toValue: 1.1,
                        duration: 1000,
                        useNativeDriver: true,
                      }),
                      Animated.timing(iconScale, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                      }),
                    ])
                  ),
                ]).start();

                // Navigate to marketplace after loading
                setTimeout(() => {
                  router.push("/marketplace");
                }, 2500);
              }, 1500);
            }, 1500);
          }, 1000);
        }
      }, 1500);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

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
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.6}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Find Your Lawyer</Text>
              <Text style={styles.headerSubtitle}>AI-Powered Matching</Text>
            </View>
            <View style={styles.headerRight} />
          </View>

          {/* Messages Area */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {/* Hero Section - Shows only before first user message */}
            {messages.length === 1 && (
              <View style={styles.heroSection}>
                <Image
                  source={require("@/assets/images/legali_icon_main.png")}
                  style={styles.mainLogo}
                  resizeMode="contain"
                />
                <Text style={styles.heroTitle}>Find Your Perfect Lawyer Match</Text>
                <Text style={styles.heroSubtitle}>
                  Tell us about your case and we'll connect you with the right experts
                </Text>
                <View style={styles.trustIndicators}>
                  <View style={styles.trustItem}>
                    <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                    <Text style={styles.trustText}>Secure & Confidential</Text>
                  </View>
                  <View style={styles.trustItem}>
                    <Ionicons name="bulb-outline" size={16} color="#F59E0B" />
                    <Text style={styles.trustText}>AI-Powered</Text>
                  </View>
                  <View style={styles.trustItem}>
                    <Ionicons name="ribbon-outline" size={16} color="#8B5CF6" />
                    <Text style={styles.trustText}>Lawyer-Verified</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  message.isAI ? styles.aiMessageRow : styles.userMessageRow,
                ]}
              >
                {message.isAI && (
                  <View style={styles.aiAvatar}>
                    <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.isAI ? styles.aiMessageBubble : styles.userMessageBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.isAI ? styles.aiMessageText : styles.userMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <View style={styles.messageRow}>
                <View style={styles.aiAvatar}>
                  <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                </View>
                <View style={[styles.messageBubble, styles.aiMessageBubble]}>
                  <View style={styles.typingDots}>
                    <View style={[styles.dot, styles.dot1]} />
                    <View style={[styles.dot, styles.dot2]} />
                    <View style={[styles.dot, styles.dot3]} />
                  </View>
                </View>
              </View>
            )}

            {/* Quick Action Suggestions - Shows only on first message */}
            {messages.length === 1 && (
              <View style={styles.quickActions}>
                <Text style={styles.quickActionsTitle}>Common issues:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.quickChipsContainer}
                >
                  <Pressable
                    style={styles.quickChip}
                    onPress={() => setInputText("I need help with a contract dispute")}
                  >
                    <Text style={styles.quickChipText}>Contract dispute</Text>
                  </Pressable>
                  <Pressable
                    style={styles.quickChip}
                    onPress={() => setInputText("I'm dealing with a small claims case")}
                  >
                    <Text style={styles.quickChipText}>Small claims</Text>
                  </Pressable>
                  <Pressable
                    style={styles.quickChip}
                    onPress={() => setInputText("I have a real estate issue")}
                  >
                    <Text style={styles.quickChipText}>Real estate issue</Text>
                  </Pressable>
                  <Pressable
                    style={styles.quickChip}
                    onPress={() => setInputText("I need legal advice on employment matters")}
                  >
                    <Text style={styles.quickChipText}>Employment law</Text>
                  </Pressable>
                </ScrollView>
              </View>
            )}
          </ScrollView>

          {/* Input Footer */}
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.attachButton} activeOpacity={0.6}>
                <Ionicons name="document-attach-outline" size={24} color="#6B7280" />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder="Describe your legal situation..."
                placeholderTextColor="#9CA3AF"
                value={inputText}
                onChangeText={setInputText}
                multiline
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity
                style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                activeOpacity={0.8}
                onPress={handleSend}
                disabled={!inputText.trim()}
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Loading Overlay */}
        {showLoading && (
          <Animated.View
            style={[
              styles.loadingOverlay,
              {
                opacity: loadingOpacity,
              },
            ]}
          >
            <View style={styles.loadingContainer}>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: iconRotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                    { scale: iconScale },
                  ],
                }}
              >
                <View style={styles.loadingIconCircle}>
                  <Ionicons name="sparkles" size={48} color="#2B8CAF" />
                </View>
              </Animated.View>
              <Text style={styles.loadingTitle}>Looking for best matched lawyers...</Text>
              <Text style={styles.loadingSubtitle}>Analyzing your case details</Text>
              <View style={styles.loadingDots}>
                <LoadingDots />
              </View>
            </View>
          </Animated.View>
        )}
      </SafeAreaView>
    </SoftSkyBackdrop>
  );
}

function LoadingDots() {
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

  return <Text style={styles.dotsText}>{dots}</Text>;
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(63, 167, 204, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingBottom: 32,
  },
  mainLogo: {
    width: 200,
    height: 80,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  trustIndicators: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 16,
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  trustText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  aiMessageRow: {
    justifyContent: "flex-start",
  },
  userMessageRow: {
    justifyContent: "flex-end",
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2B8CAF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
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
  aiMessageBubble: {
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
  aiMessageText: {
    color: "#1F2937",
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9CA3AF",
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  quickActions: {
    marginTop: 8,
  },
  quickActionsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 12,
    paddingLeft: 4,
  },
  quickChipsContainer: {
    gap: 10,
  },
  quickChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(63, 167, 204, 0.3)",
  },
  quickChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3FA7CC",
  },
  footer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
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
  sendButtonDisabled: {
    backgroundColor: "#9CA3AF",
    opacity: 0.5,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  loadingIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(43, 140, 175, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 16,
  },
  loadingDots: {
    minHeight: 24,
  },
  dotsText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2B8CAF",
    letterSpacing: 2,
  },
});
