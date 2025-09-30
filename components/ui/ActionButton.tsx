import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'custom';
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: any;
  gradientColors?: string[];
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
}

export function ActionButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  icon, 
  disabled = false,
  style,
  gradientColors,
  backgroundColor,
  textColor,
  fontSize = 18
}: ActionButtonProps) {
  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          {
            width: '100%',
            backgroundColor: backgroundColor || 'white',
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 6,
            borderWidth: 1,
            borderColor: '#e2e8f0',
            opacity: disabled ? 0.6 : 1,
          },
          style
        ]}
      >
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 12 
        }}>
          {icon}
          <Text style={{
            color: textColor || '#0f172a',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: fontSize
          }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'custom') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          { width: '100%' },
          style
        ]}
      >
        <LinearGradient
          colors={gradientColors as any || ['#4f46e5', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            opacity: disabled ? 0.6 : 1,
          }}
        >
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 12 
          }}>
            {icon}
            <Text style={{ 
              color: textColor || 'white', 
              fontWeight: '700', 
              fontSize: fontSize 
            }}>
              {title}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Default primary variant
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        { width: '100%' },
        style
      ]}
    >
      <LinearGradient
        colors={gradientColors as any || ['#4f46e5', '#9333ea']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 16,
          paddingVertical: 16,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 12 
        }}>
          {icon}
        <Text style={{ 
          color: textColor || 'white', 
          fontWeight: '700', 
          fontSize: fontSize 
        }}>
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}