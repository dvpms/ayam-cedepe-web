'use client';

import Image from 'next/image';
import { motion, MotionConfig } from 'framer-motion';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="never">
      <motion.div
        aria-hidden="true"
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.62, delay: 1.72, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 pointer-events-none bg-amber-400"
      />
      <motion.div
        aria-hidden="true"
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.55, delay: 1.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 pointer-events-none bg-red-700 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.72, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.08 }}
          className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-white border-4 border-amber-400 shadow-xl overflow-hidden"
        >
          <Image
            src="/images/logo.png"
            alt="Logo Ayam Cedepe BSD"
            fill
            sizes="(max-width: 640px) 176px, 224px"
            className="object-contain p-3"
            priority
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 1.8 }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
