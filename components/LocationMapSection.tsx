'use client';

import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Instagram, Facebook, Compass, Navigation } from 'lucide-react';
import { HOTEL_INFO } from '@/data/hotelData';
import { WhatsAppIcon, TikTokIcon } from '@/components/SocialIcons';

export const LocationMapSection: React.FC = () => {
  return (
    <section id="ubicacion" className="py-24 sm:py-32 bg-[#FAF9F6] border-t border-[#E2DFC2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EF] border border-[#E2DFC2] text-xs font-josefin tracking-[0.25em] text-[#8C7A6B] uppercase font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#B38F4E]" />
            <span>UBICACIÓN & CÓMO LLEGAR</span>
          </div>

          <h2 className="font-josefin text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            En el Corazón de Ayacucho
          </h2>

          <p className="font-serif-luxury text-base sm:text-lg text-[#665A4F] leading-relaxed">
            Estratégicamente ubicado para recorrer las iglesias virreinales, talleres de artesanos y miradores históricos de la noble ciudad de Ayacucho.
          </p>
        </div>

        {/* Main Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Info Cards & Social Links Bento Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address & Hours Bento Card */}
            <div className="bento-card p-8 space-y-6">
              
              {/* Hotel Name Title */}
              <div>
                <span className="text-[10px] font-josefin tracking-[0.3em] uppercase text-[#B38F4E] font-bold block mb-1">
                  HOSTAL BOUTIQUE
                </span>
                <h3 className="font-josefin text-2xl font-bold text-[#1C1917]">
                  8RETABLOZ AYACUCHO
                </h3>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#E2DFC2]">
                
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#F4F3EF] text-[#B38F4E] flex-shrink-0 mt-0.5 border border-[#E2DFC2]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-josefin tracking-wider uppercase text-[#8C7A6B] font-bold block">
                      DIRECCIÓN EXACTA
                    </span>
                    <span className="font-josefin text-sm sm:text-base font-semibold text-[#1C1917] block">
                      {HOTEL_INFO.address}
                    </span>
                  </div>
                </div>

                {/* Schedules */}
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#F4F3EF] text-[#B38F4E] flex-shrink-0 mt-0.5 border border-[#E2DFC2]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-josefin tracking-wider uppercase text-[#8C7A6B] font-bold block">
                      HORARIOS DE ATENCIÓN
                    </span>
                    <span className="font-josefin text-sm font-semibold text-[#1C1917] block">
                      {HOTEL_INFO.checkInCheckOut}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#F4F3EF] text-[#B38F4E] flex-shrink-0 mt-0.5 border border-[#E2DFC2]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-josefin tracking-wider uppercase text-[#8C7A6B] font-bold block">
                      TELÉFONO & RESERVAS
                    </span>
                    <a
                      href={`tel:${HOTEL_INFO.phone}`}
                      className="font-josefin text-sm font-bold text-[#1C1917] hover:text-[#B38F4E] transition-colors block"
                    >
                      {HOTEL_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

              </div>

              {/* Direct Route Button */}
              <a
                id="google-maps-directions-btn"
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-josefin tracking-[0.2em] font-bold uppercase hover:bg-[#B38F4E] transition-all flex items-center justify-center space-x-2 shadow-md group"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
                <span>CÓMO LLEGAR EN GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/70" />
              </a>

            </div>

            {/* Social Media Redes Bento Card */}
            <div className="bento-card p-6 space-y-4">
              <span className="text-[10px] font-josefin tracking-[0.25em] text-[#8C7A6B] font-bold uppercase block">
                NUESTRAS REDES SOCIALES
              </span>

              <div className="grid grid-cols-2 gap-3">
                {/* Facebook */}
                <a
                  id="social-fb-btn"
                  href={HOTEL_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#F4F3EF] hover:bg-[#1C1917] hover:text-[#FAF8F5] text-[#1C1917] border border-[#E2DFC2] transition-all flex items-center space-x-3 group"
                >
                  <Facebook className="w-4 h-4 text-[#B38F4E] group-hover:text-[#D4AF37]" />
                  <span className="text-xs font-josefin font-bold tracking-wider">Facebook</span>
                </a>

                {/* Instagram */}
                <a
                  id="social-ig-btn"
                  href={HOTEL_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#F4F3EF] hover:bg-[#1C1917] hover:text-[#FAF8F5] text-[#1C1917] border border-[#E2DFC2] transition-all flex items-center space-x-3 group"
                >
                  <Instagram className="w-4 h-4 text-[#B38F4E] group-hover:text-[#D4AF37]" />
                  <span className="text-xs font-josefin font-bold tracking-wider">Instagram</span>
                </a>

                {/* WhatsApp */}
                <a
                  id="social-wtsp-btn"
                  href={HOTEL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white text-[#1C1917] border border-[#25D366]/30 transition-all flex items-center space-x-3 group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                  <span className="text-xs font-josefin font-bold tracking-wider">WhatsApp</span>
                </a>

                {/* TikTok */}
                <a
                  id="social-tiktok-btn"
                  href={HOTEL_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#F4F3EF] hover:bg-[#1C1917] hover:text-[#FAF8F5] text-[#1C1917] border border-[#E2DFC2] transition-all flex items-center space-x-3 group"
                >
                  <TikTokIcon className="w-4 h-4 text-[#B38F4E] group-hover:text-[#D4AF37]" />
                  <span className="text-xs font-josefin font-bold tracking-wider">TikTok</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right: Interactive Google Map Container (7 cols) */}
          <div className="lg:col-span-7 bento-card p-3 sm:p-4 overflow-hidden relative flex flex-col justify-between min-h-[420px] shadow-lg">
            <div className="w-full h-full min-h-[380px] rounded-2xl overflow-hidden relative border border-[#E2DFC2]">
              <iframe
                title="Google Maps Location Hostal Boutique 8Retabloz"
                src={HOTEL_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-2xl"
              />

              {/* Overlay Badge on Map */}
              <div className="absolute top-4 left-4 z-10 glass-panel p-3.5 rounded-2xl max-w-xs shadow-md border border-[#E2DFC2]">
                <div className="flex items-center space-x-2 text-[10px] font-josefin tracking-wider text-[#B38F4E] font-bold uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[#B38F4E]" />
                  <span>Ubicación Confirmada</span>
                </div>
                <p className="font-josefin text-xs font-bold text-[#1C1917] mt-1">
                  Avenida Las Retamas 19, Ayacucho 05001
                </p>
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-josefin text-[#B38F4E] hover:underline font-semibold mt-1"
                >
                  <span>Abrir mapa completo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};