import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const REVISIONS = [
  {
    id: "1",
    section: "Non-Compete Clause (Section 7.2)",
    original:
      "Employee shall not engage in any competing business within 500 miles of any Company location for a period of 5 years after termination of employment.",
    revised:
      "Employee shall not engage in any directly competing business within 50 miles of Employee's primary work location for a period of 12 months after termination of employment.",
    reason:
      "Reduced scope to be more reasonable and legally enforceable. 500 miles and 5 years are likely unenforceable in most jurisdictions.",
  },
  {
    id: "2",
    section: "Termination Terms (Section 5.1)",
    original:
      "Employment may be terminated at Company's sole discretion without cause or notice.",
    revised:
      "Employment may be terminated by Company with 30 days written notice or 30 days severance pay in lieu of notice, except for termination with cause as defined in Section 5.2.",
    reason:
      "Added reasonable notice period and defined cause requirements to protect employee rights.",
  },
  {
    id: "3",
    section: "Overtime Compensation (Section 4.3)",
    original:
      "Salary covers all hours worked including overtime, weekends, and holidays without additional compensation.",
    revised:
      "Salary covers standard 40-hour work week. Overtime hours beyond 40 hours per week will be compensated at 1.5x regular hourly rate, in accordance with applicable labor laws.",
    reason:
      "Ensures compliance with federal and state labor laws regarding overtime pay for non-exempt employees.",
  },
  {
    id: "4",
    section: "Intellectual Property (Section 8.1)",
    original:
      "All inventions, discoveries, and creative works made during employment belong exclusively to the Company, including work done on personal time using personal equipment.",
    revised:
      "Inventions and works created within the scope of employment using Company resources belong to the Company. Personal projects created on personal time using personal resources remain Employee's property.",
    reason:
      "Clarifies IP ownership and protects employee's personal creative work outside of employment duties.",
  },
];

export function RedFlagRevisionsScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0E2235" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suggested Revisions</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introCard}>
          <Ionicons name="information-circle" size={24} color="#3B82F6" />
          <Text style={styles.introText}>
            We've identified problematic clauses and suggested legally-sound alternatives.
            Share these with your employer or legal counsel.
          </Text>
        </View>

        {REVISIONS.map((revision, index) => (
          <View key={revision.id} style={styles.revisionCard}>
            <View style={styles.revisionHeader}>
              <Text style={styles.revisionNumber}>Revision {index + 1}</Text>
              <Text style={styles.revisionSection}>{revision.section}</Text>
            </View>

            <View style={styles.comparisonContainer}>
              {/* Original Text */}
              <View style={styles.originalSection}>
                <View style={styles.labelRow}>
                  <Ionicons name="close-circle" size={16} color="#DC2626" />
                  <Text style={styles.sectionLabel}>Original</Text>
                </View>
                <Text style={styles.originalText}>{revision.original}</Text>
              </View>

              {/* Arrow Divider */}
              <View style={styles.arrowDivider}>
                <Ionicons name="arrow-down" size={20} color="#6B7280" />
              </View>

              {/* Revised Text */}
              <View style={styles.revisedSection}>
                <View style={styles.labelRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.sectionLabel}>Suggested Revision</Text>
                </View>
                <Text style={styles.revisedText}>{revision.revised}</Text>
              </View>
            </View>

            {/* Reason */}
            <View style={styles.reasonContainer}>
              <Ionicons name="bulb" size={16} color="#F59E0B" />
              <Text style={styles.reasonLabel}>Why this change?</Text>
            </View>
            <Text style={styles.reasonText}>{revision.reason}</Text>
          </View>
        ))}

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Next Steps</Text>
          <Text style={styles.footerText}>
            • Review these revisions with your legal counsel{"\n"}
            • Share this analysis with your employer{"\n"}
            • Request amendments before signing
          </Text>
        </View>
      </ScrollView>
    </View>
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
    paddingBottom: 40,
  },
  introCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  introText: {
    flex: 1,
    fontSize: 14,
    color: "#1E40AF",
    lineHeight: 20,
  },
  revisionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(191, 219, 254, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  revisionHeader: {
    marginBottom: 16,
  },
  revisionNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3B82F6",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  revisionSection: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E2235",
  },
  comparisonContainer: {
    marginBottom: 16,
  },
  originalSection: {
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: "#DC2626",
    marginBottom: 8,
  },
  revisedSection: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: "#10B981",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
  },
  originalText: {
    fontSize: 14,
    color: "#7F1D1D",
    lineHeight: 20,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  revisedText: {
    fontSize: 14,
    color: "#14532D",
    lineHeight: 20,
    fontWeight: "500",
  },
  arrowDivider: {
    alignItems: "center",
    paddingVertical: 8,
  },
  reasonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  reasonLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#92400E",
  },
  reasonText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    fontStyle: "italic",
  },
  footerCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E2235",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
  },
});