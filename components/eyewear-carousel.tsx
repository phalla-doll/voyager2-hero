'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Glasses, ArrowRight } from 'lucide-react';

const images = [
  { id: 1, src: "https://picsum.photos/id/1027/800/800", alt: "Model 1" },
  { id: 2, src: "https://picsum.photos/id/1064/800/800", alt: "Model 2" },
  { id: 3, src: "https://picsum.photos/id/1035/800/800", alt: "Model 3" },
  { id: 4, src: "https://picsum.photos/id/1043/800/800", alt: "Model 4" },
  { id: 5, src: "https://picsum.photos/id/1059/800/800", alt: "Model 5" },
];

export function EyewearCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden py-24">
      {/* Dynamic Blurred Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: activeIndex === index ? 0.3 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Image
              src={img.src}
              alt="Background blur"
              fill
              className="object-cover blur-[120px] scale-150"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Top Icon */}
      <div className="absolute top-16 md:top-24 text-white/90 z-20">
        <Glasses size={44} strokeWidth={1.5} />
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-6xl h-[300px] md:h-[500px] flex items-center justify-center mt-16 mb-12 md:mb-20 z-10">
        {images.map((img, index) => {
          const offset = index - activeIndex;
          const isCenter = offset === 0;

          // Arch math
          const rotateZ = offset * 12;
          const translateY = Math.abs(offset) * 45;
          const translateX = offset * 160; // Overlap amount
          const scale = 1 - Math.abs(offset) * 0.15;
          const zIndex = 50 - Math.abs(offset);
          const opacity = 1 - Math.abs(offset) * 0.2;

          return (
            <motion.div
              key={img.id}
              className="absolute w-[220px] h-[220px] md:w-[360px] md:h-[360px] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl border border-white/10 bg-black"
              initial={false}
              animate={{
                rotate: rotateZ,
                y: translateY,
                x: translateX,
                scale,
                zIndex,
                opacity,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="w-full h-full relative">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Dark overlay for non-active items */}
                <motion.div 
                  className="absolute inset-0 bg-black/40"
                  initial={false}
                  animate={{ opacity: isCenter ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col items-center gap-10 z-20 mt-4">
        <h2 className="text-3xl md:text-5xl font-sans text-white tracking-wide font-light">
          Eyewear That Stands Out
        </h2>
        
        <button className="group flex items-center gap-3 bg-white text-black pl-5 pr-1.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <span className="text-sm font-normal tracking-wide">Enter Store</span>
          <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight size={14} strokeWidth={1.5} />
          </div>
        </button>
      </div>
    </section>
  );
}
