import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';

export default function InvestmentLayout() {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  // CSS-based approach - let React Native handle the wrapping automatically
  const getBadgeStyle = () => ({
    maxWidth: (screenWidth - 32) * 0.15,
    minWidth: 85,
  });

  return (
    <View className="flex-1">
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <View>
            <View 
              className="flex-row items-center mb-2 flex-wrap"
            >
              <View 
                className="flex-shrink-1 min-w-0 flex-1"
              >
                <Text className="text-4xl font-bold">My Portfolio</Text>
                <Text className="text-gray-600">Welcome back, John Doe</Text>
              </View>
              <View 
                className="flex-row gap-2 items-end margin-left-auto"
              >
                <Badge 
                  className="bg-green-100 border-green-200" 
                  style={getBadgeStyle()}
                >
                  <Text 
                    className="text-green-700 font-bold text-xs" 
                    numberOfLines={2}
                  >
                    KYC Approved
                  </Text>
                </Badge>
                <Badge 
                  className="bg-purple-100 border-purple-200" 
                  style={getBadgeStyle()}
                >
                  <Text 
                    className="text-purple-700 font-bold text-xs" 
                    numberOfLines={2}
                  >
                    Accredited Investor
                  </Text>
                </Badge>
              </View>
            </View>
        </View>
      </View>
      
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
