import { describe, it, expect } from 'vitest';
import { analyzeMessage } from '../engine/detector';
import { analyzeUrl } from '../engine/urlAnalyzer';
import { SYNTHETIC_SAMPLES } from '../engine/syntheticSamples';

describe('AI Scam Message Analysis Engine', () => {
  it('correctly evaluates USPS smishing synthetic sample as CRITICAL', async () => {
    const sample = SYNTHETIC_SAMPLES.find(s => s.id === 'sample_usps_redelivery')!;
    const result = await analyzeMessage(sample.text);

    expect(result.riskLevel).toBe('CRITICAL');
    expect(result.normalizedScore).toBeGreaterThanOrEqual(70);
    expect(result.indicators.some(i => i.category === 'impersonation')).toBe(true);
    expect(result.indicators.some(i => i.category === 'urgency')).toBe(true);
    expect(result.urlFindings.length).toBeGreaterThan(0);
    expect(result.urlFindings[0].isSuspiciousTld).toBe(true);
  });

  it('correctly evaluates Bank phishing smishing as CRITICAL', async () => {
    const sample = SYNTHETIC_SAMPLES.find(s => s.id === 'sample_chase_lockout')!;
    const result = await analyzeMessage(sample.text);

    expect(result.riskLevel).toBe('CRITICAL');
    expect(result.normalizedScore).toBeGreaterThanOrEqual(75);
    expect(result.indicators.some(i => i.category === 'financial' || i.category === 'impersonation')).toBe(true);
    expect(result.urlFindings[0].hasDeceptiveSubdomain).toBe(true);
  });

  it('correctly detects Hi Mum family emergency scam', async () => {
    const sample = SYNTHETIC_SAMPLES.find(s => s.id === 'sample_hi_mum')!;
    const result = await analyzeMessage(sample.text);

    expect(result.riskLevel).toBe('CRITICAL');
    expect(result.indicators.some(i => i.id === 'imp_family_emergency')).toBe(true);
  });

  it('does not falsely trigger CRITICAL on legitimate appointment reminder', async () => {
    const sample = SYNTHETIC_SAMPLES.find(s => s.id === 'sample_legit_calendar')!;
    const result = await analyzeMessage(sample.text);

    expect(result.riskLevel).toBe('SAFE');
    expect(result.normalizedScore).toBeLessThan(20);
    expect(result.indicators.length).toBe(0);
  });

  it('does not falsely trigger CRITICAL on legitimate shipping order confirmation', async () => {
    const sample = SYNTHETIC_SAMPLES.find(s => s.id === 'sample_legit_shipping')!;
    const result = await analyzeMessage(sample.text);

    expect(result.riskLevel).toBe('SAFE');
    expect(result.normalizedScore).toBeLessThan(20);
  });

  it('URL Analyzer identifies bare IP addresses and deceptive subdomains accurately', () => {
    const ipUrl = analyzeUrl('http://192.168.1.100/login-secure');
    expect(ipUrl.hasIpAddress).toBe(true);
    expect(ipUrl.riskScore).toBeGreaterThanOrEqual(40);

    const deceptiveUrl = analyzeUrl('https://chase.com-verify.xyz/auth');
    expect(deceptiveUrl.hasDeceptiveSubdomain).toBe(true);
    expect(deceptiveUrl.isSuspiciousTld).toBe(true);
    expect(deceptiveUrl.riskScore).toBeGreaterThanOrEqual(60);

    const officialUrl = analyzeUrl('https://www.chase.com/personal');
    expect(officialUrl.hasDeceptiveSubdomain).toBe(false);
    expect(officialUrl.isSuspiciousTld).toBe(false);
  });
});
