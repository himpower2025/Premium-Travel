import React from 'react';
import { BookingRecord, Currency } from '../types/travel';
import { formatPrice } from '../utils/formatters';
import { X, Briefcase, FileText, Calendar, Trash2, ArrowRight } from 'lucide-react';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  currentCurrency: Currency;
  onViewVoucher: (booking: BookingRecord) => void;
  onCancelBooking: (id: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  currentCurrency,
  onViewVoucher,
  onCancelBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-cinzel font-bold">My Booked Itineraries</h2>
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              {bookings.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8fafc]">
          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No active reservations yet</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs mx-auto">
                Explore flights, 5-star mountain lodges, 4WD vehicles, or combo promotions and reserve with instant voucher generation.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 space-y-3 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-blue-700 font-bold tracking-wider">{booking.referenceNumber}</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {booking.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">{booking.itemTitle}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{booking.details}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{booking.dates}</span>
                  </div>

                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {formatPrice(booking.totalPriceUSD, currentCurrency)}
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onViewVoucher(booking)}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Official E-Voucher</span>
                  </button>

                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Remove from list"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-white text-xs text-slate-500 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-500">Official vouchers honored nationwide in Nepal</span>
          <button
            onClick={onClose}
            className="text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
