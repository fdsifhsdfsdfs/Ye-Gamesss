
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const FloatingIcon = ({ icon: Icon, className }: { icon: React.ElementType, className?: string }) => (
  <div className={`absolute w-16 h-16 bg-card rounded-2xl flex items-center justify-center shadow-lg animate-float ${className}`}>
    <Icon className="h-8 w-8 text-primary" />
  </div>
);

const VisitorsConsole = () => {
  const [visitors, setVisitors] = useState(0);
  const [newVisitors, setNewVisitors] = useState(0);
  const [displayedVisitors, setDisplayedVisitors] = useState('');
  const [displayedNewVisitors, setDisplayedNewVisitors] = useState('');

  useEffect(() => {
    // Generate random numbers on client mount
    const total = Math.floor(Math.random() * (2500 - 500 + 1)) + 500;
    const fresh = Math.floor(Math.random() * (total / 2));
    setVisitors(total);
    setNewVisitors(fresh);
  }, []);

  useEffect(() => {
    let index = 0;
    const visitorsText = `> Visitors Today: ${visitors.toLocaleString()}`;
    if (visitors > 0) {
      const interval = setInterval(() => {
        setDisplayedVisitors(visitorsText.substring(0, index + 1));
        index++;
        if (index === visitorsText.length) {
          clearInterval(interval);
          
          // Start typing new visitors after a delay
          setTimeout(() => {
            let newIndex = 0;
            const newVisitorsText = `> New Visitors Today: ${newVisitors.toLocaleString()}`;
            const newInterval = setInterval(() => {
              setDisplayedNewVisitors(newVisitorsText.substring(0, newIndex + 1));
              newIndex++;
              if (newIndex === newVisitorsText.length) {
                clearInterval(newInterval);
              }
            }, 50);
          }, 300);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [visitors, newVisitors]);

  return (
    <div className="mt-6 bg-card/50 border border-border/20 rounded-lg p-4 max-w-md mx-auto font-code text-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-3 w-3 rounded-full bg-red-500"></span>
        <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
        <span className="h-3 w-3 rounded-full bg-green-500"></span>
      </div>
      <div className="h-12">
        <p className="whitespace-pre">
          {displayedVisitors}
          {displayedVisitors.length < `> Visitors Today: ${visitors.toLocaleString()}`.length && <span className="animate-pulse">_</span>}
        </p>
        <p className="whitespace-pre">
          {displayedVisitors.length === `> Visitors Today: ${visitors.toLocaleString()}`.length && displayedNewVisitors.length < `> New Visitors Today: ${newVisitors.toLocaleString()}`.length && <span className="animate-pulse">_</span>}
          {displayedNewVisitors}
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-10rem)] flex items-center justify-center overflow-hidden">
      
      {/* Floating Icons - Background Elements */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <FloatingIcon icon={Gamepad2} className="top-1/4 left-[15%] opacity-50" />
        <FloatingIcon icon={ShieldCheck} className="top-1/2 left-[5%] opacity-50 animate-float-delay-1" />
        <FloatingIcon icon={Globe} className="bottom-1/4 left-[20%] opacity-50 animate-float-delay-2" />
        
        <FloatingIcon icon={Gamepad2} className="top-1/4 right-[15%] opacity-50 animate-float-delay-1" />
        <FloatingIcon icon={ShieldCheck} className="top-1/2 right-[5%] opacity-50 animate-float-delay-2" />
        <FloatingIcon icon={Globe} className="bottom-1/4 right-[20%] opacity-50" />
      </div>

      <div className="container relative z-10 text-center">
        <div className="space-y-6">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Welcome to <span className="text-primary">Ye Games</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-muted-foreground">
            Your ultimate destination for games, web proxies, and virtual machines
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/games">
                <Gamepad2 className="mr-2"/>
                Start Gaming
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/apps">
                <Globe className="mr-2" />
                Browse Web
              </Link>
            </Button>
          </div>
          <VisitorsConsole />
        </div>
      </div>
    </div>
  );
}
