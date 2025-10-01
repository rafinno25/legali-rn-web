import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  route: string;
  color: string;
}

interface QuickActionsSheetProps {
  visible: boolean;
  onClose: () => void;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'crowdfunding',
    icon: <Ionicons name="cash-outline" size={28} color="#10B981" />,
    label: 'Fund Your Litigation',
    route: '/crowdfunding-waiver',
    color: '#10B981',
  },
  {
    id: 'marketplace',
    icon: <MaterialCommunityIcons name="scale-balance" size={28} color="#3B82F6" />,
    label: 'Find a Lawyer',
    route: '/marketplace-onboarding',
    color: '#3B82F6',
  },
  {
    id: 'litigation',
    icon: <MaterialCommunityIcons name="gavel" size={28} color="#7C3AED" />,
    label: 'Build Litigation Case',
    route: '/litigation',
    color: '#7C3AED',
  },
  {
    id: 'documents',
    icon: <Ionicons name="document-text-outline" size={28} color="#3B82F6" />,
    label: 'Draft Documents',
    route: '/documents',
    color: '#3B82F6',
  },
  {
    id: 'red-flag',
    icon: <Ionicons name="warning-outline" size={28} color="#DC2626" />,
    label: 'Red Flag Analysis',
    route: '/red-flag-analysis',
    color: '#DC2626',
  },
];

export function QuickActionsSheet({ visible, onClose }: QuickActionsSheetProps) {
  const handleActionPress = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route as any);
    }, 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Ionicons name="flash" size={24} color="#2B8CAF" />
            <Text style={styles.title}>Quick Actions</Text>
          </View>

          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionItem}
                onPress={() => handleActionPress(action.route)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconCircle, { backgroundColor: `${action.color}15` }]}>
                  {action.icon}
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  actionsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
});
