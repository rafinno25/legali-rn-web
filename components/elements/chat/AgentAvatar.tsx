import { View, StyleSheet } from "react-native";

interface Props {
  size?: number;
}

export function AgentAvatar({ size = 32 }: Props) {
  return <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]} />;
}

const styles = StyleSheet.create({
  avatar: { backgroundColor: "#111827" },
});