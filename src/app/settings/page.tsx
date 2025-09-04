'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';

const colors = [
  { name: 'Default', hsl: '263 100% 66%' },
  { name: 'Red', hsl: '0 100% 50%' },
  { name: 'Green', hsl: '120 100% 25%' },
  { name: 'Blue', hsl: '240 100% 50%' },
  { name: 'Yellow', hsl: '60 100% 50%' },
];

export default function SettingsPage() {
  const { crtEffect, setCrtEffect, accentColor, setAccentColor } = useTheme();

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
          <div className="space-y-2">
            <Label>Accent Color</Label>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setAccentColor(color.hsl)}
                  className={`w-8 h-8 rounded-full border-2 ${accentColor === color.hsl ? 'border-foreground' : 'border-transparent'}`}
                  style={{ backgroundColor: `hsl(${color.hsl})` }}
                  aria-label={`Set accent color to ${color.name}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
