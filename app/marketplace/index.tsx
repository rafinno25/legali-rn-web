import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Modal, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import { LawyerCard } from "@/modules/marketplace/components/LawyerCard";
import { SortSheet } from "@/modules/marketplace/components/SortSheet";
import { FilterSheet, FilterOptions } from "@/modules/marketplace/components/FilterSheet";
import { mockLawyers } from "@/modules/marketplace/data/mockLawyers";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useMemo } from "react";

type SortOption = "rating" | "price-low" | "price-high" | "name";

export default function MarketplaceScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    practiceAreas: [],
    priceRange: { min: 0, max: 10000 },
    minRating: null,
    location: null,
  });

  // Filter and sort lawyers
  const filteredLawyers = useMemo(() => {
    // Only show the 3 matched employment specialists
    let result = mockLawyers.filter(lawyer => ["2", "4", "8"].includes(lawyer.id));

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.practiceAreas.some((area) =>
            area.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          lawyer.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply practice area filter
    if (filters.practiceAreas.length > 0) {
      result = result.filter((lawyer) =>
        lawyer.practiceAreas.some((area) => filters.practiceAreas.includes(area))
      );
    }

    // Apply price range filter
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000) {
      result = result.filter(
        (lawyer) =>
          lawyer.hourlyRate >= filters.priceRange.min &&
          lawyer.hourlyRate <= filters.priceRange.max
      );
    }

    // Apply rating filter
    if (filters.minRating) {
      result = result.filter((lawyer) => (lawyer.rating || 0) >= filters.minRating!);
    }

    // Apply sorting
    return result.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "price-low":
          return a.hourlyRate - b.hourlyRate;
        case "price-high":
          return b.hourlyRate - a.hourlyRate;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [searchQuery, sortBy, filters]);

  const activeFilterCount =
    filters.practiceAreas.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 10000 ? 1 : 0) +
    (filters.minRating ? 1 : 0);

  const removeFilter = (type: "practiceArea" | "priceRange" | "rating", value?: string) => {
    if (type === "practiceArea" && value) {
      setFilters((prev) => ({
        ...prev,
        practiceAreas: prev.practiceAreas.filter((area) => area !== value),
      }));
    } else if (type === "priceRange") {
      setFilters((prev) => ({
        ...prev,
        priceRange: { min: 0, max: 10000 },
      }));
    } else if (type === "rating") {
      setFilters((prev) => ({
        ...prev,
        minRating: null,
      }));
    }
  };

  const clearAllFilters = () => {
    setFilters({
      practiceAreas: [],
      priceRange: { min: 0, max: 10000 },
      minRating: null,
      location: null,
    });
  };

  return (
    <SoftSkyBackdrop>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            onPress={() => router.push('/(tabs)')}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </Pressable>

          <View style={styles.headerContent}>
            <Text style={styles.title}>Find Your Lawyer</Text>
            <Text style={styles.subtitle}>
              Connect instantly with verified experts
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, specialty, location..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </Pressable>
            )}
          </View>
        </View>

        <FlatList
          data={filteredLawyers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LawyerCard lawyer={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {/* Quick Filter Chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.quickFiltersScroll}
                contentContainerStyle={styles.quickFiltersContainer}
              >
                <Pressable style={styles.quickFilterChip}>
                  <Text style={styles.quickFilterChipText}>Available Now</Text>
                </Pressable>
                <Pressable style={styles.quickFilterChip}>
                  <Text style={styles.quickFilterChipText}>Top Rated</Text>
                </Pressable>
                <Pressable style={styles.quickFilterChip}>
                  <Text style={styles.quickFilterChipText}>Small Claims</Text>
                </Pressable>
                <Pressable style={styles.quickFilterChip}>
                  <Text style={styles.quickFilterChipText}>Contract Law</Text>
                </Pressable>
                <Pressable style={styles.quickFilterChip}>
                  <Text style={styles.quickFilterChipText}>Under $250/hr</Text>
                </Pressable>
              </ScrollView>

              {/* Case Card */}
              <View style={styles.caseCard}>
                <View style={styles.caseIconContainer}>
                  <Ionicons name="briefcase-outline" size={24} color="#3FA7CC" />
                </View>
                <View style={styles.caseInfo}>
                  <Text style={styles.caseTitle}>Johnson v. Smith</Text>
                  <Text style={styles.caseSubtitle}>Finding lawyers for your case</Text>
                </View>
                <Ionicons name="flash" size={24} color="#F59E0B" />
              </View>

              {/* Instant Match Card */}
              <View style={styles.instantMatchCard}>
                <View style={styles.instantMatchHeader}>
                  <Ionicons name="flash" size={24} color="#FFFFFF" />
                  <Text style={styles.instantMatchTitle}>Instant Match Available</Text>
                </View>
                <Text style={styles.instantMatchDescription}>
                  Get connected with an available lawyer in under 5 minutes based on your case type.
                </Text>
                <TouchableOpacity
                  style={styles.connectInstantlyButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    console.log("Connect Instantly pressed");
                    router.push("/marketplace/instant-match");
                  }}
                >
                  <Text style={styles.connectInstantlyButtonText}>
                    Connect Instantly
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Recommended Lawyers Header */}
              <View style={styles.recommendedHeader}>
                <Text style={styles.recommendedTitle}>Recommended Lawyers</Text>
              </View>

              {/* Filter/Sort Bar */}
              <View style={styles.filterBar}>
                <Text style={styles.resultsCount}>
                  Showing {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? "s" : ""}
                </Text>
                <View style={styles.filterSortButtons}>
                  <Pressable
                    style={({ pressed }) => [styles.filterButton, pressed && styles.filterButtonPressed]}
                    onPress={() => setShowFilterSheet(true)}
                  >
                    <Ionicons name="options-outline" size={18} color="#3FA7CC" />
                    <Text style={styles.filterButtonText}>Filter</Text>
                    {activeFilterCount > 0 && (
                      <View style={styles.filterBadge}>
                        <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
                      </View>
                    )}
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [styles.sortButton, pressed && styles.sortButtonPressed]}
                    onPress={() => setShowSortSheet(true)}
                  >
                    <Ionicons name="swap-vertical" size={18} color="#3FA7CC" />
                    <Text style={styles.sortButtonText}>Sort</Text>
                  </Pressable>
                </View>
              </View>

              {/* Active Filter Chips */}
              {activeFilterCount > 0 && (
                <View style={styles.activeFiltersContainer}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.activeFiltersContent}
                  >
                    {filters.practiceAreas.map((area) => (
                      <View key={area} style={styles.activeFilterChip}>
                        <Text style={styles.activeFilterChipText}>{area}</Text>
                        <Pressable
                          onPress={() => removeFilter("practiceArea", area)}
                          hitSlop={8}
                        >
                          <Ionicons name="close-circle" size={16} color="#3FA7CC" />
                        </Pressable>
                      </View>
                    ))}
                    {(filters.priceRange.min > 0 || filters.priceRange.max < 10000) && (
                      <View style={styles.activeFilterChip}>
                        <Text style={styles.activeFilterChipText}>
                          ${filters.priceRange.min}-${filters.priceRange.max}
                        </Text>
                        <Pressable onPress={() => removeFilter("priceRange")} hitSlop={8}>
                          <Ionicons name="close-circle" size={16} color="#3FA7CC" />
                        </Pressable>
                      </View>
                    )}
                    {filters.minRating && (
                      <View style={styles.activeFilterChip}>
                        <Ionicons name="star" size={12} color="#F59E0B" />
                        <Text style={styles.activeFilterChipText}>
                          {filters.minRating}+
                        </Text>
                        <Pressable onPress={() => removeFilter("rating")} hitSlop={8}>
                          <Ionicons name="close-circle" size={16} color="#3FA7CC" />
                        </Pressable>
                      </View>
                    )}
                    <Pressable
                      style={({ pressed }) => [
                        styles.clearAllChip,
                        pressed && styles.clearAllChipPressed,
                      ]}
                      onPress={clearAllFilters}
                    >
                      <Text style={styles.clearAllChipText}>Clear All</Text>
                    </Pressable>
                  </ScrollView>
                </View>
              )}
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateTitle}>No lawyers found</Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search terms
              </Text>
            </View>
          }
        />
      </SafeAreaView>

      <Modal
        visible={showSortSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSortSheet(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowSortSheet(false)}>
          <SortSheet
            currentSort={sortBy}
            onSelectSort={setSortBy}
            onClose={() => setShowSortSheet(false)}
          />
        </Pressable>
      </Modal>

      <Modal
        visible={showFilterSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterSheet(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowFilterSheet(false)}>
          <FilterSheet
            currentFilters={filters}
            onApplyFilters={setFilters}
            onClose={() => setShowFilterSheet(false)}
          />
        </Pressable>
      </Modal>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#3FA7CC",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  headerContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1F2937",
  },
  resultsBar: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultsCount: {
    fontSize: 13,
    color: "#6B7280",
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filterSortButtons: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "rgba(63, 167, 204, 0.08)",
  },
  filterButtonPressed: {
    backgroundColor: "rgba(63, 167, 204, 0.15)",
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3FA7CC",
  },
  filterBadge: {
    backgroundColor: "#3FA7CC",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "rgba(63, 167, 204, 0.08)",
  },
  sortButtonPressed: {
    backgroundColor: "rgba(63, 167, 204, 0.15)",
  },
  sortButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3FA7CC",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  activeFiltersContent: {
    gap: 8,
    paddingRight: 16,
  },
  activeFilterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(63, 167, 204, 0.12)",
    borderRadius: 16,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    gap: 6,
  },
  activeFilterChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3FA7CC",
  },
  clearAllChip: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  clearAllChipPressed: {
    opacity: 0.7,
  },
  clearAllChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#EF4444",
  },
  quickFiltersScroll: {
    marginBottom: 16,
  },
  quickFiltersContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  quickFilterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(63, 167, 204, 0.3)",
  },
  quickFilterChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3FA7CC",
  },
  caseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  caseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  caseInfo: {
    flex: 1,
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  caseSubtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  instantMatchCard: {
    backgroundColor: "#10B981",
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  instantMatchHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  instantMatchTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  instantMatchDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 20,
    marginBottom: 16,
  },
  connectInstantlyButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    minHeight: 50,
    justifyContent: "center",
  },
  connectInstantlyButtonPressed: {
    opacity: 0.8,
  },
  connectInstantlyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#10B981",
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
});
