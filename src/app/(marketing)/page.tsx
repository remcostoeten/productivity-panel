import Particles from '@/components/ui/particles';
import { SphereMask } from '@/components/ui/sphere-mask';
import ClientSection from './_components/landing/client-section';
import CallToActionSection from './_components/landing/cta-section';
import HeroSection from './_components/landing/hero-section';

export default async function Page() {
  return (
    <>
      <HeroSection />
      <ClientSection />
      <SphereMask />
      <CallToActionSection />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color="#ffffff"
      />
    </>
  );
}
