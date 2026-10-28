import React from 'react';
import { Shield, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onOpenTransparency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTransparency }) => {
  return (
    <footer className="border-t border-brand-border/60 bg-brand-surface/60 mt-16 py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <Shield className="w-4 h-4 text-brand-cyan" />
            <span className="font-semibold text-slate-300">
              ScamSignal • AI Scam Message Analysis Tool
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">Original Architecture</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={onOpenTransparency}
              className="text-slate-400 hover:text-brand-cyan transition-colors"
            >
              Methodology & Scoring Math
            </button>
            <span className="text-slate-700">•</span>
            <a
              href="https://reportfraud.ftc.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-cyan inline-flex items-center space-x-1 transition-colors"
            >
              <span>FTC Fraud Center</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">•</span>
            <span className="text-slate-500">Forward SMS to 7726 (SPAM)</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-brand-border/40 text-[11px] text-slate-500 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-2">
          <p>
            Educational cybersecurity tool designed for transparency. Analysis results are advisory and do not constitute legal or commercial security guarantees.
          </p>
          <p className="flex items-center space-x-1">
            <span>Built from scratch with original heuristic logic</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
