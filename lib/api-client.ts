import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { router } from "expo-router";
import { API_CONFIG } from "./api-config";
import { getAccessToken, getRefreshToken, setTokens, clearAuth } from "./auth";

let isRefreshing = false;

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    async config => {
      const token = await getAccessToken();
      if (token) {
        config.headers = config.headers || {};
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async error => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // If unauthorized, try refresh once
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // If a refresh is already in progress, wait briefly then retry
          await new Promise(res => setTimeout(res, 500));
          const token = await getAccessToken();
          if (token) {
            originalRequest.headers = originalRequest.headers || {};
            (originalRequest.headers as any).Authorization = `Bearer ${token}`;
            return client(originalRequest);
          }
        }

        try {
          isRefreshing = true;
          const refreshToken = await getRefreshToken();
          if (!refreshToken) throw new Error("No refresh token available");

          const refreshResponse = await client.post(
            API_CONFIG.AUTH.REFRESH,
            { refresh_token: refreshToken },
            { headers: { "Content-Type": "application/json" } }
          );

          const data = refreshResponse.data as {
            data?: { access_token: string; refresh_token: string };
            access_token?: string;
            refresh_token?: string;
          };
          const newAccess = data?.data?.access_token ?? data?.access_token;
          const newRefresh = data?.data?.refresh_token ?? data?.refresh_token;

          if (!newAccess || !newRefresh) throw new Error("Invalid refresh response");

          await setTokens(newAccess, newRefresh);

          originalRequest.headers = originalRequest.headers || {};
          (originalRequest.headers as any).Authorization = `Bearer ${newAccess}`;
          return client(originalRequest);
        } catch (refreshErr) {
          await clearAuth();
          router.replace("/auth");
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }

      // For other errors, just propagate
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get(url, config).then(res => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post(url, data, config).then(res => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put(url, data, config).then(res => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.patch(url, data, config).then(res => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete(url, config).then(res => res.data),
};