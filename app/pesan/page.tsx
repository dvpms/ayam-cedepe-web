import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { OrderPageClient } from '@/components/order/OrderPageClient';
import { OUTLET_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: 'Pesan Online Ayam Cedepe BSD | Ruko YC HUB, BSD City',
  description:
    'Pilih Paket Cedepe 20K, Paket Special 30K, kulit goreng bawang, dan sambal bawang pete untuk dikirim langsung ke WhatsApp Ayam Cedepe BSD.',
  alternates: {
    canonical: '/pesan',
  },
};

function OrderPageLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <div className="bg-white border border-stone-200 rounded-2xl px-6 py-8 text-center text-sm font-bold text-stone-700">
        Memuat daftar menu pemesanan Ayam Cedepe BSD...
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <>
      <Navbar mode="order" />
      <main className="flex-1 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block bg-red-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full mb-3">
              PEMESANAN VIA WHATSAPP
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Pesan Ayam Cedepe BSD
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-1.5 max-w-2xl">
              Pilih menu favorit atau gunakan paket cepat di bawah, lalu kirim langsung ke admin
              outlet di {OUTLET_CONFIG.address} ({OUTLET_CONFIG.phoneDisplay}).
            </p>
          </div>
          <Link
            href="/"
            className="hidden md:inline-flex min-h-[44px] self-start md:self-auto items-center px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 text-sm font-bold border border-stone-200 transition-colors"
          >
            Kembali ke Halaman Utama
          </Link>
        </div>

        <Suspense fallback={<OrderPageLoading />}>
          <OrderPageClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
