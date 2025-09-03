import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex gap-4">
          <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          <Link href="/conduct" className="hover:text-foreground">Code of Conduct</Link>
        </div>
        <div>
          <span>™ Ye Games 2025</span>
        </div>
      </div>
    </footer>
  );
}
