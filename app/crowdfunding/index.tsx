import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SoftSkyBackdrop } from '@/components/backgrounds/SoftSkyBackdrop';
import { CaseCard } from '@/modules/crowdfunding/components/CaseCard';
import { AVAILABLE_CASES } from '@/modules/crowdfunding/data/mockCases';
import { CaseType } from '@/modules/crowdfunding/types/case';
import { getWaiverAccepted } from '@/modules/crowdfunding/utils/waiverState';

const FILTER_CHIPS = [
  { label: 'All Cases', value: 'all' },
  { label: 'Employment', value: 'Employment' },
  { label: 'Personal Injury', value: 'Personal Injury' },
  { label: 'Contract', value: 'Contract Dispute' },
  { label: 'Low Risk', value: 'low_risk' },
  { label: 'High ROI', value: 'high_roi' },
];

export default function CrowdfundingBrowse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    // Check if waiver was accepted, redirect if not
    if (!getWaiverAccepted()) {
      router.replace('/crowdfunding-waiver');
    }
  }, []);

  const filteredCases = AVAILABLE_CASES.filter((case_) => {
    const matchesSearch =
      searchQuery === '' ||
      case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.plaintiff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.defendant.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'low_risk') return case_.riskLevel === 'low';
    if (selectedFilter === 'high_roi') return case_.financial.projectedROIMax >= 80;
    return case_.caseType === selectedFilter;
  });

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
          <Text style={styles.headerTitle}>Fund Litigation</Text>
          <TouchableOpacity
            style={styles.portfolioButton}
            onPress={() => router.push('/crowdfunding/portfolio')}
            activeOpacity={0.7}
          >
            <Ionicons name="wallet-outline" size={24} color="#2B8CAF" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name="trending-up" size={32} color="#2B8CAF" />
          </View>
          <Text style={styles.heroTitle}>Bridge the justice</Text>
          <Text style={styles.heroSubtitle}>
            Provide non-recourse capital to plaintiffs pursuing meritorious claims. We connect cases that meet strict legal and financial criteria with funding sources to ensure access to justice.
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search cases by ID, plaintiff, or defendant..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTER_CHIPS.map((chip) => {
            const isSelected = selectedFilter === chip.value;
            return (
              <TouchableOpacity
                key={chip.value}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                onPress={() => setSelectedFilter(chip.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredCases.length} {filteredCases.length === 1 ? 'Case' : 'Cases'} Available
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.sortButton}>
              <Ionicons name="filter-outline" size={18} color="#6B7280" />
              <Text style={styles.sortText}>Sort</Text>
            </View>
          </TouchableOpacity>
        </View>

        {filteredCases.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No cases found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or filters</Text>
          </View>
        ) : (
          <View style={styles.casesContainer}>
            {filteredCases.map((case_) => (
              <CaseCard
                key={case_.id}
                case_={case_}
                onPress={() => router.push(`/crowdfunding/${case_.id}`)}
              />
            ))}
          </View>
        )}
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
  portfolioButton: {
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
  heroCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#2B8CAF',
    borderColor: '#2B8CAF',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  casesContainer: {
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
});
