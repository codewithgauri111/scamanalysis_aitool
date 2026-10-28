import { ScamIndicator } from '../../types';

interface ImpersonationRulePattern {
  id: string;
  name: string;
  regex: RegExp;
  brand: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  weight: number;
  description: string;
  explanation: string;
}

const IMPERSONATION_RULES: ImpersonationRulePattern[] = [
  {
    id: 'imp_postal_carrier',
    name: 'Postal or Courier Service Impersonation',
    regex: /\b(usps|fedex|ups|dhl|postal\s*service|parcel\s*tracking|package\s*(?:delivery|cannot\s*be\s*delivered|on\s*hold))\b/i,
    brand: 'Postal Carrier (USPS/FedEx/UPS/DHL)',
    severity: 'high',
    weight: 22,
    description: 'Impersonating mail and delivery carriers regarding an alleged held package.',
    explanation: 'Scammers send fake package hold alerts claiming your address is missing or redelivery fees are owed to siphon payment details.'
  },
  {
    id: 'imp_major_bank',
    name: 'Banking Institution Impersonation',
    regex: /\b(chase\s*(?:bank)?|wells\s*fargo|bank\s*of\s*america|citi(?:bank)?|capital\s*one|fraud\s*alert|suspicious\s*transaction\s*of\s*\$[\d,]+)\b/i,
    brand: 'Financial Institution',
    severity: 'high',
    weight: 24,
    description: 'Impersonating major financial institutions regarding urgent fraud alerts.',
    explanation: 'Fake fraud alerts lure recipients to bogus login portals designed to capture usernames, passwords, and one-time security codes.'
  },
  {
    id: 'imp_government_agency',
    name: 'Government or Tax Authority Impersonation',
    regex: /\b(internal\s*revenue\s*service|irs|social\s*security\s*(?:administration|department)?|ssa|customs\s*and\s*border|border\s*patrol|medicare)\b/i,
    brand: 'Government Agency',
    severity: 'critical',
    weight: 28,
    description: 'Falsely claiming to represent government or law enforcement agencies.',
    explanation: 'Government agencies do not initiate contact via SMS or personal WhatsApp messages demanding instant verification or payment.'
  },
  {
    id: 'imp_tech_support',
    name: 'Tech Giant or Subscription Support Impersonation',
    regex: /\b(microsoft\s*support|apple\s*(?:support|security|id)|geek\s*squad|mcafee\s*(?:renewal)?|norton\s*(?:antivirus)?|amazon\s*(?:prime|order\s*confirmed))\b/i,
    brand: 'Tech Giant / Antivirus Support',
    severity: 'medium',
    weight: 18,
    description: 'Claiming unrequested subscription renewals or virus detections.',
    explanation: 'Fake subscription invoices (e.g. Geek Squad or Norton renewals) instruct victims to call a bogus support desk to steal remote computer access.'
  },
  {
    id: 'imp_family_emergency',
    name: 'Distressed Relative / "Hi Mum" Impersonation',
    regex: /\b(hi\s*mum|hello\s*mom|hi\s*dad|lost\s*my\s*phone|new\s*temporary\s*number|in\s*trouble\s*need\s*money|emergency\s*hospital\s*bill)\b/i,
    brand: 'Family Member Impersonation',
    severity: 'critical',
    weight: 27,
    description: 'Impersonating a family member in distress claiming their phone broke.',
    explanation: 'The classic "Hi Mum / Broken Phone" smishing attack targets parents, pretending to be their child desperately needing urgent cash transfer.'
  }
];

export function evaluateImpersonationRules(text: string): ScamIndicator[] {
  const indicators: ScamIndicator[] = [];

  for (const rule of IMPERSONATION_RULES) {
    const match = text.match(rule.regex);
    if (match) {
      indicators.push({
        id: rule.id,
        name: rule.name,
        category: 'impersonation',
        severity: rule.severity,
        weight: rule.weight,
        description: rule.description,
        matchedSnippet: match[0],
        explanation: rule.explanation
      });
    }
  }

  return indicators;
}
