'use client';

import React from 'react';
import { Download, HelpCircle } from 'lucide-react';

interface TemplateItem {
  id: string | number;
  title: string;
  description: string;
  file_url?: string;
}

interface LetterTemplatesGridProps {
  templates: TemplateItem[];
}

export default function LetterTemplatesGrid({ templates }: LetterTemplatesGridProps) {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Download size={18} className="text-slate-950" />
          <h3 className="font-extrabold text-xs uppercase tracking-tight text-slate-950">
            Unduh Template Dokumen Kosong
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          Unduh berkas permohonan resmi dalam format Word (.docx) untuk pengisian manual.
        </p>

        <div className="space-y-2.5 pt-1">
          {templates.map((tpl) => (
            <div key={tpl.id} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
              <span className="font-bold text-xs text-slate-950 block">{tpl.title}</span>
              <p className="text-[11px] text-slate-500 leading-tight font-normal">{tpl.description}</p>
              <a
                href={tpl.file_url || '#'}
                download
                className="inline-flex items-center space-x-1 text-[11px] font-extrabold text-slate-950 hover:text-slate-600 pt-1 transition-colors"
              >
                <Download size={12} />
                <span>Download .DOCX</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 text-white rounded-3xl p-6 space-y-3 shadow-xs">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 text-slate-200">
          <HelpCircle size={18} />
          <h3 className="font-extrabold text-xs uppercase tracking-wider">Informasi Verifikasi</h3>
        </div>
        <ul className="text-xs text-slate-300 space-y-2.5 leading-relaxed font-normal">
          <li>• Proses verifikasi berkas oleh perangkat desa memerlukan waktu 1-2 hari kerja.</li>
          <li>• Setelah status menjadi <strong>COMPLETED</strong>, surat fisik dapat diambil di Kantor Desa Mantikole.</li>
          <li>• Jam Pelayanan Kantor Desa: Senin - Jumat (08:00 - 15:00 WITA).</li>
        </ul>
      </div>
    </div>
  );
}
