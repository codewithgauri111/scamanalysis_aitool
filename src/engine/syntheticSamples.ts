import { SyntheticSample } from '../types';

export const SYNTHETIC_SAMPLES: SyntheticSample[] = [
  {
    id: 'sample_usps_redelivery',
    title: 'Postal Delivery Address Failure',
    channel: 'SMS',
    category: 'Package Delivery Scam',
    expectedRisk: 'CRITICAL',
    text: '[USPS Notice]: Your package #940011189956 cannot be delivered due to incomplete street address details. Update your delivery records and pay the $1.99 redelivery fee within 24 hours at http://usps-redirection-portal.xyz/track or your parcel will be returned to sender.',
    description: 'Classic courier smishing impersonating the United States Postal Service with a fake tracking code, low micro-fee trap, and an unauthorized .xyz domain.',
    learningPoint: 'Couriers do not use disposable .xyz domains or demand credit card redelivery fees via unexpected SMS messages.'
  },
  {
    id: 'sample_chase_lockout',
    title: 'Urgent Bank Account Suspension',
    channel: 'SMS',
    category: 'Financial Phishing',
    expectedRisk: 'CRITICAL',
    text: 'CHASE FRAUD ALERT: An unrecognized withdrawal of $1,450.00 was attempted from your checking account. If this was NOT you, act now. Your account will be frozen permanently within 12 hours. Log in to verify your identity and cancel the transaction: https://chase.com-secure-verification.top/login',
    description: 'Banking smishing creating panic with high dollar amounts and threatening permanent account loss, pointing to a deceptive subdomain.',
    learningPoint: 'Notice how "chase.com" is placed in the prefix, but the actual root domain is "com-secure-verification.top".'
  },
  {
    id: 'sample_hi_mum',
    title: 'Distressed Family Member ("Hi Mum")',
    channel: 'WHATSAPP',
    category: 'Impersonation Scam',
    expectedRisk: 'CRITICAL',
    text: 'Hi mum, I dropped my phone in the water so this is my new temporary number. I am in a real emergency at the repair shop and need to pay an urgent $850 hospital bill right now. Can you please wire transfer the money immediately? I will pay you back tonight.',
    description: 'Emotionally manipulative family impersonation preying on parents concern for their children.',
    learningPoint: 'Never send money to an unfamiliar number claiming to be a child or relative without calling their existing known number or verifying through another family member.'
  },
  {
    id: 'sample_crypto_yield',
    title: 'Guaranteed Daily Crypto Returns',
    channel: 'CHAT',
    category: 'Investment Fraud',
    expectedRisk: 'CRITICAL',
    text: 'VIP Trading Group Invitation: Turn $200 into $3,500 in 72 hours! Our automated algorithmic AI trading platform guarantees 15% daily return with zero risk. Deposit BTC or USDT to our verified safe locker address. Register today: http://bit.ly/crypto-wealth-pass',
    description: 'High-yield investment scheme (pig butchering style) promising impossible risk-free returns and obscured shortened URLs.',
    learningPoint: 'No legitimate investment can legally or practically guarantee daily fixed profits. The promise of "zero risk" is always fraudulent.'
  },
  {
    id: 'sample_geek_squad_invoice',
    title: 'Tech Support Renewal Billing Trap',
    channel: 'EMAIL',
    category: 'Tech Support Impersonation',
    expectedRisk: 'MODERATE',
    text: 'Geek Squad Total Tech Support: Your annual protection plan auto-renewed for $399.00 today. If you did not authorize this charge or wish to dispute this transaction, call our billing cancellation department immediately at +1-800-555-0199 within 24 hours.',
    description: 'Phony invoice scam designed to provoke an inbound phone call where fake agents install remote access tools.',
    learningPoint: 'Fraudulent renewal notices intimidate victims into calling fraudulent phone numbers to steal banking credentials under the guise of processing a refund.'
  },
  {
    id: 'sample_job_recruiter',
    title: 'Remote Video-Liker High Paying Job',
    channel: 'WHATSAPP',
    category: 'Job & Employment Scam',
    expectedRisk: 'MODERATE',
    text: 'Hello! I am Sarah from Global HR Talent. We have flexible remote work openings reviewing commercial video clips on your smartphone. Earn $300 to $800 daily for 1 hour of simple tasks. No experience required. Message our Telegram coordinator right now to claim your welcome bonus: https://t.me/hr_recruiter_agent_99',
    description: 'Task-based employment scam where victims are eventually required to deposit money into a fake portal to unlock earned commissions.',
    learningPoint: 'Unsolicited job offers offering hundreds of dollars for trivial tasks with no interview or resume requirements are deceptive task scams.'
  },
  {
    id: 'sample_legit_calendar',
    title: 'Authentic Dental Appointment Reminder',
    channel: 'SMS',
    category: 'Legitimate Notice (Baseline)',
    expectedRisk: 'SAFE',
    text: 'Reminder: You have an upcoming dental checkup scheduled with Dr. Miller on Thursday, Nov 5th at 2:30 PM. Reply C to confirm or call our office directly if you need to reschedule. Thank you!',
    description: 'Standard, benign transactional SMS reminder with no suspicious links, no artificial financial threats, and no credential traps.',
    learningPoint: 'Demonstrates benign baseline: routine administrative notices do not employ high-pressure threats, payment links, or urgency timers.'
  },
  {
    id: 'sample_legit_shipping',
    title: 'Authentic Shipping Notification',
    channel: 'EMAIL',
    category: 'Legitimate Notice (Baseline)',
    expectedRisk: 'SAFE',
    text: 'Your order #81293 has shipped via UPS Ground and is estimated to arrive Monday by 7:00 PM. Tracking number: 1Z9999999999999999. Thank you for your purchase.',
    description: 'Standard order shipment receipt providing informational tracking without coercive fee demands or suspicious external domains.',
    learningPoint: 'Legitimate notifications inform you of status without demanding immediate payments or threatening confiscation.'
  }
];
