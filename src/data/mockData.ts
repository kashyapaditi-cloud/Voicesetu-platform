import type { Ward, Submission, Priority, Infrastructure, DecisionStep, Evidence } from '../types';

export const CONSTITUENCY_STATS = {
  population: 182430,
  schools: 42,
  hospitals: 8,
  roadProjects: 19,
  submissions: 3248,
  wards: 12,
  totalBudget: 48.5, // Crore
  utilizedBudget: 32.7,
  availableBudget: 15.8,
};

export const wards: Ward[] = [
  { id: 1, name: 'Ward 1 - Central Market', population: 18234, households: 4558, area: 2.1, infrastructureScore: 78, complaintVolume: 412, invisibleCitizens: 0, coordinates: { x: 50, y: 45 } },
  { id: 2, name: 'Ward 2 - Railway Station Area', population: 21450, households: 5362, area: 3.2, infrastructureScore: 72, complaintVolume: 523, invisibleCitizens: 12, coordinates: { x: 35, y: 30 } },
  { id: 3, name: 'Ward 3 - Industrial Zone', population: 15680, households: 3920, area: 4.5, infrastructureScore: 65, complaintVolume: 289, invisibleCitizens: 45, coordinates: { x: 65, y: 60 } },
  { id: 4, name: 'Ward 4 - Residential North', population: 19820, households: 4955, area: 2.8, infrastructureScore: 82, complaintVolume: 342, invisibleCitizens: 8, coordinates: { x: 40, y: 20 } },
  { id: 5, name: 'Ward 5 - Lake View', population: 12450, households: 3112, area: 3.1, infrastructureScore: 88, complaintVolume: 156, invisibleCitizens: 0, coordinates: { x: 70, y: 35 } },
  { id: 6, name: 'Ward 6 - Government Colony', population: 18430, households: 4607, area: 2.4, infrastructureScore: 58, complaintVolume: 612, invisibleCitizens: 89, coordinates: { x: 25, y: 55 } },
  { id: 7, name: 'Ward 7 - Agricultural Belt', population: 9820, households: 2455, area: 5.8, infrastructureScore: 55, complaintVolume: 134, invisibleCitizens: 156, coordinates: { x: 80, y: 70 } },
  { id: 8, name: 'Ward 8 - Tech Park', population: 14560, households: 3640, area: 2.2, infrastructureScore: 91, complaintVolume: 98, invisibleCitizens: 0, coordinates: { x: 60, y: 15 } },
  { id: 9, name: 'Ward 9 - River Side', population: 16780, households: 4195, area: 3.4, infrastructureScore: 68, complaintVolume: 445, invisibleCitizens: 67, coordinates: { x: 15, y: 75 } },
  { id: 10, name: 'Ward 10 - Old Town', population: 21340, households: 5335, area: 2.9, infrastructureScore: 61, complaintVolume: 578, invisibleCitizens: 123, coordinates: { x: 45, y: 80 } },
  { id: 11, name: 'Ward 11 - New Development', population: 12890, households: 3222, area: 4.1, infrastructureScore: 84, complaintVolume: 201, invisibleCitizens: 5, coordinates: { x: 85, y: 50 } },
  { id: 12, name: 'Ward 12 - Border Area', population: 10990, households: 2748, area: 6.2, infrastructureScore: 48, complaintVolume: 89, invisibleCitizens: 234, coordinates: { x: 20, y: 40 } },
];

