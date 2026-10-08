/**
 * Lightweight C++ syntax token highlighter for zero-dependency high-fidelity code display.
 */
export function highlightCpp(code: string): string {
  // Escape HTML characters first
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Regex patterns for C++
  const keywords = /\b(return|while|for|if|else|break|continue|switch|case|default|new|delete|nullptr|NULL|struct|class|public|private|true|false|include|namespace|using|std|vector)\b/g;
  const types = /\b(int|bool|void|char|double|float|long|size_t|ListNode|vector|auto)\b/g;
  const pointers = /(->val|->next|->)/g;
  const numbers = /\b(\d+)\b/g;
  const comments = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;

  // We can use token replacement with safe placeholders to prevent double-replacements
  const tokens: { placeholder: string; replacement: string }[] = [];
  let tokenIdx = 0;

  const saveToken = (content: string, className: string) => {
    const placeholder = `___TOKEN_${tokenIdx++}___`;
    tokens.push({
      placeholder,
      replacement: `<span class="${className}">${content}</span>`,
    });
    return placeholder;
  };

  // 1. Comments first (they should not have internal tokens highlighted)
  html = html.replace(comments, (match) => saveToken(match, 'cpp-comment'));

  // 2. Preprocessor directives (#include <...>)
  html = html.replace(/(#include\s*&lt;[^&]+&gt;)/g, (match) => saveToken(match, 'cpp-preprocessor'));

  // 3. Keywords
  html = html.replace(keywords, (match) => saveToken(match, 'cpp-keyword'));

  // 4. Types
  html = html.replace(types, (match) => saveToken(match, 'cpp-type'));

  // 5. Pointers and member access
  html = html.replace(pointers, (match) => saveToken(match, 'cpp-pointer'));

  // 6. Numbers
  html = html.replace(numbers, (match) => saveToken(match, 'cpp-number'));

  // Restore tokens
  for (let i = tokens.length - 1; i >= 0; i--) {
    html = html.replace(tokens[i].placeholder, tokens[i].replacement);
  }

  return html;
}
