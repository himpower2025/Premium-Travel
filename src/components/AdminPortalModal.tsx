import React, { useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { BACKGROUND_PRESETS } from '../data/defaultConfig';
import { OverlayTheme, MenuItemConfig } from '../types/admin';
import {
  X,
  Lock,
  Unlock,
  Settings,
  Image as ImageIcon,
  Menu as MenuIcon,
  Bell,
  Building,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  Check,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Layers,
  Save,
  Info,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Calendar,
  Clock,
  Plane
} from 'lucide-react';

export const AdminPortalModal: React.FC = () => {
  const {
    siteConfig,
    updateConfig,
    resetToDefault,
    exportConfigJson,
    importConfigJson,
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    setPreviewPopupOpen,
    resetDailyDismissal,
  } = useSiteConfig();

  // Tabs: 'background' | 'menus' | 'popup' | 'company' | 'security'
  const [activeTab, setActiveTab] = useState<'background' | 'menus' | 'popup' | 'company' | 'security'>('background');

  // Login form state
  const [inputPin, setInputPin] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Security tab state
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Image input temp URL
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [customPopupImageUrl, setCustomPopupImageUrl] = useState('');

  // Toast / notification state
  const [saveToast, setSaveToast] = useState(false);

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  if (!isAdminOpen) return null;

  // 1. Password Verification Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 ring-8 ring-amber-500/5">
              <Lock className="w-7 h-7" />
            </div>

            <h2 className="font-cinzel text-xl font-bold text-slate-900">
              Admin Portal Authentication
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Please enter your administrator password to access the website management portal.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (loginAdmin(inputPin)) {
                setLoginError(false);
                setInputPin('');
              } else {
                setLoginError(true);
              }
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Administrator Password (PIN / Password)
              </label>
              <input
                type="password"
                value={inputPin}
                onChange={(e) => {
                  setInputPin(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Enter password..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-mono tracking-wider outline-none transition-all"
                autoFocus
              />
              {loginError && (
                <p className="text-xs text-rose-600 font-semibold mt-1">
                  Incorrect password. Please verify and try again.
                </p>
              )}
            </div>

            {/* Quick Demo Hint */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
              <span>Default PIN: <strong className="text-amber-600 font-mono font-bold">{siteConfig.adminPin || 'admin1234'}</strong></span>
              <button
                type="button"
                onClick={() => setInputPin(siteConfig.adminPin || 'admin1234')}
                className="text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
              >
                Fill Demo PIN
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Admin Sign In</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Full Admin Portal Dashboard Screen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-hidden">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-white rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0c2a50] to-[#12396b] text-white flex items-center justify-between shrink-0 border-b border-blue-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-base sm:text-lg font-bold tracking-tight text-white">
                  Website Administration & Control Portal
                </h2>
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  LIVE SYNC ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-sky-200">
                Persistent Background Image / Navigation Menus / Dual Popup Modes / Agency Details
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exportConfigJson();
                triggerToast();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-sky-100 transition-colors cursor-pointer"
              title="Download current configuration as JSON backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Sign Out
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Strip */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 pb-2 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0 select-none">
          <button
            onClick={() => setActiveTab('background')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'background'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>1. Background &amp; Scroll</span>
          </button>

          <button
            onClick={() => setActiveTab('menus')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'menus'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <MenuIcon className="w-4 h-4" />
            <span>2. Menus &amp; Navigation</span>
          </button>

          <button
            onClick={() => setActiveTab('popup')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer relative ${
              activeTab === 'popup'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>3. Popups &amp; Promotions</span>
            {siteConfig.popup.isActive ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ) : (
              <span className="text-[10px] text-slate-400 font-mono">(OFF)</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'company'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>4. Company &amp; Ticker</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'security'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>5. Security &amp; Backup</span>
          </button>
        </div>

        {/* Tab Body Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-6">

          {/* ========================================================================= */}
          {/* TAB 1: BACKGROUND & SCROLL MANAGEMENT                                     */}
          {/* ========================================================================= */}
          {activeTab === 'background' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Highlight Note */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Persistent Background Scroll System:</strong>
                  <p className="mt-0.5 text-blue-800 leading-relaxed">
                    The background photo remains fixed in the viewport as visitors scroll down the page. Select a Himalayan mountain preset below, or upload a custom company photograph.
                  </p>
                </div>
              </div>

              {/* Fixed on Scroll Toggle */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">Keep Background Fixed on Scroll (Persistent Background)</div>
                  <div className="text-xs text-slate-500">
                    Background image stays visible throughout full-page scrolling without disappearing.
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={siteConfig.background.fixedOnScroll}
                    onChange={(e) => {
                      updateConfig((prev) => ({
                        ...prev,
                        background: { ...prev.background, fixedOnScroll: e.target.checked },
                      }));
                      triggerToast();
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {/* Background Preset Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  1. Select Himalayan Mountain Presets (Click to switch live)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {BACKGROUND_PRESETS.map((preset) => {
                    const isSelected = siteConfig.background.imageUrl === preset.url;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          updateConfig((prev) => ({
                            ...prev,
                            background: {
                              ...prev.background,
                              imageUrl: preset.url,
                              presetId: preset.id,
                            },
                          }));
                          triggerToast();
                        }}
                        className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all group ${
                          isSelected
                            ? 'border-amber-500 ring-4 ring-amber-500/20 shadow-lg'
                            : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100 shadow-xs'
                        }`}
                      >
                        <div className="h-32 w-full overflow-hidden bg-slate-900 relative">
                          <img
                            src={preset.thumbnail}
                            alt={preset.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div className="p-3 bg-white">
                          <div className="text-xs font-bold text-slate-900">{preset.title}</div>
                          <div className="text-[10px] text-slate-500">{preset.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direct Image Upload or Custom URL */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Upload Custom Image File or Enter Web URL
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* Local File Attachment */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                      Local Image File Upload (JPG, PNG, WebP)
                    </label>
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/30 transition-all text-center">
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-bold text-slate-700">Select Background Image File</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">Click or drag to attach image file</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') {
                                updateConfig((prev) => ({
                                  ...prev,
                                  background: {
                                    ...prev.background,
                                    imageUrl: reader.result as string,
                                    presetId: 'custom-uploaded',
                                  },
                                }));
                                triggerToast();
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Direct Image URL */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-slate-600 block">
                      Or enter external image link (URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customImageUrl.trim()) {
                            updateConfig((prev) => ({
                              ...prev,
                              background: {
                                ...prev.background,
                                imageUrl: customImageUrl.trim(),
                                presetId: 'custom-url',
                              },
                            }));
                            setCustomImageUrl('');
                            triggerToast();
                          }
                        }}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      You can provide a direct image link from Unsplash, Cloudinary, or your server.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Sliders: Opacity, Brightness, Blur, Tone */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-500" />
                  <span>3. Fine-Tune Visual Effects (Opacity, Brightness, Blur)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Opacity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Background Opacity (Vividness)</span>
                      <span className="font-mono font-bold text-amber-600">{siteConfig.background.opacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="100"
                      value={siteConfig.background.opacity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        updateConfig((prev) => ({
                          ...prev,
                          background: { ...prev.background, opacity: val },
                        }));
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Brightness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Brightness</span>
                      <span className="font-mono font-bold text-amber-600">{siteConfig.background.brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="140"
                      value={siteConfig.background.brightness}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        updateConfig((prev) => ({
                          ...prev,
                          background: { ...prev.background, brightness: val },
                        }));
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Blur */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Background Blur</span>
                      <span className="font-mono font-bold text-amber-600">{siteConfig.background.blur}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={siteConfig.background.blur}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        updateConfig((prev) => ({
                          ...prev,
                          background: { ...prev.background, blur: val },
                        }));
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                {/* Overlay Tone Selector */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-600 mb-2">Atmospheric Overlay Tone & Contrast:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { key: 'light', label: 'Clear Mountain Daylight' },
                      { key: 'dark', label: 'Deep Evening Navy (High Contrast)' },
                      { key: 'golden', label: 'Golden Sunset Amber' },
                      { key: 'clear', label: 'No Overlay (Crystal Clear)' },
                    ].map((theme) => (
                      <button
                        key={theme.key}
                        onClick={() => {
                          updateConfig((prev) => ({
                            ...prev,
                            background: { ...prev.background, overlayTheme: theme.key as OverlayTheme },
                          }));
                          triggerToast();
                        }}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                          siteConfig.background.overlayTheme === theme.key
                            ? 'bg-amber-100 border-amber-500 text-slate-900 ring-2 ring-amber-400/30 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MENU & NAVIGATION MANAGEMENT                                       */}
          {/* ========================================================================= */}
          {activeTab === 'menus' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Menu &amp; Navigation Management:</strong>
                  <p className="mt-0.5 text-amber-800 leading-relaxed">
                    Freely customize the navigation links shown in the header and mobile drawer—including labels, highlight badges, visibility (On/Off), and display order.
                  </p>
                </div>
              </div>

              {/* Menu List */}
              <div className="space-y-3">
                {siteConfig.menus
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((menu, idx) => (
                    <div
                      key={menu.id}
                      className={`p-4 rounded-2xl bg-white border transition-all ${
                        menu.visible ? 'border-slate-200 shadow-xs' : 'border-slate-200 bg-slate-100/60 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{menu.sublabel || ""}</span>
                              <span className="text-xs text-slate-500 font-medium">({menu.labelEn})</span>
                              {menu.badge && (
                                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded">
                                  {menu.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                              Target Section: #{menu.targetSectionId}
                            </div>
                          </div>
                        </div>

                        {/* Action buttons: Move Up, Down, Visibility, Edit */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          {/* Move Up */}
                          <button
                            disabled={idx === 0}
                            onClick={() => {
                              const sorted = [...siteConfig.menus].sort((a, b) => a.order - b.order);
                              if (idx > 0) {
                                const current = sorted[idx];
                                const prev = sorted[idx - 1];
                                const tempOrder = current.order;
                                current.order = prev.order;
                                prev.order = tempOrder;
                                updateConfig((cfg) => ({ ...cfg, menus: sorted }));
                                triggerToast();
                              }
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-600"
                            title="Move Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>

                          {/* Move Down */}
                          <button
                            disabled={idx === siteConfig.menus.length - 1}
                            onClick={() => {
                              const sorted = [...siteConfig.menus].sort((a, b) => a.order - b.order);
                              if (idx < sorted.length - 1) {
                                const current = sorted[idx];
                                const next = sorted[idx + 1];
                                const tempOrder = current.order;
                                current.order = next.order;
                                next.order = tempOrder;
                                updateConfig((cfg) => ({ ...cfg, menus: sorted }));
                                triggerToast();
                              }
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-600"
                            title="Move Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>

                          {/* Visibility Toggle */}
                          <button
                            onClick={() => {
                              updateConfig((prev) => ({
                                ...prev,
                                menus: prev.menus.map((m) =>
                                  m.id === menu.id ? { ...m, visible: !m.visible } : m
                                ),
                              }));
                              triggerToast();
                            }}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              menu.visible
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                : 'border-slate-300 bg-slate-200 text-slate-500 hover:bg-slate-300'
                            }`}
                            title={menu.visible ? 'Hide Menu' : 'Show Menu'}
                          >
                            {menu.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Inline Edit Form */}
                      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Sublabel / Subtitle</label>
                          <input
                            type="text"
                            value={menu.sublabel || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateConfig((prev) => ({
                                ...prev,
                                menus: prev.menus.map((m) => (m.id === menu.id ? { ...m, labelKo: val } : m)),
                              }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:border-amber-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Navigation Label (English)</label>
                          <input
                            type="text"
                            value={menu.labelEn}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateConfig((prev) => ({
                                ...prev,
                                menus: prev.menus.map((m) => (m.id === menu.id ? { ...m, labelEn: val } : m)),
                              }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:border-amber-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Highlight Badge (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. HOT, NEW, POPULAR"
                            value={menu.badge || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateConfig((prev) => ({
                                ...prev,
                                menus: prev.menus.map((m) => (m.id === menu.id ? { ...m, badge: val } : m)),
                              }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:border-amber-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: POPUP MANAGEMENT (DUAL TYPE: TEMPLATE vs IMAGE)                     */}
          {/* ========================================================================= */}
          {activeTab === 'popup' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Master Popup Switch */}
              <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Popup Modal Activation (Master Switch)
                    </h3>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                        siteConfig.popup.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {siteConfig.popup.isActive ? 'Currently Active on Site (ON)' : 'Currently Disabled (OFF)'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Initially disabled by default as requested. Enable this master switch when you wish to show the promotional modal to site visitors.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Preview Button */}
                  <button
                    onClick={() => {
                      setPreviewPopupOpen(true);
                      setIsAdminOpen(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Live Preview Popup Modal</span>
                  </button>

                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={siteConfig.popup.isActive}
                      onChange={(e) => {
                        updateConfig((prev) => ({
                          ...prev,
                          popup: { ...prev.popup, isActive: e.target.checked },
                        }));
                        triggerToast();
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>

              {/* Popup Type Selector: 1. Template vs 2. Image */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Popup Style (Choose between 2 types):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Type 1: Built-in Template */}
                  <div
                    onClick={() => {
                      updateConfig((prev) => ({
                        ...prev,
                        popup: { ...prev.popup, type: 'template' },
                      }));
                      triggerToast();
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      siteConfig.popup.type === 'template'
                        ? 'border-amber-500 bg-amber-50/40 ring-4 ring-amber-500/10 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          1
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          Type 1: Built-in Web Template Popup
                        </span>
                      </div>
                      {siteConfig.popup.type === 'template' && (
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ready-to-use template modal. Simply enter the date, time, tour product name, and offer details—it formats automatically into a luxury booking popup without designing an image.
                    </p>
                  </div>

                  {/* Type 2: Image Attachment */}
                  <div
                    onClick={() => {
                      updateConfig((prev) => ({
                        ...prev,
                        popup: { ...prev.popup, type: 'image' },
                      }));
                      triggerToast();
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      siteConfig.popup.type === 'image'
                        ? 'border-amber-500 bg-amber-50/40 ring-4 ring-amber-500/10 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                          2
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          Type 2: Custom Image Flyer / Banner Popup
                        </span>
                      </div>
                      {siteConfig.popup.type === 'image' && (
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Attach a custom designer poster, event flyer, or promotional graphic file to display as the popup banner.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form 1: When Template Type is selected */}
              {siteConfig.popup.type === 'template' && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Template Popup Details &amp; Copy</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        1. Ribbon Badge
                      </label>
                      <input
                        type="text"
                        value={siteConfig.popup.template.badge}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            popup: {
                              ...prev.popup,
                              template: { ...prev.popup.template, badge: val },
                            },
                          }));
                        }}
                        placeholder="e.g. 2026 AUTUMN PEAK PROMOTION"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        2. Main Title
                      </label>
                      <input
                        type="text"
                        value={siteConfig.popup.template.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            popup: {
                              ...prev.popup,
                              template: { ...prev.popup.template, title: val },
                            },
                          }));
                        }}
                        placeholder="e.g. Everest Scenic Flight Early Bird Special"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        3. Event Dates / Period
                      </label>
                      <input
                        type="text"
                        value={siteConfig.popup.template.eventPeriod}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            popup: {
                              ...prev.popup,
                              template: { ...prev.popup.template, eventPeriod: val },
                            },
                          }));
                        }}
                        placeholder="e.g. Oct 01 – Nov 30, 2026"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        4. Departure / Flight Time
                      </label>
                      <input
                        type="text"
                        value={siteConfig.popup.template.departureTime}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            popup: {
                              ...prev.popup,
                              template: { ...prev.popup.template, departureTime: val },
                            },
                          }));
                        }}
                        placeholder="e.g. Daily Departures 06:30 / 07:15 (Kathmandu TIA)"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        5. Target Tour / Product Name
                      </label>
                      <input
                        type="text"
                        value={siteConfig.popup.template.productName}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            popup: {
                              ...prev.popup,
                              template: { ...prev.popup.template, productName: val },
                            },
                          }));
                        }}
                        placeholder="e.g. Everest Scenic Window-Guaranteed Flight (1-Hour Return)"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        6. Special Offer / Discount Details
                      </label>
                      <input
                        type="text"
                        value={siteConfig.popup.template.specialOffer}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            popup: {
                              ...prev.popup,
                              template: { ...prev.popup.template, specialOffer: val },
                            },
                          }));
                        }}
                        placeholder="e.g. Early Bird 25% Instant Savings ($198 Special) + Free Hotel Transfers"
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/50 text-xs font-bold text-amber-950 focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        7. Detailed Description
                      </label>
                      <textarea
                        rows={3}
                        value={siteConfig.popup.template.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            popup: {
                              ...prev.popup,
                              template: { ...prev.popup.template, description: val },
                            },
                          }));
                        }}
                        placeholder="Enter detailed description and terms..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        8. Action Button Text
                      </label>
                      <input
                        type="text"
                        value={siteConfig.popup.template.buttonText}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            popup: {
                              ...prev.popup,
                              template: { ...prev.popup.template, buttonText: val },
                            },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        9. Destination Target Section
                      </label>
                      <select
                        value={siteConfig.popup.template.targetSectionId}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            popup: {
                              ...prev.popup,
                              template: { ...prev.popup.template, targetSectionId: val },
                            },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-500 outline-none"
                      >
                        <option value="aviation">Domestic Flights &amp; Scenic Tours (#aviation)</option>
                        <option value="sanctuaries">Hotels &amp; Mountain Lodges (#sanctuaries)</option>
                        <option value="fleet">4WD Vehicles &amp; Driver (#fleet)</option>
                        <option value="odysseys">Combo Packages (#odysseys)</option>
                        <option value="about">About Us &amp; Credentials (#about)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Form 2: When Image Type is selected */}
              {siteConfig.popup.type === 'image' && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    <span>Image File Attachment &amp; Destination Link</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Image Upload */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1.5">
                        Upload Flyer / Promotional Banner File
                      </label>
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/20 transition-all text-center">
                        <Upload className="w-8 h-8 text-slate-400 mb-1" />
                        <span className="text-xs font-bold text-slate-800">Attach Image File</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">Supports JPG, PNG, WebP</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                if (typeof reader.result === 'string') {
                                  updateConfig((prev) => ({
                                    ...prev,
                                    popup: {
                                      ...prev.popup,
                                      imagePopup: {
                                        ...prev.popup.imagePopup,
                                        imageUrl: reader.result as string,
                                      },
                                    },
                                  }));
                                  triggerToast();
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Image Preview & URL */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Or enter direct web image address (URL)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="https://..."
                            value={customPopupImageUrl}
                            onChange={(e) => setCustomPopupImageUrl(e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 outline-none focus:border-amber-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (customPopupImageUrl.trim()) {
                                updateConfig((prev) => ({
                                  ...prev,
                                  popup: {
                                    ...prev.popup,
                                    imagePopup: {
                                      ...prev.popup.imagePopup,
                                      imageUrl: customPopupImageUrl.trim(),
                                    },
                                  },
                                }));
                                setCustomPopupImageUrl('');
                                triggerToast();
                              }
                            }}
                            className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                          >
                            Apply
                          </button>
                        </div>
                      </div>

                      {/* Current Image Thumbnail */}
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Current Popup Image Preview:
                        </div>
                        <div className="w-full h-32 rounded-xl bg-slate-900 overflow-hidden relative border border-slate-200">
                          <img
                            src={siteConfig.popup.imagePopup.imageUrl || '/images/hero_himalayas_travel_1790502254393.jpg'}
                            alt="Popup Banner"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Target Link */}
                  <div className="pt-2">
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Destination Link URL or Page Section (#aviation, #odysseys, etc.)
                    </label>
                    <input
                      type="text"
                      value={siteConfig.popup.imagePopup.linkUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          popup: {
                            ...prev.popup,
                            imagePopup: { ...prev.popup.imagePopup, linkUrl: val },
                          },
                        }));
                      }}
                      placeholder="e.g. #aviation or https://example.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Popup Options: 24h dismissal reset */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={siteConfig.popup.showOncePerDay}
                    onChange={(e) => {
                      updateConfig((prev) => ({
                        ...prev,
                        popup: { ...prev.popup, showOncePerDay: e.target.checked },
                      }));
                      triggerToast();
                    }}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Provide "Do not show again today" checkbox (24-hour dismissal)</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    resetDailyDismissal();
                    alert('24-hour dismissal history has been reset. Refresh the page to test the popup modal.');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer self-start sm:self-auto"
                >
                  [Test Tool] Reset 24-Hour Dismissal Cache
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: COMPANY INFO & TOP TICKER NOTICE                                   */}
          {/* ========================================================================= */}
          {activeTab === 'company' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Ticker Notice */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Top Live Announcement Ticker
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={siteConfig.company.tickerActive}
                      onChange={(e) => {
                        updateConfig((prev) => ({
                          ...prev,
                          company: { ...prev.company, tickerActive: e.target.checked },
                        }));
                        triggerToast();
                      }}
                      className="w-4 h-4 rounded text-amber-500"
                    />
                    <span>Show Top Ticker</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={siteConfig.company.tickerNotice}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateConfig((prev) => ({
                      ...prev,
                      company: { ...prev.company, tickerNotice: val },
                    }));
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-500 outline-none"
                  placeholder="Enter announcement text to scroll at the top of the site..."
                />
              </div>

              {/* Company Credentials Form */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
                  Agency Credentials &amp; Government Licenses
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Company Legal Name (English)</label>
                    <input
                      type="text"
                      value={siteConfig.company.nameEn}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          company: { ...prev.company, nameEn: val },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Company Tagline / Subtitle</label>
                    <input
                      type="text"
                      value={siteConfig.company.tagline}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          company: { ...prev.company, nameKo: val },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Primary Phone Hotline</label>
                    <input
                      type="text"
                      value={siteConfig.company.phone}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          company: { ...prev.company, phone: val },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Emergency WhatsApp Number</label>
                    <input
                      type="text"
                      value={siteConfig.company.whatsapp}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          company: { ...prev.company, whatsapp: val },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Official Contact Email</label>
                    <input
                      type="email"
                      value={siteConfig.company.email}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          company: { ...prev.company, email: val },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Nepal Government Registration Number (Reg No.)</label>
                    <input
                      type="text"
                      value={siteConfig.company.registrationNumber}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          company: { ...prev.company, registrationNumber: val },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Department of Tourism License Number</label>
                    <input
                      type="text"
                      value={siteConfig.company.tourismLicense}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          company: { ...prev.company, tourismLicense: val },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Kathmandu Head Office Address</label>
                    <input
                      type="text"
                      value={siteConfig.company.officeAddress}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          company: { ...prev.company, officeAddress: val },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: SECURITY & BACKUP                                                  */}
          {/* ========================================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Change Admin Password */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  <span>Change Administrator Password</span>
                </div>

                <div className="max-w-md space-y-3">
                  <div className="text-xs text-slate-600">
                    Current PIN / Password: <strong className="font-mono text-amber-700">{siteConfig.adminPin || 'admin1234'}</strong>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Enter New Admin PIN
                    </label>
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => {
                        setNewPin(e.target.value);
                        setPinChangeSuccess(false);
                      }}
                      placeholder="New password..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={!newPin.trim()}
                    onClick={() => {
                      if (newPin.trim()) {
                        updateConfig((prev) => ({ ...prev, adminPin: newPin.trim() }));
                        setPinChangeSuccess(true);
                        setNewPin('');
                        triggerToast();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Update Password
                  </button>

                  {pinChangeSuccess && (
                    <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Password updated successfully!</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Backup & Restore */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" />
                  <span>Configuration Backup &amp; Restore (JSON Data)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Export */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-900">Export Configuration (JSON)</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Download all current background settings, menus, popups, and agency details as a JSON file to your device.
                    </p>
                    <button
                      onClick={() => {
                        exportConfigJson();
                        triggerToast();
                      }}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Backup (.json)</span>
                    </button>
                  </div>

                  {/* Import */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-900">Import Configuration (JSON)</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Upload a previously saved JSON backup file to restore all website settings immediately.
                    </p>
                    <label className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Upload Backup File (.json)</span>
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const content = event.target?.result;
                              if (typeof content === 'string') {
                                if (importConfigJson(content)) {
                                  alert('Settings successfully restored from backup.');
                                } else {
                                  alert('Invalid JSON configuration file.');
                                }
                              }
                            };
                            reader.readAsText(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Reset to Factory Default */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-rose-700">Reset All Settings to Defaults</div>
                    <div className="text-[10px] text-slate-500">Restore background, menu, and popup configurations back to factory defaults.</div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all configurations to factory defaults?')) {
                        resetToDefault();
                        triggerToast();
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Default</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar with Status and Quick Actions */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>All changes are saved live and persist seamlessly across Vercel and local environments.</span>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-fadeIn">
                <Check className="w-4 h-4" />
                <span>Saved!</span>
              </span>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 transition-all cursor-pointer"
            >
              Save & Close Portal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
