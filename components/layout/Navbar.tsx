'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon, MenuBarsIcon, WhatsAppIcon } from '@/components/ui/CulinaryIcons';
import { OUTLET_CONFIG } from '@/config/site';
import { checkOutletOpenStatus } from '@/lib/utils';

interface NavbarProps {
  mode?: 'landing' | 'order';
}

const LANDING_LINKS = [
  { href: '#ciri-khas', label: 'Ciri Khas' },
  { href: '#menu', label: 'Menu & Harga' },
  { href: '#lokasi', label: 'Lokasi Outlet' },
  { href: '#faq', label: 'FAQ' },
];

const ORDER_PAGE_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/#menu', label: 'Lihat Daftar Menu' },
  { href: '/#lokasi', label: 'Lokasi Outlet' },
];

function subscribeToMinuteTick(callback: () => void) {
  const intervalId = window.setInterval(callback, 60_000);
  return () => window.clearInterval(intervalId);
}

function getClientOpenSnapshot(): boolean {
  return checkOutletOpenStatus().isOpen;
}

function getServerOpenSnapshot(): boolean | null {
  return null;
}

export function Navbar({ mode = 'landing' }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isOutletOpen = useSyncExternalStore(
    subscribeToMinuteTick,
    getClientOpenSnapshot,
    getServerOpenSnapshot,
  );

  const navLinks = mode === 'order' ? ORDER_PAGE_LINKS : LANDING_LINKS;

  const openStatusLabel =
    isOutletOpen === null
      ? OUTLET_CONFIG.openingHoursText
      : isOutletOpen
        ? 'Buka Sekarang (10.00 - 21.00 WIB)'
        : 'Tutup (Buka 10.00 WIB)';

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <header id="top" className="sticky top-0 z-40 w-full">
      <div className="bg-amber-500 text-stone-100 px-3 sm:px-4 py-2 text-center text-[11px] sm:text-sm font-medium leading-snug">
        <span>{OUTLET_CONFIG.address}</span>
        <span className="mx-1.5 sm:mx-2 text-black">&bull;</span>
        <span className="hidden md:inline">{OUTLET_CONFIG.openingHoursText}</span>
        <span className="hidden md:inline mx-2 text-black">&bull;</span>
        <span>
          <span className="hidden sm:inline">Pesanan: </span>
          <span className="sm:hidden">WA: </span>
          <a
            href={`https://wa.me/${OUTLET_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline whitespace-nowrap"
          >
            {OUTLET_CONFIG.phoneDisplay}
          </a>
        </span>
      </div>

      <nav aria-label="Navigasi utama" className="bg-white border-b border-stone-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-16 py-2.5 sm:py-3.5 flex items-center justify-between gap-2.5 sm:gap-4">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 min-h-[44px] rounded-xl pr-1 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-stone-200 bg-white overflow-hidden shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:-rotate-6">
              <Image
                src="/images/logo.png"
                alt="Logo Ayam Cedepe BSD"
                fill
                sizes="44px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-base sm:text-xl font-extrabold text-red-700 group-hover:text-red-800 transition-colors tracking-tight whitespace-nowrap">
                {OUTLET_CONFIG.name}
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold text-stone-600 truncate">
                {OUTLET_CONFIG.address}
              </span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-7 shrink-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-semibold text-stone-700 hover:text-red-700 py-2 transition-colors whitespace-nowrap after:content-[''] after:absolute after:left-0 after:bottom-0.5 after:h-0.5 after:w-full after:bg-red-700 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span
              className={`hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                isOutletOpen === false
                  ? 'bg-stone-700 text-white'
                  : 'bg-emerald-700 text-white'
              }`}
            >
              {isOutletOpen !== false && (
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
              )}
              <span>
                {isOutletOpen === null
                  ? '10.00 - 21.00 WIB'
                  : isOutletOpen
                    ? 'Buka Sekarang'
                    : 'Sedang Tutup'}
              </span>
            </span>

            {mode === 'landing' ? (
              <Link
                href="/pesan"
                className="min-h-[44px] inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-xl bg-red-700 hover:bg-red-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-sm transition-[transform,background-color] duration-200 whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span className="sm:hidden">Pesan</span>
                <span className="hidden sm:inline">Pesan Sekarang</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="min-h-[44px] inline-flex items-center px-3.5 sm:px-4 py-2 rounded-xl bg-white hover:bg-stone-100 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-stone-900 text-xs sm:text-sm font-bold border-2 border-stone-200 transition-[transform,background-color] duration-200 whitespace-nowrap"
              >
                <span className="sm:hidden">Beranda</span>
                <span className="hidden sm:inline">Kembali ke Beranda</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl bg-white border border-stone-200 text-stone-800 hover:bg-stone-100 active:scale-95 cursor-pointer transition-[transform,background-color] duration-200"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="w-5 h-5" />
              ) : (
                <MenuBarsIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="lg:hidden overflow-hidden bg-white border-t border-stone-200"
            >
              <div className="px-4 py-4 space-y-3">
                <div className="px-3.5 py-2.5 rounded-xl bg-stone-100 text-xs font-semibold text-stone-800">
                  Jam Operasional: {openStatusLabel}
                </div>
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center min-h-[44px] px-4 rounded-xl bg-[#FAF8F5] hover:bg-stone-100 hover:translate-x-1 font-semibold text-stone-900 border border-stone-200 transition-[transform,background-color] duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
