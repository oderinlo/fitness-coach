'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  themeColor?: string;
}

export default function MessageInput({ onSend, disabled = false, themeColor = '#d4a574' }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isActive = message.trim() && !disabled;

  return (
    <div className="relative">
      {/* Decorative top border */}
      <div
        className="absolute -top-px left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${themeColor}50, transparent)`,
        }}
      />

      <div className="bg-obsidian-900 p-4 md:p-5">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-3">
            {/* Text input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder="Ask your fitness question..."
                rows={1}
                className="
                  w-full bg-obsidian-800 text-ivory placeholder-ivory-500
                  px-5 py-4 pr-12
                  text-[15px] leading-relaxed
                  border-2 border-obsidian-700
                  focus:outline-none
                  transition-colors duration-200
                  resize-none
                  disabled:opacity-50 disabled:cursor-not-allowed
                  rounded-lg
                "
                style={{
                  minHeight: '56px',
                  borderColor: message.trim() ? themeColor : undefined,
                }}
              />

              {/* Character hint */}
              {message.length > 200 && (
                <div className="absolute bottom-2 right-3 text-[10px] text-ivory-500 font-display">
                  {message.length}/500
                </div>
              )}
            </div>

            {/* Send button */}
            <button
              onClick={handleSubmit}
              disabled={disabled || !message.trim()}
              className="
                relative group
                h-14 px-6
                font-display font-semibold text-sm uppercase tracking-wider
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                rounded-lg
              "
              style={{
                backgroundColor: isActive ? themeColor : '#2a2a2a',
                color: isActive ? '#050505' : '#6b6966',
                boxShadow: isActive ? `0 0 20px ${themeColor}40` : 'none',
              }}
            >
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <span className="hidden sm:inline">SEND</span>
              </span>
            </button>
          </div>

          {/* Keyboard hint */}
          <div className="mt-2 text-[11px] text-ivory-500 font-display tracking-wide">
            Press <kbd className="px-1.5 py-0.5 bg-obsidian-800 text-ivory-400 mx-0.5 rounded">ENTER</kbd> to send
            <span className="mx-2">|</span>
            <kbd className="px-1.5 py-0.5 bg-obsidian-800 text-ivory-400 mx-0.5 rounded">SHIFT + ENTER</kbd> for new line
          </div>
        </div>
      </div>
    </div>
  );
}
