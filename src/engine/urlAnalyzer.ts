import { UrlFinding } from '../types';

const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'tk', 'ml', 'ga', 'cf', 'gq', 'buzz', 'icu',
  'work', 'click', 'rest', 'country', 'fit', 'link', 'live',
  'cam', 'sbs', 'cfd', 'quest', 'monster', 'beauty', 'surf'
]);

const KNOWN_SHORTENERS = new Set([
  'bit.ly', 'tinyurl.com', 't.co', 'ow.ly', 'is.gd', 'buff.ly',
  'cutt.ly', 'rb.gy', 'goo.gl', 'shorturl.at', 'bl.ink'
]);

const BRAND_KEYWORDS = [
  'chase', 'wellsfargo', 'bankofamerica', 'citi', 'capitalone',
  'paypal', 'usps', 'fedex', 'ups', 'dhl', 'apple', 'microsoft',
  'amazon', 'netflix', 'irs', 'socialsecurity', 'walmart', 'binance', 'coinbase'
];

export function extractUrls(text: string): string[] {
  // Matches http/https URLs and bare domains like track-usps.com/update
  const urlRegex = /(?:https?:\/\/|www\.)[^\s<>"'{}|\\^`]+|(?:[a-zA-Z0-9-]+\.)+(?:com|org|net|xyz|top|site|online|io|info|biz|co|app|gov|edu|me|tv|us|uk|ca|au|ru|de|cn|tk|ga|cf|gq|ml|sbs|cfd|work|click)\b(?:\/[^\s<>"'{}|\\^`]*)?/gi;
  const matches = text.match(urlRegex) || [];
  
  // Clean trailing punctuation that might get caught from sentence ends
  return Array.from(new Set(matches.map(u => u.replace(/[.,;:!?)]+$/, ''))));
}

export function analyzeUrl(rawUrl: string): UrlFinding {
  let normalized = rawUrl;
  let isHttpNotHttps = false;

  if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
    normalized = 'https://' + rawUrl;
  } else if (rawUrl.startsWith('http://')) {
    isHttpNotHttps = true;
  }

  let hostname = '';
  try {
    const parsed = new URL(normalized);
    hostname = parsed.hostname.toLowerCase();
  } catch {
    hostname = rawUrl.split('/')[0].toLowerCase();
  }

  const flags: string[] = [];
  let riskScore = 0;

  // 1. IP Address check
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  const hasIpAddress = ipRegex.test(hostname);
  if (hasIpAddress) {
    flags.push('IP address host: Legitimate organizations host public portals on registered domain names, not bare IP addresses.');
    riskScore += 45;
  }

  // 2. TLD Inspection
  const parts = hostname.split('.');
  const tld = parts.length > 1 ? parts[parts.length - 1] : '';
  const isSuspiciousTld = SUSPICIOUS_TLDS.has(tld);
  if (isSuspiciousTld) {
    flags.push(`High-abuse TLD (.${tld}): Scammers favor low-cost or disposable top-level domains to evade takedowns.`);
    riskScore += 30;
  }

  // 3. URL Shortener
  const isShortener = KNOWN_SHORTENERS.has(hostname) || KNOWN_SHORTENERS.has(parts.slice(-2).join('.'));
  if (isShortener) {
    flags.push('URL Shortener detected: Obscures the real final destination and prevents safety previewing.');
    riskScore += 25;
  }

  // 4. Deceptive Brand Subdomain Spoofing
  // e.g. "chase.com-verify.xyz" -> actual domain is com-verify.xyz, chase is just a subpart or prefix
  let hasDeceptiveSubdomain = false;
  let deceptiveBrandTarget: string | undefined = undefined;

  const mainDomain = parts.length >= 2 ? parts.slice(-2).join('.') : hostname;
  
  for (const brand of BRAND_KEYWORDS) {
    // If brand appears in hostname, but the registered main domain is NOT the brand's official domain
    if (hostname.includes(brand)) {
      const isOfficialDomain = mainDomain === `${brand}.com` || mainDomain === `${brand}.gov` || mainDomain === `${brand}.org`;
      if (!isOfficialDomain) {
        hasDeceptiveSubdomain = true;
        deceptiveBrandTarget = brand.toUpperCase();
        flags.push(`Deceptive Brand Spoofing: Brand "${brand.toUpperCase()}" is used in the host, but the actual owning domain is "${mainDomain}".`);
        riskScore += 40;
        break;
      }
    }
  }

  // 5. Punycode check (internationalized domain lookalike)
  const punycodeWarning = hostname.includes('xn--');
  if (punycodeWarning) {
    flags.push('Punycode / Homograph alert: Uses special lookalike foreign characters to visually imitate authentic brand names.');
    riskScore += 40;
  }

  // 6. Excessive hyphenation (e.g. usps-package-redelivery-portal-online.com)
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 3) {
    flags.push(`Excessive hyphenation (${hyphenCount} hyphens): Common tactic in throwaway phishing domains.`);
    riskScore += 18;
  }

  // 7. Insecure HTTP check
  if (isHttpNotHttps) {
    flags.push('Unencrypted protocol (HTTP): Modern authentication and commercial sites require secure HTTPS.');
    riskScore += 15;
  }

  return {
    url: rawUrl,
    domain: hostname,
    tld,
    isSuspiciousTld,
    hasIpAddress,
    isShortener,
    subdomainCount: Math.max(0, parts.length - 2),
    hasDeceptiveSubdomain,
    deceptiveBrandTarget,
    isHttpNotHttps,
    riskScore: Math.min(100, riskScore),
    flags,
    punycodeWarning
  };
}
