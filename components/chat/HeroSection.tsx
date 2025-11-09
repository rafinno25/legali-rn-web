import { View, Text, StyleSheet } from "react-native";

export default function HeroSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your personalized AI legal confidant</Text>
      <Text style={styles.subtitle}>It&apos;s normal to feel unsure where to begin—just share what&apos;s on your mind, and we will guide you to the most helpful feature for your situation. You don&apos;t have to navigate alone; we will make sure you get the right support from the start.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 12, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "700", color: "#111827", textAlign: "center" },
  subtitle: { fontSize: 14, color: "#374151", marginTop: 4, textAlign: "center" },
});