import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RedFlagHeader } from "./RedFlagHeader";

interface RedFlag {
  id: string;
  title: string;
  severity: "MEDIUM" | "HIGH" | "CRITICAL";
  description: string;
  examples: string[];
}

const ANALYSIS_DATA = {
  documentType: "Employment Agreement",
  status: "High Risk",
  redFlagsCount: 4,
  confidence: 85,
  keyIndicators: [
    "Document contains overly broad non-compete restrictions that may be unenforceable",
    "Termination clauses favor employer with minimal employee protections",
    "Intellectual property assignment extends beyond reasonable work scope",
  ],
};

const RED_FLAGS: RedFlag[] = [
  {
    id: "1",
    title: "Unreasonable Non-Compete Clause",
    severity: "HIGH",
    description:
      "The non-compete clause is overly broad in geographic scope and duration. A 5-year restriction within 500 miles may be deemed unenforceable in many jurisdictions.",
    examples: [
      "Employee shall not engage in any competing business within 500 miles for 5 years after termination",
      "Restriction applies to any industry remotely related to company's business",
    ],
  },
  {
    id: "2",
    title: "Unclear Termination Terms",
    severity: "MEDIUM",
    description:
      "Termination clause lacks clear definition of 'cause' and gives employer broad discretion to terminate without explanation or severance.",
    examples: [
      "Employment may be terminated at company's sole discretion without cause or notice",
      "No severance pay required for termination without cause",
    ],
  },
  {
    id: "3",
    title: "Unpaid Overtime Clause",
    severity: "CRITICAL",
    description:
      "Salary structure attempts to waive overtime pay rights, which may violate federal and state labor laws for non-exempt employees.",
    examples: [
      "Salary covers all hours worked including overtime, weekends, and holidays without additional compensation",
      "Employee agrees to work such hours as necessary to complete assigned duties",
    ],
  },
  {
    id: "4",
    title: "Intellectual Property Overreach",
    severity: "HIGH",
    description:
      "IP assignment clause is overly broad and claims ownership of inventions created outside work hours using personal resources.",
    examples: [
      "All inventions, discoveries, and creative works made during employment belong exclusively to the company",
      "This includes work done on personal time using personal equipment and resources",
    ],
  },
];

const SEVERITY_COLORS = {
  MEDIUM: { bg: "#FEF3C7", text: "#D97706", border: "#FCD34D" },
  HIGH: { bg: "#FEE2E2", text: "#DC2626", border: "#FCA5A5" },
  CRITICAL: { bg: "#FEE2E2", text: "#991B1B", border: "#DC2626" },
};

