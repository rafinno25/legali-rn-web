import { apiClient } from "@/lib/api-client";

type Paginated<T> = { data: T[]; meta?: { currentPage?: number; totalPages?: number } };

export type StateInfo = { id: number; name: string };
export type CityInfo = { id: number; name: string; state_id: number };

export async function getStates(page = 1, limit = 10): Promise<Paginated<StateInfo>> {
  const res = await apiClient.get("/api/locations/states", { params: { page, limit } });
  const data = res.data;
  if (data?.success && data?.data) return data.data as Paginated<StateInfo>;
  // Fallback if API returns plain array
  if (Array.isArray(data)) return { data } as Paginated<StateInfo>;
  throw new Error(data?.message || "Failed to fetch states");
}

export async function getCities(state_id: number, page = 1, limit = 10): Promise<Paginated<CityInfo>> {
  const res = await apiClient.get("/api/locations/cities", { params: { state_id, page, limit } });
  const data = res.data;
  if (data?.success && data?.data) return data.data as Paginated<CityInfo>;
  if (Array.isArray(data)) return { data } as Paginated<CityInfo>;
  throw new Error(data?.message || "Failed to fetch cities");
}