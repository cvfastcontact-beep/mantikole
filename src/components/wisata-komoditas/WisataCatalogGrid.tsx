'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WisataCatalogGridProps {
  items: any[];
  filterType: 'all' | 'wisata' | 'komoditas';
  setFilterType: (val: 'all' | 'wisata' | 'komoditas') => void;
  setActive: (card: any) => void;
  id: string;
}

export default function WisataCatalogGrid({
  items,
  filterType,
  setFilterType,
  setActive,
  id,
}: WisataCatalogGridProps) {
  const filteredItems = items.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex bg-slate-200/60 p-1.5 rounded-2xl w-fit border border-slate-200">
        <button
          onClick={() => setFilterType('all')}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            filterType === 'all'
              ? 'bg-slate-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          Semua Potensi ({items.length})
        </button>
        <button
          onClick={() => setFilterType('wisata')}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            filterType === 'wisata'
              ? 'bg-slate-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          Wisata Alami
        </button>
        <button
          onClick={() => setFilterType('komoditas')}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            filterType === 'komoditas'
              ? 'bg-slate-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          Komoditas Perkebunan
        </button>
      </div>

      {/* Grid of Expandable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-5 flex flex-col justify-between bg-white border border-slate-200/80 hover:bg-slate-50/60 rounded-2xl cursor-pointer hover:border-slate-300 transition-colors group"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full rounded-xl object-cover object-center"
                />
              </motion.div>

              <div className="flex justify-start flex-col space-y-1.5">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full ${
                      card.type === 'wisata'
                        ? 'bg-slate-950 text-white'
                        : 'bg-slate-100 text-slate-900 border border-slate-200'
                    }`}
                  >
                    {card.type === 'wisata' ? 'DESTINASI WISATA' : 'KOMODITAS UNGGULAN'}
                  </span>
                  <span className="text-xs font-extrabold text-slate-950 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
                    {card.price_info || 'Gratis'}
                  </span>
                </div>

                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-bold text-slate-950 text-lg group-hover:text-slate-700 transition-colors leading-snug"
                >
                  {card.title}
                </motion.h3>

                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-slate-600 text-xs line-clamp-2 leading-relaxed"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
