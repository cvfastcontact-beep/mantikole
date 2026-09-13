# Peningkatan UX & Halaman Publik Frontend (2026-08-07)

Dokumen ini mencatat penyempurnaan pengalaman pengguna (UX) pada halaman publik, penambahan komponen Scatter Scroll Perangkat Desa, FAQ Accordion, efek animasi BlurFade, serta pembuatan halaman detail berita (`/berita/[id]`).

---

## 1. Scattered Scroll Perangkat Desa & Foto Resmi

### WHY (Mengapa)
Memperkenalkan jajaran Perangkat Desa Mantikole (Kepala Desa, Sekdes, BPD, Kaur Keuangan, Kasi Pemerintahan) dengan tampilan visual berupa tumpukan kartu yang bergeser secara interaktif mengikuti arah scroll layar pengguna.

### HOW (Bagaimana)
- Menyiapkan aset foto resmi di `public/images/perangkat/`.
- Membuat komponen `ScatteredScroll` (`src/components/ui/scattered-scroll.tsx`) menggunakan Framer Motion `useScroll` dan `useTransform` untuk mengatur rotasi, elevasi, dan pergeseran horizontal kartu.

### WHERE (Di Mana)
- [src/components/ui/scattered-scroll.tsx](file:///d:/KKN/Website/frontend/src/components/ui/scattered-scroll.tsx#L1-L132)
- [public/images/perangkat/](file:///d:/KKN/Website/frontend/public/images/perangkat/)

### WHAT (Apa)
```tsx
// src/components/ui/scattered-scroll.tsx
export default function ScatteredScroll({ children, overlap = 300, scrollDistance = 400 }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Render stacked cards with rotational transforms */}
      </div>
    </div>
  );
}
```

---

## 2. Halaman Detail Berita (`src/app/berita/[id]/page.tsx`)

### WHY (Mengapa)
Masyarakat membutuhkan halaman khusus untuk membaca berita desa secara lengkap, melihat statistik jumlah pembaca (`views_count`), serta membagikan artikel ke media sosial.

### HOW (Bagaimana)
- Membuat komponen halaman Next.js dinamis `src/app/berita/[id]/page.tsx`.
- Memanggil backend API `GET /api/v1/articles/:idOrSlug` untuk mengambil detail isi artikel.
- Menampilkan kategori artikel, tanggal rilis, nama penulis, serta navigasi kembali ke katalog berita.

### WHERE (Di Mana)
- [src/app/berita/[id]/page.tsx](file:///d:/KKN/Website/frontend/src/app/berita/[id]/page.tsx#L1-L213)

### WHAT (Apa)
```tsx
// src/app/berita/[id]/page.tsx (Cuplikan Pemanggilan API & Render)
export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        const res = await fetchApi<{ success: boolean; data: any }>(`/articles/${params.id}`);
        if (res.success) setArticle(res.data);
      } catch (err) {
        console.error('Error fetching article detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [params.id]);

  if (loading) return <div className="pt-32 text-center text-xs font-semibold">Memuat artikel...</div>;
  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950">{article.title}</h1>
      <div className="prose text-slate-700 text-sm leading-relaxed">{article.content}</div>
    </div>
  );
}
```

---

## 3. Peta Lokasi Desa & FAQ Accordion

### WHY (Mengapa)
Memudahkan pengunjung menemukan rute geografis lokasi Desa Mantikole, Pemandian Air Panas, serta menjawab pertanyaan populer warga seputar pelayanan surat digital.

### HOW (Bagaimana)
- Mengintegrasikan Iframe Google Maps responsif di `src/app/page.tsx`.
- Membuat komponen `FaqAccordion` di `src/components/FaqAccordion.tsx` dengan transisi ekspansi halus.

### WHERE (Di Mana)
- [src/components/FaqAccordion.tsx](file:///d:/KKN/Website/frontend/src/components/FaqAccordion.tsx#L1-L112)
