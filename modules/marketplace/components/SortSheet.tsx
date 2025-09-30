import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SortOption = "rating" | "price-low" | "price-high" | "name";

interface SortSheetProps {
  currentSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  onClose: () => void;
}

const SORT_OPTIONS: { value: SortOption; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { value: "rating", label: "Highest Rated", icon: "star" },
  { value: "price-low", label: "Price: Low to High", icon: "arrow-up" },
  { value: "price-high", label: "Price: High to Low", icon: "arrow-down" },
  { value: "name", label: "Name: A-Z", icon: "text" },
];

export function SortSheet({ currentSort, onSelectSort, onClose }: SortSheetProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.handle} />
        <Text style={styles.title}>Sort by</Text>
      </View>

      <View style={styles.options}>
        {SORT_OPTIONS.map((option) => (
          <Pressable
            key={option.value}
            style={({ pressed }) => [
              styles.option,
              pressed && styles.optionPressed,
              currentSort === option.value && styles.optionActive,
            ]}
            onPress={() => {
              onSelectSort(option.value);
              onClose();
            }}
          >
            <View style={styles.optionContent}>
              <Ionicons
                name={option.icon}
                size={20}
                color={currentSort === option.value ? "#3FA7CC" : "#6B7280"}
              />
              <Text
                style={[
                  styles.optionText,
                  currentSort === option.value && styles.optionTextActive,
                ]}
              >
                {option.label}
              </Text>
            </View>
            {currentSort === option.value && (
              <Ionicons name="checkmark" size={20} color="#3FA7CC" />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  options: {
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  optionPressed: {
    opacity: 0.6,
  },
  optionActive: {
    backgroundColor: "transparent",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  optionText: {
    fontSize: 17,
    color: "#1F2937",
  },
  optionTextActive: {
    color: "#3FA7CC",
    fontWeight: "600",
  },
});