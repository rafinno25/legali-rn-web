// Common colors used across the app
export const colors = {
  // Primary colors
  primary: '#4f46e5',
  primaryDark: '#3730a3',
  primaryLight: '#eef2ff',

  // Secondary colors
  secondary: '#9333ea',

  // Success colors
  success: '#10b981',
  successDark: '#0d9488',
  successLight: '#ecfdf5',

  // Text colors
  textPrimary: '#0f172a',
  textSecondary: '#374151',
  textMuted: '#64748b',

  // Background colors
  background: '#f8fafc',
  backgroundCard: '#ffffff',
  backgroundMuted: '#f1f5f9',

  // Border colors
  border: '#e2e8f0',
  borderLight: '#c7d2fe',

  // Status colors
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
} as const;

// Common spacing values
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Common border radius values
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

// Common font sizes
export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
} as const;

// Common font weights
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Common shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
} as const;
