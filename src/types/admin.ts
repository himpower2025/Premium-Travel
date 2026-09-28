import { ServiceType } from './travel';

export type OverlayTheme = 'light' | 'dark' | 'golden' | 'clear';

export interface MenuItemConfig {
  id: string;
  key: ServiceType | string;
  labelEn: string;
  labelKo?: string;
  sublabel?: string;
  icon: string;
  badge?: string;
  visible: boolean;
  targetSectionId: string;
  order: number;
}

export interface BackgroundConfig {
  imageUrl: string;
  presetId?: string;
  opacity: number; // 10 to 100
  brightness: number; // 50 to 150
  blur: number; // 0 to 15
  overlayTheme: OverlayTheme;
  fixedOnScroll: boolean;
}

export interface TemplatePopupConfig {
  badge: string;
  title: string;
  eventPeriod: string;
  departureTime: string;
  productName: string;
  specialOffer: string;
  description: string;
  buttonText: string;
  targetSectionId: string;
  disclaimer?: string;
}

export interface ImagePopupConfig {
  imageUrl: string;
  imageAlt: string;
  linkUrl: string;
  openInNewTab: boolean;
}

export interface PopupConfig {
  isActive: boolean; // OFF by default
  type: 'template' | 'image';
  template: TemplatePopupConfig;
  imagePopup: ImagePopupConfig;
  showOncePerDay: boolean;
}

export interface CompanyConfig {
  nameEn: string;
  nameKo?: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  officeAddress: string;
  registrationNumber: string;
  tourismLicense: string;
  vatNumber: string;
  tickerNotice: string;
  tickerActive: boolean;
}

export interface SiteConfig {
  background: BackgroundConfig;
  menus: MenuItemConfig[];
  popup: PopupConfig;
  company: CompanyConfig;
  adminPin: string;
}
