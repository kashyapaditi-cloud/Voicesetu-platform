export interface Ward {
  id: number;
  name: string;
  population: number;
  households: number;
  area: number;
  infrastructureScore: number;
  complaintVolume: number;
  invisibleCitizens: number;
  coordinates: { x: number; y: number };
}

export interface Submission {
  id: string;
  content: string;
  language: string;
  originalText: string;
  wardId: number;
  category: string;
  cluster: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  sentiment: number;
  createdAt: string;
}

export interface Priority {
  id: string;
  title: string;
  description: string;
  category: string;
  cost: number;
  citizensBenefited: number;
  aiConfidence: number;
  impactScore: number;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  wardId: number;
  evidence: Evidence[];
  tradeoffs: string[];
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
}

export interface Evidence {
  type: 'citizen_voice' | 'infrastructure' | 'demographic' | 'budget';
  title: string;
  description: string;
  source: string;
  weight: number;
}

export interface Infrastructure {
  id: string;
  type: 'school' | 'hospital' | 'road' | 'water_supply' | 'power' | 'sanitation';
  name: string;
  wardId: number;
  status: 'adequate' | 'stressed' | 'critical';
  capacity: number;
  utilization: number;
  gap: number;
}

export interface DecisionStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  duration: number;
  outputs: string[];
}

export interface BudgetScenario {
  totalBudget: number;
  allocated: number;
  available: number;
  priorities: {
    priorityId: number;
    allocation: number;
    impact: number;
  }[];
}

export const DEMOGRAPHIC_INDICATORS = [
  'population_density',
  'literacy_rate',
  'employment_rate',
  'healthcare_access',
  'infrastructure_index',
  'digital_literacy',
] as const;

export type DemographicIndicator = typeof DEMOGRAPHIC_INDICATORS[number];
