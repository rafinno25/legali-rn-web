import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeatureCarousel } from "../../../components/FeatureCarousel";
import { AnimatedCyclingText } from "./AnimatedCyclingText";


const ANIMATED_PHRASES = [
  "build case",
  "organize evidence",
  "submit filings",
  "fund litigation",
];

export function OnboardingWelcome() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    router.push("/onboarding");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentWrapper}>
            <View style={styles.headerSection}>
              <Text style={styles.title}>Meet your own</Text>
              <Text style={styles.title}>AI-law firm</Text>

              <Text style={styles.description}>
                Legali helps you
              </Text>

              <View style={styles.animatedTextWrapper}>
                <AnimatedCyclingText
                  phrases={ANIMATED_PHRASES}
                  style={styles.animatedDescription}
                />
              </View>

              <Text style={styles.descriptionBottom}>
                Human experts are in the loop.
              </Text>
            </View>

            <View style={styles.inputSection}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Upload your words, voice, or photos — we can make it work"
                  placeholderTextColor="#9CA3AF"
                  value={inputText}
                  onChangeText={setInputText}
                  style={styles.input}
                  multiline={true}
                  textAlignVertical="bottom"
                />
                <View style={styles.buttonsRow}>
                  <TouchableOpacity style={styles.attachButton}>
                    <Ionicons name="attach" size={24} color="#9CA3AF" />
                  </TouchableOpacity>
                  <View style={styles.rightButtons}>
                    <TouchableOpacity style={styles.micButton}>
                      <Ionicons name="mic-outline" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                      <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <FeatureCarousel />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 32,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  descriptionWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  legaliIcon: {
    width: 50,
    height: 24,
    marginTop: 21,
  },
  animatedTextWrapper: {
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0E2235",
    textAlign: "center",
    lineHeight: 42,
  },
  description: {
    fontSize: 18,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 20,
  },
  animatedDescription: {
    fontSize: 18,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "700",
  },
  descriptionBottom: {
    fontSize: 18,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 24,
  },
  inputSection: {
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 28,
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 16,
    minHeight: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  input: {
    fontSize: 16,
    color: "#0E2235",
    minHeight: 24,
    maxHeight: 100,
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attachButton: {
    width: 32,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  micButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#14213D",
    alignItems: "center",
    justifyContent: "center",
  },
});
