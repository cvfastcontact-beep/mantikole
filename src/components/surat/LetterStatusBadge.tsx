'use client';

import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

interface LetterStatusBadgeProps {
  status?: string;
}

export default function LetterStatusBadge({ status }: LetterStatusBadgeProps) {
  switch (status?.toUpperCase()) {
    case 'PENDING':
      return (
        <span className="bg-amber-50 border border-amber-200 text-amber-900 font-mono text-[10px] px-3 py-1 font-extrabold uppercase rounded-full inline-flex items-center space-x-1.5">
          <Clock size={12} className="text-amber-600" />
          <span>DALAM VERIFIKASI (PENDING)</span>
        </span>
      );
    case 'PROCESSED':
      return (
        <span className="bg-slate-100 border border-slate-300 text-slate-900 font-mono text-[10px] px-3 py-1 font-extrabold uppercase rounded-full inline-flex items-center space-x-1.5">
          <Clock size={12} />
          <span>SEDANG DIPROSES (PROCESSED)</span>
        </span>
      );
    case 'COMPLETED':
      return (
        <span className="bg-slate-950 text-white font-mono text-[10px] px-3 py-1 font-extrabold uppercase rounded-full inline-flex items-center space-x-1.5">
          <CheckCircle2 size={12} className="text-emerald-400" />
          <span>SURAT SELESAI (COMPLETED)</span>
        </span>
      );
    case 'REJECTED':
      return (
        <span className="bg-red-50 border border-red-200 text-red-700 font-mono text-[10px] px-3 py-1 font-extrabold uppercase rounded-full inline-flex items-center space-x-1.5">
          <XCircle size={12} />
          <span>DITOLAK (REJECTED)</span>
        </span>
      );
    default:
      return null;
  }
}
