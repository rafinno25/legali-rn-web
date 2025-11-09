import React from "react";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NAV_THEME } from "@/lib/theme";
import "../global.css";
import { AuthProvider } from "@/contexts/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Initialize QueryClient once at module scope
const queryClient = new QueryClient();


export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(chats)" />
              <Stack.Screen name="(documents)" />
              <Stack.Screen name="(onboarding)" />
              <Stack.Screen name="(red-flag-analysis)" />
              <Stack.Screen name="chat" />
              <Stack.Screen name="profile" />
              <Stack.Screen name="portfolio" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="index" />
              <Stack.Screen name="new-profile" />
            </Stack>
            <PortalHost />
          </AuthProvider>
        </QueryClientProvider>
        </SafeAreaProvider>
      </ThemeProvider>
  );
}
