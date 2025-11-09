import { PropsWithChildren, useMemo } from "react";
import { StyleSheet, View, ViewStyle, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

interface SoftSkyBackdropProps extends PropsWithChildren {
  style?: ViewStyle | ViewStyle[];
}

function RadialGlow({
  id,
  style,
  width,
  height,
  color = "rgba(190, 230, 255, 0.8)",
}: {
  id: string;
  style?: ViewStyle | ViewStyle[];
  width: number;
  height: number;
  color?: string;
}) {
  const gradientId = useMemo(() => `${id}-gradient`, [id]);

  return (
    <Svg style={[styles.glowBase, style]} width={width} height={height} viewBox="0 0 100 100">
      <Defs>
        <RadialGradient id={gradientId} cx="50%" cy="50%" rx="50%" ry="50%">
          <Stop offset="0%" stopColor={color} stopOpacity={1} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100" height="100" fill={`url(#${gradientId})`} />
    </Svg>
  );
}

export function SoftSkyBackdrop({ children, style }: SoftSkyBackdropProps) {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient colors={["#ECF6FF", "#F7FAFF"]} style={StyleSheet.absoluteFillObject} />

      {Platform.OS !== "web" && (
        <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
          <RadialGlow id="top-center" width={420} height={420} style={styles.ellipseTopCenter} />
          <RadialGlow id="left" width={380} height={380} style={styles.ellipseTopLeft} />
          <RadialGlow id="right" width={380} height={380} style={styles.ellipseTopRight} />
          <RadialGlow id="stripe" width={960} height={260} style={styles.glowStripe} color="rgba(190, 230, 255, 0.55)" />
        </View>
      )}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  glowBase: {
    position: "absolute",
  },
  ellipseTopCenter: {
    top: -80,
    left: "50%",
    marginLeft: -210,
  },
  ellipseTopLeft: {
    top: 280,
    left: -160,
  },
  ellipseTopRight: {
    top: 500,
    right: -160,
  },
  glowStripe: {
    top: 700,
    left: "50%",
    marginLeft: -480,
  },
});
