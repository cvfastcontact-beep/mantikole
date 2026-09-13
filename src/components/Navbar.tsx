'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FileText, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not render Navbar on admin dashboard routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/wisata-komoditas', label: 'Wisata & Komoditas' },
    { href: '/surat', label: 'Layanan Surat' },
    { href: '/berita', label: 'Warta Desa' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 px-4 sm:px-6">
      
      {/* Floating Dynamic Navbar Container */}
      <div
        className={`pointer-events-auto transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? 'max-w-4xl mx-auto my-3 px-5 py-2 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-full shadow-lg'
            : 'max-w-7xl mx-auto py-4 bg-transparent border-b border-white/10'
        }`}
      >
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-xs border border-slate-200/80 group-hover:scale-105 transition-transform bg-white flex items-center justify-center">
            <Image
              src="/logo-asli.jpeg"
              alt="Logo Resmi Desa Mantikole"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-black text-xs tracking-tight text-slate-900 hidden sm:inline-block">
            Mantikole
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center space-x-2">
          <Link
            href="/surat#lacak"
            className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-1.5 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-full transition-all shadow-2xs"
          >
            <FileText size={13} className="text-slate-600" />
            <span>Lacak Resi</span>
          </Link>

          <Link
            href="/admin"
            className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-1.5 bg-slate-950 text-white hover:bg-slate-800 rounded-full transition-all shadow-xs"
          >
            <ShieldCheck size={13} />
            <span>CMS</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-slate-950 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto max-w-sm mx-auto bg-white border border-slate-200 rounded-2xl p-4 mt-2 space-y-2 shadow-xl animate-in zoom-in-95 duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                pathname === link.href
                  ? 'text-white bg-slate-950 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              href="/surat#lacak"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 py-2 bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl border border-slate-200"
            >
              <FileText size={14} />
              <span>Lacak Resi Surat</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 py-2 bg-slate-950 text-white text-xs font-semibold rounded-xl"
            >
              <ShieldCheck size={14} />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
