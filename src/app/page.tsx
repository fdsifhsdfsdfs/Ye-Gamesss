
import { Button } from '@/components/ui/button';
import { ArrowRight, Gamepad2, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const FloatingIcon = ({ icon: Icon, className }: { icon: React.ElementType, className?: string }) => (
  <div className={`absolute w-16 h-16 bg-card rounded-2xl flex items-center justify-center shadow-lg animate-float ${className}`}>
    <Icon className="h-8 w-8 text-primary" />
  </div>
);

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-10rem)] flex items-center justify-center overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Welcome to <span className="text-primary">Some Stuff</span>
            </h1>
            <p className="max-w-md mx-auto md:mx-0 text-lg text-muted-foreground">
              Your ultimate destination for gmes, web prxies, and virtual machines
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
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
          </div>
          <div className="relative h-64 md:h-96 hidden md:block">
            <FloatingIcon icon={Gamepad2} className="top-0 left-1/4" />
            <FloatingIcon icon={ShieldCheck} className="top-1/3 left-0 animate-float-delay-1" />
            <FloatingIcon icon={Globe} className="top-2/3 left-1/3 animate-float-delay-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
