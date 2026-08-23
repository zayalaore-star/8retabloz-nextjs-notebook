'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GUEST_REVIEWS } from '@/data/hotelData';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideDuration = 5000; // 5 seconds per slide

  // Auto-advance logic
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % GUEST_REVIEWS.length);
    }, slideDuration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % GUEST_REVIEWS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + GUEST_REVIEWS.length) % GUEST_REVIEWS.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Drag end gesture handler
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -200) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 200) {
      handlePrev();
    }
  };

  const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),

  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },

  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.35,
      ease: 'easeIn' as const,
    },
  }),
};

  return (
    <section id="reseñas" className="py-24 sm:py-32 bg-[#F4F3EF] border-t border-[#E2DFC2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          {/* <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E2DFC2] text-xs font-josefin tracking-[0.25em] text-[#8C7A6B] uppercase font-semibold">
            <Award className="w-3.5 h-3.5 text-[#B38F4E]" />
            <span>EXPERIENCIAS DE NUESTROS HUÉSPEDES</span>
          </div> */}

          <h2 className="font-josefin text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            EXPERIENCIAS DE NUESTROS HUÉSPEDES
          </h2>

          <div className="flex items-center justify-center space-x-2 pt-1">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#B38F4E] text-[#B38F4E]" />
              ))}
            </div>
            <span className="font-josefin text-sm font-bold text-[#1C1917]">
              4.98 / 5.0
            </span>
            <span className="text-xs font-serif-luxury text-[#665A4F] italic">
              — Calificación en Airbnb 
            </span>
          </div>
        </div>

        {/* Reviews Carousel Box */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Active Card Container with Drag & AnimatePresence */}
          <div className="relative min-h-[320px] sm:min-h-[270px] flex items-center justify-center overflow-hidden px-2 py-2">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={GUEST_REVIEWS[currentIndex].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="w-full bento-card p-8 sm:p-12 shadow-xl border border-[#E2DFC2] relative flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
              >
                {/* Decorative Top Quote Mark */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[#B38F4E]/15 pointer-events-none" />

                {/* Stars & Room Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex space-x-1">
                    {[...Array(GUEST_REVIEWS[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B38F4E] text-[#B38F4E]" />
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-[#F4F3EF] border border-[#E2DFC2] text-[11px] font-josefin tracking-wider text-[#8C7A6B] uppercase font-semibold">
                      {GUEST_REVIEWS[currentIndex].stayedSuite}
                    </span>
                    <span className="text-xs font-mono text-[#8C7A6B] font-bold">
                      0{currentIndex + 1} / 0{GUEST_REVIEWS.length}
                    </span>
                  </div>
                </div>

                {/* Review Comment Text */}
                <blockquote className="mb-8">
                  <p className="font-serif-luxury text-lg sm:text-2xl text-[#1C1917] italic leading-relaxed">
                    "{GUEST_REVIEWS[currentIndex].comment}"
                  </p>
                </blockquote>

                {/* Guest Profile Info */}
                <div className="flex items-center justify-between pt-6 border-t border-[#E2DFC2]">
                  <div className="flex items-center space-x-4">
                    <img
                      src={GUEST_REVIEWS[currentIndex].avatar}
                      alt={GUEST_REVIEWS[currentIndex].name}
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#B38F4E] shadow-sm flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-josefin text-base font-bold text-[#1C1917]">
                        {GUEST_REVIEWS[currentIndex].name}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs font-josefin text-[#8C7A6B]">
                        <span>{GUEST_REVIEWS[currentIndex].city}</span>
                        <span>•</span>
                        <span>{GUEST_REVIEWS[currentIndex].date}</span>
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block text-[10px] font-josefin text-[#8C7A6B] tracking-widest uppercase">
                    Desliza para explorar ↔
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Buttons & Controls */}
          <div className="flex items-center justify-between pt-8 px-2">
            
            {/* Prev Button */}
            <button
              id="review-carousel-prev"
              onClick={handlePrev}
              aria-label="Reseña anterior"
              className="p-3 rounded-full bg-[#FAF9F6] border border-[#E2DFC2] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] transition-all shadow-sm focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center space-x-2">
              {GUEST_REVIEWS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => handleDotClick(dotIdx)}
                  aria-label={`Ir a reseña ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    dotIdx === currentIndex
                      ? 'w-8 h-2.5 bg-[#B38F4E]'
                      : 'w-2.5 h-2.5 bg-[#E2DFC2] hover:bg-[#B38F4E]/50'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              id="review-carousel-next"
              onClick={handleNext}
              aria-label="Siguiente reseña"
              className="p-3 rounded-full bg-[#FAF9F6] border border-[#E2DFC2] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] transition-all shadow-sm focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};