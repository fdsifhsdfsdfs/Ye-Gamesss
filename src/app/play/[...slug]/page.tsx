
'use client';

import { useEffect, useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { games } from '@/lib/data';
import { apps } from '@/lib/apps-data';
import { proxys } from '@/lib/proxys-data';
import type { Game, App, Proxy } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Maximize, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';

type ContentItem = Game | App | Proxy;

export default function PlayPage({ params }: { params: { slug: string[] } }) {
  const [type, id] = params.slug;
  const { theme } = useTheme();
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const item: ContentItem | undefined = useMemo(() => {
    switch (type) {
      case 'game':
        return games.find((g) => g.id === id);
      case 'app':
        return apps.find((a) => a.id === id);
      case 'proxy':
        return proxys.find((p) => p.id === id);
      default:
        return undefined;
    }
  }, [type, id]);

  const getUrl = (item: ContentItem) => {
    if ('gameUrl' in item) return item.gameUrl;
    if ('appUrl' in item) return item.appUrl;
    if ('proxyUrl' in item) return item.proxyUrl;
    return '';
  };

  useEffect(() => {
    if (!item) {
      notFound();
      return;
    }

    const itemUrl = getUrl(item);

    if (!itemUrl.startsWith('http')) {
       // For non-http URLs (like scratch.mit.edu), just use the URL directly
      setIframeSrc(itemUrl);
      setIsLoading(false);
      return;
    }
    
    // Using a simple proxy to bypass CORS issues for fetching content
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(itemUrl)}`;

    setIsLoading(true);
    fetch(proxyUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        setIframeSrc(blobUrl);
      })
      .catch(error => {
        console.error('Failed to fetch and create blob URL, falling back to direct URL:', error);
        // Fallback to the original URL if fetching fails
        setIframeSrc(itemUrl);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
    // Cleanup blob URL on component unmount
    return () => {
      if (iframeSrc && iframeSrc.startsWith('blob:')) {
        URL.revokeObjectURL(iframeSrc);
      }
    };
  }, [item, iframeSrc]); // Added iframeSrc to dependencies to avoid memory leaks

  if (!item) {
    notFound();
    return null;
  }

  const handleFullscreen = () => {
    const itemUrl = getUrl(item);
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      const iframeContent = `
        <html style="height:100%;margin:0;padding:0;background-color:${theme === 'dark' ? '#000' : '#fff'};">
          <head>
            <title>${item.title}</title>
            <style>
              body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
              iframe { border: none; width: 100%; height: 100%; }
            </style>
          </head>
          <body>
            <iframe src="${itemUrl}"></iframe>
          </body>
        </html>
      `;
      newWindow.document.write(iframeContent);
      newWindow.document.close();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <header className="flex items-center justify-between p-2 border-b bg-background">
        <h1 className="text-lg font-bold">{item.title}</h1>
        <Button variant="ghost" size="sm" onClick={handleFullscreen}>
          <Maximize className="mr-2" />
          Fullscreen
        </Button>
      </header>
      <div className="flex-1 relative bg-background">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        )}
        {iframeSrc && (
          <iframe
            src={iframeSrc}
            className="w-full h-full border-0"
            title={item.title}
            allow="fullscreen"
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        )}
        {!iframeSrc && !isLoading && (
           <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
             <p>Could not load content.</p>
           </div>
        )}
      </div>
    </div>
  );
}
