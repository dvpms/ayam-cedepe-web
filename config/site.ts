import type { FaqItem, MenuItem, OrderPreset, OutletConfig, SignatureHighlight } from '@/types/menu';

export const OUTLET_CONFIG: OutletConfig = {
  name: 'Ayam Cedepe',
  branchName: 'Ayam Cedepe BSD',
  tagline: 'Jagonya Ayam Goreng Bawang Special',
  subTagline: 'Rasa yang bikin nagih!',
  grandOpeningDate: '11 November 2026',
  siteUrl: 'https://ayamcedepe.id',
  address: 'Ruko YC HUB, BSD City',
  city: 'Kota Tangerang Selatan',
  province: 'Banten',
  postalCode: '15318',
  phoneDisplay: '0813-8471-8800',
  whatsappNumber: '6281384718800',
  instagramHandle: '@Ayamcedepe.id',
  instagramUrl: 'https://www.instagram.com/ayamcedepe.id',
  googleMapsShortUrl: 'https://maps.app.goo.gl/Vu1Z5CzRxvNgRkH18',
  googleMapsPlaceUrl: 'https://www.google.com/maps/place/Ayam+Cedepe+BSD/@-6.3073057,106.6528561,17z',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=-6.3073057,106.6528561&hl=id&z=17&output=embed',
  coordinates: {
    lat: -6.3073057,
    lng: 106.6528561,
  },
  openingHoursText: 'Setiap Hari, 10.00 - 21.00 WIB',
  openHour: 10,
  closeHour: 21,
};

