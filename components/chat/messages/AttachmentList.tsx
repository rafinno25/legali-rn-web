import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { getFileIcon, getFileTypeLabel } from "@/lib/chat-formatting-helpers";

interface Attachment {
  mime_type?: string;
  type?: string;
  file_name?: string;
  filename?: string;
  name?: string;
  url?: string;
}

interface AttachmentListProps {
  attachments: Attachment[];
  isUserMessage: boolean;
  onDocumentClick: (url: string, fileName: string) => void;
}

export function AttachmentList({ attachments, isUserMessage, onDocumentClick }: AttachmentListProps) {
  if (!attachments || attachments.length === 0) return null;
  return (
    <View style={{ marginTop: 8, gap: 8 }}>
      {attachments.map((attachment, idx) => {
        const mimeType = attachment.mime_type || attachment.type || "";
        const isPdf = mimeType.includes("pdf");
        const fileName = attachment.file_name || attachment.filename || attachment.name || "Unknown file";
        return (
          <View key={idx} style={[styles.item, isUserMessage ? styles.userItem : styles.agentItem]}>
            <View style={styles.row}>
              <Text style={styles.icon}>{getFileIcon(mimeType)}</Text>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.fileName}>{fileName}</Text>
                <Text style={[styles.meta, isUserMessage ? styles.userMeta : styles.agentMeta]}>{getFileTypeLabel(mimeType)}</Text>
                {attachment.url && (
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[styles.viewBtn, isUserMessage ? styles.viewBtnUser : styles.viewBtnAgent]}
                      onPress={() => {
                        if (isPdf) {
                          onDocumentClick(attachment.url!, fileName);
                        } else {
                          Linking.openURL(attachment.url!);
                        }
                      }}
                      accessibilityRole="button">
                      <Text style={[styles.btnText, isUserMessage ? styles.btnTextUser : styles.btnTextAgent]}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.downloadBtn, isUserMessage ? styles.downloadBtnUser : styles.downloadBtnAgent]}
                      onPress={() => attachment.url && Linking.openURL(attachment.url)}
                      accessibilityRole="button">
                      <Text style={[styles.btnText, isUserMessage ? styles.btnTextUser : styles.btnTextAgent]}>Download</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  item: { borderRadius: 12, borderWidth: 1, padding: 8 },
  userItem: { backgroundColor: "#60A5FA33", borderColor: "#93C5FD" },
  agentItem: { backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  icon: { fontSize: 18 },
  fileName: { fontSize: 14, fontWeight: "500", color: "#111827" },
  meta: { fontSize: 12 },
  userMeta: { color: "#DBEAFE" },
  agentMeta: { color: "#6B7280" },
  actions: { flexDirection: "row", gap: 8, marginTop: 8 },
  viewBtn: { borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6 },
  viewBtnUser: { backgroundColor: "#3B82F6", borderColor: "#2563EB" },
  viewBtnAgent: { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" },
  downloadBtn: { borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6 },
  downloadBtnUser: { backgroundColor: "#10B981", borderColor: "#059669" },
  downloadBtnAgent: { backgroundColor: "#ECFDF5", borderColor: "#A7F3D0" },
  btnText: { fontSize: 12, fontWeight: "600" },
  btnTextUser: { color: "#FFFFFF" },
  btnTextAgent: { color: "#1F2937" },
});