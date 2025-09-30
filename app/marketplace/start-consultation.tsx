import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import { mockLawyers } from "@/modules/marketplace/data/mockLawyers";

export default function StartConsultationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

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

  return (
    <SoftSkyBackdrop>
      <SafeAreaView style={styles.container} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.6}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#3FA7CC" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Start Consultation</Text>
            <Text style={styles.subtitle}>Choose how you'd like to connect</Text>
          </View>

          {/* Lawyer Summary Card */}
          <View style={styles.lawyerSummaryCard}>
            <Image source={{ uri: lawyer.photoUrl }} style={styles.lawyerAvatar} />
            <View style={styles.lawyerInfo}>
              <Text style={styles.lawyerName}>{lawyer.name}</Text>
              <Text style={styles.lawyerAreas}>
                {lawyer.practiceAreas.join(", ")}
              </Text>
              <Text style={styles.lawyerRate}>${lawyer.hourlyRate}/hr</Text>
            </View>
          </View>

          {/* Consultation Options */}
          <View style={styles.optionsContainer}>
            {/* Message Chat - Primary */}
            <TouchableOpacity
              style={[styles.optionCard, styles.primaryOption]}
              activeOpacity={0.85}
              onPress={() => router.push(`/marketplace/chat/${id}`)}
            >
              <View style={styles.optionLeftContainer}>
                <View style={styles.optionIconContainer}>
                  <View style={[styles.optionIconCircle, styles.primaryIconCircle]}>
                    <Ionicons name="chatbubble-outline" size={28} color="#FFFFFF" />
                  </View>
                </View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionTitle, styles.primaryOptionTitle]}>
                    Message Chat
                  </Text>
                  <Text style={[styles.optionDescription, styles.primaryOptionDescription]}>
                    Start a secure text conversation
                  </Text>
                </View>
              </View>
              <View style={styles.optionChevronContainer}>
                <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.9)" />
              </View>
            </TouchableOpacity>

            {/* Phone Call */}
            <TouchableOpacity
              style={[styles.optionCard, styles.secondaryOption]}
              activeOpacity={0.85}
              onPress={() => { }}
            >
              <View style={styles.optionLeftContainer}>
                <View style={styles.optionIconContainer}>
                  <View style={[styles.optionIconCircle, styles.secondaryIconCircle]}>
                    <Ionicons name="call-outline" size={28} color="#3FA7CC" />
                  </View>
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Phone Call</Text>
                  <Text style={styles.optionDescription}>Schedule or call now</Text>
                </View>
              </View>
              <View style={styles.optionChevronContainer}>
                <Ionicons name="chevron-forward" size={24} color="#6B7280" />
              </View>
            </TouchableOpacity>

            {/* Video Consultation */}
            <TouchableOpacity
              style={[styles.optionCard, styles.secondaryOption]}
              activeOpacity={0.85}
              onPress={() => { }}
            >
              <View style={styles.optionLeftContainer}>
                <View style={styles.optionIconContainer}>
                  <View style={[styles.optionIconCircle, styles.secondaryIconCircle]}>
                    <Ionicons name="videocam-outline" size={28} color="#3FA7CC" />
                  </View>
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Video Consultation</Text>
                  <Text style={styles.optionDescription}>Face-to-face meeting online</Text>
                </View>
              </View>
              <View style={styles.optionChevronContainer}>
                <Ionicons name="chevron-forward" size={24} color="#6B7280" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Case Details Footer */}
          <View style={styles.caseDetailsBox}>
            <View style={styles.caseDetailsHeader}>
              <Ionicons name="briefcase-outline" size={20} color="#3FA7CC" />
              <Text style={styles.caseDetailsTitle}>Your Case Details</Text>
            </View>
            <Text style={styles.caseDetailsText}>
              Johnson v. Smith - Small Claims will be shared with the lawyer automatically
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  backText: {
    fontSize: 17,
    color: "#3FA7CC",
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  lawyerSummaryCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  lawyerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E5F3F8",
    marginRight: 12,
  },
  lawyerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  lawyerAreas: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  lawyerRate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3FA7CC",
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 7,
  },
  primaryOption: {
    backgroundColor: "#2B8CAF",
    borderWidth: 0,
    opacity: 1,
  },
  secondaryOption: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    opacity: 0.95,
  },
  optionPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  optionLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIconContainer: {
    marginRight: 16,
  },
  optionIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryIconCircle: {
    backgroundColor: "rgba(255, 255, 255, 0.30)",
  },
  secondaryIconCircle: {
    backgroundColor: "rgba(63, 167, 204, 0.12)",
  },
  optionContent: {
    flexDirection: "column",
  },
  optionChevronContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  primaryOptionTitle: {
    color: "#FFFFFF",
  },
  optionDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  primaryOptionDescription: {
    color: "rgba(255, 255, 255, 0.95)",
  },
  caseDetailsBox: {
    backgroundColor: "rgba(63, 167, 204, 0.12)",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3FA7CC",
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
    color: "#3FA7CC",
  },
  caseDetailsText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
});
