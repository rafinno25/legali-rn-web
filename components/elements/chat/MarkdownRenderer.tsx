import { Text } from "react-native";

interface Props {
  content: string;
  className?: string;
  isUser?: boolean;
  messageRole?: "user" | "assistant" | "system";
}

export function MarkdownRenderer({ content }: Props) {
  // Basic renderer for mobile; can be enhanced with a markdown library later
  return <Text style={{ fontSize: 14, lineHeight: 20 }}>{content}</Text>;
}