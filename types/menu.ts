export type MenuCategory = 'semua' | 'paket' | 'lauk' | 'sambal' | 'pelengkap';

export type OrderType = 'Makan di Tempat (Dine-in)' | 'Bungkus / Ambil Sendiri' | 'Pesan Antar (Ojek Online)';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'semua'>;
  price: number;
  priceLabel: string;
  description: string;
  isPackage: boolean;
  badge?: string;
  inclusions?: string[];
  spicyLevel?: 0 | 1 | 2 | 3;
  imageSrc: string;
  imageAlt: string;
}

export interface SignatureHighlight {
  id: string;
  number: string;
  title: string;
  description: string;
  relatedMenuId: string;
}

export interface OrderPreset {
  id: string;
  label: string;
  subtitle: string;
  items: { menuId: string; quantity: number }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface OutletConfig {
  name: string;
  branchName: string;
  tagline: string;
  subTagline: string;
  grandOpeningDate: string;
  siteUrl: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phoneDisplay: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  googleMapsShortUrl: string;
  googleMapsPlaceUrl: string;
  googleMapsEmbedUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHoursText: string;
  openHour: number;
  closeHour: number;
}
