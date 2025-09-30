import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "../../components/Button";

export default function ProfileEditScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Your name" />
        <Text style={styles.label}>Bio</Text>
        <TextInput style={[styles.input, { height: 80 }]} placeholder="Tell something about you" multiline />
        <Button title="Save" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: "700", marginTop: 24 },
  form: { marginTop: 16, gap: 8 },
  label: { fontSize: 14, color: "#374151" },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});

