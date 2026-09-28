import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig } from '../types/admin';
import { DEFAULT_SITE_CONFIG } from '../data/defaultConfig';

interface SiteConfigContextValue {
  siteConfig: SiteConfig;
  updateConfig: (updater: (prev: SiteConfig) => SiteConfig) => void;
  resetToDefault: () => void;
  exportConfigJson: () => void;
  importConfigJson: (jsonStr: string) => boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  previewPopupOpen: boolean;
  setPreviewPopupOpen: (open: boolean) => void;
  resetDailyDismissal: () => void;
}

const STORAGE_KEY = 'nepal_travel_site_config_v3';
const AUTH_KEY = 'nepal_travel_admin_auth';
const POPUP_DISMISS_KEY = 'nepal_travel_popup_dismissed_date';

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with DEFAULT_SITE_CONFIG to guarantee all properties exist
        return {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          background: { ...DEFAULT_SITE_CONFIG.background, ...parsed.background },
          popup: {
            ...DEFAULT_SITE_CONFIG.popup,
            ...parsed.popup,
            template: { ...DEFAULT_SITE_CONFIG.popup.template, ...parsed?.popup?.template },
            imagePopup: { ...DEFAULT_SITE_CONFIG.popup.imagePopup, ...parsed?.popup?.imagePopup },
          },
          company: { ...DEFAULT_SITE_CONFIG.company, ...parsed.company },
        };
      }
    } catch (err) {
      console.error('Failed to load site config from storage', err);
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [previewPopupOpen, setPreviewPopupOpen] = useState(false);

  // Sync to localStorage whenever siteConfig updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteConfig));
    } catch (err) {
      console.error('Failed to save site config to storage', err);
    }
  }, [siteConfig]);

  const updateConfig = (updater: (prev: SiteConfig) => SiteConfig) => {
    setSiteConfig((prev) => updater(prev));
  };

  const resetToDefault = () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error(err);
    }
  };

  const exportConfigJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nepal_travel_site_config_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfigJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        const merged: SiteConfig = {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          background: { ...DEFAULT_SITE_CONFIG.background, ...parsed.background },
          popup: {
            ...DEFAULT_SITE_CONFIG.popup,
            ...parsed.popup,
            template: { ...DEFAULT_SITE_CONFIG.popup.template, ...parsed?.popup?.template },
            imagePopup: { ...DEFAULT_SITE_CONFIG.popup.imagePopup, ...parsed?.popup?.imagePopup },
          },
          company: { ...DEFAULT_SITE_CONFIG.company, ...parsed.company },
        };
        setSiteConfig(merged);
        return true;
      }
    } catch (err) {
      console.error('Invalid JSON imported', err);
    }
    return false;
  };

  const loginAdmin = (pin: string): boolean => {
    if (pin.trim() === (siteConfig.adminPin || 'admin1234')) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const resetDailyDismissal = () => {
    localStorage.removeItem(POPUP_DISMISS_KEY);
  };

  return (
    <SiteConfigContext.Provider
      value={{
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
        previewPopupOpen,
        setPreviewPopupOpen,
        resetDailyDismissal,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
