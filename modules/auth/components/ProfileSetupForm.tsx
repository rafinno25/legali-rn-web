import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
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

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

interface ProfileSetupFormProps {
  onSubmit?: (data: { firstName: string; lastName: string; state: string }) => void;
  onCancel?: () => void;
}

export function ProfileSetupForm({ onSubmit, onCancel }: ProfileSetupFormProps) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [showStatePicker, setShowStatePicker] = useState(false);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const handleFinish = () => {
    if (onSubmit) {
      onSubmit({ firstName, lastName, state: selectedState });
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.brandName}>legali</Text>
          <Text style={styles.title}>Fill your credentials</Text>
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={48} color="#FFFFFF" />
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#0E2235" />
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="Enter your first name"
              placeholderTextColor="#9CA3AF"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Enter your last name"
              placeholderTextColor="#9CA3AF"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>State</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowStatePicker(true)}
              activeOpacity={0.8}
            >
              <Text style={selectedState ? styles.dropdownText : styles.dropdownPlaceholder}>
                {selectedState || "Select State"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} activeOpacity={0.8}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFinish} activeOpacity={0.8} style={styles.finishButtonWrapper}>
            <LinearGradient
              colors={["#FFFFFF", "#A4D1E8", "#A4D1E8"]}
              locations={[0, 0.3, 1]}
              style={styles.finishButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Text style={styles.finishButtonText}>Finish</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showStatePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowStatePicker(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowStatePicker(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select State</Text>
                <TouchableOpacity onPress={() => setShowStatePicker(false)}>
                  <Ionicons name="close" size={24} color="#0E2235" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={US_STATES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.stateItem}
                    onPress={() => {
                      setSelectedState(item);
                      setShowStatePicker(false);
                    }}
                  >
                    <Text style={styles.stateItemText}>{item}</Text>
                    {selectedState === item && (
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
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 32,
    minHeight: "100%",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  brandName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0E2235",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0E2235",
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#BED9EC",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formSection: {
    marginBottom: 48,
  },
  inputGroup: {
    marginBottom: 24,
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
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "rgba(14,34,53,0.15)",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0E2235",
  },
  dropdown: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "rgba(14,34,53,0.15)",
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
  buttonSection: {
    flexDirection: "row",
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "rgba(14,34,53,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E2235",
  },
  finishButtonWrapper: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#A4D1E8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  finishButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E2235",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
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
    borderBottomColor: "rgba(14,34,53,0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0E2235",
  },
  stateItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(14,34,53,0.1)",
  },
  stateItemText: {
    fontSize: 16,
    color: "#0E2235",
  },
});
