'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Building,
  Info
} from 'lucide-react';
import { HOTEL_SUITES, getWhatsAppUrl } from '@/data/hotelData';
import { HotelSuite } from '@/types';
import { WhatsAppIcon } from '@/components/SocialIcons';

interface BookingModalProps {
  isOpen: boolean;
  preselectedSuiteId?: string;
  preselectedCheckIn?: string;
  preselectedCheckOut?: string;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  preselectedSuiteId,
  preselectedCheckIn,
  preselectedCheckOut,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(
    preselectedSuiteId || HOTEL_SUITES[0].id
  );
  const [checkIn, setCheckIn] = useState<string>(preselectedCheckIn || '2025-05-15');
  const [checkOut, setCheckOut] = useState<string>(preselectedCheckOut || '2025-05-18');

  useEffect(() => {
    if (preselectedSuiteId) {
      setSelectedSuiteId(preselectedSuiteId);
    }
    if (preselectedCheckIn) {
      setCheckIn(preselectedCheckIn);
    }
    if (preselectedCheckOut) {
      setCheckOut(preselectedCheckOut);
    }
  }, [preselectedSuiteId, preselectedCheckIn, preselectedCheckOut, isOpen]);
  
  const [guests, setGuests] = useState<number>(2);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  // Guest contact details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  const currentSuite: HotelSuite =
    HOTEL_SUITES.find((s) => s.id === selectedSuiteId) || HOTEL_SUITES[0];

