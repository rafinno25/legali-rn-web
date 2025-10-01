import React from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SoftSkyBackdrop } from '@/components/backgrounds/SoftSkyBackdrop';
import { Text } from '@/components/ui/text';
import { TopicCard } from '@/modules/litigation/components/TopicCard';
import { topics } from '@/modules/litigation/data/topics';

export default function Litigation101Screen() {
  const router = useRouter();

  return (
    <SoftSkyBackdrop>
      <SafeAreaView edges={['top']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#1B2745" />
          </Pressable>
          <Text style={styles.headerTitle}>Litigation 101</Text>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.hero}>
            <View style={styles.heroIcon}>
              <Ionicons name="book" size={40} color="#3FA7CC" />
            </View>
            <Text style={styles.heroSubtitle}>
              A comprehensive guide to understanding civil litigation, legal procedures, and your rights in court.
            </Text>
          </View>

          {/* Topics Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explore Topics</Text>
            <View style={styles.topicsContainer}>
              {topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  title={topic.title}
                  description={topic.description}
                  icon={topic.icon}
                  gradientColors={topic.gradientColors}
                  onPress={() => router.push(`/litigation-topic/${topic.id}`)}
                />
              ))}
            </View>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Ionicons name="information-circle-outline" size={20} color="#6B7280" />
            <Text style={styles.disclaimerText}>
              This page offers general information only and does not constitute legal advice. Using Legali does not create an attorney-client relationship.
            </Text>
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B2745',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B2745',
    marginBottom: 16,
  },
  topicsContainer: {
    // Cards have their own bottom margin
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});