export const MENU_CATEGORIES: { id: 'semua' | 'lauk' | 'sambal' | 'pelengkap'; label: string }[] = [
  { id: 'semua', label: 'Semua Menu' },
  { id: 'lauk', label: 'Lauk Bawang' },
  { id: 'sambal', label: 'Sambal Ulek' },
  { id: 'pelengkap', label: 'Pelengkap & Nasi' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'paket-cedepe',
    name: 'Paket Cedepe',
    category: 'paket',
    price: 20000,
    priceLabel: '20 K',
    isPackage: true,
    badge: 'PAKET HEMAT',
    description: 'Nasi putih hangat, ayam goreng bumbu bawang yang renyah dan gurih, kremesan, serta sambal bawang ulek segar.',
    inclusions: ['Nasi putih hangat', 'Ayam goreng bawang special', 'Sambal bawang ulek'],
    spicyLevel: 2,
    imageSrc: '/images/ayam-goreng-bawang-hero.jpg',
    imageAlt: 'Paket Cedepe berisi nasi putih, ayam goreng bawang special, kremesan, dan sambal bawang',
  },
  {
    id: 'paket-special',
    name: 'Paket Special',
    category: 'paket',
    price: 30000,
    priceLabel: '30 K',
    isPackage: true,
    badge: 'PALING KOMPLIT',
    description: 'Sajian piring lengkap berisi ayam goreng bawang special, kol goreng, tempe dan tahu goreng bawang, plus sambal bawang special.',
    inclusions: [
      'Nasi putih hangat',
      'Ayam goreng bawang special',
      'Kol goreng bawang',
      'Tempe & tahu goreng bawang',
      'Sambal bawang special',
    ],
    spicyLevel: 2,
    imageSrc: '/images/ayam-goreng-bawang-hero.jpg',
    imageAlt: 'Paket Special Ayam Cedepe dengan ayam goreng bawang, kol goreng, tahu, tempe, dan sambal bawang',
  },
  {
    id: 'ayam-goreng-bawang',
    name: 'Ayam goreng bawang special',
    category: 'lauk',
    price: 15000,
    priceLabel: '15 K',
    isPackage: false,
    badge: 'FAVORIT',
    description: 'Ayam goreng berbumbu bawang yang meresap hingga ke tulang, bertabur kremes renyah dan bawang goreng utuh.',
    spicyLevel: 0,
    imageSrc: '/images/ayam-goreng-bawang-hero.jpg',
    imageAlt: 'Ayam goreng bawang special Ayam Cedepe bertabur kremes gurih dan bawang goreng utuh',
  },
  {
    id: 'kulit-goreng-bawang',
    name: 'Kulit goreng bawang',
    category: 'lauk',
    price: 5000,
    priceLabel: '5 K',
    isPackage: false,
    badge: 'RENYAH',
    description: 'Kulit ayam goreng garing berbumbu bawang gurih, cocok sebagai camilan maupun teman makan nasi.',
    spicyLevel: 0,
    imageSrc: '/images/brosur-menu.png',
    imageAlt: 'Kulit goreng bawang renyah khas Ayam Cedepe BSD',
  },
  {
    id: 'tempe-goreng-bawang',
    name: 'Tempe goreng bawang',
    category: 'lauk',
    price: 4000,
    priceLabel: '4 K',
    isPackage: false,
    description: 'Tempe iris digoreng garing dengan bumbu bawang asin gurih.',
    spicyLevel: 0,
    imageSrc: '/images/brosur-menu.png',
    imageAlt: 'Tempe goreng bawang renyah khas Ayam Cedepe',
  },
  {
    id: 'tahu-goreng-bawang',
    name: 'Tahu goreng bawang',
    category: 'lauk',
    price: 4000,
    priceLabel: '4 K',
    isPackage: false,
    description: 'Tahu kuning lembut di dalam, garing di luar dengan aroma bawang goreng.',
    spicyLevel: 0,
    imageSrc: '/images/brosur-menu.png',
    imageAlt: 'Tahu goreng bawang kuning lembut khas Ayam Cedepe',
  },
  {
    id: 'kol-goreng-bawang',
    name: 'Kol goreng bawang',
    category: 'pelengkap',
    price: 4000,
    priceLabel: '4 K',
    isPackage: false,
    description: 'Kol segar digoreng hingga manis kecokelatan dan gurih minyak bawang.',
    spicyLevel: 0,
    imageSrc: '/images/brosur-menu.png',
    imageAlt: 'Kol goreng bawang manis gurih khas Ayam Cedepe',
  },
  {
    id: 'kerupuk-bawang',
    name: 'Kerupuk bawang',
    category: 'pelengkap',
    price: 2000,
    priceLabel: '2 K',
    isPackage: false,
    description: 'Kerupuk renyah rasa bawang yang gurih sebagai teman makan sambal.',
    spicyLevel: 0,
    imageSrc: '/images/brosur-menu.png',
    imageAlt: 'Kerupuk bawang renyah Ayam Cedepe',
  },
  {
    id: 'sambal-bawang',
    name: 'Sambal bawang',
    category: 'sambal',
    price: 5000,
    priceLabel: '5 K',
    isPackage: false,
    description: 'Sambal bawang ulek kasar dari cabai rawit merah segar yang disiram minyak bawang panas.',
    spicyLevel: 3,
    imageSrc: '/images/ayam-goreng-bawang-hero.jpg',
    imageAlt: 'Sambal bawang ulek pedas segar khas Ayam Cedepe',
  },
  {
    id: 'sambal-bawang-pete',
    name: 'Sambal bawang pete',
    category: 'sambal',
    price: 8000,
    priceLabel: '8 K',
    isPackage: false,
    badge: 'SPESIAL',
    description: 'Sambal bawang pedas nendang dipadukan potongan pete segar pilihan untuk pencinta aroma khas.',
    spicyLevel: 3,
    imageSrc: '/images/ayam-goreng-bawang-hero.jpg',
    imageAlt: 'Sambal bawang pete pedas khas Ayam Cedepe BSD',
  },
  {
    id: 'nasi-putih',
    name: 'Nasi putih',
    category: 'pelengkap',
    price: 5000,
    priceLabel: '5 K',
    isPackage: false,
    description: 'Nasi putih hangat pulen porsi pas untuk menampung kremesan dan sambal bawang.',
    spicyLevel: 0,
    imageSrc: '/images/ayam-goreng-bawang-hero.jpg',
    imageAlt: 'Nasi putih hangat pulen Ayam Cedepe',
  },
];

