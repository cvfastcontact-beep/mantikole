'use client';

import React, { useState } from 'react';
import { Printer, Search, CheckCircle, Clock, XCircle } from 'lucide-react';
import AdminLetterPrintModal from './AdminLetterPrintModal';

interface AdminLettersTableProps {
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  filteredRequests: any[];
  handleUpdateLetterStatus: (id: string, newStatus: string, notes: string) => void;
}

export default function AdminLettersTable({
  statusFilter,
  setStatusFilter,
  filteredRequests,
  handleUpdateLetterStatus,
}: AdminLettersTableProps) {
  const [selectedLetterForPrint, setSelectedLetterForPrint] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const displayedRequests = filteredRequests.filter((r) =>
    r.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.applicant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.applicant_nik.includes(searchQuery) ||
    r.letter_type_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Modal Cetak Surat */}
      {selectedLetterForPrint && (
        <AdminLetterPrintModal
          letter={selectedLetterForPrint}
          onClose={() => setSelectedLetterForPrint(null)}
        />
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase text-neutral-500">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-neutral-200 text-neutral-900 text-xs font-bold px-4 py-2 rounded-xl focus:outline-none focus:border-neutral-900"
          >
            <option value="">Semua Status</option>
            <option value="PENDING">PENDING (Menunggu)</option>
            <option value="PROCESSED">PROCESSED (Diproses)</option>
            <option value="COMPLETED">COMPLETED (Selesai)</option>
            <option value="REJECTED">REJECTED (Ditolak)</option>
          </select>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Resi / Nama / NIK..."
            className="pl-8 pr-3 py-2 text-xs bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Letter Requests Table */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 overflow-x-auto shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-900 text-white uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="p-4 rounded-l-xl">Nomor Resi</th>
              <th className="p-4">Pemohon & NIK</th>
              <th className="p-4">Jenis Surat</th>
              <th className="p-4">Status</th>
              <th className="p-4">Catatan Admin</th>
              <th className="p-4 rounded-r-xl text-right">Aksi & Dokumen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-normal">
            {displayedRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-neutral-400 text-xs">
                  Tidak ada data permohonan surat yang ditemukan.
                </td>
              </tr>
            ) : (
              displayedRequests.map((req) => (
                <tr key={req.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-neutral-900">{req.ticket_number}</td>
                  <td className="p-4 space-y-0.5">
                    <span className="font-bold text-neutral-900 block">{req.applicant_name}</span>
                    <span className="font-mono text-neutral-500 text-[11px]">NIK: {req.applicant_nik}</span>
                    <span className="text-neutral-400 text-[10px] block">HP: {req.applicant_phone}</span>
                  </td>
                  <td className="p-4 font-bold text-neutral-800">{req.letter_type_code}</td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        req.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : req.status === 'COMPLETED'
                          ? 'bg-neutral-900 text-white'
                          : req.status === 'REJECTED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-neutral-200 text-neutral-900'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 max-w-xs text-neutral-600 line-clamp-2">{req.admin_notes || '-'}</td>
                  <td className="p-4 space-x-1.5 whitespace-nowrap text-right">
                    
                    {/* Tombol Cetak Dokumen PDF */}
                    <button
                      onClick={() => setSelectedLetterForPrint(req)}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-2xs transition-colors inline-flex items-center space-x-1 cursor-pointer"
                      title="Pratinjau & Cetak Dokumen Resmi"
                    >
                      <Printer size={12} />
                      <span>Cetak Surat</span>
                    </button>

                    <button
                      onClick={() => {
                        const note = prompt('Masukkan catatan admin untuk status PROCESSED:', req.admin_notes);
                        if (note !== null) handleUpdateLetterStatus(req.id, 'PROCESSED', note);
                      }}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-neutral-200 cursor-pointer"
                    >
                      Proses
                    </button>

                    <button
                      onClick={() => {
                        const note = prompt('Masukkan catatan persetujuan:', 'Surat telah selesai diverifikasi dan siap diunduh/diambil di Kantor Desa Mantikole.');
                        if (note !== null) handleUpdateLetterStatus(req.id, 'COMPLETED', note);
                      }}
                      className="bg-emerald-600 text-white hover:bg-emerald-700 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-2xs cursor-pointer"
                    >
                      Setujui
                    </button>

                    <button
                      onClick={() => {
                        const note = prompt('Masukkan alasan penolakan:', 'Syarat berkas / NIK belum lengkap.');
                        if (note !== null) handleUpdateLetterStatus(req.id, 'REJECTED', note);
                      }}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-rose-200 cursor-pointer"
                    >
                      Tolak
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
