import { View, StyleSheet } from "react-native";

export function TypingIndicator() {
  return (
    <View style={styles.container}>
      <View style={[styles.dot, styles.dot1]} />
      <View style={[styles.dot, styles.dot2]} />
      <View style={[styles.dot, styles.dot3]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#9CA3AF", marginHorizontal: 2 },
  dot1: { opacity: 0.6 },
  dot2: { opacity: 0.8 },
  dot3: { opacity: 1 },
});