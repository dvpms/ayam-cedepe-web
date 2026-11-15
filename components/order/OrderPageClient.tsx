'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ChiliFlameIcon,
  MinusIcon,
  PlusIcon,
  ReceiptIcon,
  SearchIcon,
  WhatsAppIcon,
} from '@/components/ui/CulinaryIcons';
import { MENU_CATEGORIES, MENU_ITEMS, ORDER_PRESETS, OUTLET_CONFIG } from '@/config/site';
import { confirmResetOrder, confirmWhatsAppOrder, showSolidToast } from '@/lib/alerts';
import { formatRupiah } from '@/lib/utils';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
  calculateOrderTotal,
  type SelectedOrderLine,
} from '@/lib/whatsapp';
import type { OrderType } from '@/types/menu';

const ORDER_TYPES: OrderType[] = [
  'Makan di Tempat (Dine-in)',
  'Bungkus / Ambil Sendiri',
  'Pesan Antar (Ojek Online)',
];

function buildInitialQuantities(preselectedMenuId: string | null): Record<string, number> {
  if (!preselectedMenuId) return {};
  const exists = MENU_ITEMS.some((item) => item.id === preselectedMenuId);
  return exists ? { [preselectedMenuId]: 1 } : {};
}

function buildOrderPreviewHtml(
  lines: SelectedOrderLine[],
  customerName: string,
  orderType: OrderType,
  total: number,
): string {
  const rows = lines
    .map(
      (line) =>
        `<div class="flex justify-between py-1 border-b border-stone-200"><span>${line.item.name} x${line.quantity}</span><span>${formatRupiah(line.item.price * line.quantity)}</span></div>`,
    )
    .join('');

  return `
    <div class="text-left text-sm text-stone-800">
      <p class="mb-2 font-bold">Pemesan: ${customerName} (${orderType})</p>
      <div class="p-3.5 bg-[#FAF8F5] border border-stone-200 rounded-xl font-mono text-xs">
        ${rows}
        <div class="flex justify-between pt-2.5 mt-1.5 font-extrabold text-sm text-red-700">
          <span>TOTAL ESTIMASI</span>
          <span>${formatRupiah(total)}</span>
        </div>
      </div>
    </div>
  `;
}

