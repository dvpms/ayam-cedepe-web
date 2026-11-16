import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { FaqSection } from '@/components/sections/FaqSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { MenuBoardSection } from '@/components/sections/MenuBoardSection';
import { SignatureSection } from '@/components/sections/SignatureSection';

export default function HomePage() {
  return (
    <>
      <Navbar mode="landing" />
      <main className="flex-1">
        <HeroSection />
        <SignatureSection />
        <MenuBoardSection />
        <LocationSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
