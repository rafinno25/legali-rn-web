import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import type { PromptSuggestion } from "@/data/chat.data";
import { useMemo } from "react";

// Simple shuffle function using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface Props {
  suggestions: PromptSuggestion[];
  onSelect: (suggestion: PromptSuggestion) => void;
}

export default function PromptSuggestions({ suggestions, onSelect }: Props) {
  const shuffledSuggestions = useMemo(() => shuffleArray(suggestions), [suggestions]);
  
return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {shuffledSuggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            activeOpacity={0.8}
            onPress={() =>
              onSelect(suggestion)
            }
          >
            <Text numberOfLines={2} style={styles.text}>
              {suggestion.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.5)", // gray-200/50
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "rgba(171, 216, 255, 0.3)",
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },
});

export type { PromptSuggestion };