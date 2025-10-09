
'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProxyCard } from '@/components/proxy-card';
import { Input } from '@/components/ui/input';
import { proxys } from '@/lib/proxys-data';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function ProxysContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const searchParams = useSearchParams();
  const showAll = searchParams.get('show') === 'all';

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    proxys.forEach(proxy => proxy.tags.forEach(tag => tags.add(tag)));
    return ['all', ...Array.from(tags).sort()];
  }, []);
  
  const availableProxys = useMemo(() => {
    if (showAll) {
      return proxys;
    }
    const half = Math.ceil(proxys.length / 2);
    return proxys.slice(0, half);
  }, [showAll]);

  const filteredProxys = useMemo(() => {
    return availableProxys
      .filter(proxy => 
        proxy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        proxy.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(proxy => 
        selectedTag === 'all' || proxy.tags.includes(selectedTag)
      );
  }, [searchTerm, selectedTag, availableProxys]);

  const proxyCardHints: { [key:string]: string } = {
    '1': 'dark web',
    '2': 'frog character',
    '3': 'pizza box',
    '4': 'ajh vault',
    '5': 'truffle chocolate',
    '6': 'university logo',
    '7': 'doge meme',
    '8': 'ocean wave',
    '9': 'utopia city',
    '10': 'emerald gem'
  };

  if (!showAll) {
    return (
      <div className="text-center py-16">
        <h1 className="font-headline text-4xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-4">You do not have permission to view this page.</p>
      </div>
    )
  }

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

export default function ProxysPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProxysContent />
    </Suspense>
  );
}