export const submissions: Submission[] = [
  { id: 's1', content: 'No water supply in our area for past 3 weeks', language: 'en', originalText: 'No water supply in our area for past 3 weeks', wardId: 6, category: 'water_supply', cluster: 'water_infrastructure', priority: 'critical', sentiment: -0.8, createdAt: '2026-07-01' },
  { id: 's2', content: 'पानी नहीं आ रहा है हमारे इलाके में', language: 'hi', originalText: 'पानी नहीं आ रहा है हमारे इलाके में', wardId: 6, category: 'water_supply', cluster: 'water_infrastructure', priority: 'critical', sentiment: -0.75, createdAt: '2026-07-01' },
  { id: 's3', content: 'Government school building is too small for all children', language: 'en', originalText: 'Government school building is too small for all children', wardId: 6, category: 'education', cluster: 'education_infrastructure', priority: 'high', sentiment: -0.5, createdAt: '2026-07-02' },
  { id: 's4', content: 'स्कूल में जगह नहीं है बच्चों के लिए', language: 'hi', originalText: 'स्कूल में जगह नहीं है बच्चों के लिए', wardId: 6, category: 'education', cluster: 'education_infrastructure', priority: 'high', sentiment: -0.52, createdAt: '2026-07-02' },
  { id: 's5', content: 'Road from main road to our village is completely broken', language: 'en', originalText: 'Road from main road to our village is completely broken', wardId: 12, category: 'roads', cluster: 'road_infrastructure', priority: 'high', sentiment: -0.6, createdAt: '2026-07-01' },
  { id: 's6', content: 'Primary health center has no doctor since months', language: 'en', originalText: 'Primary health center has no doctor since months', wardId: 7, category: 'healthcare', cluster: 'healthcare_access', priority: 'critical', sentiment: -0.85, createdAt: '2026-07-03' },
  { id: 's7', content: 'बिजली कटती रहती है रोज़', language: 'hi', originalText: 'बिजली कटती रहती है रोज़', wardId: 3, category: 'power', cluster: 'power_infrastructure', priority: 'medium', sentiment: -0.4, createdAt: '2026-07-02' },
  { id: 's8', content: 'Street lights not working since 2 months', language: 'en', originalText: 'Street lights not working since 2 months', wardId: 10, category: 'street_lighting', cluster: 'urban_infrastructure', priority: 'low', sentiment: -0.25, createdAt: '2026-07-04' },
  { id: 's9', content: 'Sewage overflowing near our homes', language: 'en', originalText: 'Sewage overflowing near our homes', wardId: 9, category: 'sanitation', cluster: 'sanitation_infrastructure', priority: 'high', sentiment: -0.7, createdAt: '2026-07-01' },
  { id: 's10', content: 'Need more public transport buses on route 12', language: 'en', originalText: 'Need more public transport buses on route 12', wardId: 2, category: 'transport', cluster: 'public_transport', priority: 'medium', sentiment: -0.35, createdAt: '2026-07-03' },
];

export const infrastructure: Infrastructure[] = [
  { id: 'i1', type: 'school', name: 'Government Primary School Ward 6', wardId: 6, status: 'critical', capacity: 300, utilization: 145, gap: 135 },
  { id: 'i2', type: 'school', name: 'Government Middle School Ward 3', wardId: 3, status: 'stressed', capacity: 500, utilization: 98, gap: -410 },
  { id: 'i3', type: 'hospital', name: 'Primary Health Center Ward 7', wardId: 7, status: 'critical', capacity: 50, utilization: 180, gap: 40 },
  { id: 'i4', type: 'road', name: 'Ward 12 Access Road', wardId: 12, status: 'critical', capacity: 100, utilization: 150, gap: 50 },
  { id: 'i5', type: 'water_supply', name: 'Water Tank Ward 6', wardId: 6, status: 'critical', capacity: 200, utilization: 165, gap: 130 },
  { id: 'i6', type: 'power', name: 'Transformer Ward 3', wardId: 3, status: 'stressed', capacity: 100, utilization: 120, gap: 20 },
  { id: 'i7', type: 'sanitation', name: 'Sewage Treatment Plant Ward 9', wardId: 9, status: 'stressed', capacity: 100, utilization: 115, gap: 15 },
  { id: 'i8', type: 'school', name: 'Model School Ward 8', wardId: 8, status: 'adequate', capacity: 800, utilization: 65, gap: -280 },
];

