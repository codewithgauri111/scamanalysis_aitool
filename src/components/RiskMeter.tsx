import React from 'react';
import { RiskLevel } from '../types';
import { AlertTriangle, ShieldCheck, ShieldAlert, AlertOctagon } from 'lucide-react';

interface RiskMeterProps {
  score: number;
  riskLevel: RiskLevel;
  summary: string;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score, riskLevel, summary }) => {
  // SVG gauge constants
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc calculation for 240 degrees representation
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * (score / 100));

  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'SAFE':
        return {
          title: 'Benign / Low Suspicion',
          badgeClass: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 shadow-glow-safe',
          strokeColor: '#10B981',
          icon: ShieldCheck,
          textColor: 'text-emerald-400'
        };
      case 'LOW':
        return {
          title: 'Low Risk',
          badgeClass: 'bg-blue-950/80 text-blue-400 border-blue-500/40',
          strokeColor: '#3B82F6',
          icon: ShieldCheck,
          textColor: 'text-blue-400'
        };
      case 'MODERATE':
        return {
          title: 'Moderate Threat',
          badgeClass: 'bg-amber-950/80 text-amber-400 border-amber-500/40',
          strokeColor: '#F59E0B',
          icon: AlertTriangle,
          textColor: 'text-amber-400'
        };
      case 'CRITICAL':
      default:
        return {
          title: 'Critical Threat / High Probability Scam',
          badgeClass: 'bg-red-950/80 text-red-400 border-red-500/40 shadow-glow-critical',
          strokeColor: '#EF4444',
          icon: AlertOctagon,
          textColor: 'text-red-400'
        };
    }
  };

  const config = getRiskConfig();
  const IconComponent = config.icon;

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-xl flex flex-col md:flex-row items-center gap-6">
      {/* SVG Radial Meter */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="transform -rotate-135"
        >
          {/* Background track arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active colored score arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={config.strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={`text-4xl font-extrabold font-mono tracking-tight ${config.textColor}`}>
            {score}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
            / 100 Risk Score
          </span>
        </div>
      </div>

      {/* Narrative & Assessment details */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2.5">
          <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${config.badgeClass}`}>
            <IconComponent className="w-4 h-4" />
            <span>{config.title}</span>
          </span>
          <span className="text-xs text-slate-400">
            • Deterministic Heuristic Analysis
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          {score >= 70
            ? 'Severe Psychological Pressure & Fraud Markers Detected'
            : score >= 40
            ? 'Notable Suspicious Patterns Discovered'
            : score >= 20
            ? 'Minor Inconsistencies Observed'
            : 'No Apparent Scam Indicators Identified'}
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed bg-brand-card/60 rounded-xl p-3.5 border border-brand-border/40">
          {summary}
        </p>

        {/* Score Threshold legend */}
        <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-brand-border/40 text-[10px] text-slate-400 text-center font-mono">
          <div className="bg-emerald-950/30 border border-emerald-900/40 rounded py-1">0-19: Safe</div>
          <div className="bg-blue-950/30 border border-blue-900/40 rounded py-1">20-39: Low</div>
          <div className="bg-amber-950/30 border border-amber-900/40 rounded py-1">40-69: Moderate</div>
          <div className="bg-red-950/30 border border-red-900/40 rounded py-1">70-100: Critical</div>
        </div>
      </div>
    </div>
  );
};
