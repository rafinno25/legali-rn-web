import { View, StyleSheet } from "react-native";

export default function ChatPageSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.sidebar} />
      <View style={styles.content} />
      <View style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 50, backgroundColor: "#F3F4F6" },
  sidebar: { height: 40, backgroundColor: "#F9FAFB" },
  content: { flex: 1, backgroundColor: "#FFFFFF" },
  input: { height: 60, backgroundColor: "#F3F4F6" },
});