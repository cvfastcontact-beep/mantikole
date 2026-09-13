'use client';

import React from 'react';
import Image from 'next/image';
import { User, Lock } from 'lucide-react';

interface AdminLoginFormProps {
  username: string;
  setUsername: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  loginError: string;
  loginLoading: boolean;
  handleLogin: (e: React.FormEvent) => void;
}

export default function AdminLoginForm({
  username,
  setUsername,
  password,
  setPassword,
  loginError,
  loginLoading,
  handleLogin,
}: AdminLoginFormProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-5">
          <div className="relative w-11 h-11 bg-white rounded-xl overflow-hidden border border-slate-700 shadow-md flex items-center justify-center shrink-0">
            <Image
              src="/logo-asli.jpeg"
              alt="Logo Desa Mantikole"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-black text-base tracking-tight text-white uppercase">
              CMS DESA MANTIKOLE
            </h1>
            <span className="text-xs text-slate-400 font-medium">Portal Otentikasi Perangkat Desa</span>
          </div>
        </div>

        {loginError && (
          <div className="bg-red-950/80 border border-red-800 text-red-200 text-xs p-4 rounded-xl font-medium">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Username Admin
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-4 py-3 pl-10 rounded-xl focus:outline-none focus:border-white font-medium transition-all"
              />
              <User size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-4 py-3 pl-10 rounded-xl focus:outline-none focus:border-white font-medium transition-all"
              />
              <Lock size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all disabled:opacity-50 shadow-xs cursor-pointer"
          >
            {loginLoading ? 'Memverifikasi...' : 'Masuk Panel Admin'}
          </button>
        </form>

        <p className="text-[11px] text-slate-500 text-center font-medium">
          Demo kredensial: <code className="text-white font-bold">admin</code> / <code className="text-white font-bold">admin123</code>
        </p>
      </div>
    </div>
  );
}
