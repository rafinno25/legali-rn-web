/**
 * Centralized API configuration for Expo mobile app
 * Base URL comes from env: set `EXPO_PUBLIC_API_URL`
 */

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || "https://api.legali.io",
  TIMEOUT: 2 * 60 * 1000, // 2 minutes

  AUTH: {
    LOGIN: "/api/auth/signin",
    LOGOUT: "/api/auth/signout",
    REFRESH: "/api/auth/refresh",
    PROFILE: "/api/profile/me",
  },

  CHAT: {
    SEND_MESSAGE: "/core/agent/invoke",
    GET_CONVERSATIONS: "/core/conversation/{conversation_id}/messages",
    GET_CHAT_HISTORY: "/core/conversation/conversations",
    DELETE_CONVERSATION: "/core/conversation/{conversation_id}",
    DOCUMENT_RECOMMENDER: "/core/document-recommender/chat",
    GET_ATTACHMENTS: "/core/conversation/attachments",
  },
} as const;

export type AuthEndpoint = keyof typeof API_CONFIG.AUTH;
export type ChatEndpoint = keyof typeof API_CONFIG.CHAT;

export const getApiUrl = (endpoint: string): string => `${API_CONFIG.BASE_URL}${endpoint}`;

export const getAuthApiUrl = (endpoint: AuthEndpoint): string => getApiUrl(API_CONFIG.AUTH[endpoint]);

export const getChatApiUrl = (
  endpoint: ChatEndpoint,
  params?: { user_id?: string; conversation_id?: string }
): string => {
  let url: string = API_CONFIG.CHAT[endpoint];
  if (params?.user_id) url = url.replace("{user_id}", params.user_id);
  if (params?.conversation_id) url = url.replace("{conversation_id}", params.conversation_id);
  return getApiUrl(url);
};