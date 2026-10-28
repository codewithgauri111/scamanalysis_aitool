import {
  ScamIndicator,
  ScamIndicatorCategory,
  CategoryScore,
  RiskLevel,
  UrlFinding
} from '../types';

// Category weight shares in the composite score calculation
const CATEGORY_WEIGHTS: Record<ScamIndicatorCategory, number> = {
  urgency: 0.20,       // 20%
  financial: 0.25,     // 25%
  impersonation: 0.20, // 20%
  links: 0.20,         // 20%
  credentials: 0.15    // 15%
};

const CATEGORY_LABELS: Record<ScamIndicatorCategory, string> = {
  urgency: 'Urgency & Pressure',
  financial: 'Financial Demands & Baits',
  impersonation: 'Identity & Authority Spoofing',
  links: 'Malicious / Deceptive Links',
  credentials: 'Credential Harvesting & 2FA'
};

export function calculateScores(
  indicators: ScamIndicator[],
  urlFindings: UrlFinding[]
): {
  normalizedScore: number;
  riskLevel: RiskLevel;
  categoryScores: Record<ScamIndicatorCategory, CategoryScore>;
  summary: string;
} {
  // Group indicators by category
  const indicatorsByCategory: Record<ScamIndicatorCategory, ScamIndicator[]> = {
    urgency: [],
    financial: [],
    impersonation: [],
    links: [],
    credentials: []
  };

  for (const ind of indicators) {
    indicatorsByCategory[ind.category].push(ind);
  }

  // Factor in URL risk into the 'links' category
  const highestUrlRisk = urlFindings.reduce((max, u) => Math.max(max, u.riskScore), 0);
  const totalUrlRisks = urlFindings.length;

  const categoryScores: Record<ScamIndicatorCategory, CategoryScore> = {
    urgency: createCategoryScore('urgency', indicatorsByCategory.urgency),
    financial: createCategoryScore('financial', indicatorsByCategory.financial),
    impersonation: createCategoryScore('impersonation', indicatorsByCategory.impersonation),
    links: createLinkCategoryScore(indicatorsByCategory.links, highestUrlRisk, totalUrlRisks),
    credentials: createCategoryScore('credentials', indicatorsByCategory.credentials)
  };

  // Weighted composite score (0 to 100)
  let compositeScore = 0;
  for (const cat of Object.keys(CATEGORY_WEIGHTS) as ScamIndicatorCategory[]) {
    compositeScore += categoryScores[cat].score * CATEGORY_WEIGHTS[cat];
  }

  // Escalation rule: If a CRITICAL severity indicator exists (e.g. gift cards, OTP stealing, fake warrant),
  // the score should not fall below 70 even if other categories are silent.
  const hasCriticalIndicator = indicators.some(i => i.severity === 'critical');
  const hasCriticalUrl = urlFindings.some(u => u.riskScore >= 70);

  if ((hasCriticalIndicator || hasCriticalUrl) && compositeScore < 72) {
    compositeScore = Math.max(compositeScore, 75);
  }

  const normalizedScore = Math.min(100, Math.round(compositeScore));

  // Determine risk level
  let riskLevel: RiskLevel = 'SAFE';
  if (normalizedScore >= 70) {
    riskLevel = 'CRITICAL';
  } else if (normalizedScore >= 40) {
    riskLevel = 'MODERATE';
  } else if (normalizedScore >= 20) {
    riskLevel = 'LOW';
  }

  const summary = generateScoreSummary(normalizedScore, riskLevel, indicators, urlFindings);

  return {
    normalizedScore,
    riskLevel,
    categoryScores,
    summary
  };
}

function createCategoryScore(category: ScamIndicatorCategory, indicators: ScamIndicator[]): CategoryScore {
  const rawPoints = indicators.reduce((sum, ind) => sum + ind.weight, 0);
  // Cap at 100
  const score = Math.min(100, Math.round((rawPoints / 40) * 100));

  return {
    category,
    label: CATEGORY_LABELS[category],
    score,
    rawPoints,
    indicatorsFound: indicators.length,
    weightShare: CATEGORY_WEIGHTS[category] * 100
  };
}

function createLinkCategoryScore(
  linkIndicators: ScamIndicator[],
  highestUrlRisk: number,
  totalUrls: number
): CategoryScore {
  const rawPoints = linkIndicators.reduce((sum, ind) => sum + ind.weight, 0) + (highestUrlRisk * 0.4);
  const score = Math.min(100, Math.round(Math.max(highestUrlRisk, (rawPoints / 40) * 100)));

  return {
    category: 'links',
    label: CATEGORY_LABELS.links,
    score,
    rawPoints: Math.round(rawPoints),
    indicatorsFound: linkIndicators.length + totalUrls,
    weightShare: CATEGORY_WEIGHTS.links * 100
  };
}

function generateScoreSummary(
  score: number,
  riskLevel: RiskLevel,
  indicators: ScamIndicator[],
  urlFindings: UrlFinding[]
): string {
  if (riskLevel === 'SAFE') {
    return 'No recognizable scam triggers, deceptive patterns, or suspicious URLs were discovered. The message tone and structure appear benign or neutral.';
  }

  const indicatorCount = indicators.length;
  const criticalCount = indicators.filter(i => i.severity === 'critical').length;
  const highRiskUrls = urlFindings.filter(u => u.riskScore >= 50).length;

  if (riskLevel === 'CRITICAL') {
    return `High probability scam attempt (${score}/100). Found ${indicatorCount} suspicious signals, including ${criticalCount} critical danger flags${
      highRiskUrls > 0 ? ` and ${highRiskUrls} deceptive link(s)` : ''
    }. Do NOT click links, call attached numbers, or reply.`;
  }

  if (riskLevel === 'MODERATE') {
    return `Moderate risk detected (${score}/100). The message exhibits ${indicatorCount} psychological pressure tactics or suspicious claims. Treat with caution and verify independently.`;
  }

  return `Low risk (${score}/100). Minor trigger patterns were noted (${indicatorCount} signal), but there is insufficient evidence to definitively classify as hostile. Verify sender address.`;
}
