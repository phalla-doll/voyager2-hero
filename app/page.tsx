'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useState } from 'react';

const cards = [
  {
    id: 1,
    title: "Getting that film look in the post",
    image: "https://picsum.photos/seed/darkfilm/600/800",
  },
  {
    id: 2,
    title: "Selected projects from the last month",
    image: "https://picsum.photos/seed/redlava/600/800",
  },
  {
    id: 3,
    title: "Otherworldly places located on Earth",
    image: "https://picsum.photos/seed/yellowstone/600/800",
  },
  {
    id: 4,
    title: "Visualizing distorted sound mixes",
    image: "https://picsum.photos/seed/bluefluid/600/800",
  },
  {
    id: 5,
    title: "Pattern and color inspiration",
    image: "https://picsum.photos/seed/pinkpaint/600/800",
  }
];

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden font-sans pt-20 pb-20">
      <div className="max-w-4xl mx-auto text-center mb-24 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-[80px] font-serif leading-[1.05] tracking-tight">
          Selected and popular<br />posts on the social<br />right now
        </h1>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto h-[500px] flex justify-center items-center" style={{ perspective: '1200px' }}>
        {cards.map((card, index) => {
          const offset = index - 2;
          const isHovered = hoveredIndex === index;
          
          let rotateY = offset * -22; 
          let translateZ = Math.abs(offset) * -120; 
          let translateX = offset * 230; 
          let zIndex = 10 - Math.abs(offset);
          let scale = 1;
          let opacity = 1 - Math.abs(offset) * 0.15;

          if (hoveredIndex !== null) {
            if (isHovered) {
              rotateY = 0;
              translateZ = 150;
              translateX = offset * 230;
              zIndex = 20;
              scale = 1.05;
              opacity = 1;
            } else {
              const hoverOffset = index - hoveredIndex;
              rotateY = hoverOffset * -25;
              translateZ = -200 - Math.abs(hoverOffset) * 80;
              translateX = offset * 230 + (hoverOffset > 0 ? 80 : -80);
              scale = 0.9;
              opacity = 0.4;
            }
          }

          return (
            <motion.div
              key={card.id}
              className="absolute w-[260px] h-[380px] md:w-[320px] md:h-[460px] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl border border-white/10"
              initial={false}
              animate={{
                rotateY,
                z: translateZ,
                x: translateX,
                scale,
                zIndex,
                opacity,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-white font-serif text-xl md:text-2xl leading-snug text-center drop-shadow-lg">
                  {card.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
