import React, { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { SoftSkyBackdrop } from '@/components/backgrounds/SoftSkyBackdrop';
import { Text } from '@/components/ui/text';
import { ArticleSection } from '@/modules/litigation/components/ArticleSection';
import { GlossaryModal } from '@/modules/litigation/components/GlossaryModal';
import { getTopicById } from '@/modules/litigation/data/topics';
import { GlossaryEntry } from '@/modules/litigation/data/glossary';

export default function LitigationTopicScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedGlossary, setSelectedGlossary] = useState<GlossaryEntry | null>(null);

  const topic = id ? getTopicById(id) : undefined;

  if (!topic) {
    return (
      <SoftSkyBackdrop>
        <SafeAreaView edges={['top']} style={styles.container}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Topic not found</Text>
          </View>
        </SafeAreaView>
      </SoftSkyBackdrop>
    );
  }

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
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero with gradient icon */}
          <View style={styles.hero}>
            <LinearGradient
              colors={topic.gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroIcon}
            >
              <Ionicons name={topic.icon} size={48} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.heroTitle}>{topic.title}</Text>
            <Text style={styles.heroDescription}>{topic.description}</Text>
          </View>

          {/* Content sections */}
          <View style={styles.contentCard}>
            {topic.content.map((section, index) => (
              <ArticleSection
                key={index}
                title={section.title}
                content={section.content}
                level={section.level || 'h2'}
                onGlossaryPress={setSelectedGlossary}
              />
            ))}
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Glossary Modal */}
        <GlossaryModal
          visible={!!selectedGlossary}
          entry={selectedGlossary}
          onClose={() => setSelectedGlossary(null)}
        />
      </SafeAreaView>
    </SoftSkyBackdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  heroIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B2745',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
  },
  bottomSpacing: {
    height: 32,
  },
});
