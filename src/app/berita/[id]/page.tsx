'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Eye, User, Share2, ArrowUpRight } from 'lucide-react';
import { fetchApi } from '../../../lib/api';
import { useToast } from '../../../context/ToastContext';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const articleId = params?.id as string;

  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    async function loadArticleDetail() {
      if (!articleId) return;
      try {
        const [detailRes, listRes] = await Promise.all([
          fetchApi<{ success: boolean; data: any }>(`/articles/${articleId}`).catch(() => null),
          fetchApi<{ success: boolean; data: any[] }>('/articles').catch(() => null),
        ]);

        if (detailRes && detailRes.success && detailRes.data) {
          setArticle(detailRes.data);
        }

        if (listRes && listRes.success && listRes.data) {
          setRelatedArticles(listRes.data.filter((a) => a.id !== articleId && a.slug !== articleId).slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching article detail:', err);
      } finally {
        setLoading(false);
      }
    }

    loadArticleDetail();
  }, [articleId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20 text-center text-xs font-semibold text-slate-400">
        Memuat artikel warta...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-neutral-900">Artikel Tidak Ditemukan</h2>
        <p className="text-xs text-neutral-500">Artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
        <button
          onClick={() => router.push('/berita')}
          className="inline-flex items-center space-x-1 text-xs font-bold bg-neutral-900 text-white px-4 py-2 rounded-xl"
        >
          <span>Kembali ke Warta Desa</span>
        </button>
      </div>
    );
  }

  return (
    <motion.article
      layoutId={`article-${article.id}`}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-10 text-slate-900"
    >
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-6">
        <button
          onClick={() => router.back()}
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
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="bg-slate-950 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
            {article.category}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center space-x-1">
            <Calendar size={13} />
            <span>
              {new Date(article.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </span>
        </div>

        <motion.h1
          layoutId={`article-title-${article.id}`}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]"
        >
          {article.title}
        </motion.h1>

        <div className="flex items-center space-x-6 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
          <span className="flex items-center space-x-1.5">
            <User size={14} className="text-slate-950" />
            <span>Penulis: {article.author_name || 'Perangkat Desa Mantikole'}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Eye size={14} className="text-slate-950" />
            <span>{article.views_count || 0} Pembaca</span>
          </span>
        </div>
      </header>

      {/* Article Featured Image */}
      {article.featured_image_url && (
        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <img
            src={article.featured_image_url}
            alt={article.title}
            className="w-full h-80 sm:h-96 object-cover object-center"
          />
        </div>
      )}

      {/* Article Body Content */}
      <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-6 font-normal whitespace-pre-line border-b border-slate-200/80 pb-10">
        {article.content}
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="space-y-6 pt-4">
          <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">Warta Terkait Lainnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/berita/${rel.id}`}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-400 hover:shadow-lg transition-all group"
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
                  <span>Baca Selengkapnya</span>
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </motion.article>
  );
}
