import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { findGlossaryTerm, GlossaryEntry } from '../data/glossary';

interface ArticleSectionProps {
  title?: string;
  content: string;
  level?: 'h1' | 'h2' | 'h3';
  onGlossaryPress?: (entry: GlossaryEntry) => void;
}

// Parse text and wrap glossary terms with interactive components
function parseTextWithGlossaryTerms(
  text: string,
  onGlossaryPress?: (entry: GlossaryEntry) => void
): React.ReactNode[] {
  const glossaryPatterns = [
    'plaintiff',
    'defendant',
    'complaint',
    'service of process',
    'discovery',
    'deposition',
    'interrogatories',
    'summary judgment',
    'mediation',
    'statute of limitations',
    'pro se',
    'self-represented litigant',
    'breach of contract',
    'negligence',
    'fraud',
    'LEP',
    'judgment',
    'appeal',
    'civil litigation',
    'small claims',
  ];

  // Create regex pattern to match any glossary term (case insensitive)
  const pattern = new RegExp(
    `\\b(${glossaryPatterns.join('|')})\\b`,
    'gi'
  );

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Find glossary entry
    const entry = findGlossaryTerm(match[0]);

    // Add the interactive glossary term
    if (entry && onGlossaryPress) {
      parts.push(
        <Text
          key={`term-${keyCounter++}`}
          style={styles.glossaryTerm}
          onPress={() => onGlossaryPress(entry)}
        >
          {match[0]}
        </Text>
      );
    } else {
      parts.push(match[0]);
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function ArticleSection({
  title,
  content,
  level = 'h2',
  onGlossaryPress
}: ArticleSectionProps) {
  // Split content into paragraphs and bullet points
  const lines = content.split('\n').filter(line => line.trim());

  return (
    <View style={styles.section}>
      {title && (
        <Text style={level === 'h1' ? styles.titleH1 : level === 'h3' ? styles.titleH3 : styles.titleH2}>
          {title}
        </Text>
      )}
      <View style={styles.contentContainer}>
        {lines.map((line, index) => {
          const trimmedLine = line.trim();

          // Handle bullet points
          if (trimmedLine.startsWith('●') || trimmedLine.startsWith('•')) {
            const bulletText = trimmedLine.substring(1).trim();
            return (
              <View key={index} style={styles.bulletContainer}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  {parseTextWithGlossaryTerms(bulletText, onGlossaryPress)}
                </Text>
              </View>
            );
          }

          // Handle bold text (wrapped in **)
          if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
            const boldText = trimmedLine.substring(2, trimmedLine.length - 2);
            return (
              <Text key={index} style={styles.boldText}>
                {parseTextWithGlossaryTerms(boldText, onGlossaryPress)}
              </Text>
            );
          }

          // Regular paragraph
          return (
            <Text key={index} style={styles.paragraph}>
              {parseTextWithGlossaryTerms(trimmedLine, onGlossaryPress)}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  titleH1: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B2745',
    marginBottom: 16,
  },
  titleH2: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B2745',
    marginBottom: 12,
  },
  titleH3: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B2745',
    marginBottom: 8,
  },
  contentContainer: {
    gap: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A5568',
  },
  bulletContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 8,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A5568',
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#4A5568',
  },
  boldText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B2745',
    marginTop: 8,
  },
  glossaryTerm: {
    color: '#3FA7CC',
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    textDecorationColor: '#3FA7CC',
  },
});
