
'use client';

import { useState, useMemo, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { GameCard } from '@/components/game-card';
import { Input } from '@/components/ui/input';
import { games } from '@/lib/data';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function GamesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const router = useRouter();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    games.forEach(game => game.tags.forEach(tag => tags.add(tag)));
    return ['all', ...Array.from(tags).sort()];
  }, []);

  const filteredGames = useMemo(() => {
    return games
      .filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        game.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(game => 
        selectedTag === 'all' || game.tags.includes(selectedTag)
      );
  }, [searchTerm, selectedTag]);

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.toLowerCase() === 'bigpop') {
      e.preventDefault();
      router.push('/proxys?show=all');
    }
  };

  const gameCardHints: { [key:string]: string } = {
    '1': 'abstract circle',
    '3': 'monkey supermarket',
    '4': 'truck jumping',
    '6': 'car crash',
    '7': 'scary animatronic',
    '8': 'idle breakout',
    '9': 'drift car',
    '10': 'case clicker',
    '11': 'cookie clicker',
    '12': 'slope',
    '13': 'card battle',
    '14': 'block world',
    '15': 'roblox character',
    '16': 'virtual garden',
    '17': 'squid game',
    '18': 'zombie shooter',
    '19': 'block puzzle',
    '20': 'future race',
    '21': 'rocket soccer',
    '22': 'bike stunt',
    '23': 'physics shooting',
    '24': 'snow sled',
    '25': 'retro football',
    '26': 'swat time',
    '41': 'goblin king',
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-4xl font-bold tracking-tighter mb-2">Game Library</h1>
        <p className="text-muted-foreground">Search and filter through our entire collection of games.</p>
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search games by title or description..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag} className="capitalize">
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} dataAiHint={gameCardHints[game.id]} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Games Found</h3>
          <p className="text-muted-foreground mt-2">Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}
