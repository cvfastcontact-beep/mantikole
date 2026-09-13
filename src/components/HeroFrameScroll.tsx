'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 96;

// Global Singleton Cache across page re-renders & route changes
const globalImageCache: HTMLImageElement[] = [];
let isGlobalFullyLoaded = false;

interface HeroFrameScrollProps {
  settings?: {
    hero_title?: string;
    hero_subtitle?: string;
    hero_slogan?: string;
  };
}

export default function HeroFrameScroll({ settings }: HeroFrameScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(isGlobalFullyLoaded);
  const [loadProgress, setLoadProgress] = useState(isGlobalFullyLoaded ? 100 : 0);

  // 1. Scroll Progress Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 2. Spring Inertia Layer for smooth scroll stopping delay effect
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  // 3. Map scroll progress (0 -> 0.85) to frame index (0 -> 95)
  const currentFrame = useTransform(smoothProgress, [0, 0.85], [0, TOTAL_FRAMES - 1]);

  // Hero Text Animations: Opacity, Y, Scale & Blur-Out on Scroll
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.18], [0, -40]);
  const heroTextBlur = useTransform(smoothProgress, [0, 0.18], ['blur(0px)', 'blur(12px)']);
  const heroTextScale = useTransform(smoothProgress, [0, 0.18], [1, 0.96]);

  // Seamless Bottom Transition into Content Section (#f8fafc)
  const bottomFadeOpacity = useTransform(smoothProgress, [0.60, 0.85], [0, 1]);

  // Preload frame images with Global Singleton Caching
  useEffect(() => {
    if (globalImageCache.length === TOTAL_FRAMES && isGlobalFullyLoaded) {
      setImages(globalImageCache);
      setImagesLoaded(true);
      setLoadProgress(100);
      return;
    }

    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const frame0 = new Image();
    frame0.src = `/frame/frame_00000.webp`;
    frame0.onload = () => {
      loadedImages[0] = frame0;
      globalImageCache[0] = frame0;
      loadedCount++;
      setImages([frame0]);

      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        const frameIndex = String(i).padStart(5, '0');
        img.src = `/frame/frame_${frameIndex}.webp`;

        img.onload = () => {
          loadedImages[i] = img;
          globalImageCache[i] = img;
          loadedCount++;
          const currentProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          setLoadProgress(currentProgress);

          if (loadedCount === TOTAL_FRAMES) {
            setImages([...loadedImages]);
            setImagesLoaded(true);
            isGlobalFullyLoaded = true;
          }
        };

        img.onerror = () => {
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            setImages([...loadedImages]);
            setImagesLoaded(true);
            isGlobalFullyLoaded = true;
          }
        };
      }
    };
  }, []);

  // Render Current Frame directly to Canvas with High-DPI & Retina Sharpness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = () => {
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentFrame.get()))
      );

      const activeImage = images[frameIdx] || globalImageCache[frameIdx] || images[0] || globalImageCache[0];
      if (!activeImage || !activeImage.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Object-cover Aspect Fill math
      const imgWidth = activeImage.naturalWidth || activeImage.width || 1920;
      const imgHeight = activeImage.naturalHeight || activeImage.height || 1080;
      const canvasRatio = displayWidth / displayHeight;
      const imgRatio = imgWidth / imgHeight;

      let drawWidth = displayWidth;
      let drawHeight = displayHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = displayWidth / imgRatio;
        offsetY = (displayHeight - drawHeight) / 2;
      } else {
        drawWidth = displayHeight * imgRatio;
        offsetX = (displayWidth - drawWidth) / 2;
      }

      ctx.drawImage(activeImage, offsetX, offsetY, drawWidth, drawHeight);
    };

    const unsubscribe = currentFrame.on('change', render);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 50);
    };
    window.addEventListener('resize', handleResize);

    render();

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [images, currentFrame]);

  const sloganText = settings?.hero_slogan || 'Wisata Air Panas Alami & Pelayanan Digital Desa';
  const subtitleText = settings?.hero_subtitle || 'Portal resmi Desa Mantikole, Kecamatan Dolo Barat, Kabupaten Sigi, Sulawesi Tengah.';

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-slate-950">
      
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Top Progress Bar */}
        {!imagesLoaded && loadProgress < 100 && (
          <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        )}

        {/* 60FPS Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Dim Gradient for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/70 pointer-events-none" />

        {/* Butter-Smooth Seamless Fade into Next Content Section (#f8fafc) */}
        <motion.div
          style={{ opacity: bottomFadeOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/70 to-slate-50 pointer-events-none z-10"
        />

        {/* Hero Title: MANTIKOLE */}
        <motion.div
          style={{
            opacity: heroTextOpacity,
            y: heroTextY,
            scale: heroTextScale,
            filter: heroTextBlur,
          }}
          className="relative z-20 max-w-6xl mx-auto px-6 text-center text-white space-y-4 pointer-events-none"
        >
          {/* Main Title */}
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
            MANTIKOLE
          </h1>

          {/* Slogan */}
          <p className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-slate-200 uppercase drop-shadow-lg">
            {sloganText}
          </p>

          {/* Sub Description */}
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-normal leading-relaxed drop-shadow-md">
            {subtitleText}
          </p>

          <div className="pt-8">
            <div className="inline-flex flex-col items-center text-xs text-slate-300 font-mono tracking-wider animate-bounce">
              <span>scroll ke bawah</span>
              <ChevronDown size={16} className="text-white mt-1" />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
