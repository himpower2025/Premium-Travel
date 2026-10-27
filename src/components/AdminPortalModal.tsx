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
  Award,
  Home,
  ShieldCheck,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Smartphone,
  Globe
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

  // Active Tab: 'overview' | 'menus' | 'background' | 'popup' | 'company' | 'security'
  const [activeTab, setActiveTab] = useState<'overview' | 'menus' | 'background' | 'popup' | 'company' | 'security'>('overview');

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
    { name: 'Plane', label: 'Flights & Scenic Tours', icon: <Plane className="w-4 h-4" /> },
    { name: 'Building2', label: 'Hotels & Resorts', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Car', label: '4WD Vehicles', icon: <Car className="w-4 h-4" /> },
    { name: 'Sparkles', label: 'Tour Packages', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Building', label: 'About Agency', icon: <Building className="w-4 h-4" /> },
    { name: 'Compass', label: 'Expeditions', icon: <Compass className="w-4 h-4" /> },
    { name: 'MapPin', label: 'Destinations', icon: <MapPin className="w-4 h-4" /> },
    { name: 'Award', label: 'Government Licenses', icon: <Award className="w-4 h-4" /> },
  ];

  const targetSectionOptions = [
    { id: 'aviation', name: 'Mountain Flights & Scenic Air Tours' },
    { id: 'sanctuaries', name: '5-Star Mountain Resorts & Lodges' },
    { id: 'fleet', name: '4WD Expedition Vehicles & Licensed Drivers' },
    { id: 'odysseys', name: 'All-in-One Curated Combo Packages' },
    { id: 'about', name: 'Company Profile & Official Licenses' },
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
  // 1. Password Verification Screen (Sign-In)
  // ---------------------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 text-slate-900">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 ring-8 ring-amber-500/5">
              <Lock className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Welcome to Flyward Manager
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 max-w-xs leading-relaxed">
              Enter your administrator password to customize website menus, background photos, and special offers.
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
                Admin Password (PIN)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inputPin}
                  onChange={(e) => {
                    setInputPin(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Enter your password..."
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
                <span>Log In</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. Full Admin Dashboard Screen (Executive 2-Column Friendly Layout)
  // ---------------------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-hidden">
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[880px] bg-slate-50 rounded-3xl shadow-2xl flex flex-col md:flex-row border border-slate-200 overflow-hidden text-slate-900">
        
        {/* ===================================================================== */}
        {/* LEFT SIDEBAR: Clean, Inviting Manager Navigation                      */}
        {/* ===================================================================== */}
        <div className="w-full md:w-64 bg-[#0a1e36] text-white flex flex-col justify-between shrink-0 border-r border-blue-950">
          
          {/* Top Brand & Title */}
          <div>
            <div className="p-4 sm:p-5 border-b border-blue-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                    <span>Flyward Admin</span>
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-sky-200 font-medium">Auto-Save Live</span>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <button
                onClick={() => setIsAdminOpen(false)}
                className="md:hidden p-1.5 text-sky-200 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs List */}
            <nav className="p-3 space-y-1 overflow-x-auto md:overflow-visible flex md:flex-col gap-1 md:gap-0">
              
              {/* 1. Dashboard Overview */}
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4" />
                  <span>Dashboard Home</span>
                </div>
                <ChevronRight className={`hidden md:block w-3.5 h-3.5 ${activeTab === 'overview' ? 'text-slate-900' : 'text-sky-300/60'}`} />
              </button>

              {/* 2. Menus */}
              <button
                onClick={() => setActiveTab('menus')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'menus'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MenuIcon className="w-4 h-4" />
                  <span>Navigation Menus</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  activeTab === 'menus' ? 'bg-black/20 text-slate-950' : 'bg-white/10 text-sky-200'
                }`}>
                  {siteConfig.menus.filter((m) => m.visible).length}
                </span>
              </button>

              {/* 3. Background */}
              <button
                onClick={() => setActiveTab('background')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'background'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>Background Photo</span>
                </div>
                <ChevronRight className={`hidden md:block w-3.5 h-3.5 ${activeTab === 'background' ? 'text-slate-900' : 'text-sky-300/60'}`} />
              </button>

              {/* 4. Popups */}
              <button
                onClick={() => setActiveTab('popup')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'popup'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4" />
                  <span>Popups &amp; Deals</span>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                  siteConfig.popup.isActive
                    ? activeTab === 'popup' ? 'bg-emerald-900 text-white' : 'bg-emerald-500 text-slate-950'
                    : 'text-sky-300/60'
                }`}>
                  {siteConfig.popup.isActive ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* 5. Company */}
              <button
                onClick={() => setActiveTab('company')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'company'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building className="w-4 h-4" />
                  <span>Company Profile</span>
                </div>
                <ChevronRight className={`hidden md:block w-3.5 h-3.5 ${activeTab === 'company' ? 'text-slate-900' : 'text-sky-300/60'}`} />
              </button>

              {/* 6. Security */}
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-sky-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4" />
                  <span>Password &amp; Backup</span>
                </div>
                <ChevronRight className={`hidden md:block w-3.5 h-3.5 ${activeTab === 'security' ? 'text-slate-900' : 'text-sky-300/60'}`} />
              </button>

            </nav>
          </div>

          {/* Bottom Sidebar Info & Logout */}
          <div className="hidden md:block p-4 border-t border-blue-900/50 space-y-2">
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/40 text-[11px] text-sky-200">
              <div className="font-semibold text-white">Need Quick Help?</div>
              <div className="text-sky-300/80 mt-0.5">All updates save instantly. You can test your site anytime.</div>
            </div>

            <button
              onClick={logoutAdmin}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

        </div>

        {/* ===================================================================== */}
        {/* MAIN WORKSPACE: High Legibility, Jargon-Free, Inviting Cards          */}
        {/* ===================================================================== */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
          
          {/* Top Bar inside Content Panel */}
          <div className="px-5 sm:px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'menus' && 'Header Navigation'}
                {activeTab === 'background' && 'Hero Imagery'}
                {activeTab === 'popup' && 'Promotions & Popups'}
                {activeTab === 'company' && 'Business Profile'}
                {activeTab === 'security' && 'Security & Data'}
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                {activeTab === 'overview' && 'Welcome to Your Website Manager'}
                {activeTab === 'menus' && 'Manage Navigation Menus'}
                {activeTab === 'background' && 'Choose Your Background Photo'}
                {activeTab === 'popup' && 'Promotional Popup & Announcement'}
                {activeTab === 'company' && 'Company Details & Contact Info'}
                {activeTab === 'security' && 'Password & Data Backup'}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  exportConfigJson();
                  triggerToast();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                title="Download backup file"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Save Backup</span>
              </button>

              <button
                onClick={() => setIsAdminOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Main Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">

            {/* =================================================================== */}
            {/* 1. DASHBOARD HOME: Warm Welcome & 1-Click Action Cards              */}
            {/* =================================================================== */}
            {activeTab === 'overview' && (
              <div className="space-y-6 max-w-4xl">
                
                {/* Welcome Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0c2a50] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Website Online &amp; Healthy
                    </span>
                    <h2 className="text-xl font-bold text-white pt-1">
                      Everything is up to date and running smoothly.
                    </h2>
                    <p className="text-xs text-sky-200 max-w-xl leading-relaxed">
                      This manager portal lets any team member easily update tour menus, change photos, and announce special packages without touching any code.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAdminOpen(false)}
                    className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-sky-50 shadow transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                  >
                    <Globe className="w-4 h-4 text-blue-700" />
                    <span>View Live Website</span>
                  </button>
                </div>

                {/* Quick Status Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Menus</div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">
                      {siteConfig.menus.filter((m) => m.visible).length} <span className="text-xs font-normal text-slate-500">items</span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium mt-1">Showing in Header</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Background Photo</div>
                    <div className="text-sm font-bold text-slate-900 mt-1 truncate">
                      Himalayan Scenic
                    </div>
                    <div className="text-[11px] text-blue-600 font-medium mt-1">
                      {siteConfig.background.fixedOnScroll ? 'Fixed on Scroll' : 'Standard'}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Promo Popup</div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">
                      {siteConfig.popup.isActive ? (
                        <span className="text-emerald-600">Active</span>
                      ) : (
                        <span className="text-slate-400">Off</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {siteConfig.popup.isActive ? 'Visible to visitors' : 'Disabled'}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Ticker Bar</div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">
                      {siteConfig.company.tickerActive ? (
                        <span className="text-emerald-600">Active</span>
                      ) : (
                        <span className="text-slate-400">Off</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Live Announcements</div>
                  </div>
                </div>

                {/* What would you like to update today? */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    What would you like to update today?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Card 1: Menus */}
                    <div
                      onClick={() => setActiveTab('menus')}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                        <MenuIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 flex items-center gap-1.5">
                          <span>Navigation Menus</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Rearrange menu order, add new pages, change titles, or hide sections from visitors.
                        </p>
                      </div>
                    </div>

                    {/* Card 2: Background Photo */}
                    <div
                      onClick={() => setActiveTab('background')}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 flex items-center gap-1.5">
                          <span>Hero Background Photo</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Choose from 5 curated Himalayan mountain photos or upload your company's own picture.
                        </p>
                      </div>
                    </div>

                    {/* Card 3: Popups */}
                    <div
                      onClick={() => setActiveTab('popup')}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 flex items-center gap-1.5">
                          <span>Promotions &amp; Popups</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Create an instant booking popup with discounts or upload an event flyer image.
                        </p>
                      </div>
                    </div>

                    {/* Card 4: Company Profile */}
                    <div
                      onClick={() => setActiveTab('company')}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 flex items-center gap-1.5">
                          <span>Company Info &amp; Licenses</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Update phone numbers, WhatsApp, official email, and government tourism license numbers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* =================================================================== */}
            {/* 2. MENUS MANAGEMENT (Intuitive, Visual, Friendly)                    */}
            {/* =================================================================== */}
            {activeTab === 'menus' && (
              <div className="space-y-6 max-w-4xl">
                
                {/* Live Header Preview */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-amber-500" />
                        <span>Live Header Preview (What Visitors See)</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Changes you make to menu order or names below show up here immediately.
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                      {siteConfig.menus.filter((m) => m.visible).length} Menus Visible
                    </span>
                  </div>

                  {/* Simulated Navbar Bar */}
                  <div className="bg-[#0c2a50] rounded-2xl p-3.5 sm:p-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-100">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span>FLYWARD NEPAL</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {siteConfig.menus.filter((m) => m.visible).length === 0 ? (
                        <span className="text-xs text-amber-300 italic py-1">
                          No menus are currently visible. Turn on the "Visible" switch for at least one item below.
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

                {/* List Header & Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Navigation Menu Items
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Use the arrows to reorder, or click Edit to change the title or destination page.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newId = `menu-custom-${Date.now()}`;
                        const newMenu: MenuItemConfig = {
                          id: newId,
                          key: `custom_${Date.now()}`,
                          labelEn: 'New Experience',
                          sublabel: 'Curated Adventure',
                          icon: 'Compass',
                          badge: 'NEW',
                          visible: true,
                          targetSectionId: 'aviation',
                          order: siteConfig.menus.length + 1,
                        };
                        setEditingMenu(newMenu);
                        setIsAddingNewMenu(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Menu</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to restore the default 5 navigation menus?')) {
                          resetToDefault();
                          triggerToast();
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* Cards List */}
                <div className="space-y-3">
                  {siteConfig.menus
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((menu, idx, arr) => (
                      <div
                        key={menu.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          menu.visible
                            ? 'bg-white border-slate-200/90 shadow-xs hover:border-amber-400'
                            : 'bg-slate-100/70 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          
                          {/* Left: Sequence + Icon + Title */}
                          <div className="flex items-center gap-3">
                            {/* Sequence number & Up/Down buttons */}
                            <div className="flex items-center gap-1">
                              <span className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
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
                                  className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-20 disabled:pointer-events-none text-slate-600 transition-colors cursor-pointer"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
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
                                  className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-20 disabled:pointer-events-none text-slate-600 transition-colors cursor-pointer"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Icon Box */}
                            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                              {renderIconByName(menu.icon)}
                            </div>

                            {/* Text Titles */}
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-slate-900">
                                  {menu.labelEn}
                                </span>
                                {menu.sublabel && (
                                  <span className="text-xs text-slate-500 font-normal">
                                    · {menu.sublabel}
                                  </span>
                                )}
                                {menu.badge && (
                                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                                    {menu.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                Destination: <span className="text-blue-700 font-medium">#{menu.targetSectionId}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Visibility Toggle & Edit */}
                          <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-between md:justify-end">
                            
                            {/* Toggle Button */}
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
                              title={menu.visible ? 'Hide this menu' : 'Show this menu'}
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

                            {/* Edit Button */}
                            <button
                              onClick={() => {
                                setEditingMenu({ ...menu });
                                setIsAddingNewMenu(false);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                              <span>Edit</span>
                            </button>

                            {/* Delete Button */}
                            {siteConfig.menus.length > 1 && (
                              <button
                                onClick={() => {
                                  if (confirm(`Delete '${menu.labelEn}'?`)) {
                                    updateConfig((prev) => ({
                                      ...prev,
                                      menus: prev.menus.filter((m) => m.id !== menu.id),
                                    }));
                                    triggerToast();
                                  }
                                }}
                                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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

                {/* Edit / Add Modal */}
                {editingMenu && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
                    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-slate-200 space-y-5 text-slate-900">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Edit3 className="w-4 h-4 text-amber-500" />
                            <span>{isAddingNewMenu ? 'Add New Menu Item' : 'Edit Menu Item'}</span>
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Set what visitors see on the top navigation bar and where it takes them.
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
                        {/* Title */}
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Menu Title (English) <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={editingMenu.labelEn}
                            onChange={(e) => setEditingMenu({ ...editingMenu, labelEn: e.target.value })}
                            placeholder="e.g. Mountain Flights, Luxury Hotels"
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-medium outline-none"
                          />
                        </div>

                        {/* Subtitle */}
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Short Description / Subtitle (Optional)
                          </label>
                          <input
                            type="text"
                            value={editingMenu.sublabel || ''}
                            onChange={(e) => setEditingMenu({ ...editingMenu, sublabel: e.target.value })}
                            placeholder="e.g. Everest Window Guaranteed"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-sm outline-none"
                          />
                        </div>

                        {/* Badge */}
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Highlight Tag (Optional)
                          </label>
                          <input
                            type="text"
                            value={editingMenu.badge || ''}
                            onChange={(e) => setEditingMenu({ ...editingMenu, badge: e.target.value.toUpperCase() })}
                            placeholder="e.g. HOT, NEW, POPULAR, DEAL"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-sm font-mono outline-none"
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
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 text-sm bg-white outline-none cursor-pointer"
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
                            Select Icon
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

                        {/* Visibility */}
                        <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingMenu.visible}
                            onChange={(e) => setEditingMenu({ ...editingMenu, visible: e.target.checked })}
                            className="w-4 h-4 rounded text-amber-500"
                          />
                          <span className="text-xs font-bold text-slate-800">
                            Show this item on the website top navigation bar
                          </span>
                        </label>
                      </div>

                      {/* Modal Buttons */}
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
                              alert('Please enter a Menu Title.');
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

            {/* =================================================================== */}
            {/* 3. HERO BACKGROUND PHOTO (Simple, Visual, 1-Click)                  */}
            {/* =================================================================== */}
            {activeTab === 'background' && (
              <div className="space-y-6 max-w-4xl">
                
                {/* Fixed Scroll Toggle */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Keep Background Fixed While Scrolling
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      When turned on, the mountain photograph stays anchored in place while visitors scroll down the page.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
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

                {/* Preset Himalayan Photos Gallery */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Pick a Photo from the Himalayan Gallery:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
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
                          <div className="p-3 bg-white">
                            <div className="text-xs font-bold text-slate-900 truncate">{preset.title}</div>
                            <div className="text-[10px] text-slate-500 truncate mt-0.5">{preset.subtitle}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Upload Custom Image */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Or Upload Your Own Company Photo
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File upload */}
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl cursor-pointer bg-slate-50 hover:bg-amber-50/20 transition-all text-center">
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-bold text-slate-800">Choose photo file from your device</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">Supports high-res JPG, PNG, WebP</span>
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

                    {/* URL Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Or paste a web photo link (URL)
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

                {/* Lighting and Atmosphere */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Photo Mood &amp; Lighting Fine-Tuning
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    {/* Opacity */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>Photo Visibility (Opacity)</span>
                        <span className="font-mono text-amber-700">{siteConfig.background.opacity}%</span>
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
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>Brightness</span>
                        <span className="font-mono text-amber-700">{siteConfig.background.brightness}%</span>
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
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>Softness / Blur Filter</span>
                        <span className="font-mono text-amber-700">{siteConfig.background.blur}px</span>
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

                  {/* Atmosphere Filter */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-700 mb-2">Color Tone Atmosphere:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { key: 'clear', label: 'Crystal Clear (Natural)' },
                        { key: 'light', label: 'Bright Mountain Daylight' },
                        { key: 'dark', label: 'Evening Blue (High Contrast)' },
                        { key: 'golden', label: 'Warm Sunset Amber' },
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

            {/* =================================================================== */}
            {/* 4. POPUPS & PROMOTIONS (Master Switch, 2 Easy Styles)               */}
            {/* =================================================================== */}
            {activeTab === 'popup' && (
              <div className="space-y-6 max-w-4xl">
                
                {/* Master Switch Card */}
                <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        Show Promotional Popup on Website
                      </h3>
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                          siteConfig.popup.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {siteConfig.popup.isActive ? 'Currently Active (ON)' : 'Currently Turned Off'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Turn this on when you want visitors to see a promotional booking modal when they visit your site.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setPreviewPopupOpen(true);
                        setIsAdminOpen(false);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Preview Popup on Screen</span>
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

                {/* Choose Style */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Popup Style:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Style 1: Text Template */}
                    <div
                      onClick={() => {
                        updateConfig((prev) => ({
                          ...prev,
                          popup: { ...prev.popup, type: 'template' },
                        }));
                        triggerToast();
                      }}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
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
                            Style 1: Easy Text Template
                          </span>
                        </div>
                        {siteConfig.popup.type === 'template' && (
                          <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        No designer needed! Just type your offer title, flight dates, and discount details—it formats into a luxury popup automatically.
                      </p>
                    </div>

                    {/* Style 2: Upload Flyer */}
                    <div
                      onClick={() => {
                        updateConfig((prev) => ({
                          ...prev,
                          popup: { ...prev.popup, type: 'image' },
                        }));
                        triggerToast();
                      }}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
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
                            Style 2: Upload Poster / Banner Flyer
                          </span>
                        </div>
                        {siteConfig.popup.type === 'image' && (
                          <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Attach a custom graphic poster, event flyer, or promotional banner image to display as the popup.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form for Style 1 */}
                {siteConfig.popup.type === 'template' && (
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Template Offer Details</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Top Tag / Badge
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
                          Main Headline Title
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
                          Offer Dates / Season
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
                          Flight / Departure Time
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
                          placeholder="e.g. Daily Departures 06:30 / 07:15 TIA"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Featured Tour Package Name
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
                          Discount / Savings Highlight
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
                          Description &amp; Terms
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
                          placeholder="Enter details, inclusions, and reservation instructions..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 leading-relaxed focus:border-amber-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Button Text
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
                          Where does the button take visitors?
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

                {/* Form for Style 2 */}
                {siteConfig.popup.type === 'image' && (
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-500" />
                      <span>Poster Graphic Upload</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Image Upload */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1.5">
                          Upload Promotional Poster Image
                        </label>
                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl cursor-pointer bg-slate-50 hover:bg-amber-50/20 transition-all text-center">
                          <Upload className="w-8 h-8 text-slate-400 mb-1" />
                          <span className="text-xs font-bold text-slate-800">Attach Poster Image File</span>
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
                            Or Enter Direct Image Web Link (URL)
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

                        {/* Thumbnail */}
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Current Poster Preview:
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
                        Where should clicking the poster take visitors? (#aviation, #odysseys, or link)
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
                        placeholder="e.g. #aviation"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 24-hour dismissal option */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                    <span>Provide "Do not show again today" checkbox (Remembers dismissal for 24 hours)</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      resetDailyDismissal();
                      alert('24-hour dismissal memory cleared. You can now refresh the page to test the popup.');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer self-start sm:self-auto"
                  >
                    [Test Tool] Reset 24-Hour Memory
                  </button>
                </div>

              </div>
            )}

            {/* =================================================================== */}
            {/* 5. COMPANY INFO & TOP LIVE TICKER                                   */}
            {/* =================================================================== */}
            {activeTab === 'company' && (
              <div className="space-y-6 max-w-4xl">
                
                {/* Announcement Ticker */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Top Live Announcement Bar
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Displays an announcement ticker at the very top of your website.
                      </p>
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
                      <span>Show Announcement Bar</span>
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
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-amber-500 outline-none"
                    placeholder="Enter announcement text to scroll at the top of the site..."
                  />
                </div>

                {/* Company Details */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                    Official Agency Details &amp; Contact Info
                  </h3>

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
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Company Tagline / Motto</label>
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
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Primary Phone Number</label>
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
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">24/7 WhatsApp Hotline</label>
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
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Nepal Government Registration No. (Reg No.)</label>
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

            {/* =================================================================== */}
            {/* 6. SECURITY & DATA BACKUP                                           */}
            {/* =================================================================== */}
            {activeTab === 'security' && (
              <div className="space-y-6 max-w-4xl">
                
                {/* Change PIN */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-500" />
                    <span>Change Administrator Password</span>
                  </h3>

                  <div className="max-w-md space-y-3 text-xs">
                    <div className="text-slate-600">
                      Current Password: <strong className="font-mono text-amber-700">{siteConfig.adminPin || 'admin1234'}</strong>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Enter New Password
                      </label>
                      <input
                        type="password"
                        value={newPin}
                        onChange={(e) => {
                          setNewPin(e.target.value);
                          setPinChangeSuccess(false);
                        }}
                        placeholder="Type new password..."
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
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span>Website Configuration Backup &amp; Restore</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Export */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-900">Download Backup File (.json)</div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Save all your current menus, background settings, popups, and official details to a safe file on your device.
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
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-900">Restore from Backup File (.json)</div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Upload a previously saved backup file to immediately restore your website settings.
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
                      <div className="text-xs font-bold text-rose-700">Reset to Factory Defaults</div>
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

          {/* Bottom Action Footer */}
          <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All updates save automatically to your live website.</span>
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
    </div>
  );
};
