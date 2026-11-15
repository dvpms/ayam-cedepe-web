'use client';

import Swal from 'sweetalert2';

const SOLID_MODAL_CLASSES = {
  popup: 'rounded-2xl border-2 border-stone-200 bg-white text-stone-900 shadow-xl',
  title: 'font-bold text-stone-900',
  confirmButton: 'font-bold px-5 py-2.5 rounded-xl text-white',
  cancelButton: 'font-bold px-5 py-2.5 rounded-xl text-white',
};

export function confirmWhatsAppOrder(summaryHtml: string, onConfirm: () => void): void {
  Swal.fire({
    title: 'Konfirmasi Pesanan WhatsApp',
    html: summaryHtml,
    icon: 'question',
    confirmButtonText: 'Lanjut ke WhatsApp (0813-8471-8800)',
    confirmButtonColor: '#047857',
    showCancelButton: true,
    cancelButtonText: 'Ubah Pesanan',
    cancelButtonColor: '#B91C1C',
    customClass: SOLID_MODAL_CLASSES,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
}

export function showSolidToast(title: string, icon: 'success' | 'info' | 'warning' | 'error'): void {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title,
    showConfirmButton: false,
    timer: 2600,
    background: '#1C1917',
    color: '#FAF8F5',
    customClass: {
      popup: 'rounded-xl border border-stone-700 shadow-lg',
    },
  });
}

export function confirmResetOrder(onConfirm: () => void): void {
  Swal.fire({
    title: 'Kosongkan Daftar Pesanan?',
    text: 'Seluruh menu yang sudah Anda pilih akan dihapus dari ringkasan pesanan.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Kosongkan',
    confirmButtonColor: '#B91C1C',
    cancelButtonText: 'Batal',
    cancelButtonColor: '#1C1917',
    customClass: SOLID_MODAL_CLASSES,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
}
