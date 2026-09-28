import React from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { ServiceType } from '../types/travel';
import { ShieldCheck, Phone, Mail, MapPin, Award, Lock } from 'lucide-react';

interface FooterProps {
  onSelectService: (service: ServiceType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService }) => {
  const { siteConfig, setIsAdminOpen } = useSiteConfig();

  const scrollTo = (service: ServiceType) => {
    onSelectService(service);
    const targetMap: Record<ServiceType, string> = {
      flights: 'aviation',
      hotels: 'sanctuaries',
      vehicles: 'fleet',
      promotions: 'odysseys',
      about: 'about',
    };
    const targetId = targetMap[service] || service;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-blue-900/30 bg-gradient-to-br from-[#0c2340]/95 via-[#0f2d52]/95 to-[#0a1e36]/95 backdrop-blur-md text-sky-100 text-xs shadow-2xl">
      <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand & Gov Registration Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-blue-950 font-cinzel font-black text-base shadow-md shadow-amber-400/20">
                P
              </div>
              <span className="font-cinzel text-lg font-bold text-white tracking-tight">
                {siteConfig.company.nameEn}
              </span>
            </div>

            <p className="text-sky-100/80 leading-relaxed max-w-sm font-normal">
              Nepal’s leading full-service travel concierge. Providing domestic &amp; international air ticketing, boutique Himalayan mountain resorts, private chauffeured 4WD fleet rentals, and curated combo journeys.
            </p>

            <div className="pt-2 space-y-1 text-sky-200 text-[11px] font-medium">
              <div>Nepal Govt. Reg # {siteConfig.company.registrationNumber}</div>
              <div>Tourism License: {siteConfig.company.tourismLicense}</div>
              <div>PAN/VAT: {siteConfig.company.vatNumber}</div>
              <div>Member: NATTA &amp; TAAN (Nepal)</div>
            </div>
          </div>

          {/* Quick Navigation 1: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Travel Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('flights')}
                  className="text-sky-200/90 hover:text-amber-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Domestic &amp; Mountain Flights
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('hotels')}
                  className="text-sky-200/90 hover:text-amber-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Hotels &amp; Himalayan Resorts
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('vehicles')}
                  className="text-sky-200/90 hover:text-amber-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Chauffeured 4WD Fleet &amp; Vans
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('promotions')}
                  className="text-amber-300 hover:text-amber-200 transition-colors cursor-pointer text-left font-bold"
                >
                  2-in-1 &amp; 3-in-1 Combo Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="text-sky-200/90 hover:text-amber-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Company Credentials &amp; About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-sky-200/80 font-medium">
              <li>Kathmandu Heritage Valley</li>
              <li>Pokhara &amp; Annapurna Range</li>
              <li>Everest Base Camp &amp; Lukla</li>
              <li>Chitwan Wildlife Sanctuary</li>
              <li>Nagarkot Himalayan Sunrise Ridge</li>
              <li>Lumbini (Lord Buddha Birthplace)</li>
            </ul>
          </div>

          {/* Contact & Emergency Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              24/7 Operations Desk
            </h4>
            <div className="space-y-2.5 text-sky-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight text-sky-100/90">{siteConfig.company.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-white text-[11px] font-bold">{siteConfig.company.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-amber-300 text-[11px] font-semibold">{siteConfig.company.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Link */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-sky-200/70">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.company.nameEn}. All rights reserved. Registered under the laws of Nepal.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-all cursor-pointer bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-lg border border-amber-400/30 shadow-xs active:scale-95"
              title="Open Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </button>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
