'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setToasts((prev) => [...prev.slice(-4), { id, type, message }]); // keep max 5 toasts

      setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  const toast = {
    success: (message: string) => addToast('success', message),
    error: (message: string) => addToast('error', message),
    info: (message: string) => addToast('info', message),
    warning: (message: string) => addToast('warning', message),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Floating Snackbar Container */}
      <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-999 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl border text-xs font-semibold backdrop-blur-md transition-all ${
                item.type === 'success'
                  ? 'bg-neutral-900/95 text-white border-neutral-800 shadow-neutral-950/20'
                  : item.type === 'error'
                  ? 'bg-rose-950/95 text-rose-100 border-rose-800 shadow-rose-950/30'
                  : item.type === 'warning'
                  ? 'bg-amber-950/95 text-amber-100 border-amber-800 shadow-amber-950/30'
                  : 'bg-neutral-900/95 text-neutral-100 border-neutral-800'
              }`}
            >
              <div className="flex items-center space-x-3 pr-2 min-w-0">
                <div className="shrink-0">
                  {item.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400" />}
                  {item.type === 'error' && <AlertCircle size={18} className="text-rose-400" />}
                  {item.type === 'warning' && <AlertTriangle size={18} className="text-amber-400" />}
                  {item.type === 'info' && <Info size={18} className="text-blue-400" />}
                </div>
                <p className="leading-snug break-words">{item.message}</p>
              </div>

              <button
                onClick={() => removeToast(item.id)}
                className="p-1 text-white/50 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </aside>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
};
