
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';

const hexToHsl = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return '0 0% 0%';
  }
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `${h} ${s}% ${l}%`;
};

const hslStringToHex = (hsl: string): string => {
    const [h, s, l] = hsl.split(' ').map((val, i) => {
        if (i === 0) return parseInt(val);
        return parseInt(val.replace('%', ''));
    });

    const sNormalized = s / 100;
    const lNormalized = l / 100;

    const c = (1 - Math.abs(2 * lNormalized - 1)) * sNormalized;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lNormalized - c / 2;
    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
        r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x;
    }

    const toHex = (c: number) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r + m)}${toHex(g + m)}${toHex(b + m)}`;
};

export default function SettingsPage() {
  const { crtEffect, setCrtEffect, accentColor, setAccentColor } = useTheme();
  const [hexColor, setHexColor] = useState(() => hslStringToHex(accentColor));
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (newColor: string) => {
    setHexColor(newColor);
    const newHsl = hexToHsl(newColor);
    setAccentColor(newHsl);
  };
  
  const handleOpenInBlank = () => {
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html style="height:100%;margin:0;padding:0;">
          <head>
            <title>Ye-Games</title>
            <style>
              body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                overflow: hidden;
              }
              iframe {
                border: none;
                width: 100%;
                height: 100%;
              }
            </style>
          </head>
          <body>
            <iframe src="${window.location.href}"></iframe>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-4xl font-bold tracking-tighter mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your experience.</p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="crt-mode">CRT Effect</Label>
            <Switch
              id="crt-mode"
              checked={crtEffect}
              onCheckedChange={setCrtEffect}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Accent Color</Label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: hexColor }} />
                  <span className="font-mono text-sm">{hexColor}</span>
                </div>
              </div>
              <Button variant="outline" onClick={() => setShowColorPicker(!showColorPicker)}>
                {showColorPicker ? 'Close' : 'Change'}
              </Button>
            </div>
            {showColorPicker && (
              <div className="flex flex-col items-center gap-4 pt-4 border-t">
                <HexColorPicker color={hexColor} onChange={handleColorChange} className="w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Open the current page in a sandboxed about:blank tab.</p>
            <Button variant="outline" onClick={handleOpenInBlank}>
              Open in About:Blank
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
