'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, HelpCircle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  isDestructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            className="relative bg-white border border-neutral-200/80 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 z-10 overflow-hidden"
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-2xl shrink-0 ${
                  isDestructive ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-neutral-100 text-neutral-900 border border-neutral-200'
                }`}
              >
                {isDestructive ? <Trash2 size={22} /> : <HelpCircle size={22} />}
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="font-extrabold text-base text-neutral-900 leading-snug">{title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">{message}</p>
              </div>

              <button
                onClick={onCancel}
                className="text-neutral-400 hover:text-neutral-900 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-bold text-xs transition-all cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs cursor-pointer ${
                  isDestructive
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
