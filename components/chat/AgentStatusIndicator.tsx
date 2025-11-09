import { View, Text, StyleSheet } from "react-native";

interface AgentStatus {
  status: "pending" | "completed";
  message: string;
}

interface Props {
  statuses?: AgentStatus[];
  className?: string; // for web parity, unused on RN
}

export default function AgentStatusIndicator({ statuses }: Props) {
  // Simple mobile indicator; ignore statuses for now
  return (
    <View style={styles.container} accessibilityRole="text" accessibilityLabel="Agent status">
      <View style={styles.dot} />
      <Text style={styles.text}>{statuses && statuses.length ? "Legali processing" : "Agent Online"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#10B981", marginRight: 6 },
  text: { fontSize: 12, color: "#065F46" },
});