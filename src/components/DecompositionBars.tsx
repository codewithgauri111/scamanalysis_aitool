import React from 'react';
import { CategoryScore, ScamIndicatorCategory } from '../types';
import { Clock, DollarSign, UserCheck, Link, KeyRound } from 'lucide-react';

interface DecompositionBarsProps {
  categories: Record<ScamIndicatorCategory, CategoryScore>;
}

export const DecompositionBars: React.FC<DecompositionBarsProps> = ({ categories }) => {
  const getCategoryIcon = (cat: ScamIndicatorCategory) => {
    switch (cat) {
      case 'urgency': return Clock;
      case 'financial': return DollarSign;
      case 'impersonation': return UserCheck;
      case 'links': return Link;
      case 'credentials': return KeyRound;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-red-500';
    if (score >= 40) return 'bg-amber-500';
    if (score >= 20) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  const catList: ScamIndicatorCategory[] = ['urgency', 'financial', 'impersonation', 'links', 'credentials'];

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/60">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Threat Factor Decomposition
          </h3>
          <p className="text-xs text-slate-400">
            Weighted contribution of each tactical vector to the composite risk score
          </p>
        </div>
        <span className="text-xs font-mono text-brand-cyan bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
          5 Vectors
        </span>
      </div>

      <div className="space-y-4">
        {catList.map((catKey) => {
          const item = categories[catKey];
          const Icon = getCategoryIcon(catKey);
          const barColor = getScoreColor(item.score);

          return (
            <div key={catKey} className="group">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-brand-card border border-brand-border/60 text-slate-300">
                    <Icon className="w-3.5 h-3.5 text-brand-cyan" />
                  </div>
                  <span className="font-semibold text-slate-200">{item.label}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ({item.weightShare}% weight)
                  </span>
                </div>

                <div className="flex items-center space-x-2 font-mono">
                  <span className="text-[11px] text-slate-400">
                    {item.indicatorsFound} signal{item.indicatorsFound !== 1 ? 's' : ''}
                  </span>
                  <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                    item.score >= 70 ? 'text-red-400 bg-red-950/40' :
                    item.score >= 40 ? 'text-amber-400 bg-amber-950/40' :
                    item.score >= 20 ? 'text-blue-400 bg-blue-950/40' :
                    'text-emerald-400 bg-emerald-950/40'
                  }`}>
                    {item.score}/100
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full ${barColor} transition-all duration-700 rounded-full`}
                  style={{ width: `${Math.max(item.score, 3)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
