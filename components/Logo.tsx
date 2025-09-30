import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface LogoProps {
  width?: number;
  height?: number;
}

export function Logo({ width = 200, height = 120 }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/Logo_2.png')}
        style={[styles.logoImage, { width, height }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  logoImage: {
    // The width and height will be set via props
  },
});