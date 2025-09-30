import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  Modal,
  FlatList,
} from "react-native";
import { DocumentHeader } from "./DocumentHeader";

const TEMPLATES = [
  "Non-Disclosure Agreement (NDA)",
  "Service Agreement",
  "Employment Contract",
  "Lease Agreement",
  "Power of Attorney",
  "Terms of Service",
  "Privacy Policy",
  "Partnership Agreement",
  "Purchase Agreement",
  "Consulting Agreement",
];

const TAGS = [
  "Contract",
  "Agreement",
  "Legal Notice",
  "Corporate",
  "Employment",
  "Real Estate",
  "Intellectual Property",
  "Confidential",
  "Urgent",
  "Draft",
];

interface DocumentBuilderFormProps {
  onGenerate?: () => void;
}

export function DocumentBuilderForm({ onGenerate }: DocumentBuilderFormProps) {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [mandatoryInput1, setMandatoryInput1] = useState("");
  const [mandatoryInput2, setMandatoryInput2] = useState("");

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate();
    } else {
      router.push("/documents/recommendations");
    }
  };

  return (
    <View style={styles.container}>
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
        >
          <View style={styles.previewSection}>
            <Text style={styles.sectionTitle}>Document Preview</Text>
            <View style={styles.previewBox}>
              <Text style={styles.previewPlaceholder}>Document preview will appear here</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Save to File Organization</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
            <Ionicons name="download-outline" size={20} color="#32C282" style={{ marginRight: 8 }} />
            <Text style={styles.downloadButtonText}>Download</Text>
          </TouchableOpacity>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Choose your template</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowTemplatePicker(true)}
              activeOpacity={0.8}
            >
              <Text style={selectedTemplate ? styles.dropdownText : styles.dropdownPlaceholder}>
                {selectedTemplate || "Template Example"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Tag</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowTagPicker(true)}
              activeOpacity={0.8}
            >
              <Text style={selectedTag ? styles.dropdownText : styles.dropdownPlaceholder}>
                {selectedTag || "Tag"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.label}>Mandatory Input</Text>
            <TextInput
              placeholder="Template Example"
              placeholderTextColor="#9CA3AF"
              value={mandatoryInput1}
              onChangeText={setMandatoryInput1}
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: 16 }]}>Mandatory Input</Text>
            <TextInput
              placeholder="Template Example"
              placeholderTextColor="#9CA3AF"
              value={mandatoryInput2}
              onChangeText={setMandatoryInput2}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.generateButton} onPress={handleGenerate} activeOpacity={0.9}>
            <Text style={styles.generateButtonText}>Generate Document</Text>
          </TouchableOpacity>

          <Modal
            visible={showTemplatePicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowTemplatePicker(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowTemplatePicker(false)}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Template</Text>
                  <TouchableOpacity onPress={() => setShowTemplatePicker(false)}>
                    <Ionicons name="close" size={24} color="#0E2235" />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={TEMPLATES}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.pickerItem}
                      onPress={() => {
                        setSelectedTemplate(item);
                        setShowTemplatePicker(false);
                      }}
                    >
                      <Text style={styles.pickerItemText}>{item}</Text>
                      {selectedTemplate === item && (
                        <Ionicons name="checkmark" size={20} color="#32C282" />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <Modal
            visible={showTagPicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowTagPicker(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowTagPicker(false)}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Tag</Text>
                  <TouchableOpacity onPress={() => setShowTagPicker(false)}>
                    <Ionicons name="close" size={24} color="#0E2235" />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={TAGS}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.pickerItem}
                      onPress={() => {
                        setSelectedTag(item);
                        setShowTagPicker(false);
                      }}
                    >
                      <Text style={styles.pickerItemText}>{item}</Text>
                      {selectedTag === item && (
                        <Ionicons name="checkmark" size={20} color="#32C282" />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  previewSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0E2235",
    marginBottom: 12,
  },
  previewBox: {
    height: 400,
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  previewPlaceholder: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  saveButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(14, 34, 53, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
  },
  downloadButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#E6F7F2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#32C282",
  },
  formSection: {
    marginBottom: 24,
  },
  dropdown: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(14, 34, 53, 0.15)",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 16,
    color: "#0E2235",
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E2235",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(14, 34, 53, 0.15)",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0E2235",
  },
  generateButton: {
    height: 56,
    borderRadius: 20,
    backgroundColor: "#14213D",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#0E2235",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(14, 34, 53, 0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0E2235",
  },
  pickerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(14, 34, 53, 0.1)",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#0E2235",
  },
});