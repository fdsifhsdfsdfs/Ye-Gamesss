
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

type ThemeContextType = {
  crtEffect: boolean;
  setCrtEffect: (enabled: boolean) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  hexColor: string; 
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [crtEffect, setCrtEffectState] = useState(true);
  const [accentColor, setAccentColorState] = useState('263 100% 66%');
  const [hexColor, setHexColor] = useState('#4f00ff');

  useEffect(() => {
    const storedCrt = localStorage.getItem('crtEffect');
    if (storedCrt !== null) {
      setCrtEffectState(JSON.parse(storedCrt));
    }
    const storedColor = localStorage.getItem('accentColor');
    if (storedColor) {
      setAccentColorState(storedColor);
      const [h, s, l] = storedColor.split(' ').map(val => parseInt(val.replace('%', '')));
      setHexColor(hslToHex(h, s, l));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('crtEffect', JSON.stringify(crtEffect));
  }, [crtEffect]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', accentColor);
    document.documentElement.style.setProperty('--accent', accentColor);
    document.documentElement.style.setProperty('--ring', accentColor);
    localStorage.setItem('accentColor', accentColor);
    
    const [h, s, l] = accentColor.split(' ').map(val => parseInt(val.replace('%', '')));
    setHexColor(hslToHex(h, s, l));

  }, [accentColor]);


  const setCrtEffect = (enabled: boolean) => {
    setCrtEffectState(enabled);
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
  };

  return (
    <ThemeContext.Provider value={{ crtEffect, setCrtEffect, accentColor, setAccentColor, hexColor }}>
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
