'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, ArrowRight } from 'lucide-react';

const springTransition = {
  type: 'spring' as const,
  stiffness: 350,
  damping: 32,
};

interface ArticleGridListProps {
  loading: boolean;
  filteredArticles: any[];
  searchQuery: string;
  handleOpenArticle: (art: any) => void;
}

export default function ArticleGridList({
  loading,
  filteredArticles,
  searchQuery,
  handleOpenArticle,
}: ArticleGridListProps) {
  if (loading) {
    return <div className="py-16 text-center text-xs font-semibold text-slate-400">Memuat artikel warta...</div>;
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="py-16 text-center text-xs text-slate-500 bg-white border border-dashed border-slate-200 rounded-2xl p-8">
        Tidak ditemukan artikel dengan kata kunci "{searchQuery}".
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredArticles.map((art) => (
        <motion.div
          layoutId={`article-card-${art.id}`}
          key={art.id}
          onClick={() => handleOpenArticle(art)}
          transition={springTransition}
          className="h-full bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-400 hover:shadow-xl transition-all group cursor-pointer"
        >
          {art.featured_image_url && (
            <div className="relative w-full h-48 overflow-hidden bg-slate-100 border-b border-slate-100">
              <img
                src={art.featured_image_url}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-slate-950/90 text-white font-extrabold px-3 py-0.5 text-[10px] uppercase rounded-full backdrop-blur-xs">
                {art.category}
              </span>
            </div>
          )}

          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                {!art.featured_image_url && (
                  <span className="bg-slate-950 text-white font-extrabold px-3 py-0.5 text-[10px] uppercase rounded-full">
                    {art.category}
                  </span>
                )}
                <span className="text-slate-400 text-[11px] font-medium flex items-center space-x-1 ml-auto">
                  <Calendar size={12} />
                  <span>{new Date(art.created_at).toLocaleDateString('id-ID')}</span>
                </span>
              </div>

              <motion.h3
                layoutId={`article-title-${art.id}`}
                transition={springTransition}
                className="font-extrabold text-lg text-slate-950 group-hover:text-slate-700 transition-colors leading-snug line-clamp-2"
              >
                {art.title}
              </motion.h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                {art.summary}
              </p>

              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between pt-1">
                <span className="flex items-center space-x-1">
                  <User size={12} />
                  <span>{art.author_name || 'Admin Desa Mantikole'}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Eye size={12} />
                  <span>{art.views_count || 120} Pembaca</span>
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-extrabold text-slate-950">
              <span>Baca Artikel Lengkap</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
