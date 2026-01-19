'use client';

import { memo } from 'react';

interface MessageProps {
  content: string;
  role: 'user' | 'assistant';
  isNew?: boolean;
  themeColor?: string;
}

function Message({ content, role, isNew = false, themeColor = '#d4a574' }: MessageProps) {
  const isUser = role === 'user';

  // Simple markdown-like formatting for assistant messages
  const formatContent = (text: string) => {
    if (isUser) return text;

    // Convert markdown-style formatting to HTML
    return text
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('## ')) {
          return `<h2 key="${i}">${line.slice(3)}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3 key="${i}">${line.slice(4)}</h3>`;
        }
        // Bold
        line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        // Code
        line = line.replace(/`([^`]+)`/g, '<code>$1</code>');
        // List items
        if (line.match(/^[-*]\s/)) {
          return `<li>${line.slice(2)}</li>`;
        }
        if (line.match(/^\d+\)\s/)) {
          return `<li>${line.slice(line.indexOf(')') + 2)}</li>`;
        }
        // Empty lines become breaks
        if (line.trim() === '') {
          return '<br/>';
        }
        return `<p>${line}</p>`;
      })
      .join('');
  };

  return (
    <div
      className={`
        flex w-full mb-4
        ${isNew ? 'animate-slide-up' : 'animate-fade-in'}
        ${isUser ? 'justify-end' : 'justify-start'}
      `}
    >
      <div
        className={`
          relative max-w-[85%] md:max-w-[75%]
          ${isUser
            ? 'rounded-2xl rounded-br-sm px-5 py-3'
            : 'bg-obsidian-800 border-l-2 pl-5 pr-5 py-4'
          }
        `}
        style={{
          backgroundColor: isUser ? themeColor : undefined,
          borderColor: isUser ? undefined : themeColor,
        }}
      >
        {/* Role indicator */}
        <div
          className={`
            font-display text-[10px] uppercase tracking-[0.2em] mb-2
            ${isUser ? 'text-obsidian-800' : ''}
          `}
          style={{ color: isUser ? undefined : themeColor }}
        >
          {isUser ? 'YOU' : 'COACH'}
        </div>

        {/* Message content */}
        {isUser ? (
          <p className="text-[15px] leading-relaxed font-medium text-obsidian-950">{content}</p>
        ) : (
          <div
            className="message-content text-[15px] text-ivory-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(content) }}
          />
        )}

        {/* Decorative corner for user messages */}
        {isUser && (
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3"
            style={{
              backgroundColor: `${themeColor}cc`,
              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default memo(Message);
