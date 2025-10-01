import React from 'react';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlossaryEntry } from '../data/glossary';

interface GlossaryModalProps {
  visible: boolean;
  entry: GlossaryEntry | null;
  onClose: () => void;
}

export function GlossaryModal({ visible, entry, onClose }: GlossaryModalProps) {
  if (!entry) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} />
        <View style={styles.container}>
          <Pressable
            style={styles.content}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Pressable
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-circle" size={28} color="#9AA8C5" />
            </Pressable>

            {/* Category badge */}
            {entry.category && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {entry.category.toUpperCase()}
                </Text>
              </View>
            )}

            {/* Term title */}
            <Text style={styles.term}>{entry.term}</Text>

            {/* Definition */}
            <Text style={styles.definition}>{entry.definition}</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3FA7CC',
    letterSpacing: 0.5,
  },
  term: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B2745',
    marginBottom: 12,
    paddingRight: 32,
  },
  definition: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A5568',
  },
});
