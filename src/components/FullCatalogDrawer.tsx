import React, { useState } from 'react';
import { Currency, Flight, Hotel, Vehicle } from '../types/travel';
import { FLIGHTS_DATA, HOTELS_DATA, VEHICLES_DATA } from '../data/travelData';
import { formatPrice } from '../utils/formatters';
import {
  X,
  Plane,
  Building2,
  Car,
  Search,
  Star
} from 'lucide-react';

interface FullCatalogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: 'flights' | 'hotels' | 'vehicles';
  currentCurrency: Currency;
  onBookFlight: (flight: Flight) => void;
  onBookHotel: (hotel: Hotel, roomTypeIndex: number) => void;
  onBookVehicle: (vehicle: Vehicle, rentalDays: number) => void;
}

export const FullCatalogDrawer: React.FC<FullCatalogDrawerProps> = ({
  isOpen,
  onClose,
  initialCategory = 'flights',
  currentCurrency,
  onBookFlight,
  onBookHotel,
  onBookVehicle,
}) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'vehicles'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filtered lists
  const filteredFlights = FLIGHTS_DATA.filter((f) =>
    f.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.flightNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHotels = HOTELS_DATA.filter((h) =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVehicles = VEHICLES_DATA.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-xl sm:max-w-2xl bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl text-slate-900">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white">
          <div>
            <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
              Complete Travel Catalog
            </div>
            <h2 className="text-lg sm:text-xl font-cinzel font-bold mt-0.5">
              All Flights, Hotels &amp; 4WD Vehicles
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Search Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-100 bg-slate-50 space-y-2.5 sm:space-y-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('flights')}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'flights' ? 'bg-blue-900 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Flights ({FLIGHTS_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'hotels' ? 'bg-blue-900 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Hotels ({HOTELS_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('vehicles')}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'vehicles' ? 'bg-blue-900 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Vehicles ({VEHICLES_DATA.length})</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Filter ${activeTab} by name or location...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs"
            />
          </div>
        </div>

        {/* Catalog Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[#f8fafc]">
          {/* Flights list */}
          {activeTab === 'flights' && (
            <div className="space-y-3">
              {filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 transition-all space-y-3 shadow-xs hover:shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-900 font-bold">{flight.airline} · {flight.flightNumber}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">{flight.aircraft}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg sm:text-xl font-bold font-mono text-slate-900">{flight.originCode}</div>
                      <div className="text-[11px] text-slate-500">{flight.departureTime}</div>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <span className="text-[10px] text-slate-400">{flight.duration}</span>
                      <div className="w-20 sm:w-24 h-[1px] bg-slate-200 relative my-1">
                        <Plane className="w-3 h-3 text-blue-700 absolute left-1/2 -top-1.5 -translate-x-1/2 transform -rotate-45" />
                      </div>
                      <span className="text-[9px] text-emerald-700 font-bold">Non-stop</span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-bold font-mono text-slate-900">{flight.destinationCode}</div>
                      <div className="text-[11px] text-slate-500">{flight.arrivalTime}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-base sm:text-lg font-bold font-mono text-blue-900">
                      {formatPrice(flight.priceUSD, currentCurrency)}
                    </span>
                    <button
                      onClick={() => {
                        onBookFlight(flight);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-xs"
                    >
                      Book Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hotels list */}
          {activeTab === 'hotels' && (
            <div className="space-y-3">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 transition-all flex gap-3 sm:gap-4 shadow-xs hover:shadow-sm"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('unsplash')) {
                        target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80';
                      }
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-800 font-bold">{hotel.region}</span>
                        <span className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{hotel.rating.toFixed(1)}</span>
                        </span>
                      </div>
                      <h4 className="font-cinzel font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">{hotel.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{hotel.location}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-sm sm:text-base font-bold font-mono text-blue-900">
                        {formatPrice(hotel.pricePerNightUSD, currentCurrency)}/night
                      </span>
                      <button
                        onClick={() => {
                          onBookHotel(hotel, 0);
                          onClose();
                        }}
                        className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-xs"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vehicles list */}
          {activeTab === 'vehicles' && (
            <div className="space-y-3">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 transition-all flex gap-3 sm:gap-4 shadow-xs hover:shadow-sm"
                >
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('unsplash')) {
                        target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80';
                      }
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-emerald-800 font-bold">{vehicle.category}</div>
                      <h4 className="font-cinzel font-bold text-xs sm:text-sm text-slate-900">{vehicle.name}</h4>
                      <div className="flex items-center gap-2 sm:gap-3 text-[11px] text-slate-500 mt-1">
                        <span>{vehicle.passengers} Seats</span>
                        <span>•</span>
                        <span>{vehicle.luggage} Bags</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-sm sm:text-base font-bold font-mono text-blue-900">
                        {formatPrice(vehicle.dailyRateUSD, currentCurrency)}/day
                      </span>
                      <button
                        onClick={() => {
                          onBookVehicle(vehicle, 3);
                          onClose();
                        }}
                        className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-xs"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-white text-[11px] text-slate-500 flex items-center justify-between">
          <span>Government Registered Agency · License No. 19842</span>
          <button
            onClick={onClose}
            className="text-blue-700 hover:underline font-bold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