export const SIGNATURE_HIGHLIGHTS: SignatureHighlight[] = [
  {
    id: 'bumbu-meresap',
    number: '01',
    title: 'Bumbu Bawang Meresap Sampai ke Tulang',
    description:
      'Ayam diungkep perlahan dengan racikan bawang putih dan rempah pilihan sebelum digoreng garing keemasan, menghasilkan daging yang lembut dan gurih di setiap gigitan.',
    relatedMenuId: 'ayam-goreng-bawang',
  },
  {
    id: 'bawang-utuh-kremes',
    number: '02',
    title: 'Bawang Goreng Utuh & Kremesan Gurih',
    description:
      'Disajikan bersama siung bawang putih dan bawang merah utuh yang digoreng hingga manis dan harum, lengkap dengan taburan kremes renyah yang melimpah.',
    relatedMenuId: 'paket-cedepe',
  },
  {
    id: 'sambal-ulek-pete',
    number: '03',
    title: 'Sambal Bawang Ulek & Sambal Pete Segar',
    description:
      'Cabai rawit merah segar diulek kasar lalu disiram minyak bawang panas agar pedasnya mantap. Tersedia juga varian Sambal Bawang Pete bagi penyuka rasa yang lebih nendang.',
    relatedMenuId: 'sambal-bawang-pete',
  },
  {
    id: 'lauk-pendamping',
    number: '04',
    title: 'Lauk Pendamping Goreng Bawang',
    description:
      'Mulai dari tahu kuning lembut, tempe goreng garing, kol goreng, hingga kulit ayam renyah, seluruhnya ikut dibumbui bawang gurih agar menyatu dalam satu piring.',
    relatedMenuId: 'paket-special',
  },
];

export const ORDER_PRESETS: OrderPreset[] = [
  {
    id: 'preset-hemat',
    label: 'Makan Sendiri Hemat (20 K)',
    subtitle: '1x Paket Cedepe',
    items: [{ menuId: 'paket-cedepe', quantity: 1 }],
  },
  {
    id: 'preset-juara',
    label: 'Kombinasi Favorit (43 K)',
    subtitle: '1x Paket Special + Kulit + Sambal Pete',
    items: [
      { menuId: 'paket-special', quantity: 1 },
      { menuId: 'kulit-goreng-bawang', quantity: 1 },
      { menuId: 'sambal-bawang-pete', quantity: 1 },
    ],
  },
  {
    id: 'preset-rombongan',
    label: 'Rombongan Kantor 5 Porsi (150 K)',
    subtitle: '5x Paket Special Komplit',
    items: [{ menuId: 'paket-special', quantity: 5 }],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-beda-paket',
    question: 'Apa beda Paket Cedepe (20 K) dan Paket Special (30 K)?',
    answer:
      'Paket Cedepe seharga Rp 20.000 sudah termasuk Nasi Putih, Ayam Goreng Bawang Special, kremesan, bawang goreng utuh, dan Sambal Bawang. Sedangkan Paket Special seharga Rp 30.000 berisi semua komponen tersebut ditambah Kol Goreng serta Tempe dan Tahu Goreng Bawang.',
  },
  {
    id: 'faq-lokasi-bsd',
    question: 'Di mana lokasi outlet Ayam Cedepe BSD?',
    answer:
      'Outlet Ayam Cedepe BSD berlokasi di Ruko YC HUB, BSD City, Kota Tangerang Selatan. Anda dapat langsung menekan tombol Buka Google Maps di bagian Lokasi Outlet untuk petunjuk arah akurat.',
  },
  {
    id: 'faq-sambal-pete',
    question: 'Apakah sambal dan kulit gorengnya bisa dipesan terpisah?',
    answer:
      'Bisa. Semua menu tambahan dapat dipesan satuan, mulai dari Kerupuk Bawang (2 K), Tempe/Tahu/Kol Goreng Bawang (4 K), Kulit Goreng Bawang (5 K), Sambal Bawang (5 K), hingga Sambal Bawang Pete (8 K).',
  },
  {
    id: 'faq-pesan-nasi-box',
    question: 'Apakah Ayam Cedepe menerima pesanan dalam jumlah banyak atau nasi box kantor?',
    answer:
      'Ya, kami melayani pesanan untuk makan siang kantor, acara keluarga, atau rombongan. Anda dapat menyusun pesanan melalui halaman Pesan Online atau langsung menghubungi WhatsApp kami di 0813-8471-8800.',
  },
  {
    id: 'faq-bawang-utuh',
    question: 'Apa keistimewaan bawang putih dan bawang merah utuh yang disajikan?',
    answer:
      'Siung bawang putih dan bawang merah utuh yang digoreng bersama bumbu ayam menghasilkan rasa manis gurih yang lembut tanpa getir serta aroma harum yang khas ketika dimakan bersama nasi hangat.',
  },
  {
    id: 'faq-jam-buka',
    question: 'Jam berapa outlet Ayam Cedepe BSD buka setiap harinya?',
    answer:
      'Outlet Ayam Cedepe BSD di Ruko YC HUB beroperasi setiap hari Senin sampai Minggu, mulai pukul 10.00 hingga 21.00 WIB.',
  },
];
