import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import type { User } from "@/lib/auth";
import { clearAuth, getAccessToken, getUserData, setTokens, setUserData } from "@/lib/auth";

type AuthContextValue = {
  isAuthenticated: boolean;
  user: User | null;
  login: (payload: { access_token: string; refresh_token: string; user: User }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await getAccessToken();
      const existingUser = await getUserData();
      setIsAuthenticated(!!token);
      setUser(existingUser);
    };
    bootstrap();
  }, []);

  const login = async ({ access_token, refresh_token, user }: { access_token: string; refresh_token: string; user: User }) => {
    await setTokens(access_token, refresh_token);
    await setUserData(user);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = async () => {
    await clearAuth();
    setIsAuthenticated(false);
    setUser(null);
    router.replace("/auth");
  };

  const value = useMemo<AuthContextValue>(() => ({ isAuthenticated, user, login, logout }), [isAuthenticated, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}