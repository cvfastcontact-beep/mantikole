'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Clock, Phone, Shield } from 'lucide-react';
import { fetchApi } from '../lib/api';

export default function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<Record<string, any>>({
    village_location_text: 'Jl. Utama Desa Mantikole, Kec. Dolo Barat, Kab. Sigi, Sulteng 94361',
    office_hours: 'Senin - Jumat: 08.00 - 15.00 WITA',
    contact_phone: '(0451) Layanan Kantor Desa',
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetchApi<{ success: boolean; data: Record<string, any> }>('/settings');
        if (res.success && res.data) {
          setSettings((prev) => ({
            ...prev,
            village_location_text: res.data.village_location_text || prev.village_location_text,
            office_hours: res.data.office_hours || prev.office_hours,
            contact_phone: res.data.contact_phone || prev.contact_phone,
          }));
        }
      } catch (err) {
        // Fallback gracefully
      }
    }
    loadSettings();
  }, []);

  // Do not render Footer on admin dashboard routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-slate-950 text-white font-extrabold text-base flex items-center justify-center rounded-xl">
                M
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight text-slate-900 block">Desa Mantikole</span>
                <span className="text-[11px] text-slate-500 font-medium">Kec. Dolo Barat, Kab. Sigi</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Platform Digital Pelayanan Mandiri Warga, Portofolio Wisata Air Panas Alami & Komoditas Perkebunan Kakao Desa Mantikole.
            </p>
          </div>

          {/* Col 2: Info */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Kantor Desa Mantikole
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-start space-x-2">
                <MapPin size={13} className="text-slate-800 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{settings.village_location_text}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock size={13} className="text-slate-800 shrink-0" />
                <span className="font-semibold text-slate-900">{settings.office_hours}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={13} className="text-slate-800 shrink-0" />
                <span>{settings.contact_phone}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Layanan Digital
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              <li>
                <Link href="/surat" className="hover:text-slate-950 transition-colors">
                  • Pengajuan Surat Mandiri (SKU, SKD, SKTM)
                </Link>
              </li>
              <li>
                <Link href="/surat#lacak" className="hover:text-slate-950 transition-colors">
                  • Cek Resi Pengajuan Surat (MNT-2026)
                </Link>
              </li>
              <li>
                <Link href="/wisata-komoditas" className="hover:text-slate-950 transition-colors">
                  • Pemandian Air Panas Alami & Air Terjun
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-slate-950 transition-colors">
                  • Warta & Pengumuman Resmi Desa
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: AI & Admin */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Asisten AI & Admin
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pertanyaan rute wisata, tiket air panas, atau berkas surat dijawab 24/7 oleh **Mantikole AI Assistant**.
            </p>
            <div className="pt-1">
              <Link
                href="/admin"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all"
              >
                <Shield size={13} />
                <span>Portal CMS Perangkat Desa</span>
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Pemerintah Desa Mantikole & Tim KKN. Hak Cipta Dilindungi.</p>
          <div className="flex space-x-3 mt-2 md:mt-0 font-medium">
            <span>Kec. Dolo Barat</span>
            <span>•</span>
            <span>Kab. Sigi</span>
            <span>•</span>
            <span>Sulawesi Tengah</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