const schoolEvidence: Evidence[] = [
  { type: 'citizen_voice', title: 'Citizen Submissions', description: '423 citizens reported school overcrowding issues across Ward 6', source: 'Voice Analysis Engine', weight: 0.35 },
  { type: 'infrastructure', title: 'Infrastructure Assessment', description: 'Current school capacity at 145% utilization with 135 students on waitlist', source: 'Infrastructure Audit 2026', weight: 0.30 },
  { type: 'demographic', title: 'Population Analysis', description: 'Growth rate of 12% in school-age population projected over next 5 years', source: 'Census Projections', weight: 0.20 },
  { type: 'budget', title: 'Budget Impact', description: 'Expansion cost: 4.2 Crore. Revenue increase potential: 1.8 Cr/yr from improved education outcomes', source: 'Fiscal Impact Model', weight: 0.15 },
];

const waterEvidence: Evidence[] = [
  { type: 'citizen_voice', title: 'Citizen Submissions', description: '892 complaints received in 30 days about water scarcity', source: 'Voice Analysis Engine', weight: 0.40 },
  { type: 'infrastructure', title: 'Infrastructure Assessment', description: 'Water tank operating at 165% capacity with 65% distribution efficiency', source: 'Hydraulic Assessment', weight: 0.25 },
  { type: 'demographic', title: 'Population Analysis', description: '1,843 households affected with average 3-hour daily wait for water', source: 'Field Survey', weight: 0.20 },
  { type: 'budget', title: 'Budget Impact', description: 'New pipeline cost: 3.1 Crore. Maintenance savings: 45 Lakh/yr', source: 'Fiscal Impact Model', weight: 0.15 },
];

export const priorities: Priority[] = [
  {
    id: 'p1',
    title: 'Expand Government School in Ward 6',
    description: 'Add 8 new classrooms, science lab, and library to accommodate overflow students',
    category: 'education',
    cost: 4.2,
    citizensBenefited: 18430,
    aiConfidence: 96,
    impactScore: 92,
    urgency: 'critical',
    wardId: 6,
    evidence: schoolEvidence,
    tradeoffs: ['Delayed renovation of Ward 3 school (6 months)', 'Temporary traffic congestion during construction'],
    status: 'pending',
  },
  {
    id: 'p2',
    title: 'Install New Water Pipeline Network - Ward 6',
    description: '5km new pipeline connecting to main reservoir with 24x7 supply',
    category: 'water_supply',
    cost: 3.1,
    citizensBenefited: 15640,
    aiConfidence: 94,
    impactScore: 88,
    urgency: 'critical',
    wardId: 6,
    evidence: waterEvidence,
    tradeoffs: ['Road excavation for 3 months', 'Diversion of funds from beautification projects'],
    status: 'pending',
  },
  {
    id: 'p3',
    title: 'Construct Ward 12 Access Road',
    description: '4.5km all-weather road connecting 5 villages to main highway',
    category: 'roads',
    cost: 5.8,
    citizensBenefited: 10990,
    aiConfidence: 91,
    impactScore: 85,
    urgency: 'high',
    wardId: 12,
    evidence: [
      { type: 'citizen_voice', title: 'Citizen Submissions', description: '156 residents reported travel difficulties', source: 'Voice Analysis Engine', weight: 0.30 },
      { type: 'infrastructure', title: 'Infrastructure Gap', description: 'Only dirt track connecting to highway - 12km detour required', source: 'Road Survey', weight: 0.35 },
      { type: 'demographic', title: 'Economic Impact', description: 'Access to markets could increase rural incomes by 35%', source: 'Economic Impact Study', weight: 0.20 },
      { type: 'budget', title: 'Budget Impact', description: 'Construction cost: 5.8 Crore over 18 months', source: 'PWD Estimates', weight: 0.15 },
    ],
    tradeoffs: ['Land acquisition required from 12 farmers', 'Construction during monsoon not feasible'],
    status: 'under_review',
  },
  {
    id: 'p4',
    title: 'Staff Primary Health Center - Ward 7',
    description: 'Hire 2 doctors, 4 nurses, and essential medical equipment',
    category: 'healthcare',
    cost: 1.8,
    citizensBenefited: 9820,
    aiConfidence: 89,
    impactScore: 78,
    urgency: 'critical',
    wardId: 7,
    evidence: [
      { type: 'citizen_voice', title: 'Health Emergencies', description: '23 emergency cases reported delays in last quarter', source: 'Hospital Records', weight: 0.35 },
      { type: 'infrastructure', title: 'Staff Shortage', description: 'No permanent doctor for 60+ days. Only 1 nurse on duty', source: 'Health Dept Report', weight: 0.30 },
      { type: 'demographic', title: 'Health Metrics', description: 'Infant mortality rate 2.3x higher than district average', source: 'Health Survey 2025', weight: 0.20 },
      { type: 'budget', title: 'Budget Impact', description: 'Recurring cost: 48 Lakh/yr. Preventive care savings: 90 Lakh/yr', source: 'Health Economics', weight: 0.15 },
    ],
    tradeoffs: ['Ongoing staff salary commitment required', 'May draw staff from neighboring facilities'],
    status: 'pending',
  },
  {
    id: 'p5',
    title: 'Upgrade Sewage Treatment Plant - Ward 9',
    description: 'Increase capacity by 50% with modern filtration technology',
    category: 'sanitation',
    cost: 2.4,
    citizensBenefited: 16780,
    aiConfidence: 87,
    impactScore: 75,
    urgency: 'high',
    wardId: 9,
    evidence: [
      { type: 'citizen_voice', title: 'Health Complaints', description: '89 cases of waterborne illness linked to sewage overflow', source: 'Health Dept', weight: 0.30 },
      { type: 'infrastructure', title: 'Plant Status', description: 'Operating at 115% capacity with frequent breakdowns', source: 'Infrastructure Audit', weight: 0.35 },
      { type: 'demographic', title: 'Affected Population', description: '3,200 households directly affected by sewage backups', source: 'Sanitation Survey', weight: 0.20 },
      { type: 'budget', title: 'Budget Impact', description: 'Upgrade cost: 2.4 Crore. Environmental fines avoided: 50 Lakh/yr', source: 'Fiscal Analysis', weight: 0.15 },
    ],
    tradeoffs: ['Plant shutdown required for 15 days during upgrade', 'Temporary odor issues during installation'],
    status: 'under_review',
  },
];

