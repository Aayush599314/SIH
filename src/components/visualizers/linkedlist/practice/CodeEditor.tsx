import React, { useRef, useState } from 'react';
import { highlightCpp } from './cppHighlighter';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onReset: () => void;
  disabled?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onReset,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Split lines to calculate line count
  const lines = code.split('\n');
  const lineCount = lines.length;

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = target.scrollTop;
      preRef.current.scrollLeft = target.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = target.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled) return;

    // Handle TAB indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = '    '; // 4 spaces

      if (e.shiftKey) {
        // Shift+Tab: dedent current line if starts with spaces
        const lineStart = code.lastIndexOf('\n', start - 1) + 1;
        const lineContent = code.substring(lineStart);
        if (lineContent.startsWith('    ')) {
          const newCode = code.substring(0, lineStart) + code.substring(lineStart + 4);
          onChange(newCode);
          setTimeout(() => {
            textarea.selectionStart = Math.max(lineStart, start - 4);
            textarea.selectionEnd = Math.max(lineStart, end - 4);
          }, 0);
        }
      } else {
        // Regular Tab: insert 4 spaces
        const newCode = code.substring(0, start) + spaces + code.substring(end);
        onChange(newCode);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }, 0);
      }
    }

    // Auto-indent on Enter
    if (e.key === 'Enter') {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const currentLineStart = code.lastIndexOf('\n', start - 1) + 1;
      const currentLine = code.substring(currentLineStart, start);
      const match = currentLine.match(/^\s*/);
      const indent = match ? match[0] : '';
      
      // If line ends with '{', add extra indent
      const extraIndent = currentLine.trim().endsWith('{') ? '    ' : '';

      e.preventDefault();
      const insertText = '\n' + indent + extraIndent;
      const newCode = code.substring(0, start) + insertText + code.substring(textarea.selectionEnd);
      onChange(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="practice-editor-container">
      {/* Editor Header Bar */}
      <div className="practice-editor-header">
        <div className="practice-editor-meta">
          <span className="practice-editor-lang-badge">C++</span>
          <span className="practice-editor-std">ISO C++17</span>
        </div>
        <div className="practice-editor-actions">
          <button
            type="button"
            className="practice-editor-btn"
            onClick={handleCopy}
            title="Copy code to clipboard"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button
            type="button"
            className="practice-editor-btn practice-editor-btn-reset"
            onClick={onReset}
            title="Reset code to initial template"
          >
            ↺ Reset Code
          </button>
        </div>
      </div>

      {/* Code Area with synchronized line numbers and syntax overlay */}
      <div className="practice-editor-body">
        {/* Line Numbers Gutter */}
        <div className="practice-editor-gutter" ref={lineNumbersRef}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="practice-editor-line-number">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editor Wrapper */}
        <div className="practice-editor-wrapper">
          {/* Syntax Highlight Backdrop */}
          <pre
            className="practice-editor-highlight"
            ref={preRef}
            aria-hidden="true"
          >
            <code
              dangerouslySetInnerHTML={{ __html: highlightCpp(code) + '\n' }}
            />
          </pre>

          {/* Interactive Textarea */}
          <textarea
            ref={textareaRef}
            className="practice-editor-textarea"
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            disabled={disabled}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder="// Write your C++ solution here..."
          />
        </div>
      </div>
    </div>
  );
};
