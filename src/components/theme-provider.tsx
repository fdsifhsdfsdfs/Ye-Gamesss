'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

type CustomThemeContextType = {
  crtEffect: boolean;
  setCrtEffect: (enabled: boolean) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  hexColor: string;
};

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [crtEffect, setCrtEffectState] = useState(true);
  const [accentColor, setAccentColorState] = useState('263 100% 66%');
  const [hexColor, setHexColor] = useState('#4f00ff');
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
      const [h, s, l] = storedColor.split(' ').map(val => parseInt(val.replace('%', '')));
      if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
        setHexColor(hslToHex(h, s, l));
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('crtEffect', JSON.stringify(crtEffect));
      const appContainer = document.getElementById('app-container');
      if (appContainer) {
        if (crtEffect) {
          appContainer.classList.add('crt-effect');
        } else {
          appContainer.classList.remove('crt-effect');
        }
      }
    }
  }, [crtEffect, isMounted]);
  
  useEffect(() => {
    if (isMounted) {
      document.documentElement.style.setProperty('--primary', accentColor);
      document.documentElement.style.setProperty('--accent', accentColor);
      document.documentElement.style.setProperty('--ring', accentColor);
      localStorage.setItem('accentColor', accentColor);
      
      const [h, s, l] = accentColor.split(' ').map(val => parseInt(val.replace('%', '')));
      if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
        setHexColor(hslToHex(h, s, l));
      }
    }
  }, [accentColor, isMounted]);

  const setCrtEffect = (enabled: boolean) => {
    setCrtEffectState(enabled);
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
  };

  return (
    <CustomThemeContext.Provider value={{ crtEffect, setCrtEffect, accentColor, setAccentColor, hexColor }}>
      {children}
    </CustomThemeContext.Provider>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <CustomThemeProvider>{children}</CustomThemeProvider>
    </NextThemesProvider>
  );
}

export function useTheme() {
  const nextThemeContext = useNextTheme();
  const customThemeContext = useContext(CustomThemeContext);

  if (customThemeContext === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return { ...nextThemeContext, ...customThemeContext };
}
