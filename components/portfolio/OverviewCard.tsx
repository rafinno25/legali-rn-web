import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

interface OverviewCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  fontColor?: string;
  iconColor: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  icon: Icon,
  fontColor = "#000000",
  iconColor,
}) => {
  return (
    <View className="mb-6">
      <Card className="bg-white shadow-sm">
        <CardContent className="py-0.5 px-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-600">
                {title}
              </Text>
              <Text className="text-2xl font-bold" style={{ color: fontColor }}>
                {value}
              </Text>
            </View>
            <Icon size={32} color={iconColor} />
          </View>
        </CardContent>
      </Card>
    </View>
  );
};

export default OverviewCard;
