import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DocumentHeaderProps {
  title?: string;
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}

export function DocumentHeader({
  title = "Smart Legal Drafter",
  onMenuPress,
  onProfilePress
}: DocumentHeaderProps) {
  const router = useRouter();

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      router.back();
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
        <Ionicons name="menu" size={24} color="#0E2235" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
        <Ionicons name="person-circle-outline" size={32} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "rgba(236, 246, 255, 0.6)",
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(190, 230, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0E2235",
  },
  profileButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
