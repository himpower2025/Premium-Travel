import React, { useState, useMemo } from 'react';
import { Hotel, Currency } from '../types/travel';
import { HOTELS_DATA } from '../data/travelData';
import { formatPrice } from '../utils/formatters';
import { TiltCard } from './TiltCard';
import { Building2, Star, MapPin, Check, ArrowRight, Sparkles, Mountain, ShieldCheck } from 'lucide-react';

interface HotelBookingSectionProps {
  currentCurrency: Currency;
  onBookHotel: (hotel: Hotel, roomTypeIndex: number) => void;
  selectedRegion?: string;
}

export const HotelBookingSection: React.FC<HotelBookingSectionProps> = ({
  currentCurrency,
  onBookHotel,
  selectedRegion,
}) => {
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [selectedRooms, setSelectedRooms] = useState<Record<string, number>>({});

  const regions = ['All', 'Kathmandu', 'Pokhara', 'Chitwan', 'Nagarkot', 'Everest', 'Lumbini'];

  const filteredHotels = useMemo(() => {
    return HOTELS_DATA.filter((hotel) => {
      const regionFilter = selectedRegion && selectedRegion !== 'All' ? selectedRegion : activeRegion;
      if (regionFilter === 'All') return true;
      return hotel.region.toLowerCase() === regionFilter.toLowerCase();
    });
  }, [activeRegion, selectedRegion]);

  const handleRoomSelect = (hotelId: string, index: number) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [hotelId]: index,
    }));
  };

  return (
    <section id="hotels" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Service 02 · Himalayan Retreats &amp; Stays</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-slate-900 tracking-tight">
            Nepal Accommodations &amp; Resorts
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
            From 14th-century Newari heritage sanctuaries in Kathmandu to Annapurna infinity pools and deep jungle river lodges in Chitwan.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto max-w-full">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setActiveRegion(reg)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeRegion === reg
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {reg === 'All' ? 'All Stays' : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => {
          const currentRoomIdx = selectedRooms[hotel.id] ?? 0;
          const currentRoom = hotel.roomTypes[currentRoomIdx] || hotel.roomTypes[0];
          const calculatedPrice = hotel.pricePerNightUSD + (currentRoom?.extraPriceUSD || 0);

          return (
            <TiltCard
              key={hotel.id}
              maxTilt={5}
              scale={1.01}
              className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-3xl overflow-hidden transition-all shadow-sm hover:shadow-xl flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('unsplash')) {
                      target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Region Tag */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-blue-900 flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-blue-700" />
                  <span>{hotel.region}</span>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold text-white flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-mono">{hotel.rating.toFixed(1)}</span>
                  <span className="text-slate-300 text-[10px]">({hotel.reviewsCount})</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-950/70 backdrop-blur-xs border border-white/20">
                    <Mountain className="w-3 h-3 text-amber-300" />
                    <span>Himalayan Vista Sanctuary</span>
                  </span>
                  <span className="text-amber-300 font-bold font-mono">Breakfast Incl.</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {hotel.description}
                  </p>

                  {/* Amenities highlights */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-[11px] text-slate-500 py-0.5">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Room Type Selector */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Room Category:
                    </label>
                    <select
                      value={currentRoomIdx}
                      onChange={(e) => setSelectedRooms((prev) => ({ ...prev, [hotel.id]: Number(e.target.value) }))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      {hotel.roomTypes.map((room, idx) => (
                        <option key={idx} value={idx}>
                          {room.name} {room.extraPriceUSD > 0 ? `(+${formatPrice(room.extraPriceUSD, currentCurrency)})` : '(Standard)'}
                        </option>
                      ))}
                    </select>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>Bed: {currentRoom.bed}</span>
                      <span>View: {currentRoom.view}</span>
                    </div>
                  </div>
                </div>

                {/* Price and Booking Action */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">Nightly Rate</span>
                    <span className="text-2xl font-black font-mono text-blue-900 tabular-nums">
                      {formatPrice(calculatedPrice, currentCurrency)}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookHotel(hotel, currentRoomIdx)}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <span>Reserve Room</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};
