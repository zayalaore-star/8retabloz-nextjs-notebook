'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroGallery } from '@/components/HeroGallery';
import { SuitesSection } from '@/components/SuitesSection';
import { RatesCalendarSection } from '@/components/RatesCalendarSection';
import { AnimatedGallery } from '@/components/AnimatedGallery';
import { Experiences } from '@/components/Experiences';
import { ReviewsSection } from '@/components/ReviewsSection';
import { LocationMapSection } from '@/components/LocationMapSection';
import { BookingModal } from '@/components/BookingModal';
import { Footer } from '@/components/Footer';
import { getWhatsAppUrl } from '@/data/hotelData';
import { WhatsAppIcon } from '@/components/SocialIcons';

export default function HomePage() {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string | undefined>(undefined);
  const [selectedCheckIn, setSelectedCheckIn] = useState<string | undefined>(undefined);
  const [selectedCheckOut, setSelectedCheckOut] = useState<string | undefined>(undefined);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  const handleOpenBooking = (suiteId?: string, checkInDate?: string, checkOutDate?: string) => {
    if (suiteId) setSelectedSuiteId(suiteId);
    if (checkInDate) setSelectedCheckIn(checkInDate);
    if (checkOutDate) setSelectedCheckOut(checkOutDate);
    setIsBookingOpen(true);
  };

  React.useEffect(() => {
    const sectionIds = [
      'inicio',
      'estancias',
      'tarifas-calendario',
      'galeria',
      'experiencias',
      'historia',
      'guia-turistica',
      'ubicacion',
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0% -55% 0%',
        threshold: [0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <Navbar
        activeSection={activeSection}
        onNavigate={(sectionId) => {
          const elem = document.getElementById(sectionId);
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }}
        onOpenBooking={handleOpenBooking}
      />

      <main>
        <HeroGallery
          onSelectSuite={(suiteId) => setSelectedSuiteId(suiteId)}
          onOpenBooking={handleOpenBooking}
          onExploreGallery={() => {
            const elem = document.getElementById('galeria');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            setActiveSection('galeria');
          }}
          onNavigate={(sectionId) => {
            const elem = document.getElementById(sectionId);
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
          }}
        />

        <section id="estancias">
          <SuitesSection
            selectedSuiteId={selectedSuiteId}
            onSelectSuite={(suiteId) => setSelectedSuiteId(suiteId)}
            onOpenBooking={handleOpenBooking}
          />
        </section>

        <section id="tarifas-calendario">
          <RatesCalendarSection onOpenBooking={handleOpenBooking} />
        </section>

        <section id="galeria">
          <AnimatedGallery
            onSelectSuite={(suiteId) => setSelectedSuiteId(suiteId)}
            onOpenBooking={handleOpenBooking}
          />
        </section>

        <section id="experiencias">
          <Experiences onOpenBooking={handleOpenBooking} />
        </section>

        <section id="historia" className="space-y-6 border-t border-slate-200 px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Historia</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Un legado colonial y artístico</h2>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600">
              8Retabloz Ayacucho nació de la restauración cuidadosa de una casona histórica en el Centro Histórico. Cada espacio conserva la huella de la tradición local, con detalles artesanales, retablos pintados y mobiliario en madera de la región.
            </p>
          </div>
        </section>

        <section id="guia-turistica" className="space-y-6 border-t border-slate-200 px-6 py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Guía Turística</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Descubre Ayacucho con nosotros</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                { title: 'Rutas culturales', description: 'Itinerarios a pie por museos, plazas y mercados tradicionales.' },
                { title: 'Paseos arqueológicos', description: 'Excursiones guiadas a sitios cerámicos y miradores coloniales.' },
                { title: 'Experiencias locales', description: 'Talleres de artesanía, gastronomía y ceremonias tradicionales.' },
              ].map((item) => (
                <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ReviewsSection />

        <LocationMapSection />
      </main>

      <Footer
        onNavigate={(sectionId) => {
          const elem = document.getElementById(sectionId);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
          setActiveSection(sectionId);
        }}
        onOpenBooking={handleOpenBooking}
      />

      <BookingModal
        isOpen={isBookingOpen}
        preselectedSuiteId={selectedSuiteId}
        preselectedCheckIn={selectedCheckIn}
        preselectedCheckOut={selectedCheckOut}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={getWhatsAppUrl(
          'Hola Hostal Boutique 8Retabloz, deseo consultar sobre disponibilidad y tarifas de las estancias.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacto por WhatsApp"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center space-x-2 border-2 border-white group"
      >
        <WhatsAppIcon className="w-6 h-6 text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-josefin font-bold tracking-wider uppercase pr-1">
          WhatsApp
        </span>
      </a>
    </div>
  );
}