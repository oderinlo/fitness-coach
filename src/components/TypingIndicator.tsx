'use client';

interface TypingIndicatorProps {
  themeColor?: string;
}

export default function TypingIndicator({ themeColor = '#d4a574' }: TypingIndicatorProps) {
  return (
    <div className="flex w-full mb-4 justify-start animate-fade-in">
      <div
        className="bg-obsidian-800 border-l-2 pl-5 pr-6 py-4"
        style={{ borderColor: themeColor }}
      >
        {/* Role indicator */}
        <div
          className="font-display text-[10px] uppercase tracking-[0.2em] mb-3"
          style={{ color: themeColor }}
        >
          COACH
        </div>

        {/* Typing dots */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full animate-typing"
            style={{ backgroundColor: themeColor, animationDelay: '0ms' }}
          />
          <div
            className="w-2 h-2 rounded-full animate-typing"
            style={{ backgroundColor: themeColor, animationDelay: '200ms' }}
          />
          <div
            className="w-2 h-2 rounded-full animate-typing"
            style={{ backgroundColor: themeColor, animationDelay: '400ms' }}
          />
          <span className="ml-2 text-ivory-500 text-sm font-display uppercase tracking-wider">
            Analyzing...
          </span>
        </div>
      </div>
    </div>
  );
}
