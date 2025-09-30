import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '../../../components/ui/ActionButton';
import { ActionButtons } from '../../../components/ui/ActionButtons';
import { DocumentCard } from '../../../components/ui/DocumentCard';
import { SuccessBanner } from '../../../components/ui/SuccessBanner';
import { TextPreview, textStyles } from '../../../components/ui/TextPreview';
import { borderRadius, colors, spacing } from '../../../lib/constants';
import { LitigationHeader } from '../../../modules/litigation/components/LitigationHeader';

export default function ReviewDocumentScreen() {
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const { width, height } = Dimensions.get('window');

  const handleBack = () => {
    router.back();
  };

  const handleEditInApp = () => {
    Alert.alert('Edit in App', 'This feature will be available soon');
  };

  const handleDownloadPDF = () => {
    Alert.alert(
      'Download PDF', 
      'Choose how to open PDF',
      [
        {
          text: 'Open with Browser',
          onPress: () => {
            const pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/gh-pages/web/compressed.tracemonkey-pldi-09.pdf';
            Linking.openURL(pdfUrl);
          }
        },
        {
          text: 'Open with PDF App',
          onPress: () => {
            const pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/gh-pages/web/compressed.tracemonkey-pldi-09.pdf';
            Linking.openURL(pdfUrl);
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const handleFileWithCourt = () => {
    router.push('/(litigation)/litigation/efile-court');
  };

  const handlePreviewDocument = () => {
    setShowPDFViewer(!showPDFViewer);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LitigationHeader 
        title="Review Document" 
        onBackPress={handleBack}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            AI-generated and ready to file
          </Text>
        </View>
        {/* Success Banner */}
        <SuccessBanner
          title="Document Generated"
          description="Your complaint is formatted, cited, and ready for Alameda County Superior Court."
        />

        {/* Document Card */}
        <DocumentCard
          title="Complaint_Johnson_v_Smith.pdf"
          subtitle="Generated • 8 pages • Court-ready"
          onPreviewPress={handlePreviewDocument}
          showPreview={showPDFViewer}
        >
              {showPDFViewer ? (
                <View style={styles.pdfViewer}>
                  <View style={{ alignItems: 'center', gap: spacing.xl }}>
                    <Ionicons name="document-text" size={80} color={colors.primary} />
                    <View style={{ alignItems: 'center', gap: spacing.sm }}>
                      <Text style={styles.pdfTitle}>
                        Complaint_Johnson_v_Smith.pdf
                      </Text>
                      <Text style={styles.pdfSubtitle}>
                        Court-ready legal document
                      </Text>
                    </View>
                    <View style={{ 
                      backgroundColor: colors.primaryLight, 
                      paddingHorizontal: spacing.xl, 
                      paddingVertical: spacing.md, 
                      borderRadius: borderRadius.md,
                      borderWidth: 1,
                      borderColor: colors.borderLight
                    }}>
                      <Text style={{ fontSize: 14, color: colors.primaryDark, fontWeight: '600' }}>
                        📄 PDF Document Ready
                      </Text>
                    </View>
                    <View style={{ 
                      backgroundColor: colors.backgroundMuted, 
                      paddingHorizontal: spacing.lg, 
                      paddingVertical: spacing.sm, 
                      borderRadius: borderRadius.sm,
                      marginTop: spacing.sm
                    }}>
                      <Text style={{ fontSize: 12, color: colors.textMuted, textAlign: 'center' }}>
                        8 pages • Generated • Court-ready format
                      </Text>
                    </View>
                    <TouchableOpacity 
                      onPress={handleDownloadPDF}
                      style={styles.pdfButton}
                    >
                      <Text style={styles.pdfButtonText}>
                        Open PDF
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TextPreview>
                  <Text style={textStyles.courtHeader}>
                    SUPERIOR COURT OF CALIFORNIA
                  </Text>
                  <Text style={textStyles.courtHeader}>
                    COUNTY OF ALAMEDA
                  </Text>
                  <Text style={textStyles.courtHeaderWithMargin}>
                    SMALL CLAIMS DIVISION
                  </Text>
                  
                  <View style={{ gap: 8 }}>
                    <Text style={textStyles.partyLabel}>
                      PLAINTIFF: Sarah Johnson
                    </Text>
                    <Text style={textStyles.partyInfo}>
                      123 Main Street, Oakland, CA 94612
                    </Text>
                    <Text style={textStyles.partyLabelWithMargin}>
                      DEFENDANT: Michael Smith
                    </Text>
                    <Text style={textStyles.partyInfo}>
                      456 Oak Avenue, Oakland, CA 94610
                    </Text>
                    <Text style={textStyles.caseNumber}>
                      CASE NO: 2025-SC-001847
                    </Text>
                  </View>

                  <Text style={textStyles.sectionTitle}>
                    COMPLAINT FOR DAMAGES
                  </Text>
                  <Text style={textStyles.paragraph}>
                    Plaintiff alleges as follows:
                  </Text>
                  
                  <Text style={textStyles.paragraphWithMargin}>
                    <Text style={textStyles.boldText}>1. JURISDICTION AND VENUE.</Text> This Court has jurisdiction over this small claims action pursuant to California Code of Civil Procedure § 116.220, as the amount in controversy does not exceed $12,500. Venue is proper in Alameda County as the contract was executed and breached within this jurisdiction.
                  </Text>
                  
                  <Text style={textStyles.paragraphWithMargin}>
                    <Text style={textStyles.boldText}>2. PARTIES.</Text> Plaintiff Sarah Johnson is an individual residing in Oakland, California. Defendant Michael Smith is an individual residing in Oakland, California and conducting business within Alameda County.
                  </Text>

                  <Text style={textStyles.paragraphWithMargin}>
                    <Text style={textStyles.boldText}>3. FACTS.</Text> On or about January 15, 2025, Plaintiff and Defendant entered into a written contract for the provision of legal services. The contract specified that Defendant would provide legal consultation services for a flat fee of $5,000.
                  </Text>

                  <Text style={textStyles.paragraphWithMargin}>
                    <Text style={textStyles.boldText}>4. BREACH.</Text> Defendant failed to perform the services as agreed and has refused to refund the payment made by Plaintiff, despite Plaintiff's repeated demands.
                  </Text>

                  <Text style={textStyles.paragraphWithMargin}>
                    <Text style={textStyles.boldText}>5. DAMAGES.</Text> As a result of Defendant's breach, Plaintiff has suffered damages in the amount of $5,000, plus interest and costs of suit.
                  </Text>

                  <Text style={textStyles.paragraphWithMargin}>
                    <Text style={textStyles.boldText}>WHEREFORE,</Text> Plaintiff prays for judgment against Defendant in the amount of $5,000, plus interest, costs, and such other relief as the Court deems just and proper.
                  </Text>
                  
                  <Text style={textStyles.continuationText}>
                    [Document continues for 8 pages...]
                  </Text>
                </TextPreview>
              )}
        </DocumentCard>

        {/* Action Buttons */}
        <ActionButtons
          buttons={[
            {
              title: 'Edit in App',
              onPress: handleEditInApp,
              variant: 'secondary',
              backgroundColor: colors.backgroundMuted,
              textColor: colors.textPrimary,
            },
            {
              title: 'Download PDF',
              onPress: handleDownloadPDF,
              variant: 'secondary',
              backgroundColor: colors.primaryLight,
              textColor: colors.primaryDark,
            },
          ]}
        />

        {/* File with Court Button */}
        <ActionButton
          title="File with Court via Legali"
          onPress={handleFileWithCourt}
          variant="custom"
          gradientColors={['#4f46e5', '#9333ea']}
          icon={<Ionicons name="send" size={24} color="white" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  scrollContent: {
    gap: 0,
  },
  subtitleContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginHorizontal: -spacing.xl,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  pdfViewer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.background,
  },
  pdfTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  pdfSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  pdfButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pdfButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});