import { ScamIndicator } from '../../types';

interface CredentialRulePattern {
  id: string;
  name: string;
  regex: RegExp;
  severity: 'low' | 'medium' | 'high' | 'critical';
  weight: number;
  description: string;
  explanation: string;
}

const CREDENTIAL_RULES: CredentialRulePattern[] = [
  {
    id: 'cred_otp_bypass',
    name: 'One-Time Passcode (OTP / 2FA) Solicitation',
    regex: /\b(?:send\s*(?:us|me)?\s*(?:the|your)?\s*(?:6-digit|verification|security|2fa|otp)\s*code|share\s*the\s*code|enter\s*the\s*code\s*you\s*just\s*received)\b/i,
    severity: 'critical',
    weight: 30,
    description: 'Direct request to relay a one-time two-factor authentication passcode.',
    explanation: 'Legitimate service providers will NEVER call, text, or ask you to verbally relay or forward your one-time multi-factor security code. Scammers use this to hijack your active session.'
  },
  {
    id: 'cred_login_trap',
    name: 'Suspicious Login / Re-authentication Prompt',
    regex: /\b(?:log\s*in\s*to\s*(?:verify|restore|confirm|update)|click\s*(?:here|below)\s*to\s*sign\s*in|verify\s*your\s*(?:identity|credentials|password))\b/i,
    severity: 'high',
    weight: 22,
    description: 'Direct prompt to log in via an embedded external link.',
    explanation: 'Unsolicited messages directing you to log in via their provided link lead to credential-harvesting phishing replicas designed to copy your username and password.'
  },
  {
    id: 'cred_ssn_harvest',
    name: 'Social Security / Personal Data Harvesting',
    regex: /\b(?:confirm\s*(?:your\s*)?(?:social\s*security|ssn|id\s*number|date\s*of\s*birth|mother'?s\s*maiden\s*name|card\s*pin))\b/i,
    severity: 'critical',
    weight: 29,
    description: 'Solicitation of foundational identity information like SSN or PIN.',
    explanation: 'Directly asking for sensitive identity numbers via message is a hallmark indicator of identity theft attempts.'
  }
];

export function evaluateCredentialRules(text: string): ScamIndicator[] {
  const indicators: ScamIndicator[] = [];

  for (const rule of CREDENTIAL_RULES) {
    const match = text.match(rule.regex);
    if (match) {
      indicators.push({
        id: rule.id,
        name: rule.name,
        category: 'credentials',
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
