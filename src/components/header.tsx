
'use client';

import Link from 'next/link';
import { Home, Gamepad2, Tv, AppWindow, Brain, Settings, Globe } from 'lucide-react';
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
  { href: '/ai', label: 'AI', icon: Brain },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Header() {
  const pathname = usePathname();

  const isProxysVisible = pathname.includes('/proxys');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            {/* Placeholder for new logo */}
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
              S
            </div>
            <div>
              <h1 className="font-bold font-headline text-lg text-white">Some Stuff</h1>
              <p className="text-xs text-muted-foreground">Educational Lessons by eg hhs</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={pathname === '/' ? 'secondary' : 'ghost'} size="sm" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
        </div>
        
        <nav className="hidden md:flex items-center gap-2 text-sm ml-4">
          {navItems.map((item) => (
            <Button key={item.href} variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'} size="sm" asChild>
              <Link href={item.href}>
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
          {isProxysVisible && (
            <Button variant={pathname.startsWith('/proxys') ? 'secondary' : 'ghost'} size="sm" asChild>
              <Link href="/proxys?show=all">
                <ShieldCheck className="h-4 w-4" />
                <span>Proxys</span>
              </Link>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                More
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
