export type ConversationType = "general" | "litigation" | "drafter" | "red-flag";

export function getValidConversationType(type?: string | null): ConversationType {
  const valid: ConversationType[] = ["general", "litigation", "drafter", "red-flag"];
  if (type && valid.includes(type as ConversationType)) return type as ConversationType;
  return "general";
}