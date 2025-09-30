import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import { mockLawyers } from "@/modules/marketplace/data/mockLawyers";
import { Image } from "react-native";

export default function LawyerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const lawyer = mockLawyers.find((l) => l.id === id);

  if (!lawyer) {
    return (
      <SoftSkyBackdrop>
        <SafeAreaView style={styles.container}>
          <Text>Lawyer not found</Text>
        </SafeAreaView>
      </SoftSkyBackdrop>
    );
  }

  return (
    <SoftSkyBackdrop>
      <SafeAreaView style={styles.container} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#3FA7CC" />
            <Text style={styles.backText}>Back to Results</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Image source={{ uri: lawyer.photoUrl }} style={styles.avatar} />
            <View style={styles.nameRow}>
              <Text style={styles.name}>{lawyer.name}</Text>
              {lawyer.isVerified && (
                <Ionicons name="checkmark-circle" size={24} color="#3FA7CC" />
              )}
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={18} color="#F59E0B" />
              <Text style={styles.rating}>
                {lawyer.rating?.toFixed(1)} ({lawyer.reviewCount} reviews)
              </Text>
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#6B7280" />
              <Text style={styles.location}>
                {lawyer.city}, {lawyer.state}
              </Text>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {lawyer.yearsExperience || "N/A"} {lawyer.yearsExperience ? "years" : ""}
              </Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{lawyer.casesCompleted}</Text>
              <Text style={styles.statLabel}>Cases Won</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{lawyer.responseTime}</Text>
              <Text style={styles.statLabel}>Response</Text>
            </View>
          </View>

          {/* Availability Banner */}
          {lawyer.isAvailable && (
            <View style={styles.availabilityBanner}>
              <View style={styles.availabilityDot} />
              <Text style={styles.availabilityTitle}>Available Now</Text>
              <Text style={styles.availabilityText}>
                {lawyer.name} can respond to your case within {lawyer.responseTime}
              </Text>
            </View>
          )}

          {/* Practice Areas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Practice Areas</Text>
            <View style={styles.practiceAreasContainer}>
              {lawyer.practiceAreas.map((area, index) => (
                <View key={index} style={styles.practiceAreaChip}>
                  <Text style={styles.practiceAreaText}>{area}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* About */}
          {lawyer.bio && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.bioText}>{lawyer.bio}</Text>
            </View>
          )}

          {/* Pricing */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            <View style={styles.pricingCard}>
              <Text style={styles.pricingLabel}>Hourly Rate</Text>
              <Text style={styles.pricingValue}>${lawyer.hourlyRate}/hr</Text>
              <View style={styles.securePayment}>
                <Ionicons name="shield-checkmark-outline" size={16} color="#3FA7CC" />
                <Text style={styles.securePaymentText}>Secure Payment</Text>
              </View>
              <Text style={styles.securePaymentSubtext}>
                Pay only for time used with transparent billing
              </Text>
            </View>
          </View>

          {/* Recent Reviews */}
          {lawyer.reviews && lawyer.reviews.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Reviews</Text>
              {lawyer.reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                    <View style={styles.reviewStars}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={14}
                          color={i < review.rating ? "#F59E0B" : "#E5E7EB"}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.text}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push(`/marketplace/start-consultation?id=${lawyer.id}`)}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Start Consultation</Text>
          </Pressable>
          <View style={styles.secondaryButtons}>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.push(`/marketplace/start-consultation?id=${lawyer.id}`)}
            >
              <Ionicons name="call-outline" size={20} color="#3FA7CC" />
              <Text style={styles.secondaryButtonText}>Call</Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.push(`/marketplace/start-consultation?id=${lawyer.id}`)}
            >
              <Ionicons name="videocam-outline" size={20} color="#3FA7CC" />
              <Text style={styles.secondaryButtonText}>Video</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  backText: {
    fontSize: 17,
    color: "#3FA7CC",
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E5F3F8",
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: "#6B7280",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3FA7CC",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  availabilityBanner: {
    backgroundColor: "#10B981",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  availabilityText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  practiceAreasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  practiceAreaChip: {
    backgroundColor: "rgba(63, 167, 204, 0.1)",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  practiceAreaText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3FA7CC",
  },
  bioText: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 24,
  },
  pricingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  pricingLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  pricingValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3FA7CC",
    marginBottom: 16,
  },
  securePayment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  securePaymentText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3FA7CC",
  },
  securePaymentSubtext: {
    fontSize: 13,
    color: "#6B7280",
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  reviewStars: {
    flexDirection: "row",
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: "#3FA7CC",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  secondaryButtons: {
    flexDirection: "row",
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(63, 167, 204, 0.1)",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3FA7CC",
  },
});
