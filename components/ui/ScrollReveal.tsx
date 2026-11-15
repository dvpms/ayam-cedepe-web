'use client';

import { useEffect, useRef, useState } from 'react';

type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  className?: string;
}

const HIDDEN_CLASSES: Record<RevealVariant, string> = {
  'fade-up': 'opacity-0 translate-y-6',
  'fade-left': 'opacity-0 -translate-x-6',
  'fade-right': 'opacity-0 translate-x-6',
  'zoom-in': 'opacity-0 scale-95',
};

const VISIBLE_CLASSES: Record<RevealVariant, string> = {
  'fade-up': 'opacity-100 translate-y-0',
  'fade-left': 'opacity-100 translate-x-0',
  'fade-right': 'opacity-100 translate-x-0',
  'zoom-in': 'opacity-100 scale-100',
};

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delayMs = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? VISIBLE_CLASSES[variant] : HIDDEN_CLASSES[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
