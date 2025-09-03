
import type { Proxy } from './types';

export const proxys: Proxy[] = [
  {
    id: '1',
    title: 'SecureNet Proxy',
    description: 'A secure and fast proxy for all your browsing needs. Bypass restrictions with ease.',
    imageUrl: 'https://picsum.photos/seed/proxy1/400/400',
    proxyUrl: '#',
    tags: ['Security', 'Privacy', 'Fast'],
    featured: true,
    createdAt: new Date('2024-05-23T10:00:00Z'),
  },
  {
    id: '2',
    title: 'Stealth-Link',
    description: 'Browse anonymously and access geo-blocked content. Your digital invisibility cloak.',
    imageUrl: 'https://picsum.photos/seed/proxy2/400/400',
    proxyUrl: '#',
    tags: ['Privacy', 'Anonymity', 'Geo-unblocking'],
    featured: true,
    createdAt: new Date('2024-05-22T12:00:00Z'),
  },
  {
    id: '3',
    title: 'Liberty-Web',
    description: 'Experience true internet freedom. Uncensored, unrestricted, and unbelievably fast.',
    imageUrl: 'https://picsum.photos/seed/proxy3/400/400',
    proxyUrl: '#',
    tags: ['Freedom', 'Uncensored', 'Fast'],
    featured: false,
    createdAt: new Date('2024-05-21T15:00:00Z'),
  },
  {
    id: '4',
    title: 'Ghost-Route',
    description: 'A reliable proxy to protect your online identity. Leaves no trace.',
    imageUrl: 'https://picsum.photos/seed/proxy4/400/400',
    proxyUrl: '#',
    tags: ['Identity Protection', 'Privacy', 'Reliable'],
    featured: false,
    createdAt: new Date('2024-05-20T18:00:00Z'),
  },
];
