import { ScamIndicator } from '../../types';

interface RulePattern {
  id: string;
  name: string;
  regex: RegExp;
  severity: 'low' | 'medium' | 'high' | 'critical';
  weight: number;
  description: string;
  explanation: string;
}

const URGENCY_RULES: RulePattern[] = [
  {
    id: 'urg_extreme_countdown',
    name: 'Immediate Ultimatum / Countdown',
    regex: /\b(within\s*(?:12|24|48)?\s*hours?|immediately|right\s*now|within\s*\d+\s*mins?|expires\s*(?:today|tonight|shortly)|act\s*now)\b/i,
    severity: 'high',
    weight: 22,
    description: 'Artificial time crunch designed to prevent rational fact-checking.',
    explanation: 'Scammers frequently impose short deadlines (like "within 24 hours" or "act now") so victims make panicked emotional decisions before consulting family or official sources.'
  },
  {
    id: 'urg_legal_intimidation',
    name: 'Legal Threat or Law Enforcement Intimidation',
    regex: /\b(arrest\s*warrant|legal\s*action|lawsuit|police\s*(?:report|custody)|subpoena|court\s*summons|prosecution)\b/i,
    severity: 'critical',
    weight: 28,
    description: 'Coercive threat claiming imminent legal arrest or court action.',
    explanation: 'Legitimate law enforcement and courts do not notify citizens of warrants or lawsuits via SMS, WhatsApp, or informal email.'
  },
  {
    id: 'urg_service_termination',
    name: 'Imminent Service Termination Threat',
    regex: /\b(account\s*(?:will\s*be\s*)?(?:terminated|suspended|frozen|closed|locked\s*permanently)|service\s*(?:interrupted|cut\s*off))\b/i,
    severity: 'high',
    weight: 20,
    description: 'Threat to permanently terminate or freeze an essential account.',
    explanation: 'Frightening the recipient with sudden loss of bank or service access creates urgency to click malicious verification links.'
  },
  {
    id: 'urg_final_notice',
    name: 'Fabricated "Final Notice" Warning',
    regex: /\b(final\s*notice|last\s*warning|final\s*attempt|reminder:\s*action\s*required)\b/i,
    severity: 'medium',
    weight: 15,
    description: 'Manufactured sense of finality to provoke panic.',
    explanation: 'Phrases like "Final Notice" create false scarcity and anxiety, nudging the recipient to act without verifying the sender identity.'
  }
];

export function evaluateUrgencyRules(text: string): ScamIndicator[] {
  const indicators: ScamIndicator[] = [];

  for (const rule of URGENCY_RULES) {
    const match = text.match(rule.regex);
    if (match) {
      indicators.push({
        id: rule.id,
        name: rule.name,
        category: 'urgency',
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
