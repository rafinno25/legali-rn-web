import { Eye } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { formatDate } from '@/lib/utils';

interface InvestmentCardProps {
  id: string;
  title: string;
  description: string;
  investment: number;
  expectedReturnMin: number;
  expectedReturnMax: number;
  investmentDate: string;
  escrowStatus: string;
  caseProgress: string;
  status: string;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  id,
  title,
  description,
  investment,
  expectedReturnMin,
  expectedReturnMax,
  investmentDate,
  escrowStatus,
  caseProgress,
  status,
}) => {
  return (
    <Card className="my-2">
      <CardHeader>
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text variant="h4" className="text-xl font-semibold mb-2">
              {title}
            </Text>
          </View>
          <Badge 
            variant="secondary" 
            className={`${
              status === 'active' 
                ? 'bg-green-100 border-green-200' 
                : 'bg-gray-100 border-gray-200'
            } px-3 py-1 rounded-md`}
          >
            <Text className={`text-xs font-medium capitalize ${
              status === 'active' ? 'text-green-700' : 'text-gray-700'
            }`}>
              {status}
            </Text>
          </Badge>
        </View>
        
        <Text variant="muted" className="text-gray-600 leading-5">
          {description}
        </Text>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Investment Details Grid */}
        <View className="flex-row justify-between">
          {/* Left Column */}
          <View className="flex-1 pr-4">
            <View className="mb-4">
              <Text variant="muted" className="text-gray-500 text-sm mb-1">
                Investment
              </Text>
              <Text variant="large" className="text-black font-semibold text-lg">
                ${investment.toLocaleString()}
              </Text>
            </View>
            
            <View>
              <Text variant="muted" className="text-gray-500 text-sm mb-1">
                Investment Date
              </Text>
              <Text variant="large" className="text-black font-semibold">
                {formatDate(investmentDate)}
              </Text>
            </View>
          </View>
          
          {/* Right Column */}
          <View className="flex-1 pl-4">
            <View className="mb-4">
              <Text variant="muted" className="text-gray-500 text-sm mb-1">
                Expected Return
              </Text>
              <Text className="text-green-600 font-semibold text-lg">
                {expectedReturnMin} - {expectedReturnMax}
              </Text>
            </View>
            
            <View>
              <Text variant="muted" className="text-gray-500 text-sm mb-1">
                Escrow Status
              </Text>
              <View className="border border-blue-200 rounded-md px-3 self-start">
                <Text className="text-blue-600 font-medium text-sm">
                  {escrowStatus}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-200 my-2" />

        {/* Footer */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text variant="muted" className="text-gray-700">
              Case Progress: {caseProgress}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={() => {}}
            className="flex-row items-center border border-gray-200 rounded-lg py-2 gap-3 px-3"
          >
            <Eye size={16}/>
            <Text className="font-medium text-xs">
              View Case
            </Text>
          </TouchableOpacity>
        </View>
      </CardContent>
    </Card>
  );
};

export default InvestmentCard;