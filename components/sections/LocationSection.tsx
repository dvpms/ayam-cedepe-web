'use client';

import { useState } from 'react';
import { CopyIcon, InstagramIcon, MapPinIcon, WhatsAppIcon } from '@/components/ui/CulinaryIcons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { OUTLET_CONFIG } from '@/config/site';
import { showSolidToast } from '@/lib/alerts';

export function LocationSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleCopyAddress = async () => {
    const fullAddress = `${OUTLET_CONFIG.branchName}, ${OUTLET_CONFIG.address}, ${OUTLET_CONFIG.city}, ${OUTLET_CONFIG.province} ${OUTLET_CONFIG.postalCode}`;
    try {
      await navigator.clipboard.writeText(fullAddress);
      showSolidToast('Alamat Ayam Cedepe BSD berhasil disalin!', 'success');
    } catch {
      showSolidToast('Salin manual: Ruko YC HUB, BSD City', 'info');
    }
  };

  return (
    <section id="lokasi" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <ScrollReveal variant="fade-left" className="lg:col-span-5 flex">
            <div className="w-full bg-[#FAF8F5] border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="inline-block animate-badge-float bg-stone-900 text-amber-400 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3">
                  KUNJUNGI OUTLET KAMI
                </span>
                <h2 className="text-3xl font-extrabold text-stone-900 mb-5">
                  {OUTLET_CONFIG.branchName}
                </h2>

                <dl className="space-y-4 text-sm sm:text-base">
                  <div className="bg-white border border-stone-200 hover:border-red-700 rounded-2xl p-4 hover:-translate-y-0.5 transition-[transform,border-color] duration-200">
                    <dt className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">
                      Alamat Outlet
                    </dt>
                    <dd className="font-bold text-stone-900 leading-snug">
                      {OUTLET_CONFIG.address}, {OUTLET_CONFIG.city}, {OUTLET_CONFIG.province}{' '}
                      {OUTLET_CONFIG.postalCode}
                    </dd>
                  </div>

                  <div className="bg-white border border-stone-200 hover:border-red-700 rounded-2xl p-4 hover:-translate-y-0.5 transition-[transform,border-color] duration-200">
                    <dt className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">
                      Jam Operasional
                    </dt>
                    <dd className="font-bold text-stone-900">{OUTLET_CONFIG.openingHoursText}</dd>
                  </div>

                  <div className="bg-white border border-stone-200 hover:border-red-700 rounded-2xl p-4 hover:-translate-y-0.5 transition-[transform,border-color] duration-200">
                    <dt className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">
                      Pemesanan &amp; Media Sosial
                    </dt>
                    <dd className="flex flex-wrap gap-4 mt-2">
                      <a
                        href={`https://wa.me/${OUTLET_CONFIG.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:underline"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>{OUTLET_CONFIG.phoneDisplay}</span>
                      </a>
                      <a
                        href={OUTLET_CONFIG.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-red-700 hover:underline"
                      >
                        <InstagramIcon className="w-4 h-4" />
                        <span>{OUTLET_CONFIG.instagramHandle}</span>
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <a
                  href={OUTLET_CONFIG.googleMapsShortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-700 hover:bg-red-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-bold text-sm transition-[transform,background-color] duration-200"
                >
                  <MapPinIcon className="w-4 h-4 shrink-0" />
                  <span>Buka Google Maps</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-stone-100 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-stone-900 font-bold text-sm border-2 border-stone-200 cursor-pointer transition-[transform,background-color] duration-200"
                >
                  <CopyIcon className="w-4 h-4 shrink-0" />
                  <span>Salin Alamat</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delayMs={120} className="lg:col-span-7 flex flex-col">
            <div className="relative flex-1 min-h-[340px] sm:min-h-[420px] bg-stone-100 border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
              {!isMapLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5]">
                  <p className="text-lg font-bold text-stone-900 mb-1.5">
                    Memuat Peta Lokasi Ayam Cedepe BSD...
                  </p>
                  <p className="text-xs font-medium text-stone-600 mb-4">
                    {OUTLET_CONFIG.address}
                  </p>
                  <a
                    href={OUTLET_CONFIG.googleMapsShortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-xl bg-red-700 text-white text-xs font-bold"
                  >
                    Buka Langsung di Google Maps
                  </a>
                </div>
              )}
              <iframe
                title="Peta Lokasi Ayam Cedepe BSD di Ruko YC HUB"
                src={OUTLET_CONFIG.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsMapLoaded(true)}
                className="relative z-10 w-full h-full min-h-[340px] sm:min-h-[420px] border-0"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
