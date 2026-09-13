'use client';

import React from 'react';
import { Send, AlertCircle } from 'lucide-react';
import LetterSuccessBanner from './LetterSuccessBanner';
import LetterTemplatesGrid from './LetterTemplatesGrid';

interface LetterRequestFormProps {
  selectedTypeCode: string;
  setSelectedTypeCode: (val: string) => void;
  nik: string;
  handleNikChange: (val: string) => void;
  fullName: string;
  setFullName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  submitting: boolean;
  formSuccess: any;
  formError: string;
  copiedResi: boolean;
  onCopyResi: (ticketNumber: string) => void;
  onTrackNow: (ticketNumber: string) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  templates: any[];
}

export default function LetterRequestForm({
  selectedTypeCode,
  setSelectedTypeCode,
  nik,
  handleNikChange,
  fullName,
  setFullName,
  phone,
  setPhone,
  address,
  setAddress,
  submitting,
  formSuccess,
  formError,
  copiedResi,
  onCopyResi,
  onTrackNow,
  handleFormSubmit,
  templates,
}: LetterRequestFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Form Container */}
      <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
            Isi Data Pemohon Surat
          </h2>
          <p className="text-xs text-slate-500 font-normal">
            Pastikan data yang diisikan sesuai dengan Dokumen KTP Kependudukan Anda.
          </p>
        </div>

        <LetterSuccessBanner
          formSuccess={formSuccess}
          copiedResi={copiedResi}
          onCopyResi={onCopyResi}
          onTrackNow={onTrackNow}
        />

        {formError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-700 flex items-start space-x-2 font-medium">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-1.5">
              Pilih Jenis Surat *
            </label>
            <select
              value={selectedTypeCode}
              onChange={(e) => setSelectedTypeCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-slate-950 font-bold transition-all"
            >
              <option value="SKU">Surat Keterangan Usaha (SKU)</option>
              <option value="SKD">Surat Keterangan Domisili (SKD)</option>
              <option value="SKTM">Surat Keterangan Tidak Mampu (SKTM)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-1.5">
              Nomor Induk Kependudukan (NIK Pemohon - 16 Digit) *
            </label>
            <input
              type="text"
              value={nik}
              onChange={(e) => handleNikChange(e.target.value)}
              placeholder="Contoh: 7201021508920001"
              maxLength={16}
              required
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-slate-950 font-mono tracking-wider font-semibold transition-all"
            />
            <span className="text-[10px] text-slate-500 font-medium block mt-1">
              Jumlah digit angka: {nik.length} / 16 digit
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-1.5">
              Nama Lengkap Pemohon (Sesuai KTP) *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap pemohon"
              required
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-slate-950 font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-1.5">
              Nomor WhatsApp / Telepon Aktif *
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 081234567890"
              required
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-slate-950 font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-1.5">
              Alamat Lengkap Dusun / RT / RW Mantikole *
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Contoh: Dusun II Mantikole, RT 03 / RW 01"
              required
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs p-4 rounded-xl focus:outline-none focus:bg-white focus:border-slate-950 font-medium transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs py-4 rounded-xl uppercase tracking-wider flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shadow-xs cursor-pointer"
          >
            <Send size={15} />
            <span>{submitting ? 'Mengirim Permohonan...' : 'Kirim Pengajuan Surat'}</span>
          </button>
        </form>
      </div>

      <LetterTemplatesGrid templates={templates} />
    </div>
  );
}
