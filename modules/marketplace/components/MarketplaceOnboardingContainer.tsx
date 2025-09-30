import { useRouter } from "expo-router";
import { ReactNode, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useEffect } from "react";

interface OnboardingStep {
  title: string;
  description: string;
  background: ReactNode;
  primaryColor: string;
}

interface MarketplaceOnboardingContainerProps {
  steps: OnboardingStep[];
  onComplete?: () => void;
}

export function MarketplaceOnboardingContainer({
  steps,
  onComplete,
}: MarketplaceOnboardingContainerProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const dotAnimations = useRef(steps.map(() => new Animated.Value(8))).current;

  // Slide and fade animations for content
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const backgroundFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate dots when currentStep changes
    dotAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === currentStep ? 32 : 8,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    // Slide and fade in content
    slideAnim.setValue(50);
    fadeAnim.setValue(0);
    backgroundFadeAnim.setValue(0);

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) {
        onComplete();
      } else {
        router.push("/(tabs)");
      }
    }
  };

  const handleSkip = () => {
    if (onComplete) {
      onComplete();
    } else {
      router.push("/(tabs)");
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <View style={styles.container}>
      {/* Background with fade animation */}
      <Animated.View style={[styles.backgroundContainer, { opacity: backgroundFadeAnim }]}>
        {currentStepData.background}
      </Animated.View>

      {/* Bottom Card Container */}
      <View style={styles.bottomCard}>
        {/* Title and Description with slide and fade */}
        <Animated.View
          style={[
            styles.contentSection,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>{currentStepData.title}</Text>
          <Text style={styles.description}>{currentStepData.description}</Text>
        </Animated.View>

        {/* Progress Dots */}
        <View style={styles.progressContainer}>
          {steps.map((step, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotAnimations[index],
                  backgroundColor:
                    index === currentStep ? currentStepData.primaryColor : "#D1D5DB",
                },
              ]}
            />
          ))}
        </View>

        {/* Bottom Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: currentStepData.primaryColor,
                shadowColor: currentStepData.primaryColor,
              },
            ]}
            onPress={handleNext}
          >
            <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  contentSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 34,
  },
  description: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});