import { useAuth } from "@/contexts/AuthProvider";

export function useUserData() {
  const { user } = useAuth();
  return { user, isAuthenticated: !!user } as const;
}