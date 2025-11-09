import * as ImagePicker from "expo-image-picker";
import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  value?: string | null;
  onChange?: (file: { uri: string; name: string; type: string } | null, previewUrl?: string | null) => void;
  disabled?: boolean;
};

export function ProfileUpload({ value, onChange, disabled }: Props) {
  const [preview, setPreview] = React.useState<string | null>(value ?? null);

  const pickImage = async () => {
    if (disabled) return;
    const res = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!res.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      const file = { uri: asset.uri, name: asset.fileName ?? "profile.jpg", type: asset.type ?? "image/jpeg" } as any;
      setPreview(asset.uri);
      onChange?.(file, asset.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatar} onPress={pickImage} activeOpacity={0.8} disabled={disabled}>
        {preview ? (
          <Image source={{ uri: preview }} style={styles.image} />
        ) : (
          <Text style={styles.initial}>+</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.hint}>Tap to upload a new photo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 8 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  image: { width: "100%", height: "100%" },
  initial: { fontSize: 32, color: "#9CA3AF", fontWeight: "600" },
  hint: { fontSize: 12, color: "#6B7280" },
});