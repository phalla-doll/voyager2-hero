'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const portfolios = [
  {
    id: 1,
    title: "NOTES ON VISION",
    images: "12 IMAGES",
    src: "https://picsum.photos/id/1018/800/1000",
  },
  {
    id: 2,
    title: "UNDESIGNATED",
    images: "09 IMAGES",
    src: "https://picsum.photos/id/1015/800/1000",
  },
  {
    id: 3,
    title: "FLORENCE",
    images: "20 IMAGES",
    src: "https://picsum.photos/id/1019/800/1000",
  },
  {
    id: 4,
    title: "COHERENCE",
    images: "15 IMAGES",
    src: "https://picsum.photos/id/1016/800/1000",
  },
  {
    id: 5,
    title: "WESTERN",
    images: "10 IMAGES",
    src: "https://picsum.photos/id/1025/800/1000",
  }
];

export function PortfolioCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.firstElementChild?.clientWidth || 400;
      const gap = window.innerWidth < 768 ? 24 : 40; // gap-6 is 24px, gap-10 is 40px
      const scrollAmount = itemWidth + gap;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-[#050505] min-h-screen py-24 relative flex flex-col justify-center overflow-hidden">
      {/* Hero Title Area */}
      <div className="w-full px-4 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white uppercase">
            Francesco Gioia
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-sans tracking-[0.2em] uppercase">
            Selected Works &mdash; 2026
          </p>
        </div>
        <p className="text-white/60 max-w-sm text-sm md:text-base font-sans font-light leading-relaxed md:pb-2">
          Documenting the subtle poetry of everyday life through street photography and visual storytelling.
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-12 pb-12 md:pb-32"
      >
        {portfolios.map((item) => (
          <motion.div 
            key={item.id}
            className="snap-start shrink-0 w-[280px] md:w-[400px] lg:w-[450px] group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="aspect-[4/5] relative overflow-hidden bg-white/5">
              <motion.div
                className="w-full h-full relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            <div className="mt-6 md:mt-8 flex flex-col items-center gap-1.5 md:gap-2">
              <h3 className="text-white text-xs md:text-sm font-sans tracking-[0.15em] uppercase">
                {item.title}
              </h3>
              <p className="text-white/50 text-[9px] md:text-[10px] font-sans tracking-[0.2em] uppercase">
                {item.images}
              </p>
            </div>
          </motion.div>
        ))}
        {/* Spacer for right padding to allow last item to scroll fully */}
        <div className="shrink-0 w-[1px] md:w-[4vw]" />
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 md:bottom-12 right-4 md:right-12 flex gap-3 md:gap-4">
        <button 
          onClick={() => scroll('left')}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ArrowLeft size={18} strokeWidth={1} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300"
          aria-label="Next slide"
        >
          <ArrowRight size={18} strokeWidth={1} />
        </button>
      </div>
    </section>
  );
}
