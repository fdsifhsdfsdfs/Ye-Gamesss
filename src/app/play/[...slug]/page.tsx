
import { notFound } from 'next/navigation';
import { games } from '@/lib/data';
import { apps } from '@/lib/apps-data';
import { proxys } from '@/lib/proxys-data';
import type { Game, App, Proxy } from '@/lib/types';
import { PlayClientPage } from './client-page';

type ContentItem = Game | App | Proxy;

const allItems: ContentItem[] = [...games, ...apps, ...proxys];

export async function generateStaticParams() {
  return allItems.map((item) => ({
    slug: [item.type, item.id],
  }));
}

function getItem(type: string, id: string): ContentItem | undefined {
    return allItems.find((item) => item.type === type && item.id === id);
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

    