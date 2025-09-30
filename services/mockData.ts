export const mockCases = [
  {
    id: '1',
    title: 'Employment Discrimination Class Action',
    description: 'Class action lawsuit against Fortune 500 company for workplace discrimination affecting 200+ employees.',
    investment: 5000,
    expectedReturnMin: 12500,
    expectedReturnMax: 20000,
    investmentDate: '07-09-2024',
    escrowStatus: 'Held',
    caseProgress: 'Active Funding',
    status: 'active',
  },
  {
    id: '2',
    title: 'Personal Injury Settlement',
    description: 'Medical malpractice lawsuit with clear negligence and documented damages against major hospital system.',
    investment: 2500,
    expectedReturnMin: 4600,
    expectedReturnMax: 6000,
    investmentDate: '05-19-2024',
    escrowStatus: 'Released',
    caseProgress: 'Settlement Reached',
    status: 'active',
  }
];

export const mockPortfolioStats = {
  activeCases: 2,
  totalReturn: 28.0,
  bestPerforming: {
    case: 'Personal Injury Settlement',
    return: 84
  },
  portfolioRisk: 'Moderate',
  riskProfile: 'Mixed risk profile',
  recentActivity: [
    {
      type: 'Investment return received',
      amount: 2100,
      description: 'Personal Injury Settlement',
      date: '06-24-2024',
      status: 'investment received'
    },
    {
      type: 'New investment processed',
      amount: 5000,
      description: 'Employment Discrimination Case',
      date: '06-09-2024',
      status: 'investment processed'
    },
    {
      type: 'Case update received',
      description: 'Discovery phase completed',
      date: '06-19-2024',
      status: 'case received'
    }
  ]
};

export const mockReturnsData = {
  overallReturnRate: 28,
  totalReturnsEarned: 2100,
  completedCases: 1,
  recentReturns: [
    {
      id: '3',
      title: 'Return Payment Received',
      amount: 2100,
      description: 'Personal Injury Settlement',
      date: '06-24-2024',
      status: 'completed',
      returnRate: 84
    },
    {
      id: '1',
      title: 'Investment Made',
      amount: -5000,
      description: 'Employment Discrimination Case',
      date: '06-09-2024',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Investment Made',
      amount: -2500,
      description: 'Personal Injury Settlement',
      date: '05-19-2024',
      status: 'pending'
    }
  ]
};
