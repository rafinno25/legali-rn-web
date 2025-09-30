import { AlertCircle, ArrowUpRight, Clock, DollarSign, FileText, TrendingUp } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import OverviewCard from '@/components/portfolio/OverviewCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { formatDate } from '@/lib/utils';
import { mockPortfolioStats } from '@/services/mockData';

const OverviewTab: React.FC = () => {
  const { activeCases, totalReturn, bestPerforming, portfolioRisk, riskProfile, recentActivity } = mockPortfolioStats;

  // Calculate total invested and portfolio value from mock data
  const totalInvested = 7500;
  const portfolioValue = 9600;
  const totalReturns = portfolioValue - totalInvested;


  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* KYC Status Banner */}
      <View className="mx-2 mt-6">
        <View className="bg-green-100 border border-green-200 rounded-lg p-4 flex-row gap-2">
          <AlertCircle size={20} className="mr-4" />
          <Text className="text-black flex-1">
            <Text className="font-bold">KYC Status: Approved</Text> - You can invest in all available cases.
          </Text>
        </View>
      </View>

      <View className="mx-2 mt-6">
        <OverviewCard
          title="Total Invested"
          value={`$${totalInvested.toLocaleString()}`}
          icon={DollarSign}
          fontColor="#000000"
          iconColor="#3b82f6"
        />
        
        <OverviewCard
          title="Portfolio Value"
          value={`$${portfolioValue.toLocaleString()}`}
          icon={TrendingUp}
          fontColor="#000000"
          iconColor="#16a34a"
        />
        
        <OverviewCard
          title="Total Returns"
          value={`+$${totalReturns.toLocaleString()}`}
          icon={ArrowUpRight}
          fontColor="#16a34a"
          iconColor="#16a34a"
        />
        
        <OverviewCard
          title="Active Cases"
          value={activeCases.toString()}
          icon={FileText}
          fontColor="#000000"
          iconColor="#8b5cf6"
        />
      </View>

      {/* Portfolio Performance Section */}
      <View className="mx-2 mb-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <View className="flex-row items-center gap-2">
              <TrendingUp size={20}/>
              <Text className="text-lg font-semibold">
                Portfolio Performance
              </Text>
            </View>
          </CardHeader>
          <CardContent>
            {/* Total Return Rate */}
            <View>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg text-gray-600">
                  Total Return Rate
                </Text>
                <Text className="text-green-600 font-bold text-lg">
                  +{totalReturn.toFixed(1)}%
                </Text>
              </View>
              <View className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <View 
                  className="bg-gray-800 h-4 rounded-full" 
                  style={{ width: `${Math.min(totalReturn, 100)}%` }}
                />
              </View>
            </View>

            {/* Best Performing Case and Portfolio Risk */}
            <View className="flex-row justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Best Performing Case:
                </Text>
                <Text className="text-gray-900 font-bold text-sm">
                  {bestPerforming.case}
                </Text>
                <Text className="text-green-600 font-semibold text-sm">
                  +{bestPerforming.return}% return
                </Text>
              </View>
              
              <View className="flex-1 pl-4">
                <Text className="text-sm font-medium text-gray-600 mb-1">
                  Portfolio Risk:
                </Text>
                <Text className="text-gray-900 font-bold text-sm">
                  {portfolioRisk}
                </Text>
                <Text className="text-orange-600 text-sm">
                  {riskProfile}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Recent Activity Section */}
      <View className="mx-2 mb-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <View className="flex-row items-center gap-2">
              <Clock size={20} color="#374151"/>
              <Text className="text-lg font-semibold">
                Recent Activity
              </Text>
            </View>
          </CardHeader>
          <CardContent>
            <View className="gap-4">
              {recentActivity.map((activity, index) => (
                <View key={index} className="bg-white border border-gray-200 rounded-lg p-3 flex-row items-center">
                  <View 
                    className={`w-3 h-3 rounded-full mr-3 ${
                      activity.status === 'investment received' ? 'bg-green-500' :
                      activity.status === 'investment processed' ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                  />
                  <View className="flex-1">
                    <Text className="font-semibold mb-1">
                      {activity.type}
                    </Text>
                     <Text className="text-gray-600 text-sm">
                       {activity.description} - {formatDate(activity.date)}
                     </Text>
                  </View>
                  <View className="items-end">
                    {activity.amount && (
                      <Text className={`text-sm font-semibold ${
                        activity.status === 'investment received' ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {activity.status === 'investment received' ? '+' : ''}${activity.amount.toLocaleString()}
                      </Text>
                    )}
                    {activity.status === 'case received' && (
                      <Pressable className="bg-gray-200 border border-gray-300 rounded-lg px-3 py-1 mt-1">
                        <Text className="text-gray-700 font-medium text-xs">
                          Update
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>

    </ScrollView>
  );
};

export default OverviewTab;
