import { useState } from 'react';
import type { Language, CodeMap } from '../types';

interface CodePanelProps {
  codeMap: CodeMap;
  activeLine: number;
}

const langLabels: Record<Language, string> = {
  c: 'C',
  cpp: 'C++',
  java: 'Java',
};

export function CodePanel({ codeMap, activeLine }: CodePanelProps) {
  const [lang, setLang] = useState<Language>('java');
  const lines = codeMap[lang];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-800 bg-slate-900/80">
        {(['c', 'cpp', 'java'] as Language[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              lang === l
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            {langLabels[l]}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-500 font-mono">
          Line {activeLine + 1} executing
        </span>
      </div>
      <div className="overflow-x-auto">
        <pre className="text-sm font-mono p-4 leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div
                key={i}
                className={`flex transition-colors duration-200 ${
                  i === activeLine
                    ? 'bg-sky-500/15 -mx-4 px-4 border-l-2 border-sky-400'
                    : 'border-l-2 border-transparent -mx-4 px-4'
                }`}
              >
                <span className="text-slate-600 select-none w-8 shrink-0 text-right pr-3">
                  {i + 1}
                </span>
                <span className={i === activeLine ? 'text-sky-200' : 'text-slate-300'}>
                  {line || ' '}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
