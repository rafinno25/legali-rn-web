import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import { AlertCircle, CheckCircle } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { Alert, BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '../../../components/ui/ActionButton';

export default function FilingSuccessScreen() {
  // Prevent back gesture/swipe
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Return true to prevent default back behavior
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription?.remove();
    }, [])
  );

  const handleReturnToWorkspace = () => {
    router.replace('/(tabs)');
  };

  const handleDownloadReceipt = () => {
    Alert.alert(
      'Download Receipt',
      'Receipt and confirmation will be downloaded to your device.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
            <View style={styles.contentContainer}>
              {/* Success Icon */}
              <LinearGradient
                colors={['#10b981', '#0d9488']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.successIcon}
              >
                <CheckCircle size={56} color="white" strokeWidth={2} />
              </LinearGradient>

              {/* Success Title */}
              <Text style={styles.successTitle}>
                Successfully Filed!
              </Text>
              
              <Text style={styles.successDescription}>
                Your complaint has been electronically filed with Alameda County Superior Court
              </Text>

              {/* Case Details Card */}
              <View style={styles.caseDetailsCard}>
                <View style={styles.caseDetailsContent}>
                  <View style={styles.caseDetailRow}>
                    <Text style={styles.caseDetailLabel}>Case Number</Text>
                    <Text style={styles.caseDetailValue}>2025-SC-001847</Text>
                  </View>
                  
                  <View style={styles.caseDetailRow}>
                    <Text style={styles.caseDetailLabel}>Filed Date</Text>
                    <Text style={styles.caseDetailValueSmall}>Sep 29, 2025</Text>
                  </View>
                  
                  <View style={styles.caseDetailRow}>
                    <Text style={styles.caseDetailLabel}>Confirmation</Text>
                    <Text style={styles.caseDetailValueIndigo}>#EF-8847293</Text>
                  </View>
                  
                  <View style={styles.caseDetailRowLast}>
                    <Text style={styles.caseDetailLabel}>Status</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>Accepted</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtonsContainer}>
                <ActionButton
                  title="Return to Workspace"
                  onPress={handleReturnToWorkspace}
                  variant="custom"
                  gradientColors={['#4f46e5', '#9333ea']}
                />

                <ActionButton
                  title="Download Receipt & Confirmation"
                  onPress={handleDownloadReceipt}
                  variant="secondary"
                  fontSize={14}
                />
              </View>

              {/* Next Steps Info */}
              <View style={styles.nextStepsInfo}>
                <View style={styles.nextStepsContent}>
                  <AlertCircle size={20} color="#4f46e5" style={{ marginTop: 2 }} />
                  <View style={styles.nextStepsText}>
                    <Text style={styles.nextStepsTitle}>
                      What's Next?
                    </Text>
                    <Text style={styles.nextStepsDescription}>
                      The court will review your filing. You'll receive email updates on case status, hearing dates, and any responses from the defendant.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 44,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#f0fdfa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  successTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
    textAlign: 'center',
  },
  successDescription: {
    color: '#64748b',
    fontSize: 18,
    marginBottom: 32,
    maxWidth: 320,
    textAlign: 'center',
    lineHeight: 24,
  },
  caseDetailsCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '100%',
    maxWidth: 320,
    marginBottom: 32,
  },
  caseDetailsContent: {
    gap: 16,
  },
  caseDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  caseDetailRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caseDetailLabel: {
    color: '#64748b',
    fontWeight: '500',
  },
  caseDetailValue: {
    fontWeight: 'bold',
    color: '#0f172a',
    fontSize: 18,
  },
  caseDetailValueSmall: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  caseDetailValueIndigo: {
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#dcfce7',
    borderRadius: 20,
  },
  statusText: {
    color: '#15803d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    gap: 12,
    width: '100%',
    maxWidth: 320,
  },
  nextStepsInfo: {
    marginTop: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
    maxWidth: 320,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextStepsContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  nextStepsText: {
    flex: 1,
  },
  nextStepsTitle: {
    fontWeight: '600',
    color: '#0f172a',
    fontSize: 14,
    marginBottom: 4,
  },
  nextStepsDescription: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 18,
  },
});