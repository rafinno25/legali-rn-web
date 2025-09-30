import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RedFlagHeader } from "./RedFlagHeader";

export function RedFlagAnalysisInput() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      router.push("/red-flag-analysis/results");
    }
  };

  const handleUpload = () => {
    // UI only - no functionality yet
  };

  const handleVoice = () => {
    // UI only - no functionality yet
  };

  return (
    <SafeAreaView style={styles.container}>
      <RedFlagHeader />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* Center Content */}
          <View style={styles.centerContent}>
            <Image
              source={require("@/assets/images/legali_icon_main.png")}
              style={styles.mainLogo}
              resizeMode="contain"
            />
            <Text style={styles.tagline}>Spot legal risks before they become problems</Text>
            <Text style={styles.subtitle}>
              Our AI-assisted analysis is designed by lawyers and refined by legal-tech experts to deliver accurate results with minimal hallucination. You remain in control—every decision stays in your hands.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Upload your documents, share your concerns, or simply ask a question—we’ll take it from there"
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              style={styles.input}
              multiline={true}
              textAlignVertical="top"
              onSubmitEditing={handleSubmit}
            />
            <View style={styles.buttonsRow}>
              <View style={styles.leftButtons}>
                <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                  <Ionicons name="document-attach" size={22} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.voiceButton} onPress={handleVoice}>
                  <Ionicons name="mic-outline" size={22} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !inputText.trim() && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!inputText.trim()}
              >
                <Ionicons
                  name="arrow-up"
                  size={24}
                  color={inputText.trim() ? "#FFFFFF" : "#9CA3AF"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  mainLogo: {
    width: 200,
    height: 80,
    marginBottom: 24,
  },
  tagline: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0E2235",
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 32,
  },
  inputSection: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    paddingTop: 16,
  },
  inputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    minHeight: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(191, 219, 254, 0.6)",
  },
  input: {
    fontSize: 16,
    color: "#0E2235",
    minHeight: 48,
    maxHeight: 120,
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  uploadButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  voiceButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#14213D",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
});
