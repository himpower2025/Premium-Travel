/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, ServiceType, Flight, Hotel, Vehicle, ComboPackage, BookingRecord } from './types/travel';
import { Navbar } from './components/Navbar';
import { SpatialAltitudeRail } from './components/SpatialAltitudeRail';
import { FlywardHero } from './components/FlywardHero';
import { FlywardSpatialJourney } from './components/FlywardSpatialJourney';
import { FullCatalogDrawer } from './components/FullCatalogDrawer';
import { AboutCompanySection } from './components/AboutCompanySection';
import { BookingModal, BookingTarget } from './components/BookingModal';
import { VoucherModal } from './components/VoucherModal';
import { MyBookingsDrawer } from './components/MyBookingsDrawer';
import { FloatingConciergeDock } from './components/FloatingConciergeDock';
import { Footer } from './components/Footer';

export default function App() {
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

  const handleServiceSelect = (service: ServiceType) => {
    setActiveService(service);
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
    <div className="min-h-screen bg-[#f4f8fc] text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* 1. Header / Navbar */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        activeService={activeService}
        onSelectService={handleServiceSelect}
        bookingCount={bookings.length}
        onOpenBookings={() => setMyBookingsOpen(true)}
      />

      {/* Floating Spatial Altitude & Coordinate Rail (Tracking scroll position) */}
      <SpatialAltitudeRail />

      <main className="flex-1">
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

      {/* Floating 3D VIP Concierge Dock */}
      <FloatingConciergeDock
        activeService={activeService}
        onSelectService={handleServiceSelect}
        bookingCount={bookings.length}
        onOpenBookings={() => setMyBookingsOpen(true)}
      />

      {/* 5. Footer */}
      <Footer onSelectService={handleServiceSelect} />

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
