'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchApi } from '../../lib/api';
import BlurFade from '../../components/ui/blur-fade';
import ArticleDetailModal from '../../components/berita/ArticleDetailModal';
import ArticleFilterBar from '../../components/berita/ArticleFilterBar';
import ArticleGridList from '../../components/berita/ArticleGridList';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  const categories = ['ALL', 'Berita', 'Pengumuman', 'Edukasi', 'Pembangunan'];

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetchApi<{ success: boolean; data: any[] }>('/articles');
        if (res.success && res.data && res.data.length > 0) {
          setArticles(res.data);
        }
      } catch (err) {
        console.error('Fetch articles error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'ALL' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenArticle = (art: any) => {
    setActiveArticle(art);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/berita/${art.id}`);
    }
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/berita');
    }
  };

  return (
    <BlurFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">
      <AnimatePresence mode="wait" initial={false}>
        {activeArticle ? (
          <ArticleDetailModal
            activeArticle={activeArticle}
            handleCloseArticle={handleCloseArticle}
            articles={articles}
            handleOpenArticle={handleOpenArticle}
          />
        ) : (
          <motion.div key="warta-listing-grid" className="space-y-10">
            {/* Page Header */}
            <div className="border-b border-slate-200/80 pb-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                PUBLIKASI INFORMASI RESMI DESA
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase">
                Warta & Berita Mantikole
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
                Klik pada kartu warta untuk membuka artikel secara langsung dengan transisi morphing ke halaman baca.
              </p>
            </div>

            <ArticleFilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <ArticleGridList
              loading={loading}
              filteredArticles={filteredArticles}
              searchQuery={searchQuery}
              handleOpenArticle={handleOpenArticle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </BlurFade>
  );
}
