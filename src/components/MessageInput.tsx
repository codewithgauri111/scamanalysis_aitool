import React, { useState } from 'react';
import { Send, Clipboard, Trash2, Link2, Sparkles, AlertCircle } from 'lucide-react';
import { SYNTHETIC_SAMPLES } from '../engine/syntheticSamples';
import { SyntheticSample } from '../types';

interface MessageInputProps {
  message: string;
  setMessage: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onSelectSample: (sample: SyntheticSample) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  onAnalyze,
  isLoading,
  onSelectSample,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'SMS' | 'EMAIL' | 'WHATSAPP' | 'CHAT'>('SMS');
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setMessage(text);
        setPasteSuccess(true);
        setTimeout(() => setPasteSuccess(false), 1500);
      }
    } catch {
      // Fallback if clipboard permission is restricted
    }
  };

  const urlMatches = message.match(/(?:https?:\/\/|www\.)[^\s<>"'{}|\\^`]+|(?:[a-zA-Z0-9-]+\.)+(?:xyz|top|site|com|net|org|io|tk|sbs|cfd)\b/gi) || [];
  const urlCount = urlMatches.length;

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 sm:p-6 shadow-xl">
      {/* Top Bar: Channel selector & Synthetic Samples */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-brand-border/60">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
            1. Select Message Channel
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(['SMS', 'EMAIL', 'WHATSAPP', 'CHAT'] as const).map((channel) => (
              <button
                key={channel}
                type="button"
                onClick={() => setSelectedChannel(channel)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedChannel === channel
                    ? 'bg-cyan-500/20 text-brand-cyan border border-brand-cyan/40 shadow-sm'
                    : 'bg-brand-card/80 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {channel === 'SMS' && '📱 SMS / Text'}
                {channel === 'EMAIL' && '✉️ Email'}
                {channel === 'WHATSAPP' && '💬 WhatsApp'}
                {channel === 'CHAT' && '🤖 Chat / Direct Msg'}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Sample Picker */}
        <div className="sm:text-right">
          <label htmlFor="sample-picker" className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
            Test With Synthetic Examples:
          </label>
          <select
            id="sample-picker"
            aria-label="Test With Synthetic Examples"
            onChange={(e) => {
              const sample = SYNTHETIC_SAMPLES.find(s => s.id === e.target.value);
              if (sample) {
                onSelectSample(sample);
                setSelectedChannel(sample.channel);
              }
            }}
            defaultValue=""
            className="w-full sm:w-auto bg-brand-card text-xs text-slate-200 border border-brand-border rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-cyan transition-colors"
          >
            <option value="" disabled>Load realistic test scenario...</option>
            {SYNTHETIC_SAMPLES.map((sample) => (
              <option key={sample.id} value={sample.id}>
                [{sample.expectedRisk}] {sample.title} ({sample.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Textarea Input */}
      <div className="relative">
        <label htmlFor="message-textarea" className="sr-only">Suspicious message text</label>
        <textarea
          id="message-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
              e.preventDefault();
              if (message.trim()) onAnalyze();
            }
          }}
          placeholder="Paste or type suspicious message text here... (e.g. 'USPS: Your parcel cannot be delivered. Update details within 24 hours at http://...')"
          rows={6}
          className="w-full bg-brand-bg/90 border border-brand-border/80 rounded-xl p-4 text-slate-100 placeholder-slate-500 font-sans text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-y"
        />

        {/* Quick action buttons within textarea frame */}
        <div className="absolute right-3 top-3 flex items-center space-x-1.5">
          <button
            type="button"
            onClick={handlePaste}
            className="px-2.5 py-1 rounded-md bg-brand-card text-xs text-slate-300 hover:text-white border border-brand-border/60 hover:border-slate-500 flex items-center space-x-1 transition-all"
            title="Paste from clipboard"
          >
            <Clipboard className="w-3.5 h-3.5 text-brand-cyan" />
            <span>{pasteSuccess ? 'Pasted!' : 'Paste'}</span>
          </button>

          {message.trim().length > 0 && (
            <button
              type="button"
              onClick={() => setMessage('')}
              className="p-1 rounded-md bg-brand-card text-slate-400 hover:text-red-400 border border-brand-border/60 hover:border-red-500/50 transition-all"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Status Bar & Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
        {/* Character and Link count */}
        <div className="flex items-center space-x-3 text-xs text-slate-400 w-full sm:w-auto">
          <span>{message.length} characters</span>
          {urlCount > 0 && (
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
              <Link2 className="w-3 h-3" />
              <span>{urlCount} link{urlCount > 1 ? 's' : ''} detected</span>
            </span>
          )}
          <span className="hidden lg:inline text-slate-500">• Press Ctrl + Enter to analyze</span>
        </div>

        {/* Primary analyze button */}
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!message.trim() || isLoading}
          className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md ${
            !message.trim() || isLoading
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              : 'bg-gradient-to-r from-brand-cyan to-brand-teal text-slate-950 hover:opacity-95 shadow-glow cursor-pointer active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              <span>Evaluating Indicators...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Analyze Message</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
