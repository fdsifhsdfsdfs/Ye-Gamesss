
import type { App } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface AppCardProps {
  app: App;
  dataAiHint?: string;
}

export function AppCard({ app, dataAiHint }: AppCardProps) {
  return (
    <Link href={app.appUrl} className="group block" target="_blank" rel="noopener noreferrer">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={app.imageUrl}
              alt={app.title}
              width={400}
              height={400}
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={dataAiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <CardTitle className="font-headline text-xl mb-2 flex justify-between items-start">
            <span>{app.title}</span>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary shrink-0 ml-2" />
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm font-body mb-3 flex-grow">{app.description}</CardDescription>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
            {app.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
