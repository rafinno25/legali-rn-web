import { View, Text, StyleSheet, Switch } from "react-native";
import React from "react";

export default function PreferencesScreen() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Compact Layout</Text>
        <Switch value={compact} onValueChange={setCompact} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginTop: 24, marginBottom: 8 },
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

