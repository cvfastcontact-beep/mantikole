'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, FileCheck } from 'lucide-react';

interface AnalyticsChartsProps {
  stats: {
    total_articles: number;
    pending_letters: number;
    approved_letters: number;
    total_highlights: number;
    total_website_views: number;
    today_ai_queries: number;
    weekly_letter_trends?: Array<{ day: string; pending: number; completed: number }>;
  };
}

export default function AdminAnalyticsCharts({ stats }: AnalyticsChartsProps) {
  const weeklyData = stats.weekly_letter_trends || [
    { day: 'Sen', pending: 2, completed: 5 },
    { day: 'Sel', pending: 4, completed: 3 },
    { day: 'Rab', pending: 1, completed: 6 },
    { day: 'Kam', pending: 3, completed: 4 },
    { day: 'Jum', pending: 5, completed: 7 },
    { day: 'Sab', pending: 0, completed: 2 },
    { day: 'Min', pending: 1, completed: 1 },
  ];

  const maxVal = Math.max(...weeklyData.map((d) => d.pending + d.completed), 10);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Letter Processing Trend Chart (SVG Bar Chart) */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-neutral-900 font-extrabold text-sm">
                <BarChart3 size={18} className="text-blue-900" />
                <span>Tren Pemrosesan Surat Mingguan</span>
              </div>
              <p className="text-xs text-neutral-500">
                Visualisasi rasio pengajuan permohonan masuk (pending) vs surat selesai (completed).
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-semibold">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-neutral-900"></span>
                <span className="text-neutral-700">Selesai (Completed)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-amber-400"></span>
                <span className="text-neutral-700">Menunggu (Pending)</span>
              </div>
            </div>
          </div>

          {/* Bar Visualization */}
          <div className="pt-6">
            <div className="flex items-end justify-between h-48 gap-3 border-b border-neutral-200 pb-2 px-2">
              {weeklyData.map((item, idx) => {
                const completedHeight = Math.round((item.completed / maxVal) * 100);
                const pendingHeight = Math.round((item.pending / maxVal) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                    {/* Tooltip on Hover */}
                    <div className="absolute -top-10 bg-neutral-950 text-white text-[10px] py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-10">
                      {item.completed} Selesai / {item.pending} Menunggu
                    </div>

                    <div className="w-full max-w-[32px] flex flex-col gap-1 items-center justify-end h-full">
                      <div
                        style={{ height: `${pendingHeight}%` }}
                        className="w-full bg-amber-400 rounded-t-sm transition-all duration-500"
                      />
                      <div
                        style={{ height: `${completedHeight}%` }}
                        className="w-full bg-neutral-900 rounded-t-sm transition-all duration-500"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-neutral-500 mt-2">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Digital Traffic & Performance Distribution */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-neutral-900 font-extrabold text-sm">
              <TrendingUp size={18} className="text-emerald-700" />
              <span>Efisiensi Birokrasi Digital</span>
            </div>
            <p className="text-xs text-neutral-500">
              Persentase keberhasilan otomatisasi layanan desa.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-neutral-800 mb-1.5">
                <span>Penyelesaian Surat Tepat Waktu</span>
                <span className="text-emerald-700">92%</span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[92%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-neutral-800 mb-1.5">
                <span>Penyelesaian Pertanyaan via AI RAG</span>
                <span className="text-blue-900">88%</span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-900 h-full rounded-full w-[88%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-neutral-800 mb-1.5">
                <span>Akses Pengajuan Berbasis NIK Mandiri</span>
                <span className="text-amber-700">96%</span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full w-[96%]" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-500 flex items-center justify-between">
            <span>Rata-rata Waktu Verifikasi</span>
            <span className="font-extrabold text-neutral-900">1.2 Hari Kerja</span>
          </div>
        </div>

      </div>
    </div>
  );
}
