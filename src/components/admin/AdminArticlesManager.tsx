'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Calendar, Eye, Edit3, X, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchApi } from '../../lib/api';
import ImageUploader from './ImageUploader';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useToast } from '../../context/ToastContext';

export default function AdminArticlesManager() {
  const toast = useToast();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'detail' | 'edit'>('create');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Berita');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80');

  const loadArticles = async () => {
    try {
      setLoading(true);
      const res = await fetchApi<{ success: boolean; data: any[] }>('/articles');
      if (res.success && res.data) {
        setArticles(res.data);
      }
    } catch (err) {
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openCreateModal = () => {
    setSelectedArticle(null);
    setTitle('');
    setCategory('Berita');
    setSummary('');
    setContent('');
    setImageUrl('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80');
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openDetailModal = (art: any) => {
    setSelectedArticle(art);
    setTitle(art.title);
    setCategory(art.category || 'Berita');
    setSummary(art.summary || '');
    setContent(art.content || '');
    setImageUrl(art.featured_image_url || '');
    setModalMode('detail');
    setIsModalOpen(true);
  };

  const openEditModal = (art: any) => {
    setSelectedArticle(art);
    setTitle(art.title);
    setCategory(art.category || 'Berita');
    setSummary(art.summary || '');
    setContent(art.content || '');
    setImageUrl(art.featured_image_url || '');
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Judul dan isi konten warta wajib diisi.');
      return;
    }

    try {
      const payload = {
        title: title.trim(),
        category,
        summary: summary.trim() || content.slice(0, 120) + '...',
        content: content.trim(),
        featured_image_url: imageUrl,
        is_published: true,
      };

      if (modalMode === 'edit' && selectedArticle) {
        const res = await fetchApi<{ success: boolean; message: string }>(`/articles/${selectedArticle.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        if (res.success) {
          toast.success('Artikel warta berhasil diperbarui.');
        }
      } else {
        const res = await fetchApi<{ success: boolean; message: string }>('/articles', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (res.success) {
          toast.success('Artikel warta baru berhasil diterbitkan.');
        }
      }

      closeModal();
      loadArticles();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan artikel.');
    }
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetchApi<{ success: boolean; message: string }>(`/articles/${deleteTargetId}`, {
        method: 'DELETE',
      });
      if (res.success) {
        toast.success('Artikel warta berhasil dihapus.');
        if (isModalOpen) closeModal();
        loadArticles();
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal menghapus artikel.');
    } finally {
      setDeleteTargetId(null);
    }
  };

  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-xl text-neutral-900 tracking-tight">
            Manajemen Warta & Publikasi Berita
          </h2>
          <p className="text-xs text-neutral-500 font-medium">
            Kelola rilis pers, berita pembangunan, dan pengumuman resmi Desa Mantikole
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={15} />
          <span>Tulis Warta Baru</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari judul warta, kategori, atau topik berita..."
          className="w-full bg-white border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-2xs font-medium"
        />
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs font-semibold text-neutral-400">
            Memuat daftar warta desa...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-neutral-200">
            <p className="text-xs font-bold text-neutral-500">Tidak ada artikel yang cocok dengan pencarian.</p>
          </div>
        ) : (
          filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => openDetailModal(art)}
              className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden hover:border-neutral-400 hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="h-44 w-full bg-neutral-100 overflow-hidden relative">
                  <img
                    src={art.featured_image_url || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    {art.category || 'Berita'}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center space-x-3 text-[11px] text-neutral-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{new Date(art.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{art.views_count || 0}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-neutral-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-normal">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="border-t border-neutral-100 pt-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-neutral-400">
                    Oleh: {art.author_name || 'Admin Desa'}
                  </span>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(art);
                      }}
                      className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Artikel"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTargetId(art.id);
                      }}
                      className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Hapus Artikel"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Detail / Edit / Tulis Warta */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-neutral-200 my-8"
            >
              {/* Modal Header */}
              <div className="p-5 bg-neutral-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText size={18} className="text-blue-400" />
                  <span className="text-xs font-extrabold uppercase tracking-tight">
                    {modalMode === 'create' && 'Tulis Warta Baru'}
                    {modalMode === 'detail' && 'Detail Warta Desa'}
                    {modalMode === 'edit' && 'Edit Konten Warta'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {modalMode === 'detail' && (
                    <>
                      <button
                        onClick={() => setModalMode('edit')}
                        className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors text-xs font-bold inline-flex items-center space-x-1 cursor-pointer"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => selectedArticle && setDeleteTargetId(selectedArticle.id)}
                        className="p-1.5 bg-rose-900/80 hover:bg-rose-800 text-rose-200 rounded-lg transition-colors text-xs font-bold inline-flex items-center space-x-1 cursor-pointer"
                      >
                        <Trash2 size={13} />
                        <span>Hapus</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={closeModal}
                    className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[75vh] overflow-y-auto">
                {modalMode === 'detail' && selectedArticle && (
                  <div className="space-y-5">
                    {selectedArticle.featured_image_url && (
                      <div className="h-60 rounded-2xl overflow-hidden border border-neutral-200">
                        <img
                          src={selectedArticle.featured_image_url}
                          alt={selectedArticle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="bg-neutral-100 text-neutral-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                          {selectedArticle.category}
                        </span>
                        <span className="text-xs text-neutral-500 font-semibold">
                          {new Date(selectedArticle.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <h2 className="text-xl font-black text-neutral-900 leading-snug">
                        {selectedArticle.title}
                      </h2>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs text-neutral-600 italic leading-relaxed">
                      "{selectedArticle.summary}"
                    </div>

                    <div className="text-xs text-neutral-800 leading-relaxed font-normal whitespace-pre-line border-t border-neutral-100 pt-4">
                      {selectedArticle.content}
                    </div>
                  </div>
                )}

                {(modalMode === 'create' || modalMode === 'edit') && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Judul Warta / Berita *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Contoh: Peresmian Fasilitas Air Panas..."
                        required
                        className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:border-neutral-900 font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Kategori Warta *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:border-neutral-900 font-medium"
                        >
                          <option value="Berita">Berita Umum</option>
                          <option value="Pembangunan">Pembangunan Desa</option>
                          <option value="Pengumuman">Pengumuman Resmi</option>
                          <option value="Edukasi">Edukasi & Pertanian</option>
                          <option value="Wisata">Pariwisata</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <ImageUploader
                          label="Foto Utama Warta (Neon Object Storage)"
                          folder="articles"
                          currentUrl={imageUrl}
                          onUploadSuccess={(url) => setImageUrl(url)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Ringkasan Singkat (Summary)
                      </label>
                      <input
                        type="text"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Ringkasan 1-2 kalimat untuk pratinjau kartu..."
                        className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:border-neutral-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Isi Konten Berita Lengkap *
                      </label>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                        placeholder="Tuliskan berita lengkap dan terstruktur..."
                        required
                        className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium"
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-3 border-t border-neutral-100">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
                      >
                        <CheckCircle size={14} />
                        <span>{modalMode === 'edit' ? 'Simpan Perubahan' : 'Publikasikan Warta'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Hapus Artikel Warta?"
        message="Apakah Anda yakin ingin menghapus artikel warta desa ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={executeDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
