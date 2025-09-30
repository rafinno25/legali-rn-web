import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function Button({ title, onPress, style }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}
      android_ripple={{ color: "#e5e7eb" }}>
      {({ pressed }) => (
        <Text style={[styles.text, pressed && { opacity: 0.7 }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

