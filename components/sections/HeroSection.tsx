import Image from 'next/image';
import Link from 'next/link';
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
    title: 'Ayam Ungkep Bawang',
    description: 'Digoreng garing, bumbu meresap sampai ke dalam.',
  },
  {
    id: 'kremesan-bawang',
    title: 'Kremesan & Bawang Utuh',
    description: 'Taburan kremes renyah dan siung bawang goreng utuh.',
  },
  {
    id: 'sambal-ulek',
    title: 'Sambal Bawang Ulek',
    description: 'Ulekan cabai rawit dan bawang segar yang pedas nagih.',
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
  return (
    <section
      id="hero"
      className="bg-[#FAF8F5] border-b border-stone-200 py-6 sm:py-8 lg:py-4 lg:min-h-[calc(100svh-6.75rem)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-3 lg:mb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-extrabold tracking-tight text-stone-900 leading-[1.08]">
            Jagonya{' '}
            <span className="text-red-700">Ayam Goreng Bawang</span>{' '}
            Special di BSD City.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-3 order-3 lg:order-1 flex flex-col lg:items-end lg:text-right">
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-red-700 mb-2">
              Keistimewaan Sajian
            </span>

            <div className="w-full divide-y divide-stone-300 border-y border-stone-300 mb-4">
              {DISH_HIGHLIGHTS.map((item) => (
                <div key={item.id} className="py-3">
                  <h2 className="text-sm sm:text-base font-extrabold text-stone-900">
                    {item.title}
                  </h2>
                  <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              ))}
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
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 animate-plate-reveal flex items-center justify-center">
            <div className="relative w-full max-w-[330px] sm:max-w-[420px] lg:max-w-[470px] xl:max-w-[500px] aspect-square flex items-center justify-center mx-auto">
              <div
                aria-hidden="true"
                className="absolute inset-1 sm:inset-2 rounded-full border-2 border-dashed border-amber-500"
              />
              <div
                aria-hidden="true"
                className="absolute w-[84%] h-[84%] rounded-full bg-red-700 translate-x-3 translate-y-3"
              />
              <div
                aria-hidden="true"
                className="absolute w-[84%] h-[84%] rounded-full bg-amber-400 border-2 border-stone-900"
              />

              <DotGridOrnament className="w-14 h-10 text-red-700 absolute top-0 left-3" />
              <DotGridOrnament className="w-14 h-10 text-stone-900 absolute bottom-2 right-3" />
              <StarburstOrnament className="w-6 h-6 text-red-700 absolute top-3 right-8" />
              <StarburstOrnament className="w-6 h-6 text-amber-500 absolute bottom-8 left-3" />

              <div className="relative z-10 w-[94%] h-[94%] flex items-center justify-center">
                <Image
                  src="/images/ayam-goreng-bawang-plate.png"
                  alt="Sajian Ayam Goreng Bawang Special Ayam Cedepe lengkap dengan kremesan, bawang utuh goreng, tahu, tempe, dan sambal bawang"
                  fill
                  sizes="(max-width: 1024px) 85vw, 500px"
                  className="object-contain drop-shadow-[0_24px_32px_rgba(28,25,23,0.3)]"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 order-2 lg:order-3 flex flex-col items-start">
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-red-700 mb-2">
              Pilihan Paket
            </span>

            <div className="w-full divide-y divide-stone-300 border-y border-stone-300 mb-5">
              {HERO_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="py-3.5 flex items-baseline justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-extrabold text-stone-900">
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
                className="min-h-[48px] w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-base shadow-sm transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                <span>Pesan Sekarang</span>
              </Link>
              <a
                href="#menu"
                className="min-h-[48px] w-full inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white hover:bg-red-700 text-red-700 hover:text-white font-bold text-sm border-2 border-red-700 transition-colors"
              >
                Lihat Menu &amp; Harga
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
