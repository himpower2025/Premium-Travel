import React, { useState, useEffect } from 'react';
import { Currency, Flight, Hotel, Vehicle, ComboPackage, ServiceType } from '../types/travel';
import { FLIGHTS_DATA, HOTELS_DATA, VEHICLES_DATA, COMBO_PACKAGES } from '../data/travelData';
import { formatPrice } from '../utils/formatters';
import { TiltCard } from './TiltCard';
import {
  Plane,
  Building2,
  Car,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  Mountain,
  MapPin,
  Clock,
  Gauge,
  Wifi,
  Coffee,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface InteractiveStageShowcaseProps {
  currentCurrency: Currency;
  onBookFlight: (flight: Flight) => void;
  onBookHotel: (hotel: Hotel, roomTypeIndex: number) => void;
  onBookVehicle: (vehicle: Vehicle, rentalDays: number) => void;
  onBookPackage: (pkg: ComboPackage) => void;
  onJumpToSection: (sectionId: ServiceType) => void;
}

interface StageSlide {
  id: string;
  categoryNumber: string;
  categoryTag: string;
  title: string;
  subtitle: string;
  serviceType: 'flights' | 'hotels' | 'vehicles' | 'promotions';
  image: string;
  badge: string;
  altitude: string;
  location: string;
  keySpecs: { label: string; value: string; icon: React.ReactNode }[];
  priceUSD: number;
  priceNote: string;
  targetItem: Flight | Hotel | Vehicle | ComboPackage;
  features: string[];
}

export const InteractiveStageShowcase: React.FC<InteractiveStageShowcaseProps> = ({
  currentCurrency,
  onBookFlight,
  onBookHotel,
  onBookVehicle,
  onBookPackage,
  onJumpToSection,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // 4 Core Master Services representing the high-end multi-angle travel ecosystem
  const slides: StageSlide[] = [
    {
      id: 'aviation',
      categoryNumber: '01',
      categoryTag: 'PRIVATE & DOMESTIC AVIATION',
      title: 'Himalayan Flight Corridors & Lukla Skyways',
      subtitle: 'Pressurized ATR 72-500 & Twin Otter mountain flights with direct runway transfers & priority baggage clearance.',
      serviceType: 'flights',
      image: '/images/hero_himalayas_travel_1790502254393.jpg',
      badge: 'Certified High-Altitude Operator',
      altitude: '8,848m Peak Views · 2,846m Lukla Runway',
      location: 'Kathmandu (KTM) ⇄ Lukla (LUA) / Pokhara (PKR)',
      keySpecs: [
        { label: 'Air Time', value: '25 - 35 Min', icon: <Clock className="w-3.5 h-3.5 text-amber-500" /> },
        { label: 'Baggage', value: '20kg + 7kg Cabin', icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> },
        { label: 'Lounge', value: 'VIP Fast Track Pass', icon: <Coffee className="w-3.5 h-3.5 text-emerald-600" /> },
      ],
      priceUSD: 95,
      priceNote: 'per passenger / one way',
      targetItem: FLIGHTS_DATA[0],
      features: ['Real-time weather radar clearance', 'Guaranteed left-window Everest seat', 'Instant official e-ticket issuance'],
    },
    {
      id: 'resorts',
      categoryNumber: '02',
      categoryTag: 'SANCTUARY RESORTS & LODGES',
      title: 'The Pavilions Himalayas Luxury Lake Sanctuary',
      subtitle: 'Award-winning eco-luxury villa resort nestled in the valley folds of Pokhara with Annapurna panoramic vistas.',
      serviceType: 'hotels',
      image: '/images/hotel_nepal_resort_1790502269336.jpg',
      badge: '5-Star Platinum Eco-Sanctuary',
      altitude: '822m Pokhara Valley View',
      location: 'Phewa Lake Foothills, Pokhara, Nepal',
      keySpecs: [
        { label: 'Rating', value: '5-Star Luxury (4.9/5)', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
        { label: 'Amenities', value: 'Infinity Pool & Spa', icon: <Wifi className="w-3.5 h-3.5 text-blue-600" /> },
        { label: 'Dining', value: 'Organic Farm-to-Table', icon: <Coffee className="w-3.5 h-3.5 text-emerald-600" /> },
      ],
      priceUSD: 245,
      priceNote: 'per villa night / breakfast incl.',
      targetItem: HOTELS_DATA[0],
      features: ['Private terrace facing Machapuchare', 'Full spa & yoga pavilion access', 'Chauffeured airport meet & greet'],
    },
    {
      id: 'fleet',
      categoryNumber: '03',
      categoryTag: '4WD EXPEDITION FLEET',
      title: 'Mahindra Scorpio 4x4 & Toyota Prado Armory',
      subtitle: 'Heavy-duty four-wheel-drive expedition vehicles with veteran English-speaking Himalayan mountain drivers.',
      serviceType: 'vehicles',
      image: '/images/fleet_nepal_suv_1790502281718.jpg',
      badge: 'Extreme Terrain All-Access Fleet',
      altitude: 'Rated up to 4,200m Mustang & Manang Passes',
      location: 'Available Nationwide · Kathmandu / Pokhara / Chitwan',
      keySpecs: [
        { label: 'Drivetrain', value: 'Full Low-Range 4WD', icon: <Gauge className="w-3.5 h-3.5 text-amber-500" /> },
        { label: 'Chauffeur', value: 'Licensed Mountain Driver', icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> },
        { label: 'Capacity', value: '7 Passenger + Rooftop Box', icon: <Car className="w-3.5 h-3.5 text-emerald-600" /> },
      ],
      priceUSD: 110,
      priceNote: 'per day / driver & fuel included',
      targetItem: VEHICLES_DATA[0],
      features: ['Full comprehensive liability insurance', 'High-altitude emergency medical kit', 'Unlimited mountain luggage capacity'],
    },
    {
      id: 'combos',
      categoryNumber: '04',
      categoryTag: 'VIP SIGNATURE COMBOS',
      title: 'The Himalayan Triple Crown (3-in-1 Odyssey)',
      subtitle: 'Return flights + 3 nights 5-star mountain resort + private chauffeured 4WD SUV at 25% bundled savings.',
      serviceType: 'promotions',
      image: '/images/package_everest_safari_1790502295387.jpg',
      badge: 'All-Inclusive Luxury Signature Tour',
      altitude: 'Multi-Altitude: 1,400m ⇄ 822m ⇄ 3,800m',
      location: 'Kathmandu + Pokhara + Annapurna Panorama',
      keySpecs: [
        { label: 'Duration', value: '4 Days / 3 Nights', icon: <Calendar className="w-3.5 h-3.5 text-amber-500" /> },
        { label: 'Included', value: 'Flights + Lodge + 4WD', icon: <Layers className="w-3.5 h-3.5 text-blue-600" /> },
        { label: 'Savings', value: 'Save $270 Instantly', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> },
      ],
      priceUSD: 810,
      priceNote: 'total bundle / 2 guests included',
      targetItem: COMBO_PACKAGES[0],
      features: ['Dedicated 24/7 VIP Travel Concierge', 'Official single government e-voucher', 'Free rescheduling up to 72h prior'],
    },
  ];

  const currentSlide = slides[activeSlideIndex];

  // Auto-play interval toggle
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleBookCurrentSlide = () => {
    if (currentSlide.serviceType === 'flights') {
      onBookFlight(currentSlide.targetItem as Flight);
    } else if (currentSlide.serviceType === 'hotels') {
      onBookHotel(currentSlide.targetItem as Hotel, 0);
    } else if (currentSlide.serviceType === 'vehicles') {
      onBookVehicle(currentSlide.targetItem as Vehicle, 3);
    } else {
      onBookPackage(currentSlide.targetItem as ComboPackage);
    }
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f2f6fa] via-white to-[#edf3f8] overflow-hidden border-b border-slate-200/80">
      {/* Subtle Background Architectural Grid Lines for Spatial Depth */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header: Flyward-style High-End Narrative */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-widest uppercase mb-2">
              <Compass className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
              <span>Interactive Service Stage · 3D Multi-Angle Deck</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-extrabold text-slate-900 tracking-tight">
              Curated Himalayan Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
              Experience seamless transition between private flights, sanctuary mountain lodges, 4WD expedition fleets, and VIP combos.
            </p>
          </div>

          {/* Service Switcher Tabs (01, 02, 03, 04) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner overflow-x-auto">
            {slides.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                    {slide.categoryNumber}
                  </span>
                  <span>{slide.categoryTag.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Multi-Position Interactive Stage */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* POSITION 1 (Left 3.5 cols): Floating Telemetry & High-Altitude Specs */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/90 shadow-xl shadow-slate-200/60 relative overflow-hidden flex-1 flex flex-col justify-between">
              {/* Category Badge & Number Watermark */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-200">
                  {currentSlide.badge}
                </span>
                <span className="text-3xl font-black font-mono text-slate-200 select-none">
                  {currentSlide.categoryNumber}
                </span>
              </div>

              {/* Title & Narrative */}
              <div className="my-4">
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-slate-900 leading-snug">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Altitude & Spatial Position Indicator */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 my-2 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-950">
                  <Mountain className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="truncate">{currentSlide.altitude}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">{currentSlide.location}</span>
                </div>
              </div>

              {/* Inclusions Checklist */}
              <div className="space-y-1.5 my-3">
                {currentSlide.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Specs Telemetry Triad */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 mt-2">
                {currentSlide.keySpecs.map((spec, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                    <div className="flex justify-center mb-1">{spec.icon}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tight">{spec.label}</div>
                    <div className="text-[11px] font-bold text-slate-800 truncate">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Interactive Slide Navigator */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Previous service"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Next service"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-semibold text-slate-500 ml-1">
                  0{activeSlideIndex + 1} / 0{slides.length}
                </span>
              </div>

              <button
                onClick={() => onJumpToSection(currentSlide.serviceType)}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View All In This Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* POSITION 2 (Center 5 cols): 3D Perspective Stage with Dynamic Tilt */}
          <div className="lg:col-span-5 flex flex-col">
            <TiltCard
              maxTilt={10}
              scale={1.01}
              className="relative w-full h-[400px] lg:h-full min-h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-950/20 border border-slate-200"
            >
              {/* Main Cinematic Image */}
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('unsplash')) {
                    target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80';
                  }
                }}
              />

              {/* Luminous Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* Top Floating Glass Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
                <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Dispatch Available</span>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold">
                  {currentSlide.categoryTag}
                </div>
              </div>

              {/* Bottom 3D Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                <div className="text-xs uppercase font-mono tracking-widest text-amber-300 font-bold mb-1">
                  Featured Experience
                </div>
                <h4 className="text-xl sm:text-2xl font-cinzel font-bold drop-shadow-md">
                  {currentSlide.title}
                </h4>
                <div className="flex items-center gap-4 mt-3 text-xs text-sky-100 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {currentSlide.location.split('·')[0]}
                  </span>
                  <span>•</span>
                  <span>Direct Departure Guarantee</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* POSITION 3 (Right 3 cols): Interactive Instant Action Hub & Pricing Matrix */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
            <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-blue-900/40 relative overflow-hidden flex-1 flex flex-col justify-between">
              
              {/* Top Price Card */}
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-blue-300 font-medium">
                  Official Direct Tariff
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 tracking-tight">
                    {formatPrice(currentSlide.priceUSD, currentCurrency)}
                  </span>
                </div>
                <div className="text-xs text-sky-200/80 mt-1 font-medium">
                  {currentSlide.priceNote}
                </div>
              </div>

              {/* Instant Benefit Badges */}
              <div className="my-6 space-y-3 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Guaranteed Seat &amp; Booking</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Instant Government E-Voucher</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>24/7 Dedicated Concierge Support</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBookCurrentSlide}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transform active:scale-98 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book This &amp; Issue E-Voucher</span>
                </button>

                <button
                  onClick={() => onJumpToSection(currentSlide.serviceType)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-blue-300" />
                  <span>Explore Full Catalog</span>
                </button>
              </div>

              {/* Government Stamp Footer */}
              <div className="pt-4 border-t border-white/10 text-center text-[10px] text-sky-300/70 font-mono">
                Regd. Travel Agency No. 19842 · Nepal
              </div>
            </div>

            {/* Live Mode Controls */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-sm flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Auto-Cycle Stage:</span>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  isAutoPlaying ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isAutoPlaying ? 'Active (6s)' : 'Manual'}
              </button>
            </div>
          </div>

        </div>

        {/* POSITION 4: High-Altitude Himalayan Journey Corridor (Interactive Waypoint Bar) */}
        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Nepal Altitude Corridor &amp; Territorial Hubs
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Click a hub to focus regional services
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                name: 'Kathmandu Valley',
                alt: '1,400m',
                code: 'KTM',
                desc: 'Heritage Hub & Int. Gateway',
                slideIndex: 0,
              },
              {
                name: 'Pokhara & Annapurna',
                alt: '822m',
                code: 'PKR',
                desc: 'Lakeside Resorts & Paragliding',
                slideIndex: 1,
              },
              {
                name: 'Mustang & High Himalayas',
                alt: '3,800m+',
                code: 'JOM',
                desc: '4WD Scorpio Expedition Passes',
                slideIndex: 2,
              },
              {
                name: 'Everest & Khumbu Gateway',
                alt: '2,846m - 5,364m',
                code: 'LUA/EBC',
                desc: 'Mountain Flights & Helis',
                slideIndex: 3,
              },
            ].map((node, i) => {
              const isSelected = activeSlideIndex === node.slideIndex;
              return (
                <button
                  key={i}
                  onClick={() => setActiveSlideIndex(node.slideIndex)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 shadow-sm ring-1 ring-blue-400'
                      : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold font-mono">
                    <span className={isSelected ? 'text-blue-900 font-extrabold' : 'text-slate-700'}>
                      {node.name}
                    </span>
                    <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
                      {node.alt}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{node.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
