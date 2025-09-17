'use client';

import { useState, useMemo } from 'react';
import { ProxyCard } from '@/components/proxy-card';
import { Input } from '@/components/ui/input';
import { proxys } from '@/lib/proxys-data';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProxysPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    proxys.forEach(proxy => proxy.tags.forEach(tag => tags.add(tag)));
    return ['all', ...Array.from(tags).sort()];
  }, []);

  const filteredProxys = useMemo(() => {
    return proxys
      .filter(proxy => 
        proxy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        proxy.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(proxy => 
        selectedTag === 'all' || proxy.tags.includes(selectedTag)
      );
  }, [searchTerm, selectedTag]);

  const proxyCardHints: { [key:string]: string } = {
    '1': 'space nebula',
    '2': 'anonymous browsing',
    '3': 'rammerhead logo',
    '4': 'privacy shield',
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-4xl font-bold tracking-tighter mb-2">Pr*xy Library</h1>
        <p className="text-muted-foreground">Search and filter through our entire collection of pr*xys.</p>
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search pr*xys by title or description..."
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

      {filteredProxys.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProxys.map(proxy => (
            <ProxyCard key={proxy.id} proxy={proxy} dataAiHint={proxyCardHints[proxy.id]} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Pr*xys Found</h3>
          <p className="text-muted-foreground mt-2">Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}
