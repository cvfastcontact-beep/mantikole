'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
}

export default function BlurFade({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  blur = '8px',
}: BlurFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: `blur(${blur})`, y: yOffset }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
