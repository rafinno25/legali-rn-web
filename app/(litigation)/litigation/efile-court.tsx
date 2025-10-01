import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
    CircleCheckBig,
    Plus,
    Send,
    Shield
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '../../../components/ui/ActionButton';
import { LitigationHeader } from '../../../modules/litigation/components/LitigationHeader';

export default function EFileCourtScreen() {
  const [selectedPayment, setSelectedPayment] = useState('visa');
  const [showAddPayment, setShowAddPayment] = useState(false);

  const filingFees = [
    { label: 'Small Claims Filing Fee', amount: '$75.00' },
    { label: 'E-Filing Service Fee', amount: '$10.00' },
    { label: 'Processing Fee', amount: '$3.50' }
  ];

  const totalAmount = '$88.50';

  const handleSubmitFiling = () => {
    // TODO: Implement actual filing submission
    console.log('Submitting filing...');
    // Navigate to filing success page
    router.push('/(litigation)/litigation/filing-success');
  };

  const handleRequestFeeWaiver = () => {
    Alert.alert(
      'Request Fee Waiver',
      'Would you like to request a fee waiver for this filing? You will need to provide financial documentation.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Request Waiver',
          onPress: () => {
            Alert.alert(
              'Fee Waiver Requested',
              'Your fee waiver request has been submitted. You will be notified of the decision within 2-3 business days.',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LitigationHeader 
        title="E-File with Court" 
        onBackPress={handleBack}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Subtitle */}
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              Secure filing powered by Legali EFSP
            </Text>
          </View>

          {/* Legali EFSP Partner Card */}
          <View style={styles.efspCard}>
            <View style={styles.efspHeader}>
              <LinearGradient
                colors={['#10b981', '#0d9488']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.efspIcon}
              >
                <Shield size={28} color="white" />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={styles.efspTitle}>
                  Legali EFSP Partner
                </Text>
                <Text style={styles.efspSubtitle}>
                  Certified Electronic Filing
                </Text>
              </View>
            </View>
            <Text style={styles.efspDescription}>
              As an approved Electronic Filing Service Provider, we submit directly to the court with full security and compliance.
            </Text>
          </View>

          {/* Filing Information */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>
              Filing Information
            </Text>
            <View style={styles.infoContent}>
              <View style={styles.infoField}>
                <Text style={styles.infoLabel}>
                  Court
                </Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>
                    Alameda County Superior Court
                  </Text>
                </View>
              </View>
              <View style={styles.infoField}>
                <Text style={styles.infoLabel}>
                  Division
                </Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>
                    Small Claims Division
                  </Text>
                </View>
              </View>
              <View style={styles.infoField}>
                <Text style={styles.infoLabel}>
                  Document
                </Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>
                    Complaint for Damages
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Filing Fees */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>
              Filing Fees
            </Text>
            <View style={styles.feesContent}>
              {filingFees.map((fee, index) => (
                <View key={index} style={styles.feeRow}>
                  <Text style={styles.feeLabel}>{fee.label}</Text>
                  <Text style={styles.feeAmount}>{fee.amount}</Text>
                </View>
              ))}
              <View style={styles.feeTotalRow}>
                <Text style={styles.feeTotalLabel}>Total</Text>
                <Text style={styles.feeTotalAmount}>{totalAmount}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.feeWaiverButton}
              onPress={handleRequestFeeWaiver}
            >
              <Text style={styles.feeWaiverText}>
                Request Fee Waiver
              </Text>
            </TouchableOpacity>
          </View>

          {/* Payment Method */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>
              Payment Method
            </Text>
            <View style={styles.paymentContent}>
              <TouchableOpacity 
                style={[
                  styles.paymentOption,
                  selectedPayment === 'visa' ? styles.paymentOptionSelected : styles.paymentOptionUnselected
                ]}
                onPress={() => setSelectedPayment('visa')}
              >
                <View style={[
                  styles.paymentRadio,
                  selectedPayment === 'visa' ? styles.paymentRadioSelected : styles.paymentRadioUnselected
                ]}>
                  {selectedPayment === 'visa' && (
                    <CircleCheckBig size={16} color="white" />
                  )}
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentTitle}>
                    Visa •••• 4242
                  </Text>
                  <Text style={styles.paymentSubtitle}>
                    Expires 09/27
                  </Text>
                </View>
                {selectedPayment === 'visa' && (
                  <CircleCheckBig size={20} color="#4f46e5" />
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.addPaymentButton}
                onPress={() => setShowAddPayment(!showAddPayment)}
              >
                <Plus size={20} color="#64748b" />
                <Text style={styles.addPaymentText}>
                  Add Payment Method
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <ActionButton
            title={`Submit Filing — ${totalAmount}`}
            onPress={handleSubmitFiling}
            variant="custom"
            gradientColors={['#10b981', '#0d9488']}
            icon={<Send size={24} color="white" />}
          />

          <Text style={styles.disclaimerText}>
            By submitting, you authorize Legali to electronically file this document with the court and process payment for filing fees.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginHorizontal: -20,
    marginTop: -20,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  efspCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  efspHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  efspIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  efspTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  efspSubtitle: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  efspDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
    fontSize: 18,
  },
  infoContent: {
    gap: 16,
  },
  infoField: {
    gap: 6,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValueContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
  },
  infoValue: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  feesContent: {
    gap: 12,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    color: '#64748b',
    fontSize: 14,
  },
  feeAmount: {
    fontWeight: '600',
    color: '#0f172a',
  },
  feeTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeTotalLabel: {
    fontWeight: 'bold',
    color: '#0f172a',
    fontSize: 18,
  },
  feeTotalAmount: {
    fontWeight: 'bold',
    color: '#4f46e5',
    fontSize: 24,
  },
  feeWaiverButton: {
    width: '100%',
    marginTop: 16,
  },
  feeWaiverText: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  paymentContent: {
    gap: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  paymentOptionSelected: {
    borderColor: '#4f46e5',
    backgroundColor: '#eef2ff',
  },
  paymentOptionUnselected: {
    borderColor: '#e2e8f0',
    backgroundColor: 'white',
  },
  paymentRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentRadioSelected: {
    borderColor: '#4f46e5',
    backgroundColor: '#4f46e5',
  },
  paymentRadioUnselected: {
    borderColor: '#cbd5e1',
    backgroundColor: 'white',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontWeight: '600',
    color: '#0f172a',
    fontSize: 14,
  },
  paymentSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  addPaymentButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  addPaymentText: {
    fontWeight: '500',
    color: '#0f172a',
    fontSize: 14,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 18,
  },
});