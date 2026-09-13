'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, AlertCircle, MapPin, Sliders, Users } from 'lucide-react';
import { fetchApi } from '../../lib/api';

export default function AdminSettingsManager() {
  const [settings, setSettings] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_slogan: '',
    village_location_text: '',
    maps_embed_url: '',
    maps_direct_url: '',
    contact_phone: '',
    contact_email: '',
    office_hours: '',
    total_population: 2145,
    total_families: 582,
    total_area_km2: '18.45',
    total_hamlets: 3,
    cacao_production_tons: 120,
    hotsprings_visitors_monthly: 1850,
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetchApi<{ success: boolean; data: any }>('/settings');
        if (res.success && res.data) {
          setSettings((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetchApi<{ success: boolean; message: string }>('/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });

      if (res.success) {
        setMsg({ type: 'success', text: 'Pengaturan website dan statistik desa berhasil disimpan secara permanen.' });
      }
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Gagal menyimpan pengaturan website.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
          Pengaturan Konten Website & Data Demografi
        </h2>
        <p className="text-xs text-neutral-500">
          Ubah seluruh judul, teks pengantar, koordinat peta Google Maps, dan statistik kependudukan yang tampil di Landing Page.
        </p>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center space-x-2 font-semibold ${
            msg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {msg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{msg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Section 1: Teks Landing Page & Hero */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 text-sm font-extrabold text-neutral-900 pb-3 border-b border-neutral-100">
            <Sliders size={16} className="text-blue-900" />
            <span>Teks Utama Beranda (Landing Page)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-neutral-700">Judul Utama Hero (Hero Title)</label>
              <input
                type="text"
                value={settings.hero_title}
                onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                placeholder="Selamat Datang di Portal Resmi Desa Mantikole"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-neutral-700">Sub-Judul & Deskripsi Singkat</label>
              <textarea
                rows={2}
                value={settings.hero_subtitle}
                onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                placeholder="Deskripsi singkat profil desa..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Slogan / Motto Desa</label>
              <input
                type="text"
                value={settings.hero_slogan}
                onChange={(e) => setSettings({ ...settings, hero_slogan: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                placeholder="Maju Bersama Menuju Kemandirian Desa Digital"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Jam Operasional Pelayanan Kantor</label>
              <input
                type="text"
                value={settings.office_hours}
                onChange={(e) => setSettings({ ...settings, office_hours: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                placeholder="Senin - Jumat, 08:00 - 15:00 WITA"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Data Statistik & Demografi Penduduk */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 text-sm font-extrabold text-neutral-900 pb-3 border-b border-neutral-100">
            <Users size={16} className="text-amber-700" />
            <span>Data Statistik Kependudukan & Potensi Desa</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Jumlah Penduduk (Jiwa)</label>
              <input
                type="number"
                value={settings.total_population}
                onChange={(e) => setSettings({ ...settings, total_population: parseInt(e.target.value, 10) || 0 })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Jumlah Kepala Keluarga (KK)</label>
              <input
                type="number"
                value={settings.total_families}
                onChange={(e) => setSettings({ ...settings, total_families: parseInt(e.target.value, 10) || 0 })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Luas Wilayah Desa (km²)</label>
              <input
                type="text"
                value={settings.total_area_km2}
                onChange={(e) => setSettings({ ...settings, total_area_km2: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Jumlah Wilayah Dusun</label>
              <input
                type="number"
                value={settings.total_hamlets}
                onChange={(e) => setSettings({ ...settings, total_hamlets: parseInt(e.target.value, 10) || 0 })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Hasil Panen Kakao (Ton/Tahun)</label>
              <input
                type="number"
                value={settings.cacao_production_tons}
                onChange={(e) => setSettings({ ...settings, cacao_production_tons: parseInt(e.target.value, 10) || 0 })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Pengunjung Air Panas (Org/Bulan)</label>
              <input
                type="number"
                value={settings.hotsprings_visitors_monthly}
                onChange={(e) => setSettings({ ...settings, hotsprings_visitors_monthly: parseInt(e.target.value, 10) || 0 })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Peta Google Maps & Kontak */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 text-sm font-extrabold text-neutral-900 pb-3 border-b border-neutral-100">
            <MapPin size={16} className="text-emerald-700" />
            <span>Peta Lokasi & Informasi Kontak</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-neutral-700">Teks Deskripsi Lokasi Wilayah</label>
              <input
                type="text"
                value={settings.village_location_text}
                onChange={(e) => setSettings({ ...settings, village_location_text: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">URL Iframe Embed Google Maps</label>
              <input
                type="text"
                value={settings.maps_embed_url}
                onChange={(e) => setSettings({ ...settings, maps_embed_url: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 font-mono text-[11px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">URL Tautan Langsung Google Maps</label>
              <input
                type="text"
                value={settings.maps_direct_url}
                onChange={(e) => setSettings({ ...settings, maps_direct_url: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 font-mono text-[11px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">No Telepon / WhatsApp Kantor Desa</label>
              <input
                type="text"
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Email Resmi Kantor Desa</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Menyimpan Perubahan...' : 'Simpan Semua Pengaturan'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
