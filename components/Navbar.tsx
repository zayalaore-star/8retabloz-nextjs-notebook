'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HOTEL_INFO } from '@/data/hotelData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: (suiteId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'ES' | 'EN'>('ES');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'estancias', label: 'Estancias' },
    { id: 'tarifas-calendario', label: 'Tarifario' },
    { id: 'guia-turistica', label: 'Guía Turística' },
    { id: 'galeria', label: 'Galería' },
    { id: 'experiencias', label: 'Experiencias' },
    { id: 'historia', label: 'Historia' },
    { id: 'ubicacion', label: 'Ubicación' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 glass-panel shadow-sm border-b border-[#D4C5B9]/40'
          : 'py-6 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            id="nav-logo-btn"
            onClick={() => onNavigate('inicio')}
            className="group flex flex-col items-start text-left focus:outline-none"
          >
            <span className="font-josefin text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#1C1917] group-hover:text-[#B38F4E] transition-colors duration-300">
              {HOTEL_INFO.name}
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#8C7A6B] font-semibold font-josefin">
              {HOTEL_INFO.location}
            </span>
          </button>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs tracking-[0.18em] uppercase font-josefin font-medium transition-colors duration-300 ${
                    isActive ? 'text-[#1C1917] font-semibold' : 'text-[#665A4F] hover:text-[#1C1917]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-[#B38F4E]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-3.5">
            <button
              id="nav-lang-btn"
              onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
              className="text-[11px] font-josefin tracking-widest font-semibold text-[#8C7A6B] hover:text-[#1C1917] px-2 py-1 transition-colors"
            >
              {lang}
            </button>

            {/* <button
              id="nav-booking-btn"
              onClick={() => onOpenBooking()}
              className="relative inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#1C1917] text-[#FAF8F5] font-josefin text-xs tracking-[0.2em] font-medium hover:bg-[#B38F4E] transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>RESERVAR</span>
            </button> */}
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#1C1917] focus:outline-none"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-[#D4C5B9]/40 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-6 space-y-4">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between text-left py-2 border-b border-[#E7DFD5]/50 text-sm font-josefin tracking-[0.18em] uppercase ${
                      activeSection === item.id ? 'text-[#B38F4E] font-semibold' : 'text-[#1C1917]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#8C7A6B]" />
                  </button>
                ))}
              </nav>

              <div className="pt-2 flex items-center justify-between">
                <button
                  id="mobile-lang-toggle"
                  onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
                  className="text-xs font-josefin tracking-widest text-[#665A4F] uppercase border border-[#D4C5B9] px-3 py-1.5 rounded-full"
                >
                  Idioma: <span className="font-bold text-[#1C1917]">{lang}</span>
                </button>

                <button
                  id="mobile-booking-drawer-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="flex-1 ml-4 py-3 bg-[#1C1917] text-[#FAF8F5] rounded-full text-xs font-josefin tracking-[0.2em] font-medium text-center shadow-sm"
                >
                  RESERVAR ESTANCIA
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
