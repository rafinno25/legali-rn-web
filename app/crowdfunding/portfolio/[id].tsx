import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SoftSkyBackdrop } from '@/components/backgrounds/SoftSkyBackdrop';
import { findCaseById } from '@/modules/crowdfunding/data/mockCases';

export default function PortfolioCaseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const case_ = findCaseById(id);

  if (!case_ || !case_.investorData) {
    return (
      <SoftSkyBackdrop>
        <View style={styles.container}>
          <Text style={styles.errorText}>Investment not found</Text>
        </View>
      </SoftSkyBackdrop>
    );
  }

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

  const getUpdateIcon = (type: string) => {
    const icons: Record<string, string> = {
      milestone: 'checkmark-circle',
      court_ruling: 'gavel',
      risk_change: 'trending-up',
      funding_request: 'cash',
      settlement_offer: 'document-text',
    };
    return icons[type] || 'information-circle';
  };

  const getUpdateColor = (type: string) => {
    const colors: Record<string, string> = {
      milestone: '#10B981',
      court_ruling: '#8B5CF6',
      risk_change: '#F59E0B',
      funding_request: '#2B8CAF',
      settlement_offer: '#10B981',
    };
    return colors[type] || '#6B7280';
  };

  const totalDeployed = case_.investorData.stages.reduce(
    (sum, stage) => sum + stage.fundingDeployed,
    0
  );
  const totalReserved = case_.investorData.stages.reduce(
    (sum, stage) => sum + stage.fundingReserved,
    0
  );

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
          <Text style={styles.headerTitle}>Investment Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.caseHeader}>
          <Text style={styles.caseId}>{case_.caseId}</Text>
          <Text style={styles.caseTitle}>{case_.title}</Text>
          <Text style={styles.caseSubtitle}>
            {case_.plaintiff} v. {case_.defendant}
          </Text>
        </View>

        <View style={styles.investmentCard}>
          <Text style={styles.cardTitle}>Your Investment</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                ${case_.investorData.amountInvested.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Amount Invested</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: '#10B981' }]}>
                {case_.investorData.currentROI.toFixed(1)}%
              </Text>
              <Text style={styles.statLabel}>Current ROI</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.fundingBreakdown}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Funding Deployed</Text>
              <Text style={styles.breakdownValue}>${totalDeployed.toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Funding Reserved</Text>
              <Text style={styles.breakdownValue}>${totalReserved.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stage Progress</Text>
          <View style={styles.card}>
            {case_.investorData.stages.map((stage, index) => (
              <View key={stage.stage}>
                {index > 0 && <View style={styles.stageConnector} />}
                <View style={styles.stageRow}>
                  <View
                    style={[
                      styles.stageIndicator,
                      stage.isComplete
                        ? styles.stageIndicatorComplete
                        : stage.progress > 0
                          ? styles.stageIndicatorActive
                          : styles.stageIndicatorPending,
                    ]}
                  >
                    {stage.isComplete ? (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    ) : stage.progress > 0 ? (
                      <View style={styles.activeDot} />
                    ) : (
                      <View style={styles.pendingDot} />
                    )}
                  </View>
                  <View style={styles.stageContent}>
                    <View style={styles.stageHeader}>
                      <Text style={styles.stageName}>{getStageLabel(stage.stage)}</Text>
                      {stage.progress > 0 && (
                        <Text style={styles.stageProgress}>{stage.progress}%</Text>
                      )}
                    </View>
                    <View style={styles.stageFunding}>
                      <View style={styles.fundingItem}>
                        <Text style={styles.fundingLabel}>Deployed</Text>
                        <Text style={styles.fundingValue}>
                          ${stage.fundingDeployed.toLocaleString()}
                        </Text>
                      </View>
                      {stage.fundingReserved > 0 && (
                        <View style={styles.fundingItem}>
                          <Text style={styles.fundingLabel}>Reserved</Text>
                          <Text style={styles.fundingValue}>
                            ${stage.fundingReserved.toLocaleString()}
                          </Text>
                        </View>
                      )}
                    </View>
                    {stage.progress > 0 && !stage.isComplete && (
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: `${stage.progress}%`,
                            },
                          ]}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          {case_.investorData.updates.map((update) => (
            <View key={update.id} style={styles.updateCard}>
              <View style={styles.updateHeader}>
                <View
                  style={[
                    styles.updateIcon,
                    { backgroundColor: getUpdateColor(update.type) + '20' },
                  ]}
                >
                  <Ionicons
                    name={getUpdateIcon(update.type) as any}
                    size={20}
                    color={getUpdateColor(update.type)}
                  />
                </View>
                <View style={styles.updateHeaderText}>
                  <Text style={styles.updateTitle}>{update.title}</Text>
                  <Text style={styles.updateDate}>{update.date}</Text>
                </View>
              </View>
              <Text style={styles.updateDescription}>{update.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Case Information</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Jurisdiction</Text>
              <Text style={styles.infoValue}>{case_.jurisdiction}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Attorney</Text>
              <Text style={styles.infoValue}>
                {case_.lawyerName} • {case_.lawyerRating}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Investment Date</Text>
              <Text style={styles.infoValue}>{case_.investorData.dateInvested}</Text>
            </View>
            {case_.filedDate && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Filed Date</Text>
                  <Text style={styles.infoValue}>{case_.filedDate}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.contactButton} activeOpacity={0.8}>
            <Ionicons name="chatbubble-outline" size={20} color="#2B8CAF" />
            <Text style={styles.contactButtonText}>Contact Attorney</Text>
          </TouchableOpacity>
        </View>
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
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 100,
  },
  caseHeader: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  caseId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B8CAF',
    marginBottom: 8,
  },
  caseTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  caseSubtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  investmentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
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
  fundingBreakdown: {
    gap: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stageConnector: {
    width: 2,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginLeft: 15,
    marginVertical: 4,
  },
  stageIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageIndicatorComplete: {
    backgroundColor: '#10B981',
  },
  stageIndicatorActive: {
    backgroundColor: '#2B8CAF',
  },
  stageIndicatorPending: {
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  pendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  stageContent: {
    flex: 1,
    paddingBottom: 8,
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stageName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  stageProgress: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2B8CAF',
  },
  stageFunding: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  fundingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fundingLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  fundingValue: {
    fontSize: 12,
    fontWeight: '600',
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
    backgroundColor: '#2B8CAF',
    borderRadius: 3,
  },
  updateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  updateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateHeaderText: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  updateDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  updateDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  actionContainer: {
    paddingHorizontal: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2B8CAF',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B8CAF',
  },
});
