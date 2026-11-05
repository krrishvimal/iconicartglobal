import HeroSection from "@/components/home/HeroSection";
import MasterclassCarousel from "@/components/home/MasterclassCarousel";
import VelvetManifesto from "@/components/home/VelvetManifesto";
import BoutiqueLookbook from "@/components/home/BoutiqueLookbook";
import PrivateSoirees from "@/components/home/PrivateSoirees";
import BespokeConcierge from "@/components/home/BespokeConcierge";
import Testimonials from "@/components/home/Testimonials";
import InstagramFeed from "@/components/home/InstagramFeed";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. The Monumental Hero Canvas */}
      <HeroSection />

      {/* 2. The Draggable Workshop Carousel */}
      <MasterclassCarousel />

      {/* 3. The Artist & Atelier Philosophy */}
      <VelvetManifesto />

      {/* 4. The Haute Boutique Lookbook */}
      <BoutiqueLookbook />

      {/* 5. Private Soirées & Corporate Galas */}
      <PrivateSoirees />

      {/* 6. The Bespoke Commission Concierge */}
      <BespokeConcierge />

      {/* 7. Collector Acclaim & Testimonials */}
      <Testimonials />

      {/* 8. Live Atelier Instagram Salon Wall */}
      <InstagramFeed />

      {/* 9. Grand Atelier Concierge & Newsletter */}
      <Newsletter />
    </div>
  );
}
