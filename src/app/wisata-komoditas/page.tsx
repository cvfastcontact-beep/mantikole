'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { fetchApi } from '../../lib/api';
import { useOutsideClick } from '../../hooks/use-outside-click';
import JsonLd, { airPanasSchema, airTerjunSchema, generateBreadcrumbSchema } from '../../components/JsonLd';
import BlurFade from '../../components/ui/blur-fade';

import HighlightDetailModal from '../../components/wisata-komoditas/HighlightDetailModal';
import WisataCatalogGrid from '../../components/wisata-komoditas/WisataCatalogGrid';

export default function HighlightsExpandablePage() {
  const [items, setItems] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'wisata' | 'komoditas'>('all');
  const [active, setActive] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadHighlights() {
      try {
        const res = await fetchApi<{ success: boolean; data: any[] }>('/highlights');
        if (res.success && res.data.length > 0) {
          const mapped = res.data.map((item) => ({
            ...item,
            src: item.gallery_urls?.[0],
            ctaText: item.type === 'wisata' ? 'Rute Google Maps' : 'Informasi Komoditas',
            ctaLink: `https://www.google.com/maps/search/?api=1&query=${item.latitude || -1.0745},${item.longitude || 119.8322}`,
          }));
          setItems(mapped);
        }
      } catch (err) {
        console.error('Fetch highlights error:', err);
      }
    }
    loadHighlights();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(null);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <BlurFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-10">
      <JsonLd
        data={[
          airPanasSchema,
          airTerjunSchema,
          generateBreadcrumbSchema([
            { name: 'Beranda', url: '/' },
            { name: 'Wisata & Komoditas', url: '/wisata-komoditas' },
          ]),
        ]}
      />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-200/80 pb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
          POTENSI LOKAL DOLO BARAT
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase">
          Wisata Alami & Komoditas Desa
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
          Klik pada setiap kartu untuk membuka tampilan detail interaktif mengenai Pemandian Air Panas Alami Mantikole, Air Terjun, serta komoditas perkebunan Kakao dan Cengkeh unggulan.
        </p>
      </div>

      <WisataCatalogGrid
        items={items}
        filterType={filterType}
        setFilterType={setFilterType}
        setActive={setActive}
        id={id}
      />

      <HighlightDetailModal
        active={active}
        setActive={setActive}
        refObj={ref}
        id={id}
        mounted={mounted}
      />
    </BlurFade>
  );
}
