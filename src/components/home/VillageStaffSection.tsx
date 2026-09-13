'use client';

import React, { useState, useEffect } from 'react';
import ScatteredScroll from '../ui/scattered-scroll';
import { fetchApi } from '../../lib/api';

export default function VillageStaffSection() {
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    async function loadStaff() {
      try {
        const res = await fetchApi<{ success: boolean; data: any[] }>('/staff');
        if (res.success && res.data.length > 0) {
          const mapped = res.data.map((st) => ({
            name: st.name,
            role: st.role,
            desc: st.description || st.desc,
            image: st.image_url,
          }));
          setStaff(mapped);
        }
      } catch (err) {
        console.error('Fetch staff error:', err);
      }
    }
    loadStaff();
  }, []);

  if (staff.length === 0) return null;

  return (
    <>
      <div className="h-screen text-2xl sm:text-3xl tracking-tight font-extrabold text-neutral-900 flex flex-col items-center justify-center space-y-2">
        <span>Struktur Pemerintahan Desa</span>
        <span className="text-xs font-medium text-neutral-500">Perangkat & Aparatur Desa Mantikole</span>
      </div>

      <ScatteredScroll overlap={320} scrollDistance={350}>
        {staff.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {item.image && (
              <img
                className="w-[30vw] aspect-[5/7] object-cover rounded-2xl border border-neutral-200 shadow-md"
                src={item.image}
                alt={item.name}
                width={300}
                height={420}
              />
            )}
            <div className="mt-3 text-center">
              <div className="font-extrabold text-sm text-neutral-900">{item.name}</div>
              <div className="text-xs font-semibold text-neutral-500">{item.role}</div>
            </div>
          </div>
        ))}
      </ScatteredScroll>

      <div className="h-40"></div>
    </>
  );
}
