import { Currency } from '../types/travel';
import { CURRENCY_RATES } from '../data/travelData';

export function formatPrice(amountInUSD: number, currency: Currency): string {
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountInUSD * rateInfo.rateToUSD;

  if (currency === 'NPR') {
    return `${rateInfo.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${rateInfo.symbol}${Math.round(converted).toLocaleString()}`;
}

export function generateBookingRef(): string {
  const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
  const year = new Date().getFullYear();
  return `PTT-${year}-NP${randomHex}`;
}
