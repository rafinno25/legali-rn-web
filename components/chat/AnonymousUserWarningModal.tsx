import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  // Mobile prop
  visible?: boolean;
  // Web prop alias
  isOpen?: boolean;
  onClose: () => void;
  onContinue?: () => void; // web parity
  onGoToLogin?: () => void; // web parity
}

export function AnonymousUserWarningModal({ visible, isOpen, onClose, onContinue, onGoToLogin }: Props) {
  const open = typeof isOpen === "boolean" ? isOpen : !!visible;
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Anonymous Mode</Text>
          <Text style={styles.description}>
            You are interacting as an anonymous user. Some features may be limited. Please sign in for the best
            experience.
          </Text>
          <View style={{ gap: 8 }}>
            <TouchableOpacity style={styles.button} onPress={onContinue || onClose} accessibilityRole="button">
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
            {onGoToLogin ? (
              <TouchableOpacity style={[styles.button, { backgroundColor: "#1F2937" }]} onPress={onGoToLogin} accessibilityRole="button">
                <Text style={styles.buttonText}>Go to Login</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  content: { width: "85%", backgroundColor: "#fff", borderRadius: 12, padding: 16 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  description: { fontSize: 14, color: "#374151", marginBottom: 16 },
  button: { backgroundColor: "#111827", paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
});