'use client';

import React from 'react';
import { X } from 'lucide-react';
import AiChatInput from './AiChatInput';

interface AiHeroViewProps {
  onClose: () => void;
  suggestedPrompts: string[];
  handleSendMessage: (prompt?: string) => void;
  inputMessage: string;
  setInputMessage: (val: string) => void;
  loading: boolean;
}

export default function AiHeroView({
  onClose,
  suggestedPrompts,
  handleSendMessage,
  inputMessage,
  setInputMessage,
  loading,
}: AiHeroViewProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#0a0a0c] text-white overflow-hidden select-none font-sans">
      {/* Top Header Bar */}
      <div className="relative z-30 px-5 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs">
          <span className="font-semibold text-white tracking-wide">Chat</span>
          <span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer text-xs">
            Layanan
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Tutup"
          aria-label="Tutup"
        >
          <X size={14} />
        </button>
      </div>

      {/* Video Avatar Looping Section with Depth Fade Out */}
      <div className="absolute inset-x-0 top-0 h-[65%] overflow-hidden pointer-events-none z-10">
        <video
          src="/avatar-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-top"
        />

        {/* Seamless Depth Fade Out (Gradient to Pure Dark Background) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/20 via-transparent to-[#0a0a0c]" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/90 to-transparent" />
      </div>

      {/* Side Dot (Off Menu Detail) */}
      <div className="absolute left-4 top-[48%] z-20 w-1.5 h-1.5 rounded-full bg-white/60 pointer-events-none" />

      {/* Bottom Content Area: Greeting, Prompt Chips & Input */}
      <div className="relative z-20 px-5 pb-4 pt-32 flex flex-col justify-end space-y-3.5 mt-auto">
        {/* Greeting Copy */}
        <div className="space-y-1">
          <p className="text-[11px] font-medium text-zinc-400 tracking-wide">Mantikole</p>
          <h3 className="text-sm font-semibold text-white leading-snug tracking-tight">
            Hey — Saya Mantikole AI, asisten resmi Desa Mantikole.
          </h3>
          <p className="text-xs text-zinc-400">Ada yang bisa saya bantu hari ini?</p>
        </div>

        {/* Quick Action Pills (Clean Monochrome) */}
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar py-0.5">
          {suggestedPrompts.slice(0, 4).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs font-medium text-zinc-300 hover:text-black bg-[#18181b] hover:bg-white border border-white/10 hover:border-white px-3.5 py-1.5 rounded-full transition-all duration-150 cursor-pointer text-left shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Integrated Floating Pill Input */}
        <div className="pt-1">
          <AiChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            loading={loading}
            handleSendMessage={() => handleSendMessage()}
            isHeroMode
          />
        </div>
      </div>
    </div>
  );
}
