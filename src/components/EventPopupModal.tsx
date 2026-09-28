import React, { useState, useEffect } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  Plane,
  Tag,
  ArrowRight,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

const POPUP_DISMISS_KEY = 'nepal_travel_popup_dismissed_date';

interface EventPopupModalProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const EventPopupModal: React.FC<EventPopupModalProps> = ({ onNavigateSection }) => {
  const { siteConfig, previewPopupOpen, setPreviewPopupOpen } = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [doNotShowToday, setDoNotShowToday] = useState(false);

  // Check if popup should open on mount or when config changes
  useEffect(() => {
    if (previewPopupOpen) {
      setIsOpen(true);
      return;
    }

    if (!siteConfig.popup.isActive) {
      setIsOpen(false);
      return;
    }

    if (siteConfig.popup.showOncePerDay) {
      try {
        const dismissedDate = localStorage.getItem(POPUP_DISMISS_KEY);
        const todayStr = new Date().toISOString().slice(0, 10);
        if (dismissedDate === todayStr) {
          setIsOpen(false);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Delay 700ms on first page load for natural smooth entrance
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [siteConfig.popup.isActive, siteConfig.popup.showOncePerDay, previewPopupOpen]);

  const handleClose = () => {
    if (doNotShowToday && siteConfig.popup.showOncePerDay && !previewPopupOpen) {
      try {
        const todayStr = new Date().toISOString().slice(0, 10);
        localStorage.setItem(POPUP_DISMISS_KEY, todayStr);
      } catch (err) {
        console.error(err);
      }
    }
    setIsOpen(false);
    if (previewPopupOpen) {
      setPreviewPopupOpen(false);
    }
  };

  const handleActionClick = (targetId: string) => {
    handleClose();
    if (targetId.startsWith('http://') || targetId.startsWith('https://')) {
      window.open(targetId, '_blank');
      return;
    }
    const cleanId = targetId.replace('#', '');
    if (onNavigateSection) {
      onNavigateSection(cleanId);
    } else {
      const el = document.getElementById(cleanId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!isOpen) return null;

  const { popup } = siteConfig;
  const isTemplate = popup.type === 'template';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/90 transform transition-all duration-300 scale-100 my-auto">
        {/* Admin Preview Mode Ribbon */}
        {previewPopupOpen && (
          <div className="bg-amber-500 text-slate-950 text-[11px] font-bold py-1 px-4 text-center flex items-center justify-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>[Admin Preview Mode] Live preview of how this modal appears to site visitors.</span>
          </div>
        )}

        {/* Top Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ========================================================================= */}
        {/* TYPE 1: BUILT-IN TEMPLATE POPUP (Date, Time, Product, Offer)               */}
        {/* ========================================================================= */}
        {isTemplate && (
          <div className="flex flex-col">
            {/* Header Banner */}
            <div className="relative bg-gradient-to-br from-[#0c2a50] via-[#0f3460] to-[#1a4074] text-white p-5 sm:p-6 pb-6">
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{popup.template.badge || 'SPECIAL OFFER'}</span>
              </div>

              <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {popup.template.title || 'Himalayan Mountain Flight Special Exhibition'}
              </h3>
            </div>

            {/* Structured Info Card (Date, Time, Product, Offer) */}
            <div className="p-5 sm:p-6 space-y-4 bg-slate-50/70">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Event Date / Period */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Event Period / Dates</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                      {popup.template.eventPeriod || 'Daily Operations'}
                    </div>
                  </div>
                </div>

                {/* Departure / Event Time */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Departure / Flight Time</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                      {popup.template.departureTime || 'Daily Morning Departures'}
                    </div>
                  </div>
                </div>

                {/* Target Product */}
                <div className="sm:col-span-2 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Tour / Product</div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                      {popup.template.productName || 'Himalayan Mountain Flight'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlight Special Offer Banner */}
              {popup.template.specialOffer && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-300/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wide text-amber-900">Special Offer / Savings</div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-950">
                      {popup.template.specialOffer}
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              {popup.template.description && (
                <p className="text-xs text-slate-600 leading-relaxed font-normal px-1">
                  {popup.template.description}
                </p>
              )}

              {/* Disclaimer / Notice */}
              {popup.template.disclaimer && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-white/70 p-2.5 rounded-xl border border-slate-200/60">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{popup.template.disclaimer}</span>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => handleActionClick(popup.template.targetSectionId || 'aviation')}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-400/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
              >
                <span>{popup.template.buttonText || 'View Details & Book Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TYPE 2: IMAGE FILE ATTACHMENT POPUP                                        */}
        {/* ========================================================================= */}
        {!isTemplate && (
          <div className="flex flex-col">
            <div
              className={`relative cursor-pointer group bg-slate-900 flex items-center justify-center max-h-[70vh] overflow-hidden`}
              onClick={() => {
                if (popup.imagePopup.linkUrl) {
                  handleActionClick(popup.imagePopup.linkUrl);
                }
              }}
            >
              <img
                src={popup.imagePopup.imageUrl || '/images/hero_himalayas_travel_1790502254393.jpg'}
                alt={popup.imagePopup.imageAlt || 'Event Announcement Banner'}
                className="w-full h-auto object-contain max-h-[65vh] group-hover:scale-[1.01] transition-transform duration-300"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('unsplash')) {
                    target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';
                  }
                }}
              />

              {popup.imagePopup.linkUrl && (
                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-400/40 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span>Learn More</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Bar: "Do not show again today" & "Close" */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <label className="flex items-center gap-2 cursor-pointer select-none hover:text-slate-900 font-medium">
            <input
              type="checkbox"
              checked={doNotShowToday}
              onChange={(e) => setDoNotShowToday(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300 cursor-pointer"
            />
            <span>Do not show again today (24 hours)</span>
          </label>

          <button
            onClick={handleClose}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
