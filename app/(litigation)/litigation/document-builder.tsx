import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionButton } from "../../../components/ui/ActionButton";
import { LitigationHeader } from "../../../modules/litigation/components/LitigationHeader";

interface DocumentType {
    id: string;
    title: string;
    description: string;
    icon: string;
    isRecommended?: boolean;
}

const DOCUMENT_TYPES: DocumentType[] = [
    {
        id: "complaint",
        title: "Complaint",
        description: "Initial claim filing",
        icon: "document-text-outline",
        isRecommended: true
    },
    {
        id: "motion",
        title: "Motion",
        description: "Court request",
        icon: "checkmark-circle-outline"
    },
    {
        id: "response",
        title: "Response",
        description: "Answer filing",
        icon: "document-text-outline"
    },
    {
        id: "declaration",
        title: "Declaration",
        description: "Sworn statement",
        icon: "document-text-outline"
    }
];

const TONE_OPTIONS = [
    "Professional & Formal (Recommended)",
    "Concise & Direct",
    "Detailed & Comprehensive"
];

const CUSTOMIZATION_OPTIONS = [
    { id: "evidence", label: "Include all supporting evidence", checked: true },
    { id: "citations", label: "Add legal citations & precedents", checked: true },
    { id: "timeline", label: "Cross-reference timeline events", checked: true },
    { id: "exhibits", label: "Generate exhibits list", checked: false }
];

