import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={{ color: "#6b7280", marginTop: 4 }}>user@example.com</Text>
      <View style={{ marginTop: 16, gap: 12 }}>
        <Link href="/profile/edit">Edit Profile</Link>
        <Link href="/profile/preferences">Preferences</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginTop: 24 },
});

