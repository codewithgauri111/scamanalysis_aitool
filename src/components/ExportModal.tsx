import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { X, Copy, Download, Check, FileText, Code } from 'lucide-react';

interface ExportModalProps {
  result: AnalysisResult;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ result, onClose }) => {
  const [format, setFormat] = useState<'MARKDOWN' | 'JSON'>('MARKDOWN');
  const [copied, setCopied] = useState(false);

  const generateMarkdownReport = () => {
    return `# ScamSignal Incident Assessment Report
Generated: ${new Date(result.timestamp).toUTCString()}
Scan ID: ${result.id}

## 1. Executive Summary
- **Risk Score:** ${result.normalizedScore} / 100
- **Classification:** ${result.riskLevel}
- **Engine Type:** ${result.engineType}
- **Evaluation Findings:** ${result.summary}

## 2. Submitted Message Text
\`\`\`text
${result.inputMessage}
\`\`\`

## 3. Discovered Threat Signatures (${result.indicators.length})
${result.indicators.map(i => `- **[${i.severity.toUpperCase()}] ${i.name}**: "${i.matchedSnippet}" (${i.weight} pts)\n  *Reason:* ${i.explanation}`).join('\n')}

## 4. URL & Domain Forensics (${result.urlFindings.length})
${result.urlFindings.map(u => `- **URL:** ${u.url}\n  *Host:* ${u.domain} | *TLD:* .${u.tld} | *Threat Score:* ${u.riskScore}/100\n  *Flags:* ${u.flags.join('; ')}`).join('\n') || 'None'}

## 5. Recommended Actions
${result.recommendations.map(r => `1. **[${r.priority}] ${r.title}**: ${r.detail}`).join('\n')}

---
*Notice: This report was compiled by ScamSignal for educational risk evaluation purposes. Official fraud complaints should be lodged with carrier desk (7726) and FTC.*
`;
  };

  const content = format === 'MARKDOWN'
    ? generateMarkdownReport()
    : JSON.stringify(result, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: format === 'MARKDOWN' ? 'text/markdown' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scamsignal-report-${result.id}.${format === 'MARKDOWN' ? 'md' : 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-surface border border-brand-border rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-brand-cyan" />
            <h3 className="font-bold text-white text-base">Export Scam Incident Report</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-5 pt-4 flex items-center justify-between border-b border-brand-border/60 pb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFormat('MARKDOWN')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                format === 'MARKDOWN'
                  ? 'bg-cyan-500/20 text-brand-cyan border border-brand-cyan/40'
                  : 'bg-brand-card text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown (.md)</span>
            </button>
            <button
              onClick={() => setFormat('JSON')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                format === 'JSON'
                  ? 'bg-cyan-500/20 text-brand-cyan border border-brand-cyan/40'
                  : 'bg-brand-card text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Raw Data (.json)</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center space-x-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-brand-cyan" />}
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-semibold text-cyan-300 flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-300 bg-brand-bg/90 whitespace-pre-wrap selection:bg-cyan-500/30">
          {content}
        </div>
      </div>
    </div>
  );
};
