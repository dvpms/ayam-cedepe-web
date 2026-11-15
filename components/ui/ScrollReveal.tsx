'use client';

import { motion, type TargetAndTransition } from 'framer-motion';

type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  className?: string;
}

const INITIAL_STATES: Record<RevealVariant, TargetAndTransition> = {
  'fade-up': { opacity: 0, y: 28 },
  'fade-left': { opacity: 0, x: -28 },
  'fade-right': { opacity: 0, x: 28 },
  'zoom-in': { opacity: 0, scale: 0.94 },
};

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delayMs = 0,
  className = '',
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={INITIAL_STATES[variant]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -36px 0px' }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
        delay: delayMs / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
