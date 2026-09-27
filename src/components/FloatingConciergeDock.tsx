import React, { useState, useEffect } from 'react';
import { Plane, Building2, Car, Sparkles, Briefcase, ChevronUp, Phone, Compass, MessageSquare } from 'lucide-react';
import { ServiceType } from '../types/travel';

interface FloatingConciergeDockProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  bookingCount: number;
  onOpenBookings: () => void;
}

export const FloatingConciergeDock: React.FC<FloatingConciergeDockProps> = ({
  activeService,
  onSelectService,
  bookingCount,
  onOpenBookings,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'flights' as ServiceType, label: 'Flights', icon: <Plane className="w-4 h-4" /> },
    { id: 'hotels' as ServiceType, label: 'Hotels', icon: <Building2 className="w-4 h-4" /> },
    { id: 'vehicles' as ServiceType, label: '4WD Cars', icon: <Car className="w-4 h-4" /> },
    { id: 'promotions' as ServiceType, label: 'Packages', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
  ];

  return (
    <aside
      aria-label="Floating Travel Navigation"
      className={`fixed right-3 sm:right-6 bottom-4 sm:bottom-6 z-40 transition-all duration-300 ${
        scrolled ? 'opacity-100 translate-y-0' : 'opacity-95 translate-y-0'
      }`}
    >
      <div className="flex flex-col items-end gap-2">
        {/* Expanded Quick Travel Support Menu */}
        {expanded && (
          <div className="bg-white/95 backdrop-blur-xl border border-blue-200/80 p-4 rounded-2xl sm:rounded-3xl shadow-2xl text-slate-800 w-64 sm:w-72 animate-fadeIn space-y-3 mb-1">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>24/7 Travel Support</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Online Now
              </span>
            </div>

            <div className="text-xs text-slate-600 leading-snug">
              Official Nepal Government licensed agency. Direct bookings with instant verified e-vouchers.
            </div>

            <div className="space-y-2">
              <a
                href="tel:+97714418900"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-medium text-slate-800 border border-slate-200/60 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call Office</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-blue-700">+977 1 4418900</span>
              </a>

              <a
                href="https://wa.me/9779851029842"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-xs font-medium text-emerald-900 border border-emerald-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Chat</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-700">Instant Reply</span>
              </a>
            </div>

            <button
              onClick={() => {
                onOpenBookings();
                setExpanded(false);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Briefcase className="w-4 h-4" />
              <span>View My Bookings ({bookingCount})</span>
            </button>
          </div>
        )}

        {/* Floating Pill Bar */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-white/95 backdrop-blur-xl border border-blue-200/80 rounded-full shadow-xl shadow-blue-900/10 text-slate-700">
          {/* Service Switchers */}
          {navItems.map((item) => {
            const isActive = activeService === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectService(item.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
                title={`Explore ${item.label}`}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}

          <div className="w-[1px] h-5 bg-slate-200 mx-0.5" />

          {/* My Bookings Trigger */}
          <button
            onClick={onOpenBookings}
            className="relative p-2 rounded-full hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors"
            title="My Bookings & E-Vouchers"
          >
            <Briefcase className="w-4 h-4" />
            {bookingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center shadow">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Quick Info Menu Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`p-2 rounded-full transition-colors ${
              expanded ? 'bg-amber-500 text-white shadow-sm' : 'hover:bg-blue-50 text-slate-700 hover:text-blue-700'
            }`}
            title="Travel Concierge & Contact"
          >
            <Compass className="w-4 h-4" />
          </button>

          {/* Scroll to Top */}
          {scrolled && (
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full hover:bg-blue-50 text-slate-500 hover:text-blue-700 transition-colors"
              title="Return to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
