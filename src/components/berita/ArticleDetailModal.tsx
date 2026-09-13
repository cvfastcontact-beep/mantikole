'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Calendar, User, Eye, ArrowUpRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const springTransition = {
  type: 'spring' as const,
  stiffness: 350,
  damping: 32,
};

interface ArticleDetailModalProps {
  activeArticle: any;
  handleCloseArticle: () => void;
  articles: any[];
  handleOpenArticle: (art: any) => void;
}

export default function ArticleDetailModal({
  activeArticle,
  handleCloseArticle,
  articles,
  handleOpenArticle,
}: ArticleDetailModalProps) {
  const toast = useToast();

  if (!activeArticle) return null;

  return (
    <motion.article
      key={`article-detail-${activeArticle.id}`}
      layoutId={`article-card-${activeArticle.id}`}
      transition={springTransition}
      className="max-w-4xl mx-auto space-y-10 text-slate-900 bg-transparent border-none shadow-none"
    >
      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15 }}
        className="flex items-center justify-between border-b border-slate-200/80 pb-6"
      >
        <button
          onClick={handleCloseArticle}
          className="inline-flex items-center space-x-2 text-xs font-extrabold text-slate-950 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>Kembali ke Warta Desa</span>
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Tautan artikel berhasil disalin!');
          }}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-950 hover:text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 cursor-pointer"
        >
          <Share2 size={13} />
          <span>Bagikan Artikel</span>
        </button>
      </motion.div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="bg-slate-950 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
            {activeArticle.category}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center space-x-1">
            <Calendar size={13} />
            <span>
              {new Date(activeArticle.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </span>
        </div>

        <motion.h1
          layoutId={`article-title-${activeArticle.id}`}
          transition={springTransition}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]"
        >
          {activeArticle.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center space-x-6 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100"
        >
          <span className="flex items-center space-x-1.5">
            <User size={14} className="text-slate-950" />
            <span>Penulis: {activeArticle.author_name || 'Perangkat Desa Mantikole'}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Eye size={14} className="text-slate-950" />
            <span>{activeArticle.views_count || 142} Pembaca</span>
          </span>
        </motion.div>
      </header>

      {/* Featured Image */}
      {activeArticle.featured_image_url && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden rounded-3xl border border-slate-200"
        >
          <img
            src={activeArticle.featured_image_url}
            alt={activeArticle.title}
            className="w-full h-80 sm:h-96 object-cover object-center"
          />
        </motion.div>
      )}

      {/* Body Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-6 font-normal whitespace-pre-line border-b border-slate-200/80 pb-10"
      >
        {activeArticle.content}
      </motion.div>

      {/* Related Articles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="space-y-6 pt-2"
      >
        <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">Warta Terkait Lainnya</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles
            .filter((a) => a.id !== activeArticle.id)
            .slice(0, 3)
            .map((rel) => (
              <div
                key={rel.id}
                onClick={() => handleOpenArticle(rel)}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-400 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="space-y-2.5">
                  <span className="bg-slate-100 text-slate-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full inline-block">
                    {rel.category}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-950 group-hover:text-slate-700 transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs font-extrabold text-slate-950">
                  <span>Baca Artikel</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </motion.article>
  );
}
