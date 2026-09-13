'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface ArticleFilterBarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ArticleFilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: ArticleFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Category Tabs */}
      <div className="flex bg-slate-200/60 p-1.5 rounded-2xl w-fit border border-slate-200 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            {cat === 'ALL' ? 'Semua Kategori' : cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative min-w-[280px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari judul berita..."
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-2.5 pl-10 rounded-xl font-medium focus:outline-none focus:bg-white focus:border-slate-400 transition-all"
        />
        <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
      </div>
    </div>
  );
}
