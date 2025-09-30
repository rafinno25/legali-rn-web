import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface AnimatedCyclingTextProps {
  phrases: string[];
  style?: object;
}

export function AnimatedCyclingText({ phrases, style }: AnimatedCyclingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const animateText = () => {
      // Reset animations
      fadeAnim.setValue(0);
      translateYAnim.setValue(20);

      // Sequence: fade in + slide up → pause → fade out + slide up
      Animated.sequence([
        // Phase 1: Fade in and slide to position
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        // Phase 2: Hold in place
        Animated.delay(2000),
        // Phase 3: Fade out and slide up further
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: -20,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Move to next phrase
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      });
    };

    animateText();
  }, [currentIndex, phrases.length, fadeAnim, translateYAnim]);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      <Text style={style}>{phrases[currentIndex]}</Text>
    </Animated.View>
  );
}