import React from 'react';

/**
 * Format inline markdown elements like bold (**, ****), italic (*), and inline code (`)
 * Strictly monochrome design system (Black, White, Zinc)
 */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  // Normalize ****bold**** to **bold**
  const normalized = text.replace(/\*{4,}(.*?)\*{4,}/g, '**$1**');

  // Regex to match bold (**text**), inline code (`code`), or italic (*text*)
  const tokens = normalized.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);

  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={index}
          className="bg-white/10 text-zinc-200 font-mono text-[11px] px-1.5 py-0.5 rounded border border-white/10"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      return (
        <em key={index} className="italic text-zinc-300">
          {token.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={index}>{token}</React.Fragment>;
  });
}

/**
 * Robust Zero-Dependency Markdown Renderer for Mantikole AI Chat
 * Pure Monochrome Black & White Palette
 */
export function formatAiMessage(content: string): React.ReactNode {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];

  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = (key: number) => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      blocks.push(
        <ul key={`ul-${key}`} className="my-1.5 space-y-1 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start space-x-2 text-zinc-200 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 mt-1.5 shrink-0" />
              <span className="flex-1">{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      blocks.push(
        <ol key={`ol-${key}`} className="my-1.5 space-y-1 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start space-x-2 text-zinc-200 leading-relaxed">
              <span className="text-zinc-400 font-semibold text-[11px] mt-0.5 shrink-0">
                {i + 1}.
              </span>
              <span className="flex-1">{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Bullet list
    const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      if (currentList && currentList.type !== 'ul') {
        flushList(idx);
      }
      if (!currentList) {
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      return;
    }

    // Numbered list
    const numberMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numberMatch) {
      if (currentList && currentList.type !== 'ol') {
        flushList(idx);
      }
      if (!currentList) {
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(numberMatch[1]);
      return;
    }

    if (currentList) {
      flushList(idx);
    }

    if (!trimmed) {
      blocks.push(<div key={`space-${idx}`} className="h-2" />);
      return;
    }

    // Heading
    const headingMatch = trimmed.match(/^#{1,3}\s+(.*)$/);
    if (headingMatch) {
      blocks.push(
        <h4
          key={`h-${idx}`}
          className="font-semibold text-white text-xs mt-2.5 mb-1 tracking-tight"
        >
          {renderInlineMarkdown(headingMatch[1])}
        </h4>
      );
      return;
    }

    // Standard paragraph
    blocks.push(
      <p key={`p-${idx}`} className="text-zinc-200 leading-relaxed">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
  });

  if (currentList) {
    flushList(lines.length);
  }

  return <div className="space-y-1.5 text-xs">{blocks}</div>;
}
