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
import { RedFlagHeader } from "./RedFlagHeader";

const AI_GENERATED_EMAIL = {
  subject: "Request for Employment Agreement Review and Amendments",
  body: `Dear Jennifer,

Thank you for extending the offer of employment at Caffeinated Cloud. I am excited about the opportunity to join your team.

After carefully reviewing the employment agreement, I would like to discuss a few clauses that I believe could benefit from clarification and amendment to ensure mutual understanding and fairness:

1. Non-Compete Clause (Section 7.2): The current 5-year restriction across 500 miles appears overly broad. I would like to propose reducing this to 12 months within 50 miles of my primary work location, which is more standard in our industry.

2. Termination Terms (Section 5.1): I would appreciate the inclusion of a reasonable notice period (30 days) and a clear definition of "cause" for termination.

3. Overtime Compensation (Section 4.3): To ensure compliance with labor laws, I'd like to clarify that overtime beyond 40 hours per week will be compensated appropriately.

4. Intellectual Property (Section 8.1): I would like to request that personal projects created on my own time using personal resources remain my property.

I have attached a detailed analysis with suggested revisions for your review. I believe these amendments will create a more balanced agreement while protecting both parties' interests.

I remain very enthusiastic about this opportunity and look forward to discussing these points with you. Please let me know a convenient time for us to connect.

Best regards,
Alexa`,
};

export function DraftEmailScreen() {
  const router = useRouter();
  const [subject, setSubject] = useState(AI_GENERATED_EMAIL.subject);
  const [emailBody, setEmailBody] = useState(AI_GENERATED_EMAIL.body);

  const handleBack = () => {
    router.back();
  };

  const handleCopy = () => {
    // Copy to clipboard - UI only for now
  };

  const handleSend = () => {
    // Open native email client - UI only for now
  };

  return (
    <SafeAreaView style={styles.container}>
      <RedFlagHeader title="Draft Response Email" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <Ionicons name="sparkles" size={20} color="#8B5CF6" />
              <Text style={styles.aiText}>AI-Generated Draft</Text>
            </View>
            <Text style={styles.aiDescription}>
              This draft has been prepared using Legali’s lawyer-trained analysis engine, which combines advanced language models with legal-tech safeguards, and is tailored to the specific red flags identified in your document. Please note that these tools and resources are informational only and are not a substitute for advice from a licensed attorney.

              We aim to support your decision-making and preparation for matters such as litigation, contract drafting, or legal research. However, it is essential that you review this draft carefully and make any edits necessary to ensure its accuracy, appropriateness, and compliance with your circumstances before relying on it.

              For tailored legal advice or formal representation, we strongly recommend consulting a qualified attorney—available directly through our Lawyers Marketplace. The final responsibility for this communication remains with you.
            </Text>
          </View>

          <View style={styles.emailContainer}>
            {/* Subject Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject</Text>
              <TextInput
                value={subject}
                onChangeText={setSubject}
                style={styles.subjectInput}
                placeholder="Email subject"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Email Body Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Message</Text>
              <TextInput
                value={emailBody}
                onChangeText={setEmailBody}
                style={styles.bodyInput}
                placeholder="Email body"
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb" size={18} color="#F59E0B" />
              <Text style={styles.tipsTitle}>Professional Tips</Text>
            </View>
            <View style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Be polite and professional in your tone</Text>
            </View>
            <View style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Focus on mutual benefit, not just your concerns</Text>
            </View>
            <View style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Attach the detailed analysis for reference</Text>
            </View>
            <View style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Request a call to discuss rather than demanding changes</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Buttons */}
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Ionicons name="copy-outline" size={20} color="#0E2235" />
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#FFFFFF" />
            <Text style={styles.sendButtonText}>Open in Email App</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(14, 34, 53, 0.1)",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0E2235",
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  aiCard: {
    backgroundColor: "#F5F3FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  aiText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B21A8",
  },
  aiDescription: {
    fontSize: 13,
    color: "#6B21A8",
    lineHeight: 18,
  },
  emailContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(191, 219, 254, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  subjectInput: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#0E2235",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bodyInput: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#0E2235",
    minHeight: 350,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tipsCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400E",
  },
  tipRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  tipBullet: {
    fontSize: 14,
    color: "#92400E",
    marginRight: 8,
    fontWeight: "600",
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: "#78350F",
    lineHeight: 18,
  },
  actionBar: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(14, 34, 53, 0.1)",
  },
  copyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  copyButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0E2235",
  },
  sendButton: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#14213D",
    borderRadius: 12,
    paddingVertical: 14,
  },
  sendButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
