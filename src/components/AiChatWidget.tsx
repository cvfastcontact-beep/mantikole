'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchApi } from '../lib/api';
import AiChatHeader from './ai/AiChatHeader';
import AiHeroView from './ai/AiHeroView';
import AiMessageList, { Message } from './ai/AiMessageList';
import AiChatInput from './ai/AiChatInput';
import AiDotMatrixIcon from './ai/AiDotMatrixIcon';

export default function AiChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'hero' | 'chat'>('hero');
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Tabe! Saya adalah **Mantikole AI**, Asisten Digital Resmi Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi.\n\nAda yang dapat saya bantu mengenai:\n- **Pemandian Air Panas Alami** & **Wisata Air Terjun**\n- Komoditas unggulan **Kakao & Pertanian**\n- Data **Kependudukan & Statistik Desa**\n- Pengajuan **Surat Keterangan Mandiri (SKU/SKTM)**`,
      sources: ['Basis Data Terintegrasi Desa Mantikole'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Berapa tiket air panas Mantikole?',
    'Syarat buat Surat Usaha (SKU)?',
    'Berapa jumlah penduduk desa?',
    'Siapa saja perangkat desa?',
    'Ada komoditas apa saja di desa?',
    'Jam buka pelayanan kantor desa?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeView === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, activeView]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    setActiveView('chat');

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const response = await fetchApi<{
        success: boolean;
        reply: string;
        sources?: string[];
      }>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      if (response.success) {
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: response.reply,
          sources: response.sources || ['Mantikole AI Context Engine'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Mohon maaf, sistem AI sedang dalam pemeliharaan singkat. Silakan hubungi Kantor Desa Mantikole.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none pointer-events-auto">
      {/* Morphing Container with Strict Rectangle Preservation and Controlled Luxury Easing */}
      <motion.div
        layout
        initial={false}
        animate={
          isOpen
            ? {
                width: 380,
                height: 580,
                borderRadius: 24,
              }
            : {
                width: 146,
                height: 48,
                borderRadius: 24,
              }
        }
        transition={
          isOpen
            ? {
                // Open: Horizontal expansion (smooth) -> Vertical upward expansion (luxurious tempo)
                width: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                height: { duration: 0.52, delay: 0.32, ease: [0.16, 1, 0.3, 1] },
                borderRadius: { duration: 0.3 },
              }
            : {
                // Close: Vertical downward collapse (luxurious tempo) -> Horizontal contract (smooth)
                height: { duration: 0.44, ease: [0.16, 1, 0.3, 1] },
                width: { duration: 0.38, delay: 0.34, ease: [0.16, 1, 0.3, 1] },
                borderRadius: { duration: 0.3 },
              }
        }
        style={{
          transformOrigin: 'bottom right',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)',
        }}
        className="relative bg-[#0a0a0c] text-white border border-white/15 shadow-[0_25px_65px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col will-change-[width,height]"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Collapsed Floating Button View */
            <motion.button
              key="collapsed-button-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(true)}
              className="w-full h-full px-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.06] transition-colors"
              title="Tanya Mantikole AI"
              aria-label="Buka Chat Mantikole AI"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  className="flex items-center justify-center text-white"
                >
                  <AiDotMatrixIcon className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-xs font-semibold tracking-wide text-zinc-100 whitespace-nowrap">
                  Mantikole AI
                </span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            </motion.button>
          ) : (
            /* Expanded Modal View with Delayed Progressive Blur Reveal */
            <motion.div
              key="expanded-chat-content"
              initial={{ opacity: 0, filter: 'blur(14px)', y: 12 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{
                opacity: 0,
                filter: 'blur(8px)',
                y: 6,
                transition: { duration: 0.18, ease: 'easeIn' },
              }}
              transition={{ duration: 0.48, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col justify-between overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {activeView === 'hero' ? (
                  <motion.div
                    key="hero-inner-view"
                    initial={{ opacity: 0, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full"
                  >
                    <AiHeroView
                      onClose={() => setIsOpen(false)}
                      suggestedPrompts={suggestedPrompts}
                      handleSendMessage={handleSendMessage}
                      inputMessage={inputMessage}
                      setInputMessage={setInputMessage}
                      loading={loading}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="conversation-inner-view"
                    initial={{ opacity: 0, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    <AiChatHeader
                      onClose={() => setIsOpen(false)}
                      onBackToHero={() => setActiveView('hero')}
                    />
                    <AiMessageList
                      messages={messages}
                      loading={loading}
                      messagesEndRef={messagesEndRef}
                      suggestedPrompts={suggestedPrompts}
                      handleSendMessage={handleSendMessage}
                    />
                    <AiChatInput
                      inputMessage={inputMessage}
                      setInputMessage={setInputMessage}
                      loading={loading}
                      handleSendMessage={() => handleSendMessage()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
