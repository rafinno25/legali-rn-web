import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyChats = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Team Standup" },
  { id: "3", name: "Bob" },
];

export default function ChatListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <View style={{ marginTop: 12 }}>
        {dummyChats.map((c) => (
          <Link key={c.id} href={{ pathname: "/chat/conversation", params: { id: c.id } }} asChild>
            <Pressable style={styles.item}>
              <Text style={styles.itemTitle}>{c.name}</Text>
              <Text style={styles.itemSub}>Tap to open conversation</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginTop: 24 },
  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemSub: { fontSize: 12, color: "#6b7280" },
});

