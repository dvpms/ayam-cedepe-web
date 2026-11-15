import Image from 'next/image';
import Link from 'next/link';
import { SIGNATURE_HIGHLIGHTS } from '@/config/site';

export function SignatureSection() {
  return (
    <section id="ciri-khas" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <span className="inline-block bg-amber-400 text-stone-950 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3">
            CIRI KHAS SAJIAN KAMI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            Kenapa Ayam Cedepe Bikin Nagih?
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Setiap porsi diracik untuk menghadirkan perpaduan ayam goreng gurih, aroma bawang goreng
            utuh, kremesan renyah, dan sambal pedas yang pas di lidah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-3xl p-4 shadow-sm">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-900 mb-4">
                <Image
                  src="/images/ayam-goreng-bawang-hero.jpg"
                  alt="Hidangan lengkap Ayam Goreng Bawang Special Ayam Cedepe BSD dengan kremes gurih, bawang utuh goreng, tahu, tempe, dan sambal bawang"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                <div>
                  <span className="block text-sm font-bold text-stone-900">
                    Disajikan Hangat Setiap Hari
                  </span>
                  <span className="block text-xs font-medium text-stone-600">
                    Makan di tempat atau pesan antar dari Ruko YC HUB
                  </span>
                </div>
                <Link
                  href="/pesan"
                  className="min-h-[44px] inline-flex items-center justify-center px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold shrink-0 transition-colors"
                >
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SIGNATURE_HIGHLIGHTS.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-red-700 text-white font-mono text-sm font-bold mb-3.5">
                    {item.number}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