  // Calculate nights
  const calculateNights = (): number => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 3;
    } catch {
      return 3;
    }
  };

  const nights = calculateNights();

  const addOnOptions = [
    { id: 'transfer', name: 'Traslado Privado Aeropuerto (BJX / QRO)', price: 120 },
    { id: 'spa-ritual', name: 'Ritual Spa de Copal & Cacao (Pareja)', price: 240 },
    { id: 'cava-tasting', name: 'Cata de Vinos en Cava Subterránea', price: 180 },
    { id: 'fragrance', name: 'Personalización de Fragancia Botánica', price: 60 },
  ];

  const addOnsTotal = selectedAddOns.reduce((acc, id) => {
    const item = addOnOptions.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const roomSubtotal = currentSuite.pricePerNight * nights;
  const grandTotal = roomSubtotal + addOnsTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'RET-' + Math.floor(100000 + Math.random() * 900000);
    setReservationCode(code);
    setBookingConfirmed(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#D4C5B9]/60 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="px-8 py-6 bg-[#1C1917] text-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-josefin text-xl font-bold tracking-[0.2em] text-[#D4AF37]">
                8RETABLOZ
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs font-josefin tracking-wider uppercase text-[#E7DFD5]">
                SOLICITUD DE RESERVA EXCLUSIVA
              </span>
            </div>

            <button
              id="booking-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!bookingConfirmed ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Column: Form Steps (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                
                {/* Steps Breadcrumb */}
                <div className="flex items-center justify-between border-b border-[#D4C5B9]/40 pb-4 text-xs font-josefin">
                  <span className={`tracking-wider ${step === 1 ? 'font-bold text-[#1C1917]' : 'text-[#8C7A6B]'}`}>
                    1. ESTANCIA & FECHAS
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8C7A6B]" />
                  <span className={`tracking-wider ${step === 2 ? 'font-bold text-[#1C1917]' : 'text-[#8C7A6B]'}`}>
                    2. HUÉSPED & DETALLES
                  </span>
                </div>

                {step === 1 && (
                  <div className="space-y-5">
                    {/* Select Suite */}
                    <div>
                      <label className="text-xs font-josefin tracking-[0.2em] text-[#1C1917] font-bold uppercase block mb-2">
                        SELECCIONAR ESTANCIA
                      </label>
                      <select
                        id="booking-suite-select"
                        value={selectedSuiteId}
                        onChange={(e) => setSelectedSuiteId(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-[#F4EFEA] border border-[#D4C5B9] text-sm font-josefin text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B38F4E]"
                      >
                        {HOTEL_SUITES.map((suite) => (
                          <option key={suite.id} value={suite.id}>
                            Estancia {suite.number} — {suite.name} (${suite.pricePerNight} USD / Noche)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-josefin tracking-[0.15em] text-[#8C7A6B] uppercase block mb-1.5 font-semibold">
                          CHECK-IN
                        </label>
                        <input
                          id="booking-checkin-input"
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F4EFEA] border border-[#D4C5B9] text-xs font-josefin text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B38F4E]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-josefin tracking-[0.15em] text-[#8C7A6B] uppercase block mb-1.5 font-semibold">
                          CHECK-OUT
                        </label>
                        <input
                          id="booking-checkout-input"
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F4EFEA] border border-[#D4C5B9] text-xs font-josefin text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B38F4E]"
                        />
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="text-xs font-josefin tracking-[0.15em] text-[#8C7A6B] uppercase block mb-1.5 font-semibold">
                        NÚMERO DE HUÉSPEDES
                      </label>
                      <div className="flex items-center space-x-3">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuests(num)}
                            className={`flex-1 py-2.5 rounded-xl border text-xs font-josefin font-bold transition-all ${
                              guests === num
                                ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                                : 'bg-[#F4EFEA] text-[#665A4F] border-[#D4C5B9]'
                            }`}
                          >
                            {num} {num === 1 ? 'Huésped' : 'Huéspedes'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add-ons */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-josefin tracking-[0.15em] text-[#1C1917] font-bold uppercase block">
                        EXPERIENCIAS ADICIONALES (OPCIONAL)
                      </label>
                      <div className="space-y-2">
                        {addOnOptions.map((addon) => {
                          const isChecked = selectedAddOns.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => toggleAddOn(addon.id)}
                              className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs font-josefin transition-all ${
                                isChecked
                                  ? 'bg-[#B38F4E]/10 border-[#B38F4E] text-[#1C1917]'
                                  : 'bg-[#F4EFEA] border-[#D4C5B9]/60 text-[#665A4F]'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-[#B38F4E] border-[#B38F4E] text-white' : 'border-[#8C7A6B]'}`}>
                                  {isChecked && <CheckCircle2 className="w-3 h-3" />}
                                </div>
                                <span className="font-semibold">{addon.name}</span>
                              </div>
                              <span className="font-bold text-[#1C1917]">
                                +${addon.price} USD
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full py-3.5 bg-[#1C1917] hover:bg-[#B38F4E] text-[#FAF8F5] rounded-full text-xs font-josefin tracking-[0.2em] font-bold uppercase transition-all shadow-md"
                      >
                        CONTINUAR A DATOS DEL HUÉSPED
                      </button>
                    </div>

                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={handleConfirmReservation} className="space-y-4">
                    <div>
                      <label className="text-xs font-josefin tracking-[0.15em] text-[#8C7A6B] uppercase block mb-1 font-semibold">
                        NOMBRE COMPLETO *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Sofía Martínez"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-[#F4EFEA] border border-[#D4C5B9] text-xs font-josefin text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B38F4E]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-josefin tracking-[0.15em] text-[#8C7A6B] uppercase block mb-1 font-semibold">
                          CORREO ELECTRÓNICO *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="sofia@ejemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F4EFEA] border border-[#D4C5B9] text-xs font-josefin text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B38F4E]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-josefin tracking-[0.15em] text-[#8C7A6B] uppercase block mb-1 font-semibold">
                          TELÉFONO DE CONTACTO *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+52 55 1234 5678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F4EFEA] border border-[#D4C5B9] text-xs font-josefin text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B38F4E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-josefin tracking-[0.15em] text-[#8C7A6B] uppercase block mb-1 font-semibold">
                        NOTAS PARA EL CONCIERGE (OPCIONAL)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Restricciones alimenticias, motivo de estancia (aniversario, descanso), preferencia de almohada..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-[#F4EFEA] border border-[#D4C5B9] text-xs font-josefin text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B38F4E]"
                      />
                    </div>

                    <div className="flex items-center space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-3 rounded-full border border-[#D4C5B9] text-[#1C1917] text-xs font-josefin font-semibold uppercase"
                      >
                        VOLVER
                      </button>

                      <button
                        type="submit"
                        className="flex-1 py-3.5 bg-[#B38F4E] hover:bg-[#D4AF37] text-[#FAF8F5] rounded-full text-xs font-josefin tracking-[0.2em] font-bold uppercase transition-all shadow-md"
                      >
                        CONFIRMAR SOLICITUD DE RESERVA
                      </button>
                    </div>
                  </form>
                )}

              </div>

              {/* Right Column: Reservation Summary Card (5 cols) */}
              <div className="lg:col-span-5 bg-[#F4EFEA] p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-[#D4C5B9]/60 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="font-josefin text-xs tracking-[0.2em] uppercase font-bold text-[#1C1917]">
                    RESUMEN DE RESERVA
                  </h3>

                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#D4C5B9]">
                    <img src={currentSuite.mainImage} alt={currentSuite.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-josefin tracking-widest text-[#D4AF37] uppercase block">
                        ESTANCIA {currentSuite.number}
                      </span>
                      <p className="font-josefin text-base font-bold">{currentSuite.name}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-josefin text-[#665A4F] border-b border-[#D4C5B9]/60 pb-4">
                    <div className="flex justify-between">
                      <span>Fechas:</span>
                      <span className="font-semibold text-[#1C1917]">{checkIn} al {checkOut} ({nights} Noches)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Huéspedes:</span>
                      <span className="font-semibold text-[#1C1917]">{guests} Adultos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tarifa por noche:</span>
                      <span className="font-semibold text-[#1C1917]">${currentSuite.pricePerNight} USD</span>
                    </div>
                  </div>

                  {/* Cost breakdown */}
                  <div className="space-y-2 text-xs font-josefin">
                    <div className="flex justify-between text-[#665A4F]">
                      <span>Hospedaje ({nights} noches):</span>
                      <span>${roomSubtotal} USD</span>
                    </div>

                    {selectedAddOns.length > 0 && (
                      <div className="flex justify-between text-[#665A4F]">
                        <span>Experiencias adicionales:</span>
                        <span>+${addOnsTotal} USD</span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-bold text-[#1C1917] pt-2 border-t border-[#D4C5B9]/60">
                      <span>ESTIMADO TOTAL:</span>
                      <span className="text-[#B38F4E]">${grandTotal} USD</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#D4C5B9]/60 text-[11px] font-josefin text-[#8C7A6B] flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#B38F4E] flex-shrink-0" />
                  <span>Sin cargos inmediatos. El Concierge confirmará la disponibilidad en menos de 2 horas.</span>
                </div>

              </div>

            </div>
          ) : (
            /* Confirmation Screen */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#B38F4E]/10 border border-[#B38F4E] flex items-center justify-center mx-auto text-[#B38F4E]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-josefin tracking-[0.25em] text-[#B38F4E] uppercase font-bold block">
                  SOLICITUD ENVIADA CON ÉXITO
                </span>
                <h3 className="font-josefin text-3xl font-bold text-[#1C1917]">
                  ¡Gracias, {fullName}!
                </h3>
                <p className="font-serif-luxury text-base text-[#665A4F] max-w-md mx-auto">
                  Hemos registrado su solicitud para la <strong className="text-[#1C1917] font-sans">{currentSuite.name}</strong>. Nuestro equipo de Concierge se pondrá en contacto al correo <strong className="text-[#1C1917] font-sans">{email}</strong>.
                </p>
              </div>

              <div className="p-6 max-w-md mx-auto rounded-2xl bg-[#F4EFEA] border border-[#D4C5B9]/60 space-y-2">
                <span className="text-[10px] font-josefin tracking-widest text-[#8C7A6B] uppercase block font-semibold">
                  CÓDIGO DE RESERVA PREFERENCIAL
                </span>
                <span className="font-mono text-2xl font-bold tracking-widest text-[#1C1917]">
                  {reservationCode}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  id="booking-whatsapp-confirm-btn"
                  href={getWhatsAppUrl(`Hola Hostal Boutique 8Retabloz, he realizado la solicitud de reserva código ${reservationCode} a nombre de ${fullName} para la ${currentSuite.name} (${checkIn} al ${checkOut}). Me gustaría confirmar la disponibilidad.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-xs font-josefin tracking-[0.18em] font-bold uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>CONFIRMAR POR WHATSAPP</span>
                </a>

                <button
                  id="booking-finish-btn"
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1917] hover:bg-[#B38F4E] text-[#FAF8F5] rounded-full text-xs font-josefin tracking-[0.18em] font-bold uppercase transition-all shadow-md"
                >
                  VOLVER AL HOTEL
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};