export default function DocumentBuilderScreen() {
    const [selectedDocumentType, setSelectedDocumentType] = useState<string>("complaint");
    const [selectedTone, setSelectedTone] = useState<string>(TONE_OPTIONS[0]);
    const [customizationOptions, setCustomizationOptions] = useState<{[key: string]: boolean}>(
        CUSTOMIZATION_OPTIONS.reduce((acc, option) => {
            acc[option.id] = option.checked;
            return acc;
        }, {} as {[key: string]: boolean})
    );

    const handleBackPress = () => {
        router.back();
    };

    const handleDocumentTypeSelect = (typeId: string) => {
        setSelectedDocumentType(typeId);
    };

    const handleCustomizationToggle = (optionId: string) => {
        setCustomizationOptions(prev => ({
            ...prev,
            [optionId]: !prev[optionId]
        }));
    };

    const handleGenerateDocument = () => {
        const selectedType = DOCUMENT_TYPES.find(type => type.id === selectedDocumentType);
        // Navigate to review document page
        router.push('/(litigation)/litigation/review-document');
    };

    return (
        <SafeAreaView style={styles.container}>
            <LitigationHeader 
                title="Document Builder" 
                onBackPress={handleBackPress}
            />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Subtitle */}
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>AI will generate court-ready filings from your case</Text>
                </View>

                {/* AI Analysis Complete Card */}
                <View style={styles.aiAnalysisCard}>
                    <LinearGradient
                        colors={['#4F46E5', '#9333EA']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.aiAnalysisGradient}
                    >
                        <View style={styles.aiAnalysisHeader}>
                            <Ionicons name="sparkles" size={24} color="white" />
                            <Text style={styles.aiAnalysisTitle}>AI Analysis Complete</Text>
                        </View>
                        <Text style={styles.aiAnalysisDescription}>
                            I've analyzed your entire case—timeline, evidence, parties, and facts. Ready to generate court documents automatically.
                        </Text>
                        <View style={styles.statsGrid}>
                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>47</Text>
                                    <Text style={styles.statLabel}>Timeline Events</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>24</Text>
                                    <Text style={styles.statLabel}>Evidence Files</Text>
                                </View>
                            </View>
                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>18</Text>
                                    <Text style={styles.statLabel}>Key Facts</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>3</Text>
                                    <Text style={styles.statLabel}>Legal Issues</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                {/* Document Type Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Document Type</Text>
                    <View style={styles.documentTypesGrid}>
                        {DOCUMENT_TYPES.map((type) => (
                            <TouchableOpacity
                                key={type.id}
                                style={[
                                    styles.documentTypeCard,
                                    selectedDocumentType === type.id && styles.documentTypeCardSelected
                                ]}
                                onPress={() => handleDocumentTypeSelect(type.id)}
                            >
                                {type.isRecommended && (
                                    <View style={styles.recommendedBadge}>
                                        <Text style={styles.recommendedBadgeText}>Next</Text>
                                    </View>
                                )}
                                <Ionicons 
                                    name={type.icon as any} 
                                    size={28} 
                                    color={selectedDocumentType === type.id ? "#4F46E5" : "#94A3B8"} 
                                />
                                <Text style={[
                                    styles.documentTypeTitle,
                                    selectedDocumentType === type.id && styles.documentTypeTitleSelected
                                ]}>
                                    {type.title}
                                </Text>
                                <Text style={styles.documentTypeDescription}>{type.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Customize Output */}
                <View style={styles.customizeSection}>
                    <View style={styles.customizeHeader}>
                        <Ionicons name="flash" size={20} color="#4F46E5" />
                        <Text style={styles.customizeTitle}>Customize Output</Text>
                    </View>

                    {/* Document Tone */}
                    <View style={styles.toneSection}>
                        <Text style={styles.toneLabel}>Document Tone</Text>
                        <View style={styles.toneSelector}>
                            {TONE_OPTIONS.map((tone, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.toneOption,
                                        selectedTone === tone && styles.toneOptionSelected
                                    ]}
                                    onPress={() => setSelectedTone(tone)}
                                >
                                    <Text style={[
                                        styles.toneOptionText,
                                        selectedTone === tone && styles.toneOptionTextSelected
                                    ]}>
                                        {tone}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Customization Options */}
                    <View style={styles.optionsSection}>
                        {CUSTOMIZATION_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={styles.optionItem}
                                onPress={() => handleCustomizationToggle(option.id)}
                            >
                                <View style={[
                                    styles.checkbox,
                                    customizationOptions[option.id] && styles.checkboxChecked
                                ]}>
                                    {customizationOptions[option.id] && (
                                        <Ionicons name="checkmark" size={16} color="white" />
                                    )}
                                </View>
                                <Text style={styles.optionLabel}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Generate Button */}
                <View style={styles.generateButton}>
                    <ActionButton
                        title="Generate Complaint"
                        onPress={handleGenerateDocument}
                        variant="custom"
                        gradientColors={['#4F46E5', '#9333EA']}
                        icon={<Ionicons name="sparkles" size={24} color="white" />}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    subtitleContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
    },
    aiAnalysisCard: {
        margin: 20,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    aiAnalysisGradient: {
        padding: 20,
    },
    aiAnalysisHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    aiAnalysisTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    aiAnalysisDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 20,
        marginBottom: 16,
    },
    statsGrid: {
        gap: 12,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    statItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 12,
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 12,
    },
    documentTypesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    documentTypeCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        width: '47%',
        position: 'relative',
    },
    documentTypeCardSelected: {
        borderColor: '#4F46E5',
        backgroundColor: '#EEF2FF',
    },
    recommendedBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#10B981',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    recommendedBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    documentTypeTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
        marginTop: 8,
        marginBottom: 4,
    },
    documentTypeTitleSelected: {
        color: '#0F172A',
    },
    documentTypeDescription: {
        fontSize: 12,
        color: '#64748B',
        textAlign: 'center',
    },
    customizeSection: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    customizeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    customizeTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    toneSection: {
        marginBottom: 16,
    },
    toneLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    toneSelector: {
        gap: 8,
    },
    toneOption: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    toneOptionSelected: {
        borderColor: '#4F46E5',
        backgroundColor: '#EEF2FF',
    },
    toneOptionText: {
        fontSize: 14,
        color: '#374151',
    },
    toneOptionTextSelected: {
        color: '#4F46E5',
        fontWeight: '500',
    },
    optionsSection: {
        gap: 10,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
    },
    optionLabel: {
        fontSize: 14,
        color: '#374151',
        flex: 1,
    },
    generateButton: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
});
