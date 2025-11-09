import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { Platform } from 'react-native';


const COOKIE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture_url?: string | null;
  city_id?: number | null;
}

async function saveAsync(key: string, value: string) {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, value);
    } else { // mobile
      await SecureStore.setItemAsync(key, value.toString());
    }
  } catch (error) {
    console.error("Error saving data:", error); 
  }
}

async function getValueFor(key: string): Promise<string | null> {
  try {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(key as string);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}

async function deleteItemAsync(key: string): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  } 
}

export async function setAccessToken(token: string): Promise<void> {
  saveAsync(COOKIE_KEYS.ACCESS_TOKEN, token);
}

export async function getAccessToken(): Promise<string | null> {
  return await getValueFor(COOKIE_KEYS.ACCESS_TOKEN);
}

export async function setRefreshToken(token: string): Promise<void> {
  saveAsync(COOKIE_KEYS.REFRESH_TOKEN, token);
}

export async function getRefreshToken(): Promise<string | null> {
  return await getValueFor(COOKIE_KEYS.REFRESH_TOKEN);
}

export async function setTokens(accessToken: string, refreshToken: string): Promise<void> {
  await setAccessToken(accessToken);
  await setRefreshToken(refreshToken);
}

export async function clearAuth(): Promise<void> {
  await deleteItemAsync(COOKIE_KEYS.ACCESS_TOKEN);
  await deleteItemAsync(COOKIE_KEYS.REFRESH_TOKEN);
  await clearUserData();
}

export async function isAuthenticated(): Promise<boolean> {
  return !!(await getAccessToken());
}

export async function getAuthHeader(): Promise<string | null> {
  const token = await getAccessToken();
  return token ? `Bearer ${token}` : null;
}

export async function getUserData(): Promise<User | null> {
  try {
    const userData = await AsyncStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.warn("Error parsing user data from storage:", error);
    return null;
  }
}

export async function setUserData(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem("user_data", JSON.stringify(user));
  } catch (error) {
    console.warn("Error storing user data:", error);
  }
}

export async function clearUserData(): Promise<void> {
  try {
    await AsyncStorage.removeItem("user_data");
  } catch (error) {
    console.warn("Error clearing user data:", error);
  }
}

const IS_DEMO_USER = false;

export async function getUserId(): Promise<string> {
  if (IS_DEMO_USER) {
    return "00000000-0000-0000-0000-000000000000";
  }
  const userData = await getUserData();
  if (!userData) {
    const anonId = uuidv4();
    const anonUser: User = {
      id: anonId,
      email: `${anonId.replace("-", "")}@anonymous.legali.io`,
      first_name: "Anonymous",
      last_name: "User",
      profile_picture_url: null,
      city_id: null,
    };
    await setUserData(anonUser);
    return anonId;
  }
  return userData?.id ?? "";
}

export async function isAnonymousUser(): Promise<boolean> {
  const userData = await getUserData();
  return !!userData?.email?.endsWith("@anonymous.legali.io");
}