'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchApi } from '../../lib/api';
import ImageUploader from './ImageUploader';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useToast } from '../../context/ToastContext';

export default function AdminStaffManager() {
  const toast = useToast();
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Delete Confirm State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('https://br-purple-glade-axvd3fli.storage.c-4.us-east-2.aws.neon.tech/mantikole-media/staff/kepala_desa.png');
  const [orderIndex, setOrderIndex] = useState(1);

  const loadStaff = async () => {
    try {
      setLoading(true);
      const res = await fetchApi<{ success: boolean; data: any[] }>('/staff');
      if (res.success && res.data) {
        setStaffList(res.data);
      }
    } catch (err: any) {
      console.error('Error loading staff:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setName('');
    setRole('');
    setDesc('');
    setImageUrl('https://br-purple-glade-axvd3fli.storage.c-4.us-east-2.aws.neon.tech/mantikole-media/staff/kepala_desa.png');
    setOrderIndex(staffList.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setIsEditing(true);
    setEditId(item.id);
    setName(item.name);
    setRole(item.role);
    setDesc(item.description || item.desc || '');
    setImageUrl(item.image_url || 'https://br-purple-glade-axvd3fli.storage.c-4.us-east-2.aws.neon.tech/mantikole-media/staff/kepala_desa.png');
    setOrderIndex(item.order_index || 1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) {
      toast.error('Nama dan jabatan wajib diisi.');
      return;
    }

    try {
      if (isEditing && editId) {
        const res = await fetchApi<{ success: boolean; message: string }>(`/staff/${editId}`, {
          method: 'PUT',
          body: JSON.stringify({ name, role, desc, image_url: imageUrl, order_index: orderIndex }),
        });
        if (res.success) {
          toast.success('Data perangkat desa berhasil diperbarui.');
        }
      } else {
        const res = await fetchApi<{ success: boolean; message: string }>('/staff', {
          method: 'POST',
          body: JSON.stringify({ name, role, desc, image_url: imageUrl, order_index: orderIndex }),
        });
        if (res.success) {
          toast.success('Perangkat desa baru berhasil ditambahkan.');
        }
      }
      closeModal();
      loadStaff();
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan pada server.');
    }
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetchApi<{ success: boolean; message: string }>(`/staff/${deleteTargetId}`, {
        method: 'DELETE',
      });
      if (res.success) {
        toast.success('Perangkat desa berhasil dihapus.');
        loadStaff();
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal menghapus perangkat desa.');
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
            Manajemen Struktur Organisasi
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight flex items-center space-x-2">
            <span>Struktur Perangkat Desa</span>
            <span className="text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full font-bold">
              {staffList.length} Aparatur
            </span>
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={openCreateModal}
            className="flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Tambah Perangkat Desa</span>
          </button>
        </div>
      </div>

      {/* Staff Grid */}
      {loading ? (
        <div className="text-center py-20 text-xs font-semibold text-neutral-400">
          Memuat data perangkat desa...
        </div>
      ) : staffList.length === 0 ? (
        <div className="text-center py-20 bg-white border border-neutral-200/80 rounded-3xl space-y-3">
          <Users size={32} className="mx-auto text-neutral-300" />
          <p className="text-sm font-bold text-neutral-700">Belum ada data perangkat desa</p>
          <button
            onClick={openCreateModal}
            className="text-xs font-bold bg-neutral-900 text-white px-4 py-2 rounded-xl"
          >
            Tambah Aparatur Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <img
                      src={item.image_url || 'https://br-purple-glade-axvd3fli.storage.c-4.us-east-2.aws.neon.tech/mantikole-media/staff/kepala_desa.png'}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                      Urutan #{item.order_index}
                    </span>
                    <h4 className="font-extrabold text-sm text-neutral-900 mt-1 leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-neutral-600">{item.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(item.id)}
                    className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {item.description && (
                <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed border-t border-neutral-100 pt-3">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit */}
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
                  {isEditing ? 'Edit Data Perangkat Desa' : 'Tambah Perangkat Desa Baru'}
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
                  <label className="text-xs font-bold text-neutral-700">Nama Lengkap & Gelar *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Drs. H. Moh. Rizal"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold focus:outline-hidden focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Jabatan / Posisi *</label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Contoh: Kepala Desa"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold focus:outline-hidden focus:border-neutral-900"
                    />
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

                <ImageUploader
                  label="Foto Perangkat Desa (Neon Object Storage)"
                  folder="staff"
                  currentUrl={imageUrl}
                  onUploadSuccess={(url) => setImageUrl(url)}
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700">Deskripsi / Peran Singkat</label>
                  <textarea
                    rows={2}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Contoh: Pemimpin Pemerintah Desa Mantikole"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-normal focus:outline-hidden focus:border-neutral-900"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2.5 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs"
                  >
                    {isEditing ? 'Simpan Perubahan' : 'Tambahkan Perangkat'}
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
        title="Hapus Perangkat Desa?"
        message="Apakah Anda yakin ingin menghapus data perangkat desa ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={executeDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
