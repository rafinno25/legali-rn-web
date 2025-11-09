import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard, Switch } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Paperclip, Mic, StopCircle, Send, Volume2 } from "lucide-react-native";

interface Props {
  onSend?: (text: string) => void;
  // Web compatibility: alias prop
  onSendMessage?: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  // Web compatibility: controlled value pattern
  value?: string;
  onValueChange?: (value: string) => void;
  // Attachments
  onFileSelect?: (files: { uri: string; name: string; type: string }[]) => void;
  selectedFiles?: { uri: string; name: string; type: string }[];
  onFilesChange?: (files: { uri: string; name: string; type: string }[]) => void;
  // Voice toggle / audio playback indicator
  isVoiceEnabled?: boolean;
  onVoiceEnabledChange?: (enabled: boolean) => void;
  isAudioPlaying?: boolean;
}

export default function ChatInput({
  onSend,
  onSendMessage,
  disabled = false,
  placeholder = "How can we help? Type your concerns to be raised",
  value,
  onValueChange,
  onFileSelect,
  selectedFiles: externalSelectedFiles,
  onFilesChange,
  isVoiceEnabled: externalIsVoiceEnabled,
  onVoiceEnabledChange,
  isAudioPlaying = false,
}: Props) {
  const [internal, setInternal] = useState("");
  const text = value !== undefined ? value : internal;
  const setText = onValueChange || setInternal;
  const [internalSelectedFiles, setInternalSelectedFiles] = useState<{ uri: string; name: string; type: string }[]>([]);
  const selectedFiles = externalSelectedFiles || internalSelectedFiles;
  const setSelectedFiles = onFilesChange || setInternalSelectedFiles;
  const [internalIsVoiceEnabled, setInternalIsVoiceEnabled] = useState(false);
  const isVoiceEnabled = externalIsVoiceEnabled !== undefined ? externalIsVoiceEnabled : internalIsVoiceEnabled;
  const setIsVoiceEnabled = onVoiceEnabledChange || setInternalIsVoiceEnabled;
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    // Support both web and mobile prop names
    if (onSend) onSend(trimmed);
    if (onSendMessage) onSendMessage(trimmed);
    // Send files if any
    if (selectedFiles.length > 0) {
      onFileSelect?.(selectedFiles);
    }
    setText("");
    setSelectedFiles([]);
    Keyboard.dismiss();
  };

  const handlePickFile = async () => {
    if (disabled) return;
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (!res.canceled && res.assets && res.assets.length > 0) {
        const asset = res.assets[0];
        const file = { uri: asset.uri, name: asset.fileName || "attachment", type: asset.type || "application/octet-stream" } as {
          uri: string;
          name: string;
          type: string;
        };
        if (typeof setSelectedFiles === "function") {
          setSelectedFiles([...(selectedFiles || []), file]);
        }
      }
    } catch (e) {
      // swallow errors in UI
    }
  };

  const handleRemoveFile = (index: number) => {
    if (typeof setSelectedFiles === "function") {
      setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    }
  };

  const handleClearAllFiles = () => {
    if (typeof setSelectedFiles === "function") {
      setSelectedFiles([]);
    }
  };

  const handleMicrophoneClick = () => {
    setIsTranscribing(prev => !prev);
  };

  return (
    <View style={styles.wrapper}>
      {/* File attachments list */}
      {selectedFiles.length > 0 && (
        <View style={styles.attachmentsContainer}>
          {selectedFiles.map((f, i) => (
            <View key={`${f.uri}-${i}`} style={styles.attachmentChip}>
              <Text style={styles.attachmentName} numberOfLines={1}>
                {f.name}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveFile(i)} accessibilityRole="button">
                <Text style={styles.removeText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={handleClearAllFiles} style={styles.clearAllBtn}>
            <Text style={styles.clearAllText}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.container}>
        <TouchableOpacity onPress={handlePickFile} style={styles.iconButton} accessibilityRole="button" disabled={disabled}>
          <Paperclip color="#9CA3AF" size={20} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={isTranscribing ? "Listening..." : placeholder}
          editable={!disabled}
          multiline
        />
        <TouchableOpacity
          onPress={handleMicrophoneClick}
          style={[styles.iconButton, isTranscribing ? styles.micRecording : undefined]}
          accessibilityRole="button"
          disabled={disabled}
        >
          {isTranscribing ? <StopCircle color="#fff" size={20} /> : <Mic color="#9CA3AF" size={20} />}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, disabled && styles.buttonDisabled]} onPress={handleSend} disabled={disabled}>
          <Text style={styles.buttonText}>Send</Text>
          <Send color="#fff" size={18} />
        </TouchableOpacity>
      </View>

      {/* Voice toggle */}
      <View style={styles.voiceRow}>
        <Volume2 color="#5B99C2" size={18} />
        <Text style={styles.voiceLabel}>Read responses aloud</Text>
        <Switch value={isVoiceEnabled} onValueChange={setIsVoiceEnabled} disabled={disabled} />
        {isAudioPlaying && <Text style={styles.playingText}>Playing...</Text>}
      </View>

      {/* Recording status indicator */}
      {(isTranscribing) && (
        <View style={styles.recordingRow}>
          <View style={styles.pulseDot} />
          <Text style={styles.recordingLabel}>Listening...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderTopWidth: 1, borderTopColor: "#E5E7EB", backgroundColor: "#fff" },
  attachmentsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 12, paddingTop: 8 },
  attachmentChip: { flexDirection: "row", alignItems: "center", gap: 6, borderColor: "#D1D5DB", borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 6 },
  attachmentName: { maxWidth: 180, color: "#374151", fontSize: 12 },
  removeText: { color: "#DC2626", fontSize: 12 },
  clearAllBtn: { marginLeft: 8, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: "#F3F4F6" },
  clearAllText: { color: "#374151", fontSize: 12 },
  container: { flexDirection: "row", alignItems: "center", padding: 8, backgroundColor: "#fff" },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    marginHorizontal: 8,
  },
  iconButton: { paddingHorizontal: 8, paddingVertical: 8, borderRadius: 8 },
  micRecording: { backgroundColor: "#DC2626" },
  button: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#5B99C2", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontWeight: "600", marginRight: 4 },
  voiceRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingBottom: 8 },
  voiceLabel: { color: "#4B5563", fontSize: 12 },
  playingText: { color: "#5B99C2", fontSize: 12, fontWeight: "600" },
  recordingRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingBottom: 8 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#DC2626" },
  recordingLabel: { color: "#DC2626", fontSize: 12, fontWeight: "600" },
});