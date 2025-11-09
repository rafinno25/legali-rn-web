export interface PromptSuggestion {
  id: string;
  method: string;
  path: string;
  description: string;
  content?: string; // Full prompt content to send when clicked
}

export const generalPromptSuggestions: PromptSuggestion[] = [
  { id: "1", method: "POST", path: "/chat/general", description: "Review my employment contract" },
  { id: "2", method: "POST", path: "/chat/general", description: "Analyze this lease agreement" },
  { id: "3", method: "POST", path: "/chat/general", description: "Check for legal red flags" },
  { id: "4", method: "POST", path: "/chat/general", description: "Draft a non-disclosure agreement" },
  { id: "5", method: "POST", path: "/chat/general", description: "Explain my rights as a tenant" },
  { id: "6", method: "POST", path: "/chat/general", description: "Help with small claims court" },
];
