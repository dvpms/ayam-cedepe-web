'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  InstagramIcon,
  MapPinIcon,
  WhatsAppIcon,
} from '@/components/ui/CulinaryIcons';
import { OUTLET_CONFIG } from '@/config/site';

function DotGridOrnament({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {[0, 1, 2, 3].map((col) =>
        [0, 1, 2].map((row) => (
          <circle
            key={`${col}-${row}`}
            cx={8 + col * 16}
            cy={8 + row * 16}
            r="3.2"
          />
        )),
      )}
    </svg>
  );
}

function StarburstOrnament({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 0L19.8 12.2L32 16L19.8 19.8L16 32L12.2 19.8L0 16L12.2 12.2L16 0Z" />
    </svg>
  );
}

const DISH_HIGHLIGHTS = [
  {
    id: 'ayam-bawang',
    featuredInList: true,
    number: '01',
    title: 'Ayam Ungkep Bawang',
    shortTag: 'Ayam Ungkep Bawang',
    description: 'Digoreng garing, bumbu meresap sampai ke dalam.',
    layerSrc: '/images/layer-ayam.png',
    transformOrigin: '28% 46%',
    popScale: 1.2,
    popX: -8,
    popY: -14,
    popRotate: -2,
    hitBoxClass: 'left-[10%] top-[16%] w-[34%] h-[58%] rounded-3xl',
    badgePosClass: 'left-[4%] top-[8%]',
    plateRotate: -3,
    plateScale: 1.01,
    redX: 16,
    redY: 12,
    goldX: -4,
    goldY: 4,
    goldScale: 1.01,
  },
  {
    id: 'kremesan-bawang',
    featuredInList: true,
    number: '02',
    title: 'Kremesan & Bawang Utuh',
    shortTag: 'Kremesan & Bawang Utuh',
    description: 'Taburan kremes renyah dan siung bawang goreng utuh.',
    layerSrc: '/images/layer-bawang.png',
    transformOrigin: '42% 53%',
    popScale: 1.24,
    popX: 4,
    popY: -16,
    popRotate: 2,
    hitBoxClass: 'left-[28%] top-[36%] w-[25%] h-[25%] rounded-3xl',
    badgePosClass: 'inset-x-0 mx-auto w-fit top-[6%]',
    plateRotate: 0,
    plateScale: 1.02,
    redX: 12,
    redY: 16,
    goldX: 0,
    goldY: -4,
    goldScale: 1.02,
  },
  {
    id: 'nasi-putih',
    featuredInList: false,
    number: null,
    title: 'Nasi Putih & Bawang Goreng',
    shortTag: 'Nasi Putih & Bawang Goreng',
    description: 'Nasi putih pulen hangat bertabur bawang goreng renyah.',
    layerSrc: '/images/layer-nasi.png',
    transformOrigin: '67% 34%',
    popScale: 1.2,
    popX: 10,
    popY: -12,
    popRotate: 2,
    hitBoxClass: 'left-[48%] top-[15%] w-[37%] h-[34%] rounded-full',
    badgePosClass: 'right-[4%] top-[8%]',
    plateRotate: 2,
    plateScale: 1.01,
    redX: 8,
    redY: 16,
    goldX: 4,
    goldY: -4,
    goldScale: 1.01,
  },
  {
    id: 'tahu-tempe-timun',
    featuredInList: false,
    number: null,
    title: 'Tahu, Tempe & Lalapan Timun',
    shortTag: 'Tahu, Tempe & Lalapan Timun',
    description: 'Tahu dan tempe goreng gurih dengan lalapan timun segar.',
    layerSrc: '/images/layer-pelengkap.png',
    transformOrigin: '74% 66%',
    popScale: 1.2,
    popX: 12,
    popY: -8,
    popRotate: 2,
    hitBoxClass: 'left-[55%] top-[44%] w-[38%] h-[45%] rounded-3xl',
    badgePosClass: 'right-[4%] bottom-[6%]',
    plateRotate: 3,
    plateScale: 1.01,
    redX: 6,
    redY: 16,
    goldX: 6,
    goldY: 4,
    goldScale: 1.01,
  },
  {
    id: 'sambal-ulek',
    featuredInList: true,
    number: '03',
    title: 'Sambal Bawang Ulek',
    shortTag: 'Sambal Bawang Ulek',
    description: 'Ulekan cabai rawit dan bawang segar yang pedas nagih.',
    layerSrc: '/images/layer-sambal.png',
    transformOrigin: '48% 77%',
    popScale: 1.26,
    popX: 0,
    popY: -16,
    popRotate: 0,
    hitBoxClass: 'left-[33%] top-[61%] w-[26%] h-[28%] rounded-full',
    badgePosClass: 'inset-x-0 mx-auto w-fit bottom-[4%]',
    plateRotate: 3,
    plateScale: 1.01,
    redX: 8,
    redY: 16,
    goldX: 4,
    goldY: 0,
    goldScale: 1.01,
  },
] as const;

