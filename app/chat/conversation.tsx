import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversation</Text>
      <Text style={styles.subtitle}>Chat ID: {id ?? "?"}</Text>
      <View style={styles.messages}>
        <Text style={styles.bubbleYou}>Hello!</Text>
        <Text style={styles.bubbleMe}>Hi, how are you?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginTop: 24 },
  subtitle: { color: "#6b7280", marginTop: 4 },
  messages: { marginTop: 16, gap: 8 },
  bubbleYou: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 12,
  },
  bubbleMe: {
    alignSelf: "flex-end",
    backgroundColor: "#111827",
    color: "white",
    padding: 10,
    borderRadius: 12,
  },
});

