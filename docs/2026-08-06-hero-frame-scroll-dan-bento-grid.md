# Hero Frame Scroll & Magic UI Bento Grid (2026-08-06)

Dokumen ini mencatat pembuatan komponen interaktif animasi **Canvas Frame Scroll 60FPS** dan **Magic UI Bento Grid** pada halaman utama Desa Mantikole.

---

## 1. Hero Frame Scroll Component berbasis Canvas HTML5

### WHY (Mengapa)
Memberikan kesan visual yang memukau (*WOW factor*) ketika pengunjung pertama kali membuka Website Desa Mantikole, dengan menampilkan transformasi visual sinematik lanskap pegunungan Mantikole yang berubah seiring pergerakan scroll layar pengguna.

### HOW (Bagaimana)
- Menggunakan HTML5 `<canvas>` yang memuat urutan 96 aset bingkai gambar PNG (`public/frame/frame_00000.png` s/d `frame_00095.png`).
- Mengaitkan indeks gambar dengan persentase scroll jendela (`window.scrollY / totalScrollHeight`).
- Mempra-muat (*preload*) seluruh gambar ke dalam memori browser untuk menjamin kecepatan animasi halus 60FPS tanpa *lag* saat di-scroll.

### WHERE (Di Mana)
- [src/components/HeroFrameScroll.tsx](file:///d:/KKN/Website/frontend/src/components/HeroFrameScroll.tsx#L1-L191)

### WHAT (Apa)
```tsx
// src/components/HeroFrameScroll.tsx (Cuplikan Canvas Preloader & Render)
useEffect(() => {
  const frames: HTMLImageElement[] = [];
  let loadedCount = 0;

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    const frameIndex = String(i).padStart(5, '0');
    img.src = `/frame/frame_${frameIndex}.png`;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === TOTAL_FRAMES) setImagesLoaded(true);
    };
    frames.push(img);
  }
  imagesRef.current = frames;
}, []);

const renderFrame = (index: number) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const img = imagesRef.current[index];
  if (ctx && img) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
};
```

---

## 2. Magic UI Bento Grid Layout

### WHY (Mengapa)
Menyajikan informasi potensi unggulan desa (Pemandian Air Panas, Perkebunan Kakao, Air Terjun, & Portal Surat Mandiri) dalam tata letak kisi (*grid*) modern bersudut melengkung, berbayangan halus, dan berlatar belakang pola aksen yang memikat.

### HOW (Bagaimana)
Membuat komponen reusable `BentoGrid` dan `BentoCard` dengan efek *hover animation*, aksen *gradient border*, serta integrasi ikon Lucide React.

### WHERE (Di Mana)
- [src/components/ui/bento-grid.tsx](file:///d:/KKN/Website/frontend/src/components/ui/bento-grid.tsx#L1-L94)

### WHAT (Apa)
```tsx
// src/components/ui/bento-grid.tsx
export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  badgeText,
}: BentoCardProps) => (
  <div className={cn("group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-300", className)}>
    <div>{background}</div>
    <div className="relative z-10 space-y-3">
      {badgeText && <span className="bg-slate-950 text-white text-[10px] font-extrabold px-3 py-1 rounded-full">{badgeText}</span>}
      <h3 className="text-xl font-bold text-slate-950">{name}</h3>
      <p className="text-xs text-slate-600 leading-relaxed font-normal">{description}</p>
    </div>
  </div>
);
```
