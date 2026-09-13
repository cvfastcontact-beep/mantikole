'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Flame, Trees, FileText, ArrowRight } from 'lucide-react';
import { BentoGrid, BentoCard } from '../ui/bento-grid';
import { fetchApi } from '../../lib/api';
import { BENTO_FEATURES } from '../../lib/constants';

export default function BentoFeaturesSection() {
  const [cards, setCards] = useState<any[]>(BENTO_FEATURES);

  useEffect(() => {
    async function loadHighlights() {
      try {
        const res = await fetchApi<{ success: boolean; data: any[] }>('/highlights');
        if (res.success && res.data.length > 0) {
          const highlights = res.data;

          const airPanas = highlights.find((h) => h.type === 'wisata' && h.title.toLowerCase().includes('panas')) || highlights[0];
          const kakao = highlights.find((h) => h.type === 'komoditas' && h.title.toLowerCase().includes('kakao')) || highlights[1] || highlights[0];
          const airTerjun = highlights.find((h) => h.title.toLowerCase().includes('terjun')) || highlights[2] || highlights[0];

          const dynamicCards = [
            {
              Icon: Flame,
              name: airPanas.title,
              description: airPanas.short_description,
              href: '/wisata-komoditas',
              cta: 'Lihat Rute & Informasi Tiket',
              className: 'col-span-1 md:col-span-2 relative overflow-hidden group',
              badgeText: `${airPanas.type === 'wisata' ? 'Wisata' : 'Komoditas'} • ${airPanas.price_info || 'Rp 5.000'}`,
              imageUrl: airPanas.gallery_urls?.[0] || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
            },
            {
              Icon: Trees,
              name: kakao.title,
              description: kakao.short_description,
              href: '/wisata-komoditas',
              cta: 'Lihat Detail Komoditas',
              className: 'col-span-1 md:col-span-1 relative overflow-hidden group',
              badgeText: `${kakao.type === 'wisata' ? 'Wisata' : 'Komoditas'} • ${kakao.price_info || 'Rp 35.000/Kg'}`,
              imageUrl: kakao.gallery_urls?.[0] || 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=1200&auto=format&fit=crop',
            },
            {
              Icon: Trees,
              name: airTerjun?.title || 'Wisata Air Terjun Mantikole',
              description: airTerjun?.short_description || 'Gemericik air pegunungan jernih di tengah hutan tropis Dolo Barat.',
              href: '/wisata-komoditas',
              cta: 'Lihat Jalur Trekking',
              className: 'col-span-1 md:col-span-1 relative overflow-hidden group',
              badgeText: `${airTerjun?.type === 'wisata' ? 'Wisata Alam' : 'Komoditas'} • ${airTerjun?.price_info || 'Gratis'}`,
              imageUrl: airTerjun?.gallery_urls?.[0] || 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop',
            },
            {
              Icon: FileText,
              name: 'Portal Layanan Surat Mandiri',
              description: 'Ajukan permohonan Surat Keterangan Usaha (SKU), Domisili (SKD), atau SKTM secara mandiri berbasis NIK tanpa mengantre di kantor desa.',
              href: '/surat',
              cta: 'Buat Surat Mandiri Sekarang',
              className: 'col-span-1 md:col-span-2 relative overflow-hidden group',
              badgeText: 'Pelayanan 24/7',
              imageUrl: null,
            },
          ];

          setCards(dynamicCards);
        }
      } catch (err) {
        // Fallback to static cards
      }
    }

    loadHighlights();
  }, []);

  return (
    <section id="potensi" className="relative z-30 -mt-28 pt-8 pb-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              POTENSI ALAM & LAYANAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Destinasi Unggulan & Inovasi Desa
            </h2>
          </div>

          <Link
            href="/wisata-komoditas"
            className="text-xs font-bold text-slate-950 hover:text-slate-600 flex items-center space-x-1 transition-colors"
          >
            <span>Lihat Semua Katalog</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <BentoGrid>
          {cards.map((feature, idx) => {
            const background = feature.imageUrl ? (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={feature.imageUrl}
                  alt={feature.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-20 group-hover:opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>
            ) : (
              <div className="absolute top-0 right-0 h-full w-full opacity-10 pointer-events-none bg-[radial-gradient(#09090b_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)]" />
            );

            return (
              <BentoCard
                key={idx}
                {...feature}
                background={background}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
