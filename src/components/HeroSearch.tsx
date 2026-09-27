import React, { useState } from 'react';
import { Currency, ServiceType } from '../types/travel';
import { POPULAR_AIRPORTS } from '../data/travelData';
import { Plane, Building2, Car, Sparkles, Search, Calendar, Users, MapPin, ArrowRightLeft, ShieldCheck, Clock, Award } from 'lucide-react';

interface HeroSearchProps {
  currentCurrency: Currency;
  onSearchFlights: (origin: string, destination: string) => void;
  onSearchHotels: (region: string) => void;
  onSearchVehicles: (category: string) => void;
  onSelectService: (service: ServiceType) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearchFlights,
  onSearchHotels,
  onSearchVehicles,
  onSelectService,
}) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'vehicles' | 'promotions'>('flights');

  // Flight search states
  const [flightOrigin, setFlightOrigin] = useState('KTM');
  const [flightDestination, setFlightDestination] = useState('PKR');
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [flightDate, setFlightDate] = useState('2026-10-12');
  const [passengers, setPassengers] = useState(1);

  // Hotel search states
  const [hotelRegion, setHotelRegion] = useState('All');
  const [checkInDate, setCheckInDate] = useState('2026-10-12');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-15');
  const [guests, setGuests] = useState(2);

  // Vehicle search states
  const [vehicleCategory, setVehicleCategory] = useState('All');
  const [rentalDays, setRentalDays] = useState(3);
  const [pickupLocation, setPickupLocation] = useState('Kathmandu Valley / Airport');

  const handleSwapAirports = () => {
    const temp = flightOrigin;
    setFlightOrigin(flightDestination);
    setFlightDestination(temp);
  };

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFlights(flightOrigin, flightDestination);
    onSelectService('flights');
    document.getElementById('flights')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchHotels(hotelRegion);
    onSelectService('hotels');
    document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchVehicles(vehicleCategory);
    onSelectService('vehicles');
    document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePromotionsClick = () => {
    onSelectService('promotions');
    document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[660px] flex items-center justify-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image: Vivid, Sunlit, Highlighting Himalayan Majesty */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_himalayas_travel_1790502254393.jpg"
          alt="Himalayan flight view over majestic peaks in Nepal"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Luminous, Vibrant Overlay that reveals the photo while keeping text crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2342]/85 via-[#0b2f5c]/45 to-[#f2f6fa]" />
        <div className="absolute inset-0 bg-radial-at-t from-amber-500/15 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Editorial Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-widest text-amber-300 mb-3 shadow-md">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Nepal Government Registered Agency · Thamel, Kathmandu</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-extrabold text-white tracking-tight leading-tight text-balance drop-shadow-md">
            Explore Nepal With Unrivaled Ease &amp; Elegance
          </h1>

          <p className="mt-4 text-base sm:text-lg text-sky-50 font-normal leading-relaxed max-w-2xl mx-auto text-balance drop-shadow-sm">
            Book domestic &amp; international flights, 5-star Himalayan boutique resorts, chauffeured 4WD mountain SUVs, or curated all-inclusive combo bundles.
          </p>
        </div>

        {/* Unified Flyward-Style Multi-Service Booking Hub - Crisp Luxury White Glass */}
        <div className="bg-white/95 border border-white/80 rounded-2xl shadow-2xl shadow-sky-950/20 backdrop-blur-xl overflow-hidden">
          {/* Service Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200/80 bg-slate-100/90 p-1.5 sm:p-2 gap-1.5">
            <button
              onClick={() => setActiveTab('flights')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'flights'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>1. Flights</span>
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'hotels'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>2. Accommodation</span>
            </button>

            <button
              onClick={() => setActiveTab('vehicles')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'vehicles'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>3. 4WD &amp; Fleet</span>
            </button>

            <button
              onClick={() => setActiveTab('promotions')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'promotions'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-amber-700 hover:text-amber-800 hover:bg-amber-100/60 font-bold'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>4. Combo Deals (-25%)</span>
            </button>
          </div>

          {/* Form Content Area */}
          <div className="p-4 sm:p-6 lg:p-7">
            {/* 1. FLIGHT SEARCH TAB */}
            {activeTab === 'flights' && (
              <form onSubmit={handleFlightSubmit} className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600 pb-1">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        checked={tripType === 'oneWay'}
                        onChange={() => setTripType('oneWay')}
                        className="text-amber-500 focus:ring-amber-400"
                      />
                      <span>One-Way</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        checked={tripType === 'roundTrip'}
                        onChange={() => setTripType('roundTrip')}
                        className="text-amber-500 focus:ring-amber-400"
                      />
                      <span>Round-Trip</span>
                    </label>
                  </div>
                  <span className="hidden sm:inline text-sky-700 font-medium">Domestic &amp; International Air Booking</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  {/* Origin */}
                  <div className="md:col-span-3 bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      From (Origin)
                    </label>
                    <select
                      value={flightOrigin}
                      onChange={(e) => setFlightOrigin(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none cursor-pointer"
                    >
                      {POPULAR_AIRPORTS.map((apt) => (
                        <option key={apt.code} value={apt.code} className="bg-white text-slate-900">
                          {apt.city} ({apt.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Swap button */}
                  <div className="hidden md:flex md:col-span-1 justify-center">
                    <button
                      type="button"
                      onClick={handleSwapAirports}
                      className="p-2.5 rounded-full bg-slate-100 hover:bg-amber-100 text-amber-600 transition-colors border border-slate-300 cursor-pointer shadow-sm hover:scale-105"
                      title="Swap Origin and Destination"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Destination */}
                  <div className="md:col-span-3 bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      To (Destination)
                    </label>
                    <select
                      value={flightDestination}
                      onChange={(e) => setFlightDestination(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none cursor-pointer"
                    >
                      {POPULAR_AIRPORTS.map((apt) => (
                        <option key={apt.code} value={apt.code} className="bg-white text-slate-900">
                          {apt.city} ({apt.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="md:col-span-3 bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      <span>Departure Date</span>
                    </label>
                    <input
                      type="date"
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none cursor-pointer"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      <Search className="w-4 h-4" />
                      <span>Find Flights</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 font-medium">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>Travelers:</span>
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="bg-white border border-slate-300 text-slate-800 rounded-md px-2 py-0.5 text-xs focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Adult' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span>·</span>
                  <span className="text-slate-600">Popular: KTM ⇄ Pokhara (25m) · KTM ⇄ Lukla Everest (35m) · KTM ⇄ Chitwan</span>
                </div>
              </form>
            )}

            {/* 2. HOTEL SEARCH TAB */}
            {activeTab === 'hotels' && (
              <form onSubmit={handleHotelSubmit} className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600 pb-1">
                  <span className="font-medium text-slate-700">Himalayan Mountain Resorts, Boutique Stays &amp; National Park Lodges</span>
                  <span className="text-emerald-700 font-semibold">Handpicked &amp; Inspected 5-Star Standards</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  {/* Region Destination */}
                  <div className="md:col-span-4 bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      <span>Destination / Region</span>
                    </label>
                    <select
                      value={hotelRegion}
                      onChange={(e) => setHotelRegion(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Nepal Regions</option>
                      <option value="Kathmandu">Kathmandu Heritage Valley</option>
                      <option value="Pokhara">Pokhara Lakeside &amp; Annapurna</option>
                      <option value="Chitwan">Chitwan National Park Safari</option>
                      <option value="Nagarkot">Nagarkot Himalayan Sunrise Ridge</option>
                      <option value="Everest">Everest High-Altitude Lodges</option>
                      <option value="Lumbini">Lumbini (Lord Buddha Birthplace)</option>
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="md:col-span-3 bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none cursor-pointer"
                    />
                  </div>

                  <div className="md:col-span-3 bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none cursor-pointer"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      <Search className="w-4 h-4" />
                      <span>Find Hotels</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 font-medium">
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  <span>Guests:</span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="bg-white border border-slate-300 text-slate-800 rounded-md px-2 py-0.5 text-xs focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <span>·</span>
                  <span className="text-slate-600">Free airport pickup included at select 5-star properties</span>
                </div>
              </form>
            )}

            {/* 3. VEHICLE SEARCH TAB */}
            {activeTab === 'vehicles' && (
              <form onSubmit={handleVehicleSubmit} className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600 pb-1">
                  <span className="font-medium text-slate-700">Chauffeured Mountain 4WD Fleet, Group HiAce Vans &amp; Luxury Sedans</span>
                  <span className="text-amber-700 font-semibold">All rentals include licensed mountain drivers</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-4 bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Vehicle Type
                    </label>
                    <select
                      value={vehicleCategory}
                      onChange={(e) => setVehicleCategory(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Fleet Options</option>
                      <option value="4WD Mountain SUV">4WD Mountain SUV (Scorpio / Prado)</option>
                      <option value="Deluxe Tourist Van">Deluxe Tourist Van (HiAce 14-Seat)</option>
                      <option value="Eco Electric SUV">Eco Electric SUV (Hyundai Ioniq 5)</option>
                      <option value="Luxury Executive Sedan">Executive City Sedan (Corolla Altis)</option>
                    </select>
                  </div>

                  <div className="md:col-span-4 bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Pick-up Location
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none cursor-pointer"
                    >
                      <option value="Kathmandu Valley / Airport">Kathmandu Valley / TIA Airport</option>
                      <option value="Pokhara City / Airport">Pokhara City / Lakeside</option>
                      <option value="Chitwan Safari Gate">Chitwan Sauraha / Bharatpur</option>
                      <option value="Custom Himalayan Intercity">Intercity Highway Overland</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Duration (Days)
                    </label>
                    <select
                      value={rentalDays}
                      onChange={(e) => setRentalDays(Number(e.target.value))}
                      className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 7, 10, 14].map((d) => (
                        <option key={d} value={d}>
                          {d} {d === 1 ? 'Day' : 'Days'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      <Search className="w-4 h-4" />
                      <span>View Fleet</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 font-medium">
                  <span>Specialized Himalayan drivers · Comprehensive insurance · 24/7 mountain breakdown backup</span>
                </div>
              </form>
            )}

            {/* 4. PROMOTIONS & COMBO PACKAGES TAB */}
            {activeTab === 'promotions' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 pb-1">
                  <span className="text-slate-900 font-bold">Bundle &amp; Save: Combine Flights + Hotels + 4WD Fleet for up to 25% Off</span>
                  <span className="text-emerald-700 font-bold">Instant All-in-One Voucher</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    onClick={handlePromotionsClick}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 hover:border-amber-500 hover:bg-amber-50/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">3-in-1 Bundle</span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Save 25%</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      Pokhara Golden Retreat
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      Return Flights + 3 Nights 5-Star Lake Resort + Private 4WD Scorpio with Driver.
                    </p>
                  </div>

                  <div
                    onClick={handlePromotionsClick}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 hover:border-amber-500 hover:bg-amber-50/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">3-in-1 Bundle</span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Save 20%</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      Royal Chitwan Safari
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      Return Flights + 2 Nights Riverfront Lodge + 4x4 Jeep Safari &amp; Naturalist.
                    </p>
                  </div>

                  <div
                    onClick={handlePromotionsClick}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 hover:border-amber-500 hover:bg-amber-50/40 cursor-pointer transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Custom Combo</span>
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Build Yours</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                        Custom 2 or 3 Service Bundle
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Pick your own flight, hotel, and vehicle to unlock instant discount!
                      </p>
                    </div>
                    <button
                      onClick={handlePromotionsClick}
                      className="mt-3 text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      <span>Explore all packages</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={handlePromotionsClick}
                    className="py-2.5 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    View All Promotional Bundles &amp; Custom Calculator
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quiet Editorial Proof & Trust Signals (No Pill Enclosures, Crisp Badges) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-600 text-center font-medium bg-white/80 backdrop-blur-md py-3 px-6 rounded-2xl shadow-sm border border-slate-200/80 max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ministry of Tourism Licensed #9844</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <Award className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Active NATTA &amp; TAAN Member</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <Clock className="w-4 h-4 text-sky-600 shrink-0" />
            <span>24/7 Kathmandu &amp; Pokhara Concierge</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <span>Instant E-Tickets &amp; Official Vouchers</span>
          </div>
        </div>
      </div>
    </section>
  );
};
