import React from 'react';
import { ScamIndicator } from '../types';
import { AlertCircle, Quote, ShieldAlert, CheckCircle } from 'lucide-react';

interface EvidenceInspectorProps {
  indicators: ScamIndicator[];
}

export const EvidenceInspector: React.FC<EvidenceInspectorProps> = ({ indicators }) => {
  const getSeverityBadge = (sev: ScamIndicator['severity']) => {
    switch (sev) {
      case 'critical':
        return 'bg-red-950/80 text-red-400 border-red-500/40 font-bold';
      case 'high':
        return 'bg-orange-950/80 text-orange-400 border-orange-500/40 font-semibold';
      case 'medium':
        return 'bg-amber-950/80 text-amber-400 border-amber-500/40 font-medium';
      case 'low':
      default:
        return 'bg-blue-950/80 text-blue-400 border-blue-500/40 font-medium';
    }
  };

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/60">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-brand-cyan" />
            <span>Discovered Evidence & Deception Signatures</span>
          </h3>
          <p className="text-xs text-slate-400">
            Specific text patterns, psychological tactics, and manipulation triggers matched
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
          {indicators.length} Signature{indicators.length !== 1 ? 's' : ''}
        </span>
      </div>

      {indicators.length === 0 ? (
        <div className="p-8 text-center bg-brand-card/40 rounded-xl border border-brand-border/40">
          <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-200">No Hostile Signatures Extracted</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            The analyzer did not match any typical phishing phrases, countdown ultimatums, gift card demands, or credential traps in this message.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {indicators.map((ind) => (
            <div
              key={ind.id}
              className="bg-brand-card/80 border border-brand-border/70 rounded-xl p-4 transition-all hover:border-slate-600/80"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${getSeverityBadge(ind.severity)}`}>
                    {ind.severity}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100">{ind.name}</h4>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  +{ind.weight} impact pts
                </span>
              </div>

              {/* Matched Snippet */}
              <div className="bg-brand-bg/90 rounded-lg p-2.5 border border-brand-border/50 text-xs font-mono text-cyan-300 flex items-start space-x-2 my-2">
                <Quote className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span className="break-all font-semibold italic">"{ind.matchedSnippet}"</span>
              </div>

              {/* Explanation */}
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {ind.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
