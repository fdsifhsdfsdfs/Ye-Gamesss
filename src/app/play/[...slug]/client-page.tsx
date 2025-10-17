
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Game, App, Proxy } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Maximize, Loader2, ChevronLeft, ExternalLink } from 'lucide-react';
import { useTheme } from 'next-themes';

type ContentItem = Game | App | Proxy;

interface PlayClientPageProps {
    item: ContentItem;
    itemUrl: string;
}

export function PlayClientPage({ item, itemUrl }: PlayClientPageProps) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isPageFullscreen, setIsPageFullscreen] = useState(false);
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNewTabFullscreen = () => {
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

  const handlePageFullscreen = () => {
    const elem = document.documentElement;
     if (document.fullscreenElement) {
        document.exitFullscreen();
     } else {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
     }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPageFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className={`flex flex-col ${isPageFullscreen ? 'h-screen' : 'h-[calc(100vh-4rem)]'}`}>
      <header className={`flex items-center justify-between p-2 border-b bg-background ${isPageFullscreen ? 'hidden' : ''}`}>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ChevronLeft className="mr-2" />
                Back
            </Button>
            <h1 className="text-lg font-bold">{item.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handlePageFullscreen}>
            <Maximize className="mr-2" />
            Fullscreen
          </Button>
          <Button variant="ghost" size="sm" onClick={handleNewTabFullscreen}>
            <ExternalLink className="mr-2" />
            Open in New Tab
          </Button>
        </div>
      </header>
      <div className="flex-1 relative bg-background">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={itemUrl}
          className="w-full h-full border-0"
          title={item.title}
          allow="fullscreen"
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
        {!itemUrl && !isLoading && (
           <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
             <p>Could not load content.</p>
           </div>
        )}
      </div>
    </div>
  );
}
