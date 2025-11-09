import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SoftSkyBackdrop } from '@/components/backgrounds/SoftSkyBackdrop';

const MOCK_USER = {
  firstName: 'Alexa',
  lastName: 'Lexa',
  dateOfBirth: '01/15/1990',
  subscriptionType: 'Premium',
  region: 'United States',
  tokenUsage: '2,450 / 10,000 tokens',
  tokenUsagePercent: 24.5,
  storageUsage: '1.2 GB / 5 GB',
  storageUsagePercent: 24,
  avatarUrl: 'https://i.imgur.com/4wyTQxp.png',
  avatarInitial: 'A',
};

export default function ProfileScreen() {
  const handleEdit = () => {
    Alert.alert('Coming Soon', 'Edit functionality will be available soon!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/(auth)/auth'),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SoftSkyBackdrop>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
            <Ionicons name="menu" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Profile</Text>
          <TouchableOpacity style={styles.avatarButton} activeOpacity={0.7}>
            <Ionicons name="person-circle-outline" size={32} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit} activeOpacity={0.8}>
            <Ionicons name="pencil" size={16} color="#FFFFFF" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>

          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: MOCK_USER.avatarUrl }} style={styles.avatar} />
              <View style={styles.avatarBadge}>
                <Text style={styles.avatarBadgeText}>{MOCK_USER.avatarInitial}</Text>
              </View>
            </View>
          </View>

          <View style={styles.formSection}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>First Name</Text>
              <View style={styles.fieldInput}>
                <Text style={styles.fieldValue}>{MOCK_USER.firstName}</Text>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Last Name</Text>
              <View style={styles.fieldInput}>
                <Text style={styles.fieldValue}>{MOCK_USER.lastName}</Text>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Subscription Type</Text>
              <View style={styles.fieldInput}>
                <Text style={styles.fieldValue}>{MOCK_USER.subscriptionType}</Text>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Region</Text>
              <View style={styles.fieldInputWithIcon}>
                <Text style={styles.fieldValue}>{MOCK_USER.region}</Text>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Token Usage</Text>
              <View style={styles.usageBar}>
                <Text style={styles.usageText}>{MOCK_USER.tokenUsage}</Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${MOCK_USER.tokenUsagePercent}%` },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Storage Usage</Text>
              <View style={styles.usageBar}>
                <Text style={styles.usageText}>{MOCK_USER.storageUsage}</Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${MOCK_USER.storageUsagePercent}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
  menuButton: {
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
  avatarButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#14213D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E7EB',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  formSection: {
    gap: 20,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  fieldInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldInputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldValue: {
    fontSize: 15,
    color: '#4B5563',
  },
  usageBar: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  usageText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2B8CAF',
    borderRadius: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