export function RedFlagAnalysisResults() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleViewRevisions = () => {
    router.push("/red-flag-analysis/revisions");
  };

  const handleDraftEmail = () => {
    router.push("/red-flag-analysis/draft-email");
  };

  const handleDownloadShare = () => {
    // Native share functionality - UI only for now
  };

  return (
    <SafeAreaView style={styles.container}>
      <RedFlagHeader title="Analysis Results" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Analysis Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <MaterialCommunityIcons name="file-document-outline" size={20} color="#0891B2" />
            <Text style={styles.summaryHeaderText}>Analysis Summary</Text>
          </View>

          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Ionicons name="alert-circle" size={28} color="#EF4444" />
              <Text style={styles.statValue}>{ANALYSIS_DATA.redFlagsCount}</Text>
              <Text style={styles.statLabel}>Red Flags</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <MaterialCommunityIcons name="shield-alert" size={28} color="#F59E0B" />
              <Text style={styles.statValue}>{ANALYSIS_DATA.status}</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Ionicons name="analytics" size={28} color="#10B981" />
              <Text style={styles.statValue}>{ANALYSIS_DATA.confidence}%</Text>
              <Text style={styles.statLabel}>Confidence</Text>
            </View>
          </View>
        </View>

        {/* Recommended Actions Card */}
        <View style={styles.actionsCard}>
          <View style={styles.actionsHeader}>
            <Ionicons name="flash" size={20} color="#F59E0B" />
            <Text style={styles.actionsHeaderText}>Next Steps</Text>
          </View>
          <Text style={styles.actionsSubtext}>Take action on these findings</Text>

          <TouchableOpacity style={styles.actionButton} onPress={handleViewRevisions} activeOpacity={0.7}>
            <View style={styles.actionButtonContent}>
              <View style={[styles.actionIconWrapper, { backgroundColor: "#EFF6FF" }]}>
                <Ionicons name="document-text" size={22} color="#3B82F6" />
              </View>
              <View style={styles.actionTextWrapper}>
                <Text style={styles.actionButtonTitle}>Review Suggested Revisions</Text>
                <Text style={styles.actionButtonDesc}>See AI-generated improvements with redlines</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleDraftEmail} activeOpacity={0.7}>
            <View style={styles.actionButtonContent}>
              <View style={[styles.actionIconWrapper, { backgroundColor: "#F0FDF4" }]}>
                <Ionicons name="mail" size={22} color="#10B981" />
              </View>
              <View style={styles.actionTextWrapper}>
                <Text style={styles.actionButtonTitle}>Draft Response Email</Text>
                <Text style={styles.actionButtonDesc}>Get help writing to your employer</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleDownloadShare} activeOpacity={0.7}>
            <View style={styles.actionButtonContent}>
              <View style={[styles.actionIconWrapper, { backgroundColor: "#FEF3C7" }]}>
                <Ionicons name="share-outline" size={22} color="#F59E0B" />
              </View>
              <View style={styles.actionTextWrapper}>
                <Text style={styles.actionButtonTitle}>Download & Share Report</Text>
                <Text style={styles.actionButtonDesc}>Export analysis for your records</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Document Intent Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text-outline" size={20} color="#0E2235" />
            <Text style={styles.sectionTitle}>Document Intent</Text>
          </View>

          <View style={styles.intentCard}>
            <View style={styles.intentHeader}>
              <Text style={styles.intentType}>Type: {ANALYSIS_DATA.documentType}</Text>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>{ANALYSIS_DATA.confidence}% Confidence</Text>
              </View>
            </View>

            <View style={styles.confidenceBar}>
              <View
                style={[
                  styles.confidenceFill,
                  { width: `${ANALYSIS_DATA.confidence}%` },
                ]}
              />
            </View>

            <Text style={styles.indicatorsTitle}>Key Indicators:</Text>
            {ANALYSIS_DATA.keyIndicators.map((indicator, index) => (
              <View key={index} style={styles.indicatorItem}>
                <Text style={styles.bullet}>›</Text>
                <Text style={styles.indicatorText}>{indicator}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Red Flags Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="warning-outline" size={20} color="#DC2626" />
            <Text style={styles.sectionTitle}>Red Flags</Text>
          </View>

          {RED_FLAGS.map((flag) => {
            const colors = SEVERITY_COLORS[flag.severity];
            return (
              <View key={flag.id} style={styles.redFlagCard}>
                <View style={styles.redFlagHeader}>
                  <View style={styles.redFlagTitleRow}>
                    <Ionicons name="alert-circle" size={20} color={colors.text} />
                    <Text style={styles.redFlagTitle}>{flag.title}</Text>
                  </View>
                  <View
                    style={[
                      styles.severityBadge,
                      { backgroundColor: colors.bg, borderColor: colors.border },
                    ]}
                  >
                    <Text style={[styles.severityText, { color: colors.text }]}>
                      {flag.severity}
                    </Text>
                  </View>
                </View>

                <Text style={styles.redFlagDescription}>{flag.description}</Text>

                <Text style={styles.examplesTitle}>Examples:</Text>
                {flag.examples.map((example, index) => (
                  <View key={index} style={styles.exampleItem}>
                    <Ionicons name="chatbox-ellipses-outline" size={14} color="#6B7280" />
                    <Text style={styles.exampleText}>{example}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(191, 219, 254, 0.8)",
    shadowColor: "#0891B2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  summaryHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E2235",
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: "rgba(191, 219, 254, 0.5)",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0E2235",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 4,
  },
  actionsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(251, 191, 36, 0.3)",
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  actionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  actionsHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0E2235",
  },
  actionsSubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  actionTextWrapper: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0E2235",
    marginBottom: 2,
  },
  actionButtonDesc: {
    fontSize: 13,
    color: "#6B7280",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0E2235",
  },
  intentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  intentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  intentType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E2235",
  },
  confidenceBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E40AF",
  },
  confidenceBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 16,
  },
  confidenceFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 4,
  },
  indicatorsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  indicatorItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    fontSize: 16,
    color: "#6B7280",
    marginRight: 8,
    fontWeight: "600",
  },
  indicatorText: {
    flex: 1,
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  redFlagCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#DC2626",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  redFlagHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  redFlagTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  redFlagTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E2235",
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  severityText: {
    fontSize: 11,
    fontWeight: "700",
  },
  redFlagDescription: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  examplesTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  exampleItem: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
    paddingLeft: 8,
  },
  exampleText: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
    lineHeight: 18,
  },
});