import { View, Text, TextInput, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Button from "@/components/Button";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="you@example.com" autoCapitalize="none" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="••••••••" secureTextEntry />
        <Button title="Continue" />
      </View>
      <View style={{ height: 16 }} />
      <Link href="/auth/signup">Create an account</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16 },
  title: { fontSize: 28, fontWeight: "700", marginTop: 24 },
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
