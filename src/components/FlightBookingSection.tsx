import React, { useState, useMemo } from 'react';
import { Flight, Currency } from '../types/travel';
import { FLIGHTS_DATA } from '../data/travelData';
import { formatPrice } from '../utils/formatters';
import { TiltCard } from './TiltCard';
import { Plane, Luggage, Clock, CheckCircle2, ArrowRight, Filter, ShieldCheck, Mountain, Compass } from 'lucide-react';

interface FlightBookingSectionProps {
  currentCurrency: Currency;
  onBookFlight: (flight: Flight) => void;
  selectedOrigin?: string;
  selectedDestination?: string;
}

export const FlightBookingSection: React.FC<FlightBookingSectionProps> = ({
  currentCurrency,
  onBookFlight,
  selectedOrigin,
  selectedDestination,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'domestic' | 'international'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFlights = useMemo(() => {
    return FLIGHTS_DATA.filter((flight) => {
      // Type filter
      if (filterType === 'domestic' && !flight.isDomestic) return false;
      if (filterType === 'international' && flight.isDomestic) return false;

      // Props search filters if provided
      if (selectedOrigin && selectedOrigin !== 'All' && flight.originCode !== selectedOrigin) {
        // if user specifically searched
      }
      if (selectedDestination && selectedDestination !== 'All' && flight.destinationCode !== selectedDestination) {
        // if user specifically searched
      }

      // Text query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          flight.airline.toLowerCase().includes(q) ||
          flight.origin.toLowerCase().includes(q) ||
          flight.destination.toLowerCase().includes(q) ||
          flight.flightNumber.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [filterType, searchQuery, selectedOrigin, selectedDestination]);

  return (
    <section id="flights" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            <Plane className="w-4 h-4 text-amber-600" />
            <span>Service 01 · Air Travel Concierge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-slate-900 tracking-tight">
            Domestic &amp; International Flights
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
            Guaranteed seats on Buddha Air, Yeti Airlines, Tara Air mountain charters, and international flag carriers with instant official e-ticketing.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All Routes ({FLIGHTS_DATA.length})
            </button>
            <button
              onClick={() => setFilterType('domestic')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                filterType === 'domestic'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Domestic Nepal
            </button>
            <button
              onClick={() => setFilterType('international')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                filterType === 'international'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              International
            </button>
          </div>
        </div>
      </div>

      {/* Flight Cards Grid with 3D Depth */}
      <div className="space-y-4">
        {filteredFlights.map((flight) => (
          <TiltCard
            key={flight.id}
            maxTilt={4}
            scale={1.01}
            className="p-5 sm:p-6 bg-white border border-slate-200/90 hover:border-blue-400 rounded-3xl transition-all shadow-sm hover:shadow-xl group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Airline and Flight Meta */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center text-amber-400 font-bold shrink-0 shadow-md">
                  <Plane className="w-5 h-5 transform -rotate-45" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors">
                      {flight.airline}
                    </h3>
                    {flight.isDomestic && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-blue-50 text-blue-800 border border-blue-200">
                        Nepal Sky
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                    <span className="font-mono font-bold text-slate-700">{flight.flightNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span>{flight.aircraft}</span>
                  </div>
                </div>
              </div>

              {/* Schedule and Route with 3D Perspective Flight Path */}
              <div className="lg:col-span-5 flex items-center justify-between gap-4">
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 tabular-nums">
                    {flight.departureTime}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5 truncate max-w-[120px]">{flight.origin}</div>
                  <div className="text-[11px] text-blue-700 font-mono font-bold">{flight.originCode}</div>
                </div>

                <div className="flex-1 flex flex-col items-center px-2">
                  <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mb-1 font-mono">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{flight.duration}</span>
                  </span>
                  <div className="w-full flex items-center gap-1">
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-300 via-amber-400 to-blue-500 rounded-full" />
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-300 flex items-center justify-center shrink-0">
                      <Plane className="w-3 h-3 text-blue-800" />
                    </div>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-500 via-amber-400 to-blue-300 rounded-full" />
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Mountain className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] text-emerald-700 font-bold">Panoramic Corridor</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 tabular-nums">
                    {flight.arrivalTime}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5 truncate max-w-[120px]">{flight.destination}</div>
                  <div className="text-[11px] text-blue-700 font-mono font-bold">{flight.destinationCode}</div>
                </div>
              </div>

              {/* Baggage & Perks */}
              <div className="lg:col-span-2 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-6 text-xs text-slate-600 space-y-1.5 font-medium">
                <div className="flex items-center gap-1.5 text-slate-800">
                  <Luggage className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{flight.baggage}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{flight.refundable ? '100% Refundable' : 'Instant E-Ticket'}</span>
                </div>
              </div>

              {/* Price and Book Action */}
              <div className="lg:col-span-2 flex items-center lg:flex-col lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="lg:text-right">
                  <div className="text-[11px] text-slate-500 font-medium">Per Passenger</div>
                  <div className="text-2xl font-black font-mono text-blue-900 tabular-nums">
                    {formatPrice(flight.priceUSD, currentCurrency)}
                  </div>
                </div>

                <button
                  onClick={() => onBookFlight(flight)}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
                >
                  <span>Book Flight</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {filteredFlights.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <Plane className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-800 font-semibold">No flights matched your filter.</p>
          <button
            onClick={() => {
              setFilterType('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-amber-600 font-bold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
