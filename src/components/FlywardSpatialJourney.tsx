import React, { useState } from 'react';
import { Currency, Flight, Hotel, Vehicle, ComboPackage } from '../types/travel';
import { FLIGHTS_DATA, HOTELS_DATA, VEHICLES_DATA, COMBO_PACKAGES } from '../data/travelData';
import { formatPrice } from '../utils/formatters';
import { TiltCard } from './TiltCard';
import {
  Plane,
  Building2,
  Car,
  Sparkles,
  Clock,
  Luggage,
  Star,
  Users,
  Gauge,
  MapPin,
  Maximize2,
  Radio,
  CheckCircle2
} from 'lucide-react';

interface FlywardSpatialJourneyProps {
  currentCurrency: Currency;
  onBookFlight: (flight: Flight) => void;
  onBookHotel: (hotel: Hotel, roomTypeIndex: number) => void;
  onBookVehicle: (vehicle: Vehicle, rentalDays: number) => void;
  onBookPackage: (pkg: ComboPackage) => void;
  onOpenCatalog: (category: 'flights' | 'hotels' | 'vehicles') => void;
}

export const FlywardSpatialJourney: React.FC<FlywardSpatialJourneyProps> = ({
  currentCurrency,
  onBookFlight,
  onBookHotel,
  onBookVehicle,
  onBookPackage,
  onOpenCatalog,
}) => {
  // Section 01: Flights selection
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(0);
  const currentFlight = FLIGHTS_DATA[selectedFlightIndex] || FLIGHTS_DATA[0];

  // Section 02: Hotels selection
  const [selectedHotelIndex, setSelectedHotelIndex] = useState(0);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const currentHotel = HOTELS_DATA[selectedHotelIndex] || HOTELS_DATA[0];
  const currentRoom = currentHotel.roomTypes[selectedRoomIndex] || currentHotel.roomTypes[0];

  // Section 03: 4WD Fleet selection
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const [rentalDays, setRentalDays] = useState(3);
  const currentVehicle = VEHICLES_DATA[selectedVehicleIndex] || VEHICLES_DATA[0];

  return (
    <div className="relative bg-[#f4f8fc] text-slate-900 overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem]" />

      {/* ========================================================================= */}
      {/* SECTION 01: FLIGHTS & MOUNTAIN SCENIC TOURS                               */}
      {/* ========================================================================= */}
      <section id="aviation" className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#e8f2fc] via-white to-[#edf5fc]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-xs font-bold text-blue-900 uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>01. FLIGHTS &amp; SCENIC TOURS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-black text-slate-900 tracking-tight">
                Nepal Domestic &amp; Mountain Flights
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5 sm:mt-2 max-w-xl font-normal leading-relaxed">
                Guaranteed window seats for Everest mountain tours, quick 25-minute connections to Pokhara, and daily flights to Lukla.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenCatalog('flights')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-900 border border-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5 text-blue-700" />
                <span>View All {FLIGHTS_DATA.length} Flight Routes</span>
              </button>
            </div>
          </div>

          {/* Spatial Split-Coordinate Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Column: Route Selector & Flight Details */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Select Your Route:
                </label>
                <div className="space-y-2 sm:space-y-2.5">
                  {FLIGHTS_DATA.slice(0, 4).map((flight, idx) => {
                    const isSelected = selectedFlightIndex === idx;
                    return (
                      <button
                        key={flight.id}
                        onClick={() => setSelectedFlightIndex(idx)}
                        className={`w-full p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50/90 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 text-slate-800 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-blue-900 text-amber-400 shadow-sm' : 'bg-slate-100 text-slate-600'}`}>
                            <Plane className="w-4 h-4 transform -rotate-45" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900">
                              {flight.origin} → {flight.destination}
                            </div>
                            <div className="text-[11px] sm:text-xs text-slate-500">
                              {flight.airline} · {flight.flightNumber}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs sm:text-sm font-black text-blue-900 font-mono">
                            {formatPrice(flight.priceUSD, currentCurrency)}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-slate-500">{flight.duration}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flight Specs Sheet */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 text-blue-900 font-bold">
                    <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    <span>Flight Details</span>
                  </span>
                  <span className="font-bold text-slate-800">{currentFlight.flightNumber}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Aircraft</span>
                    <span className="text-slate-900 font-bold">{currentFlight.aircraft}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Safety Standard</span>
                    <span className="text-emerald-700 font-bold">Certified Mountain Fleet</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Baggage</span>
                    <span className="text-slate-900 font-bold">{currentFlight.baggage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Cabin</span>
                    <span className="text-amber-700 font-bold">{currentFlight.cabin}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Flight Visual Card */}
            <div className="lg:col-span-7">
              <TiltCard
                maxTilt={4}
                scale={1.01}
                className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white p-5 sm:p-7"
              >
                <div className="relative z-10 space-y-5">
                  {/* Top Departure Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-700" />
                      <span>Departure: {currentFlight.departureTime}</span>
                    </div>

                    <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Instant Confirmation</span>
                    </div>
                  </div>

                  {/* Visual Route Track */}
                  <div className="p-4 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                          {currentFlight.originCode}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">{currentFlight.origin}</div>
                        <div className="text-xs font-bold text-blue-700">{currentFlight.departureTime}</div>
                      </div>

                      <div className="flex-1 flex flex-col items-center px-3 sm:px-6">
                        <span className="text-[10px] font-bold text-blue-800 mb-1">{currentFlight.duration} Non-stop</span>
                        <div className="w-full flex items-center gap-1.5 sm:gap-2">
                          <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-300 via-amber-400 to-blue-500 rounded-full" />
                          <div className="p-1.5 sm:p-2 rounded-full bg-blue-900 text-amber-400 shadow-sm shrink-0">
                            <Plane className="w-3.5 h-3.5 transform -rotate-45" />
                          </div>
                          <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-500 via-amber-400 to-blue-300 rounded-full" />
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold mt-1">Scenic Himalayan Route</span>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                          {currentFlight.destinationCode}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">{currentFlight.destination}</div>
                        <div className="text-xs font-bold text-blue-700">{currentFlight.arrivalTime}</div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Official Ticket Price</div>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-blue-900">
                        {formatPrice(currentFlight.priceUSD, currentCurrency)}
                      </div>
                      <div className="text-[11px] text-slate-500">All taxes &amp; baggage included</div>
                    </div>

                    <button
                      onClick={() => onBookFlight(currentFlight)}
                      className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Book Flight &amp; Get E-Ticket</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02: HOTELS & RESORTS                                              */}
      {/* ========================================================================= */}
      <section id="sanctuaries" className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#f8f5ee] via-white to-[#eef4f8]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-xs font-bold text-amber-900 uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>02. MOUNTAIN RESORTS &amp; HOTELS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-black text-slate-900 tracking-tight">
                Luxury Mountain Stays &amp; Eco-Lodges
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5 sm:mt-2 max-w-xl font-normal leading-relaxed">
                Carefully selected 5-star mountain villas, heritage courtyard hotels, and lakeside resorts with breathtaking Himalayan sunrise views.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenCatalog('hotels')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-700" />
                <span>View All {HOTELS_DATA.length} Hotels</span>
              </button>
            </div>
          </div>

          {/* Spatial Split-Coordinate Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Column: Visual Hotel Showcase */}
            <div className="lg:col-span-7">
              <TiltCard
                maxTilt={4}
                scale={1.01}
                className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group"
              >
                <div className="relative h-[280px] sm:h-[380px] md:h-[420px] w-full overflow-hidden">
                  <img
                    src={currentHotel.image}
                    alt={currentHotel.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{currentHotel.rating.toFixed(1)} / 5.0</span>
                    </span>

                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-blue-900/90 text-xs font-bold text-amber-300 shadow-sm">
                      {currentHotel.region}
                    </span>
                  </div>

                  {/* Bottom Hotel Title & Info */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1 sm:space-y-2">
                    <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                      Selected Room: {currentRoom.name}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-white leading-tight">
                      {currentHotel.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-sky-100 font-medium">
                      <span>{currentRoom.bed}</span>
                      <span>•</span>
                      <span>{currentRoom.view}</span>
                      <span>•</span>
                      <span className="text-emerald-300 font-bold">Breakfast Included</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Right Column: Hotel Picker & Room Type */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Select Hotel:
                </label>
                <div className="space-y-2 sm:space-y-2.5">
                  {HOTELS_DATA.slice(0, 4).map((hotel, idx) => {
                    const isSelected = selectedHotelIndex === idx;
                    return (
                      <button
                        key={hotel.id}
                        onClick={() => {
                          setSelectedHotelIndex(idx);
                          setSelectedRoomIndex(0);
                        }}
                        className={`w-full p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-400/20'
                            : 'bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 text-slate-800 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600'}`}>
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900 font-cinzel line-clamp-1">
                              {hotel.name}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium mt-0.5">
                              <MapPin className="w-3 h-3 text-blue-700" />
                              <span>{hotel.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs sm:text-sm font-black text-blue-900 font-mono">
                            {formatPrice(hotel.pricePerNightUSD, currentCurrency)}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">/ night</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Room Tier Selector */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5 sm:space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                  Choose Room Type:
                </label>
                <select
                  value={selectedRoomIndex}
                  onChange={(e) => setSelectedRoomIndex(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  {currentHotel.roomTypes.map((room, idx) => (
                    <option key={idx} value={idx}>
                      {room.name} (+{formatPrice(room.extraPriceUSD, currentCurrency)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Book Room Action */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Nightly Rate</div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-blue-900">
                    {formatPrice(currentHotel.pricePerNightUSD + currentRoom.extraPriceUSD, currentCurrency)}
                  </div>
                </div>

                <button
                  onClick={() => onBookHotel(currentHotel, selectedRoomIndex)}
                  className="py-2.5 sm:py-3 px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Room</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 03: 4WD FLEET & EXPEDITION VEHICLES                               */}
      {/* ========================================================================= */}
      <section id="fleet" className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#eef7f4] via-white to-[#edf4f8]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-900 uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>03. 4WD VEHICLES &amp; DRIVER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-black text-slate-900 tracking-tight">
                Chauffeured 4WD Jeeps &amp; SUVs
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5 sm:mt-2 max-w-xl font-normal leading-relaxed">
                Sturdy 4x4 Mahindra Scorpio and Toyota Prado vehicles with experienced mountain drivers. Includes all fuel, parking fees, and road taxes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenCatalog('vehicles')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>View All {VEHICLES_DATA.length} Vehicles</span>
              </button>
            </div>
          </div>

          {/* Spatial Split-Coordinate Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Column: Vehicle Choice & Days */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Select Vehicle:
                </label>
                <div className="space-y-2 sm:space-y-2.5">
                  {VEHICLES_DATA.map((vehicle, idx) => {
                    const isSelected = selectedVehicleIndex === idx;
                    return (
                      <button
                        key={vehicle.id}
                        onClick={() => setSelectedVehicleIndex(idx)}
                        className={`w-full p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50/90 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                            : 'bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 text-slate-800 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'}`}>
                            <Car className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900 font-cinzel">
                              {vehicle.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {vehicle.category} · {vehicle.passengers} Seats
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs sm:text-sm font-black text-blue-900 font-mono">
                            {formatPrice(vehicle.dailyRateUSD, currentCurrency)}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">/ day</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rental Duration Slider */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600 font-bold">Rental Duration:</span>
                  <span className="text-blue-900 font-black text-sm bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Number(e.target.value))}
                  className="w-full accent-blue-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-500 font-semibold">
                  <span>1 Day</span>
                  <span>7 Days</span>
                  <span>14 Days (Mustang Circuit)</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Vehicle Showcase */}
            <div className="lg:col-span-7">
              <TiltCard
                maxTilt={4}
                scale={1.01}
                className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group"
              >
                <div className="relative h-[280px] sm:h-[380px] md:h-[420px] w-full overflow-hidden">
                  <img
                    src={currentVehicle.image}
                    alt={currentVehicle.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-emerald-800 shadow-sm">
                      Driver &amp; Fuel Included
                    </span>

                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-blue-900/90 text-xs font-bold text-amber-300 shadow-sm">
                      Off-Road Ready 4x4
                    </span>
                  </div>

                  {/* Bottom Vehicle Info */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-2 sm:space-y-3">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-white">
                      {currentVehicle.name}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/20 text-xs text-sky-100 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-300" />
                        <span>{currentVehicle.passengers} Seats</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Luggage className="w-3.5 h-3.5 text-amber-300" />
                        <span>{currentVehicle.luggage} Bags</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-amber-300" />
                        <span>Manual 4WD</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div>
                        <div className="text-[10px] text-sky-200">Total Price ({rentalDays} Days)</div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
                          {formatPrice(currentVehicle.dailyRateUSD * rentalDays, currentCurrency)}
                        </div>
                      </div>

                      <button
                        onClick={() => onBookVehicle(currentVehicle, rentalDays)}
                        className="py-2.5 sm:py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Reserve Vehicle</span>
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04: ALL-IN-ONE PACKAGES (Combos)                                 */}
      {/* ========================================================================= */}
      <section id="odysseys" className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#fcf7ee] via-white to-[#eef5fc]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-amber-900 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>04. SAVE WITH COMBO PACKAGES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-black text-slate-900 tracking-tight">
              All-In-One Travel Bundles
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal leading-relaxed">
              Combine your flights, luxury hotels, and private 4WD car into a single booking. Save up to 25% compared to booking separately.
            </p>
          </div>

          {/* Combo Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {COMBO_PACKAGES.map((pkg) => (
              <TiltCard
                key={pkg.id}
                maxTilt={4}
                scale={1.01}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-md hover:shadow-xl flex flex-col justify-between group hover:border-blue-400 transition-all"
              >
                {/* Image & Header */}
                <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 shadow-sm">
                      {pkg.bundleType}
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md">
                      SAVE {pkg.savingsPercentage}%
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-bold text-amber-300 block">
                      {pkg.durationDays} Days / {pkg.durationDays - 1} Nights
                    </span>
                    <h3 className="text-base sm:text-lg font-cinzel font-bold text-white leading-tight mt-0.5">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* Bundle Inclusions */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {pkg.tagline}
                  </p>

                  <div className="space-y-2 bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 text-xs">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                      Package Includes:
                    </div>
                    {pkg.includes.flight && (
                      <div className="flex items-center gap-2 text-slate-800 font-medium">
                        <Plane className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span className="truncate">{pkg.includes.flight}</span>
                      </div>
                    )}
                    {pkg.includes.hotel && (
                      <div className="flex items-center gap-2 text-slate-800 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{pkg.includes.hotel}</span>
                      </div>
                    )}
                    {pkg.includes.vehicle && (
                      <div className="flex items-center gap-2 text-slate-800 font-medium">
                        <Car className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="truncate">{pkg.includes.vehicle}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing & Booking */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 line-through">
                        {formatPrice(pkg.originalPriceUSD, currentCurrency)}
                      </div>
                      <div className="text-xl sm:text-2xl font-black font-mono text-blue-900">
                        {formatPrice(pkg.discountedPriceUSD, currentCurrency)}
                      </div>
                    </div>

                    <button
                      onClick={() => onBookPackage(pkg)}
                      className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Book Package</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
