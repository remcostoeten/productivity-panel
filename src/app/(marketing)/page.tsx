import Particles from "@/components/ui/particles";
import ClientSection from "./_components/landing/client-section";
import HeroSection from "./_components/landing/hero-section";
import { SphereMask } from "@/components/ui";
import CallToActionSection from "./_components/landing/cta-section";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,

    scale: 1,
    transition: {
      staggerChildren: 1.3,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 2,
      duration: 0.5,
    },
  },
};

export default function Page() {
  return (
    <>
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