const HERO_PACKAGES = [
  {
    id: 'paket-cedepe',
    name: 'Paket Cedepe',
    badge: null,
    items: 'Nasi Putih + Ayam Bawang + Sambal',
    price: 'Rp 20.000',
  },
  {
    id: 'paket-special',
    name: 'Paket Special',
    badge: 'LENGKAP',
    items: 'Nasi + Ayam + Kol Goreng + Tahu Tempe + Sambal',
    price: 'Rp 30.000',
  },
] as const;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 220, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  const handleStageMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleStageMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setActiveIndex(null);
  };

  const activeHighlight =
    activeIndex !== null ? DISH_HIGHLIGHTS[activeIndex] : null;

  return (
    <section
      id="hero"
      className="bg-[#FAF8F5] border-b border-stone-200 py-6 sm:py-8 lg:py-4 lg:min-h-[calc(100svh-6.75rem)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.08 }}
          className="text-center max-w-3xl mx-auto mb-3 lg:mb-4"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-extrabold tracking-tight text-stone-900 leading-[1.08]">
            Jagonya{' '}
            <span className="text-red-700">Ayam Goreng Bawang</span>{' '}
            Special di BSD City.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.14 }}
            className="lg:col-span-3 order-3 lg:order-1 flex flex-col lg:items-end lg:text-right"
          >
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-red-700 mb-2">
              Keistimewaan Sajian
            </span>

            <div className="w-full divide-y divide-stone-300 border-y border-stone-300 mb-4">
              {DISH_HIGHLIGHTS.map((item, idx) => {
                if (!item.featuredInList) return null;
                const isActive = activeIndex === idx;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() =>
                      setActiveIndex((prev) => (prev === idx ? null : idx))
                    }
                    animate={{ x: isActive ? -6 : 0 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 24 }}
                    aria-pressed={isActive}
                    className="w-full text-left lg:text-right py-3 cursor-pointer"
                  >
                    <div className="flex items-start lg:flex-row-reverse gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-lg text-[11px] font-extrabold flex items-center justify-center shrink-0 border transition-colors duration-200 ${
                          isActive
                            ? 'bg-red-700 text-white border-stone-900'
                            : 'bg-stone-200 text-stone-700 border-stone-300'
                        }`}
                      >
                        {item.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span
                          className={`block text-sm sm:text-base font-extrabold transition-colors duration-200 ${
                            isActive ? 'text-red-700' : 'text-stone-900'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="block text-xs text-stone-600 leading-relaxed mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center lg:justify-end gap-4 text-xs font-semibold text-stone-700">
              <a
                href={OUTLET_CONFIG.googleMapsShortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-red-700 transition-colors"
              >
                <MapPinIcon className="w-4 h-4 text-red-700 shrink-0" />
                <span>{OUTLET_CONFIG.address}</span>
              </a>
              <a
                href={OUTLET_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-red-700 transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-red-700 shrink-0" />
                <span>{OUTLET_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.1 }}
            className="lg:col-span-6 order-1 lg:order-2 flex items-center justify-center"
          >
            <div
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              className="animate-float-3d relative w-full max-w-[330px] sm:max-w-[420px] lg:max-w-[470px] xl:max-w-[500px] aspect-square flex items-center justify-center mx-auto"
            >
              <div
                aria-hidden="true"
                className="absolute inset-4 sm:inset-6 rounded-full border-2 border-amber-500 animate-pulse-ring pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute inset-1 sm:inset-2 rounded-full border-2 border-dashed border-amber-500 animate-orbit-spin pointer-events-none"
              />
              <motion.div
                aria-hidden="true"
                animate={{
                  x: activeHighlight ? activeHighlight.redX : 12,
                  y: activeHighlight ? activeHighlight.redY : 14,
                  scale: 1,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="absolute w-[84%] h-[84%] rounded-full bg-red-700 pointer-events-none"
              />
              <motion.div
                aria-hidden="true"
                animate={{
                  x: activeHighlight ? activeHighlight.goldX : 0,
                  y: activeHighlight ? activeHighlight.goldY : 0,
                  scale: activeHighlight ? activeHighlight.goldScale : 1,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="absolute w-[84%] h-[84%] rounded-full bg-amber-400 border-2 border-stone-900 pointer-events-none"
              />

              <DotGridOrnament className="w-14 h-10 text-red-700 absolute top-0 left-3 pointer-events-none" />
              <DotGridOrnament className="w-14 h-10 text-stone-900 absolute bottom-2 right-3 pointer-events-none" />
              <StarburstOrnament className="w-6 h-6 text-red-700 absolute top-3 right-8 animate-star-twinkle pointer-events-none" />
              <StarburstOrnament className="w-6 h-6 text-amber-500 absolute bottom-8 left-3 animate-star-twinkle-delayed pointer-events-none" />

              <motion.div
                style={{ rotateX, rotateY, transformPerspective: 900 }}
                animate={{
                  rotate: activeHighlight ? activeHighlight.plateRotate : 0,
                  scale: activeHighlight ? activeHighlight.plateScale : 1,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="relative z-10 w-[94%] h-[94%] flex items-center justify-center"
              >
                <Image
                  src="/images/ayam-goreng-bawang-plate.png"
                  alt="Sajian Ayam Goreng Bawang Special Ayam Cedepe lengkap dengan kremesan, bawang utuh goreng, tahu, tempe, dan sambal bawang"
                  fill
                  sizes="(max-width: 1024px) 85vw, 500px"
                  className={`object-contain scale-[0.97] transition-[filter] duration-300 drop-shadow-[0_24px_32px_rgba(28,25,23,0.3)] ${
                    activeHighlight ? 'brightness-[0.82]' : 'brightness-95'
                  }`}
                  priority
                />

                {DISH_HIGHLIGHTS.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <motion.div
                      key={item.id}
                      aria-hidden="true"
                      style={{ transformOrigin: item.transformOrigin }}
                      animate={{
                        scale: isActive ? item.popScale : activeHighlight ? 0.98 : 1,
                        x: isActive ? item.popX : 0,
                        y: isActive ? item.popY : 0,
                        rotate: isActive ? item.popRotate : 0,
                        opacity: isActive ? 1 : activeHighlight ? 0.85 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                      className={`absolute inset-0 pointer-events-none transition-[filter] duration-300 ${
                        isActive
                          ? 'z-20 brightness-105 drop-shadow-[0_28px_24px_rgba(28,25,23,0.6)]'
                          : activeHighlight !== null
                            ? 'z-10 brightness-90 drop-shadow-[0_6px_10px_rgba(28,25,23,0.2)]'
                            : 'z-10 brightness-100 drop-shadow-[0_14px_18px_rgba(28,25,23,0.34)]'
                      }`}
                    >
                      <div
                        style={{
                          transformOrigin: item.transformOrigin,
                          animationDelay: isActive ? '0ms' : `${idx * 350}ms`,
                        }}
                        className={`absolute inset-0 ${isActive ? 'animate-dish-active-bob' : 'animate-dish-wave'}`}
                      >
                        <Image
                          src={item.layerSrc}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 85vw, 500px"
                          className="object-contain"
                        />
                      </div>
                    </motion.div>
                  );
                })}

                {DISH_HIGHLIGHTS.map((item, idx) => (
                  <button
                    key={`hit-${item.id}`}
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() =>
                      setActiveIndex((prev) => (prev === idx ? null : idx))
                    }
                    aria-label={`Sorot ${item.title}`}
                    className={`absolute ${item.hitBoxClass} z-30 cursor-pointer bg-transparent focus-visible:outline-red-700`}
                  />
                ))}
              </motion.div>

              <AnimatePresence mode="wait">
                {activeHighlight && (
                  <motion.div
                    key={activeHighlight.id}
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 10, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                    className={`pointer-events-none absolute ${activeHighlight.badgePosClass} z-30 bg-stone-900 text-white border-2 border-amber-400 rounded-xl px-3 py-1 text-xs font-extrabold whitespace-nowrap shadow-md flex items-center gap-2`}
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                    </span>
                    <span>{activeHighlight.shortTag}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.18 }}
            className="lg:col-span-3 order-2 lg:order-3 flex flex-col items-start"
          >
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-red-700 mb-2">
              Pilihan Paket
            </span>

            <div className="w-full divide-y divide-stone-300 border-y border-stone-300 mb-5">
              {HERO_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group py-3.5 flex items-baseline justify-between gap-3 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hover:translate-x-1"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-extrabold text-stone-900 group-hover:text-red-700 transition-colors duration-200">
                        {pkg.name}
                      </span>
                      {pkg.badge && (
                        <span className="inline-block bg-red-700 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <span className="block text-xs text-stone-600 mt-0.5 leading-snug">
                      {pkg.items}
                    </span>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-red-700 whitespace-nowrap shrink-0">
                    {pkg.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <Link
                href="/pesan"
                className="animate-cta-attention min-h-[48px] w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.97] transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                <span>Pesan Sekarang</span>
              </Link>
              <a
                href="#menu"
                className="min-h-[48px] w-full inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white hover:bg-red-700 text-red-700 hover:text-white font-bold text-sm border-2 border-red-700 hover:-translate-y-0.5 active:scale-[0.97] transition-[transform,background-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                Lihat Menu &amp; Harga
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
