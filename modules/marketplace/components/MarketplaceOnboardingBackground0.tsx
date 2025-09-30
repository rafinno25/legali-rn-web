import { StyleSheet, View, Image, Animated } from "react-native";
import { SvgXml } from "react-native-svg";
import { useEffect, useRef } from "react";

const svgMarkup = `<svg width="546" height="971" viewBox="0 -100 546 1071" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="-100" width="546" height="1071" rx="10" fill="url(#paint0_radial_stamp)"/>
<rect y="-100" width="546" height="1071" rx="10" fill="url(#paint1_radial_stamp)"/>
<defs>
<radialGradient id="paint0_radial_stamp" cx="0" cy="0" r="1" gradientTransform="matrix(326.5 151.222 -242.672 977.497 72.5 59)" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFF5F5"/>
<stop offset="1" stop-color="#FFE8E8"/>
</radialGradient>
<radialGradient id="paint1_radial_stamp" cx="0" cy="0" r="1" gradientTransform="matrix(126 113.056 -243.986 406.203 273 97.1667)" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFF5F5"/>
<stop offset="1" stop-color="#FFE8E8"/>
</radialGradient>
</defs>
</svg>`;

export function MarketplaceOnboardingBackground0() {
  // Floating animation for stamp image
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <SvgXml xml={svgMarkup} width="100%" height="100%" />
      <Animated.View
        style={[
          styles.imageWrapper,
          {
            transform: [{ translateY: floatAnim }],
          },
        ]}
      >
        <Image
          source={require("../../../assets/images/stamp.png")}
          style={styles.stampImage}
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
  imageWrapper: {
    position: "absolute",
    top: "15%",
    left: 0,
    right: 0,
    height: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  stampImage: {
    width: "85%",
    height: "100%",
  },
});
