'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  LogOut,
  RefreshCw,
  LayoutDashboard,
  Newspaper,
  Compass,
  Users,
  HelpCircle,
  Sliders,
} from 'lucide-react';
import { fetchApi } from '../../lib/api';
import { Sidebar, SidebarBody, SidebarLink } from '../../components/ui/sidebar';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';

import AdminLoginForm from '../../components/admin/AdminLoginForm';
import AdminDashboardOverview from '../../components/admin/AdminDashboardOverview';
import AdminLettersTable from '../../components/admin/AdminLettersTable';
import AdminArticlesManager from '../../components/admin/AdminArticlesManager';
import AdminWisataManager from '../../components/admin/AdminWisataManager';
import AdminStaffManager from '../../components/admin/AdminStaffManager';
import AdminFaqManager from '../../components/admin/AdminFaqManager';
import AdminSettingsManager from '../../components/admin/AdminSettingsManager';

type AdminTab = 'dashboard' | 'letters' | 'articles' | 'wisata' | 'staff' | 'faqs' | 'settings';

export default function AdminPage() {
  const toast = useToast();
  const [token, setToken] = useState<string | null>(null);

  // Login Form State
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Navigation & Data
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [letterRequests, setLetterRequests] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [articles, setArticles] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mantikole_token');
    if (saved) {
      setToken(saved);
      loadAdminData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetchApi<{ success: boolean; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      if (res.success && res.token) {
        localStorage.setItem('mantikole_token', res.token);
        setToken(res.token);
        loadAdminData();
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login gagal. Periksa kembali username dan password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mantikole_token');
    setToken(null);
  };

  const loadAdminData = async () => {
    try {
      const [reqsRes, statsRes, articlesRes] = await Promise.all([
        fetchApi<{ success: boolean; data: any[] }>('/letters/requests'),
        fetchApi<{ success: boolean; data: any }>('/admin/dashboard-stats'),
        fetchApi<{ success: boolean; data: any[] }>('/articles'),
      ]);

      if (reqsRes.success) setLetterRequests(reqsRes.data);
      if (statsRes.success) setStats(statsRes.data);
      if (articlesRes.success) setArticles(articlesRes.data);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  const handleUpdateLetterStatus = async (id: string, newStatus: string, notes: string) => {
    try {
      const res = await fetchApi<{ success: boolean; message: string }>(`/letters/requests/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus, admin_notes: notes }),
      });

      if (res.success) {
        toast.success(`Status permohonan surat berhasil diperbarui menjadi ${newStatus}.`);
        loadAdminData();
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal mengubah status surat.');
    }
  };

  if (!token) {
    return (
      <AdminLoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        loginLoading={loginLoading}
        handleLogin={handleLogin}
      />
    );
  }

  const filteredRequests = letterRequests.filter((r) => {
    if (!statusFilter) return true;
    return r.status.toUpperCase() === statusFilter.toUpperCase();
  });

  const sidebarLinks = [
    {
      id: 'dashboard' as const,
      label: 'Ringkasan Dashboard',
      href: '#',
      icon: <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => setActiveTab('dashboard'),
    },
    {
      id: 'letters' as const,
      label: `Verifikasi Surat (${letterRequests.length})`,
      href: '#',
      icon: <FileText className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => setActiveTab('letters'),
    },
    {
      id: 'articles' as const,
      label: 'Kelola Warta & Berita',
      href: '#',
      icon: <Newspaper className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => setActiveTab('articles'),
    },
    {
      id: 'wisata' as const,
      label: 'Wisata & Komoditas',
      href: '#',
      icon: <Compass className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => setActiveTab('wisata'),
    },
    {
      id: 'staff' as const,
      label: 'Perangkat Desa',
      href: '#',
      icon: <Users className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => setActiveTab('staff'),
    },
    {
      id: 'faqs' as const,
      label: 'FAQ Accordion',
      href: '#',
      icon: <HelpCircle className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => setActiveTab('faqs'),
    },
    {
      id: 'settings' as const,
      label: 'Teks Landing Page & Demografi',
      href: '#',
      icon: <Sliders className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => setActiveTab('settings'),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-neutral-50 text-neutral-900 font-sans">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="justify-between gap-8">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto space-y-6">
            <div className="flex items-center space-x-3 py-1">
              <div className="h-8 w-8 shrink-0 rounded-xl bg-neutral-900 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                M
              </div>
              <motion.span
                animate={{
                  display: sidebarOpen ? 'inline-block' : 'none',
                  opacity: sidebarOpen ? 1 : 0,
                }}
                className="font-extrabold text-sm text-neutral-900 tracking-tight uppercase whitespace-pre"
              >
                Mantikole CMS
              </motion.span>
            </div>

            <div className="flex flex-col gap-1">
              {sidebarLinks.map((link) => (
                <SidebarLink
                  key={link.id}
                  link={{ label: link.label, href: link.href, icon: link.icon }}
                  onClick={link.onClick}
                  className={activeTab === link.id ? 'bg-neutral-200 text-neutral-950 font-bold border border-neutral-300 shadow-2xs rounded-xl' : ''}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4 space-y-2">
            <div className="flex items-center space-x-3 px-2 py-1">
              <div className="w-7 h-7 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                AD
              </div>
              <motion.div
                animate={{
                  display: sidebarOpen ? 'block' : 'none',
                  opacity: sidebarOpen ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <span className="text-xs font-extrabold text-neutral-900 block truncate">Perangkat Desa</span>
                <span className="text-[10px] text-neutral-500 font-medium block truncate">admin@desamantikole.id</span>
              </motion.div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 py-2 px-2.5 rounded-xl hover:bg-rose-50 text-rose-600 hover:text-rose-700 transition-colors text-xs font-extrabold cursor-pointer"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <motion.span
                animate={{
                  display: sidebarOpen ? 'inline-block' : 'none',
                  opacity: sidebarOpen ? 1 : 0,
                }}
                className="whitespace-pre"
              >
                Keluar Admin
              </motion.span>
            </button>
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 h-screen overflow-y-auto p-6 sm:p-10 space-y-8 bg-neutral-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              SISTEM KONTEN & VERIFIKASI DESA
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {activeTab === 'dashboard' && 'Ringkasan Dashboard & Analitik'}
              {activeTab === 'letters' && 'Verifikasi Permohonan Surat Warga'}
              {activeTab === 'articles' && 'Manajemen Warta & Berita Desa'}
              {activeTab === 'wisata' && 'Manajemen Wisata & Komoditas'}
              {activeTab === 'staff' && 'Manajemen Struktur Perangkat Desa'}
              {activeTab === 'faqs' && 'Manajemen Pertanyaan Umum (FAQ)'}
              {activeTab === 'settings' && 'Pengaturan Teks Beranda & Demografi'}
            </h1>
          </div>

          <button
            onClick={loadAdminData}
            className="bg-white border border-neutral-200 text-neutral-900 hover:bg-neutral-100 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 self-start sm:self-auto shadow-2xs transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Refresh Data</span>
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <AdminDashboardOverview
            letterRequests={letterRequests}
            articles={articles}
            stats={stats}
            onNavigateLetters={() => setActiveTab('letters')}
          />
        )}

        {activeTab === 'letters' && (
          <AdminLettersTable
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            filteredRequests={filteredRequests}
            handleUpdateLetterStatus={handleUpdateLetterStatus}
          />
        )}

        {activeTab === 'articles' && <AdminArticlesManager />}

        {activeTab === 'wisata' && <AdminWisataManager />}

        {activeTab === 'staff' && <AdminStaffManager />}

        {activeTab === 'faqs' && <AdminFaqManager />}

        {activeTab === 'settings' && <AdminSettingsManager />}
      </main>
    </div>
  );
}
