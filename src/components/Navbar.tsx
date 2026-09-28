import React, { useState, useEffect } from 'react';
import { Currency, ServiceType } from '../types/travel';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  Plane,
  Building2,
  Car,
  Sparkles,
  Building,
  Menu,
  X,
  ChevronDown,
  Compass
} from 'lucide-react';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  bookingCount?: number;
  onOpenBookings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  activeService,
  onSelectService,
}) => {
  const { siteConfig } = useSiteConfig();
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

  const getMenuIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-4 h-4" />;
      case 'Building2':
        return <Building2 className="w-4 h-4" />;
      case 'Car':
        return <Car className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-300" />;
      case 'Building':
        return <Building className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  const handleNavClick = (targetSectionId: string, serviceKey: string) => {
    onSelectService(serviceKey as ServiceType);
    setMobileMenuOpen(false);
    const element = document.getElementById(targetSectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const visibleMenus = siteConfig.menus
    .filter((m) => m.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a2342]/95 backdrop-blur-md shadow-lg py-2.5 border-b border-blue-900/40'
          : 'bg-[#0c2a50] py-3.5 border-b border-blue-900/30'
      }`}
    >
      {/* Optional Top Live Announcement Ticker */}
      {siteConfig.company.tickerActive && siteConfig.company.tickerNotice && (
        <div className="bg-amber-400 text-slate-950 text-[11px] font-bold py-1 px-4 text-center flex items-center justify-center gap-2 overflow-hidden select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
          <span className="truncate">{siteConfig.company.tickerNotice}</span>
        </div>
      )}

      <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 flex items-center justify-between">
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
              Govt. Reg # {siteConfig.company.registrationNumber}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links - Spacious, Centered & Clean */}
        <nav className="hidden lg:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {visibleMenus.map((item) => {
            const isActive = activeService === item.key;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.targetSectionId, item.key)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-sky-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {getMenuIcon(item.icon)}
                <span>{item.labelEn}</span>
                {item.badge && (
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-slate-950 text-amber-300' : 'bg-amber-400 text-slate-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Currency Switcher & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-white/10 border border-white/20 rounded-lg hover:border-amber-400 transition-colors cursor-pointer"
              title="Change Currency"
            >
              <span className="text-amber-300 font-mono font-bold">
                {currentCurrency === 'USD' ? '$' : currentCurrency === 'NPR' ? 'Rs' : currentCurrency === 'EUR' ? '€' : '£'}
              </span>
              <span>{currentCurrency}</span>
              <ChevronDown className="w-3.5 h-3.5 text-sky-200" />
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
          {visibleMenus.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.targetSectionId, item.key)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeService === item.key
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-sky-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {getMenuIcon(item.icon)}
                <span>{item.labelEn}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-950 text-amber-300">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
