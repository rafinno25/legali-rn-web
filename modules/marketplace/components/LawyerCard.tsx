import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { Lawyer } from "../types/lawyer";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface LawyerCardProps {
  lawyer: Lawyer;
}

export function LawyerCard({ lawyer }: LawyerCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/marketplace/${lawyer.id}`);
  };

  const handleMessage = () => {
    // TODO: Navigate to message screen
    console.log("Message lawyer:", lawyer.id);
  };

  const handleCall = () => {
    // TODO: Initiate call
    console.log("Call lawyer:", lawyer.id);
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={handlePress}
      >
        {/* Row 1: Photo + Name + Verified Badge */}
        <View style={styles.headerRow}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: lawyer.photoUrl }} style={styles.image} />
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{lawyer.name}</Text>
              {lawyer.isVerified && (
                <Ionicons name="checkmark-circle" size={18} color="#3FA7CC" />
              )}
            </View>
            {/* Row 2: Rating + Reviews */}
            {lawyer.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.rating}>
                  {lawyer.rating.toFixed(1)}
                </Text>
                <Text style={styles.reviewCount}>({lawyer.reviewCount} reviews)</Text>
              </View>
            )}
          </View>
        </View>

        {/* Row 3: Practice Area Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContainer}
        >
          {lawyer.practiceAreas.map((area, index) => (
            <View key={index} style={styles.practiceChip}>
              <Text style={styles.practiceChipText}>{area}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Row 4: Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={20} color="#9CA3AF" />
            <Text style={styles.statValue}>{lawyer.responseTime}</Text>
            <Text style={styles.statLabel}>Response</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="cash-outline" size={20} color="#9CA3AF" />
            <Text style={styles.statValue}>${lawyer.hourlyRate}/hr</Text>
            <Text style={styles.statLabel}>Hourly Rate</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="briefcase-outline" size={20} color="#9CA3AF" />
            <Text style={styles.statValue}>{lawyer.casesCompleted}</Text>
            <Text style={styles.statLabel}>Cases</Text>
          </View>
        </View>
      </Pressable>

      {/* Row 5: Action Buttons - Outside main pressable to avoid conflicts */}
      <View style={styles.actionRow}>
        <Pressable onPress={handleMessage} style={styles.messageButtonWrapper}>
          <View style={styles.messageButton}>
            <Ionicons name="chatbubble" size={16} color="#FFFFFF" />
            <Text style={styles.messageButtonText}>Message</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleCall} style={styles.callButtonWrapper}>
          <View style={styles.callButton}>
            <Ionicons name="call" size={20} color="#3FA7CC" />
          </View>
        </Pressable>
      </View>

      {/* Row 6: Available Now Indicator */}
      {lawyer.isAvailable && (
        <View style={styles.availableContainer}>
          <View style={styles.availableDot} />
          <Text style={styles.availableText}>Available Now</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    padding: 14,
  },
  card: {
    borderRadius: 16,
  },
  cardPressed: {
    opacity: 0.95,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E5F3F8",
    overflow: "hidden",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  nameContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  reviewCount: {
    fontSize: 12,
    color: "#6B7280",
  },
  chipsScroll: {
    marginBottom: 12,
  },
  chipsContainer: {
    gap: 8,
  },
  practiceChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  practiceChipText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#3B82F6",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
  },
  statValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1F2937",
  },
  statLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  messageButtonWrapper: {
    flex: 1,
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3FA7CC",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
    minHeight: 44,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  messageButtonPressed: {
    opacity: 0.85,
  },
  messageButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  callButtonWrapper: {
    width: 48,
    height: 48,
  },
  callButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
  },
  callButtonPressed: {
    opacity: 0.7,
    backgroundColor: "#F9FAFB",
  },
  availableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 4,
  },
  availableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  availableText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#10B981",
  },
});
