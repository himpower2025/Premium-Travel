/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Currency, ServiceType, Flight, Hotel, Vehicle, ComboPackage, BookingRecord } from './types/travel';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { Navbar } from './components/Navbar';
import { FlywardHero } from './components/FlywardHero';
import { FlywardSpatialJourney } from './components/FlywardSpatialJourney';
import { FullCatalogDrawer } from './components/FullCatalogDrawer';
import { AboutCompanySection } from './components/AboutCompanySection';
import { BookingModal, BookingTarget } from './components/BookingModal';
import { VoucherModal } from './components/VoucherModal';
import { MyBookingsDrawer } from './components/MyBookingsDrawer';
import { Footer } from './components/Footer';
import { EventPopupModal } from './components/EventPopupModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import defaultHeroBg from './assets/images/hero_himalayas_travel_1790502254393.jpg';

function MainAppContent() {
  const { siteConfig, setIsAdminOpen } = useSiteConfig();
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');
  const [activeService, setActiveService] = useState<ServiceType>('flights');

  // Search filter states from Hero
  const [flightOrigin, setFlightOrigin] = useState<string>('KTM');
  const [flightDestination, setFlightDestination] = useState<string>('PKR');
  const [hotelRegion, setHotelRegion] = useState<string>('All');
  const [vehicleCategory, setVehicleCategory] = useState<string>('All');

  // Full Catalog Drawer
  const [catalogDrawerOpen, setCatalogDrawerOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState<'flights' | 'hotels' | 'vehicles'>('flights');

  // Interactive booking flows
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTarget, setBookingTarget] = useState<BookingTarget | null>(null);

  // Voucher modal
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState<BookingRecord | null>(null);

  // Bookings drawer
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);

  // Initial demo booking so user can immediately view an authentic Nepal voucher
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'rec-sample-01',
      referenceNumber: 'PTT-2026-NP9842',
      bookingDate: '2026-09-27',
      serviceType: 'package',
      itemTitle: 'The Himalayan Triple Crown (Pokhara Golden Retreat)',
      details: 'Flights (KTM ⇄ PKR) + 3 Nights Pavilions Himalayas Luxury Lake Resort + Chauffeured 4WD Scorpio SUV',
      dates: '2026-10-18',
      customerName: 'Sarah Jenkins',
      customerEmail: 'sarah.j@example.com',
      customerPhone: '+1 415-882-9011',
      passengersOrGuests: 2,
      totalPriceUSD: 810,
      currency: 'USD',
      paidAmount: 810,
      paymentMethod: 'Credit Card (Online)',
      status: 'Voucher Issued',
    },
  ]);

  // Keyboard shortcut Ctrl+Shift+A or ?admin=true url parameter for easy access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (window.location.search.includes('admin=true') || window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAdminOpen]);

  // Handlers for booking triggers
  const handleBookFlight = (flight: Flight) => {
    setBookingTarget({
      type: 'flight',
      item: flight,
    });
    setBookingModalOpen(true);
  };

  const handleBookHotel = (hotel: Hotel, roomTypeIndex: number) => {
    setBookingTarget({
      type: 'hotel',
      item: hotel,
      extraData: { roomTypeIndex },
    });
    setBookingModalOpen(true);
  };

  const handleBookVehicle = (vehicle: Vehicle, rentalDays: number) => {
    setBookingTarget({
      type: 'vehicle',
      item: vehicle,
      extraData: { rentalDays },
    });
    setBookingModalOpen(true);
  };

  const handleBookPackage = (pkg: ComboPackage) => {
    setBookingTarget({
      type: 'package',
      item: pkg,
    });
    setBookingModalOpen(true);
  };

  const handleOpenCatalog = (cat: 'flights' | 'hotels' | 'vehicles') => {
    setCatalogCategory(cat);
    setCatalogDrawerOpen(true);
  };

  const handleBookingSuccess = (newRecord: BookingRecord) => {
    setBookings((prev) => [newRecord, ...prev]);
    setBookingModalOpen(false);
    setActiveVoucher(newRecord);
    setVoucherModalOpen(true);
  };

  const handleViewVoucher = (booking: BookingRecord) => {
    setActiveVoucher(booking);
    setVoucherModalOpen(true);
    setMyBookingsOpen(false);
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleServiceSelect = (service: ServiceType | string) => {
    setActiveService(service as ServiceType);
    const targetMap: Record<string, string> = {
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
    <div className="relative min-h-screen text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* ========================================================================= */}
      {/* 0. PERSISTENT FIXED FULL-PAGE BACKGROUND (Remains visible while scrolling) */}
      {/* ========================================================================= */}
      <div
        className={`${
          siteConfig.background.fixedOnScroll ? 'fixed' : 'absolute'
        } inset-0 pointer-events-none z-0 overflow-hidden`}
      >
        <img
          src={
            siteConfig.background.imageUrl.includes('hero_himalayas_travel_1790502254393.jpg')
              ? defaultHeroBg
              : siteConfig.background.imageUrl
          }
          alt="Himalayan Mountain Peaks"
          className="w-full h-full object-cover object-center transition-all duration-700"
          style={{
            opacity: siteConfig.background.opacity / 100,
            filter: `brightness(${siteConfig.background.brightness}%) blur(${siteConfig.background.blur}px)`,
          }}
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('unsplash')) {
              target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80';
            }
          }}
        />

        {/* Dynamic Atmospheric Overlay Theme (Ensures readability across text & cards) */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            siteConfig.background.overlayTheme === 'dark'
              ? 'bg-slate-950/65'
              : siteConfig.background.overlayTheme === 'golden'
              ? 'bg-amber-950/25 bg-gradient-to-b from-sky-950/30 via-amber-900/15 to-slate-900/40'
              : siteConfig.background.overlayTheme === 'light'
              ? 'bg-white/20 bg-gradient-to-b from-blue-950/20 via-transparent to-slate-900/25'
              : 'bg-transparent'
          }`}
        />

        {/* Fine Architectural Grid Coordinate Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* 1. Header / Navbar */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        activeService={activeService}
        onSelectService={handleServiceSelect}
      />

      <main className="relative z-10 flex-1">
        {/* 2. Flyward-style Monumental Dimensional Hero */}
        <FlywardHero
          currentCurrency={currentCurrency}
          onSearchFlights={(orig, dest) => {
            setFlightOrigin(orig);
            setFlightDestination(dest);
          }}
          onSearchHotels={(reg) => {
            setHotelRegion(reg);
          }}
          onSearchVehicles={(cat) => {
            setVehicleCategory(cat);
          }}
          onSelectService={handleServiceSelect}
          onOpenCatalog={handleOpenCatalog}
        />

        {/* 3. The 4-Stage Continuous Scrollytelling Spatial Canvas */}
        <FlywardSpatialJourney
          currentCurrency={currentCurrency}
          onBookFlight={handleBookFlight}
          onBookHotel={handleBookHotel}
          onBookVehicle={handleBookVehicle}
          onBookPackage={handleBookPackage}
          onOpenCatalog={handleOpenCatalog}
        />

        {/* 4. Dimension 05: Institution Credentials, Ministry of Tourism License & Consultation */}
        <AboutCompanySection />
      </main>

      {/* 5. Footer */}
      <Footer onSelectService={handleServiceSelect} />

      {/* Dual Popup Modal (Controlled by Admin, OFF by default) */}
      <EventPopupModal onNavigateSection={handleServiceSelect} />

      {/* Admin Portal Modal (Password protected, full site control) */}
      <AdminPortalModal />

      {/* Modals & Drawers */}
      <FullCatalogDrawer
        isOpen={catalogDrawerOpen}
        onClose={() => setCatalogDrawerOpen(false)}
        initialCategory={catalogCategory}
        currentCurrency={currentCurrency}
        onBookFlight={handleBookFlight}
        onBookHotel={handleBookHotel}
        onBookVehicle={handleBookVehicle}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        bookingTarget={bookingTarget}
        currentCurrency={currentCurrency}
        onSuccess={handleBookingSuccess}
      />

      <VoucherModal
        isOpen={voucherModalOpen}
        onClose={() => setVoucherModalOpen(false)}
        booking={activeVoucher}
        currentCurrency={currentCurrency}
      />

      <MyBookingsDrawer
        isOpen={myBookingsOpen}
        onClose={() => setMyBookingsOpen(false)}
        bookings={bookings}
        currentCurrency={currentCurrency}
        onViewVoucher={handleViewVoucher}
        onCancelBooking={handleCancelBooking}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteConfigProvider>
      <MainAppContent />
    </SiteConfigProvider>
  );
}
