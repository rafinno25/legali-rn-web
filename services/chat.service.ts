import { apiClient } from "@/lib/api-client";
import { getChatApiUrl } from "@/lib/api-config";
import { getAccessToken, getUserId } from "@/lib/auth";

export interface ServerAttachment {
  id: string;
  message_id: string;
  role: string;
  mime_type: string;
  url: string;
  file_name: string;
  extracted_text: string | null;
  created_at: string;
  conversation_id: string;
  user_id: string;
  session_name: string;
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  conversation_id?: string;
  role?: "user" | "assistant" | "system";
  attachments?: ServerAttachment[];
  report_file_path?: string;
}

export interface SendMessageRequest {
  user_input: string;
  conversation_id?: string | undefined;
  conversation_type?: string | undefined;
  file?: File | undefined;
  files?: File[] | undefined;
}

// Minimal API message type (aligns with web service expectations)
interface ApiMessage {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  created_at?: string;
  timestamp?: string;
  conversation_id?: string;
  attachments?: ServerAttachment[];
  report_file_path?: string;
  workflow_recommendations?: unknown;
}

interface CoreConversationMessagesResponse {
  success: boolean;
  message: string;
  data?: { messages: any[] };
}


export interface WorkflowRecommendation {
  action_type: string;
  priority: number;
  title: string;
  description: string;
  endpoint: string;
  method: string;
  parameters: Record<string, unknown>;
  prerequisites: unknown[];
  estimated_time: string;
  case_context: {
    complexity_level: string;
    urgency_level: string;
    case_type: string;
    jurisdiction: string;
    risk_factors: string[];
  };
  confidence_score: number;
  frontend_route: string;
  timestamp?: Date;
  frontend_params: Record<string, any>;
  button_text: string;
  icon: string;
}


export interface CaseAnalysis {
  id: string;
  conversation_id: string;
  user_id: string;
  analysis_type: string;
  case_summary: string;
  complexity_score: number;
  complexity_level: string;
  jurisdiction: string;
  case_type: string;
  urgency_level: string;
  risk_factors: string[];
  recommended_actions: any[];
  has_contracts: boolean;
  has_litigation: boolean;
  requires_specialist: boolean;
  estimated_value: number | null;
  has_mediation_clause: boolean;
  is_high_value: boolean;
  analysis_data: Record<string, any>;
  confidence_score: number;
  created_at: string;
}

// New response format from /core/agent/invoke
export interface CoreAgentInvokeResponse {
  conversation_id: string;
  output: string;
  workflow_recommendations: WorkflowRecommendation[] | null;
  related_recommendations: Record<string, any> | null;
  case_analysis: CaseAnalysis | null;
  active_agent: any | null;
  workflow_paused: unknown | null;
  matter_type: unknown | null;
  facts: unknown | null;
  jurisdiction: unknown | null;
  checklist_missing: unknown | null;
  dossier_complete: unknown | null;
  dossier_sections: unknown | null;
  current_question: unknown | null;
  draft_ready: unknown | null;
  metadata: Record<string, unknown> | null;
}

interface SendMessageResponse {
  success: boolean;
  message: string;
  data?: {
    conversation_id?: string;
    output?: string;
    document_recommendations?: Record<string, any>;
    redflag_recommendation?: Record<string, any>;
    workflow_recommendations?: unknown[];
    case_analysis?: Record<string, any>;
    next_suggested_action?: Record<string, any>;
    related_recommendations?: Record<string, any>;
    active_agent?: any;
    metadata?: Record<string, any>;
  };
    meta: Record<string, any>;
  error: any;
}

// Axios-style error
interface AxiosErrorResponse {
  response?: { status?: number; data?: any };
  message?: string;
}

// Type for chat history response
interface Conversations {
  conversations: ChatHistoryItem[];
}
interface ChatHistoryItem {
  id: string;
  user_id: string;
  session_name: string;
  summary: string | null;
  created_at: string;
}

// Align with web: allow array directly
interface ChatHistoryResponse {
  success: boolean;
  data?: ChatHistoryItem[];
  message?: string;
  error?: string;
}

// Helper: debug FormData (noop in production)
export const debugFormData = (_formData: FormData): void => {
  // Intentionally empty (can add console logs in development if needed)
};

// Validate request similar to web service
const validateSendMessageRequest = (request: SendMessageRequest): string[] => {
  const errors: string[] = [];

  const trimmed = (request.user_input ?? "").trim();
  const hasFiles = !!request.file || (!!request.files && request.files.length > 0);
  if (!trimmed && !hasFiles) {
    errors.push("user_input is required when no files are provided");
  }

  if (request.user_input && request.user_input.length > 10000) {
    errors.push("user_input is too long (max 10000 characters)");
  }

  if (request.file && typeof File !== "undefined" && !(request.file instanceof File)) {
    errors.push("file must be a File object");
  }

  if (request.file && (request as any).file?.size && (request as any).file.size > 5 * 1024 * 1024) {
    errors.push("file size must be less than 5MB");
  }

  return errors;
};

