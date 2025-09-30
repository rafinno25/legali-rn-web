import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface TextPreviewProps {
  children: React.ReactNode;
  showScrollIndicator?: boolean;
}

export function TextPreview({ 
  children, 
  showScrollIndicator = true 
}: TextPreviewProps) {
  return (
    <ScrollView 
      style={styles.textPreview}
      showsVerticalScrollIndicator={showScrollIndicator}
    >
      <View style={styles.textContent}>
        {children}
      </View>
    </ScrollView>
  );
}

// Common text styles that can be reused
export const textStyles = StyleSheet.create({
  courtHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#1e293b',
  },
  courtHeaderWithMargin: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
    color: '#1e293b',
  },
  partyLabel: {
    fontWeight: '600',
    color: '#374151',
  },
  partyLabelWithMargin: {
    fontWeight: '600',
    marginTop: 12,
    color: '#374151',
  },
  partyInfo: {
    color: '#374151',
  },
  caseNumber: {
    marginTop: 12,
    color: '#374151',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 14,
    color: '#1e293b',
  },
  paragraph: {
    marginTop: 16,
    color: '#374151',
  },
  paragraphWithMargin: {
    marginTop: 12,
    color: '#374151',
  },
  boldText: {
    fontWeight: '600',
  },
  continuationText: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 20,
  },
});

const styles = StyleSheet.create({
  textPreview: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  textContent: {
    padding: 16,
    paddingTop: 20,
  },
});
