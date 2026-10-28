import React, { useState } from 'react';
import { SafetyRecommendation } from '../types';
import { ShieldCheck, CheckSquare, Square, AlertTriangle, PhoneCall, ExternalLink, Copy } from 'lucide-react';

interface SafetyPlaybookCardProps {
  recommendations: SafetyRecommendation[];
}

export const SafetyPlaybookCard: React.FC<SafetyPlaybookCardProps> = ({ recommendations }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy7726 = (id: string) => {
    navigator.clipboard.writeText('7726');
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const getPriorityStyle = (priority: SafetyRecommendation['priority']) => {
    switch (priority) {
      case 'IMMEDIATE':
        return {
          border: 'border-red-500/40 bg-red-950/20',
          badge: 'bg-red-950 text-red-400 border-red-500/40',
          text: 'Immediate Protective Action'
        };
      case 'CAUTION':
        return {
          border: 'border-amber-500/40 bg-amber-950/20',
          badge: 'bg-amber-950 text-amber-400 border-amber-500/40',
          text: 'Caution & Verification'
        };
      case 'REPORT':
        return {
          border: 'border-cyan-500/40 bg-cyan-950/20',
          badge: 'bg-cyan-950 text-cyan-400 border-cyan-500/40',
          text: 'Incident Reporting'
        };
      case 'EDUCATIONAL':
      default:
        return {
          border: 'border-emerald-500/40 bg-emerald-950/20',
          badge: 'bg-emerald-950 text-emerald-400 border-emerald-500/40',
          text: 'Best Practice'
        };
    }
  };

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/60">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-brand-cyan" />
            <span>Recommended Safety Playbook & Incident Response</span>
          </h3>
          <p className="text-xs text-slate-400">
            Actionable, prioritised checklist to protect your identity, accounts, and finances
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
          {recommendations.length} Steps
        </span>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const style = getPriorityStyle(rec.priority);
          const isDone = !!completedSteps[rec.id];

          return (
            <div
              key={rec.id}
              className={`rounded-xl border p-4 transition-all ${
                isDone ? 'opacity-50 bg-brand-card/40 border-slate-800' : style.border
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => toggleStep(rec.id)}
                  className="mt-0.5 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                  title={isDone ? 'Mark as incomplete' : 'Mark as done'}
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}>
                      {rec.badge || style.text}
                    </span>
                    <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {rec.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {rec.detail}
                  </p>

                  {/* Special helper action buttons */}
                  {rec.id === 'rec_report_carrier' && (
                    <div className="mt-2.5 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleCopy7726(rec.id)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-mono text-cyan-300 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedId === rec.id ? 'Copied 7726!' : 'Copy "7726" to clipboard'}</span>
                      </button>
                    </div>
                  )}

                  {rec.id === 'rec_report_ftc' && (
                    <div className="mt-2.5 flex items-center space-x-2">
                      <a
                        href="https://reportfraud.ftc.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-semibold text-brand-cyan hover:underline transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open ReportFraud.ftc.gov (Official)</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
