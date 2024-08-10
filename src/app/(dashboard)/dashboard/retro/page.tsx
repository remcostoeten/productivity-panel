import { About } from "./about";
import { CTA } from "./cta";
import Hero from "./hero";
import Blur from "./hero";

export default function Page() {
  return (
    <main className="space-y-40 mb-40">
      <Hero />
      <Blur />

      <CTA />
    </main>
  );
}
