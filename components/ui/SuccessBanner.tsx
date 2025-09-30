import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SuccessBannerProps {
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
  gradientColors?: readonly [string, string, ...string[]];
}

export function SuccessBanner({
  title,
  description,
  icon = 'checkmark-circle',
  iconColor = 'white',
  gradientColors = ['#10b981', '#0d9488'] as const,
}: SuccessBannerProps) {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.successBanner}
    >
      <View style={styles.successBannerContent}>
        <Ionicons name={icon as any} size={28} color={iconColor} />
        <Text style={styles.successBannerTitle}>{title}</Text>
      </View>
      <Text style={styles.successBannerDescription}>
        {description}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  successBanner: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  successBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  successBannerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  successBannerDescription: {
    color: '#ecfdf5',
    fontSize: 14,
  },
});
