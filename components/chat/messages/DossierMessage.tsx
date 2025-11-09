import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { formatDossierFileName, formatFileSize, formatTimestamp } from "@/lib/chat-formatting-helpers";

interface DossierData {
  url: string;
  fileName: string;
  fileSize: number;
  generatedAt?: string;
}

interface DossierMessageProps {
  dossier: DossierData;
  timestamp?: Date | string;
  onDocumentClick: (url: string, fileName: string, generatedAt?: string) => void;
}

export function DossierMessage({ dossier, timestamp, onDocumentClick }: DossierMessageProps) {
  const displayFileName = formatDossierFileName(dossier.fileName, dossier.generatedAt);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>📄</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{displayFileName}</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>Legal Dossier</Text></View>
            </View>
            <Text style={styles.subtitle}>Comprehensive legal analysis and case documentation • {formatFileSize(dossier.fileSize)}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => onDocumentClick(dossier.url, displayFileName, dossier.generatedAt)}
                accessibilityRole="button">
                <Text style={styles.viewText}>View Document</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => onDocumentClick(dossier.url, displayFileName, dossier.generatedAt)}
                accessibilityRole="button">
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {timestamp && <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: "flex-start" },
  container: { width: "100%", maxWidth: 420, borderRadius: 16, borderWidth: 1, borderColor: "#93C5FD", backgroundColor: "#EEF2FF", padding: 12, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4 },
  row: { flexDirection: "row", gap: 12 },
  iconWrap: { marginTop: 2 },
  iconBox: { height: 40, width: 40, borderRadius: 10, backgroundColor: "#3B82F6", alignItems: "center", justifyContent: "center" },
  iconText: { color: "#FFFFFF", fontSize: 18 },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 14, fontWeight: "600", color: "#111827" },
  badge: { borderRadius: 6, backgroundColor: "#DBEAFE", paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontSize: 12, fontWeight: "600", color: "#1D4ED8" },
  subtitle: { marginTop: 4, fontSize: 12, color: "#6B7280" },
  actions: { flexDirection: "row", gap: 8, marginTop: 8 },
  viewBtn: { borderRadius: 8, borderWidth: 1, borderColor: "#2563EB", backgroundColor: "#3B82F6", paddingHorizontal: 12, paddingVertical: 8 },
  viewText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  downloadBtn: { borderRadius: 8, borderWidth: 1, borderColor: "#059669", backgroundColor: "#10B981", paddingHorizontal: 12, paddingVertical: 8 },
  downloadText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  timestamp: { marginTop: 4, fontSize: 12, color: "#6B7280" },
});