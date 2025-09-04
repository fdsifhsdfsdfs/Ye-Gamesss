"use client";

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Monitor } from 'lucide-react';

export function CrtEffect() {
  const [isCrtEnabled, setIsCrtEnabled] = useState(false);

  useEffect(() => {
    const appContainer = document.getElementById('app-container');
    if (appContainer) {
      if (isCrtEnabled) {
        appContainer.classList.add('crt-effect');
      } else {
        appContainer.classList.remove('crt-effect');
      }
    }
  }, [isCrtEnabled]);

  return (
    <div className="flex items-center space-x-2 my-8 p-4 border rounded-lg justify-center bg-card">
        <Monitor className="w-5 h-5 text-primary" />
        <Label htmlFor="crt-switch" className="font-headline">Enable Retro CRT Effect</Label>
        <Switch
            id="crt-switch"
            checked={isCrtEnabled}
            onCheckedChange={setIsCrtEnabled}
        />
    </div>
  );
}
