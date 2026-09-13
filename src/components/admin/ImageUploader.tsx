'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, AlertCircle, Loader2, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  onChange?: (url: string) => void;
  currentUrl?: string;
  onUploadSuccess?: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  currentUrl,
  onUploadSuccess,
  folder = 'cms',
  label = 'Upload Gambar Media',
}: ImageUploaderProps) {
  const activeUrl = value || currentUrl || '';
  const updateUrl = (url: string) => {
    if (onChange) onChange(url);
    if (onUploadSuccess) onUploadSuccess(url);
  };

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Format berkas harus berupa gambar (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran gambar maksimal 10 MB.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const token = typeof window !== 'undefined' ? localStorage.getItem('mantikole_token') : null;

      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal mengunggah gambar ke Neon Storage.');
      }

      updateUrl(json.data.url);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengunggah.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-neutral-700">{label}</label>
        <span className="text-[10px] text-neutral-400 font-mono font-medium">neon object storage</span>
      </div>

      <div className="flex items-start space-x-3">
        {/* Preview Thumbnail */}
        <div className="relative w-20 h-20 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 flex items-center justify-center group shadow-2xs">
          {activeUrl ? (
            <>
              <img
                src={activeUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => updateUrl('')}
                className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer"
                title="Hapus gambar"
              >
                <X size={11} />
              </button>
            </>
          ) : (
            <div className="text-center p-2 text-neutral-400 space-y-1">
              <ImageIcon size={20} className="mx-auto text-neutral-300" />
              <span className="text-[9px] block font-semibold leading-tight">Belum Ada</span>
            </div>
          )}
        </div>

        {/* Upload Control Area */}
        <div className="flex-1 space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-1.5 bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 size={13} className="animate-spin text-blue-400" />
                  <span>Mengunggah...</span>
                </>
              ) : (
                <>
                  <UploadCloud size={13} />
                  <span>Pilih File Gambar</span>
                </>
              )}
            </button>

            <span className="text-[11px] text-neutral-400 font-medium">atau masukkan URL langsung:</span>
          </div>

          <input
            type="url"
            value={activeUrl}
            onChange={(e) => updateUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-mono text-neutral-600 focus:outline-hidden focus:border-neutral-900"
          />

          {error && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center space-x-1">
              <AlertCircle size={12} />
              <span>{error}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
