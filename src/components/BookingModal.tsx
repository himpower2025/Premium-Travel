import React, { useState } from 'react';
import { Currency, BookingRecord, Flight, Hotel, Vehicle, ComboPackage } from '../types/travel';
import { formatPrice, generateBookingRef } from '../utils/formatters';
import { X, ShieldCheck, CreditCard, Banknote, Building, Plane, Car, CheckCircle2, User, Mail, Phone, Calendar } from 'lucide-react';

export interface BookingTarget {
  type: 'flight' | 'hotel' | 'vehicle' | 'package' | 'custom_combo';
  item: Flight | Hotel | Vehicle | ComboPackage | {
    title: string;
    details: string;
    totalUSD: number;
    flight?: Flight | null;
    hotel?: Hotel | null;
    vehicle?: Vehicle | null;
  };
  extraData?: {
    roomTypeIndex?: number;
    rentalDays?: number;
  };
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingTarget: BookingTarget | null;
  currentCurrency: Currency;
  onSuccess: (record: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingTarget,
  currentCurrency,
  onSuccess,
}) => {
  if (!isOpen || !bookingTarget) return null;

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [travelDate, setTravelDate] = useState('2026-10-15');
  const [passengersOrGuests, setPassengersOrGuests] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'arrival' | 'nepal_wallet' | 'wire'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Compute total price based on booking target
  let basePriceUSD = 0;
  let title = '';
  let details = '';

  if (bookingTarget.type === 'flight') {
    const flight = bookingTarget.item as Flight;
    title = `${flight.airline} · ${flight.originCode} ⇄ ${flight.destinationCode}`;
    details = `Flight ${flight.flightNumber} (${flight.aircraft}) · Departure ${flight.departureTime} · Baggage: ${flight.baggage}`;
    basePriceUSD = flight.priceUSD * passengersOrGuests;
  } else if (bookingTarget.type === 'hotel') {
    const hotel = bookingTarget.item as Hotel;
    const roomIdx = bookingTarget.extraData?.roomTypeIndex || 0;
    const room = hotel.roomTypes[roomIdx] || hotel.roomTypes[0];
    title = `${hotel.name} (${room.name})`;
    details = `Location: ${hotel.location} · Bed: ${room.bed} · View: ${room.view}`;
    basePriceUSD = (hotel.pricePerNightUSD + (room.extraPriceUSD || 0)) * 2; // default 2 nights
  } else if (bookingTarget.type === 'vehicle') {
    const vehicle = bookingTarget.item as Vehicle;
    const days = bookingTarget.extraData?.rentalDays || 3;
    title = `${vehicle.name} (Chauffeured)`;
    details = `Category: ${vehicle.category} · Duration: ${days} Days · Licensed Mountain Driver Included`;
    basePriceUSD = vehicle.dailyRateUSD * days;
  } else if (bookingTarget.type === 'package') {
    const pkg = bookingTarget.item as ComboPackage;
    title = pkg.title;
    details = `${pkg.bundleType} · ${pkg.durationDays} Days / ${pkg.durationDays - 1} Nights All-Inclusive`;
    basePriceUSD = pkg.discountedPriceUSD * passengersOrGuests;
  } else if (bookingTarget.type === 'custom_combo') {
    const custom = bookingTarget.item as {
      title: string;
      details: string;
      totalUSD: number;
    };
    title = custom.title;
    details = custom.details;
    basePriceUSD = custom.totalUSD * passengersOrGuests;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;

    setIsProcessing(true);

    setTimeout(() => {
      const record: BookingRecord = {
        id: 'rec-' + Date.now(),
        referenceNumber: generateBookingRef(),
        bookingDate: new Date().toISOString().split('T')[0],
        serviceType: bookingTarget.type === 'custom_combo' ? 'package' : bookingTarget.type,
        itemTitle: title,
        details: details,
        dates: travelDate,
        customerName,
        customerEmail,
        customerPhone: customerPhone || '+977 98012 34567',
        passengersOrGuests,
        totalPriceUSD: basePriceUSD,
        currency: currentCurrency,
        paidAmount: basePriceUSD,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit / Debit Card (Online)'
            : paymentMethod === 'arrival'
            ? 'Pay on Arrival at Kathmandu Office'
            : paymentMethod === 'nepal_wallet'
            ? 'Esewa / Khalti Digital'
            : 'Bank Wire Transfer',
        status: 'Voucher Issued',
      };

      setIsProcessing(false);
      onSuccess(record);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white text-slate-900 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 animate-fadeIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-950/20 bg-[#0a2342] text-white">
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
              Official Booking Flow
            </span>
            <h3 className="text-base font-cinzel font-bold text-white">
              Reserve with Premium Travel &amp; Tours
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-sky-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Service Summary Banner */}
        <div className="px-6 py-4 bg-amber-50/80 border-b border-amber-200/80">
          <div className="text-xs font-bold text-slate-900 truncate">{title}</div>
          <div className="text-[11px] text-slate-600 font-medium mt-0.5 line-clamp-1">{details}</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-200/60 text-xs">
            <span className="text-slate-600 font-medium">Total Price:</span>
            <span className="text-xl font-black font-mono text-amber-600 tabular-nums">
              {formatPrice(basePriceUSD, currentCurrency)}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Passenger / Guest Info */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>Lead Traveler Full Name (As in Passport/ID) *</span>
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Johnathan Miller"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>Email Address (for E-Voucher) *</span>
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="traveler@example.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Phone / WhatsApp Contact *</span>
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+1 555-0192 / +977..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Start / Departure Date</span>
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Travelers / Guests Count
              </label>
              <select
                value={passengersOrGuests}
                onChange={(e) => setPassengersOrGuests(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Person' : 'Persons'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Payment Option:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-amber-500 bg-amber-50 text-slate-900 ring-2 ring-amber-400/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="hidden"
                />
                <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
                <div className="text-left text-xs">
                  <div className="font-bold text-slate-900">Credit / Debit Card</div>
                  <div className="text-[10px] text-slate-500">Visa, Mastercard, Amex</div>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'arrival'
                    ? 'border-amber-500 bg-amber-50 text-slate-900 ring-2 ring-amber-400/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'arrival'}
                  onChange={() => setPaymentMethod('arrival')}
                  className="hidden"
                />
                <Banknote className="w-4 h-4 text-amber-600 shrink-0" />
                <div className="text-left text-xs">
                  <div className="font-bold text-slate-900">Pay on Arrival</div>
                  <div className="text-[10px] text-slate-500">At Thamel Head Office</div>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'nepal_wallet'
                    ? 'border-amber-500 bg-amber-50 text-slate-900 ring-2 ring-amber-400/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'nepal_wallet'}
                  onChange={() => setPaymentMethod('nepal_wallet')}
                  className="hidden"
                />
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-left text-xs">
                  <div className="font-bold text-slate-900">Nepal QR / Wallets</div>
                  <div className="text-[10px] text-slate-500">Esewa, Khalti, FonePay</div>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'wire'
                    ? 'border-amber-500 bg-amber-50 text-slate-900 ring-2 ring-amber-400/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'wire'}
                  onChange={() => setPaymentMethod('wire')}
                  className="hidden"
                />
                <Building className="w-4 h-4 text-amber-600 shrink-0" />
                <div className="text-left text-xs">
                  <div className="font-bold text-slate-900">Bank Wire / SWIFT</div>
                  <div className="text-[10px] text-slate-500">Nabil Bank Nepal</div>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-600 flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Guaranteed under Nepal Govt. Tourism Reg # 349182/080/081 · Free 24h cancellation</span>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              {isProcessing ? (
                <span>Generating Official E-Voucher...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Reservation &amp; Issue E-Voucher</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
