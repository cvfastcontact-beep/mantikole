'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Compass, X, MapPin, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchApi } from '../../lib/api';
import ImageUploader from './ImageUploader';
import { useToast } from '../../context/ToastContext';

export default function AdminWisataManager() {
  const toast = useToast();
  const [highlights, setHighlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'detail' | 'edit'>('detail');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('wisata');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [locationDetails, setLocationDetails] = useState('Desa Mantikole, Dolo Barat, Sigi');
  const [priceInfo, setPriceInfo] = useState('Rp 5.000 / Orang');
  const [galleryUrl, setGalleryUrl] = useState('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80');

  const loadHighlights = async () => {
    try {
      setLoading(true);
      const res = await fetchApi<{ success: boolean; data: any[] }>('/highlights');
      if (res.success && res.data) {
        setHighlights(res.data);
      }
    } catch (err) {
      console.error('Error loading highlights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHighlights();
  }, []);

  const openCreateModal = () => {
    setSelectedItem(null);
    setTitle('');
    setType('wisata');
    setShortDescription('');
    setFullDescription('');
    setLocationDetails('Desa Mantikole, Dolo Barat, Sigi');
    setPriceInfo('Rp 5.000 / Orang');
    setGalleryUrl('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80');
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openDetailModal = (item: any) => {
    setSelectedItem(item);
    setTitle(item.title);
    setType(item.type);
    setShortDescription(item.short_description);
    setFullDescription(item.full_description);
    setLocationDetails(item.location_details || 'Desa Mantikole, Dolo Barat, Sigi');
    setPriceInfo(item.price_info || '');
    setGalleryUrl(item.gallery_urls?.[0] || '');
    setModalMode('detail');
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setSelectedItem(item);
    setTitle(item.title);
    setType(item.type);
    setShortDescription(item.short_description);
    setFullDescription(item.full_description);
    setLocationDetails(item.location_details || 'Desa Mantikole, Dolo Barat, Sigi');
    setPriceInfo(item.price_info || '');
    setGalleryUrl(item.gallery_urls?.[0] || '');
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !shortDescription || !fullDescription) {
      toast.error('Judul dan deskripsi wajib diisi.');
      return;
    }

    try {
      const payload = {
        title,
        type,
        short_description: shortDescription,
        full_description: fullDescription,
        location_details: locationDetails,
        price_info: priceInfo,
        gallery_urls: [galleryUrl],
      };

      const res = await fetchApi<{ success: boolean; message: string }>('/highlights', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res.success) {
        toast.success('Data destinasi wisata / komoditas berhasil disimpan.');
        closeModal();
        loadHighlights();
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan data destinasi.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Manajemen Wisata & Komoditas Unggulan
          </h2>
          <p className="text-xs text-neutral-500">
            Kelola katalog Pemandian Air Panas Alami, Air Terjun, serta komoditas Kakao dan Cengkeh.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer shrink-0"
        >
          <Plus size={14} />
          <span>Tambah Destinasi / Komoditas</span>
        </button>
      </div>

      {/* Grid of Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs font-semibold text-neutral-400">
            Memuat data wisata dan komoditas...
          </div>
        ) : highlights.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-neutral-200">
            <p className="text-xs font-bold text-neutral-500">Belum ada data destinasi wisata atau komoditas.</p>
          </div>
        ) : (
          highlights.map((item) => (
            <div
              key={item.id}
              onClick={() => openDetailModal(item)}
              className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden hover:border-neutral-400 hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="h-44 w-full bg-neutral-100 overflow-hidden relative">
                  <img
                    src={item.gallery_urls?.[0] || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    {item.type === 'wisata' ? 'Pariwisata' : 'Komoditas'}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center space-x-2 text-[11px] text-neutral-500 font-semibold">
                    <MapPin size={12} className="text-neutral-400 shrink-0" />
                    <span className="truncate">{item.location_details || 'Desa Mantikole'}</span>
                  </div>

                  <h3 className="font-extrabold text-sm text-neutral-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-normal">
                    {item.short_description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="border-t border-neutral-100 pt-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-neutral-700">
                    {item.price_info || 'Gratis / Sesuai'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(item);
                    }}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Data"
                  >
                    <Edit3 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Detail / Edit / Create */}
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
                  <Compass size={18} className="text-emerald-400" />
                  <span className="text-xs font-extrabold uppercase tracking-tight">
                    {modalMode === 'create' && 'Tambah Destinasi / Komoditas'}
                    {modalMode === 'detail' && 'Detail Destinasi & Potensi'}
                    {modalMode === 'edit' && 'Edit Destinasi & Potensi'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {modalMode === 'detail' && (
                    <button
                      onClick={() => setModalMode('edit')}
                      className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors text-xs font-bold inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>
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
                {modalMode === 'detail' && selectedItem ? (
                  <div className="space-y-5">
                    {selectedItem.gallery_urls?.[0] && (
                      <div className="h-60 rounded-2xl overflow-hidden border border-neutral-200">
                        <img
                          src={selectedItem.gallery_urls[0]}
                          alt={selectedItem.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="bg-neutral-100 text-neutral-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                          {selectedItem.type === 'wisata' ? 'Pariwisata' : 'Komoditas Unggulan'}
                        </span>
                        <span className="text-xs text-neutral-500 font-semibold flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>{selectedItem.location_details}</span>
                        </span>
                      </div>

                      <h2 className="text-xl font-black text-neutral-900 leading-snug">
                        {selectedItem.title}
                      </h2>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs text-neutral-700 font-bold">
                      Tarif / Info: {selectedItem.price_info || 'Gratis'}
                    </div>

                    <div className="text-xs text-neutral-800 leading-relaxed font-normal whitespace-pre-line border-t border-neutral-100 pt-4">
                      {selectedItem.full_description}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-neutral-700">Nama Tempat / Komoditas *</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Contoh: Pemandian Air Panas Alami Mantikole"
                          className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-hidden focus:border-neutral-900 font-semibold"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-700">Tipe</label>
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-hidden focus:border-neutral-900 font-bold bg-white"
                        >
                          <option value="wisata">Destinasi Wisata</option>
                          <option value="komoditas">Komoditas Perkebunan</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <ImageUploader
                          value={galleryUrl}
                          onChange={setGalleryUrl}
                          folder="wisata"
                          label="Foto Destinasi / Komoditas (Neon Object Storage)"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-700">Info Biaya / Tarif</label>
                        <input
                          type="text"
                          value={priceInfo}
                          onChange={(e) => setPriceInfo(e.target.value)}
                          placeholder="Rp 5.000 / Orang"
                          className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-hidden focus:border-neutral-900"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-3">
                        <label className="text-xs font-bold text-neutral-700">Deskripsi Singkat (Ringkasan) *</label>
                        <input
                          type="text"
                          value={shortDescription}
                          onChange={(e) => setShortDescription(e.target.value)}
                          placeholder="Ringkasan singkat 1-2 kalimat..."
                          className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-hidden focus:border-neutral-900 font-medium"
                          required
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-3">
                        <label className="text-xs font-bold text-neutral-700">Deskripsi Lengkap & Khasiat *</label>
                        <textarea
                          rows={6}
                          value={fullDescription}
                          onChange={(e) => setFullDescription(e.target.value)}
                          placeholder="Tuliskan ulasan mendalam tentang rute, fasilitas, keasrian alam, dll..."
                          className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-hidden focus:border-neutral-900 font-normal"
                          required
                        />
                      </div>
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
                        <span>Simpan Data</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
