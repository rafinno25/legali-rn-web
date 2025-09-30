import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentHeader } from "./DocumentHeader";

interface Template {
  name: string;
  description: string;
}

const RECOMMENDED_TEMPLATES: Template[] = [
  {
    name: "Non-Disclosure Agreement",
    description: "Protect confidential information shared between parties during business discussions or negotiations.",
  },
  {
    name: "Service Agreement",
    description: "Define terms and conditions for professional services, including scope, payment, and deliverables.",
  },
];

interface TemplateRecommendationProps {
  onTemplateSelect?: (template: Template) => void;
  onGoToBuilder?: () => void;
}

export function TemplateRecommendation({ onTemplateSelect, onGoToBuilder }: TemplateRecommendationProps) {
  const router = useRouter();

  const handleTemplateSelect = (template: Template) => {
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  const handleGoToBuilder = () => {
    if (onGoToBuilder) {
      onGoToBuilder();
    } else {
      router.push("/documents");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DocumentHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Here's the document we recommend</Text>
          <Text style={styles.subtitle}>
            Based on what you told us, this template fits your situation best. You can start filling it out right away.
          </Text>

          <View style={styles.cardsContainer}>
            {RECOMMENDED_TEMPLATES.map((template, index) => (
              <View key={index} style={styles.templateCard}>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateDescription}>{template.description}</Text>
                <TouchableOpacity
                  style={styles.useTemplateButton}
                  onPress={() => handleTemplateSelect(template)}
                  activeOpacity={0.9}
                >
                  <Text style={styles.useTemplateText}>Use this template</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.goToBuilderLink}
            onPress={handleGoToBuilder}
            activeOpacity={0.7}
          >
            <Text style={styles.goToBuilderText}>Go to Smart Legal Drafter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0E2235",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    width: "100%",
    gap: 20,
    marginBottom: 32,
  },
  templateCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  templateName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0E2235",
    marginBottom: 12,
  },
  templateDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },
  useTemplateButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#14213D",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0E2235",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  useTemplateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  goToBuilderLink: {
    marginTop: 8,
  },
  goToBuilderText: {
    fontSize: 16,
    color: "#3B82F6",
    textDecorationLine: "underline",
  },
});
