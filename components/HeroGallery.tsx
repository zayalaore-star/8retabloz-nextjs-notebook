'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Bus,
  Utensils,
  Wifi,
  Coffee,
  ShieldCheck,
} from 'lucide-react';
import { HOTEL_INFO, getWhatsAppUrl } from '@/data/hotelData';

interface HeroGalleryProps {
  onSelectSuite: (suiteId: string) => void;
  onOpenBooking: (suiteId?: string) => void;
  onExploreGallery: () => void;
  onNavigate?: (sectionId: string) => void;
}

interface HotelArea {
  id: string;
  title: string;
  photoCount: string;
  mainImage: string;
  gallery: { url: string; caption: string }[];
  description: string;
}

const HOTEL_AREAS: HotelArea[] = [
  {
    id: 'patio',
    title: 'Patio Colonial',
    photoCount: '1/11',
    mainImage:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    description:
      'Corazón al aire libre con arquería virreinal, vegetación nativa y mesas de lectura rodeadas de serenidad.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        caption: 'Patio central al atardecer con sombrillas y faroles cálidos.',
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
        caption: 'Arquería colonial de piedra de cantera esculpida.',
      },
      {
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
        caption: 'Espejo de agua y vegetación en el Patio Sur.',
      },
    ],
  },
  {
    id: 'restaurante',
    title: 'Restaurante & Cava',
    photoCount: '1/47',
    mainImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    description:
      'Fusión gastronómica ayacuchana, café de especialidad de la selva central y cava subterránea de guarda.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
        caption: 'Restaurante El Retablo con vigas de madera noble y calidez de hogar.',
      },
      {
        url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=85',
        caption: 'Desayuno gourmet preparado con insumos locales frescos.',
      },
      {
        url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
        caption: 'Cava de vinos y destilados bajo arcos de cantera.',
      },
    ],
  },
  {
    id: 'fachada',
    title: 'Fachada & Entrada',
    photoCount: '1/5',
    mainImage:
      'https://res.cloudinary.com/dqdzahaup/image/upload/v1787505489/retablos1v/Cochera_lbqlmz.webp',
    description:
      'Casona histórica restaurada respetando la arquitectura tradicional de Huamanga.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
        caption: 'Entrada principal sobre Av. Las Retamas iluminada al caer la noche.',
      },
      {
        url: 'https://res.cloudinary.com/dqdzahaup/image/upload/v1787505497/retablos1v/FACHADA_1_zdppq2.webp',
        caption: 'Detalles de portón de madera tallada a mano.',
      },
      {
        url: 'https://res.cloudinary.com/dqdzahaup/image/upload/v1787505497/retablos1v/FACHADA_2_qbb8sh.webp',
        caption: 'Detalles de portón de madera tallada a mano.',
      },{
        url: 'https://res.cloudinary.com/dqdzahaup/image/upload/v1787505497/retablos1v/FACHADA_3_qslvwg.webp',
        caption: 'Detalles de portón de madera tallada a mano.',
      },
    ],
  },
  {
    id: 'recepcion',
    title: 'Recepción 24/7',
    photoCount: '1/7',
    mainImage:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
    description:
      'Atención cálida y personalizada con servicio de concierge, bienvenida tradicional con mate de muña e infusión.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
        caption: 'Área de recepción con acabados en madera y retablos ayacuchanos.',
      },
      {
        url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85',
        caption: 'Lobby de bienvenida para descanso de viajeros.',
      },
    ],
  },
  {
    id: 'destinos',
    title: 'Destinos & Arte',
    photoCount: '1/13',
    mainImage:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
    description:
      'Colección permanente de retablos artesanales e itinerarios personalizados por Ayacucho.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85',
        caption: 'Galería viva de retablos ayacuchanos en los pasillos del hotel.',
      },
      {
        url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=85',
        caption: 'Exposición de arte regional y piezas de barro negro.',
      },
    ],
  },
];

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  onSelectSuite,
  onOpenBooking,
  onExploreGallery,
  onNavigate,
}) => {
  const [activeAreaModal, setActiveAreaModal] = useState<HotelArea | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('informacion');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false);

  const handleOpenAreaModal = (area: HotelArea) => {
    setActiveAreaModal(area);
    setModalImageIndex(0);
  };

  const handleTabClick = (tabId: string, sectionId?: string) => {
    setActiveTab(tabId);
    if (sectionId && onNavigate) {
      onNavigate(sectionId);
    } else if (sectionId) {
      const elem = document.getElementById(sectionId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-casa-andina-section" className="pt-24 sm:pt-28 pb-12 bg-[#FAF8F5] border-b border-[#E2DFC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-[#E2DFC2]/80">
          <div className="space-y-2">
            <span className="text-xs font-josefin tracking-[0.25em] text-[#C0392B] uppercase font-bold block">
              HOSTAL BOUTIQUE & GALERÍA VIVA
            </span>

            <h1 className="font-josefin text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] uppercase">
              8RETABLOZ AYACUCHO
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-josefin text-[#584E44] pt-1">
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-[#B38F4E] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C0392B]" />
                <span>{HOTEL_INFO.address}</span>
              </a>

              <span className="hidden sm:inline text-stone-300">|</span>

              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="flex items-center space-x-1.5 hover:text-[#B38F4E] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C0392B]" />
                <span>{HOTEL_INFO.phone}</span>
              </a>

              <span className="hidden sm:inline text-stone-300">|</span>

              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C0392B]" />
                <span>{HOTEL_INFO.checkInCheckOut}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-6 bg-[#F4F3EF] lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-[#E2DFC2] lg:border-none">
            <div className="text-left lg:text-right">
              <div className="text-[11px] font-josefin text-[#786C60] uppercase tracking-wider">
                Noche desde
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-josefin text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  S/ 160
                </span>
                <span className="text-xs font-josefin text-[#786C60]">
                  ($43 USD)
                </span>
              </div>
              <span className="text-[10px] font-josefin text-[#8C7A6B] block">
                + S/ 28 de IGV y servicios
              </span>
            </div>

            <button
              id="casa-andina-hero-reserve-btn"
              onClick={() => onOpenBooking()}
              className="px-8 py-3.5 bg-[#B38F4E] hover:bg-[#96753B] active:scale-95 text-white font-josefin text-xs font-bold uppercase tracking-[0.2em] rounded-xl shadow-md transition-all duration-300 flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-4">
          {HOTEL_AREAS.map((area, index) => (
            <div
              key={area.id}
              id={`hero-tile-${area.id}`}
              onClick={() => handleOpenAreaModal(area)}
              className={`relative group h-[180px] sm:h-[220px] rounded-2xl overflow-hidden cursor-pointer border border-[#E2DFC2] shadow-sm hover:shadow-xl transition-all duration-500 ${
                index < 2 ? 'md:col-span-3' : 'md:col-span-2'
              }`}
            >
              <img
                src={area.mainImage}
                alt={area.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 z-10">
                <h3 className="font-josefin text-lg sm:text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {area.title}
                </h3>
              </div>

              <div className="absolute bottom-4 right-4 z-10">
                <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-josefin tracking-wider">
                  <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{area.photoCount}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-b border-[#E2DFC2] pt-4">
          <nav className="flex items-center space-x-8 overflow-x-auto no-scrollbar font-josefin text-xs sm:text-sm font-semibold tracking-wider">
            <button
              id="tab-galeria"
              onClick={() => handleTabClick('galeria', 'galeria')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap uppercase ${
                activeTab === 'galeria'
                  ? 'border-[#C0392B] text-[#C0392B]'
                  : 'border-transparent text-[#665A4F] hover:text-[#1C1917]'
              }`}
            >
              Galería
            </button>
            <button
              id="tab-informacion"
              onClick={() => handleTabClick('informacion')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap uppercase ${
                activeTab === 'informacion'
                  ? 'border-[#C0392B] text-[#C0392B]'
                  : 'border-transparent text-[#665A4F] hover:text-[#1C1917]'
              }`}
            >
              Información del hotel
            </button>
            <button
              id="tab-habitaciones"
              onClick={() => handleTabClick('habitaciones', 'estancias')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap uppercase ${
                activeTab === 'habitaciones'
                  ? 'border-[#C0392B] text-[#C0392B]'
                  : 'border-transparent text-[#665A4F] hover:text-[#1C1917]'
              }`}
            >
              Habitaciones
            </button>
            <button
              id="tab-experiencias"
              onClick={() => handleTabClick('experiencias', 'experiencias')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap uppercase ${
                activeTab === 'experiencias'
                  ? 'border-[#C0392B] text-[#C0392B]'
                  : 'border-transparent text-[#665A4F] hover:text-[#1C1917]'
              }`}
            >
              Restaurantes & Cava
            </button>
            <button
              id="tab-ubicacion"
              onClick={() => handleTabClick('ubicacion', 'ubicacion')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap uppercase ${
                activeTab === 'ubicacion'
                  ? 'border-[#C0392B] text-[#C0392B]'
                  : 'border-transparent text-[#665A4F] hover:text-[#1C1917]'
              }`}
            >
              Ubicación
            </button>
          </nav>
        </div>

        <div className="pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-josefin text-2xl font-bold text-[#1C1917]">
                Información del hotel
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#584E44] leading-relaxed">
                Hostal Boutique 8Retabloz Ayacucho se encuentra estratégicamente ubicado en el corazón del Centro Histórico de Ayacucho y ofrece la ubicación perfecta para recorrer a pie la ciudad y conocer los principales atractivos turísticos. Sus estancias, inspiradas en el arte de los retablos ayacuchanos, combinan confort y calidez, mientras que sus acogedoras instalaciones garantizan una estancia placentera. Además, su restaurante cuenta con las mejores preparaciones de la fusión de sabores locales e internacionales.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id="info-pill-traslados"
                  onClick={() => setIsTransferModalOpen(true)}
                  className="px-5 py-2.5 rounded-full border border-[#B38F4E] text-[#1C1917] hover:bg-[#B38F4E] hover:text-white transition-all text-xs font-josefin font-semibold flex items-center space-x-2"
                >
                  <Bus className="w-3.5 h-3.5 text-[#B38F4E] group-hover:text-white" />
                  <span>Traslados</span>
                </button>
                <button
                  id="info-pill-ubicacion"
                  onClick={() => handleTabClick('ubicacion', 'ubicacion')}
                  className="px-5 py-2.5 rounded-full border border-[#B38F4E] text-[#1C1917] hover:bg-[#B38F4E] hover:text-white transition-all text-xs font-josefin font-semibold flex items-center space-x-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B38F4E]" />
                  <span>Ubicación</span>
                </button>
                <a
                  href={getWhatsAppUrl('Hola Hostal Boutique 8Retabloz, deseo consultar sobre traslados y atención de concierge.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#25D366] text-white hover:bg-[#1eb756] transition-all text-xs font-josefin font-semibold flex items-center space-x-2 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Atención WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 bg-[#F4F3EF] p-6 rounded-2xl border border-[#E2DFC2] space-y-3">
              <h3 className="font-josefin text-sm font-bold text-[#1C1917] uppercase tracking-wider border-b border-[#E2DFC2] pb-2">
                Servicios Destacados
              </h3>
              <ul className="space-y-2.5 text-xs font-josefin text-[#584E44]">
                <li className="flex items-center space-x-2.5">
                  <Coffee className="w-4 h-4 text-[#B38F4E] flex-shrink-0" />
                  <span>Desayuno Ayacuchano gourmet incluido</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Wifi className="w-4 h-4 text-[#B38F4E] flex-shrink-0" />
                  <span>WiFi 6 de alta velocidad en todo el hotel</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Utensils className="w-4 h-4 text-[#B38F4E] flex-shrink-0" />
                  <span>Restaurante & Cava de degustación</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#B38F4E] flex-shrink-0" />
                  <span>Custodia de equipaje & Seguridad 24h</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeAreaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          >
            <div className="relative w-full max-w-4xl bg-[#1C1917] rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-josefin tracking-[0.25em] text-[#D4AF37] uppercase block">
                    GALERÍA DE INSTALACIONES
                  </span>
                  <h3 className="font-josefin text-xl font-bold">{activeAreaModal.title}</h3>
                </div>
                <button
                  onClick={() => setActiveAreaModal(null)}
                  className="p-2 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[420px]">
                <img
                  src={activeAreaModal.gallery[modalImageIndex].url}
                  alt={activeAreaModal.title}
                  className="max-h-[60vh] max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
                {activeAreaModal.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setModalImageIndex((prev) =>
                          prev === 0 ? activeAreaModal.gallery.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 p-3 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setModalImageIndex((prev) => (prev + 1) % activeAreaModal.gallery.length)
                      }
                      className="absolute right-4 p-3 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="p-4 bg-[#26221F] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-josefin text-stone-300">
                <p className="italic text-center sm:text-left">
                  "{activeAreaModal.gallery[modalImageIndex].caption}"
                </p>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <span>
                    Foto {modalImageIndex + 1} de {activeAreaModal.gallery.length}
                  </span>
                  <button
                    onClick={() => {
                      setActiveAreaModal(null);
                      onOpenBooking();
                    }}
                    className="px-4 py-2 bg-[#B38F4E] hover:bg-[#D4AF37] text-white rounded-lg font-bold uppercase transition-all"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTransferModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E2DFC2] shadow-2xl space-y-4">
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#584E44] hover:bg-[#E2DFC2] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3 text-[#C0392B]">
                <Bus className="w-6 h-6" />
                <h3 className="font-josefin text-xl font-bold uppercase">
                  Servicio de Traslados
                </h3>
              </div>
              <p className="font-sans text-sm text-[#584E44] leading-relaxed">
                Coordinamos tu recepción privada desde y hacia el Aeropuerto Coronel FAP Alfredo Mendívil Duarte (AYP) y el Terrapuerto Municipal de Ayacucho.
              </p>
              <div className="bg-[#F4F3EF] p-4 rounded-xl space-y-2 text-xs font-josefin text-[#584E44]">
                <div className="flex items-center justify-between border-b border-[#E2DFC2] pb-2">
                  <span>Aeropuerto (AYP) → Hotel</span>
                  <span className="font-bold text-[#1C1917]">S/ 35 (Privado)</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E2DFC2] pb-2">
                  <span>Terrapuerto Bus → Hotel</span>
                  <span className="font-bold text-[#1C1917]">S/ 25 (Privado)</span>
                </div>
                <p className="text-[11px] text-[#8C7A6B] italic pt-1">
                  * Incluye recepción con letrero personalizado y asistencia de equipaje.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppUrl('Hola Hostal Boutique 8Retabloz, deseo solicitar el servicio de traslado aeropuerto/terrapuerto.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#25D366] text-white rounded-xl text-center font-josefin text-xs font-bold uppercase flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Coordinar por WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setIsTransferModalOpen(false);
                    onOpenBooking();
                  }}
                  className="px-6 py-3 bg-[#B38F4E] text-white rounded-xl font-josefin text-xs font-bold uppercase hover:bg-[#96753B] transition-colors"
                >
                  Reservar Estancia
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
