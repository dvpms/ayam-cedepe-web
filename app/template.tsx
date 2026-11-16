'use client';

import { motion, MotionConfig } from 'framer-motion';
import { OUTLET_CONFIG } from '@/config/site';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="never">
      <motion.div
        aria-hidden="true"
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.58, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 pointer-events-none bg-amber-400"
      />
      <motion.div
        aria-hidden="true"
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 pointer-events-none bg-red-700 flex items-center justify-center"
      >
        <span className="bg-amber-400 text-stone-950 border-2 border-stone-900 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase">
          {OUTLET_CONFIG.name}
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0.12 }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
