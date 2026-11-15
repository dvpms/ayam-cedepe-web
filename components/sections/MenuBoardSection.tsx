'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChiliFlameIcon, SearchIcon, WhatsAppIcon } from '@/components/ui/CulinaryIcons';
import { ImageModal } from '@/components/ui/ImageModal';
import { MENU_CATEGORIES, MENU_ITEMS } from '@/config/site';
import { formatRupiah } from '@/lib/utils';

export function MenuBoardSection() {
  const [selectedCategory, setSelectedCategory] = useState<'semua' | 'lauk' | 'sambal' | 'pelengkap'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const packageMenus = MENU_ITEMS.filter((item) => item.isPackage);
  const addOnMenus = MENU_ITEMS.filter((item) => !item.isPackage);

  const filteredAddOns = addOnMenus.filter((item) => {
    const matchCategory = selectedCategory === 'semua' || item.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-red-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full mb-3">
              MENU &amp; HARGA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Pilihan Paket &amp; Menu Ayam Cedepe
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsBrochureOpen(true)}
            className="min-h-[44px] self-start md:self-auto px-5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm border-2 border-stone-200 transition-colors cursor-pointer"
          >
            Lihat Brosur Menu
          </button>
        </div>

        {/* 2 Kartu Paket Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {packageMenus.map((pkg) => {
            const isSpecial = pkg.id === 'paket-special';
            return (
              <article
                key={pkg.id}
                className={`rounded-3xl border p-6 sm:p-7 flex flex-col justify-between shadow-sm ${
                  isSpecial
                    ? 'bg-white border-2 border-red-700'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      {pkg.badge && (
                        <span
                          className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2.5 ${
                            isSpecial
                              ? 'bg-red-700 text-white'
                              : 'bg-stone-900 text-amber-400'
                          }`}
                        >
                          {pkg.badge}
                        </span>
                      )}
                      <h3 className="text-2xl font-extrabold text-stone-900">{pkg.name}</h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-red-700">
                        {pkg.priceLabel}
                      </span>
                      <span className="block font-mono text-xs text-stone-500">
                        {formatRupiah(pkg.price)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-stone-600 mb-5 leading-relaxed">
                    {pkg.description}
                  </p>

                  {pkg.inclusions && (
                    <ul className="space-y-2 mb-6 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-4">
                      {pkg.inclusions.map((inc) => (
                        <li
                          key={inc}
                          className="text-sm font-semibold text-stone-800 flex items-center gap-2.5"
                        >
                          <span
                            className="w-2 h-2 rounded-full bg-red-700 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link
                  href={`/pesan?menu=${pkg.id}`}
                  className="min-h-[48px] w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm sm:text-base transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>Pesan {pkg.name}</span>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Katalog Menu Tambahan & Sambal */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200">
            <div>
              <h3 className="text-2xl font-extrabold text-stone-900">
                Menu Tambahan &amp; Sambal Bawang
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Lauk pelengkap dan sambal ulek segar yang dapat dipesan satuan.
              </p>
            </div>

            <div className="relative">
              <SearchIcon className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kulit, sambal pete, tahu..."
                aria-label="Cari menu tambahan"
                className="w-full sm:w-68 min-h-[44px] pl-10 pr-4 rounded-xl bg-white border-2 border-stone-200 focus:border-red-700 text-sm font-medium text-stone-900 placeholder:text-stone-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter kategori menu tambahan">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-[#FAF8F5] text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {filteredAddOns.length === 0 ? (
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-8 text-center">
              <p className="text-lg font-bold text-stone-900 mb-1.5">
                Menu &ldquo;{searchQuery}&rdquo; tidak ditemukan
              </p>
              <p className="text-sm text-stone-600 mb-4">
                Coba kata kunci lain seperti ayam, kulit, tahu, tempe, atau sambal pete.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('semua');
                }}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm cursor-pointer transition-colors"
              >
                Tampilkan Semua Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 divide-y divide-stone-200">
                {filteredAddOns.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-stone-900">{item.name}</h4>
                        {item.badge && (
                          <span className="bg-red-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {Boolean(item.spicyLevel && item.spicyLevel > 0) && (
                          <span
                            className="inline-flex items-center gap-1 bg-amber-400 text-stone-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                            title="Pedas"
                          >
                            <ChiliFlameIcon className="w-3 h-3 text-red-700" />
                            <span>Pedas</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="block font-mono text-base font-bold text-red-700">
                          {formatRupiah(item.price)}
                        </span>
                      </div>
                      <Link
                        href={`/pesan?menu=${item.id}`}
                        className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-xl bg-white hover:bg-red-700 text-red-700 hover:text-white border-2 border-red-700 text-xs font-bold transition-colors"
                      >
                        Pesan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="lg:col-span-4 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-4">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-stone-200 bg-white mb-3.5">
                  <Image
                    src="/images/brosur-menu.png"
                    alt="Brosur daftar menu Ayam Cedepe lengkap dengan foto tahu tempe goreng dan kulit goreng bawang"
                    fill
                    sizes="(max-width: 1024px) 100vw, 28vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-xs font-semibold text-stone-700 mb-3">
                  Daftar menu dan harga outlet Ayam Cedepe BSD.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBrochureOpen(true)}
                    className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 text-xs font-bold cursor-pointer transition-colors"
                  >
                    Perbesar Brosur Menu
                  </button>
                  <Link
                    href="/pesan"
                    className="w-full min-h-[44px] inline-flex items-center justify-center px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-colors"
                  >
                    Buat Pesanan Sekarang
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>

      <ImageModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        imageSrc="/images/brosur-menu.png"
        imageAlt="Brosur menu Ayam Cedepe BSD dengan harga lengkap 2K sampai 30K"
        title="Brosur Menu Ayam Cedepe BSD"
      />
    </section>
  );
}
