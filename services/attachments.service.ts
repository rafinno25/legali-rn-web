import { getAccessToken } from "@/lib/auth";
import { getChatApiUrl } from "@/lib/api-config";

export type Attachment = { id: string; filename: string; mime_type?: string; size?: number; url?: string };

export const attachmentsService = {
  async list(conversationId: string) {
    const token = await getAccessToken();
    const url = getChatApiUrl("GET_ATTACHMENTS", { conversation_id: conversationId });
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Failed to load attachments: ${res.status}`);
    return (await res.json()) as Attachment[];
  },
  async upload(_conversationId: string, _file: { uri: string; name: string; type: string }) {
    // Placeholder: implement upload using multipart/form-data and native pickers
    // For now, we return a mocked attachment
    return { id: `${Date.now()}`, filename: _file.name, mime_type: _file.type, url: _file.uri } as Attachment;
  },
};