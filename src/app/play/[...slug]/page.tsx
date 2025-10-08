
import { notFound } from 'next/navigation';
import { games } from '@/lib/data';
import { apps } from '@/lib/apps-data';
import { proxys } from '@/lib/proxys-data';
import type { Game, App, Proxy } from '@/lib/types';
import { PlayClientPage } from './client-page';

type ContentItem = Game | App | Proxy;

export async function generateStaticParams() {
  const gamePaths = games.map((game) => ({
    slug: ['game', game.id],
  }));
  const appPaths = apps.map((app) => ({
    slug: ['app', app.id],
  }));
  const proxyPaths = proxys.map((proxy) => ({
    slug: ['proxy', proxy.id],
  }));

  return [...gamePaths, ...appPaths, ...proxyPaths];
}

function getItem(type: string, id: string): ContentItem | undefined {
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
}

function getUrl(item: ContentItem): string {
    if ('gameUrl' in item) return item.gameUrl;
    if ('appUrl' in item) return item.appUrl;
    if ('proxyUrl' in item) return item.proxyUrl;
    return '';
}

export default function PlayPage({ params }: { params: { slug: string[] } }) {
  const [type, id] = params.slug;
  const item = getItem(type, id);

  if (!item) {
    notFound();
  }

  const itemUrl = getUrl(item);

  return <PlayClientPage item={item} itemUrl={itemUrl} />;
}
