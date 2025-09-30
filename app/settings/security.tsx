import { View, Text, StyleSheet } from "react-native";

export default function SecuritySettings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security</Text>
      <View style={styles.block}>
        <Text style={styles.itemTitle}>Two-Factor Authentication</Text>
        <Text style={styles.itemSub}>Configure 2FA methods</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.itemTitle}>Active Sessions</Text>
        <Text style={styles.itemSub}>Manage logged-in devices</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginTop: 24, marginBottom: 12 },
  block: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemSub: { color: "#6b7280" },
});

