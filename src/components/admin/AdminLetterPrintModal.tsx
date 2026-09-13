'use client';

import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface LetterPrintModalProps {
  letter: any;
  onClose: () => void;
}

export default function AdminLetterPrintModal({ letter, onClose }: LetterPrintModalProps) {
  if (!letter) return null;

  const handlePrint = () => {
    window.print();
  };

  const getLetterTitle = (code: string) => {
    switch (code) {
      case 'SKU':
        return 'SURAT KETERANGAN USAHA (SKU)';
      case 'SKD':
        return 'SURAT KETERANGAN DOMISILI (SKD)';
      case 'SKTM':
        return 'SURAT KETERANGAN TIDAK MAMPU (SKTM)';
      default:
        return `SURAT KETERANGAN RESMI (${code})`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden border border-neutral-200 my-8">
        
        {/* Modal Top Bar (Hidden on Print) */}
        <div className="p-4 bg-neutral-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span className="text-xs font-bold tracking-tight">
              Format Dokumen Cetak Resmi Desa Mantikole
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Printer size={14} />
              <span>Cetak Dokumen (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Official Village Letter Sheet */}
        <div className="p-8 sm:p-12 text-neutral-900 font-serif leading-relaxed bg-white space-y-6">
          
          {/* Kop Surat Resmi */}
          <div className="text-center border-b-4 border-double border-neutral-900 pb-4 space-y-1">
            <h3 className="font-bold text-sm tracking-widest uppercase">
              PEMERINTAH KABUPATEN SIGI
            </h3>
            <h2 className="font-bold text-base tracking-widest uppercase">
              KECAMATAN DOLO BARAT
            </h2>
            <h1 className="font-extrabold text-xl sm:text-2xl tracking-wider uppercase">
              KANTOR KEPALA DESA MANTIKOLE
            </h1>
            <p className="text-[10px] sm:text-xs font-sans text-neutral-600 font-normal italic">
              Alamat: Jl. Poros Desa Mantikole, Kec. Dolo Barat, Kab. Sigi, Sulawesi Tengah 94361 | Email: kantor@desamantikole.id
            </p>
          </div>

          {/* Judul & Nomor Surat */}
          <div className="text-center space-y-1 py-2">
            <h2 className="font-bold text-base sm:text-lg underline underline-offset-4 uppercase">
              {getLetterTitle(letter.letter_type_code)}
            </h2>
            <p className="text-xs font-sans font-semibold text-neutral-700">
              Nomor: 470 / {letter.ticket_number} / MNT / {new Date(letter.created_at).getFullYear()}
            </p>
          </div>

          {/* Isi Surat Pengantar */}
          <p className="text-xs sm:text-sm text-justify font-sans leading-relaxed">
            Yang bertanda tangan di bawah ini, Kepala Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi, Provinsi Sulawesi Tengah, dengan ini menerangkan dengan sebenarnya bahwa:
          </p>

          {/* Biodata Pemohon */}
          <div className="text-xs sm:text-sm font-sans space-y-2 pl-4 sm:pl-8">
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-neutral-700">Nama Lengkap</span>
              <span className="col-span-2 font-bold">: {letter.applicant_name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-neutral-700">Nomor Induk Kependudukan (NIK)</span>
              <span className="col-span-2 font-bold font-mono">: {letter.applicant_nik}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-neutral-700">Nomor WhatsApp / HP</span>
              <span className="col-span-2">: {letter.applicant_phone}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-neutral-700">Alamat Tempat Tinggal</span>
              <span className="col-span-2">: {letter.applicant_address}</span>
            </div>
          </div>

          {/* Keterangan Tambahan */}
          <p className="text-xs sm:text-sm text-justify font-sans leading-relaxed">
            Berdasarkan data kependudukan dan hasil verifikasi dokumen yang telah dilakukan, pemohon tersebut di atas adalah benar warga yang berdomisili/memiliki usaha di wilayah Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi.
          </p>

          <p className="text-xs sm:text-sm text-justify font-sans leading-relaxed">
            Surat keterangan ini diberikan kepada yang bersangkutan untuk dipergunakan sebagaimana mestinya dan berlaku selama 3 (tiga) bulan sejak tanggal diterbitkan.
          </p>

          {/* Tanda Tangan & QR Code Verifikasi */}
          <div className="pt-8 grid grid-cols-2 gap-6 items-end font-sans">
            <div className="space-y-2">
              <div className="w-24 h-24 border-2 border-neutral-900 rounded-lg p-2 flex flex-col items-center justify-center bg-neutral-50 text-center">
                <span className="text-[9px] font-mono font-bold">{letter.ticket_number}</span>
                <span className="text-[8px] text-neutral-500 mt-1">QR RESI DIGITAL</span>
              </div>
              <p className="text-[10px] text-neutral-500 leading-tight">
                *Dokumen ini sah dan terverifikasi digital melalui Portal Resmi Desa Mantikole.
              </p>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs text-neutral-700">
                Mantikole, {new Date(letter.updated_at || letter.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-xs font-bold text-neutral-900">
                Kepala Desa Mantikole
              </p>
              <div className="h-16 flex items-center justify-center">
                <span className="text-[11px] font-serif text-neutral-400 italic">
                  [Tanda Tangan & Cap Digital]
                </span>
              </div>
              <p className="text-xs font-bold underline text-neutral-900">
                Drs. H. Moh. Rizal
              </p>
              <p className="text-[10px] text-neutral-600">NIP. 19740512 200212 1 003</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
