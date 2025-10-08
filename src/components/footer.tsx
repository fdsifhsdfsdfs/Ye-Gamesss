
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const isEmbedPage = pathname === '/tv' || pathname === '/youtube';

  if (isEmbedPage) {
    return null;
  }

  return (
    <footer className="w-full bg-transparent">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-6 text-xs text-muted-foreground">
        <Button variant="ghost" size="sm" asChild>
            <Link href="/terms">Privacy Policy</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/conduct">DMCA</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/#">Credits</Link>
        </Button>
      </div>
    </footer>
  );
}
