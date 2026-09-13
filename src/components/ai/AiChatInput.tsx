'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import AiDotMatrixIcon from './AiDotMatrixIcon';

interface AiChatInputProps {
  inputMessage: string;
  setInputMessage: (val: string) => void;
  loading: boolean;
  handleSendMessage: () => void;
  isHeroMode?: boolean;
}

export default function AiChatInput({
  inputMessage,
  setInputMessage,
  loading,
  handleSendMessage,
  isHeroMode = false,
}: AiChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
      className={`w-full flex items-center transition-colors ${
        isHeroMode
          ? 'bg-[#18181b] hover:bg-[#202024] focus-within:bg-[#202024] border border-white/15 focus-within:border-white/30 rounded-full px-4 py-2.5 shadow-md'
          : 'p-3 bg-[#0a0a0c] border-t border-white/10 flex items-center space-x-2'
      }`}
    >
      {!isHeroMode ? (
        <div className="flex-1 flex items-center bg-[#18181b] hover:bg-[#202024] focus-within:bg-[#202024] border border-white/10 focus-within:border-white/30 rounded-full px-3.5 py-2 transition-colors">
          <AiDotMatrixIcon className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-white text-xs placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="ml-1.5 w-6 h-6 rounded-full bg-white text-black disabled:opacity-30 disabled:hover:bg-white hover:bg-zinc-200 flex items-center justify-center transition-all shrink-0 cursor-pointer"
            aria-label="Kirim Pesan"
          >
            <ArrowUp size={13} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <>
          <AiDotMatrixIcon className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-white text-xs placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="w-7 h-7 rounded-full bg-white text-black disabled:opacity-30 disabled:hover:bg-white hover:bg-zinc-200 flex items-center justify-center transition-all shrink-0 cursor-pointer"
            aria-label="Kirim Pesan"
          >
            <ArrowUp size={14} strokeWidth={2.5} />
          </button>
        </>
      )}
    </form>
  );
}
