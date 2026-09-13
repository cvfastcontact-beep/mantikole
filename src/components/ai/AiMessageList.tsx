'use client';

import React from 'react';
import { formatAiMessage } from '../../lib/markdown';
import AiDotMatrixIcon from './AiDotMatrixIcon';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: string[];
  timestamp: string;
}

interface AiMessageListProps {
  messages: Message[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  suggestedPrompts: string[];
  handleSendMessage: (prompt?: string) => void;
}

export default function AiMessageList({
  messages,
  loading,
  messagesEndRef,
  suggestedPrompts,
  handleSendMessage,
}: AiMessageListProps) {
  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#0a0a0c] text-xs select-text no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Label & Timestamp for User (Matching Off Menu style: You 8:34 PM) */}
            {msg.sender === 'user' && (
              <div className="flex items-center space-x-1.5 text-[11px] text-zinc-400 mb-1 px-1">
                <span className="font-medium text-zinc-300">You</span>
                <span>{msg.timestamp}</span>
              </div>
            )}

            <div
              className={`p-3.5 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#1c1c1f] text-white rounded-2xl rounded-tr-xs border border-white/10 max-w-[85%]'
                  : 'bg-[#121214] text-zinc-100 border border-white/10 rounded-2xl rounded-tl-xs max-w-[92%]'
              }`}
            >
              {msg.sender === 'ai' ? (
                formatAiMessage(msg.text)
              ) : (
                <p className="whitespace-pre-line text-xs text-white">{msg.text}</p>
              )}
            </div>

            {/* Source citations */}
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1 max-w-[90%]">
                {msg.sources.map((src, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-white/5 text-zinc-300 border border-white/10 px-2 py-0.5 font-medium rounded-md flex items-center gap-1"
                  >
                    <span>📌</span>
                    <span>{src}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Timestamp for AI */}
            {msg.sender === 'ai' && (
              <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
            )}
          </div>
        ))}

        {/* Minimalist Thinking State (Directly matching Screenshot 2) */}
        {loading && (
          <div className="flex items-center space-x-3 text-zinc-300 bg-[#121214] px-4 py-3 max-w-[80%] border border-white/10 rounded-2xl rounded-tl-xs">
            <AiDotMatrixIcon className="w-4 h-4 text-white" isSpinning />
            <span className="text-xs font-normal text-zinc-400">Thinking...</span>
            <span className="w-2 h-2 rounded-full bg-white animate-pulse ml-2" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts List (Scrollable horizontally without scrollbar) */}
      <div className="bg-[#0a0a0c] px-3 py-2 border-t border-white/10 flex overflow-x-auto gap-1.5 no-scrollbar">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="whitespace-nowrap text-[11px] font-medium bg-[#18181b] hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white px-3 py-1 rounded-full transition-colors shrink-0 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>
    </>
  );
}
