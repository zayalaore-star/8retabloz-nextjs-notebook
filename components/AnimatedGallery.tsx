'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  MapPin,
  Compass,
  Grid,
  Columns,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { GALLERY_PHOTOS } from '@/data/hotelData';
import { GalleryPhoto, RoomCategory } from '@/types';

interface AnimatedGalleryProps {
  onSelectSuite: (suiteId: string) => void;
  onOpenBooking: (suiteId?: string) => void;
}

export const AnimatedGallery: React.FC<AnimatedGalleryProps> = ({
  onSelectSuite,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RoomCategory | 'all'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [showDetails, setShowDetails] = useState<boolean>(true);

  // Filtered photos
  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const categories: { id: RoomCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'Todas las Fotografía', count: GALLERY_PHOTOS.length },
    { id: 'suite', label: '8 Estancias', count: GALLERY_PHOTOS.filter((p) => p.category === 'suite').length },
    { id: 'architecture', label: 'Arquitectura & Luz', count: GALLERY_PHOTOS.filter((p) => p.category === 'architecture').length },
    { id: 'gastronomy', label: 'Gastronomía & Cava', count: GALLERY_PHOTOS.filter((p) => p.category === 'gastronomy').length },
    { id: 'experience', label: 'Experiencias', count: GALLERY_PHOTOS.filter((p) => p.category === 'experience').length },
    { id: 'detail', label: 'Detalles Artesanales', count: GALLERY_PHOTOS.filter((p) => p.category === 'detail').length },
  ];

  // Open Lightbox
  const openLightbox = (photo: GalleryPhoto) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    setPhotoIndex(idx !== -1 ? idx : 0);
    setActivePhoto(photo);
  };

  const nextPhoto = () => {
    const nextIdx = (photoIndex + 1) % filteredPhotos.length;
    setPhotoIndex(nextIdx);
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  const prevPhoto = () => {
    const prevIdx = photoIndex === 0 ? filteredPhotos.length - 1 : photoIndex - 1;
    setPhotoIndex(prevIdx);
    setActivePhoto(filteredPhotos[prevIdx]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') setActivePhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, photoIndex, filteredPhotos]);

  return (
    <section id="galeria" className="py-24 sm:py-32 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Background Subtle Watermark */}
      <div className="absolute top-12 right-0 translate-x-1/3 opacity-[0.03] select-none pointer-events-none">
        <span className="font-josefin text-[240px] font-bold tracking-[0.2em] text-[#1C1917]">
          8RETABLOZ
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E7DFD5]/60 border border-[#D4C5B9]/60 text-xs font-josefin tracking-[0.25em] text-[#8C7A6B] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#B38F4E]" />
            <span>GALERÍA FOTOGRÁFICA ANIMADA</span>
          </div>

          <h2 className="font-josefin text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Transiciones de Luz & Arquitectura
          </h2>

          <p className="font-serif-luxury text-lg sm:text-xl italic text-[#665A4F] leading-relaxed">
            Explora de manera fluida cada espacio del hotel, donde la luz del bajío abraza la cantera barroca y las texturas artesanales.
          </p>
        </div>

        {/* Filter Controls & View Mode Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-[#D4C5B9]/40 pb-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`gallery-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-josefin tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-sm'
                      : 'bg-[#F4EFEA] text-[#665A4F] hover:bg-[#E7DFD5] hover:text-[#1C1917]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-1.5 text-[10px] opacity-70 ${isActive ? 'text-[#D4AF37]' : ''}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-[#F4EFEA] p-1.5 rounded-full border border-[#D4C5B9]/60">
            <button
              id="view-mode-grid-btn"
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-josefin tracking-wider uppercase transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#FAF8F5] text-[#1C1917] shadow-sm font-semibold'
                  : 'text-[#8C7A6B] hover:text-[#1C1917]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Mosaico</span>
            </button>

            <button
              id="view-mode-carousel-btn"
              onClick={() => setViewMode('carousel')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-josefin tracking-wider uppercase transition-all ${
                viewMode === 'carousel'
                  ? 'bg-[#FAF8F5] text-[#1C1917] shadow-sm font-semibold'
                  : 'text-[#8C7A6B] hover:text-[#1C1917]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Cinefilm</span>
            </button>
          </div>

        </div>

        {/* Animated Photo Bento Grid */}
        {viewMode === 'grid' ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredPhotos.map((photo, idx) => {
                // Determine Bento span pattern for visual rhythm
                const isFeaturedWide = idx % 5 === 0 || idx % 5 === 3;
                const colSpanClass = isFeaturedWide
                  ? 'sm:col-span-2 lg:col-span-2'
                  : 'col-span-1';
                const aspectClass = isFeaturedWide ? 'aspect-[16/9]' : 'aspect-[4/3]';

                return (
                  <motion.div
                    layout
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    onClick={() => openLightbox(photo)}
                    className={`group relative cursor-pointer bento-card overflow-hidden ${colSpanClass}`}
                  >
                    {/* Photo Image with Hover Zoom */}
                    <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                      {/* Category Label */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-md border border-white/10 text-[10px] font-josefin tracking-[0.2em] text-[#D4AF37] uppercase font-semibold">
                          {photo.categoryLabel}
                        </span>
                      </div>

                      {/* Zoom Icon Button */}
                      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-[#1C1917] transition-all">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Card Content Footer */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-[#FAF8F5]">
                        <div className="flex items-center space-x-2 text-[11px] font-josefin tracking-widest text-[#D4AF37] mb-1">
                          <MapPin className="w-3 h-3" />
                          <span>{photo.location}</span>
                        </div>

                        <h3 className="font-josefin text-xl sm:text-2xl font-bold tracking-tight text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors">
                          {photo.title}
                        </h3>

                        <p className="font-serif-luxury text-sm italic text-[#E7DFD5] line-clamp-1 mt-1 opacity-90">
                          {photo.architecturalNote}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Carousel Cinefilm View Mode */
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo)}
                  className="flex-none w-[320px] sm:w-[450px] snap-center cursor-pointer group rounded-2xl overflow-hidden bg-[#1C1917] border border-[#D4C5B9]/40 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-[#FAF8F5]">
                      <span className="text-[10px] font-josefin tracking-[0.2em] uppercase text-[#D4AF37] block">
                        {photo.subtitle}
                      </span>
                      <h3 className="font-josefin text-lg font-bold">{photo.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Animated Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/95 backdrop-blur-xl p-4 sm:p-8"
          >
            {/* Top Close & Controls Bar */}
            <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between text-[#FAF8F5]">
              <div className="flex items-center space-x-3">
                <span className="font-josefin text-sm font-bold tracking-[0.25em] text-[#D4AF37]">
                  8RETABLOZ
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs font-josefin text-[#E7DFD5] tracking-wider">
                  FOTO {photoIndex + 1} DE {filteredPhotos.length}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  id="lightbox-toggle-info-btn"
                  onClick={() => setShowDetails(!showDetails)}
                  className={`p-2.5 rounded-full border transition-all ${
                    showDetails ? 'bg-[#B38F4E] border-[#B38F4E] text-[#FAF8F5]' : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                  title="Detalles de Arquitectura"
                >
                  <Info className="w-4 h-4" />
                </button>

                <button
                  id="lightbox-close-btn"
                  onClick={() => setActivePhoto(null)}
                  className="p-2.5 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
                  aria-label="Cerrar vista completa"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Lightbox Content Area */}
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center pt-16 pb-24">
              
              {/* Prev Button */}
              <button
                id="lightbox-prev-btn"
                onClick={prevPhoto}
                className="absolute left-2 sm:left-4 z-40 p-3 rounded-full glass-dark-panel text-white hover:bg-white hover:text-[#1C1917] transition-all shadow-xl"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Photo Image Frame */}
              <motion.div
                key={activePhoto.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative max-h-full max-w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              >
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="max-h-[75vh] max-w-full object-contain rounded-xl select-none"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Next Button */}
              <button
                id="lightbox-next-btn"
                onClick={nextPhoto}
                className="absolute right-2 sm:right-4 z-40 p-3 rounded-full glass-dark-panel text-white hover:bg-white hover:text-[#1C1917] transition-all shadow-xl"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Architectural Details Side/Bottom Card */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="absolute bottom-2 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-md z-30 glass-dark-panel p-6 rounded-2xl border border-white/15 text-[#FAF8F5] shadow-2xl"
                  >
                    <span className="text-[10px] font-josefin tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
                      {activePhoto.categoryLabel} • {activePhoto.location}
                    </span>

                    <h3 className="font-josefin text-2xl font-bold text-[#FAF8F5]">
                      {activePhoto.title}
                    </h3>

                    <p className="font-serif-luxury text-sm italic text-[#E7DFD5] mt-2 leading-relaxed">
                      "{activePhoto.architecturalNote}"
                    </p>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                      {activePhoto.suiteId ? (
                        <button
                          id="lightbox-go-to-suite-btn"
                          onClick={() => {
                            const sid = activePhoto.suiteId;
                            setActivePhoto(null);
                            if (sid) onSelectSuite(sid);
                          }}
                          className="px-4 py-2 rounded-full bg-[#B38F4E] hover:bg-[#D4AF37] text-[#FAF8F5] text-xs font-josefin tracking-wider uppercase font-semibold transition-all flex items-center space-x-1.5"
                        >
                          <span>VER ESTANCIA</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          id="lightbox-booking-btn"
                          onClick={() => {
                            setActivePhoto(null);
                            onOpenBooking();
                          }}
                          className="px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#D4AF37] text-[#1C1917] text-xs font-josefin tracking-wider uppercase font-bold transition-all"
                        >
                          RESERVAR HOTEL
                        </button>
                      )}

                      <span className="text-[10px] font-josefin text-white/50 tracking-widest uppercase">
                        HOTEL 8RETABLOZ
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Bottom Lightbox Thumbnail Ribbon */}
            <div className="absolute bottom-4 left-6 right-6 z-40 flex items-center justify-center">
              <div className="flex items-center space-x-2 overflow-x-auto p-2 glass-dark-panel rounded-full border border-white/15 max-w-xl no-scrollbar">
                {filteredPhotos.map((p, idx) => {
                  const isCur = idx === photoIndex;
                  return (
                    <button
                      key={p.id}
                      id={`lightbox-thumb-${p.id}`}
                      onClick={() => {
                        setPhotoIndex(idx);
                        setActivePhoto(p);
                      }}
                      className={`relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 transition-all border ${
                        isCur ? 'border-[#D4AF37] scale-110 shadow-md ring-2 ring-[#D4AF37]/50' : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};