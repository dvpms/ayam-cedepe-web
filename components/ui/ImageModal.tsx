'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { CloseIcon } from '@/components/ui/CulinaryIcons';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
}

export function ImageModal({ isOpen, onClose, imageSrc, imageAlt, title }: ImageModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-4"
      onClick={onClose}
    >
      <div
        className="animate-modal-pop relative w-full max-w-2xl bg-white border-2 border-stone-200 rounded-3xl p-4 sm:p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-3.5 mb-4 border-b border-stone-200">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau gambar"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl bg-red-700 hover:bg-red-800 text-white transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="relative w-full max-h-[75vh] overflow-auto rounded-2xl border border-stone-200 bg-stone-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={900}
            height={1100}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
