
import type { App } from './types';

export const apps: App[] = [
  {
    id: '1',
    title: 'Discord',
    description: 'Chat, video, and voice communication for communities.',
    imageUrl: 'https://cdn-1.webcatalog.io/catalog/discord/discord-icon-filled-2021.svg',
    appUrl: 'https://discord.com/login',
    tags: ['social', 'communication', 'community'],
    featured: true,
  },
  {
    id: '2',
    title: 'YouTube',
    description: 'The world\'s most popular video sharing platform.',
    imageUrl: 'https://iili.io/KBM4IqN.png',
    appUrl: 'https://youtube.com',
    tags: ['video', 'streaming', 'entertainment'],
    featured: true,
  },
  {
    id: '3',
    title: 'Spotify',
    description: 'A digital music service that gives you access to millions of songs.',
    imageUrl: 'https://iili.io/KBM4Lp1.png',
    appUrl: 'https://open.spotify.com',
    tags: ['music', 'streaming', 'audio'],
    featured: false,
  },
  {
    id: '4',
    title: 'VS Code',
    description: 'A powerful, lightweight code editor for all your development needs.',
    imageUrl: 'https://iili.io/KBM4TOv.png',
    appUrl: 'https://vscode.dev',
    tags: ['development', 'utility', 'editor'],
    featured: false,
  }
];
