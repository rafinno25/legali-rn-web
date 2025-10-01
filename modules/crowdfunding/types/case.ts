export type CaseType = 'Employment' | 'Personal Injury' | 'Contract Dispute' | 'IP/Trade Secrets' | 'Civil Rights';

export type CaseStage = 'filing' | 'discovery' | 'trial_prep' | 'trial' | 'settlement' | 'collection';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface EvidenceStrength {
  emails?: 'weak' | 'moderate' | 'strong';
  witnesses?: number;
  documents?: 'incomplete' | 'partial' | 'complete';
  precedent?: string; // e.g., "78% plaintiff win rate"
}

export interface FinancialProjection {
  fundingNeeded: number;
  damagesSought: number;
  estimatedSettlementMin: number;
  estimatedSettlementMax: number;
  platformFee: number; // percentage
  projectedROIMin: number; // percentage
  projectedROIMax: number; // percentage
  estimatedTimeline: string; // e.g., "18-24 months"
}

export interface StageProgress {
  stage: CaseStage;
  progress: number; // 0-100
  fundingDeployed: number;
  fundingReserved: number;
  isComplete: boolean;
}

export interface CaseUpdate {
  id: string;
  date: string;
  type: 'milestone' | 'court_ruling' | 'risk_change' | 'funding_request' | 'settlement_offer';
  title: string;
  description: string;
}

export interface LitigationCase {
  id: string;
  caseId: string; // e.g., "EMP-001"
  caseType: CaseType;
  title: string;
  plaintiff: string;
  defendant: string;
  claimType: string;
  jurisdiction: string;

  // Financial
  financial: FinancialProjection;

  // Risk assessment
  riskScore: number; // 0-10
  riskLevel: RiskLevel;
  aiRiskAssessment: string;

  // Evidence
  evidenceStrength: EvidenceStrength;

  // Lawyer
  lawyerName: string;
  lawyerRating: string; // e.g., "A+", "B-"
  lawyerWinRate?: number; // percentage

  // Status
  status: 'available' | 'funding' | 'active' | 'settled' | 'closed';
  stage?: CaseStage;
  stageProgress?: number; // 0-100

  // Timeline
  filedDate?: string;
  daysToReview?: number;
  lastUpdate?: string;

  // Investor data (for portfolio view)
  investorData?: {
    amountInvested: number;
    dateInvested: string;
    currentROI: number; // percentage
    stages: StageProgress[];
    updates: CaseUpdate[];
  };
}

export interface PortfolioSummary {
  totalInvested: number;
  activeCases: number;
  casesInSettlement: number;
  completedCases: number;
  portfolioIRR: number; // percentage
  totalWins: number;
  totalLosses: number;
}