export const decisionSteps: DecisionStep[] = [
  { id: 'd1', title: 'Citizen Voice Collection', description: 'Aggregating submissions from voice calls, WhatsApp, and web forms', status: 'pending', duration: 2000, outputs: ['3,248 submissions aggregated', '12 languages detected'] },
  { id: 'd2', title: 'Language Understanding & Translation', description: 'Processing multilingual submissions using semantic analysis', status: 'pending', duration: 2500, outputs: ['95% accuracy achieved', '189 unique issues identified'] },
  { id: 'd3', title: 'Issue Clustering', description: 'Grouping similar problems across wards and languages', status: 'pending', duration: 3000, outputs: ['47 distinct clusters formed', 'Cross-lingual matching active'] },
  { id: 'd4', title: 'Infrastructure Gap Analysis', description: 'Mapping issues to infrastructure deficits and utilization metrics', status: 'pending', duration: 2500, outputs: ['8 critical gaps identified', '3 wards flagged for intervention'] },
  { id: 'd5', title: 'Population Impact Modeling', description: 'Calculating affected population and demographic factors', status: 'pending', duration: 2000, outputs: ['68,430 citizens directly impacted', 'Demographic vulnerability score: 7.2'] },
  { id: 'd6', title: 'Budget Optimization', description: 'Running constraint-based allocation for maximum impact within budget', status: 'pending', duration: 3500, outputs: ['48.5 Cr total budget', 'Optimal allocation computed'] },
  { id: 'd7', title: 'Impact Prediction', description: 'Forecasting ROI and citizen satisfaction outcomes', status: 'pending', duration: 2000, outputs: ['5-year impact projection ready', 'Citizen satisfaction delta: +34%'] },
  { id: 'd8', title: 'Recommendation Synthesis', description: 'Generating prioritized recommendation with evidence backing', status: 'pending', duration: 1500, outputs: ['Top 5 priorities ranked', 'Evidence chain validated'] },
];

