'use client';

import React from 'react';
import { CheckCircle2, Check, Copy } from 'lucide-react';

interface LetterSuccessBannerProps {
  formSuccess: any;
  copiedResi: boolean;
  onCopyResi: (ticketNumber: string) => void;
  onTrackNow: (ticketNumber: string) => void;
}

export default function LetterSuccessBanner({
  formSuccess,
  copiedResi,
  onCopyResi,
  onTrackNow,
}: LetterSuccessBannerProps) {
  if (!formSuccess) return null;

  return (
    <div className="bg-slate-950 text-white rounded-2xl p-6 space-y-4 shadow-md">
      <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
        <CheckCircle2 size={18} />
        <span>Pengajuan Surat Berhasil Dikirim!</span>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-normal">
        Terima kasih, <strong className="text-white font-bold">{formSuccess.applicant_name}</strong>. Permohonan surat jenis <strong className="text-white font-bold">{formSuccess.letter_type_code}</strong> Anda telah tercatat pada sistem perangkat desa.
      </p>

      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-extrabold tracking-wider">Nomor Tiket Resi Anda:</span>
          <span className="font-mono text-xl font-black text-white tracking-widest">
            {formSuccess.ticket_number}
          </span>
        </div>
        <button
          onClick={() => onCopyResi(formSuccess.ticket_number)}
          className="bg-white text-slate-950 hover:bg-slate-100 text-xs px-4 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
        >
          {copiedResi ? <Check size={14} /> : <Copy size={14} />}
          <span>{copiedResi ? 'Tersalin' : 'Salin Resi'}</span>
        </button>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-400 gap-2">
        <span>Simpan nomor resi di atas untuk melacak verifikasi berkas.</span>
        <button
          onClick={() => onTrackNow(formSuccess.ticket_number)}
          className="text-white font-bold hover:underline flex items-center space-x-1 cursor-pointer"
        >
          <span>Lacak Sekarang</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
