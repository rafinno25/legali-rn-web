import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  ChevronLeft,
  FileText,
  Folder,
  Headphones,
  MessageSquare,
  Plus,
  Search,
  Trash2,
} from "lucide-react-native";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { chatService } from "@/services/chat.service";
import { useAuth } from "@/contexts/AuthProvider";
import { LinearGradient } from "expo-linear-gradient";

export interface ChatHistoryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  timestamp: string;
  conversationType?: string;
}

interface Props {
  chatHistory: ChatHistoryItem[];
  isOpen: boolean;
  onClose: () => void;
  currentChatId?: string | null;
  onSelectChat?: (item: ChatHistoryItem) => void;
}

export default function ChatSidebar({ isOpen, onClose, currentChatId, chatHistory, onSelectChat }: Props) {
  const combinedHistory = useMemo(() => {
    // ensure unique by id
    const map = new Map<string, ChatHistoryItem>();
    for (const item of chatHistory) map.set(item.id, item);
    return Array.from(map.values());
  }, [chatHistory]);

  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const panelWidth = 320;
  const translateX = useState(new Animated.Value(-panelWidth))[0];
  const overlayOpacity = useState(new Animated.Value(0))[0];

  // Derive a safe display name and avatar initial from available user fields
  const nameFromParts = [user?.first_name, user?.last_name].filter(Boolean).join(" ").trim();
  const displayName = nameFromParts || user?.email || "User";
  const avatarInitial = (displayName || "U").slice(0, 1).toUpperCase();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(overlayOpacity, { toValue: 0.25, duration: 250, useNativeDriver: true }),
      ]).start();
    } else if (isVisible) {
      Animated.parallel([
        Animated.timing(translateX, { toValue: -panelWidth, duration: 250, useNativeDriver: true }),
        Animated.timing(overlayOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start(() => setIsVisible(false));
    }
  }, [isOpen]);

  const handleDelete = async (id: string) => {
    Alert.alert("Delete conversation", "Are you sure you want to delete this conversation?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await chatService.deleteChat(id);
            if (res.success) {
              // setItems((prev) => prev.filter((i) => i.id !== id));
            }
          } catch {}
        },
      },
    ]);
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay} pointerEvents={isOpen ? "auto" : "none"}>
      <Animated.View style={[styles.backdrop, { opacity: overlayOpacity }]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} accessibilityRole="button" />
      </Animated.View>
      <Animated.View style={[styles.animatedPanel, { transform: [{ translateX }] }]}> 
        <LinearGradient
          colors={["#EDFAFF", "#FFFFFF", "#FFFFFF", "#FFF2F9"]}
          locations={[0, 0.06, 0.38, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.panel}
        >
          <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
            <View style={styles.sidebarHeader}>
              <TouchableOpacity onPress={onClose} accessibilityRole="button" style={styles.hamburgerButton}>
                <ChevronLeft color="#111827" size={16} />
              </TouchableOpacity>
              <Text style={styles.brand}>legali</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
              <View style={styles.searchBox}>
                <View style={styles.searchInputRow}>
                  <Search color="#6B7280" size={16} />
                  <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search chats"
                    style={styles.searchInput}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <Text style={styles.sectionLabel}>Tools</Text>
              <View style={styles.section}>
                <View style={styles.toolItem}><Plus color="#111827" size={16} /><Text style={styles.toolText}>New Chat</Text></View>
                <View style={styles.toolItem}><AlertTriangle color="#111827" size={16} /><Text style={styles.toolText}>Red Flag Alerts</Text></View>
                <View style={styles.toolItem}><Building2 color="#111827" size={16} /><Text style={styles.toolText}>Litigation Case Builder</Text></View>
                <View style={styles.toolItem}><FileText color="#111827" size={16} /><Text style={styles.toolText}>Smart Legal Drafter</Text></View>
              </View>

              <Text style={styles.sectionLabel}>Workspace</Text>
              <View style={styles.section}>
                <View style={styles.toolItem}><Folder color="#111827" size={16} /><Text style={styles.toolText}>File Organization</Text></View>
                <View style={styles.toolItem}><MessageSquare color="#111827" size={16} /><Text style={styles.toolText}>Forum</Text></View>
                <View style={styles.toolItem}><Headphones color="#111827" size={16} /><Text style={styles.toolText}>Support - Ticket</Text></View>
                <View style={styles.toolItem}><FileText color="#111827" size={16} /><Text style={styles.toolText}>Case Organization</Text></View>
              </View>

              <Text style={styles.sectionLabel}>Chat History</Text>
              <View style={styles.list}>
                {combinedHistory.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.item, item.id === currentChatId ? styles.itemActive : null]}
                    accessibilityRole="button"
                    onPress={() => {
                      // Emit selection to parent for loading via hook
                      if (onSelectChat) onSelectChat(item);
                      // Optionally close sidebar for mobile UX
                      onClose();
                    }}
                  >
                    <View style={styles.itemLeft}>
                      <Text style={styles.itemTitle}>{item.title || "Untitled chat"}</Text>
                      <Text style={styles.itemMeta}>{item.timestamp?.slice(0, 10) || ""}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn} accessibilityRole="button">
                      <Trash2 color="#DC2626" size={16} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={styles.userBox}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{avatarInitial}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{displayName}</Text>
                  <Text style={styles.userEmail}>{user?.email || "user@example.com"}</Text>
                </View>
                <TouchableOpacity onPress={() => { try { require("expo-router").router.push("/new-profile"); } catch {} }} style={{ marginLeft: "auto" }}>
                  <Text style={{ color: "#3FA7CC", fontWeight: "600" }}>Profile</Text>
                </TouchableOpacity>
              </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "transparent", zIndex: 50 },
  backdrop: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000", opacity: 0.25 },
  animatedPanel: { position: "absolute", top: 0, left: 0, height: "100%", width: 320 },
  panel: { width: 320, height: "100%", borderRightWidth: 1, borderRightColor: "#E5E7EB", shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  sidebarHeader: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#E5E7EB" },
  hamburgerButton: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB" },
  brand: { fontSize: 16, fontWeight: "700", color: "#111827" },
  scroll: { paddingBottom: 16 },
  searchBox: { paddingHorizontal: 12, paddingTop: 10 },
  searchInputRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  searchInput: { flex: 1, fontSize: 14, color: "#111827" },
  sectionLabel: { paddingHorizontal: 12, paddingTop: 16, paddingBottom: 6, fontSize: 12, color: "#6B7280" },
  section: { paddingHorizontal: 8 },
  toolItem: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 8, paddingVertical: 10, borderRadius: 8 },
  toolText: { fontSize: 14, color: "#111827" },
  list: { paddingHorizontal: 12, paddingTop: 8 },
  item: { padding: 12, marginBottom: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  itemActive: { borderColor: "#111827" },
  itemLeft: { flexDirection: "column", flexShrink: 1 },
  itemTitle: { fontSize: 14, fontWeight: "600", color: "#111827" },
  itemMeta: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  deleteBtn: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8 },
  userBox: { paddingHorizontal: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#E5E7EB", flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#E5E7EB" },
  avatarText: { fontSize: 12, color: "#111827", fontWeight: "600" },
  userInfo: { flexDirection: "column", flexShrink: 1 },
  userName: { fontSize: 12, color: "#111827", fontWeight: "600" },
  userEmail: { fontSize: 12, color: "#6B7280" },
});