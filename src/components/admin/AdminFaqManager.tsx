'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchApi } from '../../lib/api';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useToast } from '../../context/ToastContext';

export default function AdminFaqManager() {
  const toast = useToast();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form State
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Layanan');
  const [orderIndex, setOrderIndex] = useState(1);

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetchApi<{ success: boolean; data: any[] }>('/faqs');
      if (res.success && res.data) {
        setFaqs(res.data);
      }
    } catch (err) {
      console.error('Error loading faqs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setQuestion('');
    setAnswer('');
    setCategory('Layanan');
    setOrderIndex(faqs.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setIsEditing(true);
    setEditId(item.id);
    setQuestion(item.question);
    setAnswer(item.answer);
    setCategory(item.category || 'Umum');
    setOrderIndex(item.order_index || 1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      toast.error('Pertanyaan dan jawaban FAQ wajib diisi.');
      return;
    }

    try {
      if (isEditing && editId) {
        const res = await fetchApi<{ success: boolean; message: string }>(`/faqs/${editId}`, {
          method: 'PUT',
          body: JSON.stringify({ question, answer, category, order_index: orderIndex }),
        });
        if (res.success) {
          toast.success('Pertanyaan FAQ berhasil diperbarui.');
        }
      } else {
        const res = await fetchApi<{ success: boolean; message: string }>('/faqs', {
          method: 'POST',
          body: JSON.stringify({ question, answer, category, order_index: orderIndex }),
        });
        if (res.success) {
          toast.success('Pertanyaan FAQ baru berhasil ditambahkan.');
        }
      }
      closeModal();
      loadFaqs();
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan pada server.');
    }
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetchApi<{ success: boolean; message: string }>(`/faqs/${deleteTargetId}`, {
        method: 'DELETE',
      });
      if (res.success) {
        toast.success('Pertanyaan FAQ berhasil dihapus.');
        loadFaqs();
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal menghapus FAQ.');
    } finally {
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-neutral-600 block mb-1">
            Knowledge Base & RAG AI
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight flex items-center space-x-2">
            <span>Tanya Jawab Warga (FAQ)</span>
            <span className="text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full font-bold">
              {faqs.length} Butir
            </span>
          </h2>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>Tambah Pertanyaan FAQ</span>
        </button>
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="text-center py-20 text-xs font-semibold text-neutral-400">
          Memuat data FAQ...
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-20 bg-white border border-neutral-200/80 rounded-3xl space-y-3">
          <HelpCircle size={32} className="mx-auto text-neutral-300" />
          <p className="text-sm font-bold text-neutral-700">Belum ada data FAQ</p>
          <button
            onClick={openCreateModal}
            className="text-xs font-bold bg-neutral-900 text-white px-4 py-2 rounded-xl"
          >
            Tambah Pertanyaan Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                    {item.category || 'Umum'}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400">
                    Urutan #{item.order_index}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-neutral-900 leading-snug">
                  {item.question}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {item.answer}
                </p>
              </div>

              <div className="flex items-center space-x-1.5 shrink-0 self-end md:self-center">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
                  title="Edit Pertanyaan"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => setDeleteTargetId(item.id)}
                  className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Hapus Pertanyaan"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit FAQ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <h3 className="font-extrabold text-base text-neutral-900">
                  {isEditing ? 'Edit Pertanyaan FAQ' : 'Tambah Pertanyaan FAQ Baru'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-neutral-400 hover:text-neutral-900 p-1 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700">Pertanyaan (Question) *</label>
                  <input
                    type="text"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Contoh: Berapa tiket masuk Pemandian Air Panas?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold focus:outline-hidden focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Kategori *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold focus:outline-hidden focus:border-neutral-900 bg-white"
                    >
                      <option value="Layanan">Layanan Surat</option>
                      <option value="Wisata">Pariwisata & Tiket</option>
                      <option value="Komoditas">Komoditas & Pertanian</option>
                      <option value="Umum">Informasi Umum</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Urutan Tampil (Order)</label>
                    <input
                      type="number"
                      min={1}
                      value={orderIndex}
                      onChange={(e) => setOrderIndex(parseInt(e.target.value, 10) || 1)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold focus:outline-hidden focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700">Jawaban Lengkap (Answer) *</label>
                  <textarea
                    rows={4}
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Tuliskan jawaban yang detail, akurat, dan informatif bagi warga atau pengunjung..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-normal focus:outline-hidden focus:border-neutral-900"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2.5 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    {isEditing ? 'Simpan Perubahan' : 'Tambahkan FAQ'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Hapus Pertanyaan FAQ?"
        message="Apakah Anda yakin ingin menghapus pertanyaan FAQ ini? Data ini juga akan dihapus dari basis pengetahuan AI Chatbot."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={executeDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
