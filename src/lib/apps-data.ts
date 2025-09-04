
import type { App } from './types';

export const apps: App[] = [
  {
    id: '1',
    title: 'Sudo Flix',
    description: 'Watch your favorite movies and TV shows with a seamless streaming experience.',
    imageUrl: 'https://avatars.githubusercontent.com/u/191057509?s=200&v=4',
    appUrl: 'https://embeddr.rhw.one/embed#https://pstream.mov',
    tags: ['streaming', 'movies', 'tv shows', 'entertainment'],
    featured: true,
  },
  {
    id: '2',
    title: 'Youtube',
    description: 'Watch, stream, and discover what the world is watching.',
    imageUrl: 'https://www.inet-web.com/Content/files/GamingChannelTips.jpg',
    appUrl: 'https://embeddr.rhw.one/embed#https://Youtube.com',
    tags: ['video', 'streaming', 'entertainment'],
    featured: false,
  }
];
