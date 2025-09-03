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
