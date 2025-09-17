export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface Proxy {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  proxyUrl: string;
  tags: string[];
  featured?: boolean;
}
