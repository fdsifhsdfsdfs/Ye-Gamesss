
import type { Game } from './types';

export const games: Game[] = [
  {
    id: '1',
    title: 'Core Ball',
    description: 'A simple and addictive game about timing and precision. Can you attach all the balls to the core without them colliding?',
    imageUrl: 'https://cdn-1.webcatalog.io/catalog/coreball/coreball-icon-filled-256.png?v=1720533850185',
    gameUrl: 'https://script.google.com/macros/s/AKfycbyob7HxkiW2e0yT22QRiejnA_alDdUkPnrNirnvCX1HYPriGPR6_GZ2i1RsglPytlFo/exec',
    tags: ['arcade', 'puzzle', 'skill', 'minimalist'],
    featured: true,
    createdAt: new Date('2024-07-26T10:00:00.000Z'),
  },
  {
    id: '2',
    title: 'Squid Games',
    description: 'A series of intense mini-games. Can you survive to the end?',
    imageUrl: 'https://thumbnails.gamenora.com/Squid%20Game%202%20Mini%20Games.webp',
    gameUrl: 'https://firebasestorage.googleapis.com/v0/b/test-1e83a.appspot.com/o/sg.html?alt=media&token=3a831154-d98f-4ee8-b134-6147678bdef8',
    tags: ['action', 'survival', 'mini-games'],
    featured: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Monkey Mart',
    description: 'Manage your own supermarket, stock shelves, and serve customers in this fun management game.',
    imageUrl: 'https://play-lh.googleusercontent.com/rWReIdyvDaYJPeOxn7hbC0b-96ixGpQKM_EndiQa3SUME8TtI_rNUcI4qsw5teK9mqk',
    gameUrl: 'https://monkeymart-unblocked.com/game',
    tags: ['management', 'simulation', 'casual', 'strategy'],
    featured: false,
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Cluster Rush',
    description: 'Jump from truck to truck in a high-speed, high-stakes game of agility and timing.',
    imageUrl: 'https://m.funkypotato.com/wp-content/uploads/2024/08/cluster-rush.jpg',
    gameUrl: 'https://script.google.com/macros/s/AKfycbw6e8fflbfydV7kom5id09nKaM6ix0hLlXHbs3XHOnxzrndUgPtHUHENrwKomI2Hpk3/exec',
    tags: ['action', 'platformer', '3d', 'fast-paced'],
    featured: false,
    createdAt: new Date(),
  }
];
