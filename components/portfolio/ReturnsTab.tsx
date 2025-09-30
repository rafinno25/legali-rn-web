import { Download } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import PaymentHistoryCard from '@/components/portfolio/PaymentHistoryCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { mockReturnsData } from '@/services/mockData';

const ReturnsTab: React.FC = () => {
  const { overallReturnRate, totalReturnsEarned, completedCases, recentReturns } = mockReturnsData;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="mx-2 mt-6">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-gray-900 flex-1 mr-4">
            Returns & Payments
          </Text>
          <Pressable 
            onPress={() => {}}
            className="flex-row items-center gap-4 bg-white px-3 py-2 rounded-lg border border-gray-200"
          >
            <Download size={14} />
            <Text className="text-sm">Tax Documents</Text>
          </Pressable>
        </View>
      </View>

      {/* Return Summary Card */}
      <View className="mx-2 mb-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <Text className="text-lg font-semibold text-gray-900">
              Return Summary
            </Text>
          </CardHeader>
          <CardContent>
            {/* Overall Return Rate Card */}
            <View className="bg-green-50 rounded-lg p-4 mb-4 items-center">
              <Text className="text-3xl gra text-green-700 font-semibold">
                +{overallReturnRate.toFixed(1)}%
              </Text>
              <Text className="text-center text-gray-600">
                Overall Return Rate
              </Text>
            </View>

            {/* Total Returns Earned Card */}
            <View className="bg-blue-50 rounded-lg p-4 mb-4 items-center">
              <Text className="text-3xl gra text-blue-700 font-semibold">
                ${totalReturnsEarned.toLocaleString()}
              </Text>
              <Text className="text-center text-gray-600">
                Total Returns Earned
              </Text>
            </View>

            {/* Completed Cases Card */}
            <View className="bg-purple-50 rounded-lg p-4 items-center">
              <Text className="text-3xl gra text-purple-700 font-semibold">
                {completedCases}
              </Text>
              <Text className="text-center text-gray-600">
                Completed Cases
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>


      {/* Recent Returns Section */}
      <View className="mx-2 mb-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <Text className="text-lg font-semibold">
              Payment History
            </Text>
          </CardHeader>
          <CardContent>
            <View className="gap-4">
              {recentReturns.map((returnItem, index) => (
                <PaymentHistoryCard 
                  key={returnItem.id || index} 
                  returnItem={returnItem} 
                />
              ))}
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
};

export default ReturnsTab;
