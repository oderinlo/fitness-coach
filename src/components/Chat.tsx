'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { LEVELS } from '@/lib/gamification';
import { LevelName } from '@/types/gamification';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

interface ChatProps {
  onMessageSent?: () => void;
  activeTheme: LevelName;
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export default function Chat({ onMessageSent, activeTheme }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [newMessageId, setNewMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const themeColor = LEVELS[activeTheme].themeColor;

  // Initialize session
  useEffect(() => {
    const stored = localStorage.getItem('fitness-coach-session');
    if (stored) {
      const { sessionId: storedId, messages: storedMessages } = JSON.parse(stored);
      setSessionId(storedId);
      setMessages(storedMessages);
    } else {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem('fitness-coach-session', JSON.stringify({
        sessionId: newSessionId,
        messages: []
      }));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('fitness-coach-session', JSON.stringify({
        sessionId,
        messages
      }));
    }
  }, [messages, sessionId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clear new message flag after animation
  useEffect(() => {
    if (newMessageId) {
      const timer = setTimeout(() => setNewMessageId(null), 500);
      return () => clearTimeout(timer);
    }
  }, [newMessageId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!sessionId || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      content,
      role: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessageId(userMessage.id);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        content: data.response || 'Sorry, I could not process that request.',
        role: 'assistant',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setNewMessageId(assistantMessage.id);

      // Notify parent that a message was sent (for XP)
      onMessageSent?.();
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        content: 'Sorry, there was an error connecting to the fitness coach. Please try again.',
        role: 'assistant',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setNewMessageId(errorMessage.id);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isLoading, onMessageSent]);

  const startNewSession = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setMessages([]);
    localStorage.setItem('fitness-coach-session', JSON.stringify({
      sessionId: newSessionId,
      messages: []
    }));
  };

  return (
    <div className="flex flex-col h-full bg-obsidian-950">
      {/* Header */}
      <header className="relative z-10 bg-obsidian-900 border-b border-obsidian-700">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo mark */}
            <div className="relative">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-lg"
                style={{ backgroundColor: themeColor }}
              >
                <svg className="w-6 h-6 text-obsidian-950" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
                </svg>
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-2 h-2 rounded-sm"
                style={{ backgroundColor: `${themeColor}aa` }}
              />
            </div>

            {/* Title */}
            <div>
              <h1 className="font-display font-bold text-xl tracking-wide text-ivory">
                FITNESS COACH
              </h1>
              <p className="text-[11px] text-ivory-500 font-display uppercase tracking-[0.15em]">
                AI Training Partner
              </p>
            </div>
          </div>

          {/* New session button */}
          <button
            onClick={startNewSession}
            className="
              px-4 py-2
              text-[11px] font-display uppercase tracking-wider
              text-ivory-500 hover:text-ivory
              border border-obsidian-600 hover:border-ivory-500
              transition-colors duration-200
              rounded-lg
            "
          >
            New Session
          </button>
        </div>

        {/* Decorative bottom stripe */}
        <div
          className="h-0.5 opacity-30"
          style={{
            background: `repeating-linear-gradient(-45deg, transparent, transparent 2px, ${themeColor} 2px, ${themeColor} 4px)`,
          }}
        />
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
          {messages.length === 0 ? (
            // Welcome state
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div
                className="w-20 h-20 bg-obsidian-800 border-2 border-obsidian-700 flex items-center justify-center mb-6 rounded-xl"
              >
                <svg className="w-10 h-10" fill={themeColor} viewBox="0 0 24 24">
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
                </svg>
              </div>

              <h2 className="font-display font-bold text-2xl md:text-3xl text-ivory mb-3 tracking-wide">
                READY TO TRAIN
              </h2>

              <p className="text-ivory-500 max-w-md mb-4 leading-relaxed">
                Your AI fitness coach for weightlifting, yoga, mobility work, and nutrition guidance.
                Evidence-based advice tailored to your goals.
              </p>

              {/* Gamification callout */}
              <p className="text-sm mb-8" style={{ color: themeColor }}>
                Send 10 messages to level up and unlock new themes!
              </p>

              {/* Suggested prompts */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {[
                  'How do I improve my squat form?',
                  'Create a 3-day workout split',
                  'Best stretches for tight hips',
                  'Post-workout nutrition tips',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="
                      px-4 py-2
                      text-sm text-ivory-400 hover:text-ivory
                      bg-obsidian-800 hover:bg-obsidian-700
                      border border-obsidian-700
                      transition-all duration-200
                      rounded-lg
                    "
                    style={{
                      borderColor: undefined,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = themeColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#1e1e1e';
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Messages list
            <div className="space-y-2">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  content={message.content}
                  role={message.role}
                  isNew={message.id === newMessageId}
                  themeColor={themeColor}
                />
              ))}

              {isLoading && <TypingIndicator themeColor={themeColor} />}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input area */}
      <MessageInput onSend={sendMessage} disabled={isLoading} themeColor={themeColor} />
    </div>
  );
}
