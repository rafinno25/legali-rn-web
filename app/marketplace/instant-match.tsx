import { View, Text, StyleSheet, Pressable, Image, Animated, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { mockLawyers } from "@/modules/marketplace/data/mockLawyers";
import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function InstantMatchScreen() {
  const router = useRouter();
  const [matchedLawyer, setMatchedLawyer] = useState<typeof mockLawyers[0] | null>(null);
  const [isMatching, setIsMatching] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressCardOpacity = useRef(new Animated.Value(1)).current;
  const lawyerCardOpacity = useRef(new Animated.Value(0)).current;
  const lawyerCardTranslateY = useRef(new Animated.Value(20)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let rotationAnimation: Animated.CompositeAnimation;
    let pulseAnimation: Animated.CompositeAnimation;

    if (isMatching) {
      // Single rotation during searching (completes at 2500ms)
      rotationAnimation = Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      });
      rotationAnimation.start();
    } else {
      // Pulse animation when match is found
      pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
    }

    return () => {
      if (rotationAnimation) rotationAnimation.stop();
      if (pulseAnimation) pulseAnimation.stop();
    };
  }, [isMatching]);

  useEffect(() => {
    // Animate circular progress
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start();

    // Animate through progress steps
    const step1Timer = setTimeout(() => setActiveStep(1), 500);
    const step2Timer = setTimeout(() => setActiveStep(2), 1200);
    const step3Timer = setTimeout(() => setActiveStep(3), 1800);

    // Complete matching and show lawyer
    const completeTimer = setTimeout(() => {
      // Fade out progress card
      Animated.timing(progressCardOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Find an available lawyer
        const availableLawyer = mockLawyers.find((lawyer) => lawyer.isAvailable);
        setMatchedLawyer(availableLawyer || mockLawyers[0]);
        setIsMatching(false);

        // Fade in and slide up lawyer card
        Animated.parallel([
          Animated.timing(lawyerCardOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(lawyerCardTranslateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Fade in button after card appears
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      });
    }, 2500);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleConnectNow = () => {
    if (matchedLawyer) {
      router.push(`/marketplace/start-consultation?id=${matchedLawyer.id}`);
    }
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Circle progress animation
  const radius = 67;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <SoftSkyBackdrop>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#3FA7CC" />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Instant Match</Text>
            <Text style={styles.subtitle}>Connect with an available lawyer now</Text>
          </View>

          {/* Case Context Card - Always shown */}
          <View style={styles.caseContextCard}>
            <View style={styles.caseIconContainer}>
              <Ionicons name="briefcase-outline" size={24} color="#3FA7CC" />
            </View>
            <View style={styles.caseInfo}>
              <Text style={styles.caseTitle}>Johnson v. Smith</Text>
              <Text style={styles.caseType}>Contract Dispute</Text>
            </View>
          </View>

          {/* Lightning Icon */}
          <View style={styles.iconContainer}>
            <Animated.View
              style={[
                styles.iconCircle,
                {
                  borderColor: isMatching ? "#E5E7EB" : "#A7F3D0",
                  transform: isMatching
                    ? [{ rotate: spin }]
                    : [{ scale: pulseAnim }],
                },
              ]}
            >
              <Ionicons name="flash" size={64} color="#10B981" />
            </Animated.View>

            {/* Circular Progress Indicator */}
            {isMatching && (
              <Svg
                width={140}
                height={140}
                style={styles.progressCircle}
              >
                <AnimatedCircle
                  cx={70}
                  cy={70}
                  r={radius}
                  stroke="#A7F3D0"
                  strokeWidth={6}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  rotation="-90"
                  origin="70, 70"
                />
              </Svg>
            )}
          </View>

          {/* Status Text */}
          <Text style={styles.statusTitle}>
            {isMatching ? "Finding Your Match" : "Match Found!"}
          </Text>

          {isMatching ? (
            <>
              <Text style={styles.statusDescription}>
                Analyzing your case and matching with available lawyers...
              </Text>

              {/* Matching Progress Steps */}
              <Animated.View
                style={[
                  styles.progressSteps,
                  {
                    opacity: progressCardOpacity,
                  },
                ]}
              >
                <View style={styles.progressStep}>
                  <View style={[styles.progressStepIcon, activeStep >= 1 && styles.progressStepActive]}>
                    {activeStep >= 1 ? (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    ) : (
                      <Ionicons name="document-text-outline" size={16} color="#9CA3AF" />
                    )}
                  </View>
                  <Text style={[styles.progressStepText, activeStep < 1 && styles.progressStepTextInactive]}>
                    Case analyzed
                  </Text>
                </View>
                <View style={styles.progressStep}>
                  <View style={[styles.progressStepIcon, activeStep >= 2 && styles.progressStepActive]}>
                    {activeStep >= 2 ? (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    ) : (
                      <Ionicons name="search" size={16} color="#9CA3AF" />
                    )}
                  </View>
                  <Text style={[styles.progressStepText, activeStep < 2 && styles.progressStepTextInactive]}>
                    Searching experts
                  </Text>
                </View>
                <View style={styles.progressStep}>
                  <View style={[styles.progressStepIcon, activeStep >= 3 && styles.progressStepActive]}>
                    {activeStep >= 3 ? (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    ) : (
                      <Ionicons name="people" size={16} color="#9CA3AF" />
                    )}
                  </View>
                  <Text style={[styles.progressStepText, activeStep < 3 && styles.progressStepTextInactive]}>
                    Finding match
                  </Text>
                </View>
              </Animated.View>
            </>
          ) : (
            matchedLawyer && (
              <>
                <Text style={styles.statusDescription}>
                  We're connecting you with {matchedLawyer.name}, an expert in{" "}
                  {matchedLawyer.practiceAreas[0].toLowerCase()} who's available right now.
                </Text>

                {/* Lawyer Preview Card */}
                <Animated.View
                  style={[
                    styles.lawyerCard,
                    {
                      opacity: lawyerCardOpacity,
                      transform: [{ translateY: lawyerCardTranslateY }],
                    },
                  ]}
                >
                  <View style={styles.lawyerHeader}>
                    <Image
                      source={{ uri: matchedLawyer.photoUrl }}
                      style={styles.lawyerPhoto}
                    />
                    <View style={styles.lawyerHeaderInfo}>
                      <View style={styles.nameRow}>
                        <Text style={styles.lawyerName}>{matchedLawyer.name}</Text>
                        {matchedLawyer.isVerified && (
                          <Ionicons name="checkmark-circle" size={20} color="#3FA7CC" />
                        )}
                      </View>
                      <Text style={styles.lawyerAreas}>
                        {matchedLawyer.practiceAreas.join(", ")}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.lawyerDetails}>
                    <View style={styles.detailRow}>
                      <View style={styles.detailLabelContainer}>
                        <Ionicons name="briefcase-outline" size={16} color="#6B7280" />
                        <Text style={styles.detailLabel}>Experience</Text>
                      </View>
                      <Text style={styles.detailValue}>
                        {Math.floor(Math.random() * 10) + 8} years
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <View style={styles.detailLabelContainer}>
                        <Ionicons name="time-outline" size={16} color="#6B7280" />
                        <Text style={styles.detailLabel}>Response Time</Text>
                      </View>
                      <Text style={[styles.detailValue, styles.responseTime]}>
                        {matchedLawyer.responseTime}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <View style={styles.detailLabelContainer}>
                        <Ionicons name="cash-outline" size={16} color="#6B7280" />
                        <Text style={styles.detailLabel}>Rate</Text>
                      </View>
                      <Text style={styles.detailValue}>${matchedLawyer.hourlyRate}/hr</Text>
                    </View>
                  </View>

                  {/* Connect Now Button */}
                  <Pressable onPress={handleConnectNow} style={styles.buttonContainer}>
                    {({ pressed }) => (
                      <View
                        style={[
                          styles.connectButton,
                          pressed && styles.connectButtonPressed,
                        ]}
                      >
                        <Ionicons name="flash" size={20} color="#FFFFFF" />
                        <Text style={styles.connectButtonText}>Connect Now</Text>
                      </View>
                    )}
                  </Pressable>
                </Animated.View>
              </>
            )
          )}
        </ScrollView>
      </SafeAreaView>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
    paddingBottom: 32,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  caseContextCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
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
  caseType: {
    fontSize: 14,
    color: "#6B7280",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  progressCircle: {
    position: "absolute",
  },
  statusTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 12,
  },
  statusDescription: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  progressSteps: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressStepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  progressStepActive: {
    backgroundColor: "#10B981",
  },
  progressStepText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  progressStepTextInactive: {
    color: "#9CA3AF",
  },
  lawyerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lawyerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  lawyerPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E5F3F8",
    marginRight: 16,
  },
  lawyerHeaderInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  lawyerName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  lawyerAreas: {
    fontSize: 14,
    color: "#6B7280",
  },
  lawyerDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: "#6B7280",
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  responseTime: {
    color: "#10B981",
  },
  buttonContainer: {
    marginTop: 24,
  },
  connectButton: {
    flexDirection: "row",
    backgroundColor: "#10B981",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    gap: 8,
  },
  connectButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  connectButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});
