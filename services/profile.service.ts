import { apiClient } from "@/lib/api-client";
import { getAuthApiUrl } from "@/lib/api-config";

export type ClientProfile = {
  user_id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  photo_url: string | null;
  city: {
    id: number;
    name: string;
    state: { id: number; name: string };
  } | null;
  date_of_birth: string | null;
  stripe_customer_id: string | null;
  override_plan_id: string | null;
};

export type UpdateProfileRequest = {
  firstname?: string;
  lastname?: string;
  city_id?: number | null;
  date_of_birth?: string | null; // ISO string YYYY-MM-DD
  file?: any; // React Native: { uri, name, type }
};

export async function getClientProfile(): Promise<ClientProfile> {
  const url = `${getAuthApiUrl("PROFILE")}/client`;
  const response = await apiClient.get(url);
  const data = response.data;
  if (data?.success && data?.data) return data.data as ClientProfile;
  throw new Error(data?.message || "Failed to load profile");
}

export async function updateProfile(payload: UpdateProfileRequest): Promise<ClientProfile> {
  const url = getAuthApiUrl("PROFILE");

  const form = new FormData();
  if (typeof payload.firstname === "string") form.append("firstname", payload.firstname);
  if (typeof payload.lastname === "string") form.append("lastname", payload.lastname);
  if (payload.city_id !== undefined && payload.city_id !== null) form.append("city_id", String(payload.city_id));
  if (payload.date_of_birth) form.append("date_of_birth", payload.date_of_birth);
  if (payload.file) {
    form.append("file", payload.file);
  }

  const response = await apiClient.put(url, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const data = response.data;
  if (data?.success && data?.data) return data.data as ClientProfile;
  throw new Error(data?.message || "Failed to update profile");
}