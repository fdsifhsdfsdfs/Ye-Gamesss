
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RequestCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export function RequestCard({ title, description, imageUrl, href }: RequestCardProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="group block cursor-pointer">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={400}
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <CardTitle className="font-headline text-xl mb-2 flex justify-between items-start">
            <span>{title}</span>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary shrink-0 ml-2" />
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm font-body mb-3 flex-grow">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
