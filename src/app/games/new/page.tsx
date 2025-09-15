'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useEffect } from 'react';

export default function NewGamesPage() {
  const { crtEffect } = useTheme();

  useEffect(() => {
    const originalCrtState = crtEffect && document.body.classList.contains('crt-effect');
    if (originalCrtState) {
      document.body.classList.remove('crt-effect');
    }

    return () => {
      if (originalCrtState) {
        document.body.classList.add('crt-effect');
      }
    };
  }, [crtEffect]);

  return (
    <div className="fixed inset-0 top-14">
      <iframe
        src="https://god.churchandglobalaids.org/g"
        className="w-full h-full border-0"
        title="New Games"
        allow="fullscreen"
      />
      <Button asChild className="absolute top-4 left-4 z-10">
        <Link href="/games">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Old Games
        </Link>
      </Button>
    </div>
  );
}
