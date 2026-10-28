import React from 'react';
import { ShieldAlert, Cpu, Sparkles, HelpCircle, Lock } from 'lucide-react';

interface HeaderProps {
  onOpenHelp: () => void;
  onOpenSettings: () => void;
  isAiEnabled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHelp, onOpenSettings, isAiEnabled }) => {
  return (
    <header className="border-b border-brand-border/60 bg-brand-surface/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/40 shadow-glow">
            <ShieldAlert className="w-6 h-6 text-brand-cyan" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-cyan"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                ScamSignal
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-brand-cyan border border-brand-cyan/30">
                v1.0 Original
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              AI Scam Message Analysis & Heuristic Threat Forensic Workbench
            </p>
          </div>
        </div>

        {/* Engine Badges & Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Privacy badge */}
          <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium" title="Evaluations run locally inside your browser. No message text is stored.">
            <Lock className="w-3.5 h-3.5" />
            <span>Private & Local</span>
          </div>

          {/* Engine indicator button */}
          <button
            onClick={onOpenSettings}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              isAiEnabled
                ? 'bg-purple-950/50 border-purple-500/40 text-purple-300 hover:bg-purple-900/40 shadow-sm'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/60'
            }`}
            title="Configure analysis engines and optional AI reasoning"
          >
            {isAiEnabled ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Engine: AI Assisted</span>
                <span className="sm:hidden">AI Mode</span>
              </>
            ) : (
              <>
                <Cpu className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="hidden sm:inline">Engine: Rule Heuristics</span>
                <span className="sm:hidden">Rules</span>
              </>
            )}
          </button>

          {/* Help & Transparency button */}
          <button
            onClick={onOpenHelp}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-700/60 text-xs font-medium transition-colors"
            title="Learn how the scoring logic works and tool limitations"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">How It Works</span>
          </button>
        </div>
      </div>
    </header>
  );
};
