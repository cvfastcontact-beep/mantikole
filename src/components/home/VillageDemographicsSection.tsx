'use client';

import React from 'react';
import { Users, Home, Map, Trees, Sparkles, Droplets } from 'lucide-react';

interface VillageDemographicsProps {
  settings: {
    total_population?: number;
    total_families?: number;
    total_area_km2?: string;
    total_hamlets?: number;
    cacao_production_tons?: number;
    hotsprings_visitors_monthly?: number;
  };
}

export default function VillageDemographicsSection({ settings }: VillageDemographicsProps) {
  const stats = [
    {
      label: 'Jumlah Penduduk',
      value: (settings.total_population || 2145).toLocaleString('id-ID'),
      unit: 'Jiwa',
      icon: Users,
      desc: 'Terdata di Dinas Kependudukan & Catatan Sipil',
    },
    {
      label: 'Kepala Keluarga',
      value: (settings.total_families || 582).toLocaleString('id-ID'),
      unit: 'KK',
      icon: Home,
      desc: 'Tersebar di 3 Wilayah Dusun Mantikole',
    },
    {
      label: 'Luas Wilayah',
      value: settings.total_area_km2 || '18.45',
      unit: 'km²',
      icon: Map,
      desc: 'Kawasan pemukiman & lereng pegunungan subur',
    },
    {
      label: 'Wilayah Dusun',
      value: settings.total_hamlets || 3,
      unit: 'Dusun',
      icon: Trees,
      desc: 'Dusun I, Dusun II, dan Dusun III',
    },
    {
      label: 'Hasil Panen Kakao',
      value: `±${settings.cacao_production_tons || 120}`,
      unit: 'Ton/Tahun',
      icon: Sparkles,
      desc: 'Komoditas biji cokelat fermentasi unggulan',
    },
    {
      label: 'Wisatawan Air Panas',
      value: `±${(settings.hotsprings_visitors_monthly || 1850).toLocaleString('id-ID')}`,
      unit: 'Org/Bulan',
      icon: Droplets,
      desc: 'Kunjungan destinasi air panas alami belerang',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              DATA STATISTIK & DEMOGRAFI DESA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Potensi Wilayah & Kependudukan Mantikole
            </h2>
            <p className="text-sm text-neutral-600 font-normal leading-relaxed">
              Ringkasan data administrasi kependudukan resmi serta potensi agrikultur dan pariwisata yang dikelola oleh Pemerintah Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi.
            </p>
          </div>
          <div className="text-xs text-neutral-500 font-medium">
            *Diperbarui secara berkala oleh Sekretariat Desa
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-neutral-900 transition-all group relative overflow-hidden shadow-2xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-neutral-600 tracking-tight uppercase">
                    {item.label}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                    {item.value}
                  </span>
                  <span className="text-xs font-bold text-neutral-500 uppercase">
                    {item.unit}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 font-normal mt-3 pt-3 border-t border-neutral-100 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
