'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeContextType = {
  crtEffect: boolean;
  setCrtEffect: (enabled: boolean) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [crtEffect, setCrtEffectState] = useState(true);
  const [accentColor, setAccentColorState] = useState('263 100% 66%');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedCrt = localStorage.getItem('crtEffect');
    if (storedCrt !== null) {
      setCrtEffectState(JSON.parse(storedCrt));
    }
    const storedColor = localStorage.getItem('accentColor');
    if (storedColor) {
      setAccentColorState(storedColor);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.body.classList.toggle('crt-effect', crtEffect);
      localStorage.setItem('crtEffect', JSON.stringify(crtEffect));
    }
  }, [crtEffect, isMounted]);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.style.setProperty('--primary', accentColor);
      document.documentElement.style.setProperty('--accent', accentColor);
      document.documentElement.style.setProperty('--ring', accentColor);
      localStorage.setItem('accentColor', accentColor);
    }
  }, [accentColor, isMounted]);


  const setCrtEffect = (enabled: boolean) => {
    setCrtEffectState(enabled);
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ crtEffect, setCrtEffect, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
