import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useRef } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

export function TermsAgreementScreen() {
  const router = useRouter();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isScrolledToEnd =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isScrolledToEnd) {
      setHasScrolledToBottom(true);
    }
  };

  const handleContinue = () => {
    router.push("/auth/profile-setup");
  };

  const canContinue = hasScrolledToBottom && isAgreed;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/legali_icon_main.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <Text style={styles.headerSubtitle}>
          Please read and accept our terms to continue
        </Text>
      </View>

      {/* Terms Content */}
      <ScrollView
        style={styles.termsContainer}
        contentContainerStyle={styles.termsContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.termsCard}>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>Effective Date:</Text> September 28, 2025
          </Text>
          <Text style={styles.termsText}>
            Welcome to Legali. Please read these Terms of Service carefully before using our
            platform.
          </Text>

          <Text style={styles.sectionTitle}>1. Agreement to Terms</Text>
          <Text style={styles.termsText}>
            By accessing or using our website, mobile application, or any related services
            (collectively, the "Services"), you agree to be bound by these Terms of Service
            ("Terms"). If you disagree with any part of these Terms, you may not access or use
            the Services.
          </Text>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>Important:</Text> These Terms contain a binding
            arbitration clause and class action waiver in Section 14, which affect your legal
            rights. Please review them carefully.
          </Text>

          <Text style={styles.sectionTitle}>2. Description of Services</Text>
          <Text style={styles.termsText}>Legali provides an online platform offering:</Text>
          <Text style={styles.bulletText}>• Automated legal document generation and templates</Text>
          <Text style={styles.bulletText}>• Legal information and educational resources</Text>
          <Text style={styles.bulletText}>
            • Document analysis and red-flag identification tools
          </Text>
          <Text style={styles.bulletText}>• Legal research and analytic capabilities</Text>
          <Text style={styles.bulletText}>
            • Access to a network of licensed attorneys (where applicable)
          </Text>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>Legali is a technology platform, not a law firm.</Text> We
            do not provide legal advice, opinions, or recommendations. The information and documents
            provided through our Services are for informational purposes only and should not be
            considered legal advice.
          </Text>

          <Text style={styles.sectionTitle}>3. No Attorney-Client Relationship</Text>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>
              Using Legali does not create an attorney-client relationship
            </Text>{" "}
            between you and Legali, its employees, or contractors. Any information you provide
            through the Services is not protected by attorney-client privilege.
          </Text>

          <Text style={styles.sectionTitle}>4. Not a Substitute for Legal Advice</Text>
          <Text style={styles.termsText}>
            The Services are designed to provide general legal information and tools. They are not a
            substitute for personalized legal advice from a licensed attorney who understands your
            specific circumstances.
          </Text>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>You should always:</Text>
          </Text>
          <Text style={styles.bulletText}>
            • Consult with a qualified attorney before making important legal decisions
          </Text>
          <Text style={styles.bulletText}>
            • Have any documents generated through Legali reviewed by an attorney before signing or
            filing
          </Text>
          <Text style={styles.bulletText}>
            • Seek professional legal counsel for questions about your specific legal situation
          </Text>
          <Text style={styles.bulletText}>
            • Verify all information and ensure it complies with current laws in your jurisdiction
          </Text>

          <Text style={styles.sectionTitle}>5. Eligibility and Account Registration</Text>
          <Text style={styles.termsText}>
            You must be at least 18 years old to use the Services. By using Legali, you represent
            and warrant that you meet this age requirement.
          </Text>
          <Text style={styles.termsText}>To access certain features, you must create an account. You agree to:</Text>
          <Text style={styles.bulletText}>• Provide accurate, current, and complete information</Text>
          <Text style={styles.bulletText}>
            • Maintain the security of your password and account credentials
          </Text>
          <Text style={styles.bulletText}>
            • Notify us immediately of any unauthorized access or security breach
          </Text>
          <Text style={styles.bulletText}>
            • Accept responsibility for all activities that occur under your account
          </Text>

          <Text style={styles.sectionTitle}>6. User Responsibilities and Conduct</Text>
          <Text style={styles.termsText}>
            You agree to use the Services only for lawful purposes and in compliance with all
            applicable federal, state, local, and international laws and regulations.
          </Text>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>You may not:</Text>
          </Text>
          <Text style={styles.bulletText}>
            • Use the Services for any illegal, fraudulent, or unauthorized purpose
          </Text>
          <Text style={styles.bulletText}>
            • Impersonate any person or entity or misrepresent your affiliation
          </Text>
          <Text style={styles.bulletText}>
            • Upload, transmit, or distribute any viruses, malware, or harmful code
          </Text>
          <Text style={styles.bulletText}>
            • Attempt to gain unauthorized access to the Services or related systems
          </Text>

          <Text style={styles.sectionTitle}>7. Fees and Payment</Text>
          <Text style={styles.termsText}>
            Certain Services require payment of fees. All fees are stated in U.S. dollars and are
            non-refundable except as expressly provided in our Refund Policy or required by law.
          </Text>
          <Text style={styles.termsText}>
            If you purchase a subscription, your subscription will automatically renew at the end of
            each billing period unless you cancel.
          </Text>

          <Text style={styles.sectionTitle}>8. Intellectual Property Rights</Text>
          <Text style={styles.termsText}>
            The Services, including all software, algorithms, text, graphics, logos, button icons,
            images, audio clips, data compilations, and code, are the property of Legali or its
            licensors and are protected by U.S. and international copyright, trademark, patent,
            trade secret, and other intellectual property laws.
          </Text>

          <Text style={styles.sectionTitle}>9. Privacy and Data Security</Text>
          <Text style={styles.termsText}>
            Our collection, use, and protection of your personal information is governed by our
            Privacy Policy, which is incorporated into these Terms by reference.
          </Text>

          <Text style={styles.sectionTitle}>10. Disclaimers and Warranties</Text>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </Text>
          </Text>

          <Text style={styles.sectionTitle}>11. Limitation of Liability</Text>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL LEGALI, ITS OFFICERS,
              DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
            </Text>
          </Text>
          <Text style={styles.termsText}>
            Legali's total liability to you for all claims arising out of or related to these Terms
            or the Services shall not exceed the greater of: (A) $100; or (B) the amount you paid
            to Legali in the 12 months preceding the claim.
          </Text>

          <Text style={styles.sectionTitle}>12. Dispute Resolution and Arbitration</Text>
          <Text style={styles.termsText}>
            If we cannot resolve a dispute informally within 30 days, you agree that any dispute,
            claim, or controversy arising out of or relating to these Terms or the Services shall be
            resolved by binding arbitration administered by the American Arbitration Association
            (AAA) under its Commercial Arbitration Rules.
          </Text>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>
              YOU AGREE THAT ANY ARBITRATION OR LEGAL PROCEEDING SHALL BE CONDUCTED ON AN INDIVIDUAL
              BASIS ONLY AND NOT AS A CLASS ACTION.
            </Text>
          </Text>

          <Text style={styles.sectionTitle}>13. Governing Law and Venue</Text>
          <Text style={styles.termsText}>
            These Terms shall be governed by and construed in accordance with the laws of the State
            of Delaware, without regard to its conflict of law provisions.
          </Text>

          <Text style={styles.sectionTitle}>14. Contact Information</Text>
          <Text style={styles.termsText}>
            For questions, concerns, or notices regarding these Terms or the Services:
          </Text>
          <Text style={styles.termsText}>
            <Text style={styles.boldText}>Legali AI, LLC.</Text>
            {"\n"}Email: contact@legali.io
            {"\n"}Legal Department: legal@legali.io
          </Text>

          <Text style={[styles.termsText, styles.finalText]}>
            <Text style={styles.boldText}>
              By using Legali's Services, you acknowledge that you have read, understood, and agree
              to be bound by these Terms of Service.
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* Scroll Indicator */}
      {!hasScrolledToBottom && (
        <View style={styles.scrollIndicator}>
          <Ionicons name="arrow-down" size={16} color="#6B7280" />
          <Text style={styles.scrollIndicatorText}>Scroll to continue</Text>
        </View>
      )}

      {/* Bottom Action Area */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setIsAgreed(!isAgreed)}
          disabled={!hasScrolledToBottom}
        >
          <View
            style={[
              styles.checkbox,
              isAgreed && styles.checkboxChecked,
              !hasScrolledToBottom && styles.checkboxDisabled,
            ]}
          >
            {isAgreed && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
          </View>
          <Text
            style={[
              styles.checkboxLabel,
              !hasScrolledToBottom && styles.checkboxLabelDisabled,
            ]}
          >
            I have read and agree to the Terms of Service
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!canContinue}
        >
          <Text
            style={[styles.continueButtonText, !canContinue && styles.continueButtonTextDisabled]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(14, 34, 53, 0.1)",
  },
  logo: {
    width: 120,
    height: 48,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0E2235",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  termsContainer: {
    flex: 1,
  },
  termsContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  termsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(191, 219, 254, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0E2235",
    marginTop: 20,
    marginBottom: 8,
  },
  termsText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 12,
  },
  boldText: {
    fontWeight: "700",
  },
  bulletText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 6,
    paddingLeft: 8,
  },
  finalText: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(14, 34, 53, 0.1)",
  },
  scrollIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopWidth: 1,
    borderTopColor: "rgba(14, 34, 53, 0.1)",
  },
  scrollIndicatorText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(14, 34, 53, 0.1)",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#14213D",
    borderColor: "#14213D",
  },
  checkboxDisabled: {
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  checkboxLabelDisabled: {
    color: "#9CA3AF",
  },
  continueButton: {
    backgroundColor: "#14213D",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  continueButtonTextDisabled: {
    color: "#9CA3AF",
  },
});
