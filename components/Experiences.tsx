'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Calendar, ChevronRight, Utensils, Compass, Award } from 'lucide-react';
import { HOTEL_EXPERIENCES } from '@/data/hotelData';
import { HotelExperience } from '@/types';

interface ExperiencesProps {
  onOpenBooking: () => void;
}

export const Experiences: React.FC<ExperiencesProps> = ({ onOpenBooking }) => {
  const [selectedExp, setSelectedExp] = useState<HotelExperience | null>(null);

  return (
    <section id="experiencias" className="py-24 sm:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E7DFD5]/60 border border-[#D4C5B9]/60 text-xs font-josefin tracking-[0.25em] text-[#8C7A6B] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#B38F4E]" />
            <span>EXPERIENCIAS DE AUTOR</span>
          </div>

          <h2 className="font-josefin text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Gastronomía & Rituales Privados
          </h2>

          <p className="font-serif-luxury text-lg sm:text-xl italic text-[#665A4F]">
            Momento inolvidables diseñados a la medida en los rincones históricos más exclusivos del hotel.
          </p>
        </div>

        {/* Experience Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOTEL_EXPERIENCES.map((exp, idx) => {
            const isWide = idx === 0 || idx === 3;
            const spanClass = isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1';
            const aspectClass = isWide ? 'aspect-[16/9]' : 'aspect-[4/3]';

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedExp(exp)}
                className={`group cursor-pointer bento-card overflow-hidden flex flex-col justify-between ${spanClass}`}
              >
                <div>
                  {/* Image Header */}
                  <div className={`relative ${aspectClass} overflow-hidden`}>
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-md text-[10px] font-josefin tracking-[0.2em] text-[#D4AF37] uppercase border border-white/10 font-semibold">
                        {exp.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-[#FAF8F5]">
                      <div className="flex items-center space-x-1.5 text-[11px] font-josefin text-[#E7DFD5]">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 space-y-3">
                    <span className="text-[10px] font-josefin tracking-[0.2em] text-[#8C7A6B] uppercase block">
                      {exp.subtitle}
                    </span>

                    <h3 className="font-josefin text-2xl font-bold text-[#1C1917] group-hover:text-[#B38F4E] transition-colors">
                      {exp.title}
                    </h3>

                    <p className="font-serif-luxury text-sm sm:text-base text-[#665A4F] line-clamp-3 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    id={`exp-details-btn-${exp.id}`}
                    className="w-full py-3 rounded-full border border-[#E2DFC2] text-[#1C1917] text-xs font-josefin tracking-[0.18em] uppercase font-semibold group-hover:bg-[#1C1917] group-hover:text-[#FAF8F5] group-hover:border-[#1C1917] transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>MÁS INFORMACIÓN</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#FAF8F5] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#D4C5B9]/60"
            >
              <div className="relative aspect-[16/9]">
                <img src={selectedExp.image} alt={selectedExp.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-[#FAF8F5]">
                  <span className="text-xs font-josefin tracking-[0.25em] text-[#D4AF37] uppercase block">
                    {selectedExp.tag} • {selectedExp.duration}
                  </span>
                  <h3 className="font-josefin text-2xl sm:text-3xl font-bold">{selectedExp.title}</h3>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="font-serif-luxury text-base sm:text-lg text-[#665A4F] leading-relaxed">
                  {selectedExp.description}
                </p>

                <div className="p-4 rounded-2xl bg-[#F4EFEA] border border-[#D4C5B9]/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-josefin tracking-widest text-[#8C7A6B] uppercase block">Servicio Concierge</span>
                    <span className="font-josefin text-sm font-bold text-[#1C1917]">Reserva Privada con 24h de anticipación</span>
                  </div>
                  <Award className="w-6 h-6 text-[#B38F4E]" />
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <button
                    id="exp-modal-close-btn"
                    onClick={() => setSelectedExp(null)}
                    className="px-6 py-3 rounded-full border border-[#D4C5B9] text-[#1C1917] font-josefin text-xs tracking-wider uppercase font-semibold"
                  >
                    CERRAR
                  </button>

                  <button
                    id="exp-modal-book-btn"
                    onClick={() => {
                      setSelectedExp(null);
                      onOpenBooking();
                    }}
                    className="flex-1 py-3 px-6 bg-[#1C1917] hover:bg-[#B38F4E] text-[#FAF8F5] rounded-full text-xs font-josefin tracking-[0.2em] font-bold uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span>INCLUIR EN RESERVA</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};