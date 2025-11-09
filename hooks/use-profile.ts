import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClientProfile, updateProfile, type UpdateProfileRequest, type ClientProfile } from "@/services/profile.service";

export const PROFILE_QUERY_KEY = ["profile", "client"] as const;

export function useClientProfile() {
  return useQuery<ClientProfile>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getClientProfile,
  });
}

export function useProfileMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      return await updateProfile(data);
    },
    onSuccess: profile => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, profile);
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });

  const mutateWithToast = async (data: UpdateProfileRequest, onSuccess?: () => void) => {
    const result = await mutation.mutateAsync(data);
    onSuccess?.();
    return result;
  };

  return { mutateWithToast };
}