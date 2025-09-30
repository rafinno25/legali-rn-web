import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DocumentCardProps {
  title: string;
  subtitle: string;
  icon?: string;
  iconColor?: string;
  onPreviewPress?: () => void;
  showPreview?: boolean;
  children?: React.ReactNode;
}

export function DocumentCard({
  title,
  subtitle,
  icon = 'document-text',
  iconColor = '#4f46e5',
  onPreviewPress,
  showPreview = false,
  children,
}: DocumentCardProps) {
  return (
    <View style={styles.documentCard}>
      {/* Document Header */}
      <View style={styles.documentHeader}>
        <View style={styles.documentHeaderContent}>
          <View style={styles.documentInfo}>
            <Ionicons name={icon as any} size={24} color={iconColor} />
            <View>
              <Text style={styles.documentTitle}>{title}</Text>
              <Text style={styles.documentSubtitle}>{subtitle}</Text>
            </View>
          </View>
          {onPreviewPress && (
            <TouchableOpacity 
              onPress={onPreviewPress}
              style={styles.actionButton}
            >
              <Ionicons 
                name={showPreview ? "eye-off" : "eye"} 
                size={20} 
                color="#64748b" 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Document Preview */}
      <View style={styles.documentPreviewContainer}>
        <View style={styles.documentPreview}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  documentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  documentHeader: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginHorizontal: -20,
    marginTop: -20,
  },
  documentHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  documentTitle: {
    fontWeight: 'bold',
    color: '#0f172a',
    fontSize: 16,
  },
  documentSubtitle: {
    color: '#64748b',
    fontSize: 12,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  documentPreviewContainer: {
    padding: 0,
    marginTop: 16,
  },
  documentPreview: {
    height: 500,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
});
