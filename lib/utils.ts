import { OUTLET_CONFIG } from '@/config/site';

export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function formatCompactPrice(amount: number): string {
  return `${Math.round(amount / 1000)} K`;
}

export function getJakartaHour(date: Date = new Date()): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    hour: 'numeric',
    hour12: false,
  });
  const parsed = Number.parseInt(formatter.format(date), 10);
  return Number.isNaN(parsed) ? 12 : parsed;
}

export function checkOutletOpenStatus(date: Date = new Date()): {
  isOpen: boolean;
  label: string;
} {
  const hour = getJakartaHour(date);
  const isOpen = hour >= OUTLET_CONFIG.openHour && hour < OUTLET_CONFIG.closeHour;
  return {
    isOpen,
    label: isOpen ? 'Buka Sekarang (10.00 - 21.00 WIB)' : 'Tutup (Buka 10.00 WIB)',
  };
}
