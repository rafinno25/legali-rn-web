import { View, StyleSheet } from "react-native";

export default function ChatMessagesSkeleton() {
  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, i) => (
        <View key={i} style={[styles.bubble, i % 2 === 0 ? styles.left : styles.right]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  bubble: {
    height: 18,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    width: "70%",
  },
  left: { alignSelf: "flex-start" },
  right: { alignSelf: "flex-end", backgroundColor: "#D1D5DB" },
});