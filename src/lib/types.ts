export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
  tags: string[];
  featured?: boolean;
  createdAt: Date;
}

export interface App {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  appUrl: string;
  tags: string[];
  featured?: boolean;
  createdAt: Date;
}

export interface Proxy {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  proxyUrl: string;
  tags: string[];
  featured?: boolean;
  createdAt: Date;
}
