import { formatRupiah } from '@/lib/utils';
import type { MenuItem, OrderType } from '@/types/menu';

export interface SelectedOrderLine {
  item: MenuItem;
  quantity: number;
}

export function calculateOrderTotal(lines: SelectedOrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
}

export function buildWhatsAppOrderMessage(
  lines: SelectedOrderLine[],
  customerName: string,
  orderType: OrderType,
  notes: string,
): string {
  const itemRows = lines.map((line, index) => {
    const lineTotal = formatRupiah(line.item.price * line.quantity);
    return `${index + 1}. ${line.item.name} x${line.quantity} = ${lineTotal}`;
  });
  const total = formatRupiah(calculateOrderTotal(lines));
  const noteText = notes.trim() ? notes.trim() : '-';

  return [
    'Halo Ayam Cedepe BSD, saya ingin memesan:',
    '',
    ...itemRows,
    '',
    `Total Estimasi: ${total}`,
    `Nama Pemesan: ${customerName.trim()}`,
    `Tipe Pesanan: ${orderType}`,
    `Catatan: ${noteText}`,
  ].join('\n');
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
