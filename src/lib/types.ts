
export interface Game {
  id: string;
  type: 'game';
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface Proxy {
  id:string;
  type: 'proxy';
  title: string;
  description: string;
  imageUrl: string;
  proxyUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface App {
  id: string;
  type: 'app';
  title: string;
  description: string;
  imageUrl: string;
  appUrl: string;
  tags: string[];
  featured?: boolean;
}

    