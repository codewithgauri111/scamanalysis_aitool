import React, { useState } from 'react';
import { X, Sparkles, Key, Check, Info, Shield } from 'lucide-react';

interface AiSettingsModalProps {
  isAiEnabled: boolean;
  setIsAiEnabled: (val: boolean) => void;
  apiKey: string;
  setApiKey: (val: string) => void;
  onClose: () => void;
}

export const AiSettingsModal: React.FC<AiSettingsModalProps> = ({
  isAiEnabled,
  setIsAiEnabled,
  apiKey,
  setApiKey,
  onClose
}) => {
  const [localKey, setLocalKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiKey(localKey);
    localStorage.setItem('scamsignal_gemini_key', localKey);
    localStorage.setItem('scamsignal_ai_enabled', isAiEnabled ? 'true' : 'false');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-surface border border-brand-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-base">Analysis Engine Configuration</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Dual engine explanation */}
          <div className="bg-brand-card/70 border border-brand-border/60 rounded-xl p-3.5 text-xs text-slate-300">
            <p className="font-semibold text-slate-200 mb-1 flex items-center space-x-1.5">
              <Shield className="w-4 h-4 text-brand-cyan" />
              <span>Dual-Engine Architecture</span>
            </p>
            <p className="text-slate-400">
              The primary engine uses fast, 100% deterministic cybersecurity rules and URL forensics locally in your browser. Optional AI reasoning can provide supplementary natural language context.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-sm font-bold text-white block">Enable AI Reasoning Layer</span>
              <span className="text-xs text-slate-400">Add nuanced contextual explanation to heuristic findings</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAiEnabled}
                onChange={(e) => setIsAiEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Optional API Key Input */}
          {isAiEnabled && (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Key className="w-3.5 h-3.5 text-purple-400" />
                  <span>Optional Google Gemini API Key</span>
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Stored locally in your browser</span>
              </label>
              <input
                type="password"
                value={localKey}
                onChange={(e) => setLocalKey(e.target.value)}
                placeholder="AIzaSy... (leave blank for local simulated AI synthesis)"
                className="w-full bg-brand-bg border border-brand-border/80 rounded-lg p-2.5 text-xs text-slate-100 font-mono placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
              <div className="flex items-start space-x-1.5 text-[11px] text-slate-400 bg-purple-950/20 border border-purple-900/40 rounded-lg p-2.5">
                <Info className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>
                  No key required for standard use. If omitted, the application runs simulated AI contextual synthesis while fully computing deterministic heuristics.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-brand-border bg-brand-card/40 flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:opacity-95 flex items-center space-x-1.5 transition-all shadow-md"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-white" /> : <Sparkles className="w-3.5 h-3.5 text-white" />}
            <span>{saved ? 'Settings Saved!' : 'Save Preferences'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
