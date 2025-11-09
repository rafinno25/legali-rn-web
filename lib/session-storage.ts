import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_PENDING_MESSAGE = "pending_message";

export async function getPendingMessage(): Promise<string | null> {
  try {
    return (await AsyncStorage.getItem(KEY_PENDING_MESSAGE)) || null;
  } catch {
    return null;
  }
}

export async function setPendingMessage(text: string): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY_PENDING_MESSAGE, text);
  } catch {}
}

export async function clearPendingMessage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY_PENDING_MESSAGE);
  } catch {}
}