import { StyleSheet, View, Image, Animated } from "react-native";
import { SvgXml } from "react-native-svg";
import { useEffect, useRef } from "react";

export function MarketplaceOnboardingBackground3() {
  // Floating animations for three lightning bolts
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create slightly different floating animations for each lightning
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: -15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: -12,
          duration: 2300,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 2300,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim3, {
          toValue: -18,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim3, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Create a portrait format background (9:16 ratio like the other screens)
  // Using purple gradient from MARKETPLACE_ONBOARDING_5.svg
  const backgroundMarkup = `<svg width="546" height="971" viewBox="0 -100 546 1071" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="-100" width="546" height="1071" rx="10" fill="url(#paint0_radial_854_6256)"/>
<defs>
<radialGradient id="paint0_radial_854_6256" cx="0" cy="0" r="1" gradientTransform="matrix(126 113.056 -243.986 406.203 273 197.1667)" gradientUnits="userSpaceOnUse">
<stop stop-color="#F7F7F7"/>
<stop offset="1" stop-color="#EAEAFF"/>
</radialGradient>
</defs>
</svg>`;

  return (
    <View style={styles.container}>
      <SvgXml xml={backgroundMarkup} width="100%" height="100%" />

      {/* Left lightning - smaller and rotated */}
      <Animated.View
        style={[
          styles.lightningLeft,
          {
            transform: [{ translateY: floatAnim1 }, { rotate: "-15deg" }],
          },
        ]}
      >
        <Image
          source={require("../../../assets/images/lightning.png")}
          style={styles.lightningImageSmall}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Center lightning - largest */}
      <Animated.View
        style={[
          styles.lightningCenter,
          {
            transform: [{ translateY: floatAnim2 }],
          },
        ]}
      >
        <Image
          source={require("../../../assets/images/lightning.png")}
          style={styles.lightningImageLarge}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Right lightning - smaller and rotated */}
      <Animated.View
        style={[
          styles.lightningRight,
          {
            transform: [{ translateY: floatAnim3 }, { rotate: "15deg" }],
          },
        ]}
      >
        <Image
          source={require("../../../assets/images/lightning.png")}
          style={styles.lightningImageSmall}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  lightningLeft: {
    position: "absolute",
    top: "18%",
    left: "5%",
    width: "25%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  lightningCenter: {
    position: "absolute",
    top: "15%",
    left: "50%",
    marginLeft: -80,
    width: 160,
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  lightningRight: {
    position: "absolute",
    top: "22%",
    right: "5%",
    width: "25%",
    height: "18%",
    alignItems: "center",
    justifyContent: "center",
  },
  lightningImageSmall: {
    width: "100%",
    height: "100%",
  },
  lightningImageLarge: {
    width: "100%",
    height: "100%",
  },
});
