import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MessageInput } from './components/MessageInput';
import { RiskMeter } from './components/RiskMeter';
import { DecompositionBars } from './components/DecompositionBars';
import { EvidenceInspector } from './components/EvidenceInspector';
import { UrlForensicsCard } from './components/UrlForensicsCard';
import { SafetyPlaybookCard } from './components/SafetyPlaybookCard';
import { ExportModal } from './components/ExportModal';
import { TransparencyModal } from './components/TransparencyModal';
import { AiSettingsModal } from './components/AiSettingsModal';
import { Footer } from './components/Footer';
import { analyzeMessage } from './engine/detector';
import { AnalysisResult, SyntheticSample } from './types';
import { SYNTHETIC_SAMPLES } from './engine/syntheticSamples';
import { Download, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modals
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Settings
  const [isAiEnabled, setIsAiEnabled] = useState<boolean>(() => {
    return localStorage.getItem('scamsignal_ai_enabled') === 'true';
  });
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('scamsignal_gemini_key') || '';
  });

  // Load first synthetic sample on start for demonstration
  useEffect(() => {
    const defaultSample = SYNTHETIC_SAMPLES[0];
    setMessage(defaultSample.text);
    // Auto-analyze default sample to show instant working workbench
    handleAnalyze(defaultSample.text);
  }, []);

  const handleAnalyze = async (overrideText?: string) => {
    const textToAnalyze = overrideText !== undefined ? overrideText : message;
    if (!textToAnalyze.trim()) return;

    setIsLoading(true);
    try {
      const res = await analyzeMessage(textToAnalyze, {
        apiKey,
        enableAiAssistance: isAiEnabled,
      });
      setResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sample: SyntheticSample) => {
    setMessage(sample.text);
    handleAnalyze(sample.text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0E17] text-slate-100">
      {/* Top Navigation */}
      <Header
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isAiEnabled={isAiEnabled}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner */}
        <div className="text-center sm:text-left space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span>Original Scam Detection Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Scam Message Analysis Tool
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Deconstruct suspicious SMS, emails, WhatsApp messages, and direct chats. Our transparent heuristic engine audits psychological pressure, uncovers deceptive subdomains, computes an explainable 0–100 risk score, and provides a defensive incident playbook.
          </p>
        </div>

        {/* Input Card */}
        <section aria-label="Message Input Section">
          <MessageInput
            message={message}
            setMessage={setMessage}
            onAnalyze={() => handleAnalyze()}
            isLoading={isLoading}
            onSelectSample={handleSelectSample}
          />
        </section>

        {/* Results View */}
        {result && (
          <section aria-label="Analysis Results" className="space-y-6 animate-fadeIn">
            {/* Action Bar for Results */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Scan Reference:</span>
                <span className="font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                  {result.id}
                </span>
                <span>• Evaluated {new Date(result.timestamp).toLocaleTimeString()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsExportOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-card hover:bg-slate-800 border border-brand-border hover:border-slate-600 text-xs font-semibold text-slate-200 flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Export Incident Report</span>
                </button>
              </div>
            </div>

            {/* Overall Risk Meter */}
            <RiskMeter
              score={result.normalizedScore}
              riskLevel={result.riskLevel}
              summary={result.summary}
            />

            {/* Optional AI Reasoning Card (if active) */}
            {result.aiReasoning && (
              <div className="bg-purple-950/20 border border-purple-500/30 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h4 className="text-sm font-bold text-purple-200">
                    AI Contextual Deep Reasoning ({result.engineType})
                  </h4>
                </div>
                <p className="text-xs text-purple-100/90 whitespace-pre-line leading-relaxed font-sans">
                  {result.aiReasoning}
                </p>
              </div>
            )}

            {/* Threat Factor Decomposition & URL Forensics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DecompositionBars categories={result.categoryScores} />
              <UrlForensicsCard urlFindings={result.urlFindings} />
            </div>

            {/* Evidence Inspector */}
            <EvidenceInspector indicators={result.indicators} />

            {/* Safety Playbook */}
            <SafetyPlaybookCard recommendations={result.recommendations} />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenTransparency={() => setIsHelpOpen(true)} />

      {/* Modals */}
      {isHelpOpen && <TransparencyModal onClose={() => setIsHelpOpen(false)} />}
      {isSettingsOpen && (
        <AiSettingsModal
          isAiEnabled={isAiEnabled}
          setIsAiEnabled={setIsAiEnabled}
          apiKey={apiKey}
          setApiKey={setApiKey}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
      {isExportOpen && result && (
        <ExportModal result={result} onClose={() => setIsExportOpen(false)} />
      )}
    </div>
  );
};
