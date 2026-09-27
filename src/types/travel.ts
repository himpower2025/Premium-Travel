export type Currency = 'USD' | 'NPR' | 'EUR' | 'GBP';

export interface CurrencyRate {
  symbol: string;
  rateToUSD: number; // 1 USD = rateToUSD
}

export type ServiceType = 'flights' | 'hotels' | 'vehicles' | 'promotions' | 'about';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  aircraft: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  priceUSD: number;
  stops: number;
  isDomestic: boolean;
  baggage: string;
  cabin: 'Economy' | 'Business' | 'Mountain Scenic VIP';
  refundable: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  region: string;
  rating: number;
  reviewsCount: number;
  pricePerNightUSD: number;
  image: string;
  description: string;
  amenities: string[];
  roomTypes: {
    name: string;
    bed: string;
    view: string;
    extraPriceUSD: number;
  }[];
  featured: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  category: '4WD Mountain SUV' | 'Deluxe Tourist Van' | 'Luxury Executive Sedan' | 'Eco Electric SUV';
  passengers: number;
  luggage: number;
  transmission: 'Manual 4x4' | 'Automatic AWD' | 'Automatic';
  dailyRateUSD: number;
  image: string;
  features: string[];
  recommendedFor: string;
  driverIncluded: boolean;
}

export interface ComboPackage {
  id: string;
  title: string;
  tagline: string;
  durationDays: number;
  bundleType: '3-in-1 Triple Bundle' | '2-in-1 Flight & Lodge' | '2-in-1 Overland Tour';
  originalPriceUSD: number;
  discountedPriceUSD: number;
  savingsPercentage: number;
  image: string;
  includes: {
    flight?: string;
    hotel?: string;
    vehicle?: string;
  };
  highlights: string[];
  itinerarySummary: string;
}

export interface BookingRecord {
  id: string;
  referenceNumber: string;
  bookingDate: string;
  serviceType: 'flight' | 'hotel' | 'vehicle' | 'package';
  itemTitle: string;
  details: string;
  dates: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  passengersOrGuests: number;
  totalPriceUSD: number;
  currency: Currency;
  paidAmount: number;
  paymentMethod: string;
  status: 'Confirmed' | 'Voucher Issued';
}
