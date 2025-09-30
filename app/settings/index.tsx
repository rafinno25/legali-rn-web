import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={{ marginTop: 12, gap: 12 }}>
        <Link href="/settings/notifications">Notifications</Link>
        <Link href="/settings/security">Security</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginTop: 24 },
});

