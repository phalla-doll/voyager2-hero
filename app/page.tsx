import { VoyagerCarousel } from '@/components/voyager-carousel';
import { PortfolioCarousel } from '@/components/portfolio-carousel';

export default function Page() {
  return (
    <main className="bg-black min-h-screen">
      <VoyagerCarousel />
      
      {/* Divider */}
      <div className="w-full max-w-[1800px] mx-auto px-8">
        <div className="w-full h-px bg-white/10" />
      </div>
      
      <PortfolioCarousel />
    </main>
  );
}
