'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface HighlightDetailModalProps {
  active: any | null;
  setActive: (val: any | null) => void;
  refObj: React.RefObject<HTMLDivElement | null>;
  id: string;
  mounted: boolean;
}

export default function HighlightDetailModal({
  active,
  setActive,
  refObj,
  id,
  mounted,
}: HighlightDetailModalProps) {
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {active && typeof active === 'object' && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
          />

          <motion.button
            key={`button-${active.title}-${id}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            className="flex fixed top-6 right-6 items-center justify-center bg-white text-slate-900 rounded-full h-10 w-10 shadow-2xl hover:bg-slate-100 transition-colors z-[10000] cursor-pointer"
            onClick={() => setActive(null)}
          >
            <X size={20} />
          </motion.button>

          <motion.div
            layoutId={`card-${active.title}-${id}`}
            ref={refObj}
            className="relative z-[10000] w-full max-w-[560px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white border border-slate-200/90 sm:rounded-3xl overflow-hidden shadow-2xl"
          >
            <motion.div layoutId={`image-${active.title}-${id}`}>
              <img
                src={active.src}
                alt={active.title}
                className="w-full h-72 sm:h-80 object-cover object-center"
              />
            </motion.div>

            <div>
              <div className="flex justify-between items-start p-6 border-b border-slate-100">
                <div className="space-y-1">
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-black text-slate-950 text-xl leading-tight"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-slate-600 text-xs"
                  >
                    {active.description}
                  </motion.p>
                </div>

                <motion.a
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  href={active.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs rounded-xl font-bold bg-slate-950 text-white flex items-center space-x-1.5 hover:bg-slate-800 transition-colors shrink-0 shadow-xs"
                >
                  <span>{active.ctaText}</span>
                  <ExternalLink size={13} />
                </motion.a>
              </div>

              <div className="pt-2 relative px-6 pb-6">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-slate-600 text-xs leading-relaxed max-h-60 overflow-y-auto space-y-3 font-normal"
                >
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-200/80">
                    <div className="flex justify-between font-bold text-xs">
                      <span className="text-slate-500">Biaya / Harga:</span>
                      <span className="text-slate-950">{active.price_info || 'Gratis'}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xs">
                      <span className="text-slate-500">Lokasi Rinci:</span>
                      <span className="text-slate-950">{active.location_details}</span>
                    </div>
                  </div>

                  <p className="whitespace-pre-line text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {active.full_description || active.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
