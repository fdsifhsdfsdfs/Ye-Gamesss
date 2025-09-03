import type { App } from './types';

export const apps: App[] = [
  {
    id: '1',
    title: 'Photo Editor Pro',
    description: 'A powerful photo editor with advanced features and filters. Edit your photos like a pro.',
    imageUrl: 'https://picsum.photos/seed/photoeditor/600/400',
    appUrl: '#',
    tags: ['Productivity', 'Photo', 'Editing'],
    featured: true,
    createdAt: new Date('2024-05-20T10:00:00Z'),
  },
  {
    id: '2',
    title: 'Code Snippet Manager',
    description: 'Organize and sync your code snippets across all devices. Never lose a piece of code again.',
    imageUrl: 'https://picsum.photos/seed/codesnippet/600/400',
    appUrl: '#',
    tags: ['Development', 'Utilities', 'Productivity'],
    featured: true,
    createdAt: new Date('2024-05-18T14:30:00Z'),
  },
  {
    id: '3',
    title: 'Mind Map Maker',
    description: 'Visualize your ideas with an intuitive mind mapping tool. Great for brainstorming and planning.',
    imageUrl: 'https://picsum.photos/seed/mindmap/600/400',
    appUrl: '#',
    tags: ['Productivity', 'Planning', 'Organization'],
    featured: true,
    createdAt: new Date('2024-05-15T09:00:00Z'),
  },
  {
    id: '4',
    title: 'Habit Tracker',
    description: 'Build good habits and break bad ones with this simple yet effective habit tracker.',
    imageUrl: 'https://picsum.photos/seed/habittracker/600/400',
    appUrl: '#',
    tags: ['Lifestyle', 'Productivity', 'Health'],
    featured: false,
    createdAt: new Date('2024-05-21T11:00:00Z'),
  },
];
