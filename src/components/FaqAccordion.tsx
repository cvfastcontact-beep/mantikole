'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fetchApi } from '../lib/api';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: 'Berapa tiket masuk Pemandian Air Panas Alami Mantikole?',
    answer:
      'Tiket masuk Pemandian Air Panas Mantikole sebesar Rp 5.000 per orang. Buka setiap hari pukul 07:00 - 18:00 WITA. Air panas alami pegunungan kaya kandungan belerang untuk kesehatan kulit dan terapi kebugaran.',
  },
  {
    question: 'Bagaimana cara mengajukan surat keterangan mandiri tanpa antre?',
    answer:
      'Warga cukup membuka menu "Layanan Surat" di website ini, memilih jenis surat (SKU/SKD/SKTM), mengisikan NIK 16 digit dan data diri, lalu klik Kirim. Anda akan langsung menerima Nomor Tiket Resi (misal: MNT-2026-08001) untuk melacak verifikasi status oleh perangkat desa.',
  },
  {
    question: 'Berapa lama proses verifikasi surat oleh perangkat desa?',
    answer:
      'Verifikasi dokumen oleh staf desa membutuhkan waktu 1-2 hari kerja. Setelah status permohonan menjadi "COMPLETED", surat resmi dapat dicetak atau diambil langsung di Kantor Desa Mantikole.',
  },
  {
    question: 'Apa saja potensi komoditas perkebunan unggulan di Desa Mantikole?',
    answer:
      'Komoditas perkebunan utama warga adalah Kakao (Cokelat) dengan teknik fermentasi modern berkualitas tinggi, Cengkeh aromatik, Kelapa murni, Jagung, dan Padi persawahan.',
  },
  {
    question: 'Kapan jam operasional pelayanan Kantor Desa Mantikole?',
    answer:
      'Pelayanan fisik Kantor Desa beroperasi pada hari Senin hingga Jumat, pukul 08:00 - 15:00 WITA. Sedangkan permohonan surat digital dan informasi AI Chatbot aktif 24 jam.',
  },
];

export default function FaqAccordion() {
  const [faqs, setFaqs] = useState<FaqItem[]>(DEFAULT_FAQS);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const res = await fetchApi<{ success: boolean; data: any[] }>('/faqs');
        if (res.success && res.data.length > 0) {
          setFaqs(res.data);
        }
      } catch (err) {
        // Use default FAQs
      }
    }
    loadFaqs();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-3 text-center">
          <span className="text-[11px] font-bold text-neutral-900 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full uppercase tracking-wider">
            PUSAT INFORMASI WARGA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Pertanyaan Umum (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Informasi seputar pelayanan publik digital, destinasi wisata pemandian air panas alami, serta potensi komoditas Desa Mantikole.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-colors hover:border-neutral-400 shadow-2xs"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left space-x-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-extrabold text-neutral-900 text-base sm:text-lg leading-snug">
                    {item.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 text-neutral-500"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0, filter: 'blur(6px)' }}
                      animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                      exit={{ height: 0, opacity: 0, filter: 'blur(6px)' }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100 whitespace-pre-line">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
