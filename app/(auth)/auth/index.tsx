import { SignInForm } from "@/modules/auth/components/SignInForm";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const AUTH_GRADIENT = ["#7CC9E6", "#E7F8FF", "#7CC9E6"] as const;

export default function AuthLanding() {
  return (
    <LinearGradient colors={AUTH_GRADIENT} style={styles.container}>
      <SignInForm />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
