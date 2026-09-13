'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileText, Search } from 'lucide-react';
import { fetchApi } from '../../lib/api';
import LetterRequestForm from '../../components/surat/LetterRequestForm';
import LetterTrackingSection from '../../components/surat/LetterTrackingSection';
import JsonLd, { generateBreadcrumbSchema } from '../../components/JsonLd';

function LettersContent() {
  const searchParams = useSearchParams();
  const initialResiParam = searchParams.get('resi') || '';

  const [activeTab, setActiveTab] = useState<'form' | 'track'>('form');

  const [nik, setNik] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedTypeCode, setSelectedTypeCode] = useState('SKU');

  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<any>(null);
  const [formError, setFormError] = useState('');
  const [copiedResi, setCopiedResi] = useState(false);

  const [trackInput, setTrackInput] = useState(initialResiParam);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackedData, setTrackedData] = useState<any>(null);
  const [trackError, setTrackError] = useState('');

  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const res = await fetchApi<{ success: boolean; data: any[] }>('/letters/templates');
        if (res.success) setTemplates(res.data);
      } catch (err) {
        console.error('Fetch templates error:', err);
      }
    }
    loadTemplates();

    if (initialResiParam) {
      setActiveTab('track');
      executeTrack(initialResiParam);
    }
  }, [initialResiParam]);

  const handleNikChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    setNik(cleaned);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(null);

    if (nik.length !== 16) {
      setFormError('Nomor Induk Kependudukan (NIK) harus berjumlah 16 digit angka.');
      return;
    }

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setFormError('Seluruh bidang formulir wajib diisi.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetchApi<{ success: boolean; message: string; data: any }>('/letters/request', {
        method: 'POST',
        body: JSON.stringify({
          applicant_nik: nik,
          applicant_name: fullName.trim(),
          applicant_phone: phone.trim(),
          applicant_address: address.trim(),
          letter_type_code: selectedTypeCode,
        }),
      });

      if (res.success) {
        setFormSuccess(res.data);
        setNik('');
        setFullName('');
        setPhone('');
        setAddress('');
      }
    } catch (err: any) {
      setFormError(err.message || 'Gagal mengajukan surat. Silakan periksa kembali data Anda.');
    } finally {
      setSubmitting(false);
    }
  };

  const executeTrack = async (ticketNum: string) => {
    if (!ticketNum.trim()) return;
    setTrackingLoading(true);
    setTrackError('');
    setTrackedData(null);

    try {
      const res = await fetchApi<{ success: boolean; data: any }>(`/letters/track/${encodeURIComponent(ticketNum.trim())}`);
      if (res.success) {
        setTrackedData(res.data);
      }
    } catch (err: any) {
      setTrackError(err.message || 'Nomor resi tidak ditemukan. Pastikan format penulisan benar (contoh: MNT-2026-08001).');
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleCopyResi = (ticketNumber: string) => {
    navigator.clipboard.writeText(ticketNumber);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-10">
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Beranda', url: '/' },
          { name: 'Layanan Surat Mandiri', url: '/surat' },
        ])}
      />

      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
          PELAYANAN ADMINISTRASI WARGA DIGITAL
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase">
          Portal Layanan Surat Mandiri
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
          Ajukan permohonan Surat Keterangan Usaha (SKU), Domisili (SKD), atau Tidak Mampu (SKTM) tanpa perlu mendaftar akun. Dapatkan Nomor Resi Tiket unik untuk memantau verifikasi perangkat desa secara real-time.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-200/60 p-1.5 rounded-2xl w-fit border border-slate-200">
        <button
          onClick={() => setActiveTab('form')}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'form'
              ? 'bg-slate-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          <FileText size={15} />
          <span>Formulir Pengajuan Online</span>
        </button>

        <button
          id="lacak"
          onClick={() => setActiveTab('track')}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'track'
              ? 'bg-slate-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          <Search size={15} />
          <span>Lacak Status Tiket Resi</span>
        </button>
      </div>

      {activeTab === 'form' && (
        <LetterRequestForm
          selectedTypeCode={selectedTypeCode}
          setSelectedTypeCode={setSelectedTypeCode}
          nik={nik}
          handleNikChange={handleNikChange}
          fullName={fullName}
          setFullName={setFullName}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          submitting={submitting}
          formSuccess={formSuccess}
          formError={formError}
          copiedResi={copiedResi}
          onCopyResi={handleCopyResi}
          onTrackNow={(ticket) => {
            setTrackInput(ticket);
            setActiveTab('track');
            executeTrack(ticket);
          }}
          handleFormSubmit={handleFormSubmit}
          templates={templates}
        />
      )}

      {activeTab === 'track' && (
        <LetterTrackingSection
          trackInput={trackInput}
          setTrackInput={setTrackInput}
          trackingLoading={trackingLoading}
          trackedData={trackedData}
          trackError={trackError}
          onExecuteTrack={executeTrack}
        />
      )}
    </div>
  );
}

export default function LettersPage() {
  return (
    <Suspense fallback={<div className="pt-32 p-12 text-center text-xs font-semibold text-slate-400">Memuat portal surat...</div>}>
      <LettersContent />
    </Suspense>
  );
}
