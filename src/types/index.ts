export type RiskLevel = 'SAFE' | 'LOW' | 'MODERATE' | 'CRITICAL';

export type ScamIndicatorCategory = 
  | 'urgency'
  | 'financial'
  | 'impersonation'
  | 'links'
  | 'credentials';

export interface ScamIndicator {
  id: string;
  name: string;
  category: ScamIndicatorCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  matchedSnippet: string;
  weight: number; // 5 to 30 points
  explanation: string;
}

export interface CategoryScore {
  category: ScamIndicatorCategory;
  label: string;
  score: number;        // 0 to 100 for this category
  rawPoints: number;
  indicatorsFound: number;
  weightShare: number;   // category percentage impact on final score
}

export interface UrlFinding {
  url: string;
  domain: string;
  tld: string;
  isSuspiciousTld: boolean;
  hasIpAddress: boolean;
  isShortener: boolean;
  subdomainCount: number;
  hasDeceptiveSubdomain: boolean;
  deceptiveBrandTarget?: string;
  isHttpNotHttps: boolean;
  riskScore: number;
  flags: string[];
  punycodeWarning: boolean;
}

export interface SafetyRecommendation {
  id: string;
  priority: 'IMMEDIATE' | 'CAUTION' | 'REPORT' | 'EDUCATIONAL';
  title: string;
  detail: string;
  badge?: string;
  actionText?: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  inputMessage: string;
  normalizedScore: number; // 0 - 100
  riskLevel: RiskLevel;
  summary: string;
  categoryScores: Record<ScamIndicatorCategory, CategoryScore>;
  indicators: ScamIndicator[];
  urlFindings: UrlFinding[];
  recommendations: SafetyRecommendation[];
  engineType: 'HEURISTIC' | 'AI_ASSISTED';
  aiReasoning?: string;
  disclaimer: string;
}

export interface SyntheticSample {
  id: string;
  title: string;
  channel: 'SMS' | 'EMAIL' | 'WHATSAPP' | 'CHAT';
  category: string;
  expectedRisk: RiskLevel;
  text: string;
  description: string;
  learningPoint: string;
}
