import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SoftSkyBackdrop } from '@/components/backgrounds/SoftSkyBackdrop';
import { findCaseById } from '@/modules/crowdfunding/data/mockCases';

export default function InvestmentConfirmation() {
  const { id, amount } = useLocalSearchParams<{ id: string; amount: string }>();
  const case_ = findCaseById(id);

  const [checkmarkScale] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.spring(checkmarkScale, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/crowdfunding/portfolio');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!case_) {
    return (
      <SoftSkyBackdrop>
        <View style={styles.container}>
          <Text style={styles.errorText}>Case not found</Text>
        </View>
      </SoftSkyBackdrop>
    );
  }

  return (
    <SoftSkyBackdrop>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.checkmarkCircle,
            {
              transform: [{ scale: checkmarkScale }],
            },
          ]}
        >
          <Ionicons name="checkmark" size={64} color="#FFFFFF" />
        </Animated.View>

        <Text style={styles.title}>Investment Confirmed!</Text>
        <Text style={styles.subtitle}>
          You've successfully invested ${parseInt(amount).toLocaleString()} in case {case_.caseId}
        </Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="document-text-outline" size={24} color="#2B8CAF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Case</Text>
              <Text style={styles.infoValue}>{case_.title}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={24} color="#2B8CAF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Investment Amount</Text>
              <Text style={styles.infoValue}>${parseInt(amount).toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="trending-up-outline" size={24} color="#2B8CAF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Estimated ROI</Text>
              <Text style={styles.infoValue}>
                {case_.financial.projectedROIMin}-{case_.financial.projectedROIMax}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.messageCard}>
          <Ionicons name="information-circle" size={20} color="#2B8CAF" />
          <Text style={styles.messageText}>
            You'll receive updates as the case progresses. View your investment in your portfolio.
          </Text>
        </View>

        <Text style={styles.redirectText}>Redirecting to portfolio...</Text>
      </View>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  checkmarkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#E0F2FE',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    color: '#0C4A6E',
    lineHeight: 20,
  },
  redirectText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
});
