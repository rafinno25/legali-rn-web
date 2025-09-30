import { Download } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import InvestmentCard from '@/components/portfolio/InvestmentCard';
import { Text } from '@/components/ui/text';
import { mockCases } from '@/services/mockData';

const InvestmentTab: React.FC = () => {
  return (
    <ScrollView className="flex-1">
      <View className="mx-2 mt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold">My Investments</Text>
          <Pressable 
            onPress={() => {}}
            className="flex-row items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200"
          >
            <Download size={14} />
            <Text className="text-sm">Export Report</Text>
          </Pressable>
        </View>

        {mockCases.map((investment) => (
          <InvestmentCard key={investment.id} {...investment} />
        ))}
      </View>
    </ScrollView>
  );
};

export default InvestmentTab;
