import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import InvestmentTab from '@/components/portfolio/InvestmentTab';
import OverviewTab from '@/components/portfolio/OverviewTab';
import ReturnsTab from '@/components/portfolio/ReturnsTab';
import Tabs, { TabItem } from '@/components/ui/tabs';

export default function PortfolioScreen() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'investments', label: 'Investments' },
    { id: 'returns', label: 'Returns' },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'investments' && <InvestmentTab />}
        {activeTab === 'returns' && <ReturnsTab />}
      </View>
    </ScrollView>
  );
}
