import { useInfiniteQuery } from "@tanstack/react-query";
import { getStates, getCities, type StateInfo, type CityInfo } from "@/services/location.service";

export function useQueryStates() {
  return useInfiniteQuery<{ data: StateInfo[]; meta?: any }>({
    queryKey: ["locations", "states"],
    queryFn: async ({ pageParam = 1 }) => await getStates(pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const current = lastPage?.meta?.currentPage ?? 1;
      const total = lastPage?.meta?.totalPages ?? current;
      return current < total ? current + 1 : undefined;
    },
  });
}

export function useQueryCities(stateId?: number) {
  return useInfiniteQuery<{ data: CityInfo[]; meta?: any }>({
    queryKey: ["locations", "cities", stateId],
    queryFn: async ({ pageParam = 1 }) => {
      if (!stateId) return { data: [], meta: { currentPage: 1, totalPages: 1 } };
      return await getCities(stateId, pageParam, 10);
    },
    enabled: typeof stateId === "number" && stateId > 0,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const current = lastPage?.meta?.currentPage ?? 1;
      const total = lastPage?.meta?.totalPages ?? current;
      return current < total ? current + 1 : undefined;
    },
  });
}