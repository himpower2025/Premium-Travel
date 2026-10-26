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
  Info,
  Sliders,
  CheckCircle2,
  Calendar,
  Clock,
  Plane,
  Building2,
  Car,
  Compass,
  Edit3,
  MapPin,
  Award
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

  // Active Tab: 'menus' | 'background' | 'popup' | 'company' | 'security'
  const [activeTab, setActiveTab] = useState<'menus' | 'background' | 'popup' | 'company' | 'security'>('menus');

  // Login form state
  const [inputPin, setInputPin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Security tab state
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Image input temp URL
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [customPopupImageUrl, setCustomPopupImageUrl] = useState('');

  // Toast / notification state
  const [saveToast, setSaveToast] = useState(false);

  // Menu editing dialog state
  const [editingMenu, setEditingMenu] = useState<MenuItemConfig | null>(null);
  const [isAddingNewMenu, setIsAddingNewMenu] = useState(false);

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2200);
  };

  if (!isAdminOpen) return null;

  // Available icon options for menus
  const iconOptions = [
    { name: 'Plane', label: 'Flights & Air', icon: <Plane className="w-4 h-4" /> },
    { name: 'Building2', label: 'Hotels & Resorts', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Car', label: '4WD Vehicles', icon: <Car className="w-4 h-4" /> },
    { name: 'Sparkles', label: 'Packages & Deals', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Building', label: 'About Agency', icon: <Building className="w-4 h-4" /> },
    { name: 'Compass', label: 'Expeditions', icon: <Compass className="w-4 h-4" /> },
    { name: 'MapPin', label: 'Destinations', icon: <MapPin className="w-4 h-4" /> },
    { name: 'Award', label: 'Licenses & Credentials', icon: <Award className="w-4 h-4" /> },
  ];

  const targetSectionOptions = [
    { id: 'aviation', name: '01. Domestic Flights & Mountain Scenic Tours (#aviation)' },
    { id: 'sanctuaries', name: '02. 5-Star Resorts & Himalayan Lodges (#sanctuaries)' },
    { id: 'fleet', name: '03. 4WD Expedition Vehicles & Licensed Drivers (#fleet)' },
    { id: 'odysseys', name: '04. All-in-One Curated Combo Packages (#odysseys)' },
    { id: 'about', name: '05. Company Profile & Government Licenses (#about)' },
  ];

  const renderIconByName = (name: string) => {
    switch (name) {
      case 'Plane': return <Plane className="w-4 h-4" />;
      case 'Building2': return <Building2 className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'Building': return <Building className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'MapPin': return <MapPin className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      default: return <Compass className="w-4 h-4" />;
    }
  };

  // ---------------------------------------------------------------------------
  // 1. Password Verification Screen (Admin Sign-In)
  // ---------------------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-200">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 ring-8 ring-amber-500/5">
              <Lock className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Administrator Sign-In
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
              Please enter your administrator PIN / password to access the website management portal.
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
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Administrator Password (PIN / Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inputPin}
                  onChange={(e) => {
                    setInputPin(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Enter administrator password..."
                  className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-mono tracking-wider outline-none transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                  <X className="w-3.5 h-3.5" />
                  <span>Incorrect password. Please verify and try again.</span>
                </p>
              )}
            </div>

            {/* Quick Demo Hint */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Default PIN: <strong className="text-amber-700 font-mono font-bold">{siteConfig.adminPin || 'admin1234'}</strong></span>
              <button
                type="button"
                onClick={() => setInputPin(siteConfig.adminPin || 'admin1234')}
                className="text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer text-[11px]"
              >
                Auto-fill Default PIN
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Sign In to Admin</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. Full Admin Portal Dashboard Screen (100% English & Reader-Friendly)
  // ---------------------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-hidden">
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[880px] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden text-slate-900">
        
        {/* ========================================================================= */}
        {/* TOP BAR: Clean, Professional Header                                       */}
        {/* ========================================================================= */}
        <div className="px-5 py-3.5 bg-[#0c2340] text-white flex items-center justify-between shrink-0 border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-sm">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Flyward Administration Center
                </h2>
                <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Auto-Save Enabled
                </span>
              </div>
              <p className="text-[11px] text-sky-200">
                Manage navigation menus, persistent backgrounds, event popups, and official credentials in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exportConfigJson();
                triggerToast();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-sky-100 transition-colors cursor-pointer"
              title="Download configuration backup as JSON file"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Backup Data (.json)</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-medium transition-colors cursor-pointer"
            >
              Sign Out
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB NAVIGATION: Reader-friendly, clearly categorized in English            */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 pb-2.5 bg-slate-100/80 border-b border-slate-200 overflow-x-auto shrink-0 select-none">
          <button
            onClick={() => setActiveTab('menus')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'menus'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            <MenuIcon className="w-4 h-4" />
            <span>1. Navigation Menus</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-md bg-black/10">
              {siteConfig.menus.filter((m) => m.visible).length} Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab('background')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'background'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>2. Background &amp; Scroll</span>
          </button>

          <button
            onClick={() => setActiveTab('popup')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer relative ${
              activeTab === 'popup'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>3. Popups &amp; Promotions</span>
            {siteConfig.popup.isActive ? (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                ON
              </span>
            ) : (
              <span className="text-[10px] text-slate-500 font-mono">(OFF)</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'company'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>4. Company &amp; Live Ticker</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'security'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>5. Security &amp; Data Backup</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB BODY (Scrollable Container)                                           */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/70 space-y-6">

          {/* ======================================================================= */}
          {/* TAB 1: NAVIGATION MENUS (Intuitive, Clean, Reader-Friendly)               */}
          {/* ======================================================================= */}
          {activeTab === 'menus' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              
              {/* 1. Header Live Preview: Instant Visual Feedback */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-amber-500" />
                      <span>Live Website Header Navigation Preview</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Any changes made to menu ordering, labels, badges, or visibility below are instantly simulated here.
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 self-start sm:self-auto bg-slate-100 px-2.5 py-1 rounded-md">
                    Visible Items: <strong className="text-blue-900">{siteConfig.menus.filter((m) => m.visible).length} Active</strong>
                  </span>
                </div>

                {/* Simulated Header Bar */}
                <div className="bg-[#0c2a50] rounded-xl p-3 sm:p-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-inner">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-100">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>FLYWARD NEPAL</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {siteConfig.menus.filter((m) => m.visible).length === 0 ? (
                      <span className="text-xs text-amber-300 italic py-1">
                        No menus are currently visible. Turn on the "Visible" toggle for at least one item below.
                      </span>
                    ) : (
                      siteConfig.menus
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .filter((m) => m.visible)
                        .map((menu, idx) => (
                          <div
                            key={menu.id}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                              idx === 0
                                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                                : 'bg-white/10 text-sky-100 border border-white/10'
                            }`}
                          >
                            {renderIconByName(menu.icon)}
                            <span>{menu.labelEn}</span>
                            {menu.badge && (
                              <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-slate-950 text-amber-300">
                                {menu.badge}
                              </span>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Menu Table List Header & Quick Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>Navigation Items &amp; Order Management</span>
                    <span className="text-xs font-normal text-slate-500">
                      (Organized list: use [Move Up/Down] to reorder, [Edit] to modify details)
                    </span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newId = `menu-custom-${Date.now()}`;
                      const newMenu: MenuItemConfig = {
                        id: newId,
                        key: `custom_${Date.now()}`,
                        labelEn: 'New Tour Experience',
                        sublabel: 'Curated Adventure Booking',
                        icon: 'Compass',
                        badge: 'NEW',
                        visible: true,
                        targetSectionId: 'aviation',
                        order: siteConfig.menus.length + 1,
                      };
                      setEditingMenu(newMenu);
                      setIsAddingNewMenu(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Menu Item</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all menus back to default 5 items (Flights, Hotels, Vehicles, Packages, About)?')) {
                        resetToDefault();
                        triggerToast();
                      }
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    title="Reset to factory default menus"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* 3. Intuitive Menu Table / Card List */}
              <div className="space-y-2.5">
                {siteConfig.menus
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((menu, idx, arr) => (
                    <div
                      key={menu.id}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                        menu.visible
                          ? 'bg-white border-slate-200/90 shadow-xs hover:border-amber-400'
                          : 'bg-slate-100/70 border-slate-200 opacity-65'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        
                        {/* Left: Sequence + Icon + Labels */}
                        <div className="flex items-center gap-3">
                          {/* Order Number & Up/Down Arrows */}
                          <div className="flex items-center gap-1">
                            <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
                              #{idx + 1}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <button
                                disabled={idx === 0}
                                onClick={() => {
                                  const sorted = [...siteConfig.menus].sort((a, b) => a.order - b.order);
                                  if (idx > 0) {
                                    const curr = sorted[idx];
                                    const prev = sorted[idx - 1];
                                    const temp = curr.order;
                                    curr.order = prev.order;
                                    prev.order = temp;
                                    updateConfig((cfg) => ({ ...cfg, menus: sorted }));
                                    triggerToast();
                                  }
                                }}
                                className="p-1 rounded hover:bg-slate-200 disabled:opacity-20 disabled:pointer-events-none text-slate-600 transition-colors cursor-pointer"
                                title="Move Up One Position"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                disabled={idx === arr.length - 1}
                                onClick={() => {
                                  const sorted = [...siteConfig.menus].sort((a, b) => a.order - b.order);
                                  if (idx < arr.length - 1) {
                                    const curr = sorted[idx];
                                    const next = sorted[idx + 1];
                                    const temp = curr.order;
                                    curr.order = next.order;
                                    next.order = temp;
                                    updateConfig((cfg) => ({ ...cfg, menus: sorted }));
                                    triggerToast();
                                  }
                                }}
                                className="p-1 rounded hover:bg-slate-200 disabled:opacity-20 disabled:pointer-events-none text-slate-600 transition-colors cursor-pointer"
                                title="Move Down One Position"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Menu Icon Box */}
                          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                            {renderIconByName(menu.icon)}
                          </div>

                          {/* Titles & Destination Tag */}
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-slate-900">
                                {menu.labelEn}
                              </span>
                              {menu.sublabel && (
                                <span className="text-xs text-slate-500 font-normal">
                                  ({menu.sublabel})
                                </span>
                              )}
                              {menu.badge && (
                                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                                  {menu.badge}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span>Destination:</span>
                              <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60 font-semibold">
                                #{menu.targetSectionId}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Toggle Switch & Edit / Delete Buttons */}
                        <div className="flex items-center gap-3 self-end md:self-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-between md:justify-end">
                          
                          {/* Visibility Toggle Button */}
                          <button
                            type="button"
                            onClick={() => {
                              updateConfig((prev) => ({
                                ...prev,
                                menus: prev.menus.map((m) =>
                                  m.id === menu.id ? { ...m, visible: !m.visible } : m
                                ),
                              }));
                              triggerToast();
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              menu.visible
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                                : 'bg-slate-200 border-slate-300 text-slate-600 hover:bg-slate-300'
                            }`}
                            title={menu.visible ? 'Click to hide menu' : 'Click to display menu'}
                          >
                            {menu.visible ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Visible (Active)</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                                <span>Hidden (Off)</span>
                              </>
                            )}
                          </button>

                          {/* Edit Details Button */}
                          <button
                            onClick={() => {
                              setEditingMenu({ ...menu });
                              setIsAddingNewMenu(false);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                            title="Edit menu label, subtitle, badge, and target destination"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                            <span>Edit</span>
                          </button>

                          {/* Delete Button (if > 1 menu) */}
                          {siteConfig.menus.length > 1 && (
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete the menu item '${menu.labelEn}'?`)) {
                                  updateConfig((prev) => ({
                                    ...prev,
                                    menus: prev.menus.filter((m) => m.id !== menu.id),
                                  }));
                                  triggerToast();
                                }
                              }}
                              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                              title="Delete Menu"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                      </div>
                    </div>
                  ))}
              </div>

              {/* 4. Menu Edit Modal Dialog (English & Reader-Friendly) */}
              {editingMenu && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
                  <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-5 text-slate-900">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-amber-500" />
                          <span>{isAddingNewMenu ? 'Add New Navigation Item' : 'Edit Navigation Item'}</span>
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Configure primary title, descriptor subtitle, highlight badge, icon, and destination section.
                        </p>
                      </div>
                      <button
                        onClick={() => setEditingMenu(null)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* Menu Label (English) */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Primary Menu Label (English) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={editingMenu.labelEn}
                          onChange={(e) => setEditingMenu({ ...editingMenu, labelEn: e.target.value })}
                          placeholder="e.g. Flights & Scenic Tours, Hotel Lodges"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm font-medium outline-none"
                        />
                        <span className="text-[11px] text-slate-400 mt-0.5 block">Displayed as the main clickable label on the header navigation bar.</span>
                      </div>

                      {/* Sublabel / Descriptor */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Subtitle / Descriptor (Optional)
                        </label>
                        <input
                          type="text"
                          value={editingMenu.sublabel || ''}
                          onChange={(e) => setEditingMenu({ ...editingMenu, sublabel: e.target.value })}
                          placeholder="e.g. Everest Window Guaranteed, 5-Star Himalayan Sanctuaries"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm outline-none"
                        />
                        <span className="text-[11px] text-slate-400 mt-0.5 block">Used in mobile drawers and secondary navigation descriptions.</span>
                      </div>

                      {/* Highlight Badge */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Highlight Badge (Optional)
                        </label>
                        <input
                          type="text"
                          value={editingMenu.badge || ''}
                          onChange={(e) => setEditingMenu({ ...editingMenu, badge: e.target.value.toUpperCase() })}
                          placeholder="e.g. HOT, NEW, POPULAR, SPECIAL DEAL (Leave empty for none)"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm font-mono outline-none"
                        />
                      </div>

                      {/* Target Section */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Destination Page Section <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={editingMenu.targetSectionId}
                          onChange={(e) => setEditingMenu({ ...editingMenu, targetSectionId: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-sm bg-white outline-none cursor-pointer"
                        >
                          {targetSectionOptions.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Icon Picker */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5">
                          Select Menu Icon
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {iconOptions.map((opt) => (
                            <button
                              key={opt.name}
                              type="button"
                              onClick={() => setEditingMenu({ ...editingMenu, icon: opt.name })}
                              className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                                editingMenu.icon === opt.name
                                  ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold ring-2 ring-amber-400/30'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {opt.icon}
                              <span className="text-[10px] truncate max-w-full">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Visibility checkbox */}
                      <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingMenu.visible}
                          onChange={(e) => setEditingMenu({ ...editingMenu, visible: e.target.checked })}
                          className="w-4 h-4 rounded text-amber-500"
                        />
                        <span className="text-xs font-bold text-slate-800">
                          Display this item in the website top navigation bar (Visible)
                        </span>
                      </label>
                    </div>

                    {/* Dialog Buttons */}
                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setEditingMenu(null)}
                        className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingMenu.labelEn.trim()) {
                            alert('Please enter a valid Primary Menu Label.');
                            return;
                          }
                          if (isAddingNewMenu) {
                            updateConfig((prev) => ({
                              ...prev,
                              menus: [...prev.menus, editingMenu],
                            }));
                          } else {
                            updateConfig((prev) => ({
                              ...prev,
                              menus: prev.menus.map((m) => (m.id === editingMenu.id ? editingMenu : m)),
                            }));
                          }
                          triggerToast();
                          setEditingMenu(null);
                        }}
                        className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Save Changes</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 2: BACKGROUND & SCROLL CONFIGURATION                                 */}
          {/* ======================================================================= */}
          {activeTab === 'background' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Highlight Note */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Persistent Background Scroll System:</strong>
                  <p className="mt-0.5 text-blue-800 leading-relaxed">
                    The Himalayan panoramic photography remains anchored in the viewport as visitors scroll down the full page, ensuring high visual immersion without disappearing.
                  </p>
                </div>
              </div>

              {/* Fixed on Scroll Master Toggle */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">Keep Background Fixed on Scroll (Persistent Background)</div>
                  <div className="text-xs text-slate-500">
                    When enabled, the background photo stays fixed in viewport during full-page scrolling.
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
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Preset Background Selector */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Curated Himalayan High-Resolution Presets (5 Options):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                        className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-amber-500 ring-4 ring-amber-500/20 shadow-md'
                            : 'border-slate-200 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div className="h-28 w-full overflow-hidden bg-slate-900 relative">
                          <img
                            src={preset.thumbnail}
                            alt={preset.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 p-1 rounded-full shadow">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div className="p-2.5 bg-white">
                          <div className="text-xs font-bold text-slate-900 truncate">{preset.title}</div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">{preset.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Image Upload & URL */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Upload Custom Photograph or Enter Direct Image URL
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload */}
                  <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/20 transition-all text-center">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-800">Upload Photo from Device</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Supports high-resolution JPG, PNG, and WebP</span>
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
                                  presetId: 'custom-upload',
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

                  {/* Direct URL */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-600 block">
                      Direct Web Image Address (URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-amber-500"
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
                        className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sliders: Opacity, Brightness, Blur */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Visual Fine-Tuning (Opacity, Brightness, Blur)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {/* Opacity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-medium text-slate-700">
                      <span>Background Opacity</span>
                      <span className="font-mono font-bold text-amber-700">{siteConfig.background.opacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={siteConfig.background.opacity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        updateConfig((prev) => ({
                          ...prev,
                          background: { ...prev.background, opacity: val },
                        }));
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Brightness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-medium text-slate-700">
                      <span>Brightness</span>
                      <span className="font-mono font-bold text-amber-700">{siteConfig.background.brightness}%</span>
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
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Blur */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-medium text-slate-700">
                      <span>Gaussian Blur Filter</span>
                      <span className="font-mono font-bold text-amber-700">{siteConfig.background.blur}px</span>
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
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Overlay Tone Selector */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-600 mb-2">Atmospheric Tone Filter:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'clear', label: 'Crystal Clear (Default)' },
                      { key: 'light', label: 'Clear Mountain Daylight' },
                      { key: 'dark', label: 'Deep Evening Navy' },
                      { key: 'golden', label: 'Golden Sunset Amber' },
                    ].map((theme) => (
                      <button
                        key={theme.key}
                        type="button"
                        onClick={() => {
                          updateConfig((prev) => ({
                            ...prev,
                            background: { ...prev.background, overlayTheme: theme.key as OverlayTheme },
                          }));
                          triggerToast();
                        }}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                          siteConfig.background.overlayTheme === theme.key
                            ? 'bg-amber-100 border-amber-500 text-slate-950 ring-2 ring-amber-400/30'
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

          {/* ======================================================================= */}
          {/* TAB 3: POPUPS & PROMOTIONS MANAGEMENT                                    */}
          {/* ======================================================================= */}
          {activeTab === 'popup' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Master Popup Switch Card */}
              <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Promotional Popup Modal (Master Switch)
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
                    Enable this master switch to display promotional announcements or special packages to site visitors.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setPreviewPopupOpen(true);
                      setIsAdminOpen(false);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Preview Live Popup Modal</span>
                  </button>

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

              {/* Popup Style: Template vs Image */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Popup Display Format (2 Options):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Template */}
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
                        <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          1
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          Format 1: Structured Web Template
                        </span>
                      </div>
                      {siteConfig.popup.type === 'template' && (
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pre-formatted luxury modal. Simply input dates, time, tour product name, and discount details—formats automatically without designing an image.
                    </p>
                  </div>

                  {/* Option 2: Image */}
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
                        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                          2
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          Format 2: Custom Poster / Banner Image
                        </span>
                      </div>
                      {siteConfig.popup.type === 'image' && (
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Upload your own graphic promotional poster, seasonal flyer, or event banner to display as the popup.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form 1: When Template Type is selected */}
              {siteConfig.popup.type === 'template' && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Template Popup Copy &amp; Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        2. Main Headline Title
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        5. Target Tour / Experience Name
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        6. Special Offer &amp; Discount Details
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
                        placeholder="e.g. Early Bird 25% Instant Savings ($198 Special) + Complimentary Hotel Transfers"
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        7. Detailed Terms &amp; Description
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
                        placeholder="Enter terms, inclusions, and reservation details..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 leading-relaxed focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        8. Action Button Label
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        9. Target Page Section
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 bg-white outline-none cursor-pointer"
                      >
                        {targetSectionOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))}
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
                    <span>Image Poster Upload &amp; Destination Link</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Image Upload */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1.5">
                        Upload Promotional Flyer / Poster File
                      </label>
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/20 transition-all text-center">
                        <Upload className="w-8 h-8 text-slate-400 mb-1" />
                        <span className="text-xs font-bold text-slate-800">Attach Poster Graphic File</span>
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
                          Or Enter Web Image Address (URL)
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
                            className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      </div>

                      {/* Current Image Thumbnail */}
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Current Banner Preview:
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
                      Destination Link URL or Target Section (#aviation, #odysseys, etc.)
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
                      placeholder="e.g. #aviation or external URL"
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
                    alert('24-hour dismissal cache has been reset. Refresh the main page to test the popup modal.');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer self-start sm:self-auto"
                >
                  [Testing Tool] Reset 24-Hour Dismissal Cache
                </button>
              </div>

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: COMPANY INFO & TOP LIVE TICKER                                    */}
          {/* ======================================================================= */}
          {activeTab === 'company' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Ticker Notice */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Top Live Announcement Ticker Bar
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
                    <span>Enable Top Announcement Ticker</span>
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
                  Official Agency Profile &amp; Government Licenses
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
                          company: { ...prev.company, tagline: val },
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
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Emergency 24/7 WhatsApp Number</label>
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
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Nepal Government Company Registration No.</label>
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
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Department of Tourism License No.</label>
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

          {/* ======================================================================= */}
          {/* TAB 5: SECURITY & DATA BACKUP                                            */}
          {/* ======================================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Change Admin Password */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  <span>Change Administrator Password (PIN)</span>
                </div>

                <div className="max-w-md space-y-3">
                  <div className="text-xs text-slate-600">
                    Current PIN / Password: <strong className="font-mono text-amber-700">{siteConfig.adminPin || 'admin1234'}</strong>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Enter New Admin Password
                    </label>
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => {
                        setNewPin(e.target.value);
                        setPinChangeSuccess(false);
                      }}
                      placeholder="Enter new password..."
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
                    <div className="text-xs font-bold text-slate-900">Download Configuration Backup</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Download all current menus, persistent background settings, popups, and official details as a JSON file.
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
                    <div className="text-xs font-bold text-slate-900">Restore Configuration from File</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Upload a previously exported JSON backup file to immediately restore website settings.
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
                                  alert('All settings have been successfully restored from backup.');
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
                    <div className="text-xs font-bold text-rose-700">Reset All Settings to Factory Defaults</div>
                    <div className="text-[10px] text-slate-500">Restore background, menu items, and popup configuration back to original defaults.</div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all configurations to factory defaults? This action cannot be undone.')) {
                        resetToDefault();
                        triggerToast();
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* FOOTER BAR: Instant Feedback & Save/Close                                 */}
        {/* ========================================================================= */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>All changes are saved live and persist automatically across user sessions.</span>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-fadeIn">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Settings saved!</span>
              </span>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 transition-all cursor-pointer"
            >
              Save &amp; Close Portal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
