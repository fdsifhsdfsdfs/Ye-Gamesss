
'use client';

import { useState, useMemo } from 'react';
import { AppCard } from '@/components/app-card';
import { Input } from '@/components/ui/input';
import { apps } from '@/lib/apps-data';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AppsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    apps.forEach(app => app.tags.forEach(tag => tags.add(tag)));
    return ['all', ...Array.from(tags).sort()];
  }, []);

  const filteredApps = useMemo(() => {
    return apps
      .filter(app => 
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(app => 
        selectedTag === 'all' || app.tags.includes(selectedTag)
      );
  }, [searchTerm, selectedTag]);

  const appCardHints: { [key:string]: string } = {
    '1': 'discord logo',
    '2': 'youtube logo',
    '3': 'spotify logo',
    '4': 'photopea logo',
    '5': 'google logo',
    '6': 'instagram logo',
    '7': 'reddit logo',
    '8': 'twitter logo',
    '9': 'twitch logo',
    '10': 'soundcloud logo'
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-4xl font-bold tracking-tighter mb-2">App Library</h1>
        <p className="text-muted-foreground">Search and filter through our entire collection of apps.</p>
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search apps by title or description..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredApps.map(app => (
            <AppCard key={app.id} app={app} dataAiHint={appCardHints[app.id]} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Apps Found</h3>
          <p className="text-muted-foreground mt-2">Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}
