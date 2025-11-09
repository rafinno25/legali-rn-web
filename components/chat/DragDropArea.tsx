import { View, Text, StyleSheet } from "react-native";

interface Props {
  children?: React.ReactNode;
}

export default function DragDropArea({ children }: Props) {
  // Mobile doesn't support desktop-style drag and drop; this acts as a simple wrapper.
  return (
    <View style={styles.container}>
      {children}
      <Text style={styles.hint}>Tip: Attachments coming soon on mobile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hint: { textAlign: "center", color: "#6B7280", paddingVertical: 8, fontSize: 12 },
});