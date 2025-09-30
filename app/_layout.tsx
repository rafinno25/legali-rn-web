import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(documents)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(red-flag-analysis)" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="portfolio" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="index" />
      </Stack>
      <PortalHost />
    </SafeAreaProvider>
  );
}
