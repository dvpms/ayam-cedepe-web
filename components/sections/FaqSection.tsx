'use client';

import { useState } from 'react';
import { ChevronDownIcon, WhatsAppIcon } from '@/components/ui/CulinaryIcons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FAQ_ITEMS, OUTLET_CONFIG } from '@/config/site';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <ScrollReveal variant="fade-left" className="lg:col-span-4 lg:sticky lg:top-28">
          <span className="inline-block animate-badge-float bg-amber-400 text-stone-950 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3">
            INFORMASI PELANGGAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mb-6 leading-relaxed">
            Informasi lengkap seputar paket menu, sambal bawang pete, pemesanan nasi box, dan lokasi
            outlet kami di Ruko YC HUB, BSD City.
          </p>
          <a
            href={`https://wa.me/${OUTLET_CONFIG.whatsappNumber}?text=${encodeURIComponent('Halo Ayam Cedepe BSD, saya ingin bertanya tentang menu dan pemesanan.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white font-bold text-sm transition-[transform,background-color] duration-200"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Tanya Admin di WhatsApp</span>
          </a>
        </ScrollReveal>

        <div className="lg:col-span-8 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <ScrollReveal key={item.id} variant="fade-up" delayMs={idx * 75}>
                <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-200">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`answer-${item.id}`}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full min-h-[56px] px-5 py-4 text-left flex items-center justify-between gap-4 text-base sm:text-lg font-bold transition-colors duration-200 cursor-pointer ${
                        isOpen ? 'bg-red-700 text-white' : 'bg-white text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      <span>{item.question}</span>
                      <ChevronDownIcon
                        className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`answer-${item.id}`}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 py-4 border-t border-stone-200 bg-white text-sm sm:text-base text-stone-700 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
