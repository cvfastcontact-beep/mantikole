'use client';

import React from 'react';

interface AiDotMatrixIconProps {
  className?: string;
  isSpinning?: boolean;
}

export default function AiDotMatrixIcon({
  className = 'w-4 h-4',
  isSpinning = false,
}: AiDotMatrixIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} ${isSpinning ? 'animate-spin' : ''}`}
    >
      {/* Outer ring of dots */}
      <circle cx="12" cy="3" r="1.75" opacity="0.9" />
      <circle cx="18.36" cy="5.64" r="1.75" opacity="0.8" />
      <circle cx="21" cy="12" r="1.75" opacity="0.7" />
      <circle cx="18.36" cy="18.36" r="1.75" opacity="0.6" />
      <circle cx="12" cy="21" r="1.75" opacity="0.5" />
      <circle cx="5.64" cy="18.36" r="1.75" opacity="0.4" />
      <circle cx="3" cy="12" r="1.75" opacity="0.3" />
      <circle cx="5.64" cy="5.64" r="1.75" opacity="0.6" />
      {/* Inner dots */}
      <circle cx="12" cy="8" r="1.5" opacity="0.85" />
      <circle cx="15" cy="12" r="1.5" opacity="0.75" />
      <circle cx="12" cy="16" r="1.5" opacity="0.65" />
      <circle cx="9" cy="12" r="1.5" opacity="0.75" />
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" opacity="1" />
    </svg>
  );
}
