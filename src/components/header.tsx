'use client';

import Link from 'next/link';
import { Home, Server, Brain, Gamepad2, Settings, Laptop } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/proxys', label: 'Pr*xys', icon: Server },
  { href: '/vm', label: 'VM', icon: Laptop },
  { href: '/ai', label: 'AI', icon: Brain },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Image src="https://iili.io/KBlX1Wl.png" alt="Ye-Games Logo" width={28} height={28} />
          <span className="font-bold font-headline text-lg">Ye-Games</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6 flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === item.href ? 'text-foreground font-semibold' : 'text-foreground/60'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/settings"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === '/settings' ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
