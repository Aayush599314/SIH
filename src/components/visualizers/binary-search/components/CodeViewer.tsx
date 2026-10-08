import { motion } from 'framer-motion';
import type { Language } from '../types';

interface CodeViewerProps {
  code: string[];
  activeLine: number;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languageLabels: Record<Language, string> = {
  c: 'C',
  cpp: 'C++',
  java: 'Java',
};

export function CodeViewer({ code, activeLine, language, onLanguageChange }: CodeViewerProps) {
  return (
    <div className="flex flex-col h-full bg-[#0a0d14] rounded-xl overflow-hidden border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-white/[0.02]">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Source Code</span>
        <div className="flex gap-1">
          {(['c', 'cpp', 'java'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                language === lang
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-xs sm:text-[13px] leading-relaxed">
        <pre className="leading-relaxed">
          {code.map((line, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                backgroundColor: i === activeLine
                  ? 'rgba(59, 130, 246, 0.15)'
                  : 'rgba(0, 0, 0, 0)',
              }}
              className={`flex items-start gap-3 rounded px-2 py-0.5 transition-colors duration-200 ${
                i === activeLine
                  ? 'bg-blue-500/15 border-l-2 border-blue-400'
                  : 'border-l-2 border-transparent'
              }`}
            >
              <span className={`select-none w-6 text-right font-mono text-xs ${i === activeLine ? 'text-blue-400 font-bold' : 'text-slate-600'}`}>
                {i + 1}
              </span>
              <span className={`flex-1 font-mono ${i === activeLine ? 'text-blue-200 font-semibold' : 'text-slate-300'}`}>
                {line || ' '}
              </span>
            </motion.div>
          ))}
        </pre>
      </div>
      {activeLine >= 0 && activeLine < code.length && (
        <div className="border-t border-white/10 px-4 py-2 bg-white/[0.02]">
          <span className="text-xs text-slate-400 font-mono">
            Line <span className="font-bold text-blue-400">{activeLine + 1}</span> is currently executing
          </span>
        </div>
      )}
    </div>
  );
}
