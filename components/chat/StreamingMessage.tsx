import { View, Text, StyleSheet } from "react-native";
import { AgentAvatar } from "@/components/elements/chat/AgentAvatar";

interface Props {
  content: string;
}

export default function StreamingMessage({ content }: Props) {
  return (
    <View style={styles.container}>
      <AgentAvatar size={28} />
      <View style={styles.bubble}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 16, marginTop: 4 },
  bubble: { backgroundColor: "#E5E7EB", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, maxWidth: "80%", marginLeft: 8 },
  text: { color: "#111827", fontSize: 16 },
});