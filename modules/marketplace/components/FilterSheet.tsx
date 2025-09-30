import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export interface FilterOptions {
  practiceAreas: string[];
  priceRange: { min: number; max: number };
  minRating: number | null;
  location: string | null;
}

interface FilterSheetProps {
  currentFilters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
  onClose: () => void;
}

const PRACTICE_AREAS = [
  "Business Law",
  "Contract Law",
  "Corporate Law",
  "Criminal Defense",
  "Employment Law",
  "Family Law",
  "Immigration Law",
  "Intellectual Property",
  "Labor Law",
  "Medical Malpractice",
  "Patent Law",
  "Personal Injury",
  "Real Estate Law",
];

const PRICE_RANGES = [
  { label: "Under $250", min: 0, max: 250 },
  { label: "$250 - $300", min: 250, max: 300 },
  { label: "$300 - $350", min: 300, max: 350 },
  { label: "$350+", min: 350, max: 10000 },
];

const RATING_OPTIONS = [
  { label: "4.5+ Stars", value: 4.5 },
  { label: "4.0+ Stars", value: 4.0 },
  { label: "3.5+ Stars", value: 3.5 },
  { label: "3.0+ Stars", value: 3.0 },
];

export function FilterSheet({ currentFilters, onApplyFilters, onClose }: FilterSheetProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(currentFilters);

  const togglePracticeArea = (area: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      practiceAreas: prev.practiceAreas.includes(area)
        ? prev.practiceAreas.filter((a) => a !== area)
        : [...prev.practiceAreas, area],
    }));
  };

  const setPriceRange = (min: number, max: number) => {
    setLocalFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }));
  };

  const setMinRating = (rating: number) => {
    setLocalFilters((prev) => ({
      ...prev,
      minRating: prev.minRating === rating ? null : rating,
    }));
  };

  const handleClearAll = () => {
    setLocalFilters({
      practiceAreas: [],
      priceRange: { min: 0, max: 10000 },
      minRating: null,
      location: null,
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const activeFilterCount =
    localFilters.practiceAreas.length +
    (localFilters.priceRange.min > 0 || localFilters.priceRange.max < 10000 ? 1 : 0) +
    (localFilters.minRating ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.handle} />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Filters</Text>
          {activeFilterCount > 0 && (
            <Pressable onPress={handleClearAll}>
              <Text style={styles.clearButton}>Clear All</Text>
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Practice Areas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice Area</Text>
          <View style={styles.chipContainer}>
            {PRACTICE_AREAS.map((area) => {
              const isSelected = localFilters.practiceAreas.includes(area);
              return (
                <Pressable
                  key={area}
                  style={({ pressed }) => [
                    styles.chip,
                    isSelected && styles.chipActive,
                    pressed && styles.chipPressed,
                  ]}
                  onPress={() => togglePracticeArea(area)}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                    {area}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hourly Rate</Text>
          <View style={styles.radioGroup}>
            {PRICE_RANGES.map((range) => {
              const isSelected =
                localFilters.priceRange.min === range.min &&
                localFilters.priceRange.max === range.max;
              return (
                <Pressable
                  key={range.label}
                  style={({ pressed }) => [
                    styles.radioOption,
                    pressed && styles.radioOptionPressed,
                  ]}
                  onPress={() => setPriceRange(range.min, range.max)}
                >
                  <View style={styles.radioButton}>
                    {isSelected && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.radioLabel}>{range.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minimum Rating</Text>
          <View style={styles.radioGroup}>
            {RATING_OPTIONS.map((option) => {
              const isSelected = localFilters.minRating === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={({ pressed }) => [
                    styles.radioOption,
                    pressed && styles.radioOptionPressed,
                  ]}
                  onPress={() => setMinRating(option.value)}
                >
                  <View style={styles.radioButton}>
                    {isSelected && <View style={styles.radioButtonInner} />}
                  </View>
                  <View style={styles.ratingLabel}>
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text style={styles.radioLabel}>{option.label}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.applyButton, pressed && styles.applyButtonPressed]}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>
            Apply {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%",
  },
  header: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    marginBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  clearButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3FA7CC",
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
  chipPressed: {
    opacity: 0.7,
  },
  chipActive: {
    backgroundColor: "rgba(63, 167, 204, 0.1)",
    borderColor: "#3FA7CC",
  },
  chipText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#3FA7CC",
    fontWeight: "600",
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  radioOptionPressed: {
    opacity: 0.7,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3FA7CC",
  },
  radioLabel: {
    fontSize: 14,
    color: "#1F2937",
  },
  ratingLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  applyButton: {
    backgroundColor: "#3FA7CC",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#3FA7CC",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  applyButtonPressed: {
    opacity: 0.85,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});