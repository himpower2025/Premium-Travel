import React, { useState } from 'react';
import { ComboPackage, Currency, Flight, Hotel, Vehicle } from '../types/travel';
import { COMBO_PACKAGES, FLIGHTS_DATA, HOTELS_DATA, VEHICLES_DATA } from '../data/travelData';
import { formatPrice } from '../utils/formatters';
import { TiltCard } from './TiltCard';
import { Sparkles, Plane, Building2, Car, Check, ArrowRight, Calculator, Plus, Percent } from 'lucide-react';

interface ComboPromotionsSectionProps {
  currentCurrency: Currency;
  onBookPackage: (pkg: ComboPackage) => void;
  onBookCustomCombo: (flight: Flight | null, hotel: Hotel | null, vehicle: Vehicle | null, totalPriceUSD: number) => void;
}

export const ComboPromotionsSection: React.FC<ComboPromotionsSectionProps> = ({
  currentCurrency,
  onBookPackage,
  onBookCustomCombo,
}) => {
  // Custom Combo Builder state
  const [includeFlight, setIncludeFlight] = useState(true);
  const [selectedFlightId, setSelectedFlightId] = useState(FLIGHTS_DATA[0].id);

  const [includeHotel, setIncludeHotel] = useState(true);
  const [selectedHotelId, setSelectedHotelId] = useState(HOTELS_DATA[1].id);
  const [hotelNights, setHotelNights] = useState(3);

  const [includeVehicle, setIncludeVehicle] = useState(true);
  const [selectedVehicleId, setSelectedVehicleId] = useState(VEHICLES_DATA[0].id);
  const [vehicleDays, setVehicleDays] = useState(3);

  // Selected items
  const currentFlight = FLIGHTS_DATA.find((f) => f.id === selectedFlightId) || FLIGHTS_DATA[0];
  const currentHotel = HOTELS_DATA.find((h) => h.id === selectedHotelId) || HOTELS_DATA[0];
  const currentVehicle = VEHICLES_DATA.find((v) => v.id === selectedVehicleId) || VEHICLES_DATA[0];

  // Calculate selected services count & discount
  const activeCount = (includeFlight ? 1 : 0) + (includeHotel ? 1 : 0) + (includeVehicle ? 1 : 0);
  const discountRate = activeCount === 3 ? 0.20 : activeCount === 2 ? 0.15 : 0;

  const rawFlightCost = includeFlight ? currentFlight.priceUSD * 2 : 0; // return flight
  const rawHotelCost = includeHotel ? currentHotel.pricePerNightUSD * hotelNights : 0;
  const rawVehicleCost = includeVehicle ? currentVehicle.dailyRateUSD * vehicleDays : 0;
  const subtotalUSD = rawFlightCost + rawHotelCost + rawVehicleCost;
  const discountAmountUSD = subtotalUSD * discountRate;
  const finalCustomTotalUSD = Math.round(subtotalUSD - discountAmountUSD);

  const handleBookCustom = () => {
    if (activeCount < 2) return;
    onBookCustomCombo(
      includeFlight ? currentFlight : null,
      includeHotel ? currentHotel : null,
      includeVehicle ? currentVehicle : null,
      finalCustomTotalUSD
    );
  };

  return (
    <section id="promotions" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Service 04 · Multi-Service Promotional Combos</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-slate-900 tracking-tight">
          Bundle &amp; Save: 2-in-1 &amp; 3-in-1 Holiday Packages
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Maximize your Himalayan voyage. Bundle flights, luxury retreats, and chauffeured 4WD fleet together for up to 25% savings and a single unified booking voucher.
        </p>
      </div>

      {/* Signature Pre-Built Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {COMBO_PACKAGES.map((pkg) => (
          <TiltCard
            key={pkg.id}
            maxTilt={5}
            scale={1.01}
            className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-3xl overflow-hidden transition-all shadow-sm hover:shadow-xl flex flex-col group"
          >
            {/* Image Header with Scrim and Badges */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('unsplash')) {
                    target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

              {/* Tag / Savings Pill */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-slate-900 shadow-sm">
                  {pkg.bundleType}
                </span>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-md">
                  Save {pkg.savingsPercentage}%
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-xs text-amber-300 font-bold drop-shadow">{pkg.durationDays} Days / {pkg.durationDays - 1} Nights</span>
                <h3 className="text-xl font-cinzel font-bold text-white group-hover:text-amber-300 transition-colors drop-shadow-md">
                  {pkg.title}
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-600 font-semibold italic mb-4">
                  "{pkg.tagline}"
                </p>

                {/* Included Services Breakdown */}
                <div className="space-y-2.5 bg-slate-50 border border-slate-200/90 rounded-2xl p-4 mb-4">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    What's Bundled Inside:
                  </div>

                  {pkg.includes.flight && (
                    <div className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800 mt-0.5 shrink-0">
                        <Plane className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-tight">{pkg.includes.flight}</span>
                    </div>
                  )}

                  {pkg.includes.hotel && (
                    <div className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                      <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 mt-0.5 shrink-0">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-tight">{pkg.includes.hotel}</span>
                    </div>
                  )}

                  {pkg.includes.vehicle && (
                    <div className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                      <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 mt-0.5 shrink-0">
                        <Car className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-tight">{pkg.includes.vehicle}</span>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 mb-4">
                  {pkg.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Row and Booking Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 line-through font-medium">
                    {formatPrice(pkg.originalPriceUSD, currentCurrency)}
                  </div>
                  <div className="text-2xl font-black font-mono text-blue-900 tabular-nums">
                    {formatPrice(pkg.discountedPriceUSD, currentCurrency)}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold">Package All-Inclusive</span>
                </div>

                <button
                  onClick={() => onBookPackage(pkg)}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                >
                  <span>Book This Bundle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* INTERACTIVE CUSTOM COMBO CALCULATOR TOOL - Crisp Vibrant Card */}
      <div className="bg-gradient-to-br from-white via-sky-50/50 to-amber-50/40 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>Interactive Custom Promotion Tool</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-900">
            Build Your Own 2-in-1 or 3-in-1 Nepal Package
          </h3>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Select any combination below. Bundle 2 services to get <span className="text-amber-700 font-bold">15% off</span>, or bundle all 3 services to unlock <span className="text-emerald-700 font-bold">20% off</span> the entire booking automatically!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 1. FLIGHT COMPONENT */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              includeFlight
                ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-400/20'
                : 'bg-white/60 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFlight}
                  onChange={(e) => setIncludeFlight(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Plane className="w-4 h-4 text-amber-600" />
                  <span>1. Domestic Flight</span>
                </span>
              </label>
              {includeFlight && (
                <span className="text-[11px] text-amber-700 font-mono font-bold">
                  {formatPrice(currentFlight.priceUSD * 2, currentCurrency)} (Return)
                </span>
              )}
            </div>

            {includeFlight && (
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <label className="block text-slate-600 font-medium">Choose Route:</label>
                <select
                  value={selectedFlightId}
                  onChange={(e) => setSelectedFlightId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {FLIGHTS_DATA.filter((f) => f.isDomestic).map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.originCode} ⇄ {f.destinationCode} ({f.airline})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-500 font-medium">
                  {currentFlight.aircraft} · {currentFlight.baggage}
                </div>
              </div>
            )}
          </div>

          {/* 2. HOTEL COMPONENT */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              includeHotel
                ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-400/20'
                : 'bg-white/60 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHotel}
                  onChange={(e) => setIncludeHotel(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>2. Resort Stay</span>
                </span>
              </label>
              {includeHotel && (
                <span className="text-[11px] text-amber-700 font-mono font-bold">
                  {formatPrice(currentHotel.pricePerNightUSD * hotelNights, currentCurrency)}
                </span>
              )}
            </div>

            {includeHotel && (
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <label className="block text-slate-600 font-medium">Choose Hotel &amp; Duration:</label>
                <select
                  value={selectedHotelId}
                  onChange={(e) => setSelectedHotelId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:outline-none focus:border-amber-500 truncate cursor-pointer"
                >
                  {HOTELS_DATA.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.region})
                    </option>
                  ))}
                </select>

                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-600">Nights:</span>
                  <select
                    value={hotelNights}
                    onChange={(e) => setHotelNights(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-900 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 7].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Night' : 'Nights'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* 3. VEHICLE COMPONENT */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              includeVehicle
                ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-400/20'
                : 'bg-white/60 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeVehicle}
                  onChange={(e) => setIncludeVehicle(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>3. 4WD / Fleet</span>
                </span>
              </label>
              {includeVehicle && (
                <span className="text-[11px] text-amber-700 font-mono font-bold">
                  {formatPrice(currentVehicle.dailyRateUSD * vehicleDays, currentCurrency)}
                </span>
              )}
            </div>

            {includeVehicle && (
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <label className="block text-slate-600 font-medium">Choose Fleet &amp; Days:</label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:outline-none focus:border-amber-500 truncate cursor-pointer"
                >
                  {VEHICLES_DATA.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>

                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-600">Days:</span>
                  <select
                    value={vehicleDays}
                    onChange={(e) => setVehicleDays(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-900 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 7].map((d) => (
                      <option key={d} value={d}>
                        {d} {d === 1 ? 'Day' : 'Days'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Calculation Bar - Rich Royal Sapphire & Gold */}
        <div className="bg-[#0a2342] text-white rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold shrink-0 shadow-md">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold">
                {activeCount < 2 ? (
                  <span className="text-amber-300">Select at least 2 services to unlock bundle savings!</span>
                ) : activeCount === 3 ? (
                  <span className="text-emerald-300 font-bold">🎉 3-in-1 Triple Bundle Bonus: 20% Instant Savings!</span>
                ) : (
                  <span className="text-amber-300 font-bold">✨ 2-in-1 Double Combo Discount: 15% Instant Savings!</span>
                )}
              </div>
              <div className="flex items-baseline gap-3 mt-1.5">
                {activeCount >= 2 && (
                  <span className="text-sm text-sky-200 line-through">
                    {formatPrice(subtotalUSD, currentCurrency)}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 tabular-nums">
                  {formatPrice(finalCustomTotalUSD, currentCurrency)}
                </span>
                {activeCount >= 2 && (
                  <span className="text-xs font-bold text-emerald-300">
                    (You save {formatPrice(discountAmountUSD, currentCurrency)})
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleBookCustom}
            disabled={activeCount < 2}
            className={`py-3.5 px-6 rounded-xl font-black text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
              activeCount >= 2
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 shadow-lg shadow-amber-400/30 hover:scale-105'
                : 'bg-slate-700/80 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Book Custom Combo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
