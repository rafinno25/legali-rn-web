import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LitigationCase } from '../types/case';

interface CaseCardProps {
  case_: LitigationCase;
  onPress: () => void;
}

export function CaseCard({ case_, onPress }: CaseCardProps) {
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

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'low':
        return 'Low Risk';
      case 'medium':
        return 'Medium Risk';
      case 'high':
        return 'High Risk';
      default:
        return 'Unknown';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.caseId}>{case_.caseId}</Text>
          <View style={styles.caseTypeBadge}>
            <Text style={styles.caseTypeText}>{case_.caseType}</Text>
          </View>
        </View>
        {case_.daysToReview && (
          <View style={styles.urgencyBadge}>
            <Ionicons name="time-outline" size={14} color="#EF4444" />
            <Text style={styles.urgencyText}>{case_.daysToReview}d left</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>{case_.title}</Text>

      <View style={styles.detailRow}>
        <Ionicons name="person-outline" size={16} color="#6B7280" />
        <Text style={styles.detailText}>
          {case_.plaintiff} v. {case_.defendant}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Funding Needed</Text>
          <Text style={styles.statValue}>
            ${case_.financial.fundingNeeded.toLocaleString()}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Est. ROI</Text>
          <Text style={styles.statValueGreen}>
            {case_.financial.projectedROIMin}-{case_.financial.projectedROIMax}%
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Risk Score</Text>
          <Text style={[styles.statValue, { color: getRiskColor(case_.riskLevel) }]}>
            {case_.riskScore.toFixed(1)}/10
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.lawyerInfo}>
          <Ionicons name="briefcase-outline" size={16} color="#6B7280" />
          <Text style={styles.lawyerText}>
            {case_.lawyerName} • {case_.lawyerRating}
          </Text>
        </View>
        <View style={[styles.riskBadge, { backgroundColor: getRiskColor(case_.riskLevel) + '20' }]}>
          <Text style={[styles.riskText, { color: getRiskColor(case_.riskLevel) }]}>
            {getRiskLabel(case_.riskLevel)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
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
    fontSize: 12,
    fontWeight: '600',
    color: '#0369A1',
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  statValueGreen: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lawyerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lawyerText: {
    fontSize: 13,
    color: '#6B7280',
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
