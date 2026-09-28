import React, { useState } from 'react';
import { Currency, ServiceType } from '../types/travel';
import { POPULAR_AIRPORTS } from '../data/travelData';
import {
  Plane,
  Building2,
  Car,
  Sparkles,
  Search,
  ArrowRightLeft,
  Clock,
  Award,
  ArrowDown,
  Wind,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface FlywardHeroProps {
  currentCurrency: Currency;
  onSearchFlights: (origin: string, destination: string) => void;
  onSearchHotels: (region: string) => void;
  onSearchVehicles: (category: string) => void;
  onSelectService: (service: ServiceType) => void;
  onOpenCatalog: (category: 'flights' | 'hotels' | 'vehicles') => void;
}

export const FlywardHero: React.FC<FlywardHeroProps> = ({
  onSearchFlights,
  onSearchHotels,
  onSearchVehicles,
  onSelectService,
  onOpenCatalog,
}) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'vehicles'>('flights');

  // Flight search states
  const [flightOrigin, setFlightOrigin] = useState('KTM');
  const [flightDestination, setFlightDestination] = useState('PKR');
  const [flightDate, setFlightDate] = useState('2026-10-12');

  // Hotel search states
  const [hotelRegion, setHotelRegion] = useState('All');
  const [checkInDate, setCheckInDate] = useState('2026-10-12');
  const [guests, setGuests] = useState(2);

  // Vehicle search states
  const [vehicleCategory, setVehicleCategory] = useState('All');
  const [rentalDays, setRentalDays] = useState(3);

  const handleSwapAirports = () => {
    const temp = flightOrigin;
    setFlightOrigin(flightDestination);
    setFlightDestination(temp);
  };

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFlights(flightOrigin, flightDestination);
    document.getElementById('aviation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchHotels(hotelRegion);
    document.getElementById('sanctuaries')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchVehicles(vehicleCategory);
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between pt-4 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent text-slate-900">
      {/* Radiant Himalayan Mountain Panorama Atmospheric Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-slate-900/10" />
      </div>

      {/* Top Live Status Ticker */}
      <div className="relative z-10 max-w-[1680px] w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-sm text-xs text-slate-700">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>FLIGHTS OPERATING NORMALLY</span>
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="flex items-center gap-1 text-slate-700 font-medium text-[11px] sm:text-xs">
            <Clock className="w-3.5 h-3.5 text-blue-700" />
            <span>Kathmandu Time: UTC +5:45</span>
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs flex-wrap justify-center">
          <div className="flex items-center gap-1 text-blue-950 font-medium">
            <Wind className="w-3.5 h-3.5 text-sky-600" />
            <span>Lukla Weather: Clear (8 kts)</span>
          </div>
          <div className="flex items-center gap-1 text-blue-900 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Govt. Regd No. 19842</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Hero Canvas */}
      <div className="relative z-10 max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] w-full mx-auto my-auto py-6 sm:py-10 flex flex-col items-center text-center">
        {/* Simple & clear badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-blue-200 text-xs font-bold text-blue-900 mb-4 sm:mb-5 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>OFFICIAL NEPAL TRAVEL CONCIERGE · DIRECT BOOKINGS</span>
        </div>

        {/* Clear, attractive headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-cinzel font-black text-slate-900 tracking-tight leading-[1.15] text-balance">
          Explore Nepal with Confidence <br />
          <span className="bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-600 bg-clip-text text-transparent">
            Flights, Mountain Lodges &amp; 4WD Cars
          </span>
        </h1>

        <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg xl:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-normal">
          Book Everest and Pokhara scenic flights, hand-picked 5-star mountain resorts, and reliable 4WD vehicles with licensed drivers—all with instant official e-tickets.
        </p>

        {/* 4 Service Shortcut Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 xl:gap-5 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mt-6 sm:mt-8">
          {[
            { id: 'aviation', number: '01', title: 'Mountain Flights', subtitle: 'Lukla & Pokhara routes', icon: <Plane className="w-4 h-4 text-blue-700" /> },
            { id: 'sanctuaries', number: '02', title: 'Resorts & Hotels', subtitle: 'Annapurna & valley views', icon: <Building2 className="w-4 h-4 text-amber-600" /> },
            { id: 'fleet', number: '03', title: '4WD Car Rental', subtitle: 'Scorpio & driver included', icon: <Car className="w-4 h-4 text-emerald-700" /> },
            { id: 'odysseys', number: '04', title: 'Combo Packages', subtitle: 'Save 25% on 3-in-1 trips', icon: <Sparkles className="w-4 h-4 text-indigo-700" /> },
          ].map((col) => (
            <button
              key={col.id}
              onClick={() => scrollToSection(col.id)}
              className="group p-3 sm:p-4 rounded-2xl bg-white/95 hover:bg-white border border-slate-200/90 hover:border-blue-500 text-left transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md">
                  {col.number}
                </span>
                <div className="p-1 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
                  {col.icon}
                </div>
              </div>
              <div className="font-cinzel text-xs sm:text-sm font-bold text-slate-900 mt-2 group-hover:text-blue-800 transition-colors">
                {col.title}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                {col.subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* Integrated Quick Search Deck */}
        <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mt-6 sm:mt-8 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xl shadow-blue-900/5">
          {/* Tab Selector */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab('flights')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'flights'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Flights</span>
              </button>

              <button
                onClick={() => setActiveTab('hotels')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'hotels'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Hotels &amp; Lodges</span>
              </button>

              <button
                onClick={() => setActiveTab('vehicles')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'vehicles'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>4WD Vehicles</span>
              </button>
            </div>

            <button
              onClick={() => onOpenCatalog(activeTab)}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline hidden sm:flex items-center gap-1 cursor-pointer"
            >
              <span>View All Options ({activeTab === 'flights' ? '8 Flights' : activeTab === 'hotels' ? '6 Hotels' : '4 Vehicles'})</span>
              <span>→</span>
            </button>
          </div>

          {/* Tab 1: Flights Form */}
          {activeTab === 'flights' && (
            <form onSubmit={handleFlightSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center text-left">
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Flying From
                </label>
                <select
                  value={flightOrigin}
                  onChange={(e) => setFlightOrigin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  {POPULAR_AIRPORTS.map((apt) => (
                    <option key={apt.code} value={apt.code}>
                      {apt.city} ({apt.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden lg:flex lg:col-span-1 justify-center pt-5">
                <button
                  type="button"
                  onClick={handleSwapAirports}
                  className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer"
                  title="Swap Departure and Arrival"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Flying To
                </label>
                <select
                  value={flightDestination}
                  onChange={(e) => setFlightDestination(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  {POPULAR_AIRPORTS.filter((a) => a.code !== flightOrigin).map((apt) => (
                    <option key={apt.code} value={apt.code}>
                      {apt.city} ({apt.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={flightDate}
                  onChange={(e) => setFlightDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer font-mono"
                />
              </div>

              <div className="lg:col-span-3 pt-1 lg:pt-5">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Flights</span>
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: Hotels Form */}
          {activeTab === 'hotels' && (
            <form onSubmit={handleHotelSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center text-left">
              <div className="lg:col-span-4">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Destination Region
                </label>
                <select
                  value={hotelRegion}
                  onChange={(e) => setHotelRegion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  <option value="All">All Regions (Kathmandu, Pokhara, Everest)</option>
                  <option value="Kathmandu">Kathmandu Valley</option>
                  <option value="Pokhara">Pokhara &amp; Annapurna</option>
                  <option value="Everest / Nagarkot">Everest &amp; Nagarkot</option>
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer font-mono"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((g) => (
                    <option key={g} value={g}>
                      {g} Guest{g > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3 pt-1 lg:pt-5">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Hotels</span>
                </button>
              </div>
            </form>
          )}

          {/* Tab 3: Vehicles Form */}
          {activeTab === 'vehicles' && (
            <form onSubmit={handleVehicleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center text-left">
              <div className="lg:col-span-4">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  value={vehicleCategory}
                  onChange={(e) => setVehicleCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  <option value="All">All Vehicles (4WD &amp; SUVs)</option>
                  <option value="Heavy Duty 4WD">Mahindra Scorpio 4WD (Off-road ready)</option>
                  <option value="Luxury SUV">Toyota Prado 4x4 (Luxury Comfort)</option>
                  <option value="Van">Toyota HiAce (Group Van)</option>
                </select>
              </div>

              <div className="lg:col-span-4">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Rental Period
                </label>
                <select
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 7, 10, 14].map((d) => (
                    <option key={d} value={d}>
                      {d} Day{d > 1 ? 's' : ''} (Includes Driver &amp; Fuel)
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-4 pt-1 lg:pt-5">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Vehicles</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-2">
        <button
          onClick={() => scrollToSection('aviation')}
          className="flex flex-col items-center gap-1.5 text-slate-600 hover:text-blue-900 transition-colors cursor-pointer group"
        >
          <span className="text-[10px] uppercase tracking-wider font-bold">
            Scroll to explore options
          </span>
          <div className="w-7 h-7 rounded-full border border-blue-200 bg-white/80 shadow-xs flex items-center justify-center group-hover:border-blue-700 transition-colors">
            <ArrowDown className="w-3.5 h-3.5 text-blue-800 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
