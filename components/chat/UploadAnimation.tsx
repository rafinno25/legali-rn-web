import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface Props {
  uploading: boolean;
}

export default function UploadAnimation({ uploading }: Props) {
  if (!uploading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#111827" />
      <Text style={styles.text}>Uploading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 6 },
  text: { marginLeft: 8, color: "#374151" },
});