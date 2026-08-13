'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Tag,
  Gift,
  Clock,
  Coffee,
  Info,
  ArrowRight,
  Grid,
  SlidersHorizontal,
  Flame,
  Award
} from 'lucide-react';
import { HOTEL_SUITES } from '@/data/hotelData';

interface RatesCalendarSectionProps {
  onOpenBooking: (suiteId?: string, checkInDate?: string, checkOutDate?: string) => void;
}

export interface DayRateData {
  dateStr: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  year: number;
  basePrice: number;
  discountPrice: number;
  status: 'lowest' | 'standard' | 'peak' | 'soldout';
  tagLabel: string;
  availableRooms: number;
  isWeekend: boolean;
}

export const RatesCalendarSection: React.FC<RatesCalendarSectionProps> = ({ onOpenBooking }) => {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'slider' | 'month'>('slider');
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(0);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  const generateRatesData = useMemo((): DayRateData[] => {
    const dates: DayRateData[] = [];
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const dayNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    const monthNames = [
      'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
      'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
    ];

    let suiteMultiplier = 1;
    if (selectedSuiteId !== 'all') {
      const suite = HOTEL_SUITES.find((s) => s.id === selectedSuiteId);
      if (suite) {
        suiteMultiplier = suite.pricePerNight / 220;
      }
    }

    for (let i = 0; i < 60; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
      const dayNum = currentDate.getDate();
      const monthNum = currentDate.getMonth();
      const yearNum = currentDate.getFullYear();

      let basePrice = Math.round(220 * suiteMultiplier);
      let status: 'lowest' | 'standard' | 'peak' | 'soldout' = 'standard';
      let tagLabel = 'Tarifa Estándar';
      let availableRooms = Math.floor(Math.random() * 4) + 2;

      if (isWeekend) {
        basePrice = Math.round(260 * suiteMultiplier);
        status = 'standard';
        tagLabel = 'Fin de Semana';
      } else if (i % 7 === 1 || i % 7 === 2) {
        basePrice = Math.round(195 * suiteMultiplier);
        status = 'lowest';
        tagLabel = '★ Tarifa Más Baja';
      }

      if ((dayNum >= 18 && dayNum <= 22) || (monthNum === 6 && dayNum >= 25)) {
        basePrice = Math.round(320 * suiteMultiplier);
        status = 'peak';
        tagLabel = 'Temporada Alta';
        availableRooms = 1;
      }

      if (i === 14) {
        status = 'soldout';
        tagLabel = 'Agotado';
        availableRooms = 0;
      }

      const discountPrice = status === 'soldout' ? 0 : Math.round(basePrice * 0.9);

      const yyyy = yearNum;
      const mm = String(monthNum + 1).padStart(2, '0');
      const dd = String(dayNum).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;

      dates.push({
        dateStr,
        dayName: dayNames[dayOfWeek],
        dayNumber: dayNum,
        monthName: monthNames[monthNum],
        year: yearNum,
        basePrice,
        discountPrice,
        status,
        tagLabel,
        availableRooms,
        isWeekend
      });
    }

    return dates;
  }, [selectedSuiteId]);

  const monthsGrouped = useMemo(() => {
    const groups: { [key: string]: DayRateData[] } = {};
    generateRatesData.forEach((item) => {
      const key = `${item.monthName} ${item.year}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    return Object.entries(groups).map(([monthLabel, days]) => ({
      monthLabel,
      days
    }));
  }, [generateRatesData]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectDateCard = (dayItem: DayRateData) => {
    if (dayItem.status === 'soldout') return;

    setSelectedDateStr(dayItem.dateStr);

    const checkInDateObj = new Date(dayItem.dateStr);
    const checkOutDateObj = new Date(checkInDateObj);
    checkOutDateObj.setDate(checkInDateObj.getDate() + 2);

    const checkOutStr = checkOutDateObj.toISOString().split('T')[0];

    const suiteToPass = selectedSuiteId === 'all' ? undefined : selectedSuiteId;
    onOpenBooking(suiteToPass, dayItem.dateStr, checkOutStr);
  };

  return (
    <section id="tarifas-calendario" className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B38F4E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EF] border border-[#E2DFC2]">
              <Sparkles className="w-3.5 h-3.5 text-[#B38F4E]" />
              <span className="text-[11px] font-josefin tracking-[0.25em] text-[#8C7A6B] uppercase font-bold">
                Garantía de Mejor Precio Directo
              </span>
            </div>

            <h2 className="font-josefin text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
              Los mejores precios de nuestras estancias en Ayacucho
            </h2>

            <p className="font-serif-luxury text-base sm:text-lg text-[#665A4F] leading-relaxed">
              Consulta nuestras tarifas día a día. Reserva directamente en nuestra web para obtener un <strong className="text-[#B38F4E] font-semibold">10% de descuento automático</strong> y beneficios exclusivos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#FFFFFF] p-1.5 rounded-2xl border border-[#E2DFC2] flex items-center shadow-sm">
              <button
                id="view-mode-slider-btn"
                onClick={() => setViewMode('slider')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-josefin tracking-[0.15em] font-semibold uppercase transition-all ${
                  viewMode === 'slider'
                    ? 'bg-[#1C1917] text-[#FAF8F5] shadow-md'
                    : 'text-[#665A4F] hover:text-[#1C1917]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Carrusel Día a Día</span>
              </button>

              <button
                id="view-mode-month-btn"
                onClick={() => setViewMode('month')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-josefin tracking-[0.15em] font-semibold uppercase transition-all ${
                  viewMode === 'month'
                    ? 'bg-[#1C1917] text-[#FAF8F5] shadow-md'
                    : 'text-[#665A4F] hover:text-[#1C1917]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Vista Mensual</span>
              </button>
            </div>
          </div>
        </div>

        {/* Suite Filter Bar */}
        <div className="bento-card p-4 sm:p-5 mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-josefin tracking-wider font-bold text-[#8C7A6B] uppercase">
              Estancia:
            </span>
            <select
              id="suite-rate-filter"
              value={selectedSuiteId}
              onChange={(e) => setSelectedSuiteId(e.target.value)}
              className="bg-[#F4F3EF] border border-[#E2DFC2] text-[#1C1917] text-xs font-josefin font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#B38F4E] cursor-pointer"
            >
              <option value="all">Todas las Estancias (Tarifa Base)</option>
              {HOTEL_SUITES.map((suite) => (
                <option key={suite.id} value={suite.id}>
                  {suite.name} — S/ {suite.pricePerNight}/noche
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-josefin font-semibold tracking-wider text-[#665A4F] uppercase">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span>Precio Más Bajo</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B38F4E]" />
              <span>Tarifa Estándar</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
              <span>Temporada Alta</span>
            </span>
          </div>
        </div>

        {/* SLIDER VIEW MODE */}
        {viewMode === 'slider' && (
          <div className="relative group/carousel">
            
            <button
              id="rates-carousel-prev-btn"
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-30 p-3 rounded-full bg-white/90 hover:bg-[#1C1917] text-[#1C1917] hover:text-white border border-[#E2DFC2] shadow-xl backdrop-blur-md transition-all duration-300 focus:outline-none hidden sm:flex items-center justify-center"
              aria-label="Fechas anteriores"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="rates-carousel-next-btn"
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-30 p-3 rounded-full bg-white/90 hover:bg-[#1C1917] text-[#1C1917] hover:text-white border border-[#E2DFC2] shadow-xl backdrop-blur-md transition-all duration-300 focus:outline-none hidden sm:flex items-center justify-center"
              aria-label="Fechas siguientes"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={carouselRef}
              className="flex space-x-4 overflow-x-auto no-scrollbar py-4 px-1 scroll-smooth snap-x snap-mandatory"
            >
              {generateRatesData.map((dayItem, idx) => {
                const isSelected = selectedDateStr === dayItem.dateStr;
                const isLowest = dayItem.status === 'lowest';
                const isPeak = dayItem.status === 'peak';
                const isSoldOut = dayItem.status === 'soldout';

                return (
                  <motion.div
                    key={dayItem.dateStr}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
                    onClick={() => handleSelectDateCard(dayItem)}
                    className={`snap-start flex-shrink-0 w-[240px] sm:w-[270px] rounded-3xl p-5 border transition-all duration-300 cursor-pointer relative flex flex-col justify-between ${
                      isSoldOut
                        ? 'bg-[#F4F3EF]/60 border-[#E2DFC2] opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#1C1917] text-white border-[#B38F4E] shadow-2xl scale-[1.02] ring-2 ring-[#B38F4E]'
                        : isLowest
                        ? 'bg-gradient-to-b from-[#FFFFFF] to-[#F0FDF4] border-[#10B981]/40 hover:border-[#10B981] hover:shadow-xl hover:-translate-y-1'
                        : isPeak
                        ? 'bg-gradient-to-b from-[#FFFFFF] to-[#FFF1F2] border-[#E11D48]/30 hover:border-[#E11D48] hover:shadow-xl hover:-translate-y-1'
                        : 'bg-white border-[#E2DFC2] hover:border-[#B38F4E] hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[10px] font-josefin tracking-[0.18em] uppercase font-bold px-2.5 py-1 rounded-full border ${
                          isSoldOut
                            ? 'bg-gray-200 text-gray-600 border-gray-300'
                            : isLowest
                            ? 'bg-[#10B981]/10 text-[#059669] border-[#10B981]/30'
                            : isPeak
                            ? 'bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/30'
                            : 'bg-[#F4F3EF] text-[#8C7A6B] border-[#E2DFC2]'
                        }`}
                      >
                        {dayItem.tagLabel}
                      </span>

                      {isLowest && (
                        <span className="flex items-center text-[#10B981] text-xs font-bold font-josefin">
                          <Award className="w-3.5 h-3.5 mr-0.5" />
                          OFERTA
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span
                          className={`font-josefin text-xs font-bold tracking-widest uppercase ${
                            isSelected ? 'text-[#D4AF37]' : 'text-[#8C7A6B]'
                          }`}
                        >
                          {dayItem.dayName}
                        </span>
                        <span
                          className={`font-josefin text-2xl font-bold tracking-tight ${
                            isSelected ? 'text-white' : 'text-[#1C1917]'
                          }`}
                        >
                          {dayItem.dayNumber} {dayItem.monthName}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-sans block mt-0.5 ${
                          isSelected ? 'text-white/70' : 'text-[#8C7A6B]'
                        }`}
                      >
                        {dayItem.isWeekend ? 'Fin de semana' : 'Día laboral / Tarifa normal'}
                      </span>
                    </div>

                    <div className="space-y-1.5 py-3 border-y border-dashed border-[#E2DFC2]/60 mb-5 text-[11px]">
                      <div
                        className={`flex items-center space-x-1.5 ${
                          isSelected ? 'text-white/90' : 'text-[#665A4F]'
                        }`}
                      >
                        <Coffee className="w-3 h-3 text-[#B38F4E]" />
                        <span>Desayuno Artesanal Wari</span>
                      </div>
                      <div
                        className={`flex items-center space-x-1.5 ${
                          isSelected ? 'text-white/90' : 'text-[#665A4F]'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                        <span>Cancelación flexible (48h)</span>
                      </div>
                      <div
                        className={`flex items-center space-x-1.5 ${
                          isSelected ? 'text-white/90' : 'text-[#665A4F]'
                        }`}
                      >
                        <Tag className="w-3 h-3 text-[#B38F4E]" />
                        <span>Pago directo al llegar</span>
                      </div>
                    </div>

                    {isSoldOut ? (
                      <div className="text-center py-3">
                        <span className="font-josefin text-xs font-bold tracking-widest text-red-500 uppercase block">
                          AGOTADO
                        </span>
                        <span className="text-[10px] text-gray-500">Sin estancias disponibles</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[10px] uppercase tracking-wider font-josefin ${
                              isSelected ? 'text-white/60' : 'text-[#8C7A6B]'
                            }`}
                          >
                            Noche desde
                          </span>
                          <span
                            className={`text-xs line-through ${
                              isSelected ? 'text-white/50' : 'text-gray-400'
                            }`}
                          >
                            S/ {dayItem.basePrice}
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] font-josefin font-bold tracking-widest text-[#B38F4E] block uppercase">
                              Web Directa (-10%)
                            </span>
                            <div className="flex items-baseline space-x-1">
                              <span
                                className={`font-josefin text-2xl font-bold ${
                                  isSelected ? 'text-[#D4AF37]' : 'text-[#1C1917]'
                                }`}
                              >
                                S/ {dayItem.discountPrice}
                              </span>
                              <span
                                className={`text-[10px] ${
                                  isSelected ? 'text-white/70' : 'text-[#8C7A6B]'
                                }`}
                              >
                                /noche
                              </span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] block mt-1 ${
                            isSelected ? 'text-white/60' : 'text-[#8C7A6B]'
                          }`}
                        >
                          + S/ {Math.round(dayItem.discountPrice * 0.18)} IGV y servicios
                        </span>

                        <button
                          id={`select-date-btn-${dayItem.dateStr}`}
                          className={`w-full mt-4 py-2.5 rounded-full text-[11px] font-josefin tracking-[0.18em] font-bold uppercase transition-all flex items-center justify-center space-x-1.5 ${
                            isSelected
                              ? 'bg-[#B38F4E] text-white shadow-md'
                              : 'bg-[#1C1917] text-white hover:bg-[#B38F4E]'
                          }`}
                        >
                          <span>Reservar esta fecha</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* MONTHLY GRID VIEW MODE */}
        {viewMode === 'month' && (
          <div className="space-y-8">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
              {monthsGrouped.map((month, mIdx) => (
                <button
                  key={month.monthLabel}
                  onClick={() => setActiveMonthIndex(mIdx)}
                  className={`px-5 py-2.5 rounded-full text-xs font-josefin tracking-[0.18em] font-bold uppercase transition-all whitespace-nowrap ${
                    activeMonthIndex === mIdx
                      ? 'bg-[#B38F4E] text-white shadow-md'
                      : 'bg-[#FFFFFF] border border-[#E2DFC2] text-[#665A4F] hover:text-[#1C1917]'
                  }`}
                >
                  {month.monthLabel}
                </button>
              ))}
            </div>

            {monthsGrouped[activeMonthIndex] && (
              <div className="bento-card p-6">
                <div className="mb-4 text-center">
                  <h3 className="font-josefin text-xl font-bold text-[#1C1917] tracking-wider uppercase">
                    {monthsGrouped[activeMonthIndex].monthLabel}
                  </h3>
                  <p className="text-xs text-[#8C7A6B] font-serif-luxury italic">
                    Haz clic en un día para seleccionar tu fecha de llegada y reservar con tarifa directa web.
                  </p>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-3 text-center">
                  {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map((d) => (
                    <span
                      key={d}
                      className="text-[11px] font-josefin font-bold tracking-widest text-[#8C7A6B] uppercase"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {monthsGrouped[activeMonthIndex].days.map((dayItem) => {
                    const isLowest = dayItem.status === 'lowest';
                    const isPeak = dayItem.status === 'peak';
                    const isSoldOut = dayItem.status === 'soldout';

                    return (
                      <button
                        key={dayItem.dateStr}
                        onClick={() => handleSelectDateCard(dayItem)}
                        disabled={isSoldOut}
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] ${
                          isSoldOut
                            ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                            : isLowest
                            ? 'bg-[#F0FDF4] border-[#10B981]/40 hover:border-[#10B981] hover:shadow-md'
                            : isPeak
                            ? 'bg-[#FFF1F2] border-[#E11D48]/30 hover:border-[#E11D48] hover:shadow-md'
                            : 'bg-white border-[#E2DFC2] hover:border-[#B38F4E] hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-josefin text-sm font-bold text-[#1C1917]">
                            {dayItem.dayNumber}
                          </span>
                          <span className="text-[9px] font-josefin font-semibold uppercase text-[#8C7A6B]">
                            {dayItem.dayName}
                          </span>
                        </div>

                        {isSoldOut ? (
                          <span className="text-[10px] font-bold text-red-500 uppercase">Agotado</span>
                        ) : (
                          <div>
                            <span className="text-[9px] text-[#8C7A6B] line-through block">
                              S/ {dayItem.basePrice}
                            </span>
                            <span className="font-josefin text-xs font-bold text-[#B38F4E]">
                              S/ {dayItem.discountPrice}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Exclusive Direct Booking Benefits Bar */}
        <div className="mt-14 bento-card-dark p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 items-center">
            
            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-white/10 text-[#D4AF37] border border-white/15">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-josefin text-sm font-bold text-white uppercase tracking-wider">
                  10% Descuento Directo
                </h4>
                <p className="text-xs text-[#E7DFD5]/80 font-sans mt-0.5">
                  Aplicado automáticamente reservando en nuestra web.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-white/10 text-[#D4AF37] border border-white/15">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-josefin text-sm font-bold text-white uppercase tracking-wider">
                  Desayuno Wari Incluido
                </h4>
                <p className="text-xs text-[#E7DFD5]/80 font-sans mt-0.5">
                  Pan artesanal, jugos naturales y café orgánico local.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-white/10 text-[#D4AF37] border border-white/15">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-josefin text-sm font-bold text-white uppercase tracking-wider">
                  Check-in Flexible
                </h4>
                <p className="text-xs text-[#E7DFD5]/80 font-sans mt-0.5">
                  Prioridad para early check-in sujeto a disponibilidad.
                </p>
              </div>
            </div>

            <div className="flex justify-start md:justify-end">
              <button
                id="direct-booking-banner-btn"
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#B38F4E] hover:bg-[#96753B] text-white font-josefin text-xs tracking-[0.2em] font-bold uppercase transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Consultar Fechas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};