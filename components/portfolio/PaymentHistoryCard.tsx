import { ArrowDownRight, ArrowUpRight } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { formatDate } from '@/lib/utils';

interface PaymentHistoryItem {
  id: string;
  title: string;
  amount: number;
  description: string;
  date: string;
  status: string;
  returnRate?: number;
}

interface PaymentHistoryCardProps {
  returnItem: PaymentHistoryItem;
}

const PaymentHistoryCard: React.FC<PaymentHistoryCardProps> = ({ returnItem }) => {
  return (
    <View className={`rounded-lg p-4 ${
      returnItem.returnRate && returnItem.returnRate > 0 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-white border border-gray-200'
    }`}>
      <View className="flex-row items-center">
        <View className="mr-3">
          {returnItem.returnRate && returnItem.returnRate > 0 ? (
            <ArrowUpRight size={12} color="#16a34a" />
          ) : (
            <ArrowDownRight size={12} color="#6b7280" />
          )}
        </View>
        
        <View className="flex-1 pr-4">
          <Text className="font-semibold text-sm mb-1">
            {returnItem.title}
          </Text>
          <Text className="text-gray-600 text-xs mb-1">
            {returnItem.description} - Case #{returnItem.id}
          </Text>
          <Text className="text-gray-500 text-xs">
            {formatDate(returnItem.date)}
          </Text>
        </View>
        
        <View className="items-end">
          <Text className={`font-bold text-lg ${
            returnItem.amount >= 0 ? 'text-green-600' : 'text-gray-900'
          }`}>
            {returnItem.amount >= 0 ? '+' : '-'}${Math.abs(returnItem.amount).toLocaleString()}
          </Text>
          <Text className="text-xs text-gray-600">
            {returnItem.status === 'completed' ? `${returnItem.returnRate}% return` : 'Investment'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentHistoryCard;
