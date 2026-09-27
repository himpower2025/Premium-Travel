import React, { useState } from 'react';
import { COMPANY_CREDENTIALS } from '../data/travelData';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Award, CheckCircle2, Send, Building } from 'lucide-react';

export const AboutCompanySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Custom All-Inclusive Package',
    travelDates: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f0f6fa] via-white to-[#e8f1fa] text-slate-900 border-t border-slate-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4 sm:gap-6 border-b border-slate-200 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-xs font-bold text-blue-900 uppercase mb-2">
              <Building className="w-3.5 h-3.5 text-blue-700" />
              <span>05. LICENSED AGENCY &amp; SUPPORT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-black text-slate-900 tracking-tight">
              About Premium Travel &amp; Tours
            </h2>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Officially registered with the Nepal Ministry of Tourism. Based in Thamel, Kathmandu, we organize flights, hotels, and mountain transport across Nepal.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-900 font-bold bg-white border border-blue-200 px-4 py-2 rounded-2xl shadow-xs self-start md:self-auto">
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Govt. Regd: {COMPANY_CREDENTIALS.registrationNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Company Background & Value Pillars */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 space-y-4 shadow-sm">
              <h3 className="text-lg sm:text-xl md:text-2xl font-cinzel font-bold text-slate-900">
                Your Trusted Travel Partner in Nepal
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Whether you need guaranteed seats on high-demand Everest flights to Lukla, peaceful 5-star mountain resort bookings in Pokhara, or rugged 4WD SUVs to Upper Mustang, we handle every detail smoothly and transparently.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                All bookings include official government tax receipts and instant digital vouchers. No hidden charges or surprise tourist fees.
              </p>

              {/* Trust Badges List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Government Licensed</h4>
                    <p className="text-slate-500 mt-0.5 text-[11px]">Dept. of Tourism: {COMPANY_CREDENTIALS.tourismLicense}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Official Associations</h4>
                    <p className="text-slate-500 mt-0.5 text-[11px]">Active Member of NATTA &amp; TAAN</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                  <Clock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">24/7 Travel Support</h4>
                    <p className="text-slate-500 mt-0.5 text-[11px]">Instant help with flight delays or weather changes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Instant E-Vouchers</h4>
                    <p className="text-slate-500 mt-0.5 text-[11px]">Digital &amp; printable airline/hotel confirmations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Contact Info */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 space-y-3.5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Office Locations &amp; Direct Contact
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Kathmandu Head Office:</div>
                    <div className="text-slate-600">{COMPANY_CREDENTIALS.officeAddress}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Pokhara Branch:</div>
                    <div className="text-slate-600">{COMPANY_CREDENTIALS.pokharaBranch}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-bold text-slate-900">{COMPANY_CREDENTIALS.phoneHotline}</span>
                  <span className="text-slate-300 mx-1">·</span>
                  <span className="text-slate-500">WhatsApp:</span>
                  <span className="font-bold text-emerald-700">{COMPANY_CREDENTIALS.mobileWhatsapp}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="text-slate-500">Email:</span>
                  <span className="text-blue-700 font-bold underline">{COMPANY_CREDENTIALS.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simple Custom Tour Inquiry Form */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-900 text-white border border-blue-800 rounded-3xl p-5 sm:p-7 shadow-xl">
            <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white mb-1.5">
              Plan a Custom Nepal Trip
            </h3>
            <p className="text-xs text-sky-200 mb-5 leading-relaxed font-normal">
              Need a tailored itinerary, private helicopter tour to Everest Base Camp, or multi-day mountain trekking support? Tell us what you need and we will prepare a complete quote.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base sm:text-lg font-bold text-white">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Thank you, <strong className="text-amber-300">{formData.name}</strong>. Our travel team will reply to <span className="text-amber-300 font-bold">{formData.email}</span> within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      serviceInterest: 'Custom All-Inclusive Package',
                      travelDates: '',
                      message: '',
                    });
                  }}
                  className="mt-2 text-xs font-bold text-amber-300 hover:underline cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sky-200 mb-1 font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. David Harrison"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-sky-300/60 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-sky-200 mb-1 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-sky-300/60 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-sky-200 mb-1 font-semibold">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 555-0192"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-sky-300/60 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-sky-200 mb-1 font-semibold">
                      Interested In
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full bg-blue-950 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="Custom All-Inclusive Package">Combo Package (Flight + Hotel + Car)</option>
                      <option value="Flight Bookings">Domestic / Mountain Flights</option>
                      <option value="Hotel Accommodations">Hotels &amp; Lodges</option>
                      <option value="4WD Vehicle Rental">4WD Car Rental with Driver</option>
                      <option value="Heli Charter">Private Everest Helicopter Tour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-sky-200 mb-1 font-semibold">
                      Estimated Travel Dates
                    </label>
                    <input
                      type="text"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      placeholder="e.g. October 2026"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-sky-300/60 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sky-200 mb-1 font-semibold">
                    Message or Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how many people are traveling and where you'd like to go..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-sky-300/60 focus:outline-none focus:border-amber-400 resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending your inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Trip Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
