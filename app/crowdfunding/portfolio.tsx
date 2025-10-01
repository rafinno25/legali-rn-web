import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SoftSkyBackdrop } from '@/components/backgrounds/SoftSkyBackdrop';
import { PORTFOLIO_CASES, PORTFOLIO_SUMMARY } from '@/modules/crowdfunding/data/mockCases';

export default function PortfolioDashboard() {
  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      filing: 'Filing',
      discovery: 'Discovery',
      trial_prep: 'Trial Prep',
      trial: 'Trial',
      settlement: 'Settlement',
      collection: 'Collection',
    };
    return labels[stage] || stage;
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      filing: '#F59E0B',
      discovery: '#3B82F6',
      trial_prep: '#8B5CF6',
      trial: '#EF4444',
      settlement: '#10B981',
      collection: '#10B981',
    };
    return colors[stage] || '#6B7280';
  };

  return (
    <SoftSkyBackdrop>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Portfolio</Text>
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Portfolio Summary</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Ionicons name="wallet-outline" size={24} color="#2B8CAF" />
              <Text style={styles.statValue}>
                ${PORTFOLIO_SUMMARY.totalInvested.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Total Invested</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="trending-up-outline" size={24} color="#10B981" />
              <Text style={[styles.statValue, { color: '#10B981' }]}>
                {PORTFOLIO_SUMMARY.portfolioIRR.toFixed(1)}%
              </Text>
              <Text style={styles.statLabel}>Portfolio IRR</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.miniStatsRow}>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatValue}>{PORTFOLIO_SUMMARY.activeCases}</Text>
              <Text style={styles.miniStatLabel}>Active</Text>
            </View>
            <View style={styles.miniStatDivider} />
            <View style={styles.miniStat}>
              <Text style={styles.miniStatValue}>{PORTFOLIO_SUMMARY.casesInSettlement}</Text>
              <Text style={styles.miniStatLabel}>Settlement</Text>
            </View>
            <View style={styles.miniStatDivider} />
            <View style={styles.miniStat}>
              <Text style={styles.miniStatValue}>{PORTFOLIO_SUMMARY.completedCases}</Text>
              <Text style={styles.miniStatLabel}>Completed</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Investments</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {PORTFOLIO_CASES.map((case_) => (
            <TouchableOpacity
              key={case_.id}
              style={styles.caseCard}
              onPress={() => router.push(`/crowdfunding/portfolio/${case_.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.caseHeader}>
                <View style={styles.caseHeaderLeft}>
                  <Text style={styles.caseId}>{case_.caseId}</Text>
                  <View style={styles.caseTypeBadge}>
                    <Text style={styles.caseTypeText}>{case_.caseType}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.stageBadge,
                    { backgroundColor: case_.stage ? getStageColor(case_.stage) + '20' : '#E5E7EB' },
                  ]}
                >
                  <Text
                    style={[
                      styles.stageText,
                      { color: case_.stage ? getStageColor(case_.stage) : '#6B7280' },
                    ]}
                  >
                    {case_.stage ? getStageLabel(case_.stage) : 'N/A'}
                  </Text>
                </View>
              </View>

              <Text style={styles.caseTitle} numberOfLines={1}>
                {case_.title}
              </Text>

              {case_.stage && case_.stageProgress !== undefined && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <Text style={styles.progressPercent}>{case_.stageProgress}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${case_.stageProgress}%`,
                          backgroundColor: getStageColor(case_.stage),
                        },
                      ]}
                    />
                  </View>
                </View>
              )}

              <View style={styles.caseStats}>
                <View style={styles.caseStatItem}>
                  <Text style={styles.caseStatLabel}>Invested</Text>
                  <Text style={styles.caseStatValue}>
                    ${case_.investorData?.amountInvested.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.caseStatDivider} />
                <View style={styles.caseStatItem}>
                  <Text style={styles.caseStatLabel}>Projected ROI</Text>
                  <Text style={styles.caseStatValueGreen}>
                    {case_.financial.projectedROIMin}-{case_.financial.projectedROIMax}%
                  </Text>
                </View>
                <View style={styles.caseStatDivider} />
                <View style={styles.caseStatItem}>
                  <Text style={styles.caseStatLabel}>Updates</Text>
                  <Text style={styles.caseStatValue}>
                    {case_.investorData?.updates.length || 0}
                  </Text>
                </View>
              </View>

              {case_.investorData?.updates[0] && (
                <View style={styles.latestUpdate}>
                  <Ionicons name="information-circle" size={16} color="#2B8CAF" />
                  <Text style={styles.updateText} numberOfLines={1}>
                    {case_.investorData.updates[0].title}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => router.push('/crowdfunding')}
          activeOpacity={0.8}
        >
          <Ionicons name="search-outline" size={20} color="#2B8CAF" />
          <Text style={styles.browseButtonText}>Browse More Cases</Text>
        </TouchableOpacity>
      </ScrollView>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  miniStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniStat: {
    flex: 1,
    alignItems: 'center',
  },
  miniStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
  },
  miniStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  miniStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B8CAF',
  },
  caseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  caseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caseId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  caseTypeBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  caseTypeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0369A1',
  },
  stageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  stageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  caseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  caseStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  caseStatDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E5E7EB',
  },
  caseStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  caseStatValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  caseStatValueGreen: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  latestUpdate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E0F2FE',
    padding: 10,
    borderRadius: 8,
  },
  updateText: {
    flex: 1,
    fontSize: 13,
    color: '#0C4A6E',
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2B8CAF',
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B8CAF',
  },
});
