import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LitigationHeader } from "./LitigationHeader";

interface WorkspaceItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    iconColor: string;
}

const WORKSPACE_ITEMS: WorkspaceItem[] = [
    {
        id: "1",
        title: "Case Timeline",
        description: "47 events organized",
        icon: "bar-chart-outline",
        iconColor: "#4F46E5" // indigo-600
    },
    {
        id: "2",
        title: "Legal Dossier",
        description: "24 documents secured",
        icon: "folder-outline",
        iconColor: "#2563EB" // blue-600
    },
    {
        id: "3",
        title: "Draft Documents",
        description: "3 ready to file",
        icon: "document-text-outline",
        iconColor: "#9333EA" // purple-600
    },
    {
        id: "4",
        title: "Collaborators",
        description: "2 team members",
        icon: "people-outline",
        iconColor: "#DB2777" // pink-600
    }
];

export function LitigationCaseBuilder() {
    const router = useRouter();

    const handleWorkspaceItemPress = (item: WorkspaceItem) => {
        Alert.alert("Navigate", `Opening ${item.title}`);
    };

    const handleBuildDocument = () => {
        router.push("/(litigation)/litigation/document-builder");
    };

    const handleBackPress = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
          <LitigationHeader 
                title="Litigation Case Builder" 
                onBackPress={handleBackPress}
            />
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section with Gradient Background */}
                <LinearGradient
                    colors={['#4F46E5', '#9333EA', '#4F46E5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerSection}
                >
                    <View style={styles.headerContent}>
                        {/* Profile Section */}
                        <View style={styles.profileSection}>
                            <View style={styles.profileIcon}>
                                <View style={styles.profileInnerIcon} />
                            </View>
                            <View style={styles.profileText}>
                                <Text style={styles.welcomeText}>Welcome back</Text>
                                <Text style={styles.userName}>Sarah Johnson</Text>
                            </View>
                        </View>

                        {/* Menu Button */}
                        <TouchableOpacity style={styles.menuButton}>
                            <View style={styles.menuDots}>
                                <View style={styles.menuDot} />
                                <View style={styles.menuDot} />
                                <View style={styles.menuDot} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Case Information Card */}
                    <View style={styles.caseInfoCard}>
                        <View style={styles.caseInfoHeader}>
                            <View>
                                <Text style={styles.caseTitle}>Johnson v. Smith</Text>
                                <Text style={styles.caseType}>Small Claims • Breach of Contract</Text>
                            </View>
                            <View style={styles.activeBadge}>
                                <Text style={styles.activeBadgeText}>Active</Text>
                            </View>
                        </View>

                        <View style={styles.caseFooter}>
                            <View style={styles.caseInfoLeft}>
                                <Ionicons name="calendar-outline" size={16} color="rgba(255, 255, 255, 0.9)" />
                                <Text style={styles.caseInfoText}>Due: Oct 15, 2025</Text>
                            </View>
                            <View style={styles.caseInfoRight}>
                                <Ionicons name="bar-chart-outline" size={16} color="rgba(255, 255, 255, 0.9)" />
                                <Text style={styles.caseInfoText}>68% Complete</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Build Court Document Action Card */}
                <View style={styles.actionCardContainer}>
                    <LinearGradient
                        colors={['#10b981', '#0d9488']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.actionCard}
                    >
                        <TouchableOpacity style={styles.actionCardTouchable} onPress={handleBuildDocument}>
                            <View style={styles.actionCardContent}>
                                <View style={styles.actionCardLeft}>
                                    <View style={styles.actionIcon}>
                                        <Ionicons name="sparkles" size={28} color="white" />
                                    </View>
                                    <View style={styles.actionText}>
                                        <Text style={styles.actionTitle}>Build Court Document</Text>
                                        <Text style={styles.actionSubtitle}>AI-powered filing in minutes</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                {/* Summary Statistics */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Ionicons name="document-outline" size={20} color="#2563EB" />
                        <Text style={styles.statNumber}>24</Text>
                        <Text style={styles.statLabel}>Documents</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="time-outline" size={20} color="#9333EA" />
                        <Text style={styles.statNumber}>47</Text>
                        <Text style={styles.statLabel}>Events</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="people-outline" size={20} color="#DB2777" />
                        <Text style={styles.statNumber}>2</Text>
                        <Text style={styles.statLabel}>Parties</Text>
                    </View>
                </View>

                {/* Your Workspace Section */}
                <View style={styles.workspaceContainer}>
                    <View style={styles.workspaceSection}>
                        <View style={styles.workspaceHeader}>
                            <Ionicons name="folder-outline" size={20} color="#64748B" />
                            <Text style={styles.workspaceTitle}>Your Workspace</Text>
                        </View>

                        <View style={styles.workspaceList}>
                            {WORKSPACE_ITEMS.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.workspaceItem}
                                    onPress={() => handleWorkspaceItemPress(item)}
                                >
                                    <View style={styles.workspaceItemLeft}>
                                        <View style={[styles.workspaceIcon, { backgroundColor: `${item.iconColor}10` }]}>
                                            <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
                                        </View>
                                        <View style={styles.workspaceText}>
                                            <Text style={styles.workspaceItemTitle}>{item.title}</Text>
                                            <Text style={styles.workspaceItemDescription}>{item.description}</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
},
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Header Section with Gradient Background
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    width: '100%',
    height: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    maxWidth: '80%',
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginRight: 12,
  },
  profileInnerIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  profileText: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    marginLeft: 12,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '400',
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  menuButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginLeft: 8,
  },
  menuDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuDot: {
    width: 8,
    height: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 2,
  },
  // Case Information Card
  caseInfoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  caseInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  caseTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  caseType: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '400',
  },
  activeBadge: {
    backgroundColor: 'rgba(251, 191, 36, 0.9)', // amber-400/90
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeBadgeText: {
    color: '#92400E', // amber-900
    fontSize: 12,
    fontWeight: '600',
  },
  caseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caseInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caseInfoRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caseInfoText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '400',
  },
  // Action Card
  actionCardContainer: {
    paddingHorizontal: 20,
    marginTop: -24,
    marginBottom: 16,
  },
  actionCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionCardTouchable: {
    padding: 20,
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  actionSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '400',
  },
  // Statistics
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
    width: '100%',
  },
  statCard: {
    backgroundColor: '#F8FAFC', // slate-50
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#F1F5F9', // slate-100
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A', // slate-900
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748B', // slate-600
  },
  // Workspace Container
  workspaceContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  // Workspace Section
  workspaceSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '100%',
  },
  workspaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  workspaceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A', // slate-900
  },
  workspaceList: {
    gap: 10,
  },
  workspaceItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0', // slate-200
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workspaceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  workspaceIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workspaceText: {
    flex: 1,
  },
  workspaceItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A', // slate-900
    marginBottom: 2,
  },
  workspaceItemDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748B', // slate-500
  },
});
