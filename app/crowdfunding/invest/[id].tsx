import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SoftSkyBackdrop } from '@/components/backgrounds/SoftSkyBackdrop';
import { findCaseById } from '@/modules/crowdfunding/data/mockCases';

const INVESTMENT_PRESETS = [5000, 10000, 25000, 50000];

export default function InvestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const case_ = findCaseById(id);

  const [investmentAmount, setInvestmentAmount] = useState('10000');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!case_) {
    return (
      <SoftSkyBackdrop>
        <View style={styles.container}>
          <Text style={styles.errorText}>Case not found</Text>
        </View>
      </SoftSkyBackdrop>
    );
  }

  const amount = parseInt(investmentAmount) || 0;
  const minInvestment = 5000;
  const maxInvestment = case_.financial.fundingNeeded;

  const estimatedReturn =
    (amount * (case_.financial.projectedROIMin + case_.financial.projectedROIMax)) / 200;

  const handleInvest = () => {
    if (amount < minInvestment) {
      Alert.alert('Minimum Investment', `Minimum investment is $${minInvestment.toLocaleString()}`);
      return;
    }
    if (amount > maxInvestment) {
      Alert.alert(
        'Maximum Investment',
        `Maximum investment is $${maxInvestment.toLocaleString()} for this case`
      );
      return;
    }
    if (!acceptedTerms) {
      Alert.alert('Terms Required', 'Please accept the investment terms to continue');
      return;
    }

    router.push(`/crowdfunding/invest/confirm?id=${case_.id}&amount=${amount}`);
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
          <Text style={styles.headerTitle}>Investment Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.caseCard}>
          <Text style={styles.caseId}>{case_.caseId}</Text>
          <Text style={styles.caseTitle}>{case_.title}</Text>
          <View style={styles.caseStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Funding Goal</Text>
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
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Amount</Text>
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.input}
                value={investmentAmount}
                onChangeText={setInvestmentAmount}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#D1D5DB"
              />
            </View>
            <View style={styles.presetRow}>
              {INVESTMENT_PRESETS.map((preset) => (
                <TouchableOpacity
                  key={preset}
                  style={[
                    styles.presetChip,
                    parseInt(investmentAmount) === preset && styles.presetChipActive,
                  ]}
                  onPress={() => setInvestmentAmount(preset.toString())}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.presetText,
                      parseInt(investmentAmount) === preset && styles.presetTextActive,
                    ]}
                  >
                    ${(preset / 1000).toFixed(0)}K
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.rangeInfo}>
              <Text style={styles.rangeText}>
                Min: ${minInvestment.toLocaleString()} • Max: $
                {maxInvestment.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Summary</Text>
          <View style={styles.card}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Investment Amount</Text>
              <Text style={styles.summaryValue}>${amount.toLocaleString()}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Estimated Return</Text>
              <Text style={styles.summaryValueGreen}>
                ${estimatedReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Estimated Timeline</Text>
              <Text style={styles.summaryValue}>{case_.financial.estimatedTimeline}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Platform Fee</Text>
              <Text style={styles.summaryValue}>{case_.financial.platformFee}% of recovery</Text>
            </View>
          </View>
        </View>

        <View style={styles.disclaimerCard}>
          <Ionicons name="warning-outline" size={20} color="#EF4444" />
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>High Risk Investment:</Text> Litigation funding
            carries substantial risk including total loss of invested capital. Past performance does
            not guarantee future results. This is not financial advice.
          </Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxActive]}>
              {acceptedTerms && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
            </View>
            <Text style={styles.termsText}>
              I understand the risks and accept the{' '}
              <Text style={styles.termsLink}>investment terms</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.investButton, !acceptedTerms && styles.investButtonDisabled]}
            onPress={handleInvest}
            activeOpacity={0.8}
            disabled={!acceptedTerms}
          >
            <Ionicons name="cash-outline" size={20} color="#FFFFFF" />
            <Text style={styles.investButtonText}>
              Invest ${amount.toLocaleString()}
            </Text>
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
  caseCard: {
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
  caseId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2B8CAF',
    marginBottom: 8,
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  caseStats: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  statValueGreen: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
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
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6B7280',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },
  presetRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  presetChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  presetChipActive: {
    backgroundColor: '#2B8CAF',
  },
  presetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  presetTextActive: {
    color: '#FFFFFF',
  },
  rangeInfo: {
    marginTop: 12,
    alignItems: 'center',
  },
  rangeText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 15,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  summaryValueGreen: {
    fontSize: 15,
    fontWeight: '700',
    color: '#10B981',
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
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: '#7F1D1D',
    lineHeight: 18,
  },
  disclaimerBold: {
    fontWeight: '700',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#2B8CAF',
    borderColor: '#2B8CAF',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  termsLink: {
    color: '#2B8CAF',
    fontWeight: '600',
  },
  actionContainer: {
    paddingHorizontal: 20,
  },
  investButton: {
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
  investButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
  },
  investButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
