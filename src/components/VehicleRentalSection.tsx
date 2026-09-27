import React, { useState, useMemo } from 'react';
import { Vehicle, Currency } from '../types/travel';
import { VEHICLES_DATA } from '../data/travelData';
import { formatPrice } from '../utils/formatters';
import { TiltCard } from './TiltCard';
import { Car, Users, Briefcase, Fuel, Shield, Check, ArrowRight, Compass, Mountain, Gauge } from 'lucide-react';

interface VehicleRentalSectionProps {
  currentCurrency: Currency;
  onBookVehicle: (vehicle: Vehicle, days: number) => void;
  selectedCategory?: string;
}

export const VehicleRentalSection: React.FC<VehicleRentalSectionProps> = ({
  currentCurrency,
  onBookVehicle,
  selectedCategory,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedRentalDays, setSelectedRentalDays] = useState<Record<string, number>>({});

  const categories = ['All', '4WD Mountain SUV', 'Deluxe Tourist Van', 'Eco Electric SUV', 'Luxury Executive Sedan'];

  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATA.filter((vehicle) => {
      const categoryFilter = selectedCategory && selectedCategory !== 'All' ? selectedCategory : activeCategory;
      if (categoryFilter === 'All') return true;
      return vehicle.category.toLowerCase().includes(categoryFilter.toLowerCase());
    });
  }, [activeCategory, selectedCategory]);

  const handleDaysChange = (vehicleId: string, days: number) => {
    setSelectedRentalDays((prev) => ({
      ...prev,
      [vehicleId]: days,
    }));
  };

  return (
    <section id="vehicles" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            <Car className="w-4 h-4 text-amber-600" />
            <span>Service 03 · Private Fleet &amp; 4WD Expeditions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-slate-900 tracking-tight">
            Chauffeured Mountain Fleet &amp; Rentals
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
            Heavy-duty 4x4 Scorpio &amp; Land Cruisers for Himalayan mountain highways, deluxe HiAce vans for groups, and VIP executive airport sedans.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? 'All Fleet' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => {
          const days = selectedRentalDays[vehicle.id] || 3;
          const totalPrice = vehicle.dailyRateUSD * days;

          return (
            <TiltCard
              key={vehicle.id}
              maxTilt={5}
              scale={1.01}
              className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-3xl overflow-hidden transition-all shadow-sm hover:shadow-xl flex flex-col group"
            >
              {/* Image banner */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-blue-900 flex items-center gap-1 shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-blue-700" />
                  <span>{vehicle.category}</span>
                </div>

                <div className="absolute top-3 right-3 bg-blue-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-amber-300 shadow-sm border border-blue-800">
                  Chauffeur &amp; Fuel Included
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-950/70 backdrop-blur-xs border border-white/20">
                    <Mountain className="w-3 h-3 text-amber-300" />
                    <span>Extreme Himalayan Clearance</span>
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">100% Insured</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {vehicle.name}
                  </h3>

                  {/* Vehicle Specs row */}
                  <div className="mt-3 grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>{vehicle.passengers} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>{vehicle.luggage} Bags</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span className="truncate">{vehicle.transmission}</span>
                    </div>
                  </div>

                  {/* Terrain recommendation */}
                  <div className="mt-3 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">Best For: </span>
                    <span>{vehicle.recommendedFor}</span>
                  </div>

                  {/* Feature checklist */}
                  <div className="mt-3 space-y-1.5">
                    {vehicle.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Days Selector */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Rental Duration:
                    </label>
                    <select
                      value={days}
                      onChange={(e) => handleDaysChange(vehicle.id, Number(e.target.value))}
                      className="bg-slate-50 border border-slate-300 text-slate-900 font-semibold rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 7, 10, 14].map((d) => (
                        <option key={d} value={d}>
                          {d} {d === 1 ? 'Day' : 'Days'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      {formatPrice(vehicle.dailyRateUSD, currentCurrency)}/day
                    </span>
                    <span className="text-2xl font-black font-mono text-blue-900 tabular-nums">
                      {formatPrice(totalPrice, currentCurrency)}
                    </span>
                    <span className="text-[11px] text-slate-500 ml-1 font-medium">({days}d total)</span>
                  </div>

                  <button
                    onClick={() => onBookVehicle(vehicle, days)}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <span>Reserve Fleet</span>
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
