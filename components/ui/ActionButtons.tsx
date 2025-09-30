import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  backgroundColor?: string;
  textColor?: string;
  flex?: number;
}

interface ActionButtonsProps {
  buttons: ActionButtonProps[];
  containerStyle?: any;
}

export function ActionButtons({ buttons, containerStyle }: ActionButtonsProps) {
  return (
    <View style={[styles.actionButtonsContainer, containerStyle]}>
      {buttons.map((button, index) => (
        <TouchableOpacity 
          key={index}
          onPress={button.onPress}
          style={[
            styles.actionButton,
            {
              flex: button.flex || 1,
              backgroundColor: button.backgroundColor || 
                (button.variant === 'primary' ? '#4f46e5' : '#f1f5f9'),
            }
          ]}
        >
          <Text style={[
            styles.actionButtonText,
            {
              color: button.textColor || 
                (button.variant === 'primary' ? 'white' : '#0f172a'),
            }
          ]}>
            {button.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 12,
  },
  actionButtonText: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});
