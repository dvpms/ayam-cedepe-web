import Image from 'next/image';
import Link from 'next/link';
import { InstagramIcon, MapPinIcon, WhatsAppIcon } from '@/components/ui/CulinaryIcons';
import { OUTLET_CONFIG } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 rounded-full bg-white overflow-hidden shrink-0">
              <Image
                src="/images/logo.png"
                alt="Logo Ayam Cedepe"
                fill
                sizes="48px"
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <span className="block text-xl font-extrabold text-amber-400">
                {OUTLET_CONFIG.name}
              </span>
              <span className="block text-xs font-semibold text-stone-300">
                {OUTLET_CONFIG.tagline}
              </span>
            </div>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed max-w-sm">
            {OUTLET_CONFIG.subTagline} Menyajikan ayam goreng bumbu bawang meresap, bawang goreng
            utuh, kremesan renyah, dan sambal bawang segar di BSD City.
          </p>
        </div>

        <div className="md:col-span-4 space-y-2.5 text-sm">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            Lokasi Outlet
          </h3>
          <p className="text-stone-200 font-medium leading-relaxed">
            {OUTLET_CONFIG.address}, {OUTLET_CONFIG.city}, {OUTLET_CONFIG.province}{' '}
            {OUTLET_CONFIG.postalCode}
          </p>
          <p className="text-stone-300 font-semibold">{OUTLET_CONFIG.openingHoursText}</p>
          <div className="pt-2">
            <Link
              href="/pesan"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-colors"
            >
              Pesan Online Sekarang
            </Link>
          </div>
        </div>

        <div className="md:col-span-3 space-y-3 text-sm">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            Kontak &amp; Sosial Media
          </h3>
          <ul className="space-y-2.5">
            <li>
              <a
                href={`https://wa.me/${OUTLET_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white hover:text-amber-400 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>WA: {OUTLET_CONFIG.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={OUTLET_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white hover:text-amber-400 transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-amber-400" />
                <span>{OUTLET_CONFIG.instagramHandle}</span>
              </a>
            </li>
            <li>
              <a
                href={OUTLET_CONFIG.googleMapsShortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white hover:text-amber-400 transition-colors"
              >
                <MapPinIcon className="w-4 h-4 text-red-400" />
                <span>Buka Google Maps</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 py-5 px-4 text-center text-xs font-medium text-stone-400">
        &copy; 2026 {OUTLET_CONFIG.branchName}. Jagonya Ayam Goreng Bawang Special.
      </div>
    </footer>
  );
}
