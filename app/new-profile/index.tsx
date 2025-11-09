import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import Button from "@/components/Button";
import { StateDropdown } from "@/components/modules/StateDropdown";
import { CityDropdown } from "@/components/modules/CityDropdown";
import { ProfileUpload } from "@/components/elements/ProfileUpload";
import { useProfileMutation } from "@/hooks/use-profile";
import { useAuth } from "@/contexts/AuthProvider";
import { Ionicons } from "@expo/vector-icons";

export default function NewProfileScreen() {
  const router = useRouter();
  const { mutateWithToast } = useProfileMutation();
  const { user, logout } = useAuth();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState(""); // display placeholder as dd/mm/yyyy
  const [stateId, setStateId] = useState<string | undefined>(undefined);
  const [cityId, setCityId] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<{ uri: string; name: string; type: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [subscriptionType, setSubscriptionType] = useState("");
  const [tokenUsage, setTokenUsage] = useState("0");
  const [storageUsage, setStorageUsage] = useState("0");
  const [isEditing, setIsEditing] = useState(false);

  const validateDate = (val: string) => {
    // very light validation for YYYY-MM-DD
    if (!val) return true;
    const match = /^\d{4}-\d{2}-\d{2}$/.test(val);
    return match;
  };

  const handleSubmit = async () => {
    if (!firstname.trim() || !lastname.trim()) {
      Alert.alert("Missing info", "Please enter your first and last name.");
      return;
    }
    if (dob && !validateDate(dob)) {
      Alert.alert("Invalid date", "Date of birth must be in YYYY-MM-DD format.");
      return;
    }

    try {
      await mutateWithToast(
        {
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          city_id: cityId ? Number(cityId) : undefined,
          date_of_birth: dob || undefined,
          file: file || undefined,
        },
        () => {
          router.replace("/profile");
        }
      );
    } catch (err: any) {
      Alert.alert("Profile update failed", err?.message || "Please try again.");
    }
  };

  return (
    <SoftSkyBackdrop>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.topHeader}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
              <Ionicons name="menu" size={22} color="#0E2235" />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="person-circle-outline" size={28} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.avatarSection}>
              <ProfileUpload
                value={previewUrl}
                onChange={(
                  picked: { uri: string; name: string; type: string } | null,
                  preview?: string | null
                ) => {
                  setFile(picked ?? null);
                  setPreviewUrl(preview ?? null);
                }}
              />
              <Text style={styles.greeting}>Hello, {(user?.first_name || "").trim()} {(user?.last_name || "").trim()}</Text>
            </View>

            <View style={styles.formSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name</Text>
              <TextInput
                placeholder="John"
                value={firstname}
                onChangeText={setFirstname}
                style={styles.input}
                autoCapitalize="words"
                editable={isEditing}
              />
              </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                placeholder="Doe"
                value={lastname}
                onChangeText={setLastname}
                style={styles.input}
                autoCapitalize="words"
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                placeholder="dd/mm/yyyy"
                value={dob}
                onChangeText={setDob}
                style={styles.input}
                keyboardType="numbers-and-punctuation"
                editable={isEditing}
              />
              {!!dob && !validateDate(dob) && <Text style={styles.hintError}>Use format YYYY-MM-DD</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subscription Type</Text>
              <TextInput
                placeholder=""
                value={subscriptionType}
                onChangeText={setSubscriptionType}
                style={styles.input}
                editable={isEditing}
              />
            </View>

            {/* <View style={styles.inputGroup}>
              <Text style={styles.label}>State</Text>
              <StateDropdown value={stateId} onChange={val => { setStateId(val); setCityId(undefined); }} disabled={!isEditing} />
            </View> */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>City</Text>
              <CityDropdown stateId={stateId} value={cityId} onChange={setCityId} disabled={!isEditing} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Token Usage</Text>
              <TextInput
                placeholder="0"
                value={tokenUsage}
                onChangeText={setTokenUsage}
                style={styles.input}
                keyboardType="numeric"
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Storage Usage</Text>
              <TextInput
                placeholder="0"
                value={storageUsage}
                onChangeText={setStorageUsage}
                style={styles.input}
                keyboardType="numeric"
                editable={isEditing}
              />
            </View>
            </View>

            <View style={styles.actions}>
              {isEditing ? (
                <Button title="Save" onPress={handleSubmit} />
              ) : (
                <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                  <Ionicons name="pencil" size={18} color="#FFFFFF" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                <Ionicons name="log-out-outline" size={18} color="#FFFFFF" />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, alignItems: "center" },
  topHeader: { width: "100%", maxWidth: 680, flexDirection: "row", alignItems: "center", marginBottom: 8 },
  headerIcon: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  card: {
    width: "100%",
    maxWidth: 680,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(14,34,53,0.12)",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarSection: { alignItems: "center", marginBottom: 20 },
  greeting: { marginTop: 8, fontSize: 16, fontWeight: "600", color: "#0E2235" },
  formSection: { marginBottom: 8 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#0E2235", marginBottom: 8 },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#0E2235",
  },
  hintError: { marginTop: 6, color: "#DC2626", fontSize: 12 },
  actions: { marginTop: 8, gap: 8, alignItems: "center" },
  editButton: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#3FA7CC", paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10 },
  editButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  logoutButton: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#EF4444", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  logoutButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});