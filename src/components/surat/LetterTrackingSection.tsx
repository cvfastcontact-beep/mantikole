'use client';

import React from 'react';
import { Search, XCircle } from 'lucide-react';
import LetterStatusBadge from './LetterStatusBadge';

interface LetterTrackingSectionProps {
  trackInput: string;
  setTrackInput: (val: string) => void;
  trackingLoading: boolean;
  trackedData: any;
  trackError: string;
  onExecuteTrack: (ticketNum: string) => void;
}

export default function LetterTrackingSection({
  trackInput,
  setTrackInput,
  trackingLoading,
  trackedData,
  trackError,
  onExecuteTrack,
}: LetterTrackingSectionProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 space-y-4 shadow-xs">
        <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight flex items-center space-x-2">
          <Search size={20} className="text-slate-950" />
          <span>Cek Status Verifikasi Pengajuan Surat</span>
        </h2>
        <p className="text-xs text-slate-600 font-normal">
          Masukkan Nomor Tiket Resi resmi yang Anda terima saat mengajukan permohonan surat (contoh: <strong>MNT-2026-08001</strong>).
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onExecuteTrack(trackInput);
          }}
          className="flex flex-col sm:flex-row gap-3 pt-2"
        >
          <input
            type="text"
            value={trackInput}
            onChange={(e) => setTrackInput(e.target.value)}
            placeholder="Masukkan Kode Resi (MNT-2026-XXXXX)"
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-slate-950 font-mono tracking-wider font-bold transition-all"
          />
          <button
            type="submit"
            disabled={trackingLoading || !trackInput.trim()}
            className="bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider transition-all disabled:opacity-50 shadow-xs cursor-pointer"
          >
            {trackingLoading ? 'Memeriksa...' : 'Lacak Status'}
          </button>
        </form>
      </div>

      {trackError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-700 flex items-start space-x-2 font-medium">
          <XCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
          <span>{trackError}</span>
        </div>
      )}

      {trackedData && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block">
                NOMOR TIKET RESI
              </span>
              <span className="text-xl font-black font-mono text-slate-950 tracking-wider">
                {trackedData.ticket_number}
              </span>
            </div>
            <div>
              <LetterStatusBadge status={trackedData.status} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Nama Pemohon:</span>
              <span className="font-extrabold text-slate-950 text-sm">{trackedData.applicant_name}</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">NIK Pemohon:</span>
              <span className="font-mono font-bold text-slate-950">{trackedData.applicant_nik}</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Jenis Surat:</span>
              <span className="font-extrabold text-slate-950 text-sm">{trackedData.letter_type_code}</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Tanggal Pengajuan:</span>
              <span className="text-slate-950 font-medium">
                {new Date(trackedData.created_at).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="bg-slate-950 text-white p-5 rounded-2xl space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
              Catatan Verifikasi Perangkat Desa:
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              {trackedData.admin_notes || 'Sedang dalam peninjauan berkas oleh staf desa.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
