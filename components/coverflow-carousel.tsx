'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cards = [
  { id: 1, title: "Getting that film look in the post", src: "https://picsum.photos/id/1033/600/800" },
  { id: 2, title: "Selected projects from the last month", src: "https://picsum.photos/id/1037/600/800" },
  { id: 3, title: "Otherworldly places located on Earth", src: "https://picsum.photos/id/1039/600/800" },
  { id: 4, title: "Visualizing distorted sound mixes", src: "https://picsum.photos/id/1041/600/800" },
  { id: 5, title: "Pattern and color inspiration", src: "https://picsum.photos/id/1044/600/800" }
];

export function CoverflowCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);

  const next = () => setActiveIndex((prev) => Math.min(prev + 1, cards.length - 1));
  const prev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden font-sans py-24">
      <div className="max-w-4xl mx-auto text-center mb-20 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-[80px] font-serif leading-[1.05] tracking-tight">
          Selected and popular<br />posts on the social<br />right now
        </h1>
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto h-[400px] md:h-[500px] flex justify-center items-center" style={{ perspective: '1200px' }}>
        {cards.map((card, index) => {
          const offset = index - activeIndex;
          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);
          
          // Circular Stacking Math (Viewer outside the circle)
          const rotateY = -offset * 35; // Angle cards outward to form a cylinder
          
          // Non-linear X translation for circular compression and tight stacking
          let translateX = 0;
          if (absOffset > 0) {
            translateX = Math.sign(offset) * (140 + (absOffset - 1) * 100);
          }
          
          // Sharp Z translation to make the center card prominently the largest
          const translateZ = -absOffset * 400; 
          
          const zIndex = 50 - absOffset;
          const opacity = isCenter ? 1 : 1 - absOffset * 0.2;

          return (
            <motion.div
              key={card.id}
              className="absolute w-[260px] h-[360px] md:w-[340px] md:h-[480px] rounded-[24px] overflow-hidden cursor-pointer shadow-2xl border border-white/10"
              initial={false}
              animate={{
                rotateY,
                z: translateZ,
                x: translateX,
                zIndex,
                opacity,
              }}
              transition={{ type: "spring", stiffness: 250, damping: 30, mass: 0.8 }}
              onClick={() => setActiveIndex(index)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={card.src}
                alt={card.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Dark overlay for non-active items */}
              <motion.div 
                className="absolute inset-0 bg-black/50"
                initial={false}
                animate={{ opacity: isCenter ? 0 : 1 }}
                transition={{ duration: 0.4 }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-white font-serif text-lg md:text-2xl leading-snug text-center drop-shadow-lg">
                  {card.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col items-center gap-8 mt-16 z-20">
        <div className="flex gap-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-10 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={prev}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button 
            onClick={next}
            disabled={activeIndex === cards.length - 1}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
            aria-label="Next slide"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
