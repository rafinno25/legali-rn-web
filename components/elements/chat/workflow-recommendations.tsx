import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getChatApiUrl } from "@/lib/api-config";
import { getAccessToken, getUserId } from "@/lib/auth";
import { chatService, type WorkflowRecommendation } from "@/services/chat.service";

interface Props {
  recommendations: WorkflowRecommendation[];
  disableNavigation?: boolean;
  selectedTool?: string | null;
  conversationId?: string;
  onAddMessage?: (msg: { content: string; isUser: boolean; timestamp?: string }) => void;
  onRecommendationClick?: (recommendation: WorkflowRecommendation) => void;
}

export function WorkflowRecommendations({
  recommendations,
  onRecommendationClick,
  disableNavigation = false,
  selectedTool,
  onAddMessage,
  conversationId,
}: Props) {
  const router = useRouter();

  const getIconForRecommendation = (iconName: string) => {
    switch (iconName) {
      case "document":
        return "📄";
      case "analysis":
        return "🔍";
      case "lawyer":
        return "⚖️";
      case "funding":
        return "💰";
      case "timeline":
        return "📅";
      case "contract":
        return "📋";
      case "user":
        return "👤";
      default:
        return "🔧";
    }
  };

  const getConfidenceColors = (score: number) => {
    if (score >= 0.8) return { bg: "#DCFCE7", text: "#166534", border: "#86EFAC" }; // green
    if (score >= 0.5) return { bg: "#DBEAFE", text: "#1E40AF", border: "#93C5FD" }; // blue
    return { bg: "#FEF9C3", text: "#92400E", border: "#FDE68A" }; // yellow
  };

  const formatConfidenceScore = (score: number) => `${Math.round(score * 100)}%`;

  const handleRecommendationClick = async (recommendation: WorkflowRecommendation) => {
    // Special handling for document_builder action_type
    if (recommendation.action_type === "document_builder") {
      try {
        const convId = conversationId;
        if (!convId) {
          onAddMessage?.({
            content: "Error: No conversation ID found.",
            isUser: false,
            timestamp: new Date().toISOString(),
          });
          return;
        }

        const userId = getUserId();
        const token = await getAccessToken();
        if (!token) {
          onAddMessage?.({
            content: "Error: No access token found. Please login again.",
            isUser: false,
            timestamp: new Date().toISOString(),
          });
          return;
        }

        const endpoint = getChatApiUrl("DOCUMENT_RECOMMENDER");
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            conversation_id: convId,
            message: "Build Document",
          }),
        });

        if (response.ok) {
          const data = await response.json();

          onAddMessage?.({
            content: "Build Document",
            isUser: true,
            timestamp: new Date().toISOString(),
          });

          if (onAddMessage && data) {
            let responseContent = "";

            if (data.response) {
              responseContent += `**${data.response}**\n\n`;
            }
            if (data.phase) {
              responseContent += `**Phase:** ${data.phase}\n`;
            }
            if (data.recommendations && data.recommendations.length > 0) {
              responseContent += `\n**Recommended Documents:**\n`;
              data.recommendations.forEach((rec: any, index: number) => {
                responseContent += `${index + 1}. **${rec.document_name}** (${rec.document_type})\n`;
                responseContent += `   - Priority: ${rec.priority}\n`;
                responseContent += `   - Reason: ${rec.reason}\n`;
                if (rec.agent_class) {
                  responseContent += `   - Agent: ${rec.agent_class}\n`;
                }
                responseContent += `\n`;
              });
            }
            if (data.completed_documents && data.completed_documents.length > 0) {
              responseContent += `**Completed Documents:**\n`;
              data.completed_documents.forEach((doc: any, index: number) => {
                responseContent += `${index + 1}. **${doc.document_name}** (${doc.document_type})\n`;
                responseContent += `   - Completed: ${new Date(doc.completed_at).toLocaleString()}\n`;
                responseContent += `\n`;
              });
            }
            if (data.remaining_count !== undefined) {
              responseContent += `**Progress:** ${(data.completed_count || 0)}/${(data.completed_count || 0) + data.remaining_count} documents\n`;
            }
            if (data.is_workflow_complete) {
              responseContent += `\n✅ **Workflow Complete!**\n`;
            }
            if (data.error) {
              responseContent += `\n❌ **Error:** ${data.error}\n`;
            }
            if (!responseContent.trim()) {
              responseContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
            }

            onAddMessage({
              content: responseContent,
              isUser: false,
              timestamp: new Date().toISOString(),
            });
          }
        } else {
          onAddMessage?.({
            content: `Error: Failed to call document recommender - ${response.statusText}`,
            isUser: false,
            timestamp: new Date().toISOString(),
          });
        }
      } catch (error) {
        onAddMessage?.({
          content: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
          isUser: false,
          timestamp: new Date().toISOString(),
        });
      }
      return; // stop normal navigation
    }

    // Special handling for lawyer_marketplace action_type
    if (recommendation.action_type === "lawyer_marketplace") {
      try {
        const caseContext = (recommendation as any).case_context;
        const matterType = caseContext?.matter_type;
        const jurisdiction = caseContext?.jurisdiction;

        const query: Record<string, string> = {};
        if (matterType) query.matter_type = String(matterType);
        if (jurisdiction) query.jurisdiction = String(jurisdiction);

        // Prefer mobile marketplace route
        if (!disableNavigation) {
          router.push({ pathname: "/marketplace", params: query } as any);
        }
      } catch {
        // silent
      }
      return; // stop normal navigation
    }

    // Allow parent to handle agent/invoke
    if (recommendation.endpoint === "agent/invoke" && recommendation.action_type) {
      // Parent will process via onRecommendationClick
    }

    if (onRecommendationClick) {
      onRecommendationClick(recommendation);
    }

    if (disableNavigation) return;

    if (recommendation.frontend_route) {
      const params: Record<string, string> = {};
      const fp = recommendation.frontend_params || {};
      Object.entries(fp).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params[key] = String(value);
        }
      });
      if (recommendation.endpoint === "agent/invoke" && recommendation.action_type) {
        params.conversationType = recommendation.action_type;
      }
      router.push({ pathname: recommendation.frontend_route as any, params } as any);
    }
  };

  if (!recommendations || recommendations.length === 0) return null;

  const filteredRecommendations = selectedTool
    ? recommendations.filter(rec => {
        const toolId = chatService.getToolIdFromActionType(rec.action_type || null);
        return toolId === selectedTool;
      })
    : recommendations;

  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    const scoreA = typeof a.confidence_score === "number" ? a.confidence_score : 0;
    const scoreB = typeof b.confidence_score === "number" ? b.confidence_score : 0;
    return scoreB - scoreA;
  });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Recommendations</Text>
      {selectedTool ? (
        <Text style={styles.subheader}>Selected tool for your next message:</Text>
      ) : null}

      <View style={styles.list}>
        {sortedRecommendations.map(rec => {
          const colors = getConfidenceColors(typeof rec.confidence_score === "number" ? rec.confidence_score : 0);
          const key = `${rec.action_type}-${rec.title}-${rec.endpoint}`;
          return (
            <View key={key} style={[styles.card, { borderColor: rec.button_text ? "#87CEEB" : "#E5E7EB", backgroundColor: "#FFFFFF" }]}> 
              <View style={styles.cardRow}>
                <Text accessibilityRole="text" style={styles.icon}>{getIconForRecommendation((rec as any).icon)}</Text>
                <View style={styles.cardContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>{rec.title}</Text>
                    {rec.confidence_score !== undefined && (
                      <View style={[styles.badge, { backgroundColor: colors.bg, borderColor: colors.border }]}> 
                        <Text style={[styles.badgeText, { color: colors.text }]}>{formatConfidenceScore(rec.confidence_score as number)}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.desc}>{rec.description}</Text>
                  {rec.estimated_time ? (
                    <Text style={styles.eta}>⏱️ Estimated time: {rec.estimated_time}</Text>
                  ) : null}
                  {rec.button_text ? (
                    <TouchableOpacity
                      style={styles.primaryBtn}
                      onPress={() => handleRecommendationClick(rec)}
                      accessibilityRole="button"
                    >
                      <Text style={styles.primaryText}>{rec.button_text}</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  header: { fontSize: 12, fontWeight: "600", color: "#334155", marginBottom: 4 },
  subheader: { fontSize: 12, color: "#64748B", marginBottom: 8 },
  list: { gap: 8, width: "100%" },
  card: { borderWidth: 1, borderRadius: 12, padding: 12 },
  cardRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  icon: { fontSize: 18 },
  cardContent: { flex: 1, minWidth: 0 },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  title: { fontSize: 14, fontWeight: "600", color: "#111827", flexShrink: 1 },
  badge: { borderWidth: 1, borderRadius: 9999, paddingVertical: 4, paddingHorizontal: 8 },
  badgeText: { fontSize: 10, fontWeight: "600" },
  desc: { fontSize: 12, color: "#374151", marginTop: 4 },
  eta: { fontSize: 12, color: "#64748B", marginTop: 4 },
  primaryBtn: { marginTop: 8, backgroundColor: "#3B82F6", borderColor: "#2563EB", borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  primaryText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600", textAlign: "center" },
});