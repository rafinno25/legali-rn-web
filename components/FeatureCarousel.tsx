import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface FeatureButton {
  icon: React.ReactNode;
  label: string;
  color: string;
  route?: string;
}

interface FeatureCarouselProps {
  features?: FeatureButton[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const FEATURE_BUTTONS: FeatureButton[] = [
  {
    icon: <Ionicons name="warning" size={20} color="#DC2626" />,
    label: "Red Flag Analysis",
    color: "rgba(254, 242, 242, 0.9)",
    route: "/red-flag-analysis",
  },
  {
    icon: <Ionicons name="document-text" size={20} color="#3B82F6" />,
    label: "Smart Legal Drafter",
    color: "rgba(239, 246, 255, 0.9)",
    route: "/documents",
  },
  {
    icon: <MaterialCommunityIcons name="gavel" size={20} color="#7C3AED" />,
    label: "Litigation Case Builder",
    color: "rgba(245, 243, 255, 0.9)",
    route: "/litigation",
  },
  {
    icon: <MaterialCommunityIcons name="scale-balance" size={20} color="#3B82F6" />,
    label: "Lawyer Marketplace",
    color: "rgba(239, 246, 255, 0.9)",
    route: "/marketplace-onboarding"
  },
  {
    icon: <Ionicons name="cash-outline" size={20} color="#10B981" />,
    label: "Fund Your Litigation",
    color: "rgba(240, 253, 244, 0.9)",
    route: "/crowdfunding-waiver",
  },
];

export function FeatureCarousel({
  features = FEATURE_BUTTONS,
  autoPlay = true,
  autoPlayInterval = 3000
}: FeatureCarouselProps) {
  const router = useRouter();
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const flatListRef = useRef<FlatList>(null);
  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentPageRef = useRef(0);

  const handleFeaturePress = (feature: FeatureButton, index: number) => {
    if (feature.route) {
      router.push(feature.route as any);
    }
  };

  const startAutoPlay = () => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }

    autoPlayTimer.current = setInterval(() => {
      if (flatListRef.current) {
        // Scroll per item, not per page
        const nextIndex = (currentPageRef.current + 1) % features.length;

        // Update ref
        currentPageRef.current = nextIndex;

        try {
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        } catch (error) {
          // Fallback if scrollToIndex fails
          flatListRef.current?.scrollToOffset({
            offset: nextIndex * 136, // item width + margin
            animated: true,
          });
        }
      }
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [isAutoPlaying, autoPlayInterval]);

  const handleScrollBegin = () => {
    setIsAutoPlaying(false);
  };

  const handleScrollEnd = () => {
    // Resume auto play after 5 seconds user stops scrolling
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = 136; // item width + margin

    // Calculate index based on scroll position
    const scrollPosition = contentOffsetX / itemWidth;
    const newIndex = Math.round(scrollPosition);
    const clampedIndex = Math.min(Math.max(newIndex, 0), features.length - 1);

    // Update ref for auto-play synchronization
    currentPageRef.current = clampedIndex;
  };

  const renderFeatureItem = ({ item, index }: { item: FeatureButton; index: number }) => (
    <TouchableOpacity
      style={styles.featureCard}
      onPress={() => handleFeaturePress(item, index)}
      activeOpacity={0.8}
    >
      <View style={[styles.featureIconWrapper, { backgroundColor: item.color }]}>
        {item.icon}
      </View>
      <Text style={styles.featureText} numberOfLines={2}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.floatingCard}>
        <View style={styles.subheaderContainer}>
          <Ionicons name="sparkles" size={16} color="#F59E0B" style={styles.sparkleIcon} />
          <Text style={styles.featuresSubheader}>
            See how we <Text style={styles.highlightedText}>outsmart</Text> your favorite GPT
          </Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={features}
          renderItem={renderFeatureItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          snapToInterval={136} // item width + margin (120 + 8*2)
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={styles.featuresSection}
          style={styles.scrollView}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onScrollBeginDrag={handleScrollBegin}
          onScrollEndDrag={handleScrollEnd}
          onMomentumScrollEnd={handleScrollEnd}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  floatingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  subheaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  sparkleIcon: {
    marginRight: 6,
  },
  featuresSubheader: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  highlightedText: {
    fontWeight: "700",
    color: "#F59E0B",
  },
  scrollView: {
    flexGrow: 0,
  },
  featuresSection: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  featureCard: {
    width: 120,
    height: 140,
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 8,
  },
  featureIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0E2235",
    textAlign: "center",
    lineHeight: 16,
  },
});