export const chatService = {
  convertApiMessageToMessage(apiMessage: any): Message {
    const timestampString = apiMessage.timestamp || apiMessage.created_at || new Date().toISOString();
    const convertedDate = new Date(timestampString);
    const base: Message =  {
      id: apiMessage.id,
      content: apiMessage.content,
      isUser: apiMessage.role === "user",
      timestamp: convertedDate,
      conversation_id: apiMessage.conversation_id,
      role: apiMessage.role,
      attachments: apiMessage.attachments?.length ? apiMessage.attachments : undefined,
      report_file_path: apiMessage.report_file_path,
    };

    if (apiMessage.workflow_recommendations) {
      (base as unknown as { workflow_recommendations?: unknown }).workflow_recommendations =
        apiMessage.workflow_recommendations;
    }

    return base
  },

  async getChatConversation(chatId: string): Promise<{ success: boolean; data?: Message[]; error?: string }> {
    try {
      if (!chatId || chatId.trim() === "") {
        return { success: false, error: "Invalid chat ID provided" };
      }
      const url = getChatApiUrl("GET_CONVERSATIONS", { conversation_id: chatId });
      const token = await getAccessToken();
      const response = await apiClient.get<CoreConversationMessagesResponse>(url, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = response.data;
      if (data.success && data.data?.messages) {
        const messages = data.data.messages.map((m: unknown) => chatService.convertApiMessageToMessage(m as ApiMessage));
        return { success: true, data: messages };
      }
      return { success: false, error: data.message || "Failed to fetch chat conversation" };
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse & { code?: string };
      if (axiosError?.response?.status === 401) {
        return { success: false, error: "Authentication required. Please login again." };
      }
      if (axiosError?.response?.status === 404) {
        return { success: false, error: "Chat conversation not found." };
      }
      if (axiosError?.response?.status === 500) {
        return { success: false, error: "Server error. Please try again later." };
      }
      if (
        axiosError?.code === "NETWORK_ERROR" ||
        (error && typeof error === "object" && "message" in (error as any) && String((error as any).message).includes("Network Error"))
      ) {
        return { success: false, error: "Network error. Please check your connection." };
      }
      return { success: false, error: axiosError.message || "Failed to fetch chat conversation" };
    }
  },

  async getChatHistory(): Promise<ChatHistoryResponse> {
    try {
      const url = getChatApiUrl("GET_CHAT_HISTORY");
      const token = await getAccessToken();
      const response = await apiClient.get(url, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }) as {
        data: ChatHistoryItem[] | Conversations | ChatHistoryResponse;
      };
      const data = response.data;

      // Handle different response formats
      if (data) {
        // Case 1: Direct array response (when cached/304)
        if (Array.isArray(data)) {
          return {
            success: true,
            data: data,
          };
        }

        // Case 2: Response with conversations array
        if (data && typeof data === "object" && "conversations" in (data as any)) {
          const conversationsData = data as Conversations;
          return {
            success: true,
            data: conversationsData.conversations,
          };
        }

        // Case 3: Wrapped response with success field
        const wrappedData = data as ChatHistoryResponse;
        if (wrappedData.success && wrappedData.data) {
          const result: ChatHistoryResponse = {
            success: true,
            data: wrappedData.data,
          };
          if (wrappedData.message) {
            result.message = wrappedData.message;
          }
          return result;
        }

        // Case 4: Error response
        if ((wrappedData as any).success === false) {
          const errorResult: ChatHistoryResponse = {
            success: false,
          };
          if ((wrappedData as any).error) {
            errorResult.error = (wrappedData as any).error;
          } else {
            errorResult.error = "Failed to fetch chat history";
          }
          return errorResult;
        }
      }

      return {
        success: false,
        error: "Unexpected response format",
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse;
      return {
        success: false,
        error:
          axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to fetch chat history",
      };
    }
  },

  async sendMessage(req: SendMessageRequest): Promise<{ success: boolean; data?: SendMessageResponse["data"]; error?: string }> {
    try {
      // Validate request (align with web)
      const validationErrors = validateSendMessageRequest(req);
      if (validationErrors.length > 0) {
        return { success: false, error: `Validation failed: ${validationErrors.join(", ")}` };
      }

      const url = getChatApiUrl("SEND_MESSAGE");
      const formData = new FormData();

      // Allow empty message when files provided; otherwise use trimmed
      const trimmed = (req.user_input ?? "").trim();
      const hasFiles = !!req.file || (!!req.files && req.files.length > 0);
      const userInput = trimmed || (hasFiles ? "" : "");
      formData.append("user_input", userInput);

      if (req.conversation_id) {
        formData.append("conversation_id", req.conversation_id);
      }
      if (req.conversation_type && req.conversation_type !== "general") {
        formData.append("conversation_type", req.conversation_type);
      }

      // Attach files - append under `file` repeatedly for multiple files
      if (req.file) {
        formData.append("file", req.file as any);
      }
      if (req.files && req.files.length > 0) {
        req.files.forEach(f => formData.append("file", f as any));
      }

      // Explicitly set non-streaming
      formData.append("stream", "false");

      debugFormData(formData);

      const response = await apiClient.post<CoreAgentInvokeResponse>(url, formData, {
        headers: {
          ...({ "Content-Type": "multipart/form-data" }),
        },
        timeout: 300000,
      });

      const transformedResponse: SendMessageResponse = {
        success: true,
        message: "Message sent successfully",
        data: {
          conversation_id: response.data?.conversation_id || "",
          output: response.data.output,
          document_recommendations: {},
          redflag_recommendation: {},
          workflow_recommendations: response.data.workflow_recommendations || [],
          case_analysis: response.data.case_analysis || ({} as any),
          next_suggested_action: response.data.workflow_recommendations?.[0] || ({} as any),
          related_recommendations: response.data.related_recommendations || {},
          active_agent: response.data.active_agent,
          metadata: response.data.metadata || {},
        },
        meta: {},
        error: null,
      };

      return transformedResponse;
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse;
      if (axiosError?.response?.status === 400) {
        const msg = axiosError.response?.data?.message || axiosError.response?.data?.error || "Bad Request";
        return { success: false, error: `Invalid request: ${msg}` };
      }
      if (axiosError?.response?.status === 401) {
        return { success: false, error: "Authentication required. Please log in again." };
      }
      if (axiosError?.response?.status === 413) {
        return { success: false, error: "File too large. Please choose a file smaller than 5MB." };
      }
      if (axiosError?.response?.status && axiosError.response.status >= 500) {
        return { success: false, error: "Server error. Please try again later." };
      }
      return { success: false, error: axiosError.message || "Failed to send message" };
    }
  },

  async deleteChat(conversationId: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!conversationId || conversationId.trim() === "") {
        return { success: false, error: "Invalid chat ID provided" };
      }

      const url = getChatApiUrl("DELETE_CONVERSATION", { conversation_id: conversationId });
      const token = await getAccessToken();
      const response = await apiClient.delete<{ success: boolean; message: string }>(url, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = response.data;
      if (data.success) {
        return { success: true };
      }
      return { success: false, error: data.message || "Failed to delete chat" };
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse;
      if (axiosError?.response?.status === 401) {
        return { success: false, error: "Authentication required. Please login again." };
      }
      if (axiosError?.response?.status === 404) {
        return { success: false, error: "Chat conversation not found." };
      }
      return { success: false, error: axiosError.message || "Failed to delete chat" };
    }
  },

  // Helper: map URL tool parameter to conversation_type
  getConversationTypeFromTool: (toolParam: string | null): string | undefined => {
    switch (toolParam) {
      case "red-flag-analysis":
        return "red_flag_analysis";
      case "legal-template":
        return "document_builder";
      case "legal-dossier-builder":
        return "case_builder";
      case "case-timeline-builder":
        return "case_builder";
      case "litigation-funding-investors":
        return "litigation_builder";
      case "lawyers":
        return "support";
      // Legacy
      case "redflag":
        return "red_flag_analysis";
      case "template":
        return "document_builder";
      case "dossier":
        return "case_builder";
      case "timeline":
        return "case_builder";
      case "funding-investors":
      case "funding-litigants":
        return "litigation_builder";
      default:
        return undefined;
    }
  },

  // Helper: validate supported action_type
  isSupportedActionType: (actionType: string | null): boolean => {
    const supported = [
      "red_flag_analysis",
      "litigation_builder",
      "document_builder",
      "case_builder",
      "contract_review",
      "mediation_support",
      "high_value_dispute",
      "support",
    ];
    return actionType ? supported.includes(actionType) : false;
  },

  // Helper: reverse mapping from action_type to tool id
  getToolIdFromActionType: (actionType: string | null): string | null => {
    switch (actionType) {
      case "red_flag_analysis":
        return "red-flag-analysis";
      case "document_builder":
        return "legal-template";
      case "case_builder":
        return "legal-dossier-builder";
      case "litigation_builder":
        return "litigation-funding-investors";
      case "contract_review":
        return "red-flag-analysis";
      case "mediation_support":
        return "lawyers";
      case "high_value_dispute":
        return "litigation-funding-investors";
      case "support":
        return "lawyers";
      default:
        return null;
    }
  },

  // Optional: fetch a page from chat history (frontend pagination)
  async getChatHistoryPage(offset: number, limit: number): Promise<{ success: boolean; data?: ChatHistoryItem[]; error?: string }> {
    try {
      const url = getChatApiUrl("GET_CHAT_HISTORY", { user_id: await getUserId() });
      const response = await apiClient.get<ChatHistoryResponse>(url);

      if ((response as any).data && Array.isArray((response as any).data)) {
        const all = (response as any).data as ChatHistoryItem[];
        const paginated = all.slice(offset, offset + limit);
        return { success: true, data: paginated };
      }

      return { success: false, error: "Failed to fetch chat history page" };
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse;
      return {
        success: false,
        error: axiosError?.response?.data?.message || axiosError.message || "Failed to fetch chat history page",
      };
    }
  },
};