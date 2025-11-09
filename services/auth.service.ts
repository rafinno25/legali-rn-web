import { apiClient } from "@/lib/api-client";
import { getAuthApiUrl } from "@/lib/api-config";
import type { User } from "@/lib/auth";

export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export type LoginFormData = {
  email: string;
  password: string;
};

export type AuthSuccessResponse = {
  success: true;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
      role: string;
    };
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  };
};

export type AuthErrorResponse = {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
};

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

export async function signIn(
  credentials: LoginFormData
): Promise<AuthSuccessResponse["data"] & { user: User }> {
  try {
    const response = await apiClient.post<AuthResponse>(getAuthApiUrl("LOGIN"), credentials);
    const data = response.data;

    if (!data.success) {
      throw new AuthError(data.message, (response as any).status, data.errors);
    }

    const user: User = {
      id: data.data.user.id,
      email: data.data.user.email,
      first_name: data.data.user.firstname,
      last_name: data.data.user.lastname,
      profile_picture_url: null,
      city_id: null,
    };

    return {
      ...data.data,
      user: {
        ...user,
        firstname: user.first_name || "",
        lastname: user.last_name || "",
        role: "user",
      } as any,
    };
  } catch (error: unknown) {
    if (error instanceof AuthError) throw error;

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response: { data: { message?: string; errors?: Array<{ field: string; message: string }> }; status: number };
      };
      const responseData = axiosError.response.data;
      throw new AuthError(responseData?.message || "Authentication failed", axiosError.response.status, responseData?.errors);
    }

    if (error && typeof error === "object" && "request" in error) {
      throw new AuthError("Network error. Please check your connection.");
    }

    throw new AuthError("An unexpected error occurred");
  }
}

export async function signOut(): Promise<void> {
  try {
    await apiClient.post(getAuthApiUrl("LOGOUT"));
  } catch (error) {
    console.warn("Signout request failed:", error);
  }
}

export async function refreshToken(refreshToken: string): Promise<AuthSuccessResponse["data"]> {
  try {
    const response = await apiClient.post<AuthResponse>(getAuthApiUrl("REFRESH"), {
      refresh_token: refreshToken,
    });
    const data = response.data;
    if (!data.success) {
      throw new AuthError(data.message);
    }
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AuthError) throw error;
    throw new AuthError("Token refresh failed");
  }
}