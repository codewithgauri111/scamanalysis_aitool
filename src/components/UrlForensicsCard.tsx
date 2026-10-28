import React from 'react';
import { UrlFinding } from '../types';
import { ExternalLink, Globe, AlertTriangle, ShieldCheck, Server, AlertOctagon } from 'lucide-react';

interface UrlForensicsCardProps {
  urlFindings: UrlFinding[];
}

export const UrlForensicsCard: React.FC<UrlForensicsCardProps> = ({ urlFindings }) => {
  if (urlFindings.length === 0) return null;

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/60">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
            <Globe className="w-5 h-5 text-brand-cyan" />
            <span>Embedded Link & Domain Forensics</span>
          </h3>
          <p className="text-xs text-slate-400">
            Deep inspection of hostnames, suspicious TLDs, IP hosts, and deceptive subdomain spoofs
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950/80 text-brand-cyan border border-cyan-800/50">
          {urlFindings.length} Link{urlFindings.length !== 1 ? 's' : ''} Analyzed
        </span>
      </div>

      <div className="space-y-4">
        {urlFindings.map((finding, idx) => {
          const isHighThreat = finding.riskScore >= 50;

          return (
            <div
              key={idx}
              className={`rounded-xl border p-4 transition-all ${
                isHighThreat
                  ? 'bg-red-950/20 border-red-500/40'
                  : 'bg-brand-card/80 border-brand-border/80'
              }`}
            >
              {/* URL Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`p-1 rounded ${isHighThreat ? 'bg-red-900/40 text-red-400' : 'bg-slate-800 text-slate-300'}`}>
                    <ExternalLink className="w-4 h-4" />
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-100 break-all select-all">
                    {finding.url}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                    finding.riskScore >= 70
                      ? 'bg-red-950 text-red-400 border-red-500/40'
                      : finding.riskScore >= 30
                      ? 'bg-amber-950 text-amber-400 border-amber-500/40'
                      : 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                  }`}>
                    URL Threat: {finding.riskScore}/100
                  </span>
                </div>
              </div>

              {/* Technical Property Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-[11px] font-mono">
                <div className="bg-brand-bg/80 border border-brand-border/40 rounded p-2">
                  <span className="text-slate-500 block">Domain Host:</span>
                  <span className="text-slate-200 font-bold break-all">{finding.domain}</span>
                </div>
                <div className="bg-brand-bg/80 border border-brand-border/40 rounded p-2">
                  <span className="text-slate-500 block">TLD:</span>
                  <span className={`font-bold ${finding.isSuspiciousTld ? 'text-red-400' : 'text-slate-200'}`}>
                    .{finding.tld} {finding.isSuspiciousTld ? '(High Abuse)' : ''}
                  </span>
                </div>
                <div className="bg-brand-bg/80 border border-brand-border/40 rounded p-2">
                  <span className="text-slate-500 block">Shortener:</span>
                  <span className={`font-bold ${finding.isShortener ? 'text-amber-400' : 'text-slate-400'}`}>
                    {finding.isShortener ? 'Yes (Obscured)' : 'No'}
                  </span>
                </div>
                <div className="bg-brand-bg/80 border border-brand-border/40 rounded p-2">
                  <span className="text-slate-500 block">Protocol:</span>
                  <span className={`font-bold ${finding.isHttpNotHttps ? 'text-red-400' : 'text-emerald-400'}`}>
                    {finding.isHttpNotHttps ? 'HTTP (Insecure)' : 'HTTPS'}
                  </span>
                </div>
              </div>

              {/* Specific Forensic Red Flags */}
              {finding.flags.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  {finding.flags.map((flag, flagIdx) => (
                    <div
                      key={flagIdx}
                      className="flex items-start space-x-2 text-xs text-red-300 bg-red-950/40 border border-red-900/50 rounded-lg p-2"
                    >
                      <AlertOctagon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
