import { VoyagerCarousel } from '@/components/voyager-carousel';
import { PortfolioCarousel } from '@/components/portfolio-carousel';
import { EyewearCarousel } from '@/components/eyewear-carousel';
import { CoverflowCarousel } from '@/components/coverflow-carousel';

export default function Page() {
  return (
    <main className="bg-black min-h-screen">
      <VoyagerCarousel />
      
      {/* Divider */}
      <div className="w-full max-w-[1800px] mx-auto px-8">
        <div className="w-full h-px bg-white/10" />
      </div>
      
      <PortfolioCarousel />

      {/* Divider */}
      <div className="w-full max-w-[1800px] mx-auto px-8">
        <div className="w-full h-px bg-white/10" />
      </div>

      <EyewearCarousel />

      {/* Divider */}
      <div className="w-full max-w-[1800px] mx-auto px-8">
        <div className="w-full h-px bg-white/10" />
      </div>

      <CoverflowCarousel />
    </main>
  );
}
