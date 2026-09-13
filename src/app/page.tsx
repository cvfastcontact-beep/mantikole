'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FileText, Calendar, ChevronRight, ExternalLink } from 'lucide-react';
import { fetchApi } from '../lib/api';
import HeroFrameScroll from '../components/HeroFrameScroll';
import BlurFade from '../components/ui/blur-fade';
import FaqAccordion from '../components/FaqAccordion';
import VillageStaffSection from '../components/home/VillageStaffSection';
import BentoFeaturesSection from '../components/home/BentoFeaturesSection';
import VillageDemographicsSection from '../components/home/VillageDemographicsSection';
import JsonLd, { faqPageSchema } from '../components/JsonLd';

export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, any>>({
    hero_title: 'Selamat Datang di Portal Resmi Desa Mantikole',
    hero_subtitle: 'Kecamatan Dolo Barat, Kabupaten Sigi, Sulawesi Tengah. Pusat informasi wisata pemandian air panas alami, perkebunan kakao, dan pelayanan surat digital mandiri.',
    hero_slogan: 'Wisata Air Panas Alami & Pelayanan Digital Desa',
    village_location_text: 'Kecamatan Dolo Barat, Kabupaten Sigi, Sulawesi Tengah. Akses rute menuju pusat pemerintahan desa, destinasi wisata pemandian air panas alami, dan kawasan perkebunan.',
    maps_embed_url: 'https://maps.google.com/maps?q=-1.0745,119.8322&z=13&output=embed',
    maps_direct_url: 'https://www.google.com/maps/search/?api=1&query=-1.0745,119.8322',
    total_population: 2145,
    total_families: 582,
    total_area_km2: '18.45',
    total_hamlets: 3,
    cacao_production_tons: 120,
    hotsprings_visitors_monthly: 1850,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [articlesRes, settingsRes] = await Promise.all([
          fetchApi<{ success: boolean; data: any[] }>('/articles').catch(() => ({ success: false, data: [] })),
          fetchApi<{ success: boolean; data: Record<string, any> }>('/settings').catch(() => ({ success: false, data: {} })),
        ]);

        if (articlesRes.success && articlesRes.data.length > 0) {
          setArticles(articlesRes.data.slice(0, 3));
        }
        if (settingsRes.success && settingsRes.data) {
          setSettings((prev) => ({ ...prev, ...settingsRes.data }));
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans">
      <JsonLd data={faqPageSchema} />

      {/* Hero Animated Canvas */}
      <HeroFrameScroll settings={settings} />

      {/* Perangkat Desa Scroll Section */}
      <VillageStaffSection />

      {/* Data Statistik & Demografi Desa */}
      <BlurFade>
        <VillageDemographicsSection settings={settings} />
      </BlurFade>

      {/* Peta Lokasi Desa Mantikole */}
      <BlurFade>
        <section id="peta" className="relative z-30 py-16 bg-white border-t border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                  Lokasi & Peta Wilayah Desa Mantikole
                </h2>
                <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                  {settings.village_location_text}
                </p>
              </div>
              <div>
                <a
                  href={settings.maps_direct_url || 'https://www.google.com/maps/search/?api=1&query=-1.0745,119.8322'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-xs"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="relative w-full h-[450px] sm:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200 bg-neutral-100">
              <iframe
                title="Peta Lokasi Desa Mantikole"
                src={settings.maps_embed_url || 'https://maps.google.com/maps?q=-1.0745,119.8322&z=13&output=embed'}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </BlurFade>

      {/* Bento Grid Potensi & Wisata */}
      <BlurFade>
        <BentoFeaturesSection />
      </BlurFade>

      {/* Warta & Berita Desa */}
      <BlurFade>
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  PUBLIKASI RESMI
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                  Warta & Berita Terkini
                </h2>
              </div>
              <Link
                href="/berita"
                className="text-xs font-bold text-neutral-900 hover:text-neutral-600 flex items-center space-x-1"
              >
                <span>Lihat Semua Berita</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {loading ? (
              <div className="py-10 text-center text-xs font-semibold text-neutral-400">Memuat warta desa...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((art) => (
                  <Link key={art.id} href={`/berita/${art.id}`}>
                    <article className="h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-neutral-900 hover:shadow-lg transition-all group cursor-pointer shadow-2xs">
                      {art.featured_image_url && (
                        <div className="relative w-full h-44 overflow-hidden bg-neutral-100 border-b border-neutral-100">
                          <img
                            src={art.featured_image_url}
                            alt={art.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-3 left-3 bg-neutral-900/90 text-white font-bold px-2.5 py-0.5 text-[10px] rounded-full uppercase backdrop-blur-xs">
                            {art.category}
                          </span>
                        </div>
                      )}

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-xs">
                            {!art.featured_image_url && (
                              <span className="bg-neutral-900 text-white font-bold px-2.5 py-0.5 text-[10px] rounded-full uppercase">
                                {art.category}
                              </span>
                            )}
                            <span className="text-neutral-500 text-[11px] font-medium flex items-center space-x-1 ml-auto">
                              <Calendar size={12} />
                              <span>{new Date(art.created_at).toLocaleDateString('id-ID')}</span>
                            </span>
                          </div>
                          <h3 className="font-extrabold text-base text-neutral-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-2">
                            {art.title}
                          </h3>
                          <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 font-normal">
                            {art.summary}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-neutral-100 mt-4 flex items-center justify-between text-xs font-extrabold text-neutral-900">
                          <span>Baca Artikel</span>
                          <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </BlurFade>

      {/* Pertanyaan Umum FAQ */}
      <BlurFade>
        <FaqAccordion />
      </BlurFade>

      {/* Direct Action Banner */}
      <BlurFade>
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-neutral-900 text-white rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="bg-white/10 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest border border-white/20">
                  PELAYANAN SURAT DIGITAL
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
                  Permohonan Surat SKU & Domisili Mandiri
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  Warga tidak perlu antre di kantor desa. Isi formulir permohonan surat berbasis NIK dan dapatkan resi penjejakan status verifikasi resmi.
                </p>
              </div>
              <div>
                <Link
                  href="/surat"
                  className="bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs px-6 py-3.5 rounded-xl transition-all flex items-center space-x-2 shrink-0 shadow-xs"
                >
                  <FileText size={15} />
                  <span>Ajukan Surat Sekarang</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </BlurFade>
    </div>
  );
}
