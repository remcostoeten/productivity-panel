import Blur from "@/components/ui/Blur";
import Particles from "@/components/ui/particles";
import { SphereMask } from "@/components/ui/sphere-mask";
import ClientSection from "./_components/landing/client-section";
import CallToActionSection from "./_components/landing/cta-section";
import HeroSection from "./_components/landing/hero-section";

export default async function Page() {
  return (
    <>
      <Blur />
      <HeroSection />
      <ClientSection />
      <SphereMask />
      <CallToActionSection />
      {/* <Particles
                className="absolute inset-0 -z-10"
                quantity={25}
                ease={702}
                size={0.5}
                staticity={22}
            /> */}
      <Particles
        className="absolute inset-0  opacity-50 -z-10"
        quantity={50}
        ease={702}
        size={0.5}
        staticity={2}
        color="#FFFFFF" // All particles will be red
      />
    </>
  );
}
