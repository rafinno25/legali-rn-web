import { Logo } from "@/components/Logo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    type ViewStyle,
} from "react-native";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { signIn } from "@/services/auth.service";

const AUTH_GRADIENT = ["#7CC9E6", "#E7F8FF", "#7CC9E6"] as const;

interface SignInFormProps {
  onSignIn?: () => void;
}

export function SignInForm({ onSignIn }: SignInFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setError(null);
    // Basic validation aligned with web: non-empty, password >= 6
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const exec = async () => {
      try {
        setLoading(true);
        const data = await signIn({ email: email.trim(), password: password });
        await login({ access_token: data.access_token, refresh_token: data.refresh_token, user: {
          id: data.user.id,
          email: data.user.email,
          first_name: (data as any).user.firstname ?? "",
          last_name: (data as any).user.lastname ?? "",
          profile_picture_url: null,
          city_id: null,
        } });
        if (onSignIn) {
          onSignIn();
        } else {
          router.replace("/(chats)");
        }
      } catch (e: any) {
        setError(e?.message ?? "Failed to sign in");
      } finally {
        setLoading(false);
      }
    };
    void exec();
  };

  const handleSocialSignIn = () => {
    router.push("/auth/terms-agreement");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Link href="/(tabs)" asChild>
            <TouchableOpacity accessibilityLabel="Back to home" style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#0E2235" />
            </TouchableOpacity>
          </Link>
          <View style={styles.spacer} />
        </View>

        <View style={styles.brandBlock}>
          <Logo width={220} height={140} />
        </View>

        <View style={styles.formBlock}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#0E2235AA"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#0E2235AA"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { marginTop: 14 }]}
          />

          <Link href="/(tabs)" asChild>
            <TouchableOpacity accessibilityRole="link" style={styles.forgotLink}>
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>
          </Link>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={[styles.primaryButton, loading && styles.primaryButtonDisabled]} activeOpacity={0.9} onPress={handleSignIn} disabled={loading}>
            <Text style={styles.primaryButtonText}>{loading ? "Signing In..." : "Sign In"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerBlock}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerLabel}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialBlock}>
          <SocialButton icon="logo-google" label="Sign In with Google" onPress={handleSocialSignIn} />
          <SocialButton icon="logo-facebook" label="Sign In with Facebook" style={{ marginTop: 10 }} onPress={handleSocialSignIn} />
          <SocialButton icon="logo-apple" label="Sign In with Apple" style={{ marginTop: 10 }} onPress={handleSocialSignIn} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type SocialButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  style?: ViewStyle;
  onPress?: () => void;
};

function SocialButton({ icon, label, style, onPress }: SocialButtonProps) {
  return (
    <TouchableOpacity style={[styles.socialButton, style]} activeOpacity={0.85} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#FFFFFF" style={{ marginRight: 12 }} />
      <Text style={styles.socialButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.55)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0E2235",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  spacer: {
    flex: 1,
  },
  brandBlock: {
    alignItems: "center",
    marginTop: 80,
  },
  tagline: {
    fontSize: 20,
    color: "#0E2235",
    textTransform: "lowercase",
    marginBottom: 8,
  },
  brand: {
    fontSize: 56,
    fontWeight: "800",
    color: "#0E2235",
    letterSpacing: -1,
  },
  formBlock: {
    marginTop: 48,
  },
  input: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(12,37,60,0.18)",
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#0E2235",
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotText: {
    color: "#0E2235",
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButton: {
    marginTop: 22,
    height: 56,
    borderRadius: 20,
    backgroundColor: "#14213D",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0E2235",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  dividerBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(14,34,53,0.3)",
  },
  dividerLabel: {
    marginHorizontal: 12,
    color: "#0E2235",
    fontSize: 13,
    fontWeight: "600",
  },
  socialBlock: {
    marginTop: 24,
    paddingBottom: 24,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    borderRadius: 20,
    height: 52,
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#DC2626",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
});
