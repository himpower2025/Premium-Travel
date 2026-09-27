import React, { useRef } from 'react';
import { BookingRecord, Currency } from '../types/travel';
import { COMPANY_CREDENTIALS } from '../data/travelData';
import { formatPrice } from '../utils/formatters';
import { X, Printer, CheckCircle2, ShieldCheck, QrCode, Phone, Mail, MapPin } from 'lucide-react';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingRecord | null;
  currentCurrency: Currency;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  booking,
  currentCurrency,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden my-6 animate-fadeIn border border-slate-200">
        {/* Top Control Bar (Non-print) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Reservation Confirmed &amp; Official E-Voucher Ready</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Voucher Document */}
        <div ref={printRef} className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-slate-900 pb-5 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-amber-400 font-cinzel font-bold text-base">
                  P
                </div>
                <h1 className="font-cinzel text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Premium Travel &amp; Tours
                </h1>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 uppercase font-semibold tracking-wider">
                Official E-Ticket &amp; Travel Voucher · Nepal
              </p>
              <p className="text-[10px] text-slate-500">
                Govt Reg # {COMPANY_CREDENTIALS.registrationNumber} · {COMPANY_CREDENTIALS.tourismLicense}
              </p>
            </div>

            <div className="text-left sm:text-right bg-slate-100 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Booking Reference</span>
              <span className="text-base sm:text-lg font-mono font-black text-slate-950 block">
                {booking.referenceNumber}
              </span>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                {booking.status}
              </span>
            </div>
          </div>

          {/* Traveler Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block font-semibold">Lead Traveler</span>
              <span className="font-bold text-slate-900 block mt-0.5">{booking.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block font-semibold">Date of Travel</span>
              <span className="font-bold text-slate-900 block mt-0.5">{booking.dates}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block font-semibold">Party Size</span>
              <span className="font-bold text-slate-900 block mt-0.5">{booking.passengersOrGuests} Persons</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block font-semibold">Issue Date</span>
              <span className="font-bold text-slate-900 block mt-0.5">{booking.bookingDate}</span>
            </div>
          </div>

          {/* Service Details Box */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Service Summary &amp; Confirmation</span>
              <span className="capitalize">{booking.serviceType} Reservation</span>
            </div>
            <div className="p-4 space-y-2">
              <div className="text-base font-bold text-slate-900">{booking.itemTitle}</div>
              <div className="text-xs text-slate-600 leading-relaxed">{booking.details}</div>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 border-t border-slate-100 mt-2">
                <span>Contact: {booking.customerEmail}</span>
                <span>·</span>
                <span>Phone: {booking.customerPhone}</span>
                <span>·</span>
                <span>Payment: {booking.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Total & QR Verification */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                <QrCode className="w-14 h-14 text-slate-950" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-semibold text-amber-400 block tracking-wider">
                  Airport / Check-In QR Verification
                </span>
                <span className="text-xs text-slate-300">
                  Scan upon arrival in Kathmandu, Pokhara, or at airport terminals.
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-400 block">Total Amount Guaranteed</span>
              <span className="text-2xl font-mono font-bold text-amber-400">
                {formatPrice(booking.totalPriceUSD, currentCurrency)}
              </span>
            </div>
          </div>

          {/* Contact Support Footer */}
          <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Tridevi Marg, Thamel, Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>24/7 Concierge: {COMPANY_CREDENTIALS.phoneHotline}</span>
            </div>
          </div>
        </div>

        {/* Modal Close Footer (Non-print) */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            Close &amp; Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
