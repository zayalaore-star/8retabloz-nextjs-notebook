'use client';

import React, { useState } from 'react';
import { HOTEL_INFO } from '@/data/hotelData';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Navigation, ExternalLink, Send, Check } from 'lucide-react';
import { WhatsAppIcon, TikTokIcon } from '@/components/SocialIcons';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="main-footer" className="bg-[#1C1917] text-[#FAF8F5] pt-20 pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-12 border-b border-white/10">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 bento-card-dark p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-josefin text-2xl font-bold tracking-[0.2em] text-[#D4AF37] block">
                {HOTEL_INFO.name}
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E7DFD5]/70 block font-josefin">
                {HOTEL_INFO.subtitle}
              </span>

              <p className="font-serif-luxury text-sm text-[#E7DFD5]/80 leading-relaxed pt-1">
                {HOTEL_INFO.tagline}. Un refugio de serenidad y contemplación artística en el corazón de Ayacucho.
              </p>
            </div>

            {/* Social Network Badges */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[10px] font-josefin tracking-[0.2em] text-[#D4AF37] uppercase font-bold block">
                SÍGUENOS EN REDES
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={HOTEL_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#1C1917] transition-all text-[#E7DFD5]"
                  title="Facebook 8Retabloz"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={HOTEL_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#1C1917] transition-all text-[#E7DFD5]"
                  title="Instagram 8Retabloz"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={HOTEL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#25D366] hover:text-white transition-all text-[#E7DFD5]"
                  title="WhatsApp 8Retabloz"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a
                  href={HOTEL_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#1C1917] transition-all text-[#E7DFD5]"
                  title="TikTok 8Retabloz"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav Col (3 cols) */}
          <div className="lg:col-span-3 bento-card-dark p-8 space-y-3 font-josefin text-xs flex flex-col justify-between">
            <div>
              <span className="tracking-[0.2em] text-[#D4AF37] font-bold uppercase block mb-3">
                EXPLORAR
              </span>
              <ul className="space-y-2.5 text-[#E7DFD5]/80">
                <li>
                  <button id="footer-link-estancias" onClick={() => onNavigate('estancias')} className="hover:text-[#D4AF37] transition-colors">
                    Las 8 Estancias Retablo
                  </button>
                </li>
                <li>
                  <button id="footer-link-guia-turistica" onClick={() => onNavigate('guia-turistica')} className="hover:text-[#D4AF37] transition-colors font-bold text-[#D4AF37]">
                    Guía Turística "Ayacucho a todo color"
                  </button>
                </li>
                <li>
                  <button id="footer-link-galeria" onClick={() => onNavigate('galeria')} className="hover:text-[#D4AF37] transition-colors">
                    Galería Fotográfica Animada
                  </button>
                </li>
                <li>
                  <button id="footer-link-experiencias" onClick={() => onNavigate('experiencias')} className="hover:text-[#D4AF37] transition-colors">
                    Gastronomía & Cava Privada
                  </button>
                </li>
                <li>
                  <button id="footer-link-historia" onClick={() => onNavigate('historia')} className="hover:text-[#D4AF37] transition-colors">
                    Nuestra Historia & Misión
                  </button>
                </li>
                <li>
                  <button id="footer-link-reseñas" onClick={() => onNavigate('reseñas')} className="hover:text-[#D4AF37] transition-colors">
                    Reseñas & Testimonios
                  </button>
                </li>
                <li>
                  <button id="footer-link-ubicacion" onClick={() => onNavigate('ubicacion')} className="hover:text-[#D4AF37] transition-colors">
                    Ubicación & Google Maps
                  </button>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-white/10">
              <button id="footer-link-booking" onClick={onOpenBooking} className="text-[#D4AF37] font-bold tracking-wider uppercase hover:underline">
                Solicitud de Reserva Directa →
              </button>
            </div>
          </div>

          {/* Contact Col (5 cols) */}
          <div className="lg:col-span-5 bento-card-dark p-8 space-y-4 font-josefin text-xs flex flex-col justify-between">
            <div>
              <span className="tracking-[0.2em] text-[#D4AF37] font-bold uppercase block mb-3">
                UBICACIÓN & CONTACTO DIRECTO
              </span>
              <div className="space-y-3 text-[#E7DFD5]/90">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">{HOTEL_INFO.address}</span>
                    <span className="text-[10px] text-[#E7DFD5]/60">{HOTEL_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="font-semibold">{HOTEL_INFO.checkInCheckOut}</span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <a href={`tel:${HOTEL_INFO.phone}`} className="font-bold hover:text-[#D4AF37] transition-colors">
                    {HOTEL_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Button */}
            <div className="pt-4 border-t border-white/10">
              <a
                id="footer-google-maps-btn"
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#D4AF37] text-[#1C1917] text-xs font-bold tracking-wider uppercase hover:bg-white transition-all flex items-center justify-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Ver Ubicación en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-josefin text-[#E7DFD5]/50 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} {HOTEL_INFO.name}. Todos los derechos reservados.
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">Avenida Las Retamas 19, Ayacucho</span>
            <a href={HOTEL_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37]">
              Google Maps
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};