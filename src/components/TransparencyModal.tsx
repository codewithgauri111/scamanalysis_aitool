import React from 'react';
import { X, ShieldAlert, Cpu, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';

interface TransparencyModalProps {
  onClose: () => void;
}

export const TransparencyModal: React.FC<TransparencyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-surface border border-brand-border rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-brand-cyan" />
            <h3 className="font-bold text-white text-base">How ScamSignal Evaluates Messages</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Explanations */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 text-sm text-slate-300 leading-relaxed">
          {/* Section 1: Philosophy */}
          <div>
            <h4 className="font-bold text-white text-sm mb-1 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              <span>1. Transparent Heuristic Engine (No Black Box)</span>
            </h4>
            <p className="text-xs text-slate-300">
              Unlike generic AI wrappers that hallucinate confidence scores without justification, ScamSignal decomposes each message into verifiable deception vectors. Every warning sign is paired with the exact snippet matched and a plain-language explanation of why attackers employ that tactic.
            </p>
          </div>

          {/* Section 2: Mathematical Weighting */}
          <div>
            <h4 className="font-bold text-white text-sm mb-1 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-violet" />
              <span>2. Multi-Vector Weighting Framework</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mt-2">
              <div className="bg-brand-card p-2.5 rounded-lg border border-brand-border/60">
                <span className="text-brand-cyan font-bold block">Financial Demands (25%)</span>
                Gift cards, crypto ATMs, wire transfers, fake prize fees.
              </div>
              <div className="bg-brand-card p-2.5 rounded-lg border border-brand-border/60">
                <span className="text-brand-cyan font-bold block">Urgency & Ultimatums (20%)</span>
                Arbitrary deadlines, arrest threats, immediate lockout panic.
              </div>
              <div className="bg-brand-card p-2.5 rounded-lg border border-brand-border/60">
                <span className="text-brand-cyan font-bold block">Authority Spoofing (20%)</span>
                Banks, USPS/couriers, tax agencies, distressed family.
              </div>
              <div className="bg-brand-card p-2.5 rounded-lg border border-brand-border/60">
                <span className="text-brand-cyan font-bold block">Malicious / Obscured Links (20%)</span>
                Subdomain spoofing, disposable TLDs, shortened redirects.
              </div>
              <div className="bg-brand-card p-2.5 rounded-lg border border-brand-border/60 sm:col-span-2">
                <span className="text-brand-cyan font-bold block">Credential Harvesting (15%)</span>
                OTP / 2FA extraction, bogus login forms, personal identity traps.
              </div>
            </div>
          </div>

          {/* Section 3: Privacy */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5">
            <h4 className="font-bold text-emerald-300 text-xs mb-1 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side Privacy Guarantee</span>
            </h4>
            <p className="text-xs text-slate-300">
              When analyzing messages containing personal phone numbers or names, your text is processed entirely within your browser's local memory. No message data is logged, retained, or sent to cloud servers unless you explicitly activate external AI API integration.
            </p>
          </div>

          {/* Section 4: Realistic Limitations */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5">
            <h4 className="font-bold text-amber-300 text-xs mb-1 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Important Limitations & Disclaimer</span>
            </h4>
            <p className="text-xs text-slate-300">
              ScamSignal is an educational decision-support tool. It cannot guarantee 100% detection accuracy. Advanced spear-phishing or zero-day tactics may bypass pattern rules, and legitimate urgent notifications might trigger cautionary flags. When in doubt, always independently verify through trusted phone numbers or official web portals.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-brand-border bg-brand-card/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-brand-cyan text-slate-950 font-bold text-xs hover:opacity-95 transition-all"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