export function OrderPageClient() {
  const searchParams = useSearchParams();
  const initialMenuParam = searchParams.get('menu');

  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    buildInitialQuantities(initialMenuParam),
  );
  const [selectedCategory, setSelectedCategory] = useState<'semua' | 'lauk' | 'sambal' | 'pelengkap'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('Bungkus / Ambil Sendiri');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incrementMenu = (menuId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [menuId]: (prev[menuId] ?? 0) + 1,
    }));
  };

  const decrementMenu = (menuId: string) => {
    setQuantities((prev) => {
      const current = prev[menuId] ?? 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[menuId];
        return next;
      }
      return { ...prev, [menuId]: current - 1 };
    });
  };

  const applyPreset = (items: { menuId: string; quantity: number }[], label: string) => {
    const nextState: Record<string, number> = {};
    for (const item of items) {
      nextState[item.menuId] = item.quantity;
    }
    setQuantities(nextState);
    setErrorMessage(null);
    showSolidToast(`Paket "${label}" dipilih`, 'info');
  };

  const clearOrder = () => {
    confirmResetOrder(() => {
      setQuantities({});
      showSolidToast('Daftar pesanan dikosongkan', 'info');
    });
  };

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

  const selectedLines: SelectedOrderLine[] = MENU_ITEMS.filter(
    (item) => (quantities[item.id] ?? 0) > 0,
  ).map((item) => ({ item, quantity: quantities[item.id] ?? 0 }));

  const totalItems = selectedLines.reduce((sum, line) => sum + line.quantity, 0);
  const totalAmount = calculateOrderTotal(selectedLines);

  const handleSubmitOrder = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (selectedLines.length === 0) {
      setErrorMessage('Belum ada menu yang dipilih. Pilih minimal 1 menu sebelum mengirim ke WhatsApp.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Mohon isi nama pemesan agar admin outlet mudah memproses pesanan Anda.');
      return;
    }

    setIsSubmitting(true);
    const waMessage = buildWhatsAppOrderMessage(selectedLines, customerName, orderType, notes);
    const waUrl = buildWhatsAppUrl(OUTLET_CONFIG.whatsappNumber, waMessage);
    const previewHtml = buildOrderPreviewHtml(selectedLines, customerName.trim(), orderType, totalAmount);

    setTimeout(() => {
      setIsSubmitting(false);
      confirmWhatsAppOrder(previewHtml, () => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        showSolidToast('Membuka WhatsApp Ayam Cedepe BSD...', 'success');
      });
    }, 150);
  };

  return (
    <div className="pb-28 lg:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Pilihan Paket Cepat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {ORDER_PRESETS.map((preset, idx) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.items, preset.label)}
              style={{ animationDelay: `${idx * 70}ms` }}
              className="animate-hero-fade-up min-h-[56px] text-left bg-white hover:bg-amber-400 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-stone-900 border border-stone-200 hover:border-amber-500 rounded-2xl p-4 shadow-xs hover:shadow-md cursor-pointer transition-[transform,background-color,border-color,box-shadow] duration-200"
            >
              <span className="block text-sm font-bold text-stone-900">{preset.label}</span>
              <span className="block text-xs font-medium text-stone-600 mt-0.5">
                {preset.subtitle}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Pemilihan Menu */}
          <div className="lg:col-span-7 space-y-8">
            {/* Paket Utama */}
            <section aria-labelledby="heading-paket-order">
              <h2 id="heading-paket-order" className="text-xl font-extrabold text-stone-900 mb-4">
                1. Pilih Menu Paket
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packageMenus.map((pkg, idx) => {
                  const qty = quantities[pkg.id] ?? 0;
                  return (
                    <div
                      key={pkg.id}
                      style={{ animationDelay: `${140 + idx * 80}ms` }}
                      className={`animate-hero-fade-up bg-white rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-200 border ${
                        qty > 0 ? 'border-2 border-red-700' : 'border-stone-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg font-extrabold text-stone-900">{pkg.name}</h3>
                          <span className="font-mono text-base font-extrabold text-red-700 shrink-0">
                            {pkg.priceLabel}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                          {pkg.inclusions?.join(' + ')}
                        </p>
                      </div>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => incrementMenu(pkg.id)}
                          className="min-h-[44px] w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 active:scale-[0.97] text-white text-sm font-bold cursor-pointer transition-[transform,background-color] duration-150"
                        >
                          <PlusIcon className="w-4 h-4" />
                          <span>Tambah Paket</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-between gap-2 bg-[#FAF8F5] border border-stone-200 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => decrementMenu(pkg.id)}
                            aria-label={`Kurangi ${pkg.name}`}
                            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg bg-stone-900 hover:bg-red-700 active:scale-90 text-white cursor-pointer transition-[transform,background-color] duration-150"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span
                            key={qty}
                            className="animate-number-bump font-mono text-sm font-bold text-stone-900 tabular-nums"
                          >
                            {qty} porsi
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementMenu(pkg.id)}
                            aria-label={`Tambah ${pkg.name}`}
                            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg bg-red-700 hover:bg-red-800 active:scale-90 text-white cursor-pointer transition-[transform,background-color] duration-150"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Menu Tambahan */}
            <section
              aria-labelledby="heading-tambahan-order"
              style={{ animationDelay: '220ms' }}
              className="animate-hero-fade-up bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 id="heading-tambahan-order" className="text-xl font-extrabold text-stone-900">
                  2. Menu Tambahan &amp; Sambal
                </h2>
                <div className="relative">
                  <SearchIcon className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari menu..."
                    aria-label="Cari menu tambahan"
                    className="w-full sm:w-56 min-h-[44px] pl-9 pr-3 rounded-xl bg-white border-2 border-stone-200 focus:border-red-700 text-sm text-stone-900 placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Filter kategori menu">
                {MENU_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      aria-pressed={isActive}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold border hover:-translate-y-0.5 active:scale-95 transition-[transform,background-color,border-color] duration-200 cursor-pointer ${
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
                <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 text-center animate-hero-fade-up">
                  <p className="font-bold text-stone-900 mb-1">
                    Menu &ldquo;{searchQuery}&rdquo; tidak ditemukan
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('semua');
                    }}
                    className="mt-2 min-h-[44px] px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 active:scale-95 text-white text-xs font-bold cursor-pointer transition-[transform,background-color] duration-150"
                  >
                    Tampilkan Semua Menu
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-stone-200">
                  {filteredAddOns.map((item, idx) => {
                    const qty = quantities[item.id] ?? 0;
                    return (
                      <div
                        key={`${selectedCategory}-${item.id}`}
                        style={{ animationDelay: `${idx * 40}ms` }}
                        className="animate-hero-fade-up py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm sm:text-base font-bold text-stone-900">
                              {item.name}
                            </span>
                            {Boolean(item.spicyLevel && item.spicyLevel > 0) && (
                              <span className="inline-flex items-center gap-1 bg-amber-400 text-stone-950 text-[11px] font-bold px-2 py-0.5 rounded-full">
                                <ChiliFlameIcon className="w-3 h-3 text-red-700 animate-chili-wiggle" />
                                <span>Pedas</span>
                              </span>
                            )}
                          </div>
                          <span className="block font-mono text-xs font-bold text-red-700 mt-0.5">
                            {formatRupiah(item.price)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {qty > 0 && (
                            <>
                              <button
                                type="button"
                                onClick={() => decrementMenu(item.id)}
                                aria-label={`Kurangi ${item.name}`}
                                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl bg-stone-900 hover:bg-red-700 active:scale-90 text-white cursor-pointer transition-[transform,background-color] duration-150"
                              >
                                <MinusIcon className="w-4 h-4" />
                              </button>
                              <span
                                key={qty}
                                className="animate-number-bump w-7 text-center font-mono text-sm font-bold text-stone-900 tabular-nums"
                              >
                                {qty}
                              </span>
                            </>
                          )}
                          <button
                            type="button"
                            onClick={() => incrementMenu(item.id)}
                            aria-label={`Tambah ${item.name}`}
                            className="min-w-[44px] min-h-[44px] px-3 inline-flex items-center justify-center gap-1 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-90 text-stone-950 text-xs font-bold cursor-pointer transition-[transform,background-color] duration-150"
                          >
                            <PlusIcon className="w-4 h-4" />
                            {qty === 0 && <span>Tambah</span>}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Kolom Kanan Sticky: Ringkasan Pesanan & Form Kirim */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
            <div
              style={{ animationDelay: '180ms' }}
              className="animate-hero-fade-up bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <ReceiptIcon className="w-5 h-5 text-red-700" />
                  <h2 className="text-lg font-extrabold text-stone-900">Ringkasan Pesanan</h2>
                </div>
                {selectedLines.length > 0 && (
                  <button
                    type="button"
                    onClick={clearOrder}
                    className="min-h-[44px] px-3 py-1.5 rounded-xl bg-white hover:bg-red-700 active:scale-95 text-red-700 hover:text-white border-2 border-red-700 text-xs font-bold cursor-pointer transition-[transform,background-color,color] duration-200"
                  >
                    Kosongkan
                  </button>
                )}
              </div>

              {selectedLines.length === 0 ? (
                <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 text-center mb-5">
                  <p className="text-sm font-bold text-stone-900 mb-1">
                    Daftar pesanan masih kosong
                  </p>
                  <p className="text-xs text-stone-600">
                    Pilih menu dari daftar di samping atau klik salah satu paket cepat di atas.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mb-5">
                  {selectedLines.map((line) => (
                    <div
                      key={line.item.id}
                      className="animate-hero-fade-up flex items-center justify-between gap-3 text-sm pb-2.5 border-b border-stone-100"
                    >
                      <div>
                        <span className="block font-bold text-stone-900">{line.item.name}</span>
                        <span className="block font-mono text-xs text-stone-500 tabular-nums">
                          {formatRupiah(line.item.price)} x {line.quantity}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-stone-900 tabular-nums shrink-0">
                        {formatRupiah(line.item.price * line.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-extrabold text-stone-900">Total Estimasi</span>
                    <span
                      key={totalAmount}
                      className="animate-number-bump font-mono text-xl font-extrabold text-red-700 tabular-nums"
                    >
                      {formatRupiah(totalAmount)}
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmitOrder} noValidate className="space-y-4">
                {errorMessage && (
                  <div
                    role="alert"
                    className="animate-hero-fade-up bg-red-700 text-white rounded-xl p-3.5 text-xs sm:text-sm font-bold"
                  >
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-sm font-bold text-stone-900 mb-1.5"
                  >
                    Nama Pemesan <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Contoh: Budi (Kantor BSD)"
                    className="w-full min-h-[48px] px-4 rounded-xl bg-white border-2 border-stone-200 focus:border-red-700 text-sm font-medium text-stone-900 placeholder:text-stone-400 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="order-type"
                    className="block text-sm font-bold text-stone-900 mb-1.5"
                  >
                    Cara Pengambilan
                  </label>
                  <select
                    id="order-type"
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value as OrderType)}
                    className="w-full min-h-[48px] px-4 rounded-xl bg-white border-2 border-stone-200 focus:border-red-700 text-sm font-semibold text-stone-900 transition-colors"
                  >
                    {ORDER_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="order-notes"
                    className="block text-sm font-bold text-stone-900 mb-1.5"
                  >
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    id="order-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contoh: Bagian paha, sambal dipisah, ambil jam 12.00"
                    className="w-full p-3.5 rounded-xl bg-white border-2 border-stone-200 focus:border-red-700 text-sm font-medium text-stone-900 placeholder:text-stone-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[52px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:bg-stone-500 text-white font-bold text-base shadow-sm transition-[transform,background-color] duration-200 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span>
                    {isSubmitting ? 'Menyiapkan Pesan WhatsApp...' : 'Kirim Pesanan ke WhatsApp'}
                  </span>
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>

      {totalItems > 0 && (
        <div className="animate-hero-fade-up fixed bottom-0 inset-x-0 z-40 lg:hidden bg-stone-900 text-white border-t border-stone-700 px-4 py-3">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
            <div>
              <span className="block text-xs font-semibold text-amber-400">
                {totalItems} item dipilih
              </span>
              <span
                key={totalAmount}
                className="animate-number-bump block font-mono text-lg font-extrabold tabular-nums"
              >
                {formatRupiah(totalAmount)}
              </span>
            </div>
            <a
              href="#customer-name"
              className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-sm shrink-0 transition-[transform,background-color] duration-150"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Lanjut Kirim WA</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
