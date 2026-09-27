import React, { useState, useEffect } from 'react';
import { Currency, ServiceType } from '../types/travel';
import {
  Plane,
  Building2,
  Car,
  Sparkles,
  Building,
  Menu,
  X,
  Phone,
  Briefcase,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  bookingCount: number;
  onOpenBookings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  activeService,
  onSelectService,
  bookingCount,
  onOpenBookings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies: Currency[] = ['USD', 'NPR', 'EUR', 'GBP'];

  const navLinks: { type: ServiceType; label: string; icon: React.ReactNode }[] = [
    { type: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
    { type: 'hotels', label: 'Hotels & Lodges', icon: <Building2 className="w-4 h-4" /> },
    { type: 'vehicles', label: '4WD Vehicles', icon: <Car className="w-4 h-4" /> },
    { type: 'promotions', label: 'Packages', icon: <Sparkles className="w-4 h-4 text-amber-300" /> },
    { type: 'about', label: 'About Us', icon: <Building className="w-4 h-4" /> },
  ];

  const handleNavClick = (service: ServiceType) => {
    onSelectService(service);
    setMobileMenuOpen(false);
    const targetMap: Record<ServiceType, string> = {
      flights: 'aviation',
      hotels: 'sanctuaries',
      vehicles: 'fleet',
      promotions: 'odysseys',
      about: 'about',
    };
    const targetId = targetMap[service] || service;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a2342]/95 backdrop-blur-md shadow-lg py-2.5 border-b border-blue-900/40'
          : 'bg-[#0c2a50] py-3.5 border-b border-blue-900/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Gov Accreditation */}
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onSelectService('flights');
          }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Plane className="w-5 h-5 text-slate-950 transform -rotate-45" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-cinzel text-base sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                Premium Travel
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                Nepal
              </span>
            </div>
            <p className="text-[10px] text-sky-200/90 tracking-wide font-sans line-clamp-1">
              Ministry of Tourism Regd. No. 19842
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((item) => {
            const isActive = activeService === item.type;
            return (
              <button
                key={item.type}
                onClick={() => handleNavClick(item.type)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-sky-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Phone, Currency Selector, Bookings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct WhatsApp / Phone Contact */}
          <a
            href="tel:+97714542890"
            className="hidden xl:flex items-center gap-2 text-xs font-medium text-sky-200 hover:text-amber-300 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
            title="Call Kathmandu Head Office"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono">+977 1 4542890</span>
          </a>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-white/10 border border-white/20 rounded-lg hover:border-amber-400 transition-colors cursor-pointer"
              title="Change Currency"
            >
              <span className="text-amber-300 font-mono">
                {currentCurrency === 'USD' ? '$' : currentCurrency === 'NPR' ? 'Rs' : currentCurrency === 'EUR' ? '€' : '£'}
              </span>
              <span>{currentCurrency}</span>
              <ChevronDown className="w-3 h-3 text-sky-200" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-2xl py-1 z-50 animate-fadeIn">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      onCurrencyChange(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between cursor-pointer hover:bg-sky-50 transition-colors ${
                      currentCurrency === curr ? 'text-amber-600 font-bold bg-amber-50' : 'text-slate-700'
                    }`}
                  >
                    <span>{curr}</span>
                    <span className="font-mono text-slate-500 text-[11px]">
                      {curr === 'USD' ? '$ USD' : curr === 'NPR' ? 'Rs NPR' : curr === 'EUR' ? '€ EUR' : '£ GBP'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bookings / Vouchers Button */}
          <button
            onClick={onOpenBookings}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-400/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">My Bookings</span>
            {bookingCount > 0 && (
              <span className="bg-slate-950 text-amber-300 text-[10px] sm:text-[11px] font-black px-1.5 py-0.2 rounded-full">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-sky-100 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0c2a50] px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navLinks.map((item) => (
            <button
              key={item.type}
              onClick={() => handleNavClick(item.type)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeService === item.type
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-sky-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-sky-200 px-3">
            <span>Kathmandu Head Office</span>
            <span className="text-amber-300 font-mono font-semibold">+977 1 4542890</span>
          </div>
        </div>
      )}
    </header>
  );
};
