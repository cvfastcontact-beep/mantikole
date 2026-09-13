'use client';

import React from 'react';
import { ChevronLeft, X } from 'lucide-react';

interface AiChatHeaderProps {
  onClose: () => void;
  onBackToHero?: () => void;
}

export default function AiChatHeader({ onClose, onBackToHero }: AiChatHeaderProps) {
  return (
    <div className="relative z-20 bg-[#0a0a0c] text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center space-x-2.5">
        {onBackToHero && (
          <button
            onClick={onBackToHero}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Kembali"
            aria-label="Kembali"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-xs text-white tracking-tight">Mantikole AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
          </div>
          <span className="text-[10px] text-zinc-400">Asisten Resmi Desa Mantikole</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Tutup"
      >
        <X size={14} />
      </button>
    </div>
  );
}
