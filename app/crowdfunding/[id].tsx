import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SoftSkyBackdrop } from '@/components/backgrounds/SoftSkyBackdrop';
import { findCaseById } from '@/modules/crowdfunding/data/mockCases';

export default function CaseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const case_ = findCaseById(id);

  if (!case_) {
    return (
      <SoftSkyBackdrop>
        <View style={styles.container}>
          <Text style={styles.errorText}>Case not found</Text>
        </View>
      </SoftSkyBackdrop>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getEvidenceIcon = (strength: string | undefined) => {
    if (!strength) return 'help-circle-outline';
    if (strength === 'strong' || strength === 'complete') return 'checkmark-circle';
    if (strength === 'moderate' || strength === 'partial') return 'alert-circle';
    return 'close-circle';
  };

  const getEvidenceColor = (strength: string | undefined) => {
    if (!strength) return '#9CA3AF';
    if (strength === 'strong' || strength === 'complete') return '#10B981';
    if (strength === 'moderate' || strength === 'partial') return '#F59E0B';
    return '#EF4444';
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
          <Text style={styles.headerTitle}>Case Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.caseHeader}>
          <View style={styles.caseIdRow}>
            <Text style={styles.caseId}>{case_.caseId}</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#10B981' + '20' }]}>
              <Text style={[styles.statusText, { color: '#10B981' }]}>Available</Text>
            </View>
          </View>
          <Text style={styles.caseTitle}>{case_.title}</Text>
          <Text style={styles.caseSubtitle}>
            {case_.plaintiff} v. {case_.defendant}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Case Summary</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Ionicons name="document-text-outline" size={20} color="#6B7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Claim Type</Text>
                <Text style={styles.infoValue}>{case_.claimType}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color="#6B7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Jurisdiction</Text>
                <Text style={styles.infoValue}>{case_.jurisdiction}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="briefcase-outline" size={20} color="#6B7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Attorney</Text>
                <Text style={styles.infoValue}>
                  {case_.lawyerName} • {case_.lawyerRating} • {case_.lawyerWinRate}% win rate
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.disclaimerCard}>
          <Ionicons name="warning-outline" size={20} color="#F59E0B" />
          <Text style={styles.disclaimerText}>
            All case assessments, risk scores, and financial projections are preliminary estimates.
            Litigation funding carries significant risk of total loss. Conduct independent due
            diligence.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Projections</Text>
          <View style={styles.card}>
            <View style={styles.financialGrid}>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Funding Needed</Text>
                <Text style={styles.financialValue}>
                  ${case_.financial.fundingNeeded.toLocaleString()}
                </Text>
              </View>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Damages Sought</Text>
                <Text style={styles.financialValue}>
                  ${case_.financial.damagesSought.toLocaleString()}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.financialGrid}>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Settlement Range</Text>
                <Text style={styles.financialValueGreen}>
                  ${case_.financial.estimatedSettlementMin.toLocaleString()} -
                  {'\n'}${case_.financial.estimatedSettlementMax.toLocaleString()}
                </Text>
              </View>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Projected ROI</Text>
                <Text style={styles.financialValueGreen}>
                  {case_.financial.projectedROIMin}-{case_.financial.projectedROIMax}%
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.financialGrid}>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Platform Fee</Text>
                <Text style={styles.financialValue}>{case_.financial.platformFee}%</Text>
              </View>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Timeline</Text>
                <Text style={styles.financialValue}>{case_.financial.estimatedTimeline}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Assessment</Text>
          <View style={styles.card}>
            <View style={styles.riskHeader}>
              <View>
                <Text style={styles.riskLabel}>AI Risk Score</Text>
                <View style={styles.riskScoreRow}>
                  <Text
                    style={[styles.riskScore, { color: getRiskColor(case_.riskLevel) }]}
                  >
                    {case_.riskScore.toFixed(1)}
                  </Text>
                  <Text style={styles.riskScoreMax}>/10</Text>
                </View>
              </View>
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getRiskColor(case_.riskLevel) + '20' },
                ]}
              >
                <Text style={[styles.riskBadgeText, { color: getRiskColor(case_.riskLevel) }]}>
                  {case_.riskLevel.charAt(0).toUpperCase() + case_.riskLevel.slice(1)} Risk
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.assessmentText}>{case_.aiRiskAssessment}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evidence Strength</Text>
          <View style={styles.card}>
            {case_.evidenceStrength.emails && (
              <>
                <View style={styles.evidenceRow}>
                  <Ionicons
                    name={getEvidenceIcon(case_.evidenceStrength.emails)}
                    size={24}
                    color={getEvidenceColor(case_.evidenceStrength.emails)}
                  />
                  <View style={styles.evidenceContent}>
                    <Text style={styles.evidenceLabel}>Email Trail</Text>
                    <Text style={styles.evidenceValue}>
                      {case_.evidenceStrength.emails.charAt(0).toUpperCase() +
                        case_.evidenceStrength.emails.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.divider} />
              </>
            )}
            {case_.evidenceStrength.witnesses && (
              <>
                <View style={styles.evidenceRow}>
                  <Ionicons name="people" size={24} color="#2B8CAF" />
                  <View style={styles.evidenceContent}>
                    <Text style={styles.evidenceLabel}>Witnesses</Text>
                    <Text style={styles.evidenceValue}>
                      {case_.evidenceStrength.witnesses} willing to testify
                    </Text>
                  </View>
                </View>
                <View style={styles.divider} />
              </>
            )}
            {case_.evidenceStrength.documents && (
              <>
                <View style={styles.evidenceRow}>
                  <Ionicons
                    name={getEvidenceIcon(case_.evidenceStrength.documents)}
                    size={24}
                    color={getEvidenceColor(case_.evidenceStrength.documents)}
                  />
                  <View style={styles.evidenceContent}>
                    <Text style={styles.evidenceLabel}>Documentation</Text>
                    <Text style={styles.evidenceValue}>
                      {case_.evidenceStrength.documents.charAt(0).toUpperCase() +
                        case_.evidenceStrength.documents.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.divider} />
              </>
            )}
            {case_.evidenceStrength.precedent && (
              <View style={styles.evidenceRow}>
                <Ionicons name="library" size={24} color="#2B8CAF" />
                <View style={styles.evidenceContent}>
                  <Text style={styles.evidenceLabel}>Legal Precedent</Text>
                  <Text style={styles.evidenceValue}>{case_.evidenceStrength.precedent}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push(`/crowdfunding/invest/${case_.id}`)}
            activeOpacity={0.8}
          >
            <Ionicons name="cash-outline" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Express Interest</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Ionicons name="information-circle-outline" size={20} color="#2B8CAF" />
            <Text style={styles.secondaryButtonText}>Request More Info</Text>
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
  caseIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  caseId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B8CAF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  caseTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  caseSubtitle: {
    fontSize: 16,
    color: '#6B7280',
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFBEB',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },
  financialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  financialItem: {
    flex: 1,
  },
  financialLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  financialValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  financialValueGreen: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riskLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  riskScoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  riskScore: {
    fontSize: 32,
    fontWeight: '700',
  },
  riskScoreMax: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
    marginLeft: 2,
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  riskBadgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  assessmentText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  evidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  evidenceContent: {
    flex: 1,
  },
  evidenceLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  evidenceValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2B8CAF',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#2B8CAF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
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
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B8CAF',
  },
});
