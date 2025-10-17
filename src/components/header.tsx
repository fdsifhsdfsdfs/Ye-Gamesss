
'use client';

import Link from 'next/link';
import { Home, Gamepad2, Tv, AppWindow, Music, Settings, Globe, ShieldCheck, MoreHorizontal, Brain } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';

const navItems = [
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/apps', label: 'Apps', icon: AppWindow },
  { href: '/tv', label: 'TV/Movies', icon: Tv },
  { href: '/youtube', label: 'Youtube', icon: Globe },
];

const moreItems = [
  { href: '/music', label: 'Music', icon: Music },
  { href: '/livetv', label: 'Live TV', icon: Tv },
  { href: '/ai', label: 'AI', icon: Brain },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Header() {
  const pathname = usePathname();

  const isProxysVisible = pathname.includes('/proxys');
  const isPlayPage = pathname.startsWith('/play');

  if (isPlayPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div>
              <h1 className="text-xl font-bold font-headline bg-gradient-to-r from-primary via-primary to-primary/70 text-transparent bg-clip-text">
                Ye Games
              </h1>
              <p className="text-xs text-muted-foreground">educational lessons by BxltRust</p>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center justify-between gap-4 text-base">
          <Button variant={pathname === '/' ? 'secondary' : 'ghost'} size="lg" asChild className="px-4">
            <Link href="/">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </Button>
          {navItems.map((item) => (
            <Button key={item.href} variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'} size="lg" asChild className="px-4">
              <Link href={item.href}>
                {item.icon && <item.icon className="h-5 w-5" />}
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
          {isProxysVisible && (
            <Button variant={pathname.startsWith('/proxys') ? 'secondary' : 'ghost'} size="lg" asChild className="px-4">
              <Link href="/proxys?show=all">
                <ShieldCheck className="h-5 w-5" />
                <span>Proxys</span>
              </Link>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="lg" className="px-4">
                <MoreHorizontal className="h-5 w-5" />
                <span>More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {moreItems.map(item => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2">
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          {/* Future items can go here */}
        </div>
      </div>
    </header>
  );
}
