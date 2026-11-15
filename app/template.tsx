import { OUTLET_CONFIG } from '@/config/site';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-50 pointer-events-none bg-amber-400 animate-curtain-gold"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 z-50 pointer-events-none bg-red-700 animate-curtain-red flex items-center justify-center"
      >
        <span className="bg-amber-400 text-stone-950 border-2 border-stone-900 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase">
          {OUTLET_CONFIG.name}
        </span>
      </div>
      <div className="flex-1 flex flex-col animate-page-enter">{children}</div>
    </>
  );
}
