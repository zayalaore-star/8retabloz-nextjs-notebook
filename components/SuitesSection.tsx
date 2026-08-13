'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  BedDouble,
  Maximize2,
  Users,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  Tv,
  Wifi,
  Shield,
  Bath,
  Droplets,
  Shirt,
  Lamp,
  Calendar,
  Sparkle
} from 'lucide-react';
import { HOTEL_SUITES } from '@/data/hotelData';
import { HotelSuite } from '@/types';

interface SuitesSectionProps {
  selectedSuiteId?: string;
  onSelectSuite: (suiteId: string) => void;
  onOpenBooking: (suiteId?: string) => void;
}

export const SuitesSection: React.FC<SuitesSectionProps> = ({
  selectedSuiteId,
  onSelectSuite,
  onOpenBooking,
}) => {
  const [activeSuiteId, setActiveSuiteId] = useState<string>(
    selectedSuiteId || HOTEL_SUITES[0].id
  );
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const tabsRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const activeSuite: HotelSuite =
    HOTEL_SUITES.find((s) => s.id === activeSuiteId) || HOTEL_SUITES[0];

  useEffect(() => {
    if (selectedSuiteId && selectedSuiteId !== activeSuiteId) {
      setActiveSuiteId(selectedSuiteId);
      setActivePhotoIdx(0);
    }
  }, [selectedSuiteId]);

  const handleSuiteChange = (suiteId: string) => {
    setActiveSuiteId(suiteId);
    setActivePhotoIdx(0);
    onSelectSuite(suiteId);
  };

  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % activeSuite.gallery.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + activeSuite.gallery.length) % activeSuite.gallery.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tabsRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !tabsRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabsRef.current) return;
    const amount = 280;
    tabsRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="estancias" className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E2DFC2]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-josefin tracking-[0.25em] text-[#B38F4E] uppercase font-bold block mb-1">
              HOSPEDAJE EN AYACUCHO
            </span>
            <h2 className="font-josefin text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
              Nuestras habitaciones
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <p className="font-serif-luxury text-sm italic text-[#8C7A6B]">
              Espacios cómodos para descansar y disfrutar tu estancia
            </p>
          </div>
        </div>

        {/* 4 Room Selection Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {HOTEL_SUITES.map((suite) => {
            const isActive = suite.id === activeSuite.id;
            return (
              <button
                key={suite.id}
                id={`suite-select-card-${suite.id}`}
                onClick={() => handleSuiteChange(suite.id)}
                className={`group relative p-3 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3.5 shadow-sm ${
                  isActive
                    ? 'bg-white border-[#B38F4E] ring-2 ring-[#B38F4E]/40 shadow-md translate-y-[-2px]'
                    : 'bg-white/90 border-[#E2DFC2] hover:bg-white hover:border-[#B38F4E]/60'
                }`}
              >
                {/* Room Avatar */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#E2DFC2]">
                  <img
                    src={suite.mainImage}
                    alt={suite.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#B38F4E]/10 border border-[#B38F4E]" />
                  )}
                </div>

                {/* Room Info Title & Capacity */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <span className={`font-josefin text-xs sm:text-sm font-bold block truncate ${isActive ? 'text-[#1C1917]' : 'text-[#2D2823]'}`}>
                    {suite.name.replace('Habitación Señorial ', '')}
                  </span>
                  <span className="text-[11px] font-josefin font-semibold text-[#1C1917] block mt-0.5">
                    {suite.capacity}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Layout (Split 2 Columns) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSuite.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-6 sm:p-10 rounded-3xl border border-[#E2DFC2] shadow-xl"
          >
            {/* Left Column: Main Image Viewer & Gallery Thumbnails (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Photo Viewer Card */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-[#1C1917] group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeSuite.id}-${activePhotoIdx}`}
                    src={activeSuite.gallery[activePhotoIdx] || activeSuite.mainImage}
                    alt={`${activeSuite.name} foto ${activePhotoIdx + 1}`}
                    initial={{ opacity: 0.3, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover absolute inset-0"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Left/Right Overlay Arrows */}
                <button
                  id={`photo-prev-btn-${activeSuite.id}`}
                  onClick={handlePrevPhoto}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  id={`photo-next-btn-${activeSuite.id}`}
                  onClick={handleNextPhoto}
                  aria-label="Siguiente foto"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Bottom Left: Pagination Dots */}
                <div className="absolute bottom-4 left-6 flex items-center space-x-2 z-10">
                  {activeSuite.gallery.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActivePhotoIdx(dotIdx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        dotIdx === activePhotoIdx
                          ? 'w-6 bg-[#D4AF37]'
                          : 'w-2.5 bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>

                {/* Bottom Right: Fullscreen Expand Icon */}
                <button
                  id={`photo-fullscreen-btn-${activeSuite.id}`}
                  onClick={() => setIsFullscreen(true)}
                  title="Ampliar foto"
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition-all z-10 hover:scale-105"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Sub-gallery Thumbnails Track */}
              <div className="grid grid-cols-3 gap-3">
                {activeSuite.gallery.map((imgUrl, idx) => {
                  const isSelected = idx === activePhotoIdx;
                  return (
                    <button
                      key={idx}
                      id={`suite-subthumb-${activeSuite.id}-${idx}`}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                        isSelected
                          ? 'border-[#B38F4E] ring-2 ring-[#B38F4E]/30 scale-102 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${activeSuite.name} miniatura ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Room Info & Amenities (6 cols) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
              
              <div className="space-y-4">
                
                {/* Room Main Title */}
                <div>
                  <h3 className="font-josefin text-2xl sm:text-3xl font-bold text-[#1C1917]">
                    {activeSuite.name}
                  </h3>

                  {/* Maximum Occupancy Line */}
                  <p className="font-josefin text-sm font-semibold text-[#1C1917] mt-1">
                    <strong>Ocupación máxima:</strong> {activeSuite.capacity}
                  </p>
                </div>

                {/* Description Paragraph */}
                <p className="font-serif-luxury text-base sm:text-lg text-[#1C1917] font-medium leading-relaxed">
                  {activeSuite.description}
                </p>

                {/* Quick Specs Badges */}
                <div className="flex flex-wrap items-center gap-4 py-3 border-y border-[#E2DFC2] text-xs font-josefin text-[#1C1917] font-bold">
                  <div className="flex items-center space-x-1.5 bg-[#F4F3EF] px-3 py-1.5 rounded-lg border border-[#E2DFC2]">
                    <Maximize2 className="w-3.5 h-3.5 text-[#B38F4E]" />
                    <span>{activeSuite.sizeSqM} m²</span>
                  </div>

                  <div className="flex items-center space-x-1.5 bg-[#F4F3EF] px-3 py-1.5 rounded-lg border border-[#E2DFC2]">
                    <Users className="w-3.5 h-3.5 text-[#B38F4E]" />
                    <span>{activeSuite.capacity}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 bg-[#F4F3EF] px-3 py-1.5 rounded-lg border border-[#E2DFC2]">
                    <BedDouble className="w-3.5 h-3.5 text-[#B38F4E]" />
                    <span>{activeSuite.bedType}</span>
                  </div>
                </div>

                {/* Servicios de la habitación Heading & Checklist */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-josefin text-sm font-bold text-[#1C1917] tracking-wide">
                    Servicios de la habitación:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-josefin text-[#1C1917] font-semibold">
                    {activeSuite.features.map((featureText, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2 text-[#1C1917]">
                        <Check className="w-3.5 h-3.5 text-[#B38F4E] flex-shrink-0" />
                        <span>{featureText}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Reserve Button Row */}
              <div className="pt-6 border-t border-[#E2DFC2] flex items-center justify-between gap-4">
                <div>
                  <span className="font-josefin text-2xl font-bold text-[#1C1917]">
                    S/ {activeSuite.pricePerNight}
                  </span>
                  <span className="text-[10px] font-josefin uppercase text-[#8C7A6B] block">
                    POR NOCHE
                  </span>
                </div>

                <button
                  id={`suite-main-reserve-btn-${activeSuite.id}`}
                  onClick={() => onOpenBooking(activeSuite.id)}
                  className="px-8 py-3.5 rounded-xl bg-[#B38F4E] hover:bg-[#96753B] text-white font-josefin text-sm tracking-wider font-bold uppercase transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Reservar</span>
                </button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
              <img
                src={activeSuite.gallery[activePhotoIdx] || activeSuite.mainImage}
                alt={activeSuite.name}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />

              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all border border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextPhoto}
                className="absolute right-4 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all border border-white/20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};