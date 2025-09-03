import { GameCard } from '@/components/game-card';
import { Button } from '@/components/ui/button';
import { games } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredGames = games.filter(g => g.featured).slice(0, 3);
  const recentGames = [...games].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 4);

  const gameCardHints: { [key: string]: string } = {
    '1': 'abstract circle',
    '2': 'survival game',
    '3': 'monkey supermarket',
    '4': 'truck jumping',
    '5': 'block world',
    '6': 'car crash',
    '7': 'scary animatronic',
    '8': 'idle breakout',
    '9': 'drift car',
    '10': 'case clicker',
  };

  return (
    <div className="space-y-16">
      <section className="relative text-center py-20 overflow-hidden rounded-lg">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-0 left-0 -z-10 h-2/3 w-full bg-gradient-to-b from-primary/10 to-transparent"></div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-fade-in-up">
          Ye Games
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 animate-fade-in-up [animation-delay:0.2s]">
          Discover, play, and manage your next favorite game. Ye-Games is your portal to worlds of adventure.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up [animation-delay:0.4s]">
          <Button asChild size="lg">
            <Link href="/games">Browse Games <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map(game => (
            <GameCard key={game.id} game={game} dataAiHint={gameCardHints[game.id]} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">Recently Added</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentGames.map(game => (
            <GameCard key={game.id} game={game} dataAiHint={gameCardHints[game.id]} />
          ))}
        </div>
      </section>
    </div>
  );
}
