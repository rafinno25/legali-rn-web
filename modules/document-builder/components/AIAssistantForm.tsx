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
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentHeader } from "./DocumentHeader";

interface AIAssistantFormProps {
  onGenerate?: () => void;
  onAlreadyKnow?: () => void;
}

export function AIAssistantForm({ onGenerate, onAlreadyKnow }: AIAssistantFormProps) {
  const router = useRouter();
  const [caseDescription, setCaseDescription] = useState("");

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate();
    } else {
      router.push("/documents/recommendations");
    }
  };

  const handleAlreadyKnow = () => {
    if (onAlreadyKnow) {
      onAlreadyKnow();
    } else {
      router.push("/documents/form-builder");
    }
  };

  const handleMicrophonePress = () => {
    // Will implement voice API later
  };

  return (
    <SafeAreaView style={styles.container}>
      <DocumentHeader />

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
          <View style={styles.mainContent}>
            <View style={styles.contentCard}>
              <Text style={styles.title}>Not sure which document you need?</Text>

              <Text style={styles.description}>
                Chat with us about your situation and we will guide you to the right legal document. Or, if you already know what you need, skip straight to the template.
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Describe your situation"
                  placeholderTextColor="#9CA3AF"
                  value={caseDescription}
                  onChangeText={setCaseDescription}
                  style={styles.textInput}
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.actionSection}>
                <TouchableOpacity
                  style={styles.microphoneButton}
                  onPress={handleMicrophonePress}
                  activeOpacity={0.7}
                >
                  <Ionicons name="mic-outline" size={28} color="#6B7280" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.generateButton}
                  onPress={handleGenerate}
                  activeOpacity={0.9}
                >
                  <Text style={styles.generateButtonText}>Generate Document</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.alreadyKnowLink}
                onPress={handleAlreadyKnow}
                activeOpacity={0.7}
              >
                <Text style={styles.alreadyKnowText}>I know what I need</Text>
              </TouchableOpacity>
            </View>
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 32,
    justifyContent: "center",
  },
  contentCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0E2235",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "rgba(14, 34, 53, 0.15)",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: "#0E2235",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    minHeight: 140,
    maxHeight: 200,
  },
  actionSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  microphoneButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(14, 34, 53, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  generateButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#14213D",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0E2235",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  alreadyKnowLink: {
    alignItems: "center",
  },
  alreadyKnowText: {
    fontSize: 16,
    color: "#3B82F6",
    textDecorationLine: "underline",
  },
});