export const aiChatResponses = {
  school: `Based on comprehensive analysis of citizen submissions and infrastructure data, expanding Government School in Ward 6 presents the highest ROI opportunity.\n\n**Evidence Summary:**\n- 423 citizens reported overcrowding issues\n- Current utilization at 145% with 135 students waitlisted\n- Projected 12% growth in school-age population\n\n**AI Confidence: 96%**\nThe recommendation draws from 342 infrastructure audits, 3,248 citizen submissions, and demographic projections through 2030. This addresses the largest infrastructure gap affecting the most citizens per rupee invested.`,

  budget: `The budget optimizer recommends a phased approach:\n\n**Phase 1 (Immediate - 15.8 Cr available):**\n1. School Expansion Ward 6: 4.2 Cr\n2. Water Pipeline Ward 6: 3.1 Cr\n3. PHC Staffing Ward 7: 1.8 Cr\n4. Sewage Plant Upgrade Ward 9: 2.4 Cr\n5. Reserve for contingencies: 4.3 Cr\n\n**Phase 2 (Next fiscal - 12 Cr projected):**\n- Ward 12 Access Road: 5.8 Cr\n- Remaining infrastructure gaps\n\nThis allocation maximizes citizen impact at 68,430 beneficiaries within current constraints.`,

  invisible: `**Invisible Citizens Analysis:**\n\n723 citizens across 4 wards are "invisible" - underserved populations with low complaint volumes but high structural gaps.\n\n**Key Findings:**\n- Ward 12 (Border Area): 234 invisible citizens\n  Issue: Remote location, poor digital connectivity\n  Action: Mobile registration units + weekly visits\n\n- Ward 7 (Agricultural Belt): 156 invisible citizens\n  Issue: Farming community, seasonal migration patterns\n  Action: Partner with agricultural cooperatives\n\n- Ward 10 (Old Town): 123 invisible citizens\n  Issue: Elderly population, technology literacy barriers\n  Action: Door-to-door surveys + community champions\n\n**Infrastructure Gap Correlation:** Wards with invisible citizens have 2.3x higher infrastructure deficit scores.`,

  cluster: `**Cross-Lingual Issue Clustering:**\n\nThe system detected 47 distinct issue clusters across submissions. Example of semantic clustering:\n\n**Water Infrastructure Cluster (892 submissions):**\n- English: "No water supply in our area"\n- Hindi: "पानी नहीं आ रहा है"\n- Regional: "தண்ணீர் வரவில்லை"\n- Semantic similarity: 0.94\n\nThis cluster represents 27% of all submissions and maps to Ward 6 infrastructure gaps.\n\n**Education Cluster (423 submissions):**\n- English: "School building too small"\n- Hindi: "स्कूल में जगह नहीं"\n- Semantic similarity: 0.91\n\nLanguage processing accuracy: 95% across 12 languages with dialect variation handling.`,
};

export function calculateBudgetAllocation(totalBudget: number): Priority[] {
  const sortedPriorities = [...priorities].sort((a, b) => b.impactScore - a.impactScore);
  let remainingBudget = totalBudget;

  return sortedPriorities.map(priority => {
    const canFund = remainingBudget >= priority.cost;
    if (canFund) {
      remainingBudget -= priority.cost;
    }
    return {
      ...priority,
      status: canFund ? 'approved' as const : 'pending' as const,
    };
  });
}

export function getWardHeatmapData(metric: 'population' | 'complaints' | 'infrastructure' | 'invisible') {
  const maxMetric = Math.max(...wards.map(w => {
    switch (metric) {
      case 'population': return w.population;
      case 'complaints': return w.complaintVolume;
      case 'infrastructure': return 100 - w.infrastructureScore;
      case 'invisible': return w.invisibleCitizens;
    }
  }));

  return wards.map(ward => {
    const value = metric === 'infrastructure' ? 100 - ward.infrastructureScore :
      metric === 'population' ? ward.population :
      metric === 'complaints' ? ward.complaintVolume :
      ward.invisibleCitizens;

    return {
      ward: ward,
      value: value,
      normalizedValue: value / maxMetric,
      intensity: value / maxMetric,
    };
  });
}
