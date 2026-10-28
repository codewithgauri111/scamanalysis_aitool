import { ScamIndicator } from '../../types';

interface FinancialRulePattern {
  id: string;
  name: string;
  regex: RegExp;
  severity: 'low' | 'medium' | 'high' | 'critical';
  weight: number;
  description: string;
  explanation: string;
}

const FINANCIAL_RULES: FinancialRulePattern[] = [
  {
    id: 'fin_gift_cards',
    name: 'Gift Card Payment Request',
    regex: /\b(?:apple\s*gift\s*card|itunes\s*card|google\s*play\s*card|steam\s*(?:wallet|card)|vanilla\s*visa|target\s*gift\s*card|pay\s*with\s*cards?)\b/i,
    severity: 'critical',
    weight: 30,
    description: 'Demand for payment using non-refundable, anonymous gift cards.',
    explanation: 'No legitimate business, government body, or utility will EVER ask you to settle an account or pay a fee using retail gift cards. This is a definitive scam hallmark.'
  },
  {
    id: 'fin_crypto_atm',
    name: 'Cryptocurrency / Bitcoin ATM Direct Transfer',
    regex: /\b(?:bitcoin\s*atm|crypto\s*wallet|deposit\s*(?:btc|eth|usdt)|crypto\s*machine|safe\s*locker\s*atm|wire\s*transfer\s*immediately)\b/i,
    severity: 'critical',
    weight: 30,
    description: 'Instructions to deposit cash into a Bitcoin ATM or unfamiliar crypto wallet.',
    explanation: 'Scammers use crypto ATMs and irreversible wire transfers because the transactions cannot be reversed once completed.'
  },
  {
    id: 'fin_micro_fee_trap',
    name: 'Micro-Fee / Small Redelivery Payment Trap',
    regex: /\b(?:pay(?:\s*a)?\s*(?:redelivery|processing|clearance|customs|holding)\s*fee|\$(?:1\.\d{2}|2\.\d{2}|3\.\d{2}|4\.\d{2}|0\.\d{2}))\b/i,
    severity: 'high',
    weight: 22,
    description: 'Request for a nominal payment (e.g., $1.99) to unlock a package or prize.',
    explanation: 'The nominal fee is bait to steal your credit card number, CVV, and billing credentials via a fake checkout page.'
  },
  {
    id: 'fin_unrealistic_return',
    name: 'Guaranteed Unrealistic Investment Return',
    regex: /\b(?:guaranteed\s*(?:daily|weekly)?\s*returns?|earn\s*\$?\d{3,}\s*(?:daily|per\s*day)|risk-free\s*investment|passive\s*crypto\s*income|trading\s*signal\s*vip)\b/i,
    severity: 'high',
    weight: 25,
    description: 'Promises of guaranteed or effortless high-yield financial returns.',
    explanation: 'Legitimate investments carry risk. Any offer guaranteeing fast, risk-free returns or hundreds of dollars a day is a fraudulent scheme (Pig Butchering / Ponzi).'
  },
  {
    id: 'fin_lottery_prize',
    name: 'Unclaimed Lottery / Sweepstakes Notification',
    regex: /\b(?:you\s*(?:have\s*)?won|lottery\s*winner|sweepstakes\s*prize|claim\s*your\s*reward|selected\s*for\s*(?:a\s*)?\$[\d,]+\s*grant)\b/i,
    severity: 'high',
    weight: 20,
    description: 'Claiming you won a prize or government grant you never entered.',
    explanation: 'Scammers claim you won a prize or lottery to convince you to send money for "advance tax" or provide banking info.'
  }
];

export function evaluateFinancialRules(text: string): ScamIndicator[] {
  const indicators: ScamIndicator[] = [];

  for (const rule of FINANCIAL_RULES) {
    const match = text.match(rule.regex);
    if (match) {
      indicators.push({
        id: rule.id,
        name: rule.name,
        category: 'financial',
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
