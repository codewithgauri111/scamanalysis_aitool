import { SafetyRecommendation, ScamIndicator, UrlFinding, RiskLevel } from '../types';

export function generateSafetyPlaybook(
  riskLevel: RiskLevel,
  indicators: ScamIndicator[],
  urls: UrlFinding[]
): SafetyRecommendation[] {
  const recommendations: SafetyRecommendation[] = [];

  if (riskLevel === 'SAFE') {
    recommendations.push({
      id: 'rec_safe_confirm',
      priority: 'EDUCATIONAL',
      title: 'Standard Security Vigilance',
      detail: 'Although no threat patterns were detected, always remain cautious when interacting with unexpected links or unverified senders.',
      badge: 'Normal Caution'
    });
    return recommendations;
  }

  // 1. Critical Actions
  if (riskLevel === 'CRITICAL' || riskLevel === 'MODERATE') {
    recommendations.push({
      id: 'rec_zero_engagement',
      priority: 'IMMEDIATE',
      title: 'Halt All Engagement Immediately',
      detail: 'Do NOT reply to the message, do NOT click any links, and do NOT dial any phone numbers listed inside the text. Senders often track replies to validate active numbers.',
      badge: 'Do Not Reply'
    });
  }

  // 2. Link specific actions
  if (urls.length > 0) {
    recommendations.push({
      id: 'rec_url_quarantine',
      priority: 'IMMEDIATE',
      title: 'Quarantine Embedded Links',
      detail: `Detected ${urls.length} link(s). If you have already tapped any link, close the browser tab immediately. Do NOT enter passwords, credit card numbers, or download files. If files were downloaded, disconnect Wi-Fi and run an antivirus scan.`,
      badge: 'Link Quarantine'
    });
  }

  // 3. Category-specific advice
  const categories = new Set(indicators.map(i => i.category));

  if (categories.has('credentials')) {
    recommendations.push({
      id: 'rec_credential_defense',
      priority: 'IMMEDIATE',
      title: 'Protect Authentication Codes',
      detail: 'Never share 2-factor authentication (2FA) or SMS verification codes. If you already submitted credentials on an external page, visit the real website immediately from a clean device and change your password.',
      badge: 'Account Lockdown'
    });
  }

  if (categories.has('financial')) {
    recommendations.push({
      id: 'rec_financial_safeguard',
      priority: 'IMMEDIATE',
      title: 'Cease All Payment Transfers',
      detail: 'Never purchase gift cards, deposit funds at a Bitcoin ATM, or send wire transfers. If you shared credit card details, call your bank using the phone number on the back of your physical card to freeze the card.',
      badge: 'Financial Defense'
    });
  }

  if (categories.has('impersonation')) {
    recommendations.push({
      id: 'rec_independent_verify',
      priority: 'CAUTION',
      title: 'Verify via Official Channels Only',
      detail: 'The sender claims to represent an institution (bank, courier, or agency). Always navigate to the official website directly through your browser or open the official mobile app to check your account status.',
      badge: 'Independent Verification'
    });
  }

  // 4. Reporting Steps
  recommendations.push({
    id: 'rec_report_carrier',
    priority: 'REPORT',
    title: 'Forward to Carrier Spam Desk (7726)',
    detail: 'In the US, UK, and Canada, forward the suspicious text message to 7726 (spells SPAM). Most major telecom carriers use this to block scam networks free of charge.',
    badge: 'SMS 7726'
  });

  recommendations.push({
    id: 'rec_report_ftc',
    priority: 'REPORT',
    title: 'Report to Consumer Fraud Authorities',
    detail: 'Report the scam incident to the FTC (Federal Trade Commission) at ReportFraud.ftc.gov or IC3.gov (FBI Internet Crime Complaint Center) to aid cybercrime investigations.',
    badge: 'Official Report'
  });

  return recommendations;
}
