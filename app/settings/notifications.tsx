import { View, Text, StyleSheet, Switch } from "react-native";
import React from "react";

export default function NotificationsSettings() {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Push Notifications</Text>
        <Switch value={pushEnabled} onValueChange={setPushEnabled} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email Updates</Text>
        <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: "700", marginTop: 24 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  label: { fontSize: 16 },
});